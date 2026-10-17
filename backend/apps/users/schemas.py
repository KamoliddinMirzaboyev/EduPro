from uuid import UUID
from typing import Optional
from ninja import Schema
from pydantic import EmailStr

class TeacherProfileSchema(Schema):
    id: UUID
    bio: str
    specialization: str
    certificate_url: Optional[str] = None
    commission_rate: float
    escrow_balance: float
    available_balance: float

class UserSchema(Schema):
    id: UUID
    username: str
    email: Optional[str] = ""
    phone_number: Optional[str] = None
    full_name: str
    role: str
    avatar: Optional[str] = None
    is_verified: bool
    teacher_profile: Optional[TeacherProfileSchema] = None

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

class AuthResponse(Schema):
    token: str
    user: UserSchema

class UpdateTeacherStatusInput(Schema):
    is_verified: bool
    commission_rate: Optional[float] = None

