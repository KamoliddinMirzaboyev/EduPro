from typing import List
from uuid import UUID
from ninja import Router
from apps.users.models import User, TeacherProfile, StudentProfile, UserRole, KycStatus
from apps.users.schemas import (
    UserSchema, 
    LoginInput, 
    RegisterInput, 
    AuthResponse, 
    UpdateTeacherStatusInput,
    RequestOtpInput,
    VerifyOtpInput,
    TeacherOnboardingInput,
    StudentOnboardingInput
)
from apps.users.services import UserService
from core.auth import AuthBearer
from core.exceptions import NotFoundError, ValidationError

router = Router(tags=["Users & Auth"])

@router.post("/login", response=AuthResponse)
def login(request, payload: LoginInput):
    user, token = UserService.authenticate_user(payload.username, payload.password)
    return {"token": token, "user": user}

@router.post("/register", response=AuthResponse)
def register(request, payload: RegisterInput):
    user, token = UserService.register_user(payload)
    return {"token": token, "user": user}

@router.post("/request-otp")
def request_otp(request, payload: RequestOtpInput):
    # Mock OTP service: always code 12345
    return {
        "status": "OTP_SENT",
        "phone_number": payload.phone_number,
        "demo_code": "12345",
        "message": "Tasdiqlash kodi telefon raqamingizga SMS orqali yuborildi (Demo kod: 12345)"
    }

@router.post("/verify-otp", response=AuthResponse)
def verify_otp(request, payload: VerifyOtpInput):
    if payload.otp_code != "12345":
        raise ValidationError("Noto'g'ri tasdiqlash kodi kiritildi. Demo kod: 12345")
    
    user, token = UserService.verify_otp_and_login(
        phone_number=payload.phone_number, 
        role=payload.role,
        full_name=payload.full_name
    )
    return {"token": token, "user": user}

@router.post("/teacher-onboarding", response=UserSchema, auth=AuthBearer())
def teacher_onboarding(request, payload: TeacherOnboardingInput):
    user = request.user
    user.full_name = payload.full_name
    user.role = UserRole.TEACHER
    user.is_onboarded = True
    user.is_verified = False  # requires Superadmin KYC approval
    user.save()

    profile, _ = TeacherProfile.objects.get_or_create(user=user)
    profile.specialization = payload.specialization
    profile.experience_years = payload.experience_years
    profile.bio = payload.bio
    profile.public_handle = payload.public_handle
    profile.certificate_type = payload.certificate_type
    profile.certificate_number = payload.certificate_number
    profile.certificate_url = payload.certificate_url
    profile.payout_card_number = payload.payout_card_number
    profile.payout_card_holder = payload.payout_card_holder
    profile.kyc_status = KycStatus.PENDING
    profile.save()

    user.refresh_from_db()
    return user

@router.post("/student-onboarding", response=UserSchema, auth=AuthBearer())
def student_onboarding(request, payload: StudentOnboardingInput):
    user = request.user
    user.full_name = payload.full_name
    user.is_onboarded = True
    user.save()

    profile, _ = StudentProfile.objects.get_or_create(user=user)
    profile.learning_goal = payload.learning_goal
    profile.current_level = payload.current_level
    profile.daily_study_minutes = payload.daily_study_minutes
    profile.telegram_notifications_enabled = payload.telegram_notifications_enabled
    profile.save()

    user.refresh_from_db()
    return user

@router.get("/me", response=UserSchema, auth=AuthBearer())
def get_me(request):
    user = request.user
    user.refresh_from_db()
    return user

@router.get("/teachers", response=List[UserSchema])
def list_teachers(request):
    return User.objects.filter(role=UserRole.TEACHER).select_related('teacher_profile')

@router.get("/admin/teachers/kyc", response=List[UserSchema])
def list_pending_kyc_teachers(request):
    return User.objects.filter(role=UserRole.TEACHER).select_related('teacher_profile').order_by('-created_at')

@router.patch("/teachers/{teacher_id}/verify", response=UserSchema)
def verify_teacher(request, teacher_id: UUID, payload: UpdateTeacherStatusInput):
    user = User.objects.filter(id=teacher_id, role=UserRole.TEACHER).first()
    if not user:
        raise NotFoundError("Teacher not found")
    user.is_verified = payload.is_verified
    user.save()
    if hasattr(user, 'teacher_profile'):
        profile = user.teacher_profile
        if payload.commission_rate is not None:
            profile.commission_rate = payload.commission_rate
        if payload.kyc_status is not None:
            profile.kyc_status = payload.kyc_status
        elif payload.is_verified:
            profile.kyc_status = KycStatus.APPROVED
        profile.save()
    return user

@router.get("/demo-accounts")
def demo_accounts(request):
    users = User.objects.all().order_by('role')
    return [
        {
            "id": str(u.id),
            "username": u.username,
            "full_name": u.full_name,
            "role": u.role,
            "phone_number": u.phone_number,
            "avatar": u.avatar,
            "is_verified": u.is_verified,
            "is_onboarded": u.is_onboarded,
        }
        for u in users
    ]
