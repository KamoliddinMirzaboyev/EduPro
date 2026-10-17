import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  Flame, 
  Download, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  Medal, 
  Share2, 
  ShieldCheck, 
  FileCheck,
  Star
} from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xpPoints: number;
  streakDays: number;
  completedLessons: number;
  isCurrentUser?: boolean;
}

interface CertificateItem {
  id: string;
  courseTitle: string;
  instructorName: string;
  completedDate: string;
  certificateHash: string;
  grade: string;
  isDownloadReady: boolean;
}

interface CertificatesLeaderboardPageProps {
  onShowToast: (msg: string) => void;
}

export const CertificatesLeaderboardPage: React.FC<CertificatesLeaderboardPageProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'certificates'>('leaderboard');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const leaderboard: LeaderboardUser[] = [
    { rank: 1, name: 'Sardorbek Rahimov', avatar: 'SR', xpPoints: 4850, streakDays: 24, completedLessons: 38 },
    { rank: 2, name: 'Madina Umarova', avatar: 'MU', xpPoints: 4620, streakDays: 19, completedLessons: 36 },
    { rank: 3, name: 'Siz (Kamron Mirzayev)', avatar: 'KM', xpPoints: 4410, streakDays: 14, completedLessons: 34, isCurrentUser: true },
    { rank: 4, name: 'Javohir Toshpo‘latov', avatar: 'JT', xpPoints: 4150, streakDays: 12, completedLessons: 31 },
    { rank: 5, name: 'Nodira Qodirova', avatar: 'NQ', xpPoints: 3980, streakDays: 8, completedLessons: 29 },
  ];

  const certificates: CertificateItem[] = [
    {
      id: 'cert-8812',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      instructorName: 'Ulug‘bek Samig‘jonov',
      completedDate: '12 Oktabr, 2026',
      certificateHash: 'EDU-2026-FSDN-99841-VERIFIED',
      grade: 'Distinction (A+)',
      isDownloadReady: true
    },
    {
      id: 'cert-8813',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      instructorName: 'Sardor Daminov',
      completedDate: 'Jarayonda (82% tugatildi)',
      certificateHash: 'PENDING_100_PERCENT',
      grade: 'Hozircha Band 7.0',
      isDownloadReady: false
    }
  ];

  const handleDownloadPDF = (cert: CertificateItem) => {
    onShowToast(`"${cert.courseTitle}" rasmiy PDF sertifikati yuklab olinmoqda...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 text-[11px] font-semibold mb-1">
            <Trophy className="w-3.5 h-3.5" /> Gamification & Rasmiy Diplomlar
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Reyting va Rasmiy Sertifikatlar</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Kursdoshlar reytingi, kunlik o'quv faolligi (Streak) va QR-kodli xalqaro verifikatsiyalangan sertifikatlar
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Kursdoshlar Reytingi
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'certificates'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Sertifikatlarim ({certificates.length})
          </button>
        </div>
      </div>

      {/* Gamification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>Sizning Joriy O'rningiz</span>
            <Medal className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            #3 <span className="text-xs font-sans text-emerald-500 font-semibold">Top 1%</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            4 410 XP ball to'plandi
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>O'quv Faolligi (Streak)</span>
            <Flame className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-red-600 dark:text-red-400">
            14 Kun
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            Biror kun ham dars qoldirmasdan
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>Tayyor Sertifikatlar</span>
            <Award className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
            1 ta
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Rasmiy QR-kod bilan tasdiqlangan
          </div>
        </div>
      </div>

      {/* Tab 1: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Haftalik Eng Faol Talabalar Peshqadamligi
            </h3>
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Har dushanba yangilanadi
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-zinc-400 font-semibold uppercase">
                  <th className="py-2.5 px-3 text-center">O'rin</th>
                  <th className="py-2.5 px-3">Talaba</th>
                  <th className="py-2.5 px-3 text-center">Streak</th>
                  <th className="py-2.5 px-3 text-center">Tugatilgan Darslar</th>
                  <th className="py-2.5 px-3 text-right">XP Ballar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
                {leaderboard.map((user) => (
                  <tr
                    key={user.rank}
                    className={`transition-colors ${
                      user.isCurrentUser
                        ? 'bg-blue-50/60 dark:bg-blue-950/30 font-bold'
                        : 'hover:bg-slate-50/60 dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        user.rank === 1
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                          : user.rank === 2
                          ? 'bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200'
                          : user.rank === 3
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300'
                          : 'text-slate-400'
                      }`}>
                        {user.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                          {user.avatar}
                        </div>
                        <span className={`text-xs ${user.isCurrentUser ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-900 dark:text-white font-medium'}`}>
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-red-500 font-semibold">
                        <Flame className="w-3.5 h-3.5 fill-red-500" /> {user.streakDays} kun
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-700 dark:text-slate-300">
                      {user.completedLessons} ta
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white text-xs">
                      {user.xpPoints.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Certificates List & Verification */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                      EDUPRO OFFICIAL VERIFIED
                    </span>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {cert.grade}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {cert.courseTitle}
                  </h3>

                  <div className="text-xs text-slate-500 dark:text-zinc-400 space-y-1">
                    <div>Ustoz: <strong className="text-slate-800 dark:text-zinc-200">{cert.instructorName}</strong></div>
                    <div>Tugatilgan sana: <strong className="text-slate-800 dark:text-zinc-200 font-mono">{cert.completedDate}</strong></div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">Hash: {cert.certificateHash}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <QrCode className="w-4 h-4 text-blue-500" /> QR Sertifikatni Ko'rish
                  </button>

                  {cert.isDownloadReady ? (
                    <button
                      onClick={() => handleDownloadPDF(cert)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-4 h-4" /> PDF Yuklab Olish
                    </button>
                  ) : (
                    <span className="text-[11px] text-amber-500 font-medium">
                      100% tugatilgach ochiladi
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Official Certificate Preview with QR Code */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0D0E16] rounded-3xl border border-slate-300 dark:border-white/20 max-w-xl w-full p-8 space-y-6 shadow-2xl relative text-center">
            {/* Certificate Header */}
            <div className="space-y-1">
              <div className="text-xs font-bold tracking-widest text-blue-600 uppercase font-mono">
                EDUPRO ACADEMY CERTIFICATE OF COMPLETION
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white pt-2">
                Muvaffaqiyat Sertifikati
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Ushbu rasmiy hujjat quyidagi tinglovchining kurs dasturini 100% muvaffaqiyatli tamomlaganligini tasdiqlaydi:
              </p>
            </div>

            {/* Recipient */}
            <div className="py-2 border-y border-slate-200 dark:border-white/10">
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                Kamron Mirzayev
              </div>
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                {selectedCert.courseTitle}
              </div>
            </div>

            {/* Certificate Meta & QR */}
            <div className="flex items-center justify-between text-left text-xs font-mono">
              <div className="space-y-1 text-slate-600 dark:text-zinc-400">
                <div>Ustoz: <strong className="text-slate-900 dark:text-white">{selectedCert.instructorName}</strong></div>
                <div>Daraja: <strong className="text-emerald-500">{selectedCert.grade}</strong></div>
                <div className="text-[10px] text-slate-400 truncate max-w-[260px]">
                  ID: {selectedCert.certificateHash}
                </div>
              </div>

              {/* QR Mock */}
              <div className="w-20 h-20 p-2 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-slate-900">
                <QrCode className="w-12 h-12" />
                <span className="text-[8px] font-sans font-bold mt-0.5">VERIFY QR</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Yopish
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onShowToast("Sertifikat havolasi LinkedIn / Portfolio uchun nusxalandi!")}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> Ulashish
                </button>
                <button
                  onClick={() => handleDownloadPDF(selectedCert)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" /> PDF Yuklab Olish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
