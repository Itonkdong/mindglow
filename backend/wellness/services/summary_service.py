from dataclasses import dataclass
from decimal import Decimal

from django.db.models import Avg

from helpers.constants import RECENT_ENTRY_LIMIT
from wellness.models import DailyWellnessEntry
from wellness.services.score_service import WellnessScoreService


@dataclass(frozen=True)
class WellnessInsight:
    title: str
    message: str


class WellnessSummaryService:
    def __init__(self) -> None:
        self.score_service = WellnessScoreService()

    def build_summary(self, user) -> dict:
        """Build dashboard metrics and simple insights for a user's recent entries."""
        entries = list(DailyWellnessEntry.objects.filter(user=user).order_by("-date")[:RECENT_ENTRY_LIMIT])
        ordered_entries = list(reversed(entries))
        averages = DailyWellnessEntry.objects.filter(user=user).aggregate(
            average_mood=Avg("mood"),
            average_stress=Avg("stress_level"),
            average_anxiety=Avg("anxiety_level"),
            average_sleep=Avg("sleep_hours"),
            average_screen_time=Avg("screen_time_hours"),
            average_wellness_score=Avg("wellness_score"),
        )
        latest_entry = entries[0] if entries else None
        return {
            "latest_entry": latest_entry,
            "average_mood": self._round_average(averages["average_mood"]),
            "average_stress": self._round_average(averages["average_stress"]),
            "average_anxiety": self._round_average(averages["average_anxiety"]),
            "average_sleep": self._round_average(averages["average_sleep"]),
            "average_screen_time": self._round_average(averages["average_screen_time"]),
            "average_wellness_score": self._round_average(averages["average_wellness_score"]),
            "entries_last_7_days": ordered_entries,
            "insights": self._build_insights(entries),
        }

    def _round_average(self, value) -> float | None:
        if value is None:
            return None
        return round(float(value), 1)

    def _build_insights(self, entries: list[DailyWellnessEntry]) -> list[WellnessInsight]:
        insights: list[WellnessInsight] = []
        if not entries:
            return insights

        avg_mood = sum(entry.mood for entry in entries) / len(entries)
        insights.append(WellnessInsight("Average mood", f"Your average mood recently is {avg_mood:.1f}/10."))

        low_sleep_days = [entry for entry in entries if Decimal(entry.sleep_hours) < Decimal("6")]
        if low_sleep_days:
            insights.append(WellnessInsight("Sleep and stress", "Stress is often harder to handle after short sleep. Try a calmer wind-down tonight."))

        high_screen_days = [entry for entry in entries if Decimal(entry.screen_time_hours) > Decimal("6")]
        if high_screen_days:
            insights.append(WellnessInsight("Digital balance", "You had some high screen-time days recently. A short offline block may help you reset."))

        return insights
