from django.urls import path
from django.conf.urls import url, include

from . import views
from rest_framework.routers import DefaultRouter
BASE = 'reps/'
DOCKET_BASE = 'docket/reps/'
# from apps.poll.api import view_sets as poll_viewsets
router = DefaultRouter()
router2 = DefaultRouter()
# router.register(r'polls', views.PollListCreate.as_view({'get': 'list'}), basename = BASE)
# router.register(r'choices', views.ChoiceListCreate.as_view({'get': 'list'}), basename = BASE)
router.register(r'house', views.HouseRepView, basename=BASE)
router.register(r'senate', views.SenatorView, basename=BASE)
router.register(r'member', views.MemberView, basename=BASE)
# router.register(r'house', views.HouseRepView, basename=DOCKET_BASE)
# router.register(r'senate', views.SenatorView, basename=DOCKET_BASE)
# router.register(r'member', views.MemberView, basename=DOCKET_BASE)

# router.register(r'choices', views.ChoiceListCreate, basename=BASE)
# router.register(r'jsonfiles/(?P<filename>[^/]+)/$', views.JSONFileView, basename = BASE)
# router.register(r'rest-auth',)

urlpatterns = [
    # url('api/jsonfiles/<filename>/', views.JSONFileView.as_view(), name='file_retrieve'),

    # path('api/member/', views.MemberListCreate.as_view()),
    # path('reps/representatives/', views.RepresentativeView.as_view({'get': 'foo'})),
    # path('reps/representatives/', views.RepresentativeView.as_view({'get': 'list'})),

    url(r'^(docket/|about/|polls/|representatives/)?reps/', include(router.urls)),
    # url(r'^docket/reps/', include(router2.urls)),

    # url('reps/all_reps', views.all_reps),

]
