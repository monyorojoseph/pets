from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Breed)
admin.site.register(Pet)
admin.site.register(Image)
admin.site.register(Review)