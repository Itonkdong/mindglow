from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from recommendations.serializers import RecommendationSerializer
from recommendations.services.recommendation_service import RecommendationService


class RecommendationListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        recommendations = RecommendationService().current_for_user(request.user)
        serializer = RecommendationSerializer(recommendations, many=True)
        return Response(serializer.data)


class RecommendationGenerateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        recommendations = RecommendationService().generate_for_user(request.user)
        serializer = RecommendationSerializer(recommendations, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
