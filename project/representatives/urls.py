from django.urls import path
from django.conf.urls import url, include

from rest_framework.routers import DefaultRouter

from . import views

BASE = 'reps/'
DOCKET_BASE = 'docket/reps/'
router = DefaultRouter()

router.register(r'house', views.HouseRepView, basename=BASE)
router.register(r'senate', views.SenatorView, basename=BASE)
router.register(r'member', views.MemberView, basename=BASE)

urlpatterns = [
   
    url(r'^(docket/|about/|polls/|representatives/)?reps/', include(router.urls)),

]
