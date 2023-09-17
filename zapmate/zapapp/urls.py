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
    path('comment/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comment/<int:pk>/', CommentRetrieveUpdateDestroyView.as_view(), name='comment-retrieve-update-destroy'),
    path('like/', LikeListCreateView.as_view(), name='like-list-create'),
    path('like/<int:pk>/', LikeRetrieveDestroyView.as_view(), name='like-retrieve-update-destroy'   ),
    path('follows/', FollowsListCreateView.as_view(), name='follows-list-create'),
    path('follows/<int:pk>/', FollowsRetrieveDestroyView.as_view(), name='follows-retrieve-update-destroy'),
    path('totalfollowers/',TotalFollowersView.as_view(),name='total-followers'),
    

    

]