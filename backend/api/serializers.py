from .models import PDF, PDFChats
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "pfp",
                  "bio", "first_name", "last_name", "verified"]

    def get_image(self, obj):
        if obj.image:
            return obj.image.name  # This ensures the relative path is returned
        return None


class CalenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ["event_name", "description",
                  "start_date", "end_date", "status", "color"]


class PDFChatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFChats
        fields = ['sender', 'content', 'date_uploaded']


class PDFSerializer(serializers.ModelSerializer):
    chats = serializers.SerializerMethodField()

    class Meta:
        model = PDF
        fields = ['uid', 'url', 'size', 'notes',
                  'parent_roadmap', 'user', 'date_uploaded', 'chats']

    def get_chats(self, obj):
        chats = PDFChats.objects.filter(pdf=obj)
        return PDFChatsSerializer(chats, many=True).data


class FlashCardSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashCardSet
        fields = ['uid', 'parent_roadmap', 'content']
        read_only_fields = ['uid']


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['uid', 'type', 'title', 'url',
                  'description', 'estimated_time']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['uid', 'title', 'description', 'difficulty']


class MileStoneSerializer(serializers.ModelSerializer):
    resources = serializers.SerializerMethodField()
    projects = serializers.SerializerMethodField()

    class Meta:
        model = MileStone
        fields = ['uid', 'title', 'duration', 'status',
                  'topics', 'resources', 'projects']

    def get_resources(self, obj):
        resources = Resource.objects.filter(parent_milestone=obj)
        return ResourceSerializer(resources, many=True).data

    def get_projects(self, obj):
        projects = Project.objects.filter(parent_milestone=obj)
        return ProjectSerializer(projects, many=True).data


class RoadmapSerializer(serializers.ModelSerializer):
    milestones = serializers.SerializerMethodField()
    current_milestone = MileStoneSerializer()
    user = UserSerializer()

    class Meta:
        model = Roadmap
        fields = ['uid', 'subject', 'duration','status',
                  'current_milestone', 'user', 'milestones']

    def get_milestones(self, obj):
        milestones = MileStone.objects.filter(parent_roadmap=obj)

        return MileStoneSerializer(milestones, many=True).data


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['uid', 'description', 'status', 'label']
