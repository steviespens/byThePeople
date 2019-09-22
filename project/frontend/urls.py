from django.urls import path, re_path
from . import views
urlpatterns = [
    path('', views.index),
    path('home/', views.index),
    path('about/', views.index),
    path('docket/', views.index),
    path('polls/', views.index),
    path('representatives/', views.index),
    # path('news/', views.news),
    # path('user/', views.user),
    path('login/', views.index),
    path('admin/', views.index),

    
    # re_path(r'.*', views.index), #directly routing the path 'login/' to views.index would also work


]