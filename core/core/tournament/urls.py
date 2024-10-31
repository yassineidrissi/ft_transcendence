from django.urls import path, include
from . import views

urlpatterns = [
    path('api/rooms/create-room/<str:roomName>/', views.create_room, name='create_room'),
    path('api/rooms/rooms-list/', views.rooms_list, name='rooms_list'),
    path('api/rooms/<int:room_id>/', views.matches_room, name='matches_room'),
    path('api/rooms/join-room/', views.join_room, name='join_room'),
    path('api/rooms/leave-room/', views.leave_room, name='leave_room'),
    path('api/rooms/next_round/<int:room_id>/', views.next_round_matches, name='next_round_matches'),

]