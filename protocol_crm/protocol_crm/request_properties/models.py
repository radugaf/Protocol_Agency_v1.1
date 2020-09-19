from django.db import models
from django.urls import reverse
from django.conf import settings

from autoslug import AutoSlugField
from model_utils.models import TimeStampedModel


class Property(TimeStampedModel):
    slug = AutoSlugField("Property Address",
                         unique=True, always_update=False, populate_from="property_title")
    property_title = models.CharField("Title", max_length=255)

    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.property_title

    def get_absolute_url(self):
        """Return absolute URL to the Property Detail page."""
        return reverse('properties:detail',
                       kwargs={"slug": self.slug})