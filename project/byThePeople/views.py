
from django.core import serializers
from django.db.models import F

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

from byThePeople.models import UpcomingBill, Headline, Poll, Choice, PollUserVotes, Comment, CommentUserLikes
from api.models import User
from byThePeople.serializers import (UpcomingBillSerializer, HeadlineSerializer, PollSerializer, ChoiceSerializer,
    PollUserVotesSerializer, CommentSerializer, CommentUserLikesSerializer)

from collections import OrderedDict
import datetime
from bs4 import BeautifulSoup
from io import open
import requests
import operator, math
import json
import os


API_HEADERS = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
API_HEADERS_HEADLINE = {'X-API-KEY': '33bb2b0ce3714fcd91e8ba124e2486d4'}


class JSONFileView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    @action(detail=False, methods=['post'], permission_classes=(AllowAny,), )
    def get_bill_data(self, request, *args, **kwargs):
        data = json.loads(request.body.decode())
        congress = data['congress_num']
        bill_id = data['bill_num']
        url = 'https://api.propublica.org/congress/v1/' + congress + \
            '/bills/' + bill_id + '.json'
        headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}
        r = requests.get(url = url, headers = headers)
        data = json.dumps(r.json())
        return Response(data)


class TextFileView(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
       
    @action(detail=False, methods=['post'], permission_classes=(AllowAny,), )
    def get_bill_html(self, request, *args, **kwargs):

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
        text = soup.find('div', class_=cl)  #used to be find_all

        if text:
            text = str(text)
        else:
            text = ''

        cl2 = 'lbexHang'
        text2 = soup.find('p', class_=cl2)

        if text2:
            text2 = ' '.join(text2.text.split())
        else:
            text2 = ''

        #returns empty list if nothing found (which is case for really new bills)
        j = json.dumps({'full_text': text, 'summary': text2})
        return Response(j)


class UpcomingBillListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UpcomingBillSerializer

    def get_queryset(self):
        return UpcomingBill.objects.all()


    @action(detail=False, methods=['post'], permission_classes=(AllowAny,),)
    def get_related_polls(self, request, *args, **kwargs):

        data = json.loads(request.body.decode())
        bill_id = data['bill_id']
        bill = UpcomingBill.objects.get(bill_id=bill_id)
        polls = bill.related_polls.all()

        if polls.exists():
            serializer = PollSerializer(polls.first())
            return Response(json.dumps({'exists': True, 'polls': serializer.data}))

        return Response(json.dumps({'exists': False}))

    
    @action(detail=False, methods=['get'], permission_classes=(AllowAny,))
    def get_recent_bills(self, request, *args, **kwargs):
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
                    'latest_major_action': latest_major_action}
                    )
            return
       
        congress = '116'
        url = 'https://api.propublica.org/congress/v1/' + congress + \
            '/both/bills/introduced.json'
        headers = API_HEADERS
        r = requests.get(url=url, headers=headers).json()
        bills = r['results'][0]['bills']

        process_new_bills(bills)

        MAX_NUM_RESULTS = 20
        qset = UpcomingBill.objects.filter().order_by('-latest_major_action_date')[:MAX_NUM_RESULTS]
        ser = UpcomingBillSerializer(qset, many=True)
        return Response(ser.data)



class HeadlineListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)

    def get_queryset(self):
        get_headlines()
        NUM_HEADLINES_TO_RETURN = 20
        return Headline.objects.all()[:NUM_HEADLINES_TO_RETURN]

    serializer_class = HeadlineSerializer



class PollListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = PollSerializer


    def get_queryset(self):
        return Poll.objects.all()
       

    @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
    def get_topic(self, request, *args, **kwargs):

        data = json.loads(request.body.decode())
        topic = data['topic']
        NUM_TO_RETURN = 8

        if topic is not None:
            polls = Poll.objects.filter(topic=topic).order_by('-created_at')[:NUM_TO_RETURN]
        else:
            polls = Poll.objects.all()[:NUM_TO_RETURN]

        ser = PollSerializer(polls, many=True)
        return Response(ser.data)


    @action(detail=False, methods=['get'], permission_classes=(AllowAny,))
    def get_recommended_polls(self, request, *args, **kwargs):

        recs = compute_recommended_polls_list(user_id=request.user.id)
        rec_polls = []

        for i in recs:
            test = False
            j = 0

            polls = Poll.objects.filter(topic=i).order_by('-created_at')
            polls = sort_polls_by_voted_or_not(polls=polls, user=request.user.id, topic=i)
            
            while not test:
                if j >= len(polls):
                    break
                #make sure not already added poll to list
                elif polls[j] not in rec_polls:
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
            Choice.objects.get_or_create(poll=poll, choice=v)

        if UpcomingBill.objects.filter(bill_id=related_bill).exists():
            bill = UpcomingBill.objects.get(bill_id=related_bill)
            bill.related_polls.add(poll)
            bill.save()

        return Response(json.dumps(created))



class PollUserVotesCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = PollUserVotesSerializer

    def get_queryset(self):
        return PollUserVotes.objects.all()

    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def user_has_voted_poll(self, request, *args, **kwargs):
        data = json.loads(request.body.decode())
        poll_id = data['poll_id']
        user_id = request.user.id

        return Response(json.dumps(PollUserVotes.objects.filter(user_id=user_id, poll_id=poll_id).exists()))
    

class CommentUserLikesCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentUserLikesSerializer

    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def user_has_liked_comment(self, request, *args, **kwargs):

        data = json.loads(request.body.decode())
        comment_id = data['comment_id']
        user_id = request.user.id
        obj = CommentUserLikes.objects.filter(comment_user=user_id, comment=comment_id)

        if obj.exists():
            obj = CommentUserLikes.objects.get(comment_user=user_id, comment=comment_id)
            return Response(json.dumps(obj.action))
            
        return Response(json.dumps(0))
       

class ChoiceListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def vote(self, request, *args, **kwargs):
        data = json.loads(request.body.decode())
        choice_id = data['choice_id']
        choice = Choice.objects.get(id=choice_id)
        choice.votes += 1
        choice.save()
        PollUserVotes.objects.create(user_id = request.user.id, poll = choice.poll, choice = choice)
        serializer = PollSerializer(choice.poll)
        return Response(serializer.data)


class CommentListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer
    
    @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
    def get_comment_for_bill(self, request, *args, **kwargs):
        data = json.loads(request.body.decode())
        bill_id = data['bill_id']
        data = Comment.objects.filter(bill__bill_id=bill_id)

        if data.exists():
            serializer = CommentSerializer(data, many=True)

        return Response(serializer.data) if data.exists() else Response([])

    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def add_comment(self, request, *args, **kwargs):

        data = json.loads(request.body.decode())
        bill_id = data['bill']
        text = data['text']
        bill = UpcomingBill.objects.get(bill_id=bill_id)
        user = User.objects.get(id=request.user.id)

        Comment.objects.create(user = user, bill = bill, text = text)
        return Response(True)


    def remove_comment(self, request, comment_id):
        return


    @action(detail=False, methods=['post'], permission_classes=(AllowAny,))
    def get_user_email_for_comment(self, request, *args, **kwargs):

        data = json.loads(request.body.decode())
        comment_id = data['comment_id']
        data = Comment.objects.filter(id=comment_id)   
        serializer = CommentSerializer(data, many=True)
        user_id = serializer.data[0]['user']
        user = User.objects.get(id=user_id)
        return Response(user.get_email())


    @action(detail=False, methods=['post'], permission_classes=(IsAuthenticated,))
    def like(self, request, *args, **kwargs):
        data = json.loads(request.body.decode())
        comment_id = data['comment_id']
        action = data['action']
        comment = Comment.objects.get(id=comment_id)
        user = User.objects.get(id=request.user.id)
        already_liked = CommentUserLikes.objects.filter(comment_user=user, comment=comment).exists()
        likeInteger = 1
        dislikeInteger = 2
        action = int(action)

        if not already_liked:
            if (action == likeInteger):
                comment.likes = F('likes') + 1
                CommentUserLikes.objects.create(comment_user = user, comment = comment, action = likeInteger)
            else:
                comment.dislikes = F('dislikes') + 1
                CommentUserLikes.objects.create(comment_user=user, comment=comment, action=dislikeInteger)
                
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


####HELPER FUNCTIONS######

def sort_polls_by_voted_or_not(polls, user, topic):
    #gets list of this topic voted by user as list
    votes = PollUserVotes.objects.filter(user=user, poll__topic=topic).values_list('poll', flat=True)
    #create dict of polls with poll as key and whether user has voted as value
    r = {p: p.id in votes for p in polls}
    #return list of polls sorted by whether or not user voted
    return sorted(r, key=r.get) 
    

#returns an ordered list of length LEN_LIST of poll topics that should be selected
def compute_recommended_polls_list(user_id):

    pv = PollUserVotes.objects.filter(user=user_id) 
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

    #normalize values
    topics = normalize(topics)
    
    LEN_LIST = 8
    BUCKET_SIZE = .08
    
    #if no polls voted on yet, topics will be empty. make random dict instead
    if len(topics) < 1:
        import random
        all_topics = Poll.objects.order_by().values_list('topic',flat=True).distinct()
        topics = {topic: random.random() for topic in all_topics}

    recs = []

    for i in range(LEN_LIST):
        k = max(topics.items(), key=operator.itemgetter(1))[0]
        recs.append(k)
        topics.update({k: topics[k] - BUCKET_SIZE})

    return recs


def normalize(d, target=1.0):
    raw = max(sum(d.values()), 1)
    factor = target/raw
    return {key: value * factor for key, value in d.items()}


def transform_fx(x, alpha=.2):
    root = 1 / 3
    return math.exp(-(alpha * (x**(root))))


def get_headlines():
    api_endpoint = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=33bb2b0ce3714fcd91e8ba124e2486d4'
    r = requests.get(api_endpoint).json()

    for i in r['articles']:
        title = i['title']
        description = i['description']
        url = i['url']

        try:
            j, k = Headline.objects.get_or_create(title=title, description=description, url=url)
        except:
           return
