from rest_framework import serializers

from recommendations.models import Recommendation


class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ["id", "title", "message", "category", "priority", "source", "related_metric", "reason", "created_at"]
