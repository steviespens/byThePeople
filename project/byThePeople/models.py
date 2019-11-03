from django.db import models
from api.models import User


class Poll(models.Model):
    question = models.CharField(max_length=1000)
    topic = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
   
    class Meta:
        ordering = ["-pk"]

    objects = models.Manager()

class UpcomingBill(models.Model):
    bill_id = models.CharField(max_length=100, unique=True)
    bill_slug = models.CharField(max_length=100) #can get from bill_id
    bill_type = models.CharField(max_length=100)  #can get from bill_id
    bill_uri = models.CharField(max_length=500)
    title = models.CharField(max_length=5000) 
    short_title = models.CharField(max_length=5000, null=True)
    sponsor_id = models.CharField(max_length=100)
    congressdotgov_url = models.CharField(max_length=500)
    introduced_date = models.CharField(max_length=100)  
    active = models.BooleanField(null=True)
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

    objects = models.Manager()


class Headline(models.Model):
    title = models.CharField(max_length=1000)
    description = models.CharField(max_length=2000) 
    url = models.CharField(max_length=500)
    
    def __str__(self):
        return self.title

    objects = models.Manager()


class Choice(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="choices", blank=True)
    choice = models.CharField(max_length=500)
    votes = models.IntegerField(default=0)

    class Meta:
        ordering = ["-pk"]
    
    objects = models.Manager()


class PollUserVotes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id", blank=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="poll_id", blank=True)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name="choice_id", blank=True)
    time_voted = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'poll')

    objects = models.Manager()


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user", blank=True)
    bill = models.ForeignKey(UpcomingBill, on_delete=models.CASCADE, related_name="bill", blank=True)
    text = models.CharField(max_length=1500)
    created = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

    objects = models.Manager()


class CommentUserLikes(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="comment", blank=True)
    comment_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comment_user", blank=True)
    action = models.IntegerField(default=0)

    class Meta:
        unique_together = ('comment_user', 'comment')

    objects = models.Manager()



