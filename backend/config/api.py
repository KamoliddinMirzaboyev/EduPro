from ninja import NinjaAPI
from apps.users.api import router as users_router
from apps.courses.api import router as courses_router
from apps.assignments.api import router as assignments_router
from apps.billing.api import router as billing_router
from apps.analytics.api import router as analytics_router

api = NinjaAPI(
    title="EDUPRO API",
    version="1.0.0",
    description="Creator-First LMS & EdTech Marketplace Backend API (Django 5 + Django Ninja)"
)

api.add_router("/users", users_router)
api.add_router("/courses", courses_router)
api.add_router("/assignments", assignments_router)
api.add_router("/billing", billing_router)
api.add_router("/analytics", analytics_router)
