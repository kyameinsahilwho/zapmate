from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'date_joined', 'is_active', 'is_staff')
        read_only_fields = ('id', 'date_joined', 'is_staff')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'first_name', 'last_name','username')
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)
        instance.save()
        return instance
    

class CustomUserLoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        if isinstance(user, CustomUser):
            token['username'] = user.username
            token['user_id']=user.id

        return token

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Profile
        fields = ('bio', 'profile_picture','username')

    def to_representation(self, instance):
        if self.context['request'].method == 'GET':
            self.fields['username'].read_only = False

        return super().to_representation(instance)

class TimeCapsuleSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = TimeCapsule
        fields = [ 'username','title', 'content', 'publish_date', 'available_date', 'image', 'is_available','hashtags']
        read_only_fields = ['id', 'publish_date', 'is_available']
    def to_representation(self, instance):
        if self.context['request'].method == 'GET':
            self.fields['username'].read_only = False

        return super().to_representation(instance)
