from django.shortcuts import render
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
            return JsonResponse({"message":"Added"}, status=200)
    return JsonResponse({"message":"Invalid request"}, status=400)
    
def all_pets(request):
    return render(request, 'pet/all_pets.html')

def get_all_pets(request):
    if request.method == 'GET':
        all_pets = list(Pet.objects.all().values())
        return JsonResponse({"all_pets": all_pets}, safe=False, status=200)

def get_user_pets(request):
    if request.method == 'GET':
        all_pets = list(Pet.objects.filter(owner=request.user).values())
        return JsonResponse({"all_pets": all_pets}, safe=False, status=200)


def view_pet(request, slug):
    return render(request, 'pet/view_pet.html')

def get_pet(request, slug):    
    if request.method == 'GET':
        pet = Pet.objects.get(pet_name=slug)
        data = serializers.serialize('json', [pet,])
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

            )
            images = request.FILES.getlist('pet_image')
            for img in images:
                Image.objects.create(
                    pet = new_pet,
                    pet_image = img
                )                
            return JsonResponse({"success": "oops! done"}, status=200)

@login_required
def edit_pet(request):
    pass
@login_required
def delete_pet(request):
    pass