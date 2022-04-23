from django.urls import path
from .views import *

app_name = 'pets'

urlpatterns = [
    path('', all_pets, name='all_pets'),
    path('breed/', breed, name='breed'),
    path('get_breeds/', get_breeds, name='get_breeds'),
    path('get_all_pets/', get_all_pets, name='get_all_pets'),
    path('get_user_pets/', get_user_pets, name='get_user_pets'),
    path('sale_pets/', sale_pets, name='sale_pets'),
    path('adoption_pets/', adoption_pets, name='adoption_pets'),
    path('view_pet/<slug:slug>/', view_pet, name='view_pet'),
    path('get_pet/<slug:slug>/', get_pet, name='get_pet'),
    path('edit_pet/<slug:slug>/', edit_pet, name='edit_pet'),
    path('edit_images/<slug:slug>/', edit_images, name='edit_images'),
    path('add_pet/', add_pet, name='add_pet'),
    path('add_breed/', add_breed, name='add_breed'),
    path('add_bookmark/', add_bookmark, name='add_bookmark'),
    path('get_all_bookmarks/', get_all_bookmarks, name='get_all_bookmarks'),
    path('remove_bookmark/', remove_bookmark, name='remove_bookmark'),
    path('remove_pet/', remove_pet, name='remove_pet'),
    path('delete_image/<int:id>/', delete_image, name='delete_image'),
]
