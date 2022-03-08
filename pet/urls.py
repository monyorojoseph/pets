from django.urls import path
from .views import *

app_name = 'pets'

urlpatterns = [
    path('', welcome, name='welcome'),
    path('all_pets/', all_pets, name='all_pets'),
    path('add_pet/', add_pet, name='add_pet'),
    path('add_breed/', add_breed, name='add_breed'),
]
