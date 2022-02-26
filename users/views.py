from django.http import JsonResponse
from django.shortcuts import redirect, render
from .models import Profile
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import *

User = get_user_model()

# Create your views here.

"""
    Authentication view: registration, sign in, sign out, closing account

"""
# register user view
def sign_up(request):
    
    if request.user.is_authenticated:
        return redirect("pets:landing_page")

    form = UserCreationForm()
    
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if request.method == 'POST' and is_ajax:
        form = UserCreationForm(request.POST)        
        email = request.POST['email']
        password = request.POST['password1']

        if request.session.test_cookie_worked():
            request.session['email'] = email

        if form.is_valid():
            form.save()
            user = authenticate(email=email, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message":"User created successfully"}, status = 200)
        # else return form errors in json response
        

    request.session.set_test_cookie()

    return render(request, 'users/sign_up.html', {"form": form})

# login view
def sign_in(request):
    if request.user.is_authenticated:
        return redirect("pets:landing_page")
    
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if request.method == 'POST' and is_ajax:
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successfully"}, status = 200)
        return JsonResponse({"message":"Invalid credentials"}, status = 400)
    return render(request, 'users/sign_in.html')

# sign out
@login_required
def sign_out(request):
    logout(request)
    return redirect("users:sign_in")

# account deletion
@login_required
def close_account(request):
    pass

"""
    profile view: view profile, edit profile

"""
# view profile
@login_required
def profile_details(request):
    profile = Profile.objects.get(user=request.user)
    return render(request, 'users/profile_details.html', {"profile": profile})

# updating profile details
@login_required
def edit_profile(request):
    profile = Profile.objects.get(user=request.user)

    if request.method == "POST":
        form = ProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()