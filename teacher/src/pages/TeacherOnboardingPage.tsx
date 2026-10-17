import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  ShieldCheck, 
  CreditCard, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileCheck2
} from 'lucide-react';
import { requestOtp, verifyOtp, submitTeacherOnboarding } from '../api/client';

export const TeacherOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1: Auth
  const [fullName, setFullName] = useState<string>('Jasur Tursunov');
  const [phone, setPhone] = useState<string>('+998 90 123 45 67');
  const [otpCode, setOtpCode] = useState<string>('12345');
  const [otpSent, setOtpSent] = useState<boolean>(false);

  // Step 2: Profile & Expertise
  const [specialization, setSpecialization] = useState<string>('IELTS 8.5+ Instructor');
  const [experienceYears, setExperienceYears] = useState<number>(5);
  const [publicHandle, setPublicHandle] = useState<string>('@jasur_ielts');
  const [bio, setBio] = useState<string>('7 yillik tajribaga ega xalqaro IELTS instruktori. 400 dan ortiq o‘quvchilarim 7.5+ natija qayd etgan.');

  // Step 3: KYC Certificate
  const [certificateType, setCertificateType] = useState<string>('IELTS TRF (8.0 - 9.0)');
  const [certificateNumber, setCertificateNumber] = useState<string>('24UZ001928ALIM001A');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>('IELTS_TRF_Official_Scan.pdf');

  // Step 4: Escrow Card
  const [cardNumber, setCardNumber] = useState<string>('8600 4902 1192 8841');
  const [cardHolder, setCardHolder] = useState<string>('JASUR TURSUNOV');

  const handleRequestOtp = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await requestOtp(phone);
      setOtpSent(true);
    } catch (e: any) {
      setErrorMessage("Kodni yuborishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndProceed = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await verifyOtp(phone, otpCode, 'TEACHER', fullName);
      setCurrentStep(2);
    } catch (e: any) {
      setErrorMessage(e.response?.data?.message || "Noto'g'ri OTP kod! Demo kod: 12345");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoQuickFill = () => {
    setFullName('Jasur Tursunov');
    setPhone('+998 90 123 45 67');
    setOtpCode('12345');
    setOtpSent(true);
  };

  const handleSubmitOnboarding = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await submitTeacherOnboarding({
        full_name: fullName,
        specialization,
        experience_years: experienceYears,
        bio,
        public_handle: publicHandle,
        certificate_type: certificateType,
        certificate_number: certificateNumber,
        certificate_url: 'https://edupro.uz/certificates/mock-trf.pdf',
        payout_card_number: cardNumber,
        payout_card_holder: cardHolder
      });
      // Redirect to studio dashboard with success
      navigate('/?kyc_pending=true');
    } catch (e: any) {
      setErrorMessage("Onboardingni saqlashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090E] text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans antialiased">
      {/* Top Bar */}
      <header className="h-16 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
            CS
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
            EDUPRO <span className="text-xs font-mono font-normal text-blue-600">Ustoz Onboarding</span>
          </span>
        </div>

        <button
          onClick={() => navigate('/welcome')}
          className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium"
        >
          Landing sahifaga qaytish
        </button>
      </header>

      {/* Main Wizard Form */}
      <main className="max-w-xl w-full mx-auto p-4 sm:p-6 my-auto space-y-6">
        {/* Step Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {currentStep === 1 && "1. Telefon & Autentifikatsiya"}
              {currentStep === 2 && "2. Akademiya & Ekspertiza"}
              {currentStep === 3 && "3. KYC & Sertifikat Verifikatsiyasi"}
              {currentStep === 4 && "4. Escrow Karta Sozlamasi"}
            </span>
            <span className="font-mono text-slate-400">
              Qadam {currentStep} / 4
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-600 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Phone & OTP */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Ustoz Kabinetiga Kirish
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Telefon raqamingiz orqali 5 soniyada tizimga kiring yoki demo akkauntni tanlang.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    To'liq Ism va Familiya
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="masalan: Jasur Tursunov"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Telefon Raqami
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                {otpSent && (
                  <div className="space-y-1 animate-in fade-in">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-semibold text-slate-700 dark:text-zinc-300">
                        SMS Tasdiqlash Kodi
                      </label>
                      <span className="font-mono text-emerald-600 text-[11px]">Demo kod: 12345</span>
                    </div>
                    <input
                      type="text"
                      maxLength={5}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="12345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 text-center text-sm text-slate-900 dark:text-white font-mono tracking-widest font-bold"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                {!otpSent ? (
                  <button
                    onClick={handleRequestOtp}
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    {loading ? "Yuborilmoqda..." : "SMS Kod Olish"}
                  </button>
                ) : (
                  <button
                    onClick={handleVerifyOtpAndProceed}
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    {loading ? "Tekshirilmoqda..." : "Tasdiqlash va Keyingi Bosqich"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleDemoQuickFill}
                  className="w-full py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5 text-[11px] font-semibold"
                >
                  ⚡ Demo Ustoz ma'lumotlarini to'ldirish
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Profile & Expertise */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Ekspertiza va Akademiya Profili
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Talabalar sizning ixtisosligingiz va yutuqlaringizni ko'radi.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Asosiy Mutaxassislik Yo'nalishi
                  </label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-medium"
                  >
                    <option value="IELTS 8.5+ Instructor">IELTS 8.5+ Instructor</option>
                    <option value="SAT & GMAT Math">SAT & GMAT Math</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Python & AI Engineering">Python & AI Engineering</option>
                    <option value="DTM / Milliy Sertifikat">DTM / Milliy Sertifikat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Dars O'tish Tajribasi (Yil)
                  </label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Ommaviy Havola (Public Handle)
                  </label>
                  <input
                    type="text"
                    value={publicHandle}
                    onChange={(e) => setPublicHandle(e.target.value)}
                    placeholder="@jasur_ielts"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Qisqacha Ustoz Haqida Bio
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Orqaga
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5"
                >
                  Keyingi Bosqich <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: KYC Verification */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" /> KYC & Sertifikat Verifikatsiyasi
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Platformada "Tasdiqlangan Ustoz" maqomini olish uchun rasmiy TRF yoki sertifikat ma'lumotlarini kiriting.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Sertifikat Turi
                  </label>
                  <select
                    value={certificateType}
                    onChange={(e) => setCertificateType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-medium"
                  >
                    <option value="IELTS TRF (8.0 - 9.0)">IELTS TRF (Band 8.0 - 9.0)</option>
                    <option value="CEFR C1 / C2">CEFR C1 / C2 Rasmiy Diplom</option>
                    <option value="Milliy Sertifikat A+">Milliy Sertifikat (A+)</option>
                    <option value="IT Senior / Github Portfolio">IT Senior / Production Portfolio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    TRF / Sertifikat Raqami
                  </label>
                  <input
                    type="text"
                    value={certificateNumber}
                    onChange={(e) => setCertificateNumber(e.target.value)}
                    placeholder="masalan: 24UZ001928ALIM001A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Hujjat Nusxasi (PDF yoki Rasm)
                  </label>
                  <div className="p-6 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl text-center space-y-2 hover:border-blue-500 transition-colors">
                    <UploadCloud className="w-8 h-8 text-blue-500 mx-auto" />
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {uploadedFileName ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> {uploadedFileName}
                        </span>
                      ) : (
                        "Faylni sudrab tashlang yoki tanlang"
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">
                      PDF, JPG, PNG (Maksimal 10 MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Orqaga
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5"
                >
                  Keyingi Bosqich <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Escrow Card & Completion */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-500" /> Escrow va Moliya Sozlamasi
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Kurs sotuvlaridan tushgan 90% sof mualliflik daromadi ushbu bank kartangizga yechib beriladi.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Uzcard / Humo Karta Raqami (16 xonali)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="8600 0000 0000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-mono font-bold tracking-wider"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Karta Egasi (Katta harflarda)
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    placeholder="JASUR TURSUNOV"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20 text-[11px] text-slate-600 dark:text-zinc-300 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block">
                    Superadmin KYC Tekshiruvi:
                  </span>
                  Arizangiz Superadmin (:3001) tekshiruv navbatiga tushadi. Tasdiqlangandan so'ng kurslaringiz Student Marketplace da faol ko'rinadi.
                </div>
              </div>

              <div className="pt-2 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Orqaga
                </button>
                <button
                  type="button"
                  onClick={handleSubmitOnboarding}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  {loading ? "Saqlanmoqda..." : "Arizani Yuborish va Studioga O'tish"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        EDUPRO Creator Studio • Xavfsiz Shifrlangan Aloqa (SSL/TLS)
      </footer>
    </div>
  );
};
