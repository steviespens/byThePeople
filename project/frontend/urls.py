from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('home/', views.index),
    path('about/', views.index),
    path('docket/', views.index),
    path('polls/', views.index),
    path('representatives/', views.index),
    path('register/', views.index),
    path('admin/', views.index),
    
]