# EDUPRO — Creator-First LMS & EdTech Marketplace

**EDUPRO** is a modern, modular, Creator-First LMS & EdTech Marketplace platform tailored for professional educators, IELTS 8.5 experts, and tech instructors in Uzbekistan.

Built with a strict **"Swiss Precision & Paper Minimalism"** aesthetic inspired by Linear, Vercel, and Notion.

---

## 🏗 Monorepo Architecture

```text
EDUPRO/
├── backend/                  # Django 5.x + Django Ninja (Async REST API, Port: 8000)
│   ├── config/               # Settings, ASGI/WSGI, NinjaAPI central router
│   ├── apps/                 # Clean Architecture domain modules:
│   │   ├── users/            # Custom User, RBAC, Teacher KYC & verification
│   │   ├── courses/          # Courses, Modules, Lessons, Tariffs, Bunny.net Stream
│   │   ├── assignments/      # IELTS Task 2 & Speaking, AI Auto-Grader engine
│   │   ├── billing/          # Escrow wallet, Uzcard/Humo payouts, Click/Payme/Uzum
│   │   └── analytics/        # Video heartbeat, CRM attendance, Telegram alerts
│   ├── core/                 # JWT AuthBearer, TimeStampedUUIDModel, Exceptions
│   └── manage.py
│
├── superadmin/               # Platform Governance Control Center (Port: 3001)
├── teacher/                  # Creator Studio & Curator Workspace (Port: 3002)
└── student/                  # Student LMS & Marketplace with Anti-Piracy Watermark (Port: 3003)
```

---

## ⚡ Quick Start

### 1. Ishga tushirish (One-Command)
Barcha 4 ta servisni parallel ishga tushirish:
```bash
./start_all.sh
```

Yoki har birini alohida terminalda:
```bash
# Terminal 1: Backend API (Port 8000)
cd backend && ./venv/bin/python manage.py runserver 0.0.0.0:8000

# Terminal 2: Superadmin Governance (Port 3001)
cd superadmin && npm run dev

# Terminal 3: Teacher Studio (Port 3002)
cd teacher && npm run dev

# Terminal 4: Student Portal (Port 3003)
cd student && npm run dev
```

---

## 🌐 Portlar va Xizmatlar

| Xizmat | URL | Vazifasi |
| :--- | :--- | :--- |
| **Backend REST API** | [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs) | Swagger & OpenAPI interaktiv hujjatlari |
| **Superadmin** | [http://localhost:3001](http://localhost:3001) | GMV savdo, KYC tasdiqlash, Kurslar moderatsiyasi, Escrow & Payouts |
| **Teacher Studio** | [http://localhost:3002](http://localhost:3002) | Modullar & Darslar, Stop-Lesson (85%), AI Assessment Inbox, CRM |
| **Student Portal** | [http://localhost:3003](http://localhost:3003) | Marketpleys, Anti-Piracy dinamik suv belgili video player, AI Tutor |

---

## 🔑 Test Hisoblari (Pre-seeded Demo Accounts)

Baza `python manage.py seed_edupro` buyrug'i orqali o'zbek ta'lim muhitiga mos real ma'lumotlar bilan to'ldirilgan:

| Rol | Username | Parol | Ism-familiya / Ta'rif |
| :--- | :--- | :--- | :--- |
| **Superadmin** | `admin` | `admin123` | Shoxrux Qodirov (Platform Owner) |
| **Teacher 1** | `nodir_ielts` | `teacher123` | Nodirbek Alimov (IELTS 8.5 Instructor, Tasdiqlangan) |
| **Teacher 2** | `malika_sat` | `teacher123` | Malika Karimova (SAT Math 800 Specialist) |
| **Teacher 3** | `azamat_dev` | `teacher123` | Azamat Rustamov (Python Lead, KYC Kutilmoqda) |
| **Student 1** | `jasur_student` | `student123` | Jasur Abdullayev (IELTS 8.5 Masterclass faol o'quvchisi) |
| **Student 2** | `madina_student` | `student123` | Madina Usmonova (Topshirilgan insho egasi) |

---

## 🎨 UI/UX Dizayn Qoidalari: "Swiss Precision & Paper Minimalism"

Uchala frontend loyihada ham qat'iy qoidalarga amal qilingan:
- **Asosiy Fon:** `#FAFAFA` (yumshoq qog'oz oqi, ko'zni charchatmaydi)
- **Kartalar & Panel:** `#FFFFFF` toza oq, 4 tomondan tekis `1px solid #E4E4E7` chiziq
- **Taqiqlangan:** Chap tomondagi qalin rangli chiziqlar (`border-l-4`), neon ranglar, gradientlar (`bg-gradient-to-*`)
- **Burchaklar:** Tugma va inputlar uchun `6px` (`rounded-md`), kartalar uchun `8px` (`rounded-lg`)
- **Shriftlar:** `Inter` interfeys matnlari uchun; `JetBrains Mono` narxlar, hisoblar va ID lar uchun (`tabular-nums font-mono`).
