from typing import List
from uuid import UUID
from ninja import Router
from apps.users.models import User, TeacherProfile, UserRole
from apps.users.schemas import UserSchema, LoginInput, RegisterInput, AuthResponse, UpdateTeacherStatusInput
from apps.users.services import UserService
from core.auth import AuthBearer, OptionalAuthBearer, check_role
from core.exceptions import NotFoundError

router = Router(tags=["Users & Auth"])

@router.post("/login", response=AuthResponse)
def login(request, payload: LoginInput):
    user, token = UserService.authenticate_user(payload.username, payload.password)
    return {"token": token, "user": user}

@router.post("/register", response=AuthResponse)
def register(request, payload: RegisterInput):
    user, token = UserService.register_user(payload)
    return {"token": token, "user": user}

@router.get("/me", response=UserSchema, auth=AuthBearer())
def get_me(request):
    return request.user

@router.get("/teachers", response=List[UserSchema])
def list_teachers(request):
    return User.objects.filter(role=UserRole.TEACHER).select_related('teacher_profile')

@router.patch("/teachers/{teacher_id}/verify", response=UserSchema, auth=AuthBearer())
def verify_teacher(request, teacher_id: UUID, payload: UpdateTeacherStatusInput):
    check_role(request.user, [UserRole.SUPERADMIN])
    user = User.objects.filter(id=teacher_id, role=UserRole.TEACHER).first()
    if not user:
        raise NotFoundError("Teacher not found")
    user.is_verified = payload.is_verified
    user.save()
    if payload.commission_rate is not None and hasattr(user, 'teacher_profile'):
        profile = user.teacher_profile
        profile.commission_rate = payload.commission_rate
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
        }
        for u in users
    ]
