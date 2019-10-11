from rest_framework import serializers
from byThePeople.serializers import UpcomingBillSerializer
from representatives.models import BaseMember, HouseRep, Senator, MemberBillVotes

class BaseMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseMember
        fields = '__all__'

class SenatorSerializer(serializers.ModelSerializer):
    member = BaseMemberSerializer(many=False, required=False)

    class Meta:
        model = Senator
        # fields = '__all__'
        fields = ['senate_class', 'member']

       


class HouseRepSerializer(serializers.ModelSerializer):
    member = BaseMemberSerializer(many=False, required=False)
    class Meta:
        model = HouseRep
        # fields = '__all__'
        fields = ['district', 'member']

class MemberBillVotesSerializer(serializers.ModelSerializer):

    member = BaseMemberSerializer(many=False, required=True)
    bill = UpcomingBillSerializer(many=False, required=True)

    class Meta:
        model = MemberBillVotes
        fields = ['id', 'bill', 'member', 'position' ]
    # choices = ChoiceSerializer(many=True, required=False)
   
    # class Meta:
    #     model = Poll
    #     fields = ["id", "topic", "question", "choices"]
    #     # fields = ["id", "choices"]
    #     # fields = '__all__'


       




