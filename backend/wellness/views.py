from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from wellness.models import DailyWellnessEntry
from wellness.serializers import DailyWellnessEntrySerializer, WellnessSummarySerializer
from wellness.services.summary_service import WellnessSummaryService


class DailyWellnessEntryViewSet(viewsets.ModelViewSet):
    serializer_class = DailyWellnessEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DailyWellnessEntry.objects.filter(user=self.request.user)


class WellnessSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        summary = WellnessSummaryService().build_summary(request.user)
        serializer = WellnessSummarySerializer(summary, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
