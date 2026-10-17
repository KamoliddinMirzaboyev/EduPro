from decimal import Decimal
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.utils import timezone
from apps.users.models import User, UserRole, TeacherProfile
from apps.courses.models import Course, CourseTariff, Module, Lesson, LessonMaterial, CourseStatus
from apps.assignments.models import Assignment, AssignmentType, Submission, SubmissionStatus
from apps.billing.models import Enrollment, Transaction, PayoutRequest, PaymentMethod, TransactionStatus, PayoutStatus
from apps.analytics.models import LessonProgress
from apps.assignments.services import AIAssessmentService

class Command(BaseCommand):
    help = 'Seeds realistic Uzbekistan EdTech data for EDUPRO'

    def handle(self, *args, **options):
        self.stdout.write("Seeding EDUPRO database...")

        # 1. Superadmin User
        superadmin, _ = User.objects.get_or_create(
            username='admin',
            defaults={
                'full_name': 'Shoxrux Qodirov',
                'email': 'admin@edupro.uz',
                'phone_number': '+998901000001',
                'role': UserRole.SUPERADMIN,
                'is_staff': True,
                'is_superuser': True,
                'is_verified': True,
                'avatar': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            }
        )
        superadmin.set_password('admin123')
        superadmin.save()

        # 2. Teachers
        teacher1, _ = User.objects.get_or_create(
            username='nodir_ielts',
            defaults={
                'full_name': 'Nodirbek Alimov',
                'email': 'nodir@ieltszone.uz',
                'phone_number': '+998909876543',
                'role': UserRole.TEACHER,
                'is_verified': True,
                'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
            }
        )
        teacher1.set_password('teacher123')
        teacher1.save()

        profile1, _ = TeacherProfile.objects.get_or_create(
            user=teacher1,
            defaults={
                'bio': 'Official IELTS 8.5 Holder (Listening 9.0, Reading 9.0). 7+ years of academic writing coaching with 500+ successful alumni in top world universities.',
                'specialization': 'IELTS 8.5 Instructor & Examiner',
                'certificate_url': 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80',
                'commission_rate': Decimal('10.00'),
                'available_balance': Decimal('12450000.00'),
                'escrow_balance': Decimal('2800000.00')
            }
        )

        teacher2, _ = User.objects.get_or_create(
            username='malika_sat',
            defaults={
                'full_name': 'Malika Karimova',
                'email': 'malika@satpro.uz',
                'phone_number': '+998912345678',
                'role': UserRole.TEACHER,
                'is_verified': True,
                'avatar': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
            }
        )
        teacher2.set_password('teacher123')
        teacher2.save()

        TeacherProfile.objects.get_or_create(
            user=teacher2,
            defaults={
                'bio': 'SAT Math 800 Perfect Scorer. Graduate of KAIST. Trained over 300 students to secure Ivy League & top US scholarships.',
                'specialization': 'SAT Math 800 Specialist',
                'certificate_url': 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80',
                'commission_rate': Decimal('10.00'),
                'available_balance': Decimal('8900000.00'),
                'escrow_balance': Decimal('1500000.00')
            }
        )

        teacher3, _ = User.objects.get_or_create(
            username='azamat_dev',
            defaults={
                'full_name': 'Azamat Rustamov',
                'email': 'azamat@uzdevs.uz',
                'phone_number': '+998931112244',
                'role': UserRole.TEACHER,
                'is_verified': False, # Pending KYC verification for Superadmin demo!
                'avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            }
        )
        teacher3.set_password('teacher123')
        teacher3.save()

        TeacherProfile.objects.get_or_create(
            user=teacher3,
            defaults={
                'bio': 'Staff Software Engineer with 9 years experience in FinTech & Distributed Systems. Ex-EPAM, Lead at Uzum.',
                'specialization': 'Python & High-Load Architecture Lead',
                'certificate_url': 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?w=800&auto=format&fit=crop&q=80',
                'commission_rate': Decimal('12.00'),
                'available_balance': Decimal('3200000.00'),
                'escrow_balance': Decimal('0.00')
            }
        )

        # 3. Students
        student1, _ = User.objects.get_or_create(
            username='jasur_student',
            defaults={
                'full_name': 'Jasur Abdullayev',
                'email': 'jasur@student.uz',
                'phone_number': '+998901112233',
                'role': UserRole.STUDENT,
                'avatar': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face'
            }
        )
        student1.set_password('student123')
        student1.save()

        student2, _ = User.objects.get_or_create(
            username='madina_student',
            defaults={
                'full_name': 'Madina Usmonova',
                'email': 'madina@student.uz',
                'phone_number': '+998935556677',
                'role': UserRole.STUDENT,
                'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
            }
        )
        student2.set_password('student123')
        student2.save()

        student3, _ = User.objects.get_or_create(
            username='bekzod_student',
            defaults={
                'full_name': 'Bekzod Tursunov',
                'email': 'bekzod@student.uz',
                'phone_number': '+998974443322',
                'role': UserRole.STUDENT,
                'avatar': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
            }
        )
        student3.set_password('student123')
        student3.save()

        # 4. Courses
        course1, _ = Course.objects.get_or_create(
            slug='ielts-85-masterclass',
            defaults={
                'teacher': teacher1,
                'title': 'IELTS 8.5 Academic Writing & Speaking Masterclass',
                'description': 'Master Task 1 & Task 2 academic essays with Band 9 vocabulary, advanced syntactic structures, and native examiner feedback. Includes real practice tests with instant AI grading and personal curator reviews.',
                'category': 'IELTS',
                'price': Decimal('590000.00'),
                'status': CourseStatus.PUBLISHED,
                'has_drip_lock': True,
                'thumbnail_url': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80'
            }
        )

        CourseTariff.objects.get_or_create(
            course=course1,
            title='Self-Study',
            defaults={
                'price_uzs': Decimal('590000.00'),
                'features': ['All 24 video lessons in 4K', 'Unlimited AI Essay Grading', 'Downloadable PDF Templates', 'Lifetime access to materials'],
                'is_popular': False
            }
        )
        CourseTariff.objects.get_or_create(
            course=course1,
            title='With Curator Support',
            defaults={
                'price_uzs': Decimal('890000.00'),
                'features': ['Everything in Self-Study', 'Personal Curator 1-on-1 Feedback', 'Weekly Live Zoom Speaking Club', 'Private Telegram VIP Community'],
                'is_popular': True
            }
        )
        CourseTariff.objects.get_or_create(
            course=course1,
            title='VIP Mentor Pass',
            defaults={
                'price_uzs': Decimal('1600000.00'),
                'features': ['Everything in Curator Plan', '3 Live Mock Exams with Nodirbek Alimov', 'Guaranteed Band 7.5+ or 100% refund'],
                'is_popular': False
            }
        )

        # Course 2: SAT Math
        course2, _ = Course.objects.get_or_create(
            slug='sat-math-800-intensive',
            defaults={
                'teacher': teacher2,
                'title': 'Digital SAT Math 800: Master Problem Solving',
                'description': 'Target 750-800 on Digital SAT Math through high-frequency problem walkthroughs, Desmos graphing calculator mastery, and speed shortcuts.',
                'category': 'SAT',
                'price': Decimal('750000.00'),
                'status': CourseStatus.PUBLISHED,
                'has_drip_lock': False,
                'thumbnail_url': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80'
            }
        )
        CourseTariff.objects.get_or_create(
            course=course2,
            title='Complete Access',
            defaults={
                'price_uzs': Decimal('750000.00'),
                'features': ['Desmos Graphing Mastery', '600+ Practice Problems with Video Solutions', 'Full-Length Digital SAT Mock Tests'],
                'is_popular': True
            }
        )

        # Course 3: Python Backend (In PENDING_REVIEW for Superadmin Moderation)
        course3, _ = Course.objects.get_or_create(
            slug='python-backend-django-ninja',
            defaults={
                'teacher': teacher3,
                'title': 'Production Python Backend: Django 5, Ninja & Microservices',
                'description': 'Build resilient high-performance REST APIs with async Django Ninja, Celery task workers, Redis caching, and Docker deployments.',
                'category': 'IT & Programming',
                'price': Decimal('980000.00'),
                'status': CourseStatus.PENDING_REVIEW,
                'has_drip_lock': True,
                'thumbnail_url': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
            }
        )

        # 5. Modules & Lessons for Course 1
        mod1, _ = Module.objects.get_or_create(
            course=course1,
            title='Module 1: Task 2 Essay Structure & Academic Register',
            defaults={'order': 1}
        )
        mod2, _ = Module.objects.get_or_create(
            course=course1,
            title='Module 2: Advanced Cohesion & Band 9 Lexical Resource',
            defaults={'order': 2}
        )
        mod3, _ = Module.objects.get_or_create(
            course=course1,
            title='Module 3: Speaking Part 2 & Part 3 Fluency',
            defaults={'order': 3}
        )

        l1, _ = Lesson.objects.get_or_create(
            module=mod1,
            title='01. IELTS Task 2 Band Descriptors Deconstructed',
            defaults={
                'order': 1,
                'video_provider_id': 'bunny_cdn_vid_01',
                'duration_seconds': 720, # 12 mins
                'is_free_preview': True,
                'stop_lesson_required': False,
                'minimum_watch_percent': 80
            }
        )
        LessonMaterial.objects.get_or_create(
            lesson=l1,
            title='Official Band Descriptors Matrix (PDF)',
            defaults={'file_url': 'https://example.com/materials/band-descriptors.pdf', 'file_size': '2.4 MB'}
        )

        l2, _ = Lesson.objects.get_or_create(
            module=mod1,
            title='02. Agree/Disagree & Discussion Essays: High-Scoring Outline',
            defaults={
                'order': 2,
                'video_provider_id': 'bunny_cdn_vid_02',
                'duration_seconds': 1140, # 19 mins
                'is_free_preview': False,
                'stop_lesson_required': True,
                'minimum_watch_percent': 85
            }
        )
        LessonMaterial.objects.get_or_create(
            lesson=l2,
            title='Top 5 Essay Outlines & Thesis Statement Cheatsheet',
            defaults={'file_url': 'https://example.com/materials/essay-structures.pdf', 'file_size': '1.8 MB'}
        )

        l3, _ = Lesson.objects.get_or_create(
            module=mod2,
            title='03. Cohesion Devices: Avoiding Overuse of Mechanical Linkers',
            defaults={
                'order': 1,
                'video_provider_id': 'bunny_cdn_vid_03',
                'duration_seconds': 960,
                'is_free_preview': False,
                'stop_lesson_required': True,
                'minimum_watch_percent': 85
            }
        )

        l4, _ = Lesson.objects.get_or_create(
            module=mod3,
            title='04. Natural Idiomatic Collocations for Speaking Part 3',
            defaults={
                'order': 1,
                'video_provider_id': 'bunny_cdn_vid_04',
                'duration_seconds': 840,
                'is_free_preview': False,
                'stop_lesson_required': False,
                'minimum_watch_percent': 85
            }
        )

        # 6. Assignment for Lesson 2
        assign1, _ = Assignment.objects.get_or_create(
            lesson=l2,
            title='Task 2 Full Essay: Higher Education Funding',
            defaults={
                'type': AssignmentType.WRITING_ESSAY,
                'instructions': 'Write an academic essay (at least 250 words) on: "Some people believe that university education should be free for all students, while others argue that students should pay for their higher education. Discuss both views and give your opinion."',
                'max_score': Decimal('9.0'),
                'ai_grading_enabled': True,
                'rubric_prompt': 'Assess based on official IELTS 4 Band Descriptors: TR, CC, LR, GRA.'
            }
        )

        # 7. Submissions with AI Pre-Grading
        sub1, _ = Submission.objects.get_or_create(
            assignment=assign1,
            student=student1,
            defaults={
                'text_answer': """In recent decades, whether tertiary education ought to be subsidized by the state has sparked profound debate among educational economists and citizens alike. While proponents argue that free university promotes equal opportunities, others contend that tuition fees incentivize students to value their academic commitments and ensure institutional self-sufficiency. In this essay, I will examine both perspectives before articulating my perspective.

Advocates of complimentary higher education point out that intellectual capital is a country's most pivotal asset. When universities are accessible regardless of socioeconomic background, meritorious scholars from underprivileged families can obtain degrees, breaking generational poverty cycles. For example, Scandinavian nations such as Norway and Finland offer free tertiary instruction, which correlates with low inequality rates and robust innovation metrics.

Conversely, skeptics argue that complete state funding places an immense fiscal burden on taxpayers. If universities rely exclusively on government grants, institutions may face budgetary constraints, leading to outdated laboratory apparatus and reduced professor remunerations. Moreover, when students bear financial responsibility, they often exhibit higher motivation and higher graduation completion rates.

In conclusion, although fiscal limitations must be accounted for, I firmly maintain that government investment in university education produces substantial societal returns that far exceed initial costs.""",
                'status': SubmissionStatus.AI_GRADED
            }
        )
        AIAssessmentService.grade_submission(sub1)

        sub2, _ = Submission.objects.get_or_create(
            assignment=assign1,
            student=student2,
            defaults={
                'text_answer': """In nowadays education is very important thing for every teenager. Some people think government should give free education to all students. Other people think university must cost money.

Firstly, if education is free, all poor people can study. This is good for country because more doctors and engineers will work. For instance, in our country many smart students cannot go to university because contract price is high.

Secondly, when university is expensive, students study harder because they pay money. If it is free, maybe students not care about lessons and skip classes.

In my opinion, government must make free only for top students with high IELTS and SAT scores.""",
                'status': SubmissionStatus.PENDING
            }
        )

        # 8. Enrollments & Transactions
        enr1, _ = Enrollment.objects.get_or_create(
            student=student1,
            course=course1,
            defaults={'progress_percent': Decimal('65.00'), 'is_active': True}
        )
        enr2, _ = Enrollment.objects.get_or_create(
            student=student2,
            course=course1,
            defaults={'progress_percent': Decimal('32.00'), 'is_active': True}
        )
        enr3, _ = Enrollment.objects.get_or_create(
            student=student3,
            course=course2,
            defaults={'progress_percent': Decimal('15.00'), 'is_active': True}
        )

        Transaction.objects.get_or_create(
            student=student1,
            course=course1,
            amount_uzs=Decimal('890000.00'),
            defaults={
                'platform_fee_uzs': Decimal('89000.00'),
                'teacher_share_uzs': Decimal('801000.00'),
                'payment_method': PaymentMethod.PAYME,
                'status': TransactionStatus.COMPLETED
            }
        )
        Transaction.objects.get_or_create(
            student=student2,
            course=course1,
            amount_uzs=Decimal('590000.00'),
            defaults={
                'platform_fee_uzs': Decimal('59000.00'),
                'teacher_share_uzs': Decimal('531000.00'),
                'payment_method': PaymentMethod.CLICK,
                'status': TransactionStatus.COMPLETED
            }
        )
        Transaction.objects.get_or_create(
            student=student3,
            course=course2,
            amount_uzs=Decimal('750000.00'),
            defaults={
                'platform_fee_uzs': Decimal('75000.00'),
                'teacher_share_uzs': Decimal('675000.00'),
                'payment_method': PaymentMethod.UZUM,
                'status': TransactionStatus.COMPLETED
            }
        )

        # 9. Payout Requests
        PayoutRequest.objects.get_or_create(
            teacher=teacher1,
            amount_uzs=Decimal('2800000.00'),
            defaults={
                'card_number': '8600 4921 5567 1290',
                'card_holder': 'NODIRBEK ALIMOV',
                'status': PayoutStatus.PENDING
            }
        )
        PayoutRequest.objects.get_or_create(
            teacher=teacher2,
            amount_uzs=Decimal('4500000.00'),
            defaults={
                'card_number': '9860 3100 8821 4410',
                'card_holder': 'MALIKA KARIMOVA',
                'status': PayoutStatus.PAID
            }
        )

        # 10. Lesson Progress
        LessonProgress.objects.get_or_create(
            student=student1,
            lesson=l1,
            defaults={'watched_seconds': 720, 'last_position_seconds': 720, 'is_completed': True}
        )
        LessonProgress.objects.get_or_create(
            student=student1,
            lesson=l2,
            defaults={'watched_seconds': 950, 'last_position_seconds': 950, 'is_completed': False}
        )
        LessonProgress.objects.get_or_create(
            student=student2,
            lesson=l1,
            defaults={'watched_seconds': 260, 'last_position_seconds': 260, 'is_completed': False}
        )

        self.stdout.write(self.style.SUCCESS("EDUPRO Seed Data Successfully Created!"))
        self.stdout.write("Credentials:")
        self.stdout.write(" - Superadmin: username='admin', password='admin123'")
        self.stdout.write(" - Teacher 1:  username='nodir_ielts', password='teacher123'")
        self.stdout.write(" - Teacher 2:  username='malika_sat', password='teacher123'")
        self.stdout.write(" - Teacher 3:  username='azamat_dev', password='teacher123' (Unverified KYC)")
        self.stdout.write(" - Student 1:  username='jasur_student', password='student123'")
        self.stdout.write(" - Student 2:  username='madina_student', password='student123'")
