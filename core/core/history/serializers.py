from rest_framework import serializers
from game.models import MatchGame


class MatchSerializer(serializers.ModelSerializer):
    player = serializers.SerializerMethodField()
    opponent = serializers.SerializerMethodField()

    class Meta:
        fields = ["created_at", "player", "opponent"]
        model = MatchGame

    def get_player(self, obj):
        player = obj.p1
        score = obj.player1_score
        if obj.player2 == self.context.get("user"):
            player = obj.p2
            score = obj.player2_score

        return {
            "id": player.id,
            "username": player.username,
            "score": score,
        }

    def get_opponent(self, obj):
        player = obj.p1
        score = obj.player1_score
        if obj.player2 != self.context.get("user"):
            player = obj.p2
            score = obj.player2_score

        return {
            "id": player.id,
            "username": player.username,
            "score": score,
        }