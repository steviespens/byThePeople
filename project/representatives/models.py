from django.db import models
from byThePeople.models import UpcomingBill

class BaseMember(models.Model):
    identifier = models.CharField(max_length=100) 
    short_title = models.CharField(max_length=100) 
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    #date_of_birth = models.DateField(null=True)
    gender = models.CharField(max_length=1)
    party = models.CharField(max_length=10)
    in_office = models.BooleanField()
    seniority = models.IntegerField()
    #last_updated = models.DateTimeField() 
    state = models.CharField(max_length=2)
    votes_with_party_pct = models.FloatField()
    chamber = models.CharField(max_length=1)
    picture_uri = models.CharField(max_length=500)
    # fields = ['identifier', 'short_title', 'first_name', 'middle_name', 'last_name', 'date_of_birth', 'gender',]
    fields = ['senate_class', 'member_senator']
    def __str__(self):
        return self.first_name + " " + self.last_name
class Senator(models.Model):
    senate_class = models.IntegerField()
    member = models.OneToOneField(BaseMember, on_delete=models.CASCADE, related_name='member_senator', primary_key=True,)

class HouseRep(models.Model):
    district = models.IntegerField()
    member = models.OneToOneField(BaseMember, on_delete=models.CASCADE, related_name='member_house_rep', primary_key=True,)

class MemberBillVotes(models.Model):
    member = models.ForeignKey(BaseMember, on_delete=models.CASCADE, related_name="member_bill_votes_member", blank=False)
    bill = models.ForeignKey(UpcomingBill, on_delete=models.CASCADE, related_name="member_bill_votes_bill", blank=False)
    position = models.CharField(max_length=50, null=True, blank=True)

    # class Meta:
    #     unique_together = (('member', 'bill'))

#hi