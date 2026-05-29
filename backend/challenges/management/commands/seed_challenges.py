from django.core.management.base import BaseCommand

from challenges.models import Challenge


CHALLENGES = [
    ("Take a 10-minute walk", "Step outside or walk indoors for ten calm minutes.", "activity", 10),
    ("Write three grateful things", "Write down three things you appreciated today.", "emotional", 5),
    ("Avoid screens before bed", "Put screens away 30 minutes before sleeping.", "sleep", 30),
    ("Try box breathing", "Breathe in, hold, breathe out, and hold again for 2 minutes.", "stress", 2),
    ("Drink a glass of water", "Pause and drink a full glass of water.", "activity", 2),
    ("Stretch for 5 minutes", "Do gentle neck, shoulder, and back stretches.", "activity", 5),
    ("Note one good moment", "Write one thing that went well today.", "confidence", 3),
    ("Message a friend", "Send a kind check-in to someone you trust.", "social", 5),
    ("Clean your study space", "Clear one small area where you study or relax.", "stress", 10),
    ("Take a study break", "Pause school tasks and reset for five minutes.", "stress", 5),
    ("Listen to calming music", "Choose one calming song and listen without multitasking.", "anxiety", 5),
    ("Prepare for tomorrow", "Prepare your school bag or top task before sleeping.", "sleep", 10),
    ("Name one worry and solution", "Write one worry and one possible next step.", "anxiety", 7),
    ("Spend 15 minutes offline", "Choose a short offline block and do something simple.", "digital", 15),
    ("Do one kind thing", "Offer a small kind action to someone today.", "social", 5),
    ("Write one strength", "Write one thing you like about yourself.", "confidence", 3),
    ("Get fresh air", "Go outside or open a window and breathe slowly.", "stress", 5),
    ("Practice 5-4-3-2-1", "Name 5 things you see, 4 touch, 3 hear, 2 smell, and 1 taste.", "anxiety", 5),
    ("Plan three tasks", "Write tomorrow's top three tasks in a realistic order.", "stress", 7),
    ("Try guided relaxation", "Do a short relaxation or body scan exercise.", "anxiety", 10),
]


class Command(BaseCommand):
    help = "Seed the default youth wellness challenges."

    def handle(self, *args, **options):
        created = 0
        for title, description, category, minutes in CHALLENGES:
            _, was_created = Challenge.objects.get_or_create(
                title=title,
                defaults={
                    "description": description,
                    "category": category,
                    "difficulty": Challenge.Difficulty.EASY,
                    "estimated_minutes": minutes,
                    "is_active": True,
                },
            )
            created += int(was_created)
        self.stdout.write(self.style.SUCCESS(f"Seeded {created} new challenges."))
