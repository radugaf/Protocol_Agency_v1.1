from django.urls import path
from . import views

app_name = "contacts"

urlpatterns = [
    path(
        route='',
        view=views.ContactListView.as_view(),
        name='list'
    ),

    path(
        route='add/',
        view=views.ContactCreateView.as_view(),
        name='add'
    ),

    path(
        route='<slug:slug>/update/',
        view=views.ContactUpdateView.as_view(),
        name='update'
    ),

    path(
        route='<slug:slug>/',
        view=views.ContactDetailView.as_view(),
        name='detail'
    ),

]
