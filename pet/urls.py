from django.urls import path
from .apis import *


app_name = 'pets'

urlpatterns = [
    path("list-breeds/", BreedsApi.as_view(), name="list-breeds"),
    path("create-breed/", CreateBreedAPI.as_view(), name="create-breed"),
    path("list-bookmarks/", BookmarksApi.as_view(), name="list-bookmarks"),
    path("create-bookmark/", CreateBookmarkAPI.as_view(), name="create-bookmark"),
    path("detail-bookmark/<int:pk>/", bookmark_detail, name="detail-bookmark"),
    path("remove-bookmark/<int:pk>/", BookmarkRemoveAPI.as_view(), name="remove-bookmark"),
    path("create-pet/", CreatePetApi.as_view(), name="create-pet"),
    path("list-pets/", PetsApi.as_view(), name="list-pets"),
    path("sale-list-pets/", SalePetsApi.as_view(), name="sale-list-pets"),
    path("adopt-list-pets/", AdoptionPetsApi.as_view(), name="adopt-list-pets"),
    path("user-pets/", UserPetsAPI.as_view(), name="user-pets"),
    path("detail-pet/<str:pet_name>/", pet_detail, name="detail-pet"),
    path("update-pet/<str:pet_name>/", PetUpdateAPI.as_view(), name="update-pet"),
    path("remove-pet/<str:pet_name>/", PetRemoveAPI.as_view(), name="remove-pet"),
    path("add-image/", AddPetImageAPI.as_view(), name="add-image"),
    path("remove-image/<int:pk>/", RemovePetImageAPI.as_view(), name="remove-image")
]
