from django.db import models

# Create your models here.
from django.db import models
from rest_framework import generics
from django.contrib.auth.models import AbstractUser
# Create your models here.
class CustomUser(AbstractUser):
    # name = models.CharField(blank=True, max_length=255)

    # def __str__(self):
    #     return self.email

    pass