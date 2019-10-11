from rest_framework import serializers
from byThePeople.models import Member, UpcomingBill, Headline, Poll, Choice, PollUserVotes, Comment, CommentUserLikes


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        # fields = ('id', 'name', 'email', 'message')
        fields = '__all__'

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

        # fields = ["id", "choice", "votes", "question_id"]

class PollUserVotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollUserVotes
        fields = '__all__'

class PollSerializer(serializers.ModelSerializer):
    #many = True serializes querysets instead of objects
    #using serializers.ModelSerializer provides default implementations of create() and update()
    choices = ChoiceSerializer(many=True, required=False)
    # def create(self, validated_data):
    #     q = Question.objects.create(question=validated_data["choice"])

    #     for c in validated_data["choices"]:
    #         Choice.objects.create(question=q, choice=c["choice"])

    #     return q

    class Meta:
        model = Poll
        fields = ["id", "topic", "question", "choices"]
        # fields = ["id", "choices"]
        # fields = '__all__'
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CommentUserLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentUserLikes
        fields = '__all__'




