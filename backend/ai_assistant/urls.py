from django.urls import path

from ai_assistant.views import ChatMessageListCreateView, ChatSessionListCreateView


urlpatterns = [
    path("chat/sessions/", ChatSessionListCreateView.as_view(), name="chat-session-list-create"),
    path("chat/sessions/<int:session_id>/messages/", ChatMessageListCreateView.as_view(), name="chat-message-list-create"),
]
