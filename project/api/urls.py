from django.urls import path
from django.conf.urls import url
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views


urlpatterns = [

    url(r'^(/|docket/|about/|polls/|representatives/)?api/register/', views.signup),
    url(r'^(/|docket/|about/|polls/|representatives/)?api/get_user_metadata/', views.get_user_metadata),
    url(r'^(/|docket/|about/|polls/|representatives/)?api/save_voting_district/', views.save_voting_district),
    
    url(r'^(register/|docket/|about/|polls/|representatives/)?api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^(register/|docket/|about/|polls/|representatives/)?api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),

]