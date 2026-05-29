from django.urls import path
from rest_framework.routers import DefaultRouter

from wellness.views import DailyWellnessEntryViewSet, WellnessSummaryView


router = DefaultRouter()
router.register("wellness-entries", DailyWellnessEntryViewSet, basename="wellness-entry")

urlpatterns = [
    path("wellness-summary/", WellnessSummaryView.as_view(), name="wellness-summary"),
]
urlpatterns += router.urls
