from django.contrib import admin

from wellness.models import DailyWellnessEntry


@admin.register(DailyWellnessEntry)
class DailyWellnessEntryAdmin(admin.ModelAdmin):
    list_display = ["user", "date", "mood", "stress_level", "anxiety_level", "wellness_score"]
    list_filter = ["date", "wellness_score"]
    search_fields = ["user__username", "journal_note"]
