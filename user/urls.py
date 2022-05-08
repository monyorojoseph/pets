from rest_framework.routers import SimpleRouter
from django.urls import path
from .apis import *

router = SimpleRouter()
router.register("profile", ProfileAPI, basename="profile")

app_name = "user"

urlpatterns = [
    path("check-username/", check_username_api, name="check-username"),
    path("check-email/", check_email_api, name="check-email"),
    path("remove-account/<int:pk>/", RemoveAccountAPI.as_view(), name='remove-account')
]

urlpatterns += router.urls
