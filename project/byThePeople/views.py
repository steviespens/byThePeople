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

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils.decorators import method_decorator

from django.views.decorators.debug import sensitive_post_parameters

from rest_framework.decorators import detail_route
from rest_framework.response import Response
from django.db.models import F
from io import open
import collections
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

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
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, prefix, billNumber, congressNumber):
        # root_path2 = "/Users/stevie/Desktop/congressAPI/congress/data/116/bills/hr/hr1063"
        print('get json file view ' + str(request.user.is_authenticated))

        root_path = "/Users/stevie/Desktop/congressAPI/congress/data"
        folder_name = 'bills'
        file_name = "data.json"
        file_path = os.path.join(root_path, congressNumber, folder_name, prefix, prefix + billNumber, file_name)
        with open(file_path, 'r') as jsonfile:
            json_data = json.load(jsonfile)
        return Response(json_data)
class TextFileView(APIView):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, prefix, billNumber, congressNumber):
        root_path = "/Users/stevie/Desktop/congress2/congress/data"
        folder_name = 'bills'
        suffix = "text-versions/ih/document.txt"
        file_path = os.path.join(root_path, congressNumber, folder_name, prefix, prefix + billNumber, suffix)
        with open(file_path, 'r') as f:
            t = f.read()
        return Response(json.dumps({'full_text': t}))

class MemberListCreate(generics.ListCreateAPIView):
    #asView() is called, and returns the data by returning queryset. queryset is serialized using the provided serializer class
    def get_queryset(self):
        # get_members()
        return Member.objects.all()
    # queryset = Member.objects.all()
    serializer_class = MemberSerializer

class UpcomingBillListCreate(generics.ListCreateAPIView):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UpcomingBillSerializer

    def get_queryset(self):
        get_upcoming_bills()
        return UpcomingBill.objects.all()
    # def get_related_polls(self, request):


class HeadlineListCreate(generics.ListCreateAPIView):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        get_headlines()
        return Headline.objects.all()
    queryset = Headline.objects.all()
    serializer_class = HeadlineSerializer


class PollListCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

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

class PollUserVotesCreate(viewsets.ModelViewSet):
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    serializer_class = PollUserVotesSerializer

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
            serializer = CommentUserLikesSerializer(obj)
            print(json.dumps(obj.action))
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
        data = Comment.objects.filter(bill_id=bill_id)
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


        





