from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = []

# roadmap Urls
urlpatterns += [
    path('roadmap/<str:roadmap_uid>/',
         views.RoadmapDetailView.as_view(), name='roadmap-detail'),
    path('roadmap/', views.RoadmapDetailView.as_view(), name='roadmap-generate'),
]

# pdf Urls
urlpatterns += [
    path('upload_pdf/<slug:roadmap_uid>',
         views.PDFoperations.as_view(), name='PDF-upload'),
    path('view_pdf/<slug:roadmap_uid>/<slug:pdf_uid>',
         views.PDFoperations.as_view(), name='PDF-view'),
]

# flashcard Urls
urlpatterns += [
    path('view_flashcards/<slug:roadmap_uid>/<slug:flashcard_uid>',
         views.Flashcard_operations.as_view(), name='flashcards-view'),
    path('generate_flashcards/<slug:roadmap_uid>/',
         views.Flashcard_operations.as_view(), name='flashcards-generate'),
]
