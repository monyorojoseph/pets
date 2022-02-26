from django import forms
from .models import *

class BreedForm(forms.ModelForm):
    class Meta:
        model =  Breed
        fields = "__all__"

class PetForm(forms.ModelForm):
    class Meta:
        model =  Pet
        fields = "__all__"
        exclude = ['owner', 'pub_date']

class ImageForm(forms.ModelForm):
    class Meta:
        model =  Image
        fields = "__all__"
        exclude = ['pet']

class ReviewForm(forms.ModelForm):
    class Meta:
        model =  Review
        fields = "__all__"
        exclude = ['pet']