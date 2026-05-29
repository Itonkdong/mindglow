from django.contrib import admin

from challenges.models import Challenge, UserChallenge


@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "difficulty", "estimated_minutes", "is_active"]
    list_filter = ["category", "difficulty", "is_active"]
    search_fields = ["title", "description"]


@admin.register(UserChallenge)
class UserChallengeAdmin(admin.ModelAdmin):
    list_display = ["user", "challenge", "assigned_date", "completed"]
    list_filter = ["completed", "assigned_date"]
