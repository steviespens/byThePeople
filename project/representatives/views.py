from representatives.models import BaseMember, Senator, HouseRep
from api.models import User
from byThePeople.models import UpcomingBill
from byThePeople.serializers import UpcomingBillSerializer
from representatives.serializers import (BaseMemberSerializer, SenatorSerializer, HouseRepSerializer)
from rest_framework import generics
import requests
import json
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from collections import OrderedDict
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils.decorators import method_decorator

from django.views.decorators.debug import sensitive_post_parameters

from rest_framework.decorators import detail_route, list_route, action
from rest_framework.response import Response
from django.db.models import F
from io import open
import collections
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from datetime import datetime, date
from itertools import chain
API_HEADERS = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
API_HEADERS_HEADLINE = {'X-API-KEY': '33bb2b0ce3714fcd91e8ba124e2486d4'}

from rest_framework.decorators import api_view

class BaseMemberView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)


    def get_queryset(self):
        # get_congress_members('senate')
        return BaseMember.objects.all()
    serializer_class = BaseMemberSerializer

class SenatorView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        # get_congress_members('senate')
        return Senator.objects.all()
    serializer_class = SenatorSerializer

class HouseRepView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        # get_congress_members('house')
        return HouseRep.objects.all()
    serializer_class = HouseRepSerializer

@api_view(['GET', 'POST', ])
def all_reps(request):
    print('called allreps')

class MemberView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)
    def get_queryset(self):
        return HouseRep.objects.all()

    #dont actually need a serializer class
    serializer_class = HouseRepSerializer

    @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
    def get_member_by_id(self, request):
        data = json.loads(request.body.decode())
        id = data['id']
        url = 'https://api.propublica.org/congress/v1/members/' + id + '.json'
        headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
        r = requests.get(url=url, headers=headers)
        data = json.dumps(r.json())
        return Response(data)
    @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
    def get_bills_by_member_by_id(self, request):
        
        def process_new_bills(bills):
            for i in bills:
                bill_id = i['bill_id']
                bill_slug = bill_id.split('-')[0] #can get from bill_id
                bill_type = i['bill_type'] #can get from bill_id
                bill_uri = i['bill_uri']
                title = i['title']
                short_title = i['short_title']
                sponsor_id = i['sponsor_id']
                congressdotgov_url = i['congressdotgov_url']
                introduced_date = i['introduced_date']  #make actual date
                active = i['active']
                # last_vote = i['last_vote']
                house_passage = i['house_passage']
                senate_passage = i['senate_passage']
                enacted = i['enacted']
                vetoed = i['vetoed']
                committees = i['committees']
                latest_major_action_date = i['latest_major_action_date']
                latest_major_action = i['latest_major_action']

                b, created = UpcomingBill.objects.update_or_create(bill_id=bill_id, bill_slug=bill_slug, bill_type=bill_type, bill_uri=bill_uri, title=title, short_title=short_title, sponsor_id=sponsor_id, congressdotgov_url=congressdotgov_url, introduced_date=introduced_date, active=active, house_passage=house_passage, senate_passage=senate_passage, enacted=enacted, vetoed=vetoed, committees=committees, latest_major_action_date=latest_major_action_date, latest_major_action=latest_major_action)
            return
        data = json.loads(request.body.decode())
        id = data['id']
        url = 'https://api.propublica.org/congress/v1/members/' + id + '/bills/introduced.json'
        headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
        r = requests.get(url=url, headers=headers).json()

        bills = r['results'][0]['bills']
        process_new_bills(bills)
        MAX_NUM_RESULTS = 20
        sponsor_id = r['results'][0]['id']
        #can set the argument to order_by below in model's Meta
        qset = UpcomingBill.objects.filter(sponsor_id=sponsor_id).order_by('-latest_major_action_date')[:MAX_NUM_RESULTS]
        ser = UpcomingBillSerializer(qset, many=True)
        return Response(ser.data)

        # data = json.dumps(r)
        # return Response(data)








#takes one param 'senate' or 'house
def get_congress_members(chamber_name):
    if chamber_name != 'senate' and chamber_name != 'house':
        return
    api_endpoint = 'https://api.propublica.org/congress/v1/116/' + chamber_name + '/members.json'
    headers = API_HEADERS
    r = requests.get(api_endpoint, headers=headers).json()
    #returns function that inserts colon n places from the end into a string
    def format_iso_string(n):
        return lambda s: s[: - n] + ':' + s[-n:]
        
    for i in r['results'][0]['members']:
        first_name = i['first_name']
        middle_name = i['middle_name']
        
        last_name = i['last_name']
        middle_name = middle_name if middle_name is not None else ''
        identifier = i['id']
        short_title = i['short_title']
        # date_of_birth = date(*[int(val) for val in i['date_of_birth'].split('-')])
        date_of_birth = date.fromisoformat(i['date_of_birth'])
        gender = i['gender'].capitalize()
        party = i['party'].capitalize()
        in_office = i['in_office']
        seniority = int(i['seniority'])

        last_updated = datetime.fromisoformat(format_iso_string(2)(i['last_updated']))
        state = i['state'].capitalize()
        votes_with_party_pct = i['votes_with_party_pct']/100 if 'votes_with_party_pct' in i else 0
        chamber = chamber_name[0].capitalize()
        member, created = BaseMember.objects.get_or_create(first_name=first_name,
                                                    middle_name=middle_name,
                                                    last_name=last_name,
                                                    identifier=identifier,
                                                    short_title=short_title,
                                                    date_of_birth=date_of_birth,
                                                    gender=gender,
                                                    party=party,
                                                    in_office=in_office,
                                                    seniority=seniority,
                                                    last_updated=last_updated,
                                                    state=state,
                                                    votes_with_party_pct=votes_with_party_pct,
                                                    chamber=chamber
                                                    )
        if True:
            if chamber_name == 'senate':
                senate_class = int(i['senate_class'])
                Senator.objects.get_or_create(member=member, senate_class=senate_class)
            else:
                AT_LARGE_INTEGER_VALUE = int(0)
                district = AT_LARGE_INTEGER_VALUE if i['at_large'] else int(i['district'])
                HouseRep.objects.get_or_create(member=member, district=district)




    # @action(detail=False, methods=['get'], permission_classes=(IsAuthenticated,), url_path='get_related_polls/(?P<bill_id>[^/.]+)')
    # def get_related_polls(self, request, bill_id):
    #     bill = UpcomingBill.objects.get(id=bill_id)
    #     polls = bill.related_polls.all()
    #     if polls.exists():
    #         serializer = PollSerializer(polls.first())
    #         return Response(json.dumps({'exists': True, 'polls': serializer.data}))
    #     return Response(json.dumps({'exists': False}))

