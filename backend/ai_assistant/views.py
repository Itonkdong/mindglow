from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ai_assistant.models import ChatSession
from ai_assistant.serializers import (
    ChatMessageCreateSerializer,
    ChatMessageSerializer,
    ChatSessionCreateSerializer,
    ChatSessionSerializer,
)
from ai_assistant.services.assistant_service import AssistantService


class ChatSessionListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = ChatSessionSerializer(ChatSession.objects.filter(user=request.user), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChatSessionCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        session = AssistantService().create_session(request.user, serializer.validated_data.get("title", "New conversation"))
        return Response(ChatSessionSerializer(session).data, status=status.HTTP_201_CREATED)


class ChatMessageListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, session_id: int):
        session = get_object_or_404(ChatSession, id=session_id, user=request.user)
        serializer = ChatMessageSerializer(session.messages.all(), many=True)
        return Response(serializer.data)

    def post(self, request, session_id: int):
        serializer = ChatMessageCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        assistant_message = AssistantService().send_message(
            request.user,
            session_id,
            serializer.validated_data["content"],
        )
        return Response(ChatMessageSerializer(assistant_message).data, status=status.HTTP_201_CREATED)
