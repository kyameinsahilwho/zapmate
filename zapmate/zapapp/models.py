from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin,Group,Permission
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Add related_name argument to avoid clash with User model
    groups = models.ManyToManyField(Group, blank=True, related_name='customuser_set')
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='customuser_set')

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    def __str__(self):
        return self.user.username

class TimeCapsule(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='timecapsules')
    title = models.CharField(max_length=255)
    content = models.TextField()
    hashtags = ArrayField(models.CharField(max_length=50), size=6, blank=True)
    publish_date = models.DateTimeField(default=timezone.now)
    available_date = models.DateTimeField()
    image = models.ImageField(upload_to='timecapsules/', blank=True, null=True)
    is_private = models.BooleanField(default=False)


    def __str__(self):
        return self.title

    def is_available(self):
        return timezone.now() >= self.available_date
    is_available.boolean = True
    is_available.short_description = 'Available'

    class Meta:
        ordering = ['-publish_date']