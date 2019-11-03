from django.urls import path
from django.conf.urls import url, include

from . import views
from rest_framework.routers import DefaultRouter

BASE = 'api/'
BASE_POLLS = 'polls/'
router = DefaultRouter()

router.register(r'polls(/(?P<topic>.+))?', views.PollListCreate, basename=BASE)
router.register(r'upcomingbill', views.UpcomingBillListCreate, basename=BASE)
router.register(r'headline', views.HeadlineListCreate, basename=BASE)
router.register(r'polluservotes', views.PollUserVotesCreate, basename=BASE)
router.register(r'jsonfiles', views.JSONFileView, basename=BASE)
router.register(r'textfiles', views.TextFileView, basename=BASE)
router.register(r'comments', views.CommentListCreate, basename=BASE)
router.register(r'commentuserlikes', views.CommentUserLikesCreate, basename=BASE)
router.register(r'choices', views.ChoiceListCreate, basename=BASE)
router.register(r'polllist', views.PollListCreate, basename=BASE)

urlpatterns = [
    path('admin/api/polls/add_poll/', views.PollListCreate.as_view({'post': 'add_poll'})),
    url(r'^(/|docket/|about/|polls/|representatives/)?api/', include(router.urls)),
    url(r'^(docket/|about/|polls/|representatives/)?rest-auth/', include('rest_auth.urls')),
]
