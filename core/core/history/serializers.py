from rest_framework import serializers
from tournament.models import Match


class MatchSerializer(serializers.ModelSerializer):
    player = serializers.SerializerMethodField()
    opponent = serializers.SerializerMethodField()

    class Meta:
        fields = ["created_at", "player", "opponent"]
        model = Match

    def get_player(self, obj):
        player = obj.player1
        score = obj.score1
        if obj.player2 == self.context.get("user"):
            player = obj.player2
            score = obj.score2

        return {
            "id": player.id,
            "username": player.username,
            "score": score,
        }

    def get_opponent(self, obj):
        player = obj.player1
        score = obj.score1
        if obj.player2 != self.context.get("user"):
            player = obj.player2
            score = obj.score2

        return {
            "id": player.id,
            "username": player.username,
            "score": score,
        }
