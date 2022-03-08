from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from .forms import *

# Create your views here.
def welcome(request):
    form = BreedForm()
    return render(request, 'welcome.html', {"form": form})

def add_breed(request):    
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if request.method == 'POST' and is_ajax:
        form = BreedForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({"message":"Added"}, status=200)
    return JsonResponse({"message":"Invalid request"}, status=400)
    
def all_pets(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if request.method == 'GET' and is_ajax:
        all_pets = list(Pet.objects.all().values())
        return JsonResponse({"all_pets": all_pets}, safe=False, status=200)
    return render(request, 'pet/all_pets.html')

def add_pet(request):
    pet_form = PetForm()
    img_form = ImageForm()

    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if request.method == 'POST' and is_ajax:
        pet_form = PetForm(request.POST)
        img_form = ImageForm(request.POST, request.FILES)


        if pet_form.is_valid() and img_form.is_valid():
            new_pet = Pet.objects.create(
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

    context = {
        "pet_form": pet_form,
        "img_form": img_form
    }
    return render(request, 'pet/add_pet.html', context)

def edit_pet(request):
    pass

def delete_pet(request):
    pass