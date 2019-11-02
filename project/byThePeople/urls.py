from django.urls import path
from django.conf.urls import url, include

from . import views
from rest_framework.routers import DefaultRouter
BASE = 'api/'
BASE_POLLS = 'polls/'
# from apps.poll.api import view_sets as poll_viewsets
router = DefaultRouter()
# router.register(r'polls', views.PollListCreate.as_view({'get': 'list'}), basename = BASE)
# router.register(r'choices', views.ChoiceListCreate.as_view({'get': 'list'}), basename = BASE)
router.register(r'polls(/(?P<topic>.+))?', views.PollListCreate, basename=BASE)

# router.register(r'polls/(?P<topic>.+)', views.PollListCreate, basename=BASE)
router.register(r'upcomingbill', views.UpcomingBillListCreate, basename=BASE)
router.register(r'headline', views.HeadlineListCreate, basename=BASE)
router.register(r'polluservotes', views.PollUserVotesCreate, basename=BASE)
router.register(r'jsonfiles', views.JSONFileView, basename=BASE)
router.register(r'textfiles', views.TextFileView, basename=BASE)
router.register(r'member', views.MemberView, basename=BASE)
router.register(r'comments', views.CommentListCreate, basename=BASE)
router.register(r'commentuserlikes', views.CommentUserLikesCreate, basename=BASE)
router.register(r'choices', views.ChoiceListCreate, basename=BASE)
router.register(r'polllist', views.PollListCreate, basename=BASE)

# router.register(r'choices', views.ChoiceListCreate, basename=BASE)
# router.register(r'jsonfiles/(?P<filename>[^/]+)/$', views.JSONFileView, basename = BASE)
# router.register(r'rest-auth',)

urlpatterns = [
    #creates a path object with the given string and a view to return. you can also pass a name parameter to name the path
    #path is the url creation function
    
    #don't need .as_view() if using functional views
    # path('comments/get_user_email_for_comment/<comment_id>/', views.CommentListCreate.as_view({'get': 'get_user_email_for_comment'})),
    # path('comments/like_comment/<comment_id>/<action>/', views.CommentListCreate.as_view({'get': 'like'})),
    # path('comments/user_has_liked_comment/<comment_id>/', views.CommentUserLikesCreate.as_view({'get': 'user_has_liked_comment'})),
    # path('comments/get_comment_for_bill/<bill_id>/', views.CommentListCreate.as_view({'get': 'get_comment_for_bill'})),
    # path('comments/add_comment/', views.CommentListCreate.as_view({'post': 'add_comment'})),

    # path('api/choices/<pk>/', views.ChoiceListCreate.as_view({'post': 'vote'})),
    # path('api/polls/get_topic/<topic>/', views.PollListCreate.as_view({'get': 'get_topic'})),
    # path('api/polls/get_recommended_polls/', views.PollListCreate.as_view({'get': 'get_recommended_polls'})),

    # path('polls/user_has_voted_poll/<poll_id>/', views.PollUserVotesCreate.as_view({'get': 'user_has_voted_poll'})),

    path('admin/api/polls/add_poll/', views.PollListCreate.as_view({'post': 'add_poll'})),


    # path('api/polls/', views.PollListCreate.as_view({'get': 'list'})),
    # path('api/choices/', views.ChoiceListCreate.as_view({'get': 'list'})),
    url(r'^(/|docket/|about/|polls/|representatives/)?api/', include(router.urls)),
    url(r'^(docket/|about/|polls/|representatives/)?rest-auth/', include('rest_auth.urls')),
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
        
    url(r'^convert/', include('lazysignup.urls')),






]
