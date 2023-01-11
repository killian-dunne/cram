from django.urls import path
from . import views

urlpatterns = [
    path('ask_openai/', views.AskOpenAIView.as_view(), name='ask_openai'),
]
