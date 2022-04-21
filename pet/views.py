import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core import serializers
from .models import *
from .forms import *
from django.contrib.auth.decorators import login_required

# Create your views here.
def welcome(request):
    form = BreedForm()
    return render(request, 'welcome.html', {"form": form})

def add_breed(request):   
    if request.method == 'POST':
        form = BreedForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({"message":"Breed added successfully, thanks for contributing."}, status=200)
    return JsonResponse({"message":"Invalid request"}, status=400)
    
def all_pets(request):
    return render(request, 'pet/all_pets.html')

def petDict(pets):
    return [{
                "pet_name":pet.pet_name, 
                "cover_image":pet.cover_image.url, 
                "breed":pet.breed.breed_name,
                "age":pet.age,
                "gender":pet.gender,
                "price":pet.price,
                "sale_adoption":pet.sale_adoption,
                "id":pet.id,
                } for pet in pets.order_by('-id')]

def get_all_pets(request):
    if request.method == 'GET':
        all_pets = petDict(Pet.objects.all())
        return JsonResponse({"all_pets": all_pets}, safe=False, status=200)

def adoption_pets(request):
    if request.method == 'GET':
        all_pets = petDict(Pet.objects.filter(sale_adoption='Adoption'))
        return JsonResponse({"all_pets": all_pets}, safe=False, status=200)


def sale_pets(request):
    if request.method == 'GET':
        all_pets = petDict(Pet.objects.filter(sale_adoption='Sale'))
        return JsonResponse({"all_pets": all_pets}, safe=False, status=200)

@login_required
def get_user_pets(request):
    if request.method == 'GET':
        all_pets = petDict(Pet.objects.filter(owner=request.user))
        return JsonResponse({"all_pets": all_pets}, safe=False, status=200)

def view_pet(request, slug):
    return render(request, 'pet/view_pet.html')

def get_pet(request, slug):    
    if request.method == 'GET':
        pet = Pet.objects.get(pet_name=slug)
        data = {
                "pet_name":pet.pet_name, 
                "breed":pet.breed.breed_name,
                "age":pet.age,
                "gender":pet.gender,
                "price":pet.price,
                "sale_adoption":pet.sale_adoption,
                "description": pet.description,
                "contact": pet.owner.profile.contact,
                "total": pet.total

                }
        images = serializers.serialize('json', pet.image_set.all())
        return JsonResponse({"pet": data, "images":images}, safe=False, status=200)

@login_required
def add_pet(request):
    if request.method == 'POST':
        pet_form = PetForm(request.POST)
        img_form = ImageForm(request.POST, request.FILES)

        if pet_form.is_valid() and img_form.is_valid():
            new_pet = Pet.objects.create(
                owner = request.user,
                breed = Breed.objects.get(pk=request.POST["breed"]),
                age = request.POST["age"],
                gender = request.POST["gender"],
                sale_adoption = request.POST["sale_adoption"],
                price = request.POST["price"],
                description = request.POST["description"],
                total = request.POST["total"],


            )
            images = request.FILES.getlist('pet_image')
            for img in images:
                Image.objects.create(
                    pet = new_pet,
                    pet_image = img
                )                
            return JsonResponse({"message": "oops! done succesfully"}, status=200)

@login_required
def edit_pet(request, slug):
    pet = Pet.objects.get(pet_name=slug)
    form = PetForm(instance=pet)
    imgForm = ImageForm()
    if request.method == 'POST':
        pet.owner = request.user
        pet.breed = Breed.objects.get(pk=request.POST["breed"])
        pet.age = request.POST["age"]
        pet.gender = request.POST["gender"]
        pet.sale_adoption = request.POST["sale_adoption"]
        pet.price = request.POST["price"]
        pet.description = request.POST["description"]
        pet.total = request.POST["total"]

        pet.save()

        return JsonResponse({"pet": serializers.serialize('json', [pet,])}, safe=False, status=200)

    return render(request, "pet/edit_pet.html", {"form":form, "imgForm":imgForm})

@login_required
def edit_images(request, slug):
    if request.method == 'GET':
        images = [{"id": image.pk, "pet_image":image.pet_image.url} for image in Image.objects.filter(pet__pet_name = slug)]
        return JsonResponse({"images": images}, safe=False, status=200)
    
    if request.method == 'POST':
        images = request.FILES.getlist("pet_image")
        for img in images:
            Image.objects.create(
                pet = Pet.objects.get(pet_name=slug),
                pet_image = img
            ) 
        return JsonResponse({"message": "got your files"}, safe=False, status=200)
@login_required
def delete_image(request, id):
    if request.method == 'DELETE':
        image = Image.objects.get(pk=id)
        image.delete()
        return JsonResponse({"message": "Removed image"}, safe=False, status=200)

@login_required
def remove_pet(request):
    if request.method == 'POST':
        body = json.loads(request.body) 
        print(body)
        pet = Pet.objects.get(pk=body['id'])
        pet.delete()
        return JsonResponse({"message": "Deleted pet successfully"}, status=200)

@login_required
def add_bookmark(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        pet_name = body['slug']
        pet = Pet.objects.get(pet_name=pet_name)
        user = request.user

        if pet.owner == user:
            return JsonResponse({"message": "You cannot bookmark your shit"}, status=200)

        if BookMark.objects.filter(pet__pet_name = pet_name).exists():
            return JsonResponse({"message": "bookmark already exist"}, status=200)

        BookMark.objects.create(
            user = user,
            pet = pet
            )
        return JsonResponse({"message": "bookmark added"}, status=200)

@login_required
def get_all_bookmarks(request):
    if request.method == 'GET':
        pets = [ {
                "pet_name":bookmark.pet.pet_name, 
                "cover_image":bookmark.pet.cover_image.url, 
                "breed":bookmark.pet.breed.breed_name,
                "age":bookmark.pet.age,
                "gender":bookmark.pet.gender,
                "price":bookmark.pet.price,
                "sale_adoption":bookmark.pet.sale_adoption,
                "id":bookmark.id
                } for bookmark in BookMark.objects.filter(user=request.user)]
        return JsonResponse({"bookmarks": pets}, safe=False, status=200)

@login_required
def remove_bookmark(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        bookmark = BookMark.objects.get(pk=body['id'])
        bookmark.delete()
        return JsonResponse({"message": "Bookmark deleted"}, status=200, safe=False)