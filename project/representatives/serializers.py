from rest_framework import serializers
from representatives.models import BaseMember, HouseRep, Senator

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

       




