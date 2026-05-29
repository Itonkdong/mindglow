from django.contrib import admin

from recommendations.models import Recommendation


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ["title", "user", "category", "priority", "source", "created_at"]
    list_filter = ["category", "priority", "source"]
    search_fields = ["title", "message", "reason"]
