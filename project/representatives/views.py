from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.decorators import api_view

from representatives.models import BaseMember, Senator, HouseRep, MemberBillVotes
from api.models import User
from byThePeople.models import UpcomingBill
from byThePeople.serializers import UpcomingBillSerializer
from representatives.serializers import (BaseMemberSerializer, SenatorSerializer, HouseRepSerializer, MemberBillVotesSerializer)

import requests
import json
from bs4 import BeautifulSoup

API_HEADERS = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
API_HEADERS_HEADLINE = {'X-API-KEY': '33bb2b0ce3714fcd91e8ba124e2486d4'}


class BaseMemberView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = BaseMemberSerializer

    def get_queryset(self):
        return BaseMember.objects.all()



class SenatorView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = SenatorSerializer

    def get_queryset(self):
        return Senator.objects.all()



class HouseRepView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = HouseRepSerializer
    
    def get_queryset(self):
        return HouseRep.objects.all()


class MemberView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = HouseRepSerializer
    
    def get_queryset(self):
        return HouseRep.objects.all()

    @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
    def get_member_by_id(self, request, *args, **kwargs):

        #changed url and text below due to external webpage changes
        def get_bio(id):
            # url = 'http://bioguide.congress.gov/scripts/biodisplay.pl?index=' + id
            url = 'http://bioguideretro.congress.gov/Home/MemberDetails?memIndex=' + id
            r = requests.get(url=url)
            html = r.content
            soup = BeautifulSoup(html, features="html.parser")
            # text = soup.find('p').text
            text = soup.find('biography').text
            import bleach
            clean = bleach.clean(text, tags=[], strip=True)
            return clean[2:] #remove unnecessary lowercase 'a' character

        data = json.loads(request.body.decode())
        id = data['id']
        url = 'https://api.propublica.org/congress/v1/members/' + id + '.json'
        headers = API_HEADERS        
        r = requests.get(url=url, headers=headers)
        tmp = r.json()
        bio = get_bio(id)

        #modifying the json received from propublica api by adding a bio field
        tmp['results'][0]['bio'] = bio
        data = json.dumps(tmp)
        return Response(data)

    @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
    def get_bills_by_member_by_id(self, request, *args, **kwargs):

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
                introduced_date = i['introduced_date']  
                active = i['active']
                # last_vote = i['last_vote']
                house_passage = i['house_passage']
                senate_passage = i['senate_passage']
                enacted = i['enacted']
                vetoed = i['vetoed']
                committees = i['committees']
                latest_major_action_date = i['latest_major_action_date']
                latest_major_action = i['latest_major_action']

                UpcomingBill.objects.update_or_create(
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

            return
            
        data = json.loads(request.body.decode())
        id = data['id']
        url = 'https://api.propublica.org/congress/v1/members/' + id + '/bills/introduced.json'
        headers = API_HEADERS
        r = requests.get(url=url, headers=headers).json()
        bills = r['results'][0]['bills']

        process_new_bills(bills)

        MAX_NUM_RESULTS = 20
        sponsor_id = r['results'][0]['id']
        qset = UpcomingBill.objects.filter(sponsor_id=sponsor_id).order_by('-latest_major_action_date')[:MAX_NUM_RESULTS]
        ser = UpcomingBillSerializer(qset, many=True)
        return Response(ser.data)

    @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
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

                    #throw out unwanted bill types
                    if len(bill_id.split('-')) != 2: 
                        continue
                    bill_slug, congress = bill_id.split('-')  
                    if bill_slug[:2] == 'pn':
                        continue
                    if bill_slug == 'adjourn':
                        continue

                    url2 = 'https://api.propublica.org/congress/v1/' + congress + '/bills/' + bill_slug + '.json'
                    headers2 = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
                    r2 = requests.get(url=url2, headers=headers2).json()
                    bill = r2['results'][0]

                    #catch errors from fetching previously unseen bill types e.g. adjourn
                    try:
                        bill = r2['results'][0]
                    except:
                        continue

                    bill_type = bill['bill_type']  
                    bill_uri = bill['bill_uri']
                    title = bill['title']
                    short_title = bill['short_title']
                    sponsor_id = bill['sponsor_id']
                    congressdotgov_url = bill['congressdotgov_url']
                    introduced_date = bill['introduced_date']  
                    active = bill['active']
                    house_passage = bill['house_passage']
                    senate_passage = bill['senate_passage']
                    enacted = bill['enacted']
                    vetoed = bill['vetoed']
                    committees = bill['committees']
                    latest_major_action_date = bill['latest_major_action_date']
                    latest_major_action = bill['latest_major_action']
                    
                    b = UpcomingBill(
                        bill_id=bill_id,
                        bill_slug=bill_slug,
                        bill_type=bill_type,
                        bill_uri=bill_uri,
                        title=title,
                        short_title=short_title,
                        sponsor_id=sponsor_id,
                        congressdotgov_url=congressdotgov_url,
                        introduced_date=introduced_date,
                        active=active,
                        house_passage=house_passage,
                        senate_passage=senate_passage,
                        enacted=enacted,
                        vetoed=vetoed,
                        committees=committees,
                        latest_major_action_date=latest_major_action_date,
                        latest_major_action=latest_major_action)
                    b.save()

                if (bill_id not in l2 and bill_id not in already_checked_bills):
                    position = i['position']
                    b = UpcomingBill.objects.get(bill_id=bill_id)
                    v = MemberBillVotes(bill=b, member=member, position=position)
                    l.append(v)
                    
                already_checked_bills.append(bill_id)

            return l

        data = json.loads(request.body.decode())
        id = data['id']  #sponsorid
        
        url = 'https://api.propublica.org/congress/v1/members/' + id + '/votes.json'
        headers = API_HEADERS
        r = requests.get(url=url, headers=headers).json()
        bills = r['results'][0]['votes']
        l = process_recent_votes(bills, id)
        MemberBillVotes.objects.bulk_create(l) 

        MAX_NUM_RESULTS = 20
        member = BaseMember.objects.get(identifier=id) 
        qset = MemberBillVotes.objects.filter(member=member)[:MAX_NUM_RESULTS] 
        ser = MemberBillVotesSerializer(qset, many=True)
        return Response(ser.data)



#takes one param 'senate' or 'house
#helper function for initially populating database with all reps and their information
def get_congress_members(chamber_name):

    if chamber_name != 'senate' and chamber_name != 'house':
        return
    api_endpoint = 'https://api.propublica.org/congress/v1/116/' + chamber_name + '/members.json'
    headers = API_HEADERS
    r = requests.get(api_endpoint, headers=headers).json()
    
    for i in r['results'][0]['members']:
        first_name = i['first_name']
        middle_name = i['middle_name']
        last_name = i['last_name']
        middle_name = middle_name if middle_name is not None else ''
        identifier = i['id']
        short_title = i['short_title']
        gender = i['gender'].capitalize()
        party = i['party'].capitalize()
        in_office = i['in_office']
        seniority = int(i['seniority'])
        state = i['state'].capitalize()
        votes_with_party_pct = i['votes_with_party_pct']/100 if 'votes_with_party_pct' in i else 0
        chamber = chamber_name[0].capitalize()
        
        #checking two endpoints likely to contain a picture of the rep
        u1 = 'https://theunitedstates.io/images/congress/225x275/' + identifier + '.jpg'
        u2 = 'https://www.congress.gov/img/member/' + identifier.lower() + '.jpg'
        r1 = requests.get(url=u1)
        r2 = requests.get(url=u2)
        if r1.status_code == 200:
            picture = u1
        elif r2.status_code == 200:
            picture = u2
        else:
            picture = ''
        
        member, created = BaseMember.objects.get_or_create(
            identifier=identifier,                               
            first_name=first_name,
            middle_name=middle_name,
            last_name=last_name,                              
            short_title=short_title,
            gender=gender,
            party=party,
            in_office=in_office,
            seniority=seniority,
            state=state,
            votes_with_party_pct=votes_with_party_pct,
            chamber=chamber,
            picture_uri=picture
            )
        
        if chamber_name == 'senate':
            senate_class = int(i['senate_class'])
            Senator.objects.get_or_create(member=member, senate_class=senate_class)
        else:
            AT_LARGE_INTEGER_VALUE = int(0)
            district = AT_LARGE_INTEGER_VALUE if i['at_large'] else int(i['district'])
            HouseRep.objects.get_or_create(member=member, district=district)



