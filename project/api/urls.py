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
    path('user/api/register/', views.signup),



    url(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),

]