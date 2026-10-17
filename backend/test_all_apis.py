import os
import sys
import django

# Setup django environment
sys.path.insert(0, '/Users/kamoliddin/Desktop/EduPro/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.test import Client
import json

client = Client()

def run_tests():
    print("=== TESTING EDUPRO BACKEND APIS ===")
    
    # 1. Test Demo Accounts
    res = client.get('/api/v1/users/demo-accounts')
    assert res.status_code == 200, f"Demo accounts failed: {res.status_code} {res.content}"
    data = res.json()
    print(f"✓ Demo accounts ({len(data)} users found)")

    # 2. Test Login
    login_res = client.post('/api/v1/users/login', data=json.dumps({
        "username": "nodir_ielts",
        "password": "teacher123"
    }), content_type='application/json')
    assert login_res.status_code == 200, f"Login failed: {login_res.status_code} {login_res.content}"
    teacher_token = login_res.json()['token']
    print("✓ Login successful for teacher 'nodir_ielts'")

    # 3. Test Courses List
    courses_res = client.get('/api/v1/courses/')
    assert courses_res.status_code == 200, f"Courses failed: {courses_res.status_code}"
    courses = courses_res.json()
    assert len(courses) > 0, "No courses found"
    first_course = courses[0]
    print(f"✓ Courses list ({len(courses)} courses, first: '{first_course['title']}')")

    # 4. Test Course Detail
    detail_res = client.get(f"/api/v1/courses/{first_course['slug']}")
    assert detail_res.status_code == 200, f"Course detail failed: {detail_res.status_code}"
    detail = detail_res.json()
    print(f"✓ Course detail loaded with {len(detail['modules'])} modules and {len(detail['tariffs'])} tariffs")

    # 5. Test Submissions
    sub_res = client.get('/api/v1/assignments/submissions')
    assert sub_res.status_code == 200, f"Submissions failed: {sub_res.status_code}"
    submissions = sub_res.json()
    print(f"✓ Submissions list ({len(submissions)} submissions)")

    # 6. Test Platform Stats
    stats_res = client.get('/api/v1/billing/platform-stats')
    assert stats_res.status_code == 200, f"Platform stats failed: {stats_res.status_code}"
    stats = stats_res.json()
    print(f"✓ Platform stats: GMV={stats['gmv_total_uzs']} UZS, Commission={stats['net_commission_uzs']} UZS")

    # 7. Test Student CRM
    crm_res = client.get('/api/v1/analytics/crm-students')
    assert crm_res.status_code == 200, f"CRM failed: {crm_res.status_code}"
    crm = crm_res.json()
    print(f"✓ Student CRM ({len(crm)} students tracked)")

    # 8. Test Bunny.net Upload Simulation
    upload_res = client.post('/api/v1/courses/upload-simulation')
    assert upload_res.status_code == 200, f"Bunny upload failed: {upload_res.status_code}"
    print(f"✓ Bunny.net upload simulation: {upload_res.json()['video_id']}")

    # 9. Test Heartbeat Tracking
    if detail['modules'] and detail['modules'][0]['lessons']:
        lesson_id = detail['modules'][0]['lessons'][0]['id']
        student_token = "demo-student"
        hb_res = client.post('/api/v1/analytics/heartbeat', data=json.dumps({
            "lesson_id": lesson_id,
            "position_seconds": 150,
            "duration_seconds": 720
        }), content_type='application/json', HTTP_AUTHORIZATION=f"Bearer {student_token}")
        assert hb_res.status_code == 200, f"Heartbeat failed: {hb_res.status_code} {hb_res.content}"
        print(f"✓ Video Heartbeat recorded: {hb_res.json()['completion_percentage']}% completed")

    # 10. Test Checkout
    checkout_res = client.post('/api/v1/billing/checkout', data=json.dumps({
        "course_id": first_course['id'],
        "payment_method": "PAYME"
    }), content_type='application/json', HTTP_AUTHORIZATION="Bearer demo-student")
    assert checkout_res.status_code == 200, f"Checkout failed: {checkout_res.status_code} {checkout_res.content}"
    print(f"✓ Checkout successful: Transaction amount {checkout_res.json()['amount_uzs']} UZS")

    print("\nALL 10 CRITICAL BACKEND TESTS PASSED WITH 100% SUCCESS! 🎉")

if __name__ == '__main__':
    run_tests()
