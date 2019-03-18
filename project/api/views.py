from django.shortcuts import render

# Create your views here.
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from . import models
from . import serializers

class CustomUserView(APIView):
    # authentication_classes = (SessionAuthentication, BasicAuthentication)
    # permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

    def post(self, request, format=None):
        # serializer = PollSerializer(obj.poll)
        return Response('posted')





# class UserListView(generics.ListCreateAPIView):
#     queryset = models.CustomUser.objects.all()
#     serializer_class = serializers.UserSerializer

# login page will have registration part and login part, like Facebook
# first onsubmit opens modal
# on modal, put in addl info, second submit button sends fetch post request
# make createUser view that creates user(maybe use django generics)
# return token
# go to home page, pass token to see everything, ProfileComponent will display user data
# all view requests must be authorized for componenets
# create logout button(unsure how you do this, probably destroy the token?)
# how to check that when first go to domain, it checks if you have token or not and returns
#     either login page or home page