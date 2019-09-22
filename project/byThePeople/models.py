from django.db import models
from django.shortcuts import render, get_object_or_404
# from rest_framework.authtoken.models import Token as DefaultTokenModel
from django.conf import settings
from django.utils import timezone
from .utils import import_callable
from api.models import User
# from django.contrib.auth.models import AbstractUser
# class CustomUser(AbstractUser):
#     pass





class Member(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    def __str__(self):
        return self.first_name + " " + self.last_name


class Poll(models.Model):
    question = models.CharField(max_length=1000)
    topic = models.CharField(max_length=200)
    # def __str__(self):
    #     return self.question
    class Meta:
        ordering = ["-pk"]
        # permissions = [
        #     ("modify_poll", "Can modify polls")
        # ]

class UpcomingBill(models.Model):
    # chamber = models.CharField(max_length=10)  #make enum
    # bill_id = models.CharField(max_length=100)
    # api_uri = models.CharField(max_length=500)
    # legislative_day = models.CharField(max_length=100)  #make date
    # scheduled_at = models.CharField(max_length=100)  #make date and time
    # description = models.CharField(max_length=5000) #changed name from description
    # bill_url = models.CharField(max_length=500)
    # url = models.CharField(max_length=500)
    # related_polls = models.ManyToManyField(Poll)

    bill_id = models.CharField(max_length=100)
    bill_slug = models.CharField(max_length=100) #can get from bill_id
    bill_type = models.CharField(max_length=100)  #can get from bill_id
    bill_uri = models.CharField(max_length=500)
    title = models.CharField(max_length=5000) #changed name from description
    short_title = models.CharField(max_length=5000)
    sponsor_id = models.CharField(max_length=100)
    congressdotgov_url = models.CharField(max_length=500)
    introduced_date = models.CharField(max_length=100)  #make actual date
    active = models.BooleanField(null=True)
    # last_vote = models.BooleanField(null=True)
    house_passage = models.CharField(max_length=100, null=True)
    senate_passage = models.CharField(max_length=100, null=True)
    enacted = models.CharField(max_length=100, null=True)
    vetoed = models.CharField(max_length=100, null=True)
    committees = models.CharField(max_length=1000)
    latest_major_action_date = models.CharField(max_length=100)
    latest_major_action = models.CharField(max_length=1000)
    related_polls = models.ManyToManyField(Poll)

    def __str__(self):
        return self.title


class Headline(models.Model):
    title = models.CharField(max_length=1000)
    description = models.CharField(max_length=20000) 
    url = models.CharField(max_length=500) 
    # urlToImage = models.CharField(max_length=100)
    def __str__(self):
        return self.title




# def get_choices_for_poll(poll_id):
#     poll = get_object_or_404(Poll, pk=poll_id)
#     return Choice.objects.filter()


class Choice(models.Model):
    # poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="choices", blank=True)


    choice = models.CharField(max_length=500)
    
    votes = models.IntegerField(default=0)
    class Meta:
        ordering = ["-pk"]
class PollUserVotes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id", blank=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="poll_id", blank=True)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name="choice_id", blank=True)
    time_voted = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('user', 'poll')



    # def __str__(self):
        # return self.choice

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user", blank=True)
    bill = models.ForeignKey(UpcomingBill, on_delete=models.CASCADE, related_name="bill", blank=True)
    text = models.CharField(max_length=1500)
    created = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)


class CommentUserLikes(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="comment", blank=True)
    comment_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comment_user", blank=True)
    action = models.IntegerField(default=0)

    class Meta:
        unique_together = ('comment_user', 'comment')



