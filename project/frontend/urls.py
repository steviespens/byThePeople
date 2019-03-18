from django.urls import path
from . import views
urlpatterns = [
    path('', views.index),
    path('home/', views.index),
    path('about/', views.about),
    path('docket/', views.docket),
    path('polls/', views.polls),
    path('news/', views.news),
    path('user/', views.user),


]