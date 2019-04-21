from django.urls import path
from django.conf.urls import url, include

from . import views
from rest_framework.routers import DefaultRouter
BASE = 'api/'
# from apps.poll.api import view_sets as poll_viewsets
router = DefaultRouter()
# router.register(r'polls', views.PollListCreate.as_view({'get': 'list'}), basename = BASE)
# router.register(r'choices', views.ChoiceListCreate.as_view({'get': 'list'}), basename = BASE)
router.register(r'polls', views.PollListCreate, basename = BASE)
# router.register(r'choices', views.ChoiceListCreate, basename=BASE)
# router.register(r'jsonfiles/(?P<filename>[^/]+)/$', views.JSONFileView, basename = BASE)

# router.register(r'rest-auth',)


urlpatterns = [
    #creates a path object with the given string and a view to return. you can also pass a name parameter to name the path
    #path is the url creation function
    
    #don't need .as_view() if using functional views
    url('api/jsonfiles/<filename>/', views.JSONFileView.as_view(), name='file_retrieve'),

    path('api/member/', views.MemberListCreate.as_view()),
    path('docket/api/upcomingbill/', views.UpcomingBillListCreate.as_view()),
    path('api/upcomingbill/', views.UpcomingBillListCreate.as_view()),
    path('news/api/headline/', views.HeadlineListCreate.as_view()),
    path('api/headline/', views.HeadlineListCreate.as_view()),
    path('api/jsonfiles/<prefix>/<billNumber>/<congressNumber>/', views.JSONFileView.as_view()),
    path('api/textfiles/<prefix>/<billNumber>/<congressNumber>/', views.TextFileView.as_view()),
    path('polls/user_has_voted_poll/<poll_id>/', views.PollUserVotesCreate.as_view({'get': 'user_has_voted_poll'})),
    path('api/choices/<pk>/', views.ChoiceListCreate.as_view({'post': 'vote'})),

    # path('api/polls/', views.PollListCreate.as_view({'get': 'list'})),
    # path('api/choices/', views.ChoiceListCreate.as_view({'get': 'list'})),
    url(r'^api/', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    # url(r'^api/jsonfiles/(?P<filename>[^/]+)/$', views.JSONFileView.as_view()),
    # url(r'^$', TemplateView.as_view(template_name="home.html"), name='home'),
    # url(r'^signup/$', TemplateView.as_view(template_name="signup.html"),
    #     name='signup'),
    # url(r'^email-verification/$',
    #     TemplateView.as_view(template_name="email_verification.html"),
    #     name='email-verification'),
    # url(r'^login/$', views.LoginView.as_view(),
    #     name='login'),
    # url(r'^logout/$', TemplateView.as_view(template_name="logout.html"),
    #     name='logout'),
        







]
