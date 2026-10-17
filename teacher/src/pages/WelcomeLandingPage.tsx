import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Users, 
  Zap, 
  Lock, 
  HelpCircle, 
  Bot, 
  Radio, 
  ChevronRight,
  TrendingUp,
  FileCheck2,
  XCircle
} from 'lucide-react';
import { formatUZS } from '../api/client';

export const WelcomeLandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Calculator State
  const [studentsCount, setStudentsCount] = useState<number>(80);
  const [coursePrice, setCoursePrice] = useState<number>(450000);

  // Computed Real-time Metrics
  const grossMonthly = studentsCount * coursePrice;
  const netMonthly = Math.round(grossMonthly * 0.90);
  const savedHoursMonthly = Math.round(studentsCount * 0.6);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090E] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-[#0F111A]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
            CS
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">EDUPRO</span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
              Creator Studio
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-zinc-400">
          <a href="#problem-solution" className="hover:text-blue-600 dark:hover:text-white transition-colors">Muammo & Yechim</a>
          <a href="#calculator" className="hover:text-blue-600 dark:hover:text-white transition-colors">Daromad Kalkulyatori</a>
          <a href="#comparison" className="hover:text-blue-600 dark:hover:text-white transition-colors">Telegram vs EDUPRO</a>
          <a href="#pricing" className="hover:text-blue-600 dark:hover:text-white transition-colors">Tariflar</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/onboarding')}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Tizimga Kirish
          </button>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-sm flex items-center gap-1.5"
          >
            Ustoz sifatida boshlash <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> O'zbekistonning Top Ustozlari Uchun Maxsus Platforma
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Yopiq Telegram kanallardagi tartibsizlikni to'xtating.{' '}
          <span className="text-blue-600 dark:text-blue-400">Shaxsiy onlayn akademiyangizni 10 daqiqada ishga tushiring.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Avtomatlashtirilgan Click/Payme to'lovlari, o'g'irlanmaydigan Dinamik Suv Belgili (DRM) videolar va sun'iy intellekt (AI Auto-Grader) orqali insho hamda speakingni 10 soniyada tekshirish tizimi.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            Hoziroq Bepul Boshlash <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors"
          >
            Demo Studioni Ko'zdan Kechirish
          </button>
        </div>

        {/* Live Mini Mockup Banner */}
        <div className="pt-10 max-w-4xl mx-auto">
          <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xl text-left grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <span className="text-[11px] text-slate-400 font-sans block">Escrow Hamyon (Sof Tushum)</span>
              <strong className="text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400 block mt-1">
                {formatUZS(36400000)}
              </strong>
              <span className="text-[10px] text-slate-400 font-sans mt-1 block">Uzcard/Humo ga 1-click yechish</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <span className="text-[11px] text-slate-400 font-sans block">AI Grader Tekshirgan Insholar</span>
              <strong className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 block mt-1">
                842 ta
              </strong>
              <span className="text-[10px] text-emerald-500 font-sans mt-1 block">O'rtacha javob: 5.2 soniya</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
              <span className="text-[11px] text-slate-400 font-sans block">Anti-Piracy & Suv Belgisi</span>
              <strong className="text-xl sm:text-2xl text-slate-900 dark:text-white block mt-1">
                100% Faol
              </strong>
              <span className="text-[10px] text-blue-500 font-sans mt-1 block">Ekran yozib olish bloklangan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Creator Revenue & Time Calculator */}
      <section id="calculator" className="py-16 bg-white dark:bg-[#0B0D14] border-y border-slate-200 dark:border-white/10 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Interaktiv Kalkulyator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Sizning Oylik Daromadingiz va Tejaladigan Vaqtingiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Kurslaringiz narxi va o'quvchilaringiz sonini kiriting — tizim 90% sof foyda va tejaladigan soatlarni hisoblab beradi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Sliders Input */}
            <div className="space-y-6 p-6 rounded-2xl bg-slate-50 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-900 dark:text-white">
                    Faol O'quvchilar Soni:
                  </label>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                    {studentsCount} nafar
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={studentsCount}
                  onChange={(e) => setStudentsCount(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>10 ta</span>
                  <span>250 ta</span>
                  <span>500+ ta</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-900 dark:text-white">
                    Kursning O'rtacha Narxi:
                  </label>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                    {formatUZS(coursePrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="2000000"
                  step="50000"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>200 000 UZS</span>
                  <span>1 000 000 UZS</span>
                  <span>2 000 000 UZS</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                  Oylik Sof Daromad (90% Ulush)
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatUZS(netMonthly)}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 pt-1 font-sans">
                  Click, Payme va Uzum to'lovlari to'g'ridan-to'g'ri bank kartangizga yechib olinadi.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/20 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> AI Auto-Grader Tejaydigan Vaqt
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-extrabold text-blue-600 dark:text-blue-400">
                  {savedHoursMonthly} soat / oy
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 pt-1 font-sans">
                  Cheklarni solishtirish va insholarni qo'lda qatorlab tekshirish o'rniga yangi darslar yozishga sarflang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section id="comparison" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Taqqoslash</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Nega Top Ustozlar Telegram Kanalidan EDUPRO ga O'tmoqda?
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-[11px] font-bold uppercase text-slate-400 bg-slate-50/60 dark:bg-white/[0.02]">
                <th className="py-3 px-4">Funksiya</th>
                <th className="py-3 px-4 text-red-500">Telegram Yopiq Kanal</th>
                <th className="py-3 px-4 text-blue-600 dark:text-blue-400">EDUPRO Creator Studio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Video O'g'irlash (Piracy)</td>
                <td className="py-3.5 px-4 text-red-600 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 shrink-0" /> Ekran videosi olinadi, havolalar tarqaladi
                </td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-500" /> Dinamik suv belgisi + DRM shifrlash
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">To'lov Tekshiruvi</td>
                <td className="py-3.5 px-4 text-slate-500">
                  Kuniga 50 ta chekni qo'lda solishtirish va kanaldan chiqarib yuborish azobi
                </td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-500" /> Click/Payme avtomat, 1-soniyada darsga ruxsat
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Vazifalar & Insho Tekshiruvi</td>
                <td className="py-3.5 px-4 text-slate-500">
                  Telegram lichkada yo'qolib ketadi, tekshirishga 2-3 kun ketadi
                </td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-500" /> AI Auto-Grader 10 soniyada xatolarni chiqaradi
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Dars Davomati (Attendance)</td>
                <td className="py-3.5 px-4 text-slate-500">
                  Kim darsni ko'rdi yoki ko'rmadi, mutlaqo noma'lum
                </td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-500" /> Retention graph, qotgan talabalarga avto-eslatma
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Transparent Tariff Plans */}
      <section id="pricing" className="py-16 bg-white dark:bg-[#0B0D14] border-t border-slate-200 dark:border-white/10 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Tariflar</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Shaffof va Xatarlarsiz Hamkorlik
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Hech qanday yashirin to'lovlarsiz. Faqat sotuv bo'lganda platforma o'z ulushini oladi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Creator */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Yangi Boshlovchilar Uchun</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Start Creator</h3>
                <div className="mt-3 text-3xl font-mono font-bold text-slate-900 dark:text-white">
                  0 UZS <span className="text-xs text-slate-400 font-sans font-normal">/ oy</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2">
                  Kurs sotilganda 10% platforma komissiyasi. Boshlang'ich xarajat yo'q.
                </p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700 dark:text-zinc-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Click / Payme / Uzum to'lovlari</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dinamik Suv Belgili Video DRM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Auto-Grader tekshiruvlari</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1-Click Uzcard/Humo yechib olish</li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/onboarding')}
                className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/5 text-slate-900 dark:text-white font-bold text-xs transition-colors"
              >
                Start Bilan Boshlash
              </button>
            </div>

            {/* Pro Academy */}
            <div className="p-6 rounded-2xl bg-blue-50/20 dark:bg-blue-950/20 border-2 border-blue-600 shadow-md flex flex-col justify-between space-y-6 relative">
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Tavsiya Qilinadi
              </span>

              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Katta Kurslar Uchun</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Pro Academy</h3>
                <div className="mt-3 text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">
                  490 000 UZS <span className="text-xs text-slate-400 font-sans font-normal">/ oy</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-2">
                  Atigi 5% platforma komissiyasi. 3 tagacha yordamchi kurator jalb qilish.
                </p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700 dark:text-zinc-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> 5% imtiyozli platforma ulushi</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> 3 tagacha yordamchi kurator kabineti</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Cheksiz WebRTC Jonli Efirlar</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Maxsus Telegram Bot Voronkasi</li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/onboarding')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                Pro Bo'lib Boshlash
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-white/10 px-4 text-center text-xs text-slate-400">
        © 2026 EDUPRO Technologies. O'zbekistonning ta'lim yaratuvchilari uchun ishlab chiqilgan.
      </footer>
    </div>
  );
};
