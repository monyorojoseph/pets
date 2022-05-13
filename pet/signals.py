from django.db.models.signals import post_save
from django.template.defaultfilters import slugify
from django.dispatch import receiver
from .models import *

# create slug field (pet_name)
@receiver(post_save, sender=Pet)
def create_pet_name(sender, instance, created, **kwargs):
    if created:
        instance.pet_name = slugify(f"{instance.breed.cat_dog} {(instance.breed)} {instance.gender} {instance.pk}")
        instance.save()


# create cover image
@receiver(post_save, sender=Image)
def create_cover_image(sender, instance, **kwargs):
    if instance.pet.cover_image == "cover/default.png":
        instance.pet.cover_image = instance.pet_image
        instance.pet.save()
