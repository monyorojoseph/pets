from django.urls import path
from .views import *

app_name = "users"

urlpatterns = [
    path('sign_in/', sign_in, name='sign_in'),
    path('sign_up/', sign_up, name='sign_up'),
    path('sign_out/', sign_out, name='sign_out'),
    path('close_account/', close_account, name='close_account'),
    path('profile_details/', profile_details, name='profile_details'),
    path('edit_profile/', edit_profile, name='edit_profile'),
]
