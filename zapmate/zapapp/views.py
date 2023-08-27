from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import *
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from .permissions import IsNotSuperuserOrStaff
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


class UserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser | IsNotSuperuserOrStaff]

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser | IsNotSuperuserOrStaff]


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegistrationSerializer

class UserLoginView(TokenObtainPairView):
    serializer_class = CustomUserLoginSerializer

# views.py

class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user_id = self.request.user.id
        serializer.save(user_id=user_id)

class ProfileUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
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
        user_id = self.request.user.id
        serializer.save(user_id=user_id)

