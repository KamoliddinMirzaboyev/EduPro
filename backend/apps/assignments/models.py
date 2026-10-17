import uuid
from django.db import models
from django.conf import settings
from apps.courses.models import Lesson

class AssignmentType(models.TextChoices):
    QUIZ = 'QUIZ', 'Quiz'
    WRITING_ESSAY = 'WRITING_ESSAY', 'Writing Essay'
    SPEAKING_AUDIO = 'SPEAKING_AUDIO', 'Speaking Audio'
    FILE_UPLOAD = 'FILE_UPLOAD', 'File Upload'

class SubmissionStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    AI_GRADED = 'AI_GRADED', 'AI Graded'
    TEACHER_REVIEWED = 'TEACHER_REVIEWED', 'Teacher Reviewed'

class Assignment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=30, choices=AssignmentType.choices, default=AssignmentType.WRITING_ESSAY)
    instructions = models.TextField()
    max_score = models.DecimalField(max_digits=5, decimal_places=2, default=9.0) # IELTS default 9.0
    ai_grading_enabled = models.BooleanField(default=True)
    rubric_prompt = models.TextField(blank=True, default='Assess IELTS Task 2 Essay based on 4 official band descriptors.')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.lesson.title} - {self.title} ({self.type})"

class Submission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='submissions')
    text_answer = models.TextField(blank=True)
    audio_or_file_url = models.URLField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=30, choices=SubmissionStatus.choices, default=SubmissionStatus.PENDING)
    ai_suggested_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    ai_feedback_json = models.JSONField(default=dict, blank=True)
    final_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    teacher_feedback = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='reviewed_submissions'
    )
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"Submission by {self.student.full_name} for {self.assignment.title}"
