from django.urls import path
from . import views
app_name = "properties"

urlpatterns = [
    path(
        route='',
        view=views.PropertyListView.as_view(),
        name='list'
    ),

    path(
        route='add/',
        view=views.PropertyCreateView.as_view(),
        name='add'
    )
]