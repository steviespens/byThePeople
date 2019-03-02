from django.db import models
from django.shortcuts import render, get_object_or_404
# from rest_framework.authtoken.models import Token as DefaultTokenModel
from django.conf import settings

from .utils import import_callable



class Member(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    def __str__(self):
        return self.first_name + " " + self.last_name


class UpcomingBill(models.Model):
    chamber = models.CharField(max_length=10)  #make enum
    bill_id = models.CharField(max_length=20)
    api_uri = models.CharField(max_length=50)
    legislative_day = models.CharField(max_length=10)  #make date
    scheduled_at = models.CharField(max_length=30)  #make date and time
    description = models.CharField(max_length=400)
    bill_url = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    def __str__(self):
        return self.description


class Headline(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=10000) 
    url = models.CharField(max_length=100) 
    # urlToImage = models.CharField(max_length=100)
    def __str__(self):
        return self.title

class Poll(models.Model):
    question = models.CharField(max_length=200)
    topic = models.CharField(max_length=20)
    # def __str__(self):
    #     return self.question
    class Meta:
        ordering = ["-pk"]


# def get_choices_for_poll(poll_id):
#     poll = get_object_or_404(Poll, pk=poll_id)
#     return Choice.objects.filter()


class Choice(models.Model):
    # poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="choices", blank=True)


    choice = models.CharField(max_length=3)
    
    votes = models.IntegerField(default=0)
    class Meta:
        ordering = ["-pk"]

    # def __str__(self):
        # return self.choice

