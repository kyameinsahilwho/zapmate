from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import get_user_model

from .models import *
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .permissions import IsNotSuperuserOrStaff
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


class UserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser | IsNotSuperuserOrStaff]

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser | IsNotSuperuserOrStaff]
    def get_queryset(self):
        queryset = CustomUser.objects.filter(id=self.request.user.id)
        return queryset


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegistrationSerializer

class UserLoginView(TokenObtainPairView):
    serializer_class = CustomUserLoginSerializer

class UserRefreshView(TokenRefreshView):
    serializer_class = CustomUserRefreshSerializer

# views.py

class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user_id = self.request.user.id
        return Profile.objects.filter(user_id=user_id)

    def perform_create(self, serializer):
        user_id = self.request.user.id
        serializer.save(user_id=user_id)

class ProfileUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.request.user.id
        if not user_id:
            raise PermissionDenied('User ID not found in token.')
        try:
            profile = Profile.objects.get(user_id=user_id)
        except Profile.DoesNotExist:
            raise ('Profile not found.')
        return profile

    def perform_update(self, serializer):
        user_id = self.request.user.id
        if not user_id:
            raise PermissionDenied('User ID not found in token.')
        user_model = get_user_model()
        user = user_model.objects.get(id=user_id)
        user.first_name = self.request.data.get('first_name', user.first_name)
        user.last_name = self.request.data.get('last_name', user.last_name)
        user.email = self.request.data.get('email', user.email)
        user.username = self.request.data.get('username', user.username)
        user.save()
        serializer.save(user_id=user_id)
        

    def perform_destroy(self, instance):
        user_id = self.request.user.id
        if not user_id:
            raise PermissionDenied('User ID not found in token.')
        if instance.user_id != user_id:
            raise PermissionDenied('You do not have permission to delete this profile.')
        instance.delete()

class TimeCapsuleListCreateView(generics.ListCreateAPIView):
    serializer_class = TimeCapsuleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return TimeCapsule.objects.filter(user_id=user_id)

    def perform_create(self, serializer):
        hashtags=self.request.POST.get('hashtags')
        hashtags = hashtags.split(',')
        user_id = self.request.user.id
        serializer.save(user_id=user_id,hashtags=hashtags)

