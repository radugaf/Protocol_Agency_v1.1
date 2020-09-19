from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView
)
from .models import Contact
from django.contrib.auth.mixins import LoginRequiredMixin


class ContactListView(ListView):
    model = Contact


class ContactDetailView(DetailView):
    model = Contact


class ContactCreateView(LoginRequiredMixin, CreateView):
    model = Contact
    fields = [
        'contact_first_name',
        'contact_last_name',
        'contact_description',
        'contact_phone',
        'contact_email',
    ]

    def form_valid(self, form):
        form.instance.creator = self.request.user
        return super().form_valid(form)


class ContactUpdateView(LoginRequiredMixin, UpdateView):
    model = Contact
    fields = [
        'contact_first_name',
        'contact_last_name',
        'contact_description',
        'contact_phone',
        'contact_email'
    ]
    action = "Update"
