from representatives.models import BaseMember, Senator, HouseRep, MemberBillVotes
from api.models import User
from byThePeople.models import UpcomingBill
from byThePeople.serializers import UpcomingBillSerializer
from representatives.serializers import (BaseMemberSerializer, SenatorSerializer, HouseRepSerializer, MemberBillVotesSerializer)
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
from bs4 import BeautifulSoup
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
    return
    # print('called allreps')

class MemberView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)
    def get_queryset(self):
        return HouseRep.objects.all()

    #dont actually need a serializer class
    serializer_class = HouseRepSerializer


    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def get_member_by_id(self, request, *args, **kwargs):
        def get_bio(id):
            url = 'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + id
            r = requests.get(url=url)
            html = r.content
            soup = BeautifulSoup(html, features="html.parser")
            text = soup.find('p').text
            import bleach
            clean = bleach.clean(text, tags=[], strip=True)
            return clean

        data = json.loads(request.body.decode())
        id = data['id']
        url = 'https://api.propublica.org/congress/v1/members/' + id + '.json'
        headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
        r = requests.get(url=url, headers=headers)
        bio = get_bio(id)
        tmp = r.json()
        #modifying the json i would've received from propublica api by adding a bio field
        tmp['results'][0]['bio'] = bio
        # data = json.dumps({**r.json(), **{'bio': bio}})
        # data = json.dumps(r.json())
        data = json.dumps(tmp)


        return Response(data)

    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def get_bills_by_member_by_id(self, request, *args, **kwargs):
        #get error with rep Miller
        def process_new_bills(bills):
            # already_added = UpcomingBill.objects.values_list('bill_id', flat=True)
            # l = []
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

                # b, created = UpcomingBill.objects.update_or_create(bill_id=bill_id, bill_slug=bill_slug, bill_type=bill_type, bill_uri=bill_uri, title=title, short_title=short_title, sponsor_id=sponsor_id, congressdotgov_url=congressdotgov_url, introduced_date=introduced_date, active=active, house_passage=house_passage, senate_passage=senate_passage, enacted=enacted, vetoed=vetoed, committees=committees, latest_major_action_date=latest_major_action_date, latest_major_action=latest_major_action)
                b, created = UpcomingBill.objects.update_or_create(
                    bill_id=bill_id,
                    defaults={
                    'bill_slug':bill_slug,
                    'bill_type':bill_type,
                    'bill_uri':bill_uri,
                    'title':title,
                    'short_title':short_title,
                    'sponsor_id':sponsor_id,
                    'congressdotgov_url':congressdotgov_url,
                    'introduced_date':introduced_date,
                    'active' : active,
                    'house_passage':house_passage,
                    'senate_passage':senate_passage,
                    'enacted' : enacted,
                    'vetoed':vetoed,
                    'committees':committees,
                    'latest_major_action_date':latest_major_action_date,
                    'latest_major_action':latest_major_action})

                # l.append(b)
                # else:
                #     #print(title)
                #     # print('added ' + bill_id)

                #     UpcomingBill.objects.filter(bill_id=bill_id).update(title=title, short_title=short_title, active=active, house_passage=house_passage, senate_passage=senate_passage, enacted=enacted, vetoed=vetoed, committees=committees, latest_major_action_date=latest_major_action_date, latest_major_action=latest_major_action)
            return 
        data = json.loads(request.body.decode())
        id = data['id']
        url = 'https://api.propublica.org/congress/v1/members/' + id + '/bills/introduced.json'
        headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
        r = requests.get(url=url, headers=headers).json()
        bills = r['results'][0]['bills']
        process_new_bills(bills)
        # UpcomingBill.objects.bulk_create(to_add)
        MAX_NUM_RESULTS = 20
        sponsor_id = r['results'][0]['id']
        #can set the argument to order_by below in model's Meta
        qset = UpcomingBill.objects.filter(sponsor_id=sponsor_id).order_by('-latest_major_action_date')[:MAX_NUM_RESULTS]
        ser = UpcomingBillSerializer(qset, many=True)
        return Response(ser.data)

    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def get_recent_votes_by_member_by_id(self, request, *args, **kwargs):
        
        def process_recent_votes(bills, identifier):
            l = []
            member = BaseMember.objects.get(identifier=identifier)
            l2 = MemberBillVotes.objects.filter(member=member).values_list('bill_id', flat=True)  #should return dict of bill_ids
            l3 = UpcomingBill.objects.values_list('bill_id', flat=True) #should return dict of bill_ids
            already_checked_bills = []
            for i in bills:
                bill_id = i['bill']['bill_id']
                if (bill_id not in l3 and bill_id not in already_checked_bills):
                    #INSERT BILL OBJECT
                    bill_slug, congress = bill_id.split('-') #can get from bill_id
                    if bill_slug[:2] == 'pn':
                        continue
                    url2 = 'https://api.propublica.org/congress/v1/' + congress + '/bills/' + bill_slug + '.json'
                    headers2 = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
                    r2 = requests.get(url=url2, headers=headers2).json()
                    bill = r2['results'][0]
                    bill_type = bill['bill_type']  #can get from bill_id
                    bill_uri = bill['bill_uri']
                    title = bill['title']
                    short_title = bill['short_title']
                    sponsor_id = bill['sponsor_id']
                    congressdotgov_url = bill['congressdotgov_url']
                    introduced_date = bill['introduced_date']  #make actual date
                    active = bill['active']
                    # # last_vote = i['last_vote']
                    house_passage = bill['house_passage']
                    senate_passage = bill['senate_passage']
                    enacted = bill['enacted']
                    vetoed = bill['vetoed']
                    committees = bill['committees']
                    latest_major_action_date = bill['latest_major_action_date']
                    latest_major_action = bill['latest_major_action']
                    b = UpcomingBill(bill_id=bill_id, bill_slug=bill_slug, bill_type=bill_type, bill_uri=bill_uri, title=title, short_title=short_title, sponsor_id=sponsor_id, congressdotgov_url=congressdotgov_url, introduced_date=introduced_date, active=active, house_passage=house_passage, senate_passage=senate_passage, enacted=enacted, vetoed=vetoed, committees=committees, latest_major_action_date=latest_major_action_date, latest_major_action=latest_major_action)
                    b.save()
                if (bill_id not in l2 and bill_id not in already_checked_bills):
                    position = i['position']
                    #would like to have this
                    # if 'b' not in locals():
                    b = UpcomingBill.objects.get(bill_id=bill_id)
                    v = MemberBillVotes(bill=b, member=member, position=position)
                    l.append(v) 
                already_checked_bills.append(bill_id)
            return l
        data = json.loads(request.body.decode())
        id = data['id'] #sponsorid
        url = 'https://api.propublica.org/congress/v1/members/' + id + '/votes.json'
        headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
        r = requests.get(url=url, headers=headers).json()

        #NEED TO ENSURE THERE ARE NO DUPLICATES IN 
        bills = r['results'][0]['votes']
        l = process_recent_votes(bills, id)
        MemberBillVotes.objects.bulk_create(l) 

        MAX_NUM_RESULTS = 20
        member = BaseMember.objects.get(identifier=id) 
        qset = MemberBillVotes.objects.filter(member=member)[:MAX_NUM_RESULTS] #want to filter by most recent
        ser = MemberBillVotesSerializer(qset, many=True)
        return Response(ser.data)






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
        #date_of_birth =  None if not i['date_of_birth'] else date.fromisoformat(i['date_of_birth'])
        #date_of_birth = date.fromisoformat(i['date_of_birth'])
        gender = i['gender'].capitalize()
        party = i['party'].capitalize()
        in_office = i['in_office']
        seniority = int(i['seniority'])

        #last_updated = datetime.fromisoformat(format_iso_string(2)(i['last_updated']))
        state = i['state'].capitalize()
        votes_with_party_pct = i['votes_with_party_pct']/100 if 'votes_with_party_pct' in i else 0
        chamber = chamber_name[0].capitalize()
        member, created = BaseMember.objects.get_or_create(first_name=first_name,
                                                    middle_name=middle_name,
                                                    last_name=last_name,
                                                    identifier=identifier,
                                                    short_title=short_title,
                                                    gender=gender,
                                                    party=party,
                                                    in_office=in_office,
                                                    seniority=seniority,
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


    #requires rep id in request body
    # @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
    # def get_recent_votes_by_member_by_id(self, request):
        
    #     def process_recent_votes(bills):
    #         l = []
    #         for i in bills:
    #             identifier = i['member_id']
            
    #             bill_id = i['bill']['bill_id']
    #             bill_slug, congress = bill_id.split('-') #can get from bill_id
    #             if bill_slug[:2] == 'pn':
    #                 continue
    #             position = i['position']
    #             url2 = 'https://api.propublica.org/congress/v1/' + congress + '/bills/' + bill_slug + '.json'
    #             headers2 = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
    #             r2 = requests.get(url=url2, headers=headers2).json()
    #             bill = r2['results'][0]

    #             bill_type = bill['bill_type'] #can get from bill_id
    #             bill_uri = bill['bill_uri']
    #             title = bill['title']
    #             short_title = bill['short_title']
    #             sponsor_id = bill['sponsor_id']
    #             congressdotgov_url = bill['congressdotgov_url']
    #             introduced_date = bill['introduced_date']  #make actual date
    #             active = bill['active']
    #             # # last_vote = i['last_vote']
    #             house_passage = bill['house_passage']
    #             senate_passage = bill['senate_passage']
    #             enacted = bill['enacted']
    #             vetoed = bill['vetoed']
    #             committees = bill['committees']
    #             latest_major_action_date = bill['latest_major_action_date']
    #             latest_major_action = bill['latest_major_action']

    #             b, created = UpcomingBill.objects.update_or_create(bill_id=bill_id, bill_slug=bill_slug, bill_type=bill_type, bill_uri=bill_uri, title=title, short_title=short_title, sponsor_id=sponsor_id, congressdotgov_url=congressdotgov_url, introduced_date=introduced_date, active=active, house_passage=house_passage, senate_passage=senate_passage, enacted=enacted, vetoed=vetoed, committees=committees, latest_major_action_date=latest_major_action_date, latest_major_action=latest_major_action)
    #             member = BaseMember.objects.get(identifier=identifier)
    #             b2, created2 = MemberBillVotes.objects.update_or_create(bill=b, member=member, defaults={'position': position})
    #         return
    #     data = json.loads(request.body.decode())
    #     id = data['id']
    #     url = 'https://api.propublica.org/congress/v1/members/' + id + '/votes.json'
    #     headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
    #     r = requests.get(url=url, headers=headers).json()

    #     bills = r['results'][0]['votes']
    #     l = process_recent_votes(bills)
    #     MAX_NUM_RESULTS = 20
    #     # sponsor_id = r['results'][0]['id']
    #     member = BaseMember.objects.get(identifier=id)
    #     #can set the argument to order_by below in model's Meta
    #     qset = MemberBillVotes.objects.filter(member=member)[:MAX_NUM_RESULTS]
    #     ser = MemberBillVotesSerializer(qset, many=True)
    #     return Response(ser.data)
