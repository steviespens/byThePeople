from django.shortcuts import render
from rest_framework.decorators import detail_route

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from . import models
import json
from . import serializers
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from api.models import User
from api.serializers import UserSerializer
from api.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status

#not doing sqlinjection cleans in function below
@api_view(['POST', ])
def save_voting_district(request):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    data = json.loads(request.body.decode())
    if request.user.is_anonymous:
        return Response(False)
    user = User.objects.get(id=request.user.id)
    user.state = data['state']
    user.district = data['district']
    user.save()
    return Response(True)

@api_view(['GET', 'POST', ])
def get_user_metadata(request):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    user = User.objects.get(id=request.user.id)
    return Response(json.dumps(user.get_all()))

# @ensure_csrf_cookie
@api_view(['GET', 'POST', ])
def login_user(request):
    return Response({'token':'jsjs'})
    username = form.cleaned_data.get('username')
    raw_password = form.cleaned_data.get('password')
    user = authenticate(username=username, password=raw_password)
    x = login(request, user)
    return Response({'logged in':'here'})


@csrf_exempt
@api_view(['GET', 'POST', ])
def signup(request):
    
    #need to sqlinjection cleanse
    if request.method == 'POST':
        print(request.data)
        form = UserCreationForm(request.data)
        if form.is_valid():
            user = form.save()
            # username = form.cleaned_data.get('username')
            # raw_password = form.cleaned_data.get('password1')
            # user = authenticate(username=username, password=raw_password)
            # login(request, user)
            return Response('created new user')
        else:
            # print('form NOT VALID')
            # print(request.POST)
            # print(form.errors.as_json())
            # print(form.non_field_errors)
            return Response(form.errors.as_json(), status=status.HTTP_400_BAD_REQUEST)
    # else:
    #     form = UserCreationForm()
    # return render(request, 'signup.html', {'form': form})

# class CustomUserView(APIView):
#     # authentication_classes = (SessionAuthentication, BasicAuthentication)
#     # permission_classes = (IsAuthenticated,)

#     def get(self, request, username, password, format=None):
#         # content = {
#         #     'user': str(request.user),  # `django.contrib.auth.User` instance.
#         #     'auth': str(request.auth),  # None
#         # }
#         return Response(username)

#     def post(self, request, format=None):
#         # serializer = PollSerializer(obj.poll)
#         return Response('posted')

# class RegisterCustomUserView(APIView):
#     @detail_route(methods=["post"])
#     def register_user(self, request, username, password):
#         # create_user(identifier = username, email=None, password=password)
#         # MyUser.objects.get_or_create(identifier = username, password = password)
#         # serializer = PollSerializer(obj.poll)
#         return Response('created new user')

# class ChoiceListCreate(viewsets.ModelViewSet):
#     queryset = Choice.objects.all()
#     serializer_class = ChoiceSerializer

#     @detail_route(methods=["post"])
#     def vote(self, request, pk=None):
#         obj = self.get_object()
#         obj.votes = F('votes') + 1
#         obj.save()
#         serializer = PollSerializer(obj.poll)
#         return Response(serializer.data)






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