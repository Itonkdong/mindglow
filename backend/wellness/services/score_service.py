from decimal import Decimal

from helpers.constants import WELLNESS_SCORE_MAX, WELLNESS_SCORE_MIN
from wellness.models import DailyWellnessEntry


class WellnessScoreService:
    def calculate_score(self, entry: DailyWellnessEntry) -> int:
        """Calculate a non-diagnostic personal wellbeing indicator from one entry."""
        score = 50.0
        score += (entry.mood - 5) * 3
        score += (entry.sleep_quality - 5) * 2
        score += min(entry.physical_activity_minutes / 30, 2) * 5
        score += (entry.social_interaction_level - 5) * 2
        score -= (entry.stress_level - 5) * 3
        score -= (entry.anxiety_level - 5) * 3
        score -= (entry.school_pressure - 5) * 2

        sleep_hours = Decimal(entry.sleep_hours)
        if sleep_hours < Decimal("6"):
            score -= 10
        elif Decimal("7") <= sleep_hours <= Decimal("9"):
            score += 8

        if Decimal(entry.screen_time_hours) > Decimal("6"):
            score -= 8

        return round(max(WELLNESS_SCORE_MIN, min(WELLNESS_SCORE_MAX, score)))

    def label_for_score(self, score: int) -> str:
        """Return a friendly label for a wellness score band."""
        if score <= 39:
            return "Difficult day"
        if score <= 59:
            return "Needs care"
        if score <= 79:
            return "Balanced"
        return "Strong wellbeing day"
