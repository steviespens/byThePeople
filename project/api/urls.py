from django.urls import path
from django.conf.urls import url, include

from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('api/user/', views.CustomUserView.as_view()),
    # path('user/api/user/<username>/<password>/', views.CustomUserView.as_view()),
    # path('user/api/register/<username>/<password>/', views.RegisterCustomUserView.as_view()),
    path('api/register/', views.signup),
    path('login/api/login_user/', views.login_user),
    path('api/get_user_metadata/', views.get_user_metadata),
    path('api/save_voting_district/', views.save_voting_district),

    url(r'^(register/|docket/|about/|polls/|representatives/)?api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^(register/|docket/|about/|polls/|representatives/)?api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    # url(r'^auth-jwt-verify/', verify_jwt_token),

]