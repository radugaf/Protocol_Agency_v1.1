from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from django.conf import settings
from protocol_crm.agent.models import AgentDetail


class AgentDetailsSerializer(serializers.Serializer):
    class Meta:
        model = AgentDetail
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('id', 'username', 'password', 'is_agent')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    # def create(self, validate_data):
    #     print("self")
    #     user = settings.AUTH_USER_MODEL.objects.create_user(validate_data['username'],
    #                                                         validate_data['email'], validate_data['password'])
    #     return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    # username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        # and user['is_agent']
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
