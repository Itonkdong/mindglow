from decimal import Decimal

from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class DailyWellnessEntry(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="wellness_entries",
    )
    date = models.DateField()
    mood = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    stress_level = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    anxiety_level = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    sleep_hours = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(Decimal("0")), MaxValueValidator(Decimal("14"))])
    sleep_quality = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    physical_activity_minutes = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(300)])
    screen_time_hours = models.DecimalField(max_digits=4, decimal_places=1, validators=[MinValueValidator(Decimal("0")), MaxValueValidator(Decimal("16"))])
    school_pressure = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    social_interaction_level = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    journal_note = models.TextField(blank=True)
    wellness_score = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date"]
        constraints = [
            models.UniqueConstraint(fields=["user", "date"], name="unique_user_wellness_entry_date"),
        ]
        indexes = [
            models.Index(fields=["user", "date"]),
        ]

    def __str__(self) -> str:
        return f"{self.user} wellness entry for {self.date}"
