from byThePeople.models import Member, UpcomingBill, Headline, Poll, Choice
from byThePeople.serializers import (MemberSerializer, UpcomingBillSerializer, HeadlineSerializer, PollSerializer, ChoiceSerializer,
)
from rest_framework import generics
import requests
import json
import os
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils.decorators import method_decorator

from django.views.decorators.debug import sensitive_post_parameters

from rest_framework.decorators import detail_route
from rest_framework.response import Response
from django.db.models import F
from io import open

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response



API_HEADERS = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
API_HEADERS_HEADLINE = {'X-API-KEY': '33bb2b0ce3714fcd91e8ba124e2486d4'}
# ListCreateAPIView provides a get handler, for collection of model instances
# CreateAPIView provides post handler, use for create only endpoints
# RetrieveAPIView provides get handler for a single model instance
sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters(
        'password', 'old_password', 'new_password1', 'new_password2'
    )
)
class JSONFileView(APIView):
    def get(self, request, prefix, billNumber, congressNumber):
        # root_path2 = "/Users/stevie/Desktop/congressAPI/congress/data/116/bills/hr/hr1063"
        root_path = "/Users/stevie/Desktop/congressAPI/congress/data"
        folder_name = 'bills'
        file_name = "data.json"
        file_path = os.path.join(root_path, congressNumber, folder_name, prefix, prefix + billNumber, file_name)
        with open(file_path, 'r') as jsonfile:
            json_data = json.load(jsonfile)
        return Response(json_data)
class TextFileView(APIView):
    # authentication_classes = (SessionAuthentication, BasicAuthentication)
    # permission_classes = (IsAuthenticated,)

    def get(self, request, prefix, billNumber, congressNumber):
        root_path = "/Users/stevie/Desktop/congress2/congress/data"
        folder_name = 'bills'
        suffix = "text-versions/ih/document.txt"
        file_path = os.path.join(root_path, congressNumber, folder_name, prefix, prefix + billNumber, suffix)
        with open(file_path, 'r') as f:
            t = f.read()
        
        return Response(t)
class MemberListCreate(generics.ListCreateAPIView):
    #asView() is called, and returns the data by returning queryset. queryset is serialized using the provided serializer class
    def get_queryset(self):
        # get_members()
        return Member.objects.all()
    # queryset = Member.objects.all()
    serializer_class = MemberSerializer

class UpcomingBillListCreate(generics.ListCreateAPIView):
    def get_queryset(self):
        get_upcoming_bills()
        return UpcomingBill.objects.all()
    serializer_class = UpcomingBillSerializer

class HeadlineListCreate(generics.ListCreateAPIView):

    # authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        # get_headlines()
        return Headline.objects.all()
    queryset = Headline.objects.all()
    serializer_class = HeadlineSerializer


class PollListCreate(viewsets.ModelViewSet):
    # def get_queryset(self):
    #     insert_poll()
    #     x = Poll.objects.all()
    #     for i in x:
    #         i['choices'] = get_choices()
    #     return x
    def get_queryset(self):
        insert_poll()
        return Poll.objects.all()
    serializer_class = PollSerializer

    

def get_choices():
    return 'hey'

class ChoiceListCreate(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

    @detail_route(methods=["post"])
    def vote(self, request, pk=None):
        obj = self.get_object()
        obj.votes = F('votes') + 1
        obj.save()
        serializer = PollSerializer(obj.poll)
        return Response(serializer.data)
        # serializer = ChoiceSerializer(obj)
        # return Response(serializer.data)



def insert_poll():
    data = [
        {'topic': 'Data Privacy', 'question': 'Should Big Tech be regulated more?'},
        {'topic': 'Taxes', 'question': 'Should taxes on the rich be higher?'},
        {'topic': 'Gun Control', 'question': 'Should bump stocks be illegal?'}

    ]
    choices = ['Yes', 'No', 'Unsure']
    for i in data:
        poll, created = Poll.objects.get_or_create(topic=i['topic'], question=i['question'])
        for j in choices:
            Choice.objects.get_or_create(poll=poll, choice=j)




def get_headlines():
    api_endpoint = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=33bb2b0ce3714fcd91e8ba124e2486d4'
    r = requests.get(api_endpoint).json()
    for i in r['articles']:
        title = i['title']
        description = i['description']
        url = i['url']
        j,k = Headline.objects.get_or_create(title = title, description = description, url = url)





def get_members():
    api_endpoint = 'https://api.propublica.org/congress/v1/116/house/members.json'
    headers = API_HEADERS
    r = requests.get(api_endpoint, headers=headers).json()
    for i in r['results'][0]['members']:
        first_name = i['first_name']
        last_name = i['last_name']
        j,k = Member.objects.get_or_create(first_name = first_name, last_name = last_name)

def get_upcoming_bills():
    get_upcoming_house_bills()
    # get_upcoming_senate_bills()

def get_upcoming_house_bills():
    api_endpoint = 'https://api.propublica.org/congress/v1/bills/upcoming/house.json'
    headers = API_HEADERS
    r = requests.get(api_endpoint, headers=headers).json()
    for i in r['results'][0]['bills']:
        chamber = i['chamber']
        bill_id = i['bill_id']
        api_uri = i['api_uri']
        legislative_day = i['legislative_day']
        scheduled_at = i['scheduled_at']
        description = i['description']
        bill_url = i['bill_url']
        url = i['url']
        j,k = UpcomingBill.objects.get_or_create(chamber=chamber, bill_id=bill_id, api_uri=api_uri,
            legislative_day=legislative_day, scheduled_at=scheduled_at, description=description,
            bill_url=bill_url, url=url)

# returns empty json response, and thus no ['results'] key 
def get_upcoming_senate_bills():
    api_endpoint = 'https://api.propublica.org/congress/v1/bills/upcoming/senate.json'
    headers = API_HEADERS
    r = requests.get(api_endpoint, headers=headers).json()
    for i in r['results'][0]['bills']:
        chamber = i['chamber']
        bill_id = i['bill_id']
        api_uri = i['api_uri']
        legislative_day = i['legislative_day']
        scheduled_at = i['scheduled_at']
        description = i['description']
        bill_url = i['bill_url']
        url = i['url']
        UpcomingBill.objects.get_or_create(chamber=chamber, bill_id=bill_id, api_uri=api_uri,
            legislative_day=legislative_day, scheduled_at=scheduled_at, description=description,
            bill_url = bill_url, url = url)


        





