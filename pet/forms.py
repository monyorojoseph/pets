from dataclasses import fields
from statistics import mode
from django import forms
from .models import *

# pet form
class PetForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = "__all__"
        exclude = ["cover_image", "pet_name", "owner"]

# breed form
class BreedForm(forms.ModelForm):
    class Meta:
        model = Breed
        fields = "__all__"

# image form
class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = "__all__"
        exclude = ["pet"]