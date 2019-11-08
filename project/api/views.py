from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.views.decorators.csrf import csrf_exempt

from api.models import User
from api.serializers import UserSerializer
from api.forms import UserCreationForm

import json


@api_view(['POST', ])
def save_voting_district(request):
    try:
        data = json.loads(request.body.decode())
        if request.user.is_anonymous:
            return Response(False)
        user = User.objects.get(id=request.user.id)
        user.state = data['state']
        user.district = data['district']
        user.save()
        return Response(True)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', ])
def get_user_metadata(request):
    try:
        user = User.objects.get(id=request.user.id)
        return Response(json.dumps(user.get_all()))
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'POST', ])
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.data)
        if form.is_valid():
            form.save()
            return Response('created new user')
        else:
            return Response(form.errors.as_json(), status=status.HTTP_400_BAD_REQUEST)
  