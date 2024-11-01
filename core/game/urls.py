from django.urls import path
from . import views

urlpatterns = [
    path('rooms/matches/<int:match_id>/', views.startgame, name='startgame'),
    path('game/<str:status>/', views.startmatch, name='startmatch'),
]