from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from challenges.models import Challenge, UserChallenge
from challenges.serializers import ChallengeSerializer, UserChallengeSerializer
from challenges.services.challenge_service import ChallengeService, ChallengeUnavailableError


class ChallengeListView(ListAPIView):
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Challenge.objects.filter(is_active=True)


class TodayChallengeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            user_challenge = ChallengeService().get_or_assign_today(request.user)
        except ChallengeUnavailableError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserChallengeSerializer(user_challenge)
        return Response(serializer.data)


class CompleteChallengeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, challenge_id: int):
        get_object_or_404(Challenge, pk=challenge_id)
        user_challenge = get_object_or_404(UserChallenge, user=request.user, challenge_id=challenge_id)
        user_challenge = ChallengeService().complete(request.user, user_challenge.challenge_id)
        serializer = UserChallengeSerializer(user_challenge)
        return Response(serializer.data)


class ChallengeHistoryView(ListAPIView):
    serializer_class = UserChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserChallenge.objects.filter(user=self.request.user).select_related("challenge")
