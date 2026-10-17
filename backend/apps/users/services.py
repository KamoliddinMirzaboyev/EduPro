from django.contrib.auth import authenticate
from apps.users.models import User, TeacherProfile, UserRole
from core.auth import create_access_token
from core.exceptions import AuthenticationError, ValidationError

class UserService:
    @staticmethod
    def authenticate_user(username: str, password: str):
        user = authenticate(username=username, password=password)
        if not user:
            # Check if user exists by username or phone
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
        token = create_access_token(str(user.id), user.role)
        return user, token
