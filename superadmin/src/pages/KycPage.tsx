import React, { useState } from 'react';
import { ShieldCheck, Eye, X } from 'lucide-react';
import { TeacherItem, formatUZS } from '../api/client';
import { TableSkeleton } from '../components/Skeletons';

interface KycPageProps {
  teachers: TeacherItem[];
  loading: boolean;
  searchQuery: string;
  onVerify: (id: string, isVerified: boolean) => Promise<void>;
}

export const KycPage: React.FC<KycPageProps> = ({ teachers, loading, searchQuery, onVerify }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const filteredTeachers = teachers.filter(t => 
    t.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.teacher_profile?.specialization || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Ustozlar KYC va Sertifikatlar Tekshiruvi</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">IELTS TRF rasmiy sertifikatlari va komissiya stavkalari boshqaruvi</p>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 font-medium">
                <tr>
                  <th className="px-5 py-3">Ustoz</th>
                  <th className="px-5 py-3">Mutaxassislik</th>
                  <th className="px-5 py-3">Sertifikat / TRF</th>
                  <th className="px-5 py-3">Komissiya</th>
                  <th className="px-5 py-3">Hisob Balansi</th>
                  <th className="px-5 py-3">Holat</th>
                  <th className="px-5 py-3 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face'} 
                          alt={t.full_name} 
                          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 object-cover"
                        />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white flex items-center gap-1.5">
                            {t.full_name}
                            {t.is_verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300">
                      {t.teacher_profile?.specialization || 'Instruktor'}
                    </td>
                    <td className="px-5 py-3.5">
                      {t.teacher_profile?.certificate_url ? (
                        <button 
                          onClick={() => setSelectedCertificate(t.teacher_profile!.certificate_url!)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 flex items-center gap-1 text-[11px] transition-colors"
                        >
                          <Eye className="w-3 h-3" /> Ko'rish (TRF)
                        </button>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-[11px]">Yuklanmagan</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-medium text-slate-900 dark:text-white">
                      {t.teacher_profile?.commission_rate || 10}%
                    </td>
                    <td className="px-5 py-3.5 font-mono">
                      <div className="text-slate-900 dark:text-white font-medium">{formatUZS(t.teacher_profile?.available_balance || 0)}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">Escrow: {formatUZS(t.teacher_profile?.escrow_balance || 0)}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      {t.is_verified ? (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                          Tasdiqlangan
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                          Kutilmoqda (KYC)
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {t.is_verified ? (
                        <button 
                          onClick={() => onVerify(t.id, false)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900/50 text-[11px] transition-colors"
                        >
                          Bekor qilish
                        </button>
                      ) : (
                        <button 
                          onClick={() => onVerify(t.id, true)}
                          className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-[11px] font-medium transition-colors shadow-sm"
                        >
                          Tasdiqlash
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ustoz Sertifikati Tekshiruvi</h3>
              <button 
                onClick={() => setSelectedCertificate(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
              <img 
                src={selectedCertificate} 
                alt="Teacher Certificate" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Rasmiy IELTS TRF (Test Report Form) yoki diplom nusxasi tekshirildi.
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setSelectedCertificate(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
