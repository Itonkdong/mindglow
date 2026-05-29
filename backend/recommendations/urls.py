from django.urls import path

from recommendations.views import RecommendationGenerateView, RecommendationListView


urlpatterns = [
    path("recommendations/", RecommendationListView.as_view(), name="recommendation-list"),
    path("recommendations/generate/", RecommendationGenerateView.as_view(), name="recommendation-generate"),
]
