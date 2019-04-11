from django.urls import path, re_path
from . import views
urlpatterns = [
    path('', views.index),
    path('home/', views.index),
    path('about/', views.about),
    path('docket/', views.docket),
    path('polls/', views.polls),
    path('news/', views.news),
    path('user/', views.user),
    re_path(r'.*', views.index), #directly routing the path 'login/' to views.index would also work


]