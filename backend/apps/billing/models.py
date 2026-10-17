import uuid
from django.db import models
from django.conf import settings
from apps.courses.models import Course, CourseTariff

class PaymentMethod(models.TextChoices):
    CLICK = 'CLICK', 'Click'
    PAYME = 'PAYME', 'Payme'
    UZUM = 'UZUM', 'Uzum Bank'

class TransactionStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    COMPLETED = 'COMPLETED', 'Completed'
    FAILED = 'FAILED', 'Failed'

class PayoutStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    APPROVED = 'APPROVED', 'Approved'
    PAID = 'PAID', 'Paid'
    REJECTED = 'REJECTED', 'Rejected'

class Enrollment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    tariff = models.ForeignKey(CourseTariff, on_delete=models.SET_NULL, null=True, blank=True, related_name='enrollments')
    progress_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    is_active = models.BooleanField(default=True)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student.full_name} enrolled in {self.course.title}"

class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transactions')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='transactions')
    amount_uzs = models.DecimalField(max_digits=12, decimal_places=2)
    platform_fee_uzs = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    teacher_share_uzs = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.PAYME)
    status = models.CharField(max_length=20, choices=TransactionStatus.choices, default=TransactionStatus.COMPLETED)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.payment_method}: {self.amount_uzs} UZS by {self.student.full_name}"

class PayoutRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payout_requests')
    amount_uzs = models.DecimalField(max_digits=12, decimal_places=2)
    card_number = models.CharField(max_length=24) # 8600... or 9860...
    card_holder = models.CharField(max_length=150, blank=True)
    status = models.CharField(max_length=20, choices=PayoutStatus.choices, default=PayoutStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Payout {self.amount_uzs} UZS to {self.card_number} ({self.status})"
