from rest_framework import response, viewsets, status, permissions, generics
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .serializers import ProfileSerializer, UserSerializer
from .models import Profile
from django.contrib.auth import get_user_model

User = get_user_model()

# profile Api
class ProfileAPI(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, pk=None, *args, **kwargs):
        user = get_object_or_404(User, pk=pk)
        profile = get_object_or_404(Profile, user=user)
        serializer = ProfileSerializer(profile)
        return response.Response(serializer.data)

    def update(self, request, pk=None, *args, **kwargs):
        data = request.data
        user = get_object_or_404(User, pk=pk)
        user.username = data['username']
        user.email = data['email']
        user.save()
        profile = get_object_or_404(Profile, user=user)
        profile.gender = data['gender']
        profile.age = data['age']
        profile.contact = data['contact']
        profile.save()

        serializer = ProfileSerializer(profile)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

# check username
@api_view(['POST'])
def check_username_api(request):
    username = request.data["username"]
    if User.objects.filter(username=username).exists():
        return response.Response({"exists": True}, status=status.HTTP_200_OK)
    return response.Response({"exists": False})

# check email
@api_view(['POST'])
def check_email_api(request):
    email = request.data["email"]
    if User.objects.filter(email=email).exists():
        return response.Response({"exists": True}, status=status.HTTP_200_OK)
    return response.Response({"exists": False})

# remove account
class RemoveAccountAPI(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
