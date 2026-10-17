import React, { useState } from 'react';
import { 
  Scale, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  User, 
  BookOpen, 
  FileText, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { formatUZS } from '../api/client';

interface DisputeItem {
  id: string;
  studentName: string;
  studentEmail: string;
  teacherName: string;
  courseTitle: string;
  tariffName: string;
  amount: number;
  reason: string;
  watchPercentage: number;
  assignmentsSubmittedCount: number;
  createdAt: string;
  status: 'PENDING' | 'REFUNDED_TO_STUDENT' | 'RELEASED_TO_TEACHER';
}

interface DisputesPageProps {
  onShowToast: (msg: string) => void;
}

export const DisputesPage: React.FC<DisputesPageProps> = ({ onShowToast }) => {
  const [disputes, setDisputes] = useState<DisputeItem[]>([
    {
      id: 'disp-401',
      studentName: 'Bobur Shokirov',
      studentEmail: 'bobur.sh@gmail.com',
      teacherName: 'Ulug‘bek Samig‘jonov',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      tariffName: 'VIP Individual',
      amount: 1690000,
      reason: 'Ustoz bilan 1-on-1 kuratorlik darslari o‘tilmadi va chatda 4 kun davomida javob berilmadi. Kurs dasturi va’da qilinganidek to‘liq emas.',
      watchPercentage: 12, // Only watched 12%
      assignmentsSubmittedCount: 0,
      createdAt: 'Bugun, 11:20',
      status: 'PENDING'
    },
    {
      id: 'disp-402',
      studentName: 'Gulnoza Karimova',
      studentEmail: 'gulnoza.k@mail.uz',
      teacherName: 'Sardor Daminov',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      tariffName: 'Standart',
      amount: 390000,
      reason: 'Kursni yanglishib sotib oldim, aslida boshqa kurs kerak edi. Hali hech qaysi darsni ko‘rmadim.',
      watchPercentage: 2, // 2% watched
      assignmentsSubmittedCount: 0,
      createdAt: 'Kecha, 18:40',
      status: 'PENDING'
    },
    {
      id: 'disp-400',
      studentName: 'Doston Mirzayev',
      studentEmail: 'doston.m@gmail.com',
      teacherName: 'Sardor Daminov',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      tariffName: 'Pro Mentor',
      amount: 790000,
      reason: 'Kurs yoqmadi deb da’vo qildi, lekin kursning 95% darslarini ko‘rib, barcha materiallarni yuklab olgan.',
      watchPercentage: 95,
      assignmentsSubmittedCount: 8,
      createdAt: '14 Oktabr',
      status: 'RELEASED_TO_TEACHER'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'pending' | 'resolved'>('pending');

  const handleRefundToStudent = (dispId: string, studentName: string, amount: number) => {
    setDisputes(disputes.map(d => d.id === dispId ? { ...d, status: 'REFUNDED_TO_STUDENT' } : d));
    onShowToast(`Escrow hamyonidagi ${formatUZS(amount)} mablag' ${studentName} kartasiga qaytarildi (Refund muvaffaqiyatli).`);
  };

  const handleReleaseToTeacher = (dispId: string, teacherName: string, amount: number) => {
    setDisputes(disputes.map(d => d.id === dispId ? { ...d, status: 'RELEASED_TO_TEACHER' } : d));
    onShowToast(`Nizo ustoz foydasiga hal qilindi. ${formatUZS(amount)} mablag' ${teacherName} balansiga o'tkazildi.`);
  };

  const pendingDisputes = disputes.filter(d => d.status === 'PENDING');
  const resolvedDisputes = disputes.filter(d => d.status !== 'PENDING');
  const displayList = activeTab === 'pending' ? pendingDisputes : resolvedDisputes;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-1">
            <Scale className="w-3.5 h-3.5" /> Escrow Nizolar Arbitraji
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Shikoyatlar va Arbitraj (Disputes & Refunds)</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            O'quvchi va ustoz o'rtasidagi nizolarni ko'rish ko'rsatkichlari (Watch %) asosida adolatli hal qilish
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'pending'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            Kutilayotgan Nizolar ({pendingDisputes.length})
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'resolved'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            Hal Qilinganlar ({resolvedDisputes.length})
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Escrow Muzlatilgan Nizoli Mablag'</div>
          <div className="mt-2 text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
            {formatUZS(pendingDisputes.reduce((a, b) => a + b.amount, 0))}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            Qaror qabul qilinmaguncha xavfsiz holda
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">O'rtacha Nizoni Ko'rib Chiqish Vaqti</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            4.2 soat
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Standart me'yor: 24 soat ichida
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Adolatli Arbitraj Qoidasi</div>
          <div className="mt-2 text-base font-bold text-slate-900 dark:text-white">
            Watch &lt; 20% bo'lsa
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-zinc-400 leading-tight">
            Agar talaba kursning 20% dan kam qismini ko'rgan bo'lsa, to'liq pul qaytarish (100% Refund) kafolatlanadi.
          </div>
        </div>
      </div>

      {/* Disputes Cards List */}
      <div className="space-y-4">
        {displayList.map((disp) => (
          <div
            key={disp.id}
            className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] shadow-xs space-y-4"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10">
                  {disp.id}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {disp.studentName} <span className="text-slate-400 font-mono font-normal">({disp.studentEmail})</span>
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Murojaat vaqti: <span className="font-mono">{disp.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  Muzlatilgan summa: <strong className="text-blue-600 dark:text-blue-400">{formatUZS(disp.amount)}</strong>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  disp.status === 'PENDING'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                    : disp.status === 'REFUNDED_TO_STUDENT'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                    : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                }`}>
                  {disp.status === 'PENDING' ? 'Qaror Kutilmoqda' : disp.status === 'REFUNDED_TO_STUDENT' ? 'Talabaga Qaytarildi' : 'Ustozga O‘tkazildi'}
                </span>
              </div>
            </div>

            {/* Evidence & Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="md:col-span-2 space-y-2">
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold uppercase">
                  Talaba Shikoyati Sababi:
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-slate-800 dark:text-zinc-200 leading-relaxed italic">
                  "{disp.reason}"
                </div>

                <div className="pt-2 text-[11px] text-slate-500 dark:text-zinc-400">
                  Ustoz: <strong className="text-slate-800 dark:text-zinc-200">{disp.teacherName}</strong> • Kurs: <strong className="text-slate-800 dark:text-zinc-200">{disp.courseTitle}</strong> ({disp.tariffName})
                </div>
              </div>

              {/* Heartbeat Analytics Proof */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] space-y-3">
                <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Heartbeat Dlil & Analitika
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-mono">
                    <span className="text-slate-500 dark:text-zinc-400">Kursni ko'rganlik foizi:</span>
                    <strong className={disp.watchPercentage <= 20 ? 'text-emerald-600' : 'text-amber-600'}>
                      {disp.watchPercentage}%
                    </strong>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${disp.watchPercentage <= 20 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${disp.watchPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                  Topshirilgan vazifalar: <strong className="text-slate-900 dark:text-white">{disp.assignmentsSubmittedCount} ta</strong>
                </div>

                <div className="text-[10px] text-slate-500 dark:text-zinc-400 pt-1 border-t border-slate-200 dark:border-white/5">
                  {disp.watchPercentage <= 20 
                    ? "✓ Kurs 20% dan kam ko‘rilgan. Nizolarni hal qilish reglamenti bo‘yicha to‘liq qaytarishga loyiq."
                    : "⚠ Kurs 20% dan ortiq ko‘rilgan. Materiallar va darslar o‘zlashtirilgan."}
                </div>
              </div>
            </div>

            {/* Arbitration Buttons */}
            {disp.status === 'PENDING' && (
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleReleaseToTeacher(disp.id, disp.teacherName, disp.amount)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Ustoz Foydasiga Hal Qilish
                </button>
                <button
                  onClick={() => handleRefundToStudent(disp.id, disp.studentName, disp.amount)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Talabaga Pulni Qaytarish (Refund)
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
