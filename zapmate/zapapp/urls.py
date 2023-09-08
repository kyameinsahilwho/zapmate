from django.urls import path
from .views import*
urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('api/token/', UserLoginView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', UserRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileListCreateView.as_view(), name='profile-list-create'),
    path('profile-update/', ProfileUpdateView.as_view(), name='profile-retrieve-update-destroy'),
    path('timecapsule/', TimeCapsuleListCreateView.as_view(), name='timecapsule-list-create'),
    

    

]