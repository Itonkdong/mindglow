from django.urls import path

from challenges.views import ChallengeHistoryView, ChallengeListView, CompleteChallengeView, TodayChallengeView


urlpatterns = [
    path("challenges/", ChallengeListView.as_view(), name="challenge-list"),
    path("challenges/today/", TodayChallengeView.as_view(), name="challenge-today"),
    path("challenges/<int:challenge_id>/complete/", CompleteChallengeView.as_view(), name="challenge-complete"),
    path("challenges/history/", ChallengeHistoryView.as_view(), name="challenge-history"),
]
