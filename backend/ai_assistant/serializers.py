from rest_framework import serializers

from ai_assistant.models import ChatMessage, ChatSession


class ChatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSession
        fields = ["id", "title", "created_at", "updated_at"]


class ChatSessionCreateSerializer(serializers.Serializer):
    title = serializers.CharField(required=False, allow_blank=True, max_length=255)


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "sender", "content", "created_at"]


class ChatMessageCreateSerializer(serializers.Serializer):
    content = serializers.CharField()
