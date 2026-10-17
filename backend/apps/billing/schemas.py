from uuid import UUID
from typing import Optional, List, Any
from pydantic import BaseModel
from datetime import datetime

class TransactionSchema(BaseModel):
    id: UUID
    student_id: UUID
    student_name: str
    course_id: UUID
    course_title: str
    amount_uzs: float
    platform_fee_uzs: float
    teacher_share_uzs: float
    payment_method: str
    status: str
    created_at: datetime

class EnrollmentSchema(BaseModel):
    id: UUID
    student_id: UUID
    course_id: UUID
    course_title: str
    tariff_title: Optional[str] = None
    progress_percent: float
    is_active: bool
    enrolled_at: datetime

class PayoutRequestSchema(BaseModel):
    id: UUID
    teacher_id: UUID
    teacher_name: str
    amount_uzs: float
    card_number: str
    card_holder: str
    status: str
    created_at: datetime
    updated_at: datetime

class CheckoutInput(BaseModel):
    course_id: UUID
    tariff_id: Optional[UUID] = None
    payment_method: str = "PAYME" # CLICK, PAYME, UZUM

class PayoutCreateInput(BaseModel):
    amount_uzs: float
    card_number: str
    card_holder: Optional[str] = ""

class PayoutModerateInput(BaseModel):
    status: str # APPROVED, PAID, REJECTED

class PlatformStatsSchema(BaseModel):
    gmv_total_uzs: float
    net_commission_uzs: float
    total_teachers: int
    total_students: int
    total_courses: int
    total_enrollments: int
    bandwidth_gb_used: float
    monthly_growth_rate: float
