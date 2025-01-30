from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = []

# roadmap Urls
urlpatterns += [
    path('roadmap/<str:roadmap_uid>/',
         views.RoadmapDetailView.as_view(), name='roadmap-detail'),
    path('roadmap/', views.RoadmapDetailView.as_view(), name='roadmap-generate'),
    path('get_all_roadmaps/', views.RoadmapDetailView.as_view(),
         name='roadmap-get-all'),
    path('roadmap/<str:roadmap_uid>/update/',
         views.RoadmapDetailView.as_view(), name='roadmap-update'),
]

# pdf Urls
urlpatterns += [
    path('upload_pdf/<slug:roadmap_uid>',
         views.PDFoperations.as_view(), name='PDF-upload'),
    path('view_pdf/<slug:roadmap_uid>/<slug:pdf_uid>',
         views.PDFoperations.as_view(), name='PDF-view'),
    path('get_all_pdfs_for_roadmap/<slug:roadmap_uid>',
         views.PDFoperations.as_view(), name='PDF-get-all-roadmap'),
    path('get_recent_pdfs/', views.PDFoperations.as_view(), name='PDF-get-recent'),
    path('delete_pdf/<slug:roadmap_uid>/<slug:pdf_uid>',
         views.PDFoperations.as_view(), name='PDF-delete')
]

# flashcard Urls
urlpatterns += [
    path('roadmap/<str:roadmap_uid>/flashcards/',
         views.Flashcard_operations.as_view(), name='flashcard-list'),
    path('roadmap/<str:roadmap_uid>/flashcards/<str:flashcard_uid>/',
         views.Flashcard_operations.as_view(), name='flashcard-detail'),
    path('generate_flashcards/<slug:roadmap_uid>/',
         views.Flashcard_operations.as_view(), name='flashcards-generate'),
]


urlpatterns += [
    path('todos/', views.TodoAPIView.as_view(), name='todo-list'),
    path('todos/', views.TodoAPIView.as_view(), name='todo-create'),
    path('todos/<slug:uid>/toggle/',
         views.TodoAPIView.as_view(), name='todo-toggle'),
]
