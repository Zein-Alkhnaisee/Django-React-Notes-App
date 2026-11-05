from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.CreateUserView.as_view(), name='create_user'),
    path('notes/', views.NoteListCreateView.as_view(), name='note_list_create'),
    path('notes/delete/<int:pk>/', views.NoteDeleteView.as_view(), name='note_delete'),
]