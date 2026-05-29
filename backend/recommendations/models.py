from django.conf import settings
from django.db import models


class Recommendation(models.Model):
    class Priority(models.TextChoices):
        LOW = "low", "Low"
        MEDIUM = "medium", "Medium"
        HIGH = "high", "High"

    class Source(models.TextChoices):
        RULE_BASED = "rule_based", "Rule Based"
        AI = "ai", "AI"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recommendations",
    )
    title = models.CharField(max_length=255)
    message = models.TextField()
    category = models.CharField(max_length=50)
    priority = models.CharField(max_length=20, choices=Priority.choices)
    source = models.CharField(max_length=20, choices=Source.choices, default=Source.RULE_BASED)
    related_metric = models.CharField(max_length=100, blank=True)
    reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "created_at"]),
            models.Index(fields=["priority"]),
        ]

    def __str__(self) -> str:
        return self.title
