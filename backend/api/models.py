from django.db import models
from users.models import CustomUser
from django.utils.crypto import get_random_string
from .logic import *

class Otp(models.Model) :
    email = models.EmailField(max_length=254, unique=True)
    otp = models.CharField(max_length=5, blank=True, null=True)

    def __str__(self):
        return self.email

class Project(models.Model) :
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    difficulty = models.CharField(max_length = 150)
    parent_milestone = models.ForeignKey("api.MileStone",on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title
    

class Resource(models.Model) :
    type = models.CharField(max_length=500)
    title = models.CharField(max_length=500)
    url = models.CharField(max_length=500)
    description = models.CharField(max_length = 500)
    estimated_time = models.CharField(max_length=50)
    parent_milestone = models.ForeignKey("api.MileStone",on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title

class MileStone(models.Model) :
    title = models.CharField(max_length=100)
    duration = models.CharField(max_length=500)
    status = models.BooleanField(default=False)
    topics = models.JSONField()
    parent_roadmap = models.ForeignKey("api.Roadmap", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title

class Roadmap(models.Model):
    uid = models.CharField(
        max_length=7,
        unique=True,
        editable=False
    )
    subject = models.CharField(max_length=150)
    duration = models.CharField(max_length=150)
    current_milestone = models.ForeignKey('api.MileStone', on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.uid:
            while True:
                uid = get_random_string(7)
                if not Roadmap.objects.filter(uid=uid).exists():
                    self.uid = uid
                    break
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.subject},{self.uid}"
    


class Label(models.Model) :
    label_name = models.CharField(max_length = 20)
    color = models.CharField(max_length = 20)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.label_name

class Calendar(models.Model) :
    event_name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    status = models.BooleanField(default=False)
    color = models.CharField(max_length=10)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.event_name

class Todo(models.Model) :
    title = models.CharField(max_length = 40)
    description = models.CharField(max_length = 100)
    status = models.BooleanField()
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class PDF(models.Model) :
    uid = models.CharField(
        max_length=7,
        unique=True,
        default=get_random_string(7),
        editable=False,
        null=True,
        blank=True
    )
    url = models.FileField(upload_to="pdfs", max_length=100)
    size = models.IntegerField()
    notes = models.JSONField()
    parent_roadmap = models.ForeignKey("api.Roadmap", on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    # CID = models.CharField(max_length = 50, null=True, blank=True)
    date_uploded = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.uid + " (" + self.parent_roadmap.name +")"
    

class PDFChats(models.Model) :
    sender = models.BooleanField()
    content = models.CharField(max_length = 1000)
    pdf = models.ForeignKey(PDF, on_delete=models.CASCADE)
    date_uploded = models.DateTimeField(auto_now_add=True)

class FlashCardSet(models.Model) :
    uid = models.CharField(
        max_length=7,
        primary_key=True,
        unique=True,
        default=get_random_string(7),
        editable=False,
    )
    parent_roadmap = models.ForeignKey("api.Roadmap", on_delete=models.CASCADE)
    content = models.JSONField()

    def __str__(self):
        return self.uid

class Flashcard(models.Model) :
    heading = models.CharField(max_length = 150)
    points = models.JSONField()
    image = models.ImageField(upload_to="flashcards")
    set_fk = models.ForeignKey(FlashCardSet,on_delete=models.CASCADE)

    def __str__(self):
        return self.title
