import jwt
from datetime import datetime, timedelta
from typing import Optional, List
from django.conf import settings
from django.contrib.auth import get_user_model
from ninja.security import HttpBearer
from core.exceptions import AuthenticationError, PermissionDeniedError

SECRET_KEY = getattr(settings, 'SECRET_KEY', 'edupro-super-secret-key-2026')
ALGORITHM = "HS256"

def create_access_token(user_id: str, role: str, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)
    to_encode = {
        "sub": str(user_id),
        "role": role,
        "exp": expire,
        "iat": datetime.utcnow()
    }
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise AuthenticationError("Token has expired")
    except jwt.PyJWTError:
        raise AuthenticationError("Invalid token")

class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        User = get_user_model()
        # Support demo token shortcuts: "demo-superadmin", "demo-teacher", "demo-student"
        if token.startswith("demo-"):
            role = token.replace("demo-", "").upper()
            user = User.objects.filter(role=role).first()
            if not user:
                user = User.objects.first()
            if user:
                request.user = user
                return user
        try:
            payload = decode_access_token(token)
            user_id = payload.get("sub")
            if not user_id:
                return None
            user = User.objects.filter(id=user_id).first()
            if not user or not user.is_active:
                return None
            request.user = user
            return user
        except Exception:
            return None

class OptionalAuthBearer(HttpBearer):
    def authenticate(self, request, token):
        if not token:
            return None
        auth = AuthBearer()
        return auth.authenticate(request, token)

def check_role(user, allowed_roles: List[str]):
    if not user or not user.is_authenticated:
        raise AuthenticationError("User not authenticated")
    if user.role not in allowed_roles:
        raise PermissionDeniedError(f"Access restricted to {', '.join(allowed_roles)}")
    return True
