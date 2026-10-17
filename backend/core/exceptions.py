from ninja.errors import HttpError

class APIError(HttpError):
    def __init__(self, status_code: int, message: str, code: str = "ERROR"):
        super().__init__(status_code, message)
        self.code = code
        self.message = message

class AuthenticationError(APIError):
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(status_code=401, message=message, code="UNAUTHORIZED")

class PermissionDeniedError(APIError):
    def __init__(self, message: str = "You do not have permission to perform this action"):
        super().__init__(status_code=403, message=message, code="FORBIDDEN")

class NotFoundError(APIError):
    def __init__(self, message: str = "Requested resource not found"):
        super().__init__(status_code=404, message=message, code="NOT_FOUND")

class ValidationError(APIError):
    def __init__(self, message: str = "Invalid input data"):
        super().__init__(status_code=422, message=message, code="VALIDATION_ERROR")
