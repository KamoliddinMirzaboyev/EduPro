import React from 'react';
import { AlertTriangle, Send } from 'lucide-react';
import { CRMStudent } from '../api/client';
import { CRMSkeleton } from '../components/Skeletons';

interface CrmPageProps {
  students: CRMStudent[];
  loading: boolean;
  onSendTelegram: (studentId: string, studentName: string) => void;
}

export const CrmPage: React.FC<CrmPageProps> = ({ students, loading, onSendTelegram }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Talabalar CRM va Dars Davomati</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            To'xtab qolgan talabalarni aniqlash va 1-bosishda Telegram eslatma yuborish
          </p>
        </div>
      </div>

      {loading ? (
        <CRMSkeleton />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 text-slate-500 dark:text-zinc-400 font-medium">
                <tr>
                  <th className="px-5 py-3">Talaba</th>
                  <th className="px-5 py-3">Telefon</th>
                  <th className="px-5 py-3">Joriy Dars</th>
                  <th className="px-5 py-3">Video Ko'rish %</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {students.map((st) => (
                  <tr key={st.student_id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{st.student_name}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600 dark:text-zinc-400">{st.phone_number}</td>
                    <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 max-w-[220px] truncate">{st.current_lesson_title}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${st.is_stuck ? 'bg-amber-500' : 'bg-blue-600'}`} 
                            style={{ width: `${st.progress_percent}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-slate-600 dark:text-zinc-400">{st.progress_percent}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {st.is_stuck ? (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" /> Qotib qolgan (35%)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                          Faol o'qimoqda
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button 
                        onClick={() => onSendTelegram(st.student_id, st.student_name)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800/40 text-[11px] font-medium flex items-center gap-1 ml-auto transition-colors"
                      >
                        <Send className="w-3 h-3" /> Telegram Eslatma
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
