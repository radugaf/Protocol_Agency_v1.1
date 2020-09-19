from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):

    # First Name and Last Name Do Not Cover Name Patterns
    # Around the Globe.
    name = models.CharField(
        _("Name of User"), blank=True, null=True, max_length=255
    )
    bio = models.TextField("Bio", blank=True, null=True)
    is_agent = models.BooleanField(default=False)
    agency_agent = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="agency_agents"
    )

    def save(self, *args, **kwargs):
        self.is_agent = not self.is_superuser
        super(User, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse(
            "users:detail", kwargs={"username": self.username}
        )

    def fullname(self):
        if(self.name):
            return self.name + " - "
        else:
            return '{} {} - '.format(self.first_name, self.last_name)
