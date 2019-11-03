from rest_framework import serializers
from byThePeople.models import UpcomingBill, Headline, Poll, Choice, PollUserVotes, Comment, CommentUserLikes


class UpcomingBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpcomingBill
        fields = '__all__'


class HeadlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Headline
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'
        ordering = ["-pk"]


class PollUserVotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollUserVotes
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, required=False)

    class Meta:
        model = Poll
        fields = ["id", "topic", "question", "choices"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CommentUserLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentUserLikes
        fields = '__all__'




