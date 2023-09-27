from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from datetime import datetime, timedelta
from django.db.models import Count
import random
from django.db.models.functions import Random
from django.http import Http404
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .permissions import IsNotSuperuserOrStaff
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.http import JsonResponse
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

    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        now = timezone.now() + timedelta(hours=5, minutes=30)
        posted_capsules = TimeCapsule.objects.filter(user_id=user_id, available_date__lte=now)
        upcoming_capsules = TimeCapsule.objects.filter(user_id=user_id, available_date__gt=now)
        posted_serializer = TimeCapsuleSerializer(posted_capsules, many=True,context={'request': request})
        upcoming_serializer = TimeCapsuleSerializer(upcoming_capsules, many=True,context={'request': request})
        data = {
            'posted': posted_serializer.data,
            'upcoming': upcoming_serializer.data
        }
        print(data)
        return Response(data)
    def perform_create(self, serializer):
        hashtags=self.request.POST.get('hashtags')
        hashtags = hashtags.split(',')
        user_id = self.request.user.id
        serializer.save(user_id=user_id,hashtags=hashtags)

class CommentListCreateView(generics.ListCreateAPIView):
    queryset=Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['timecapsule_id']
    

    def perform_create(self, serializer):
        user_id = self.request.user.id
        serializer.save(user_id=user_id)

class CommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    

class LikeListCreateView(generics.ListCreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Like.objects.filter(user_id=user_id)

    def perform_create(self, serializer):
        user_id = self.request.user.id
        serializer.save(user_id=user_id)

class LikeRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Like.objects.filter(user=user_id)

    def perform_destroy(self, instance):
        user_id = self.request.user.id
        if instance.user_id != user_id:
            raise PermissionDenied('You do not have permission to delete this like.')
        instance.delete()
class FollowsListCreateView(generics.ListCreateAPIView):
    serializer_class = FollowsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Follows.objects.filter(user_id=user_id)

    def perform_create(self, serializer):
        user_id = self.request.user.id
        serializer.save(user_id=user_id)

class FollowsRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    serializer_class = FollowsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Follows.objects.filter(user=user_id)

    def perform_destroy(self, instance):
        user_id = self.request.user.id
        if instance.user_id != user_id:
            raise PermissionDenied('You do not have permission to delete this follow.')
        instance.delete()

class TotalFollowersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        total_followers = Follows.objects.filter(follows=user_id).count()
        return JsonResponse({"totalfollowers": total_followers})
    
class ExploreView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TimeCapsuleSerializer
    queryset = TimeCapsule.objects.filter(is_private=False,available_date__lte=timezone.now()+ timedelta(hours=5, minutes=30)).order_by(Random())
    search_fields = ['hashtags','content','title']

class SearchView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    search_fields = ['user__username','user__first_name','user__last_name']

class UserView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        try:
            return Profile.objects.get(user__username=self.request.query_params.get('username'))
        except Profile.DoesNotExist:
            raise Http404("Profile does not exist")
        
class UserTimeCapsuleView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TimeCapsuleSerializer

    def get_queryset(self):
        try:
            return TimeCapsule.objects.filter(user__username=self.request.query_params.get('username'),is_private=False,available_date__lte=timezone.now()+ timedelta(hours=5, minutes=30)).order_by('-publish_date')
        except TimeCapsule.DoesNotExist:
            raise Http404("TimeCapsule does not exist")
        
class UserFollows(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        userviewing = CustomUser.objects.get(username=request.GET.get('username'))
        if Follows.objects.filter(user=user_id,follows=userviewing).exists():
            return JsonResponse({"follows": True})
        else:
            return JsonResponse({"follows": False})
    def post(self,request):
        user_id = request.user.id
        userviewing = CustomUser.objects.get(username=request.GET.get('username'))
        Follows.objects.create(user_id=user_id,follows=userviewing)
        return JsonResponse({"follows": True})
    def delete(self,request):
        user_id = request.user.id
        userviewing = CustomUser.objects.get(username=request.GET.get('username'))
        Follows.objects.filter(user=user_id,follows=userviewing).delete()
        return JsonResponse({"follows": False})
    
class HomeView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HomeCapsuleSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        follows = Follows.objects.filter(user=user_id)
        follows_list = []
        for follow in follows:
            follows_list.append(follow.follows)
        return TimeCapsule.objects.filter(user__in=follows_list,is_private=False,available_date__lte=timezone.now()+ timedelta(hours=5, minutes=30)).order_by('-publish_date')
    
class HomeHashtagsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        hashtags = TimeCapsule.objects.filter(is_private=False, available_date__lte=timezone.now() + timedelta(hours=5, minutes=30)).values_list('hashtags', flat=True)
        hashtags_list = []
        for capsule_hashtags in hashtags:
            for hashtag in capsule_hashtags:
                if hashtag not in hashtags_list:
                    hashtags_list.append(hashtag)
        hashtags_list_with_count = []
        for hashtag in hashtags_list:
            total_count = TimeCapsule.objects.filter(is_private=False, available_date__lte=timezone.now() + timedelta(hours=5, minutes=30), hashtags__contains=[hashtag]).count()
            hashtags_list_with_count.append({'name': hashtag, 'total': total_count})
        random.shuffle(hashtags_list_with_count)
        return JsonResponse({"hashtags": hashtags_list_with_count[:5]})