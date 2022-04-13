from django.urls import path
from .views import *

app_name = 'pets'

urlpatterns = [
    path('', all_pets, name='all_pets'),
    path('welcome/', welcome, name='welcome'),
    path('get_all_pets/', get_all_pets, name='get_all_pets'),
    path('get_user_pets/', get_user_pets, name='get_user_pets'),
    path('view_pet/<slug:slug>/', view_pet, name='view_pet'),
    path('get_pet/<slug:slug>/', get_pet, name='get_pet'),
    path('add_pet/', add_pet, name='add_pet'),
    path('add_breed/', add_breed, name='add_breed'),
]
