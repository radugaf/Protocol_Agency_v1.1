from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from .views import UserCreateView
from .api import LoginAPI, UserAPI, ChangePasswordAPI, SendInvitationAPI, AgentResitrationAPI
# from knox import views as knox_views


app_name = "agent"


urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/login', LoginAPI.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('auth/change_password', ChangePasswordAPI.as_view()),
    path('auth/send_invitation', SendInvitationAPI.as_view()),
    path('auth/agent_registration', AgentResitrationAPI.as_view()),

    path('user-create', UserCreateView.as_view()),
    path('token', obtain_auth_token, name="obtain_token")
]
