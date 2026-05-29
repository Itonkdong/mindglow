import decimal

import django.core.validators
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
            name="DailyWellnessEntry",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField()),
                ("mood", models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ("stress_level", models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ("anxiety_level", models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ("sleep_hours", models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(decimal.Decimal("0")), django.core.validators.MaxValueValidator(decimal.Decimal("14"))])),
                ("sleep_quality", models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ("physical_activity_minutes", models.PositiveIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(300)])),
                ("screen_time_hours", models.DecimalField(decimal_places=1, max_digits=4, validators=[django.core.validators.MinValueValidator(decimal.Decimal("0")), django.core.validators.MaxValueValidator(decimal.Decimal("16"))])),
                ("school_pressure", models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ("social_interaction_level", models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ("journal_note", models.TextField(blank=True)),
                ("wellness_score", models.PositiveSmallIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="wellness_entries", to=settings.AUTH_USER_MODEL)),
            ],
            options={"ordering": ["-date"]},
        ),
        migrations.AddIndex(model_name="dailywellnessentry", index=models.Index(fields=["user", "date"], name="wellness_da_user_id_b9fc3d_idx")),
        migrations.AddConstraint(model_name="dailywellnessentry", constraint=models.UniqueConstraint(fields=("user", "date"), name="unique_user_wellness_entry_date")),
    ]
