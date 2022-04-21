import json
from django.shortcuts import redirect, render
from users.forms import ProfileForm, UserCreationForm
from .models import Profile
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.conf import settings
from django.contrib import messages
from django.core import serializers
from django.contrib.auth import get_user_model
from pet.forms import PetForm, ImageForm

User = get_user_model()

# Create your views here.

"""
    Check username and email if it's unique before registration
"""
def check_mail(request):
    if request.method == 'POST':
        email = json.load(request).get("email")
        if  User.objects.filter(email=email).exists():
            return JsonResponse({"valid": True}, status=200)
        else:
            return JsonResponse({"valid": False}, status=200)
    
    return JsonResponse({"message": "Invalid request"}, status=400)

def check_username(request):
    if request.method == 'POST':
        username = json.load(request).get("username")
        if  User.objects.filter(username=username).exists():
            return JsonResponse({"valid": True}, status=200)
        else:
            return JsonResponse({"valid": False}, status=200)
    
    return JsonResponse({"message": "Invalid request"}, status=400)



"""
    Authentication view: registration, sign in, sign out, closing account

"""

# registration
def registration(request):
    if request.user.is_authenticated:
        return redirect('pets:all_pets')
    
    form = UserCreationForm()
        
    if request.method == 'POST':
        form = UserCreationForm(request.POST) 
        email = request.POST['email']
        password = request.POST['password1']

        if form.is_valid():
            form.save()
            user = authenticate(email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect("user:view_profile")
            print(form.errors)
        return JsonResponse({"message":"Invalid from"}, status = 400)  # modify later to return form errors
    context = {"form": form}    
    return render(request, 'users/signup.html', context)

# sign in
def signin(request):
    if request.user.is_authenticated:
        return redirect('pets:all_pets')
    
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            return redirect("pets:all_pets")

            # if request.session.test_cookie_worked():
            #     request.session.set_expiry(31536000)
        return JsonResponse({"message":"Invalid credentials"}, status=400)
            
    request.session.set_test_cookie()
    return render(request, 'users/signin.html')

# signout
@login_required
def signout(request):
    logout(request)
    return render(request, 'users/signout.html')

# account removal
def close_account_page(request):
    return render(request, 'users/close_account.html')

@login_required
def close_account(request):
    if request.method == 'POST':
        user = User.objects.get(email=request.user.email)
        logout(request)
        user.delete()
        return redirect("user:close_account_page")
"""
    profile view: view profile, edit profile

"""

# edit profile details
@login_required
def edit_profile(request):
    profile = Profile.objects.get(user=request.user)
    if request.method == 'POST':
        profile.user = request.user
        profile.email = request.POST['email']
        profile.username = request.POST['username']
        profile.age = request.POST['age']
        profile.gender = request.POST['gender']
        profile.contact = request.POST['contact']

        profile.save()
        updatedProfile = serializers.serialize('json', [Profile.objects.get(username=profile),])
        return JsonResponse({"profile": updatedProfile}, status=200)

    return JsonResponse({"error": "Invalid request method"}, status=400)
 
# view profile details
@login_required
def view_profile(request):    
    pet_form = PetForm()
    img_form = ImageForm()
    profile = Profile.objects.get(user = request.user)
    form = ProfileForm(instance=profile)
    
    context = {
        "pet_form": pet_form,
        "img_form": img_form,
        "form":form
    }
    return render(request, 'users/profile.html', context) 
    
@login_required
def get_profile(request):    
    if request.method == 'GET':
        profile = Profile.objects.get(user=request.user)
        serialized_profile = serializers.serialize('json', [profile,])
        return JsonResponse({"profile": serialized_profile}, status=200, safe=False)