import logging
import random

from django.db import transaction
from django.utils import timezone

from challenges.models import Challenge, UserChallenge

logger = logging.getLogger(__name__)


class ChallengeUnavailableError(Exception):
    """Raised when no active challenge can be assigned."""


class UserChallengeNotFoundError(Exception):
    """Raised when a user's expected daily challenge assignment cannot be found."""


class ChallengeService:
    @transaction.atomic
    def get_or_assign_today(self, user) -> UserChallenge:
        """Return today's user challenge, creating one from active challenges when needed."""
        today = timezone.localdate()
        existing = UserChallenge.objects.filter(user=user, assigned_date=today).select_related("challenge").first()
        if existing:
            return existing

        challenge_ids = list(Challenge.objects.filter(is_active=True).values_list("id", flat=True))
        if not challenge_ids:
            logger.warning("Daily challenge assignment failed because no active challenges exist.")
            raise ChallengeUnavailableError("No active challenges are available.")

        challenge = Challenge.objects.get(pk=random.choice(challenge_ids))
        return UserChallenge.objects.create(user=user, assigned_date=today, challenge=challenge)

    def complete(self, user, challenge_id: int) -> UserChallenge:
        """Mark today's assigned challenge as completed for a user."""
        user_challenge = (
            UserChallenge.objects
            .select_related("challenge")
            .filter(user=user, challenge_id=challenge_id, assigned_date=timezone.localdate())
            .first()
        )
        if user_challenge is None:
            raise UserChallengeNotFoundError("Today's challenge was not found.")
        if not user_challenge.completed:
            user_challenge.completed = True
            user_challenge.completed_at = timezone.now()
            user_challenge.save(update_fields=["completed", "completed_at"])
        return user_challenge
