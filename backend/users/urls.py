from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register', views.RegistrationView.as_view(), name="register"),
    path('isauthenticated', views.IsAuthenticated.as_view(), name="sample")
]

urlpatterns += [
    path('userapi/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('userapi/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
