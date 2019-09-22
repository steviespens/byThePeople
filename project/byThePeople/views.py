from byThePeople.models import Member, UpcomingBill, Headline, Poll, Choice, PollUserVotes, Comment, CommentUserLikes
from api.models import User
from byThePeople.serializers import (MemberSerializer, UpcomingBillSerializer, HeadlineSerializer, PollSerializer, ChoiceSerializer,
    PollUserVotesSerializer, CommentSerializer, CommentUserLikesSerializer)
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
from django.core import serializers
import operator, math
import html as html_pkg
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
import datetime

# from helpers import get_html

from bs4 import BeautifulSoup
# import urllib3


# def get_html(url=None):
#     url2 = "https://docs.house.gov/floor/"
#     http = urllib3.PoolManager()
#     response = http.request('GET', url)
#     soup = BeautifulSoup(response.data)
#     return soup.title



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
class JSONFileView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)
    # def get(self, request, prefix, billNumber, congressNumber):
    #     root_path = "/Users/stevie/Desktop/congressAPI/congress/data"
    #     folder_name = 'bills'
    #     file_name = "data.json"
    #     file_path = os.path.join(root_path, congressNumber, folder_name, prefix, prefix + billNumber, file_name)
    #     with open(file_path, 'r') as jsonfile:
    #         json_data = json.load(jsonfile)
    #     return Response(json_data)
    
    @action(detail=False, methods=['post'], permission_classes=(AllowAny,), )
    def get_bill_data(self, request):
        data = json.loads(request.body.decode())
        congress = data['congress_num']
        bill_id = data['bill_num']
        url = 'https://api.propublica.org/congress/v1/' + congress + \
            '/bills/' + bill_id + '.json'
        headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
        r = requests.get(url = url, headers = headers)
        data = json.dumps(r.json())
        return Response(data)

    # def get(self, request, prefix, billNumber, congressNumber):
    #     root_path = 'https://s3.amazonaws.com/bythepeople/hr1/data.json'
    #     f = requests.get(root_path)
    #     a = f.json()
    #     return Response(a)
class TextFileView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request, prefix, billNumber, congressNumber):
        root_path = "/Users/stevie/Desktop/congress2/congress/data"
        folder_name = 'bills'
        suffix = "text-versions/ih/document.txt"
        file_path = os.path.join(root_path, congressNumber, folder_name, prefix, prefix + billNumber, suffix)
        with open(file_path, 'r') as f:
            t = f.read()
        return Response(json.dumps({'full_text': t}))
        # root_path = 'https://s3.amazonaws.com/bythepeople/' + prefix + billNumber + '/text-versions/ih/document.txt'
        # f = requests.get(root_path)
        # return Response(json.dumps({'full_text': f.decode()}))
    @action(detail=False, methods=['post'], permission_classes=(AllowAny,), )
    def get_bill_html(self, request):
        data = json.loads(request.body.decode())
        congress = data['congress_num']
        prefix = data['prefix']
        bill_num = data['num_bill']

        url = 'https://www.congress.gov/bill/' + congress + \
            'th-congress/' + prefix + '/' + bill_num + '/text'
        r = requests.get(url=url)
        html = r.content
        soup = BeautifulSoup(html, features="html.parser")
        cl = 'generated-html-container'
        text = soup.find_all('div', class_=cl)
        #returns empty list if nothing found (which is case for really new bills)
        #ADD SUPPORT
        s = str(text)
        # j = json.dumps({'full_text': text})
        return Response(s)


class MemberView(viewsets.ModelViewSet):
    #asView() is called, and returns the data by returning queryset. queryset is serialized using the provided serializer class
    def get_queryset(self):
        # get_members()
        return Member.objects.all()
    # queryset = Member.objects.all()
    serializer_class = MemberSerializer

  





class UpcomingBillListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UpcomingBillSerializer

    def get_queryset(self):
        # get_upcoming_bills()
        return UpcomingBill.objects.all()

    @action(detail=False, methods=['get'], permission_classes=(IsAuthenticated,), url_path='get_related_polls/(?P<bill_id>[^/.]+)')
    def get_related_polls(self, request, bill_id):
        bill = UpcomingBill.objects.get(bill_id=bill_id)
        polls = bill.related_polls.all()

        if polls.exists():
            serializer = PollSerializer(polls.first())
            return Response(json.dumps({'exists': True, 'polls': serializer.data}))
        return Response(json.dumps({'exists': False}))

    @action(detail=False, methods=['get'], permission_classes=(AllowAny,))
    def get_soup(self, request):
        title = get_html()
        return Response(json.dumps({'title': title}))
    
    @action(detail=False, methods=['get'], permission_classes=(AllowAny,))
    def get_recent_bills(self, request):
        def process_new_bills(bills):
            for i in bills:
                bill_id = i['bill_id']
                bill_slug = i['bill_slug'] #can get from bill_id
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
        # return UpcomingBill.objects.all()
        # bill = UpcomingBill.objects.get(id=bill_id)
        # polls = bill.related_polls.all()
        # if polls.exists():
        #     serializer = PollSerializer(polls.first())
        #     return Response(json.dumps({'exists': True, 'polls': serializer.data}))
        # return Response(json.dumps({'exists': False}))


        # data = json.loads(request.body.decode())
        #would want to actually send this congress_num param in the request in fetch_3()
        # congress = data['congress_num']
        congress = '116'
        url = 'https://api.propublica.org/congress/v1/' + congress + \
            '/both/bills/introduced.json'
        headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
        r = requests.get(url=url, headers=headers).json()
        bills = r['results'][0]['bills']
        process_new_bills(bills)
        MAX_NUM_RESULTS = 20
        #can set the argument to order_by below in model's Meta
        qset = UpcomingBill.objects.filter().order_by('-latest_major_action_date')[:MAX_NUM_RESULTS]
        ser = UpcomingBillSerializer(qset, many=True)
        return Response(ser.data)

        # data = json.dumps(r)
        # return Response(data)

    #takes in list of bill objects, checks if exist in db, inserts if not
        




    



class HeadlineListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    # permission_classes = (IsAuthenticated,)

    # def get_queryset(self):
    #     # get_headlines()
    #     return Headline.objects.all()
    queryset = Headline.objects.all()
    serializer_class = HeadlineSerializer


class PollListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    # permission_classes = (IsAuthenticated,)
    serializer_class = PollSerializer
    def get_queryset(self):
        NUM_TO_RETURN = 8
        topic = self.kwargs['topic']
        if topic is not None:
            return Poll.objects.filter(topic=topic)[:NUM_TO_RETURN]
        return Poll.objects.all()[:NUM_TO_RETURN]

    def get_topic(self, request, topic):
        qset = Poll.objects.filter(topic=topic)
        ser = serializers.serialize('json', qset)
        # ser = json.dumps(list(qset))
        return Poll.objects.all()
        # return Response(ser)

    @action(detail=False, methods=['get'], permission_classes=(AllowAny,))
    def get_recommended_polls(self, request):
        recs = compute_recommended_polls_list()
        rec_polls = []
        for i in recs:
            test = False
            j = 0
            polls = Poll.objects.filter(topic=i).order_by('-id')
            while not test:
                if polls[j] not in rec_polls:
                    rec_polls.append(polls[j])
                    test = True
                else:
                    j += 1
        ser = PollSerializer(rec_polls, many=True)
        return Response(ser.data)




    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def add_poll(self, request):
        data = json.loads(request.body.decode(), object_pairs_hook=OrderedDict)
        topic = data['topic']
        question = data['question']
        choices = data['choices']
        related_bill = data['related_bill']
        poll, created = Poll.objects.get_or_create(topic=topic, question=question)
        for k, v in choices.items():
            Choice.objects.get_or_create(poll =poll, choice=v)
        if UpcomingBill.objects.filter(bill_id=related_bill).exists():
            bill = UpcomingBill.objects.get(bill_id=related_bill)
            bill.related_polls.add(poll)
            bill.save()
        return Response(json.dumps(created))


    
#returns an ordered list of length LEN_LIST of poll topics that should be selected
def compute_recommended_polls_list(user=None):
    pv = PollUserVotes.objects.all() #need to only look at certain user
    alpha = .1
    now = datetime.datetime.utcnow()
    topics = {}
    for i in pv:
        time_voted = i.time_voted.replace(tzinfo=None)
        time_delta = now - time_voted  
        topic = i.poll.topic
        time_delta = time_delta.seconds / 360
        if topic in topics:
            topics[topic] += transform_fx(time_delta, alpha)
        else:
            topics[topic] = transform_fx(time_delta, alpha)
    # #normalize values
    topics = normalize(topics)
    print(topics)
    LEN_LIST = 8
    BUCKET_SIZE = .08
    recs = []
    for i in range(LEN_LIST):
        k = max(topics.items(), key=operator.itemgetter(1))[0]
        recs.append(k)
        topics.update({k: topics[k] - BUCKET_SIZE})
    return recs


class PollUserVotesCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    # permission_classes = (IsAuthenticated,)

    serializer_class = PollUserVotesSerializer
    def get_queryset(self):
        return PollUserVotes.objects.all()

    def user_has_voted_poll(self, request, poll_id):
        user_id = request.user.id
        return Response(json.dumps(PollUserVotes.objects.filter(user_id=user_id, poll_id=poll_id).exists()))
    

class CommentUserLikesCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    serializer_class = CommentUserLikesSerializer

    def user_has_liked_comment(self, request, comment_id):
        user_id = request.user.id
        obj = CommentUserLikes.objects.filter(comment_user=user_id, comment=comment_id)
        if obj.exists():
            obj = CommentUserLikes.objects.get(comment_user=user_id, comment=comment_id)
            # serializer = CommentUserLikesSerializer(obj)
            return Response(json.dumps(obj.action))
            
        return Response(json.dumps(0))
       

class ChoiceListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

    # @detail_route(methods=["post"])
    # def vote(self, request, pk=None):
    def vote(self, request, pk=None):

        
        obj = self.get_object()
        obj.votes = F('votes') + 1
        obj.save()
        poll_id = obj.poll.id
        PollUserVotes.objects.get_or_create(user_id = request.user.id, poll_id = obj.poll.id, choice_id = obj.id)
        serializer = PollSerializer(obj.poll)
        return Response(serializer.data)
        # serializer = ChoiceSerializer(obj)
        # return Response(serializer.data)
class CommentListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer
    # def get_queryset(self, request, bill_id):  #only receives the self argument
    #     return Comment.objects.filter(bill=bill_id)
    def get_comment_for_bill(self, request, bill_id):
        data = Comment.objects.filter(bill__bill_id=bill_id)
        if data.exists():
            serializer = CommentSerializer(data, many=True)
            # user_id = serializer.data[0]['user']
            # user = User.objects.get(id=user_id)       
        return Response(serializer.data) if data.exists() else Response([])

    def add_comment(self, request, comment):
        obj = json.loads(comment)
        bill = UpcomingBill.objects.get(id=obj['bill'])
        text = obj['text']
        user = User.objects.get(id=request.user.id)
        Comment.objects.create(user = user, bill = bill, text = text)
        return Response(True)
    def remove_comment(self, request, comment_id):
        return
    def get_user_email_for_comment(self, request, comment_id):
        data = Comment.objects.filter(id=comment_id)   
        serializer = CommentSerializer(data, many=True)
        user_id = serializer.data[0]['user']
        user = User.objects.get(id=user_id)
        return Response(user.get_email())
    def like(self, request, comment_id, action):
        comment = Comment.objects.get(id=comment_id)
        user = User.objects.get(id=request.user.id)
        already_liked = CommentUserLikes.objects.filter(comment_user=user, comment=comment).exists()
        likeInteger = 1
        dislikeInteger = 2
        action = int(action)
        if not already_liked:
            if (action == likeInteger):
                comment.likes = F('likes') + 1
                CommentUserLikes.objects.create(comment_user = user, comment = comment, action = 1)
            else:
                comment.dislikes = F('dislikes') + 1
                CommentUserLikes.objects.create(comment_user = user, comment = comment, action = 2)
            comment.save()
        else:
            obj = CommentUserLikes.objects.get(comment_user=user, comment=comment)
            if not (obj.action == action):
                if (action == likeInteger):
                    comment.likes = F('likes') + 1
                    comment.dislikes = F('dislikes') - 1
                else:
                    comment.dislikes = F('dislikes') + 1
                    comment.likes = F('likes') - 1
                obj.action = 1 if (action == 1) else 2
                obj.save()
                comment.save()
        comment = Comment.objects.filter(id=comment_id)
        serializer = CommentSerializer(comment, many=True)
        return Response(serializer.data)


def normalize(d, target=1.0):
    raw = sum(d.values())
    factor = target/raw
    return {key: value * factor for key, value in d.items()}
# def sort_topics(topics):
#     return sorted(topics.items(), key=lambda x: x[1])

def transform_fx(x, alpha=.2):
    root = 1 / 3
    # x_ = 2
    # b = 1
    # a = 1
    return math.exp(-(alpha * (x**(root))))
    return (- math.exp(a * (x-x_)) / (math.exp(a * (x-x_)) + 1 )) + b



def insert_poll():
    data = [
        {'topic': 'Data Privacy', 'question': 'Should Big Tech be regulated more?'},
        {'topic': 'Taxes', 'question': 'Should taxes on the rich be higher?'},
        {'topic': 'Gun Control', 'question': 'Should bump stocks be illegal?'},
        {'topic': 'General', 'question': 'Should President Trump be impeached?'},
        {'topic': 'General', 'question': 'Do you like Nancy Pelosi?'},

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
    # return
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


        




def convert_bill_id_with_congress_num(s):
    c = '-'
    return s.split(c)[0]
