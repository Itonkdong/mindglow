from django.utils import timezone
from rest_framework import serializers

from wellness.models import DailyWellnessEntry
from wellness.services.score_service import WellnessScoreService


class DailyWellnessEntrySerializer(serializers.ModelSerializer):
    wellness_label = serializers.SerializerMethodField()

    class Meta:
        model = DailyWellnessEntry
        fields = [
            "id",
            "date",
            "mood",
            "stress_level",
            "anxiety_level",
            "sleep_hours",
            "sleep_quality",
            "physical_activity_minutes",
            "screen_time_hours",
            "school_pressure",
            "social_interaction_level",
            "journal_note",
            "wellness_score",
            "wellness_label",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "date", "wellness_score", "wellness_label", "created_at", "updated_at"]

    def get_wellness_label(self, obj: DailyWellnessEntry) -> str:
        return WellnessScoreService().label_for_score(obj.wellness_score)

    def validate(self, attrs):
        request = self.context["request"]
        entry_date = self.instance.date if self.instance else timezone.localdate()
        existing = DailyWellnessEntry.objects.filter(user=request.user, date=entry_date)
        if self.instance:
            existing = existing.exclude(pk=self.instance.pk)
        if existing.exists():
            raise serializers.ValidationError({"date": "You already have a check-in for this date."})
        return attrs

    def create(self, validated_data):
        validated_data["date"] = timezone.localdate()
        entry = DailyWellnessEntry(user=self.context["request"].user, **validated_data)
        entry.wellness_score = WellnessScoreService().calculate_score(entry)
        entry.save()
        return entry

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.wellness_score = WellnessScoreService().calculate_score(instance)
        instance.save()
        return instance


class WellnessInsightSerializer(serializers.Serializer):
    title = serializers.CharField()
    message = serializers.CharField()


class WellnessSummarySerializer(serializers.Serializer):
    latest_entry = DailyWellnessEntrySerializer(allow_null=True)
    average_mood = serializers.FloatField(allow_null=True)
    average_stress = serializers.FloatField(allow_null=True)
    average_anxiety = serializers.FloatField(allow_null=True)
    average_sleep = serializers.FloatField(allow_null=True)
    average_screen_time = serializers.FloatField(allow_null=True)
    average_wellness_score = serializers.FloatField(allow_null=True)
    entries_last_7_days = DailyWellnessEntrySerializer(many=True)
    insights = WellnessInsightSerializer(many=True)
