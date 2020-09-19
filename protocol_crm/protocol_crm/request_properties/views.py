from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView
)

from .models import Property
from django.contrib.auth.mixins import LoginRequiredMixin

class PropertyListView(ListView):
    model = Property

class PropertyDetailView(DetailView):
    model = Property
    