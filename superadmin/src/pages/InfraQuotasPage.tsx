import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Zap, 
  Sliders, 
  AlertCircle, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Save, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { formatUZS } from '../api/client';

interface TeacherQuota {
  id: string;
  teacherName: string;
  avatar: string;
  coursesCount: number;
  storageUsedGb: number;
  storageLimitGb: number;
  bandwidthUsedGb: number;
  aiTokensUsed: number;
  aiTokensLimit: number;
  monthlyAiCostUsd: number;
  status: 'NORMAL' | 'WARNING' | 'EXCEEDED';
}

interface InfraQuotasPageProps {
  onShowToast: (msg: string) => void;
}

export const InfraQuotasPage: React.FC<InfraQuotasPageProps> = ({ onShowToast }) => {
  const [quotas, setQuotas] = useState<TeacherQuota[]>([
    {
      id: 't-1',
      teacherName: 'Sardor Daminov',
      avatar: 'SD',
      coursesCount: 2,
      storageUsedGb: 28.4,
      storageLimitGb: 50,
      bandwidthUsedGb: 480,
      aiTokensUsed: 1420000,
      aiTokensLimit: 3000000,
      monthlyAiCostUsd: 14.2,
      status: 'NORMAL'
    },
    {
      id: 't-2',
      teacherName: 'Ulug‘bek Samig‘jonov',
      avatar: 'US',
      coursesCount: 3,
      storageUsedGb: 46.8,
      storageLimitGb: 50,
      bandwidthUsedGb: 820,
      aiTokensUsed: 2890000,
      aiTokensLimit: 3000000,
      monthlyAiCostUsd: 28.9,
      status: 'WARNING'
    },
    {
      id: 't-3',
      teacherName: 'Aziza Rahimova',
      avatar: 'AR',
      coursesCount: 1,
      storageUsedGb: 8.2,
      storageLimitGb: 30,
      bandwidthUsedGb: 110,
      aiTokensUsed: 340000,
      aiTokensLimit: 2000000,
      monthlyAiCostUsd: 3.4,
      status: 'NORMAL'
    }
  ]);

  const [selectedTeacher, setSelectedTeacher] = useState<TeacherQuota | null>(null);
  const [newStorageLimit, setNewStorageLimit] = useState<number>(50);
  const [newTokensLimit, setNewTokensLimit] = useState<number>(3000000);

  const totalStorageGb = quotas.reduce((a, b) => a + b.storageUsedGb, 0);
  const totalBandwidthGb = quotas.reduce((a, b) => a + b.bandwidthUsedGb, 0);
  const totalAiCostUsd = quotas.reduce((a, b) => a + b.monthlyAiCostUsd, 0);

  const handleEditQuota = (teacher: TeacherQuota) => {
    setSelectedTeacher(teacher);
    setNewStorageLimit(teacher.storageLimitGb);
    setNewTokensLimit(teacher.aiTokensLimit);
  };

  const handleSaveQuota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) return;

    setQuotas(quotas.map(q => q.id === selectedTeacher.id ? {
      ...q,
      storageLimitGb: newStorageLimit,
      aiTokensLimit: newTokensLimit,
      status: q.storageUsedGb > newStorageLimit ? 'EXCEEDED' : 'NORMAL'
    } : q));

    setSelectedTeacher(null);
    onShowToast(`"${selectedTeacher.teacherName}" uchun yangi limitlar muvaffaqiyatli saqlandi!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-1">
            <Server className="w-3.5 h-3.5" /> Bunny.net CDN & OpenAI Cost Radar
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">AI va Server Xarajatlari (Infra & Quotas)</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Video hosting xotirasi, CDN oylik trafigi va AI auto-grader tokenlar nazorati
          </p>
        </div>

        <button
          onClick={() => onShowToast("Infratuzilma hisob-kitoblari yangilandi")}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors shadow-xs"
        >
          Hisobotni Yangilash
        </button>
      </div>

      {/* Global Infra Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>Jami Video Saqlash Xajmi</span>
            <HardDrive className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            {totalStorageGb.toFixed(1)} GB
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            Bunny.net Stream Storage ($0.01 / GB)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>Oylik CDN Video Trafik</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            {totalBandwidthGb} GB
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
            Global Edge Caching (O'zbekiston kesh punkti faol)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>AI Tokenlar Xarajati (Ushbu oy)</span>
            <Cpu className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            ${totalAiCostUsd.toFixed(2)} <span className="text-xs text-slate-400 font-sans font-normal">({formatUZS(totalAiCostUsd * 12800)})</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            OpenAI Whisper + GPT-4o tekshiruvlari
          </div>
        </div>
      </div>

      {/* Teachers Quotas Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            O'qituvchilarning Xotira va AI Limitlari
          </h3>
          <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
            Limit oshsa, avtomatik xabar beriladi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-zinc-400 font-semibold uppercase">
                <th className="py-2.5 px-3">Ustoz</th>
                <th className="py-2.5 px-3 text-center">Kurslar</th>
                <th className="py-2.5 px-3">Video Xotira (Ishlatilgan / Limit)</th>
                <th className="py-2.5 px-3">AI Tokenlar Quota</th>
                <th className="py-2.5 px-3 text-right">Oylik AI Xarajati</th>
                <th className="py-2.5 px-3 text-right">Limit Boshqaruvi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {quotas.map((q) => {
                const storagePercent = Math.round((q.storageUsedGb / q.storageLimitGb) * 100);
                const tokensPercent = Math.round((q.aiTokensUsed / q.aiTokensLimit) * 100);

                return (
                  <tr key={q.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5 font-sans">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                          {q.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white text-xs">{q.teacherName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">CDN: {q.bandwidthUsedGb} GB trafik</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">
                      {q.coursesCount}
                    </td>
                    <td className="py-3 px-3">
                      <div className="space-y-1 w-44">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-900 dark:text-white font-bold">{q.storageUsedGb} GB</span>
                          <span className="text-slate-400">/ {q.storageLimitGb} GB ({storagePercent}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${storagePercent > 90 ? 'bg-red-500' : storagePercent > 70 ? 'bg-amber-500' : 'bg-blue-600'}`}
                            style={{ width: `${storagePercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="space-y-1 w-44">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-900 dark:text-white font-bold">{(q.aiTokensUsed / 1000000).toFixed(2)}M</span>
                          <span className="text-slate-400">/ {(q.aiTokensLimit / 1000000).toFixed(0)}M token</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${tokensPercent > 90 ? 'bg-red-500' : 'bg-purple-600'}`}
                            style={{ width: `${tokensPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white text-xs">
                      ${q.monthlyAiCostUsd.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-sans">
                      <button
                        onClick={() => handleEditQuota(q)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 text-[11px] font-semibold flex items-center gap-1 ml-auto"
                      >
                        <Sliders className="w-3.5 h-3.5" /> Limitni O'zgartirish
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Edit Quota */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              "{selectedTeacher.teacherName}" uchun Resurs Limitlari
            </h3>
            <form onSubmit={handleSaveQuota} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">
                  Maksimal Video Xotira Limiti (GB)
                </label>
                <input
                  type="number"
                  value={newStorageLimit}
                  onChange={(e) => setNewStorageLimit(parseInt(e.target.value) || 50)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">
                  Oylik AI Tokenlar Limiti (OpenAI / Claude)
                </label>
                <input
                  type="number"
                  step="500000"
                  value={newTokensLimit}
                  onChange={(e) => setNewTokensLimit(parseInt(e.target.value) || 3000000)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono font-semibold"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-500/20 text-[11px] text-slate-600 dark:text-zinc-300">
                Ustoz ushbu limitlardan oshib ketsa, qo'shimcha resurslar pullik tarif rejasi orqali sotib olinadi.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
