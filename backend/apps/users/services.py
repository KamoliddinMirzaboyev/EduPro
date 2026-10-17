import uuid
from django.contrib.auth import authenticate
from apps.users.models import User, TeacherProfile, StudentProfile, UserRole
from core.auth import create_access_token
from core.exceptions import AuthenticationError, ValidationError

class UserService:
    @staticmethod
    def authenticate_user(username: str, password: str):
        user = authenticate(username=username, password=password)
        if not user:
            user = User.objects.filter(username=username).first() or User.objects.filter(phone_number=username).first()
            if user and user.check_password(password):
                pass
            else:
                raise AuthenticationError("Invalid username or password")
        token = create_access_token(str(user.id), user.role)
        return user, token

    @staticmethod
    def register_user(data):
        if User.objects.filter(username=data.username).exists():
            raise ValidationError("Username already taken")
        if data.phone_number and User.objects.filter(phone_number=data.phone_number).exists():
            raise ValidationError("Phone number already registered")
        
        user = User.objects.create_user(
            username=data.username,
            email=data.email or '',
            password=data.password,
            full_name=data.full_name,
            phone_number=data.phone_number,
            role=data.role
        )
        if user.role == UserRole.TEACHER:
            TeacherProfile.objects.create(
                user=user,
                specialization="Instructor",
                bio="Educator on EduPro"
            )
        elif user.role == UserRole.STUDENT:
            StudentProfile.objects.create(
                user=user,
                learning_goal="IELTS 7.5+"
            )
        token = create_access_token(str(user.id), user.role)
        return user, token

    @staticmethod
    def verify_otp_and_login(phone_number: str, role: str = 'STUDENT', full_name: str = None):
        clean_phone = phone_number.strip().replace(' ', '').replace('-', '')
        user = User.objects.filter(phone_number=clean_phone).first()

        if not user:
            # Create new user
            random_suffix = uuid.uuid4().hex[:6]
            username = f"{role.lower()}_{random_suffix}"
            user = User.objects.create_user(
                username=username,
                password=uuid.uuid4().hex,
                full_name=full_name or f"User {clean_phone[-4:]}",
                phone_number=clean_phone,
                role=role,
                is_onboarded=False
            )
            if role == UserRole.TEACHER:
                TeacherProfile.objects.create(
                    user=user,
                    specialization="Ustoz",
                    bio=""
                )
            else:
                StudentProfile.objects.create(
                    user=user,
                    learning_goal="IELTS 7.5+"
                )
        else:
            if full_name and not user.full_name:
                user.full_name = full_name
                user.save()

        token = create_access_token(str(user.id), user.role)
        return user, token
