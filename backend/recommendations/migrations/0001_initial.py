import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Recommendation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("message", models.TextField()),
                ("category", models.CharField(max_length=50)),
                ("priority", models.CharField(choices=[("low", "Low"), ("medium", "Medium"), ("high", "High")], max_length=20)),
                ("source", models.CharField(choices=[("rule_based", "Rule Based"), ("ai", "AI")], default="rule_based", max_length=20)),
                ("related_metric", models.CharField(blank=True, max_length=100)),
                ("reason", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="recommendations", to=settings.AUTH_USER_MODEL)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.AddIndex(model_name="recommendation", index=models.Index(fields=["user", "created_at"], name="recommendat_user_id_5442b4_idx")),
        migrations.AddIndex(model_name="recommendation", index=models.Index(fields=["priority"], name="recommendat_priorit_1f1dad_idx")),
    ]
