# from rest_framework import generics
from django.db import models

# from django.contrib.auth.models import AbstractBaseUser

#if need to use User in models 
# from django.contrib.auth import get_user_model
# User = get_user_model()

from django.contrib.auth.models import AbstractUser



class User(AbstractUser): #maybe abstractBaseUser
    # username = models.CharField(max_length=40, unique=True)
    # USERNAME_FIELD = 'username'
    # class Meta:
    #     abstract = False
    #     app_label = 'api'
    pass
    



