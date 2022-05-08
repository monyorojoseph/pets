from setup.utils import get_location
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework import response, generics, permissions, status
from .serializers import *
from .models import *

"""
Display all available breeds and add some
"""
# breed class view api
class BreedsApi(generics.ListAPIView):
    serializer_class = BreedSerializer
    def get_queryset(self):
        queryset = Breed.objects.all()
        return queryset

class CreateBreedAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        data = request.data
        Breed.objects.create(breed_name=data['breed_name'], cat_dog=data['cat_dog'])
        return response.Response({"detail": "Thanks for adding"} )   

"""
Display all available pet, view, edit and add some
"""
# create pet api
class CreatePetApi(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        data = request.data
        pet = Pet.objects.create(
            owner = request.user,
            breed = get_object_or_404(Breed, breed_name=data['breed']),
            age = data['age'],
            gender = data['gender'],
            sale_adoption = data['sale_adoption'],
            price = data['price'],
            description = data['description'],
            total = data['total']           
        )
        images = request.FILES.getlist('images')
        for img in images:
            try:
                Image.objects.create(pet=pet, pet_image=img)
            except Exception:
                return
        return response.Response({"detail": "oops! it's added"}, status=status.HTTP_201_CREATED)

def get_country_name():
    location = get_location()
    return location["country_name"]

class PetsApi(generics.ListAPIView):
    serializer_class = PetSerializer
    def get_queryset(self):
        queryset = Pet.objects.filter(owner__profile__country = get_country_name())
        return queryset

class SalePetsApi(generics.ListAPIView):
    serializer_class = PetSerializer
    def get_queryset(self):
        queryset = Pet.objects.filter(sale_adoption="Sale", owner__profile__country = get_country_name())
        return queryset

class AdoptionPetsApi(generics.ListAPIView):
    serializer_class = PetSerializer
    def get_queryset(self):
        queryset = Pet.objects.filter(sale_adoption="Adoption", owner__profile__country = get_country_name())
        return queryset

class UserPetsAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PetSerializer
    def get_queryset(self):
        return Pet.objects.filter(owner=self.request.user).order_by('-id')


@api_view()
@permission_classes([permissions.IsAuthenticatedOrReadOnly])
def pet_detail(request, pet_name):
    pet = get_object_or_404(Pet, pet_name=pet_name)
    images = get_list_or_404(Image, pet=pet)
    serializerPet = PetSerializer(pet)
    serializerImages = ImageSerializer(images, many=True)
    data = {
        "pet": serializerPet.data,
        "images": serializerImages.data
    }

    return response.Response(data)
   

class PetUpdateAPI(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class =  PetSerializer
    queryset = Pet.objects.all()
    lookup_field = 'pet_name'

    def put(self, request, *args, **kwargs):
        data = request.data
        print(request.data)
        pet = self.get_object()
        pet.breed = get_object_or_404(Breed, breed_name=data['breed'])
        pet.gender = data['gender']
        pet.sale_adoption = data['sale_adoption']
        pet.age = data['age']
        pet.price = data['price']
        pet.description = data['description']
        pet.save()
        serializer = PetSerializer(pet)
        return response.Response(serializer.data, status=status.HTTP_200_OK)



class PetRemoveAPI(generics.DestroyAPIView): 
    permission_classes = [permissions.IsAuthenticated]
    serializer_class =  PetSerializer
    queryset = Pet.objects.all()
    lookup_field = 'pet_name'
    
""" pet images add, delete """

class AddPetImageAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        images = request.FILES.getlist('images')
        pet_name = request.data.get("pet_name")
        pet = get_object_or_404(Pet, pet_name=pet_name)
        for image in images:
            Image.objects.create(pet=pet, pet_image=image)
        return response.Response({"detail": "Pet image added"})

class RemovePetImageAPI(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    
"""
Display all available breeds, view, delete and add some
"""
# bookmark class view api
class BookmarksApi(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookmarkSerializer
    def get_queryset(self):
        return BookMark.objects.filter(user=self.request.user).order_by('-id')

class CreateBookmarkAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        pet_name = request.data['pet_name']
        pet = get_object_or_404(Pet, pet_name=pet_name)
        user = request.user
        if pet.owner == user:
            return response.Response({"detail": "You cannot bookmark your pet"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if BookMark.objects.filter(pet__pet_name = pet_name).exists():
            return response.Response({"detail": "It's in your bookmarks"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        BookMark.objects.create(user = user,pet = pet)
        return response.Response({"detail": "It's been added to your bookmarks"}, status=status.HTTP_201_CREATED)

@api_view()
@permission_classes([permissions.IsAuthenticated])
def bookmark_detail(request, pk):
    bookmark = get_object_or_404(BookMark, pk=pk)
    images = get_list_or_404(Image, pet=bookmark.pet)
    serializerBookmark = BookmarkSerializer(bookmark)
    serializerImages = ImageSerializer(images, many=True)
    data = {
        "bookmark": serializerBookmark.data,
        "images": serializerImages.data
    }

    return response.Response(data)   

class BookmarkRemoveAPI(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookmarkSerializer
    queryset = BookMark.objects.all()