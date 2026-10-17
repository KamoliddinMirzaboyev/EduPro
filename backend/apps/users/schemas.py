from uuid import UUID
from typing import Optional, List
from ninja import Schema
from pydantic import EmailStr

class TeacherProfileSchema(Schema):
    id: UUID
    bio: str
    specialization: str
    experience_years: int = 3
    public_handle: Optional[str] = ""
    certificate_type: Optional[str] = "IELTS TRF"
    certificate_number: Optional[str] = ""
    certificate_url: Optional[str] = None
    payout_card_number: Optional[str] = ""
    payout_card_holder: Optional[str] = ""
    kyc_status: str = "PENDING"
    commission_rate: float
    escrow_balance: float
    available_balance: float

class StudentProfileSchema(Schema):
    id: UUID
    learning_goal: str
    current_level: str
    target_exam_date: Optional[str] = ""
    daily_study_minutes: int = 60
    telegram_notifications_enabled: bool = True

class UserSchema(Schema):
    id: UUID
    username: str
    email: Optional[str] = ""
    phone_number: Optional[str] = None
    full_name: str
    role: str
    avatar: Optional[str] = None
    is_verified: bool
    is_onboarded: bool = False
    teacher_profile: Optional[TeacherProfileSchema] = None
    student_profile: Optional[StudentProfileSchema] = None

class LoginInput(Schema):
    username: str
    password: str

class RegisterInput(Schema):
    username: str
    password: str
    full_name: str
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    role: str = "STUDENT"

class RequestOtpInput(Schema):
    phone_number: str

class VerifyOtpInput(Schema):
    phone_number: str
    otp_code: str
    role: str = "STUDENT"
    full_name: Optional[str] = None

class AuthResponse(Schema):
    token: str
    user: UserSchema

class TeacherOnboardingInput(Schema):
    full_name: str
    specialization: str
    experience_years: int = 3
    bio: str
    public_handle: str
    certificate_type: str = "IELTS TRF"
    certificate_number: str
    certificate_url: Optional[str] = None
    payout_card_number: str
    payout_card_holder: str

class StudentOnboardingInput(Schema):
    full_name: str
    learning_goal: str
    current_level: str
    daily_study_minutes: int = 60
    telegram_notifications_enabled: bool = True

class UpdateTeacherStatusInput(Schema):
    is_verified: bool
    commission_rate: Optional[float] = None
    kyc_status: Optional[str] = None
