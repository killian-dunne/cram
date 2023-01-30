from rest_framework import serializers


class SummarizeWebPageSerializer(serializers.Serializer):
    prompt = serializers.CharField()


class SummarizeYouTubeSerializer(serializers.Serializer):
    video_id = serializers.CharField()
