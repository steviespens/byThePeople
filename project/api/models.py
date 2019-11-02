# from rest_framework import generics
from django.db import models
from enum import Enum

# from django.contrib.auth.models import AbstractBaseUser

#if need to use User in models 
# from django.contrib.auth import get_user_model
# User = get_user_model()

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)


# class User(AbstractBaseUser): #maybe abstractBaseUser
#     # username = models.CharField(max_length=40, unique=True)
#     # USERNAME_FIELD = 'username'
#     # class Meta:
#     #     abstract = False
#     #     app_label = 'api'
#     email = models.EmailField(
#                         verbose_name='email address',
#                         max_length=255,
#                         unique=True,
#                     )
#     # date_of_birth = models.DateField()
#     # is_active = models.BooleanField(default=True)

#     USERNAME_FIELD = 'email'
#     # REQUIRED_FIELDS = ['email']

#     # pass

class UserManager(BaseUserManager):
    def create_user(self, email, gender, political_party, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        elif not gender:
            raise ValueError('Users must select a gender')
        user = self.model(
            email=self.normalize_email(email),
            gender=gender,
            political_party=political_party,
            
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    
    MALE = 'male'
    FEMALE = 'female'
    NON_BINARY = 'non-binary'
    GENDER_CHOICES = (
        (MALE, 'male'),
        (FEMALE, 'female'),
        (NON_BINARY, 'non-binary'),
    )
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        default=MALE,
    )
    DEMOCRAT = 'democrat'
    REPUBLICAN = 'republican'
    LIBERTARIAN = 'libertarian'
    GREEN_PARTY = 'green'
    INDEPENDENT = 'independent'
    OTHER = 'other'
    POLITICAL_PARTY_CHOICES = (
        (DEMOCRAT, 'democrat'),
        (REPUBLICAN, 'republican'),
        (LIBERTARIAN, 'libertarian'),
        (GREEN_PARTY, 'green'),
        (INDEPENDENT, 'independent'),
        (OTHER, 'other'),
    )

    political_party = models.CharField(
        max_length=20,
        choices=POLITICAL_PARTY_CHOICES,
        default=INDEPENDENT,
    )

    CAUCASIAN = 'caucasian'
    AFRICAN_AMERICAN = 'african-american'
    AMERICAN_INDIAN = 'american-indian'
    HISPANIC = 'hispanic'
    ASIAN = 'asian'
    PACIFIC_ISLANDER = 'pacific-islander'
    OTHER_ETHNICITY = 'other'
    ETHNICITY_CHOICES = (
        (CAUCASIAN, 'caucasian'),
        (AFRICAN_AMERICAN, 'african-american'),
        (AMERICAN_INDIAN, 'american-indian'),
        (HISPANIC, 'hispanic'),
        (PACIFIC_ISLANDER, 'pacific-islander'),
        (OTHER_ETHNICITY, 'other'),
    )
    ethnicity = models.CharField(
        max_length=20,
        choices=ETHNICITY_CHOICES,
        default=OTHER_ETHNICITY,
    )

    LESS = 'less-than-high-school'
    HIGH_SCHOOL = 'high-school'
    SOME_COLLEGE = 'some-college'
    ASSOCIATE = 'associate'
    UNDERGRAD = 'undergraduate'
    MASTER = 'master'
    DOCTORATE = 'doctorate'
    EDUCATION_CHOICES = (
        (LESS, 'less-than-high-school'),
        (HIGH_SCHOOL, 'high-school'),
        (SOME_COLLEGE, 'some-college'),
        (ASSOCIATE, 'associate'),
        (UNDERGRAD, 'undergraduate'),
        (MASTER, 'master'),
        (DOCTORATE, 'doctorate'),
    )
    education = models.CharField(
        max_length=26,
        choices=EDUCATION_CHOICES,
        default=LESS,
    )
    LEVEL_0 = 0
    LEVEL_1 = 1
    LEVEL_2 = 2
    LEVEL_3 = 3
    LEVEL_4 = 4
    LEVEL_5 = 5
    LEVEL_6 = 6
    SALARY_CHOICES = (
        (LEVEL_0, 0),
        (LEVEL_1, 1),
        (LEVEL_2, 2),
        (LEVEL_3, 3),
        (LEVEL_4, 4),
        (LEVEL_5, 5),
        (LEVEL_6, 6),
    )
    salary = models.IntegerField(
            choices=SALARY_CHOICES,
            default=LEVEL_0,
        )
    MINOR = 0
    ELDER = 80

    AGE_CHOICES = (
        (MINOR, 0),
        *[(i,i) for i in range(ELDER)],
        (ELDER, 100),
    )

    age = models.IntegerField(
            choices=AGE_CHOICES,
            default=MINOR,
        )
    

    is_admin = models.BooleanField(default=False)

    state = models.CharField(
        max_length=2,
        default='XX'
    )
    district = models.IntegerField(default=0)

    
    # date_of_birth = models.DateField()
    # is_active = models.BooleanField(default=True)
    # is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['gender', 'political_party', 'ethnicity', 'education', 'salary', 'age']

    # def get_full_name(self):
    #     # The user is identified by their email address
    #     return self.email

    # def get_short_name(self):
    #     # The user is identified by their email address
    #     return self.email

    def __str__(self):              # __unicode__ on Python 2
        return self.email
    
    def get_gender(self):
        return self.gender

    def get_email(self):
        return self.email

    def get_all(self):
        return {'email': self.email, 'gender': self.gender, 'political_party': self.political_party,
            'state': self.state, 'district': self.district}

            # politicalParty: '',
            # ethnicity: '',
            # education: '',
            # salary: '',
            # age: ''

    

