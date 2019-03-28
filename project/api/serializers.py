# from rest_framework import serializers
# from login.models import CustomUser

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Member
#         # fields = ('id', 'name', 'email', 'message')
#         fields = '__all__'


from rest_framework import serializers
from . import models

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.CustomUser
#         fields = ('email', 'username', )