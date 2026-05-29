from django.conf import settings
from django.db import models


class Challenge(models.Model):
    class Category(models.TextChoices):
        SLEEP = "sleep", "Sleep"
        STRESS = "stress", "Stress"
        ANXIETY = "anxiety", "Anxiety"
        ACTIVITY = "activity", "Physical Activity"
        DIGITAL = "digital", "Digital Wellbeing"
        SOCIAL = "social", "Social Connection"
        CONFIDENCE = "confidence", "Self Confidence"
        EMOTIONAL = "emotional", "Emotional Literacy"

    class Difficulty(models.TextChoices):
        EASY = "easy", "Easy"
        MEDIUM = "medium", "Medium"
        HARD = "hard", "Hard"

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=Category.choices)
    difficulty = models.CharField(max_length=20, choices=Difficulty.choices, default=Difficulty.EASY)
    estimated_minutes = models.PositiveIntegerField(default=5)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["category", "title"]

    def __str__(self) -> str:
        return self.title


class UserChallenge(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_challenges",
    )
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name="assignments")
    assigned_date = models.DateField()
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-assigned_date"]
        constraints = [
            models.UniqueConstraint(fields=["user", "assigned_date"], name="unique_user_challenge_date"),
        ]

    def __str__(self) -> str:
        return f"{self.user} - {self.challenge} on {self.assigned_date}"
