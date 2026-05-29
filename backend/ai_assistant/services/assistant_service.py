import logging

from django.conf import settings
from django.db import transaction
from django.db.models import Avg
from openai import OpenAI, OpenAIError

from ai_assistant.models import ChatMessage, ChatSession
from challenges.models import UserChallenge
from recommendations.services.recommendation_service import RecommendationService
from wellness.models import DailyWellnessEntry

logger = logging.getLogger(__name__)

CRISIS_KEYWORDS = [
    "suicide",
    "kill myself",
    "self harm",
    "self-harm",
    "hurt myself",
    "abuse",
    "danger",
    "unsafe at home",
]

CRISIS_RESPONSE = (
    "I'm really sorry you're feeling this way. You deserve immediate support from a real person. "
    "Please contact emergency services in your country, reach out to a trusted adult, parent, "
    "teacher, school counselor, or a mental health professional as soon as possible. "
    "If you are in immediate danger, call emergency services now."
)

FALLBACK_RESPONSE = (
    "I am here with you, but I could not reach the AI service right now. "
    "Try one small reset: breathe in for 4 seconds, hold for 4, breathe out for 4, and repeat twice. "
    "If this feels serious, please talk to a trusted adult or professional."
)

SYSTEM_PROMPT = """
You are a supportive youth wellbeing assistant inside a web platform for stress and anxiety management.

Your role:
- provide warm, practical, non-judgmental emotional support
- help users reflect on stress, anxiety, sleep, school pressure, social connection, and healthy habits
- suggest simple coping strategies such as breathing, journaling, taking breaks, physical activity, talking to trusted people, and improving sleep habits
- use the user's wellness data when available to personalize advice

Safety rules:
- You are not a therapist, psychologist, doctor, or emergency service.
- Do not diagnose mental health conditions.
- Do not prescribe medication.
- Do not tell the user to stop medication or ignore professional advice.
- If the user mentions self-harm, suicide, abuse, or immediate danger, respond with empathy and encourage them to contact emergency services, a trusted adult, a school counselor, or a mental health professional immediately.
- Keep responses short, clear, and suitable for young people.
- Encourage healthy habits and social support.
""".strip()


class AssistantService:
    @transaction.atomic
    def create_session(self, user, title: str = "New conversation") -> ChatSession:
        """Create a chat session owned by the authenticated user."""
        return ChatSession.objects.create(user=user, title=title or "New conversation")

    @transaction.atomic
    def send_message(self, user, session_id: int, content: str) -> ChatMessage:
        """Save a user message, generate a safe assistant reply, and persist the reply."""
        session = ChatSession.objects.get(id=session_id, user=user)
        ChatMessage.objects.create(session=session, sender=ChatMessage.Sender.USER, content=content)
        assistant_content = self._build_response(user, content)
        assistant_message = ChatMessage.objects.create(
            session=session,
            sender=ChatMessage.Sender.ASSISTANT,
            content=assistant_content,
        )
        session.title = self._build_session_title(session.title, content)
        session.save(update_fields=["title", "updated_at"])
        return assistant_message

    def _build_response(self, user, content: str) -> str:
        if self._contains_crisis_language(content):
            return CRISIS_RESPONSE
        if not settings.OPENAI_API_KEY:
            return FALLBACK_RESPONSE

        try:
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": f"{self._build_context(user)}\n\nUser message: {content}"},
                ],
                temperature=0.5,
                max_tokens=350,
            )
            return response.choices[0].message.content.strip()
        except OpenAIError:
            logger.exception("OpenAI wellbeing assistant request failed.")
            return FALLBACK_RESPONSE

    def _contains_crisis_language(self, content: str) -> bool:
        normalized = content.lower()
        return any(keyword in normalized for keyword in CRISIS_KEYWORDS)

    def _build_context(self, user) -> str:
        entries = DailyWellnessEntry.objects.filter(user=user).order_by("-date")[:7]
        averages = entries.aggregate(
            average_mood=Avg("mood"),
            average_stress=Avg("stress_level"),
            average_anxiety=Avg("anxiety_level"),
            average_sleep=Avg("sleep_hours"),
            average_screen_time=Avg("screen_time_hours"),
        )
        recent_challenge = UserChallenge.objects.filter(user=user, completed=True).select_related("challenge").first()
        recommendations = RecommendationService().current_for_user(user)[:3]
        context_lines = [
            "User wellness summary:",
            f"- Average mood last 7 entries: {self._format_average(averages['average_mood'])}/10",
            f"- Average stress last 7 entries: {self._format_average(averages['average_stress'])}/10",
            f"- Average anxiety last 7 entries: {self._format_average(averages['average_anxiety'])}/10",
            f"- Average sleep: {self._format_average(averages['average_sleep'])} hours",
            f"- Average screen time: {self._format_average(averages['average_screen_time'])} hours",
        ]
        if recent_challenge:
            context_lines.append(f"- Recent challenge completed: {recent_challenge.challenge.title}")
        if recommendations:
            context_lines.append("- Recent recommendations: " + ", ".join(item.title for item in recommendations))
        return "\n".join(context_lines)

    def _format_average(self, value) -> str:
        if value is None:
            return "not enough data"
        return f"{float(value):.1f}"

    def _build_session_title(self, current_title: str, content: str) -> str:
        if current_title != "New conversation":
            return current_title
        title = content.strip()[:45]
        return title or current_title
