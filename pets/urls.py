from django.urls import path
from .views import *

app_name = "pets"

urlpatterns = [
    path('', landing_page, name='landing_page'),
    path('all_pets/', all_pets, name='all_pets'),
    path('add_pet/', add_pet, name='add_pet'),
    path('pet_details/<str:id>/', pet_details, name='pet_details'),
    path('edit_pet/<str:id>/', edit_pet, name='edit_pet'),
    path('delete_pet/<str:id>/', delete_pet, name='delete_pet'),
    path('add_breed/', add_breed, name='add_breed'),
    path('all_breeds/', all_breeds, name='all_breeds'),
    path('edit_breed/<str:id>/', edit_breed, name='edit_breed'),
    path('delete_breed/<str:id>/', delete_breed, name='delete_breed'),
    path('add_review/', add_review, name='add_review'),
]
