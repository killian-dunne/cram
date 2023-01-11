from rest_framework import serializers


class AskOpenAISerializer(serializers.Serializer):
    prompt = serializers.CharField()
