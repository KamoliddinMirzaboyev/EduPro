import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star, 
  Mail, 
  Phone, 
  MoreVertical, 
  Lock, 
  EyeOff,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CuratorItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  assignedCourse: string;
  role: 'LEAD_CURATOR' | 'ASSISTANT_CURATOR';
  tasksCheckedCount: number;
  avgResponseTimeHours: number;
  rating: number;
  status: 'ACTIVE' | 'INVITED';
  joinedDate: string;
}

interface TeamCuratorsPageProps {
  onShowToast: (msg: string) => void;
}

export const TeamCuratorsPage: React.FC<TeamCuratorsPageProps> = ({ onShowToast }) => {
  const [curators, setCurators] = useState<CuratorItem[]>([
    {
      id: 'cur-1',
      fullName: 'Shahzodbek Karimov',
      email: 'shahzod.ielts@edupro.uz',
      phone: '+998 90 123 45 67',
      assignedCourse: 'IELTS Band 8.0: Intensive Writing & Speaking',
      role: 'LEAD_CURATOR',
      tasksCheckedCount: 342,
      avgResponseTimeHours: 1.8,
      rating: 4.9,
      status: 'ACTIVE',
      joinedDate: '12 Yanvar, 2026'
    },
    {
      id: 'cur-2',
      fullName: 'Dildora Alimova',
      email: 'dildora.curator@gmail.com',
      phone: '+998 97 888 22 11',
      assignedCourse: 'IELTS Band 8.0: Intensive Writing & Speaking',
      role: 'ASSISTANT_CURATOR',
      tasksCheckedCount: 189,
      avgResponseTimeHours: 2.4,
      rating: 4.8,
      status: 'ACTIVE',
      joinedDate: '01 Fevral, 2026'
    },
    {
      id: 'cur-3',
      fullName: 'Bekzod Fayzullayev',
      email: 'bekzod.ninja@dev.uz',
      phone: '+998 93 555 77 99',
      assignedCourse: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      role: 'ASSISTANT_CURATOR',
      tasksCheckedCount: 94,
      avgResponseTimeHours: 3.1,
      rating: 4.7,
      status: 'ACTIVE',
      joinedDate: '20 Mart, 2026'
    }
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePhone, setInvitePhone] = useState('+998 ');
  const [assignedCourse, setAssignedCourse] = useState('IELTS Band 8.0: Intensive Writing & Speaking');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    const newCurator: CuratorItem = {
      id: `cur-${Date.now()}`,
      fullName: inviteName,
      email: inviteEmail,
      phone: invitePhone,
      assignedCourse,
      role: 'ASSISTANT_CURATOR',
      tasksCheckedCount: 0,
      avgResponseTimeHours: 0,
      rating: 5.0,
      status: 'ACTIVE',
      joinedDate: 'Bugun'
    };

    setCurators([...curators, newCurator]);
    setShowInviteModal(false);
    setInviteName('');
    setInviteEmail('');
    onShowToast(`"${inviteName}" kurator sifatida muvaffaqiyatli taklif qilindi!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Jamoa va Kuratorlar Boshqaruvi</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Yordamchi ustozlar, vazifalar tekshiruvi KPI va cheklangan ruxsatlar (Moliya yashirilgan)
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <UserPlus className="w-4 h-4" /> Yangi Kurator Taklif Qilish
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Jami Yordamchilar</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            {curators.length} nafar
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Barchasi faol va tekshirmoqda
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Tekshirilgan Vazifalar</div>
          <div className="mt-2 text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
            {curators.reduce((a, b) => a + b.tasksCheckedCount, 0)} ta
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            Ushbu oy davomida
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">O'rtacha Javob Vaqti (SLA)</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            2.1 soat
          </div>
          <div className="mt-2 text-[11px] text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Standart me'yor: 24 soat
          </div>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-zinc-300">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <EyeOff className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Moliya va Balans Himoyasi:</span> Kuratorlar kabinetida Daromad, Balans va Tariflar ko'rsatilmaydi. Ular faqat o'quvchilar topshiriqlarini tekshirish va izoh qoldirish huquqiga ega.
          </div>
        </div>
      </div>

      {/* Curators Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Faol Kuratorlar va KPI Ko'rsatkichlari
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-zinc-400 font-semibold uppercase">
                <th className="py-2.5 px-3">Kurator</th>
                <th className="py-2.5 px-3">Biriktirilgan Kurs</th>
                <th className="py-2.5 px-3 text-center">Tekshirilgan</th>
                <th className="py-2.5 px-3 text-center">O'rtacha Javob</th>
                <th className="py-2.5 px-3 text-center">Reyting</th>
                <th className="py-2.5 px-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {curators.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5 font-sans">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                        {c.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white text-xs">{c.fullName}</div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                          <span>{c.email}</span>
                          <span>•</span>
                          <span>{c.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <span className="text-slate-800 dark:text-slate-200 text-xs font-medium line-clamp-1">
                      {c.assignedCourse}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                      {c.role === 'LEAD_CURATOR' ? 'Bosh Kurator' : 'Yordamchi'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">
                    {c.tasksCheckedCount} ta
                  </td>
                  <td className="py-3 px-3 text-center text-slate-700 dark:text-slate-300">
                    {c.avgResponseTimeHours} soat
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {c.rating}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    <button
                      onClick={() => onShowToast(`"${c.fullName}" ruxsatlari tahrirlanmoqda`)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-blue-500 text-[11px] font-semibold"
                    >
                      Ruxsatlar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Invite Curator */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Yangi Kurator Taklif Qilish</h3>
            <form onSubmit={handleInviteSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">F.I.SH</label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Dildora Alimova"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Email manzili</label>
                <input
                  type="email"
                  required
                  placeholder="kurator@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Telefon raqami</label>
                <input
                  type="text"
                  value={invitePhone}
                  onChange={(e) => setInvitePhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Biriktiriladigan Kurs</label>
                <select
                  value={assignedCourse}
                  onChange={(e) => setAssignedCourse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                >
                  <option value="IELTS Band 8.0: Intensive Writing & Speaking">IELTS Band 8.0: Intensive Writing & Speaking</option>
                  <option value="Full-Stack Next.js 15 & Django Ninja Masterclass">Full-Stack Next.js 15 & Django Ninja Masterclass</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Taklifnoma Yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
