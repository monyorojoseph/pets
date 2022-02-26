from django.shortcuts import render
from pets.forms import *
from .models import *
from django.contrib.auth.decorators import login_required

# Create your views here.
"""
    landing page with registration form, sample pets

"""
@login_required
def landing_page(request):
    request.session.set_test_cookie()
    return render(request, 'landing_page.html')

"""
    Pet views; add, edit, view all, view details, delete

"""

# home page displays all pets depending your region
def all_pets(request):
    all_pets = Pet.objects.all()
    email = ""
    if request.session.get('email'):
        email = request.session.get('email')

    context = {
        "email":email, 
        "all_pets":all_pets
        }

    return render(request, 'pets/all_pets.html', context)

# add pet page
@login_required
def add_pet(request):
    pet_form = PetForm()
    image_form = ImageForm()

    if request.method == "POST":
        pet_form = PetForm(request.POST)
        image_form = ImageForm(request.POST)

        if pet_form.is_valid() and image_form.is_valid():
            saved_pet = Pet.objects.create(
                owner = request.user,
                breed = request.POST['breed'],
                sex = request.POST['sex'],
                adoptioin_sale = request.POST['adoptioin_sale'],
                price = request.POST['price'],
                age = request.POST['age'],
                description = request.POST['description']
            )

            # for image in images:
            #     image = Image.objects.create(
            #         pet = saved_pet,
            #         pet_image = image['pet_image']               
            #     )
    context = {
        "pet_form": pet_form,
        "image_form": image_form
    }
    return render(request, 'pets/add_pet.html', context)

# pet details page
def pet_details(request, id):
    pet = Pet.objects.get(pk = id)
    return render(request, 'pets/pet_details.html', {"pet":pet})

# edit pet details
@login_required
def edit_pet(request, id):
    pet = Pet.objects.get(pk = id)
    form  = PetForm()

    if request.method == "POST":
        form  = PetForm(request.POST, instance=pet)
        if form.is_valid():
            form.save()
            

# delete pet
@login_required
def delete_pet(request, id):
    pet = Pet.objects.get(pk = id)
    pet.delete()
    

"""
    Breed views; add, edit, view all, delete

"""
# add new breed
def add_breed(request):
    form = BreedForm()
    if request.method == "POST":
        form  = BreedForm(request.POST)
        if form.is_valid():
            form.save()

    return render(request, "pets/add_breed.html", {"form": form})

# edit existing breed
@login_required
def edit_breed(request, id):
    breed = Breed.objects.get(pk = id)
    form  = BreedForm()

    if request.method == "POST":
        form  = BreedForm(request.POST, instance=breed)
        if form.is_valid():
            form.save()
            
    return render(request, "pets/edit_breed.html", {"form": form})

# view all existing breeds
def all_breeds(request):
    all_breeds = Breed.objects.all()            
    return render(request, "pets/edit_breed.html", {"all_breeds": all_breeds})

# delete review
@login_required
def delete_breed(request,  id):
    breed = Breed.objects.get(pk=id)  
    breed.delete()          


"""
    review views; add
    
"""
@login_required
def add_review(request):
    form = ReviewForm()
    if request.method == "POST":
        form  = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
    return render(request, "pets/add_review.html", {"form": form})    