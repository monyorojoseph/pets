from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model

User = get_user_model()

# profile serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        depth = 1

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']