from django.shortcuts import render
from tournament.models import Room, Match
from .models import MatchGame
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def startgame(request, match_id):
    match = Match.objects.get(id=match_id)
    if match:
        return JsonResponse({
            'success': True,
            'message': 'Game started',
            'id': match.id,
            'player1': match.player1.username,
            'player2': match.player2.username,
        })
    return JsonResponse({
        'success': False,
        'message': 'Game not started'
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def startmatch(request, status):
    user = request.user
    print('im here', flush=True)
    last_match = MatchGame.objects.last()
    if last_match is None:
        game = MatchGame.objects.create(p1=user)
        game.player1 = user
        if status == 'invite':
            game.is_invite_only = True
        game.save()
        return JsonResponse({
            'success': True,
            'message': 'Match started',
            'id': game.id,
            'player1': game.p1.username,
        })
    else:
        if last_match.p2 is not None:
            game = MatchGame.objects.create(p1=user)
            game.p1 = user
            if status == 'invite':
                game.is_invite_only = True
            game.p1.nickname = user.username
            game.p1.save()
            game.save()
            return JsonResponse({
                'success': True,
                'message': 'Match started',
                'id': game.id,
                'player1': game.p1.username,
            })
        else:
            if last_match.is_invite_only and user.is_invited is False:
                game = MatchGame.objects.create(p1=user)
                game.player1 = user
                game.save()
                return JsonResponse({
                    'success': True,
                    'message': 'Match started',
                    'id': game.id,
                    'player1': game.p1.username,
                }) 
            game = MatchGame.objects.last()
            game.p2 = user
            game.p2.nickname = user.nickname
            game.p2.save()
            game.save()
            return JsonResponse({
                'success': True,
                'message': 'Match started',
                'id': game.id,
                'player1': game.p1.username,
                'player2': game.p2.username,
            })
 






