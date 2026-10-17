import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Clock, 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  Flame, 
  Laptop, 
  Users,
  Compass,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const WelcomeLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [activeCategory, setActiveCategory] = useState<'ALL' | 'DEV' | 'DESIGN' | 'LANG'>('ALL');

  const featuredCourses = [
    {
      id: 'c1',
      title: "Zamonaviy Fullstack Web Dasturlash (React & Node.js)",
      category: 'DEV',
      instructor: "Sardorbek Olimov",
      badge: "Eng ommabop",
      rating: "4.9",
      students: "1,420+",
      price: "1,200,000 UZS",
      duration: "48 soat amaliyot",
      level: "Boshlang'ich -> Middle"
    },
    {
      id: 'c2',
      title: "IELTS 7.5+ Intensive: Speaking & Academic Writing",
      category: 'LANG',
      instructor: "Malika Yusupova (IELTS 8.5)",
      badge: "Sertifikatlangan",
      rating: "5.0",
      students: "890+",
      price: "950,000 UZS",
      duration: "32 soat video + Live",
      level: "B2 -> C1"
    },
    {
      id: 'c3',
      title: "UI/UX Dizayn va Figma Prototyping Masterclass",
      category: 'DESIGN',
      instructor: "Jamshid Qodirov",
      badge: "Yangi kurs",
      rating: "4.8",
      students: "640+",
      price: "1,100,000 UZS",
      duration: "36 soat loyihalar",
      level: "Barcha darajalar"
    }
  ];

  const filteredCourses = activeCategory === 'ALL' 
    ? featuredCourses 
    : featuredCourses.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090E] text-slate-900 dark:text-zinc-100 font-sans selection:bg-blue-500/20 selection:text-blue-600 transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#08090E]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm tracking-tighter">
                EP
              </div>
              <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base">
                EDUPRO <span className="text-xs font-normal text-blue-600 font-mono">LMS</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-zinc-400">
              <a href="#courses" className="hover:text-slate-900 dark:hover:text-white transition-colors">Kurslar</a>
              <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Afzalliklar</a>
              <a href="#mentors" className="hover:text-slate-900 dark:hover:text-white transition-colors">Ustozlar</a>
              <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">Savol-Javob</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-xs"
              title="Mavzuni almashtirish"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-medium transition-colors"
            >
              Katalogga kirish
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Ro'yxatdan o'tish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>O'zbekistondagi eng nufuzli amaliy ta'lim platformasi</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Haqiqiy loyihalar, <br className="hidden sm:inline" />
          <span className="text-blue-600 dark:text-blue-500">rasmiy sertifikatlar</span> va natija.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Top soha mutaxassislaridan tizimli darslar, AI kurator yordamida 24/7 uyga vazifalar tekshiruvi va ish beruvchilar tan oladigan xalqaro sertifikatlar.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>O'rganishni boshlash (OTP orqali)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Katalogdagi barcha kurslar</span>
          </button>
        </div>

        {/* Stats Metrics */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900/40">
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">15,000+</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Muvaffaqiyatli talabalar</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900/40">
            <div className="text-2xl font-black text-blue-600 font-mono">94%</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Bitiruvchilar qoniqishi</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900/40">
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">120+</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Tekshirilgan ustozlar</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900/40">
            <div className="text-2xl font-black text-emerald-600 font-mono">24/7</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">AI va Mentor qo'llab-quvvatlashi</div>
          </div>
        </div>
      </section>

      {/* Why EduPro Section */}
      <section id="features" className="py-16 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0C0D14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-blue-600 font-semibold tracking-wider uppercase">Tizimli yondashuv</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white mt-2">
              Nima uchun oddiy videolardan ko'ra EduPro samaraliroq?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Stop-dars & Anti-cheat tizimi</h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Har bir darsni to'liq ko'rib, amaliy vazifani topshirmaguningizcha keyingi bosqich ochilmaydi. Bu sizning chalg'imasdan natijaga erishishingizni kafolatlaydi.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-500">
                100% video ko'rish nazorati
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">24/7 AI Kurator & Kod tahlili</h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Vazifangizni yuklagan zahoti sun'iy intellekt xatolaringizni satrma-satr ko'rsatib, to'g'ri yechim yo'lini tushuntirib beradi.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-500">
                O'rtacha tekshirish vaqti: 45 soniya
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Xalqaro QR Sertifikat & Reyting</h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Kurs yakunida tekshiriladigan unikal QR kodli sertifikat olasiz. LinkedIn va rezyumega qo'shish uchun to'liq tayyor.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-500">
                Ish beruvchilar uchun ochiq verifikatsiya
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-blue-600 font-semibold tracking-wider uppercase">Tanlangan yo'nalishlar</span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white mt-1">
              Hozir eng talab yuqori bo'lgan kurslar
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-lg text-xs">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeCategory === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setActiveCategory('DEV')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeCategory === 'DEV'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
              }`}
            >
              Dasturlash
            </button>
            <button
              onClick={() => setActiveCategory('LANG')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeCategory === 'LANG'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
              }`}
            >
              Tillar
            </button>
            <button
              onClick={() => setActiveCategory('DESIGN')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeCategory === 'DESIGN'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
              }`}
            >
              Dizayn
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div 
              key={c.id}
              className="bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col justify-between p-5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-medium">
                    {c.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                    <span>★</span>
                    <span>{c.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Ustoz: {c.instructor}</span>
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                  <span>{c.duration}</span>
                  <span>{c.students} talaba</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Narxi</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                    {c.price}
                  </span>
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Ko'rish</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-blue-900/10 to-transparent border border-blue-500/20 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Karyerangizni yangi bosqichga olib chiqing
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl mx-auto">
            Telefon raqamingiz orqali 30 soniyada ro'yxatdan o'ting va bepul kirish darslarini darhol tomosha qiling.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/onboarding')}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Onboardingni boshlash</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-medium transition-colors"
            >
              To'g'ridan-to'g'ri LMS Sinfxonaga o'tish
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 py-8 text-center text-xs text-slate-500 dark:text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white font-mono">EDUPRO LMS</span>
            <span>— Zamonaviy ta'lim standarti.</span>
          </div>
          <div>
            © 2026 EduPro. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </div>
  );
};
