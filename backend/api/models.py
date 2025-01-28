from django.db import models
from users.models import CustomUser
from django.utils.crypto import get_random_string
from .logic import *

def generate_unique_uid():
    return get_random_string(7)

class Otp(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    email = models.EmailField(max_length=254, unique=True)
    otp = models.CharField(max_length=5, blank=True, null=True)

    def __str__(self):
        return self.email

class Project(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    difficulty = models.CharField(max_length=150)
    parent_milestone = models.ForeignKey(
        "MileStone", 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True,
        related_name='projects'
    )

    def __str__(self):
        return self.title

class Resource(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    type = models.CharField(max_length=500)
    title = models.CharField(max_length=500)
    url = models.CharField(max_length=500, null=True, blank=True)
    description = models.CharField(max_length=500)
    estimated_time = models.CharField(max_length=50)
    parent_milestone = models.ForeignKey(
        "MileStone", 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True,
        related_name='resources'
    )

    def __str__(self):
        return self.title

class MileStone(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    title = models.CharField(max_length=100)
    duration = models.CharField(max_length=500)
    status = models.BooleanField(default=False)
    topics = models.JSONField(default=dict)
    parent_roadmap = models.ForeignKey(
        "Roadmap", 
        on_delete=models.CASCADE,
        related_name='milestones'
    )

    def __str__(self):
        return self.title

class Roadmap(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    subject = models.CharField(max_length=150)
    duration = models.CharField(max_length=150)
    current_milestone = models.ForeignKey(
        'MileStone',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='current_roadmaps'
    )
    user = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='roadmaps'
    )

    def save(self, *args, **kwargs):
        if not self.uid:
            while True:
                uid = generate_unique_uid()
                if not Roadmap.objects.filter(uid=uid).exists():
                    self.uid = uid
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.subject},{self.uid}"

class Label(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    label_name = models.CharField(max_length=20)
    color = models.CharField(max_length=20)
    user = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='labels'
    )

    def __str__(self):
        return self.label_name

class Calendar(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    event_name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.BooleanField(default=False)
    color = models.CharField(max_length=10)
    user = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='calendar_events'
    )

    def __str__(self):
        return self.event_name

class Todo(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    LABEL_CHOICES = [
        ('PRIORITY', 'Priority'),
        ('WORK', 'Work'),
        ('EXAM', 'Exam'),
        ('PERSONAL', 'Personal')
    ]
    description = models.CharField(max_length=100)
    status = models.BooleanField(default=False)
    label = models.CharField(
        max_length=20, 
        choices=LABEL_CHOICES, 
        default='PERSONAL'
    )
    user = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='todos'
    )

    def __str__(self):
        return self.description

class PDF(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    url = models.FileField(upload_to="pdfs", max_length=100)
    size = models.IntegerField()
    notes = models.JSONField(default=dict)
    parent_roadmap = models.ForeignKey(
        "Roadmap", 
        on_delete=models.CASCADE,
        related_name='pdfs'
    )
    user = models.ForeignKey(
        CustomUser, 
        on_delete=models.CASCADE,
        related_name='pdfs'
    )
    date_uploaded = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.uid

class PDFChats(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    sender = models.BooleanField()
    content = models.CharField(max_length=1000)
    pdf = models.ForeignKey(
        PDF, 
        on_delete=models.CASCADE,
        related_name='chats'
    )
    date_uploaded = models.DateTimeField(auto_now_add=True)

class FlashCardSet(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    parent_roadmap = models.ForeignKey(
        "Roadmap", 
        on_delete=models.CASCADE,
        related_name='flashcard_sets'
    )
    content = models.JSONField(default=dict)

    def __str__(self):
        return self.uid

class Flashcard(models.Model):
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=generate_unique_uid,
        editable=False
    )
    heading = models.CharField(max_length=150)
    points = models.JSONField(default=dict)
    image = models.ImageField(upload_to="flashcards")
    set_fk = models.ForeignKey(
        FlashCardSet, 
        on_delete=models.CASCADE,
        related_name='flashcards'
    )

    def __str__(self):
        return self.heading