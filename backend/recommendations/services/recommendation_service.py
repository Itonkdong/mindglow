from decimal import Decimal

from recommendations.models import Recommendation
from wellness.models import DailyWellnessEntry


class RecommendationService:
    def generate_for_user(self, user) -> list[Recommendation]:
        """Create current rule-based recommendations from recent wellness data."""
        entries = list(DailyWellnessEntry.objects.filter(user=user).order_by("-date")[:3])
        if not entries:
            return []

        latest = entries[0]
        candidates = self._build_candidates(entries, latest)
        Recommendation.objects.filter(user=user, source=Recommendation.Source.RULE_BASED).delete()
        return [Recommendation.objects.create(user=user, **candidate) for candidate in candidates]

    def current_for_user(self, user) -> list[Recommendation]:
        """Return existing recommendations or generate them when none exist."""
        recommendations = list(Recommendation.objects.filter(user=user)[:10])
        if recommendations:
            return recommendations
        return self.generate_for_user(user)

    def _build_candidates(self, entries: list[DailyWellnessEntry], latest: DailyWellnessEntry) -> list[dict[str, str]]:
        candidates: list[dict[str, str]] = []
        avg_sleep = sum(Decimal(entry.sleep_hours) for entry in entries) / len(entries)
        avg_activity = sum(entry.physical_activity_minutes for entry in entries) / len(entries)

        if avg_sleep < Decimal("6"):
            candidates.append({
                "title": "Give sleep a little extra care",
                "message": "Your sleep has been low recently. Try going to bed 30 minutes earlier tonight and avoid screens before sleeping.",
                "category": "sleep",
                "priority": Recommendation.Priority.HIGH,
                "related_metric": "sleep_hours",
                "reason": "Average sleep over your recent check-ins is below 6 hours.",
            })
        if latest.stress_level >= 8:
            candidates.append({
                "title": "Create a short stress pause",
                "message": "Your stress level is high today. Try a short breathing exercise or take a 10-minute break from school tasks.",
                "category": "stress",
                "priority": Recommendation.Priority.HIGH,
                "related_metric": "stress_level",
                "reason": "Today's stress level is 8 or above.",
            })
        if latest.anxiety_level >= 8:
            candidates.append({
                "title": "Try a grounding exercise",
                "message": "Your anxiety level seems high. Try naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
                "category": "anxiety",
                "priority": Recommendation.Priority.HIGH,
                "related_metric": "anxiety_level",
                "reason": "Today's anxiety level is 8 or above.",
            })
        if Decimal(latest.screen_time_hours) > Decimal("6"):
            candidates.append({
                "title": "Plan an offline hour",
                "message": "Your screen time is high today. Try setting a one-hour offline period before sleep.",
                "category": "digital",
                "priority": Recommendation.Priority.MEDIUM,
                "related_metric": "screen_time_hours",
                "reason": "Today's screen time is above 6 hours.",
            })
        if avg_activity < 15:
            candidates.append({
                "title": "Add a tiny movement break",
                "message": "You have had low physical activity recently. A short walk can help reduce stress and improve mood.",
                "category": "activity",
                "priority": Recommendation.Priority.MEDIUM,
                "related_metric": "physical_activity_minutes",
                "reason": "Recent physical activity averaged below 15 minutes.",
            })
        if not candidates:
            candidates.append({
                "title": "Keep your steady rhythm",
                "message": "Your recent check-ins look balanced. Keep using small habits that help you feel grounded.",
                "category": "general",
                "priority": Recommendation.Priority.LOW,
                "related_metric": "wellness_score",
                "reason": "No high-risk habit pattern appeared in your recent check-ins.",
            })
        return candidates
