import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Phone, 
  Lock, 
  User, 
  Target, 
  Clock, 
  Bell, 
  Sparkles, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { requestOtp, verifyOtp, submitStudentOnboarding } from '../api/client';
import { useTheme } from '../context/ThemeContext';

export const StudentOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Step 1: Auth
  const [phoneNumber, setPhoneNumber] = useState<string>('+998901234567');
  const [fullName, setFullName] = useState<string>('Azizbek Karimov');
  const [otpCode, setOtpCode] = useState<string>('12345');
  const [otpSent, setOtpSent] = useState<boolean>(true);

  // Step 2: Learning Goal & Level
  const [learningGoal, setLearningGoal] = useState<string>('Fullstack Web Dasturlash');
  const [currentLevel, setCurrentLevel] = useState<string>('Boshlang\'ich (Zero)');

  // Step 3: Commitment
  const [dailyMinutes, setDailyMinutes] = useState<number>(45);
  const [telegramNotifications, setTelegramNotifications] = useState<boolean>(true);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setErrorMsg("Iltimos, telefon raqamingizni kiriting");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    try {
      await requestOtp(phoneNumber);
      setOtpSent(true);
    } catch (e: any) {
      // In demo mode still proceed
      setOtpSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!otpCode || otpCode.length < 4) {
        setErrorMsg("SMS kodni kiriting (Standart test kodi: 12345)");
        return;
      }
      setLoading(true);
      try {
        await verifyOtp(phoneNumber, otpCode, 'STUDENT', fullName);
        setStep(2);
      } catch (err: any) {
        // Fallback for offline/test
        setStep(2);
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setLoading(true);
      try {
        await submitStudentOnboarding({
          full_name: fullName,
          learning_goal: learningGoal,
          current_level: currentLevel,
          daily_study_minutes: dailyMinutes,
          telegram_notifications_enabled: telegramNotifications
        });
        navigate('/');
      } catch (err: any) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090E] text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors">
      {/* Navbar */}
      <header className="h-16 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#08090E]/80 backdrop-blur-md px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            EP
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-sm">
            EDUPRO <span className="text-xs font-mono text-blue-600">TALABA</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-zinc-400"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Sinfxonaga o'tish →
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm p-6 sm:p-8">
          
          {/* Step Progress Indicators */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className={`text-xs font-medium ${step >= 1 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                Telefon & Profil
              </span>
            </div>

            <div className="h-0.5 w-8 bg-slate-200 dark:bg-white/10" />

            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
              }`}>
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className={`text-xs font-medium ${step >= 2 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                Maqsad & Daraja
              </span>
            </div>

            <div className="h-0.5 w-8 bg-slate-200 dark:bg-white/10" />

            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
              }`}>
                3
              </div>
              <span className={`text-xs font-medium ${step >= 3 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                Reja & Eslatmalar
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Phone + OTP + Full Name */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  EduPro Talaba profilini yaratish
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Darslarni tomosha qilish va shaxsiy natijalarni saqlash uchun telefoningizni tasdiqlang.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1.5">
                  Ism va Familiyangiz
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masalan: Azizbek Karimov"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-1.5">
                  Telefon raqami
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0"
                  >
                    SMS Yuborish
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
                    SMS orqali kelgan kod
                  </label>
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                    Test kodi: 12345
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="12345"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono tracking-widest text-center font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Learning Goal & Current Level */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  O'rganish maqsadingiz va darajangiz
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Sizga mos kurslar va topshiriqlarni tavsiya qilishimiz uchun tanlang.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-2">
                  Asosiy o'rganmoqchi bo'lgan sohangiz:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Fullstack Web Dasturlash',
                    'Mobile Ilovalar (Flutter/iOS)',
                    'Ingliz Tili & IELTS 7+',
                    'UI/UX & Grafik Dizayn',
                    'Data Science & AI',
                    'Biznes & SMM Marketing'
                  ].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setLearningGoal(goal)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        learningGoal === goal
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/40 text-slate-700 dark:text-zinc-300 hover:border-slate-300'
                      }`}
                    >
                      <span>{goal}</span>
                      {learningGoal === goal && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-2">
                  Ushbu sohadagi hozirgi bilim darajangiz:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'Boshlang\'ich (Zero)',
                    'O\'rta (Tajriba bor)',
                    'Ilg\'or (Amaliyotchi)'
                  ].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCurrentLevel(lvl)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                        currentLevel === lvl
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/40 text-slate-700 dark:text-zinc-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Daily Commitment & Reminders */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  O'qish grafigi va eslatmalar
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Har kuni muntazam shug'ullanish natijaning 80%ini belgilaydi.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300 mb-2">
                  Kuniga qancha vaqt ajrata olasiz?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[15, 30, 45, 90].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDailyMinutes(mins)}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold font-mono transition-all ${
                        dailyMinutes === mins
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/40 text-slate-700 dark:text-zinc-300'
                      }`}
                    >
                      {mins} daqiqa
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/40 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="telegramNotif"
                  checked={telegramNotifications}
                  onChange={(e) => setTelegramNotifications(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="telegramNotif" className="text-xs text-slate-600 dark:text-zinc-300 cursor-pointer">
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Telegram orqali dars eslatmalari
                  </span>
                  Jonli efirlar boshlanishi va topshiriqlaringiz tekshirilganda bepul Telegram xabarnoma yuboriladi.
                </label>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Orqaga</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <span>{step === 3 ? "Tugatish & Sinfxonaga kirish" : "Davom etish"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
