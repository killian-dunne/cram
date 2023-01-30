from django.urls import path
from . import views

urlpatterns = [
    path('summarize_webpage/', views.SummarizeWebPage.as_view(),
         name='summarize_webpage'),
    path('summarize_youtube/', views.SummarizeYouTube.as_view(),
         name='summarize_youtube'),
]
