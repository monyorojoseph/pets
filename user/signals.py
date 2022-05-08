from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from django.contrib.auth import get_user_model
from setup.utils import get_location

User = get_user_model()

# create profile
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, *args, **kwargs):
    if created:
        location = get_location()
        Profile.objects.create(
            user=instance, country=location["country_name"], city=location["city"])