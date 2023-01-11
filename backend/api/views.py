from django.shortcuts import render
from rest_framework import views, response, permissions
from .serializers import AskOpenAISerializer
import openai
import os


def clean_result(text):
    if not isinstance(text, str):
        return text
    if not text.endswith('.') and '.' in text:
        # Remove the last sentence
        text = text.rsplit('.', 1)[0]
        return text.strip()
    return text.strip().replace(';', '')


class AskOpenAIView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        openai.api_key = os.environ.get('OPENAI_API_KEY')

        serializer = AskOpenAISerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        prompt = serializer.validated_data['prompt']
        if isinstance(prompt, str):
            initial_string = "Given the following text from a company's landing page, tell me what products and services they provide. \n\n"
            prompt = initial_string + prompt
            print('this is the prompt', prompt)
            json_response = openai.Completion.create(
                model="text-davinci-003",
                prompt=prompt,
                temperature=0.7,
                max_tokens=100,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
            )
            if json_response and len(json_response.choices) > 0:
                text = json_response.choices[0].text
                text = clean_result(text)
                print('text', text)

                json_response = {'message': text}
        else:
            json_response = {'message': 'Prompt must be a string.'}
        return response.Response(json_response, status=200)
