from django.db import models
from django.urls import reverse
from django.conf import settings
from autoslug import AutoSlugField
from model_utils.models import TimeStampedModel


class Contact(TimeStampedModel):
    slug = AutoSlugField("Contact Address",
                         unique=True, always_update=False, populate_from="contact_first_name")
    contact_first_name = models.CharField("First Name", max_length=255)
    contact_last_name = models.CharField("Last Name", max_length=255)
    contact_phone = models.CharField("Phone Number", max_length=255)
    contact_email = models.CharField("Email Address", max_length=255)

    contact_description = models.TextField("Description", blank=True)

    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.contact_first_name

    def get_absolute_url(self):
        """Return absolute URL to the Contact Detail page."""
        return reverse('contacts:detail',
                       kwargs={"slug": self.slug})
