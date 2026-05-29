from rest_framework import serializers

from challenges.models import Challenge, UserChallenge


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ["id", "title", "description", "category", "difficulty", "estimated_minutes", "is_active"]


class UserChallengeSerializer(serializers.ModelSerializer):
    challenge = ChallengeSerializer()

    class Meta:
        model = UserChallenge
        fields = ["id", "challenge", "assigned_date", "completed", "completed_at"]
