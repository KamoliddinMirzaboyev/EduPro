import React from 'react';
import { PayoutItem, formatUZS } from '../api/client';
import { TableSkeleton } from '../components/Skeletons';

interface PayoutsPageProps {
  payouts: PayoutItem[];
  loading: boolean;
  onModeratePayout: (id: string, status: 'PAID' | 'REJECTED') => Promise<void>;
}

export const PayoutsPage: React.FC<PayoutsPageProps> = ({ payouts, loading, onModeratePayout }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Escrow Hamyon va Pul Chiqarish So'rovlari</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ustozlarning Uzcard/Humo kartalariga to'lovlarni tasdiqlash va chiqarish</p>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={4} />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 font-medium">
                <tr>
                  <th className="px-5 py-3">Ustoz</th>
                  <th className="px-5 py-3">Summa</th>
                  <th className="px-5 py-3">Karta (Uzcard / Humo)</th>
                  <th className="px-5 py-3">Sana</th>
                  <th className="px-5 py-3">Holat</th>
                  <th className="px-5 py-3 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{p.teacher_name}</td>
                    <td className="px-5 py-3.5 font-mono font-bold text-slate-900 dark:text-white">{formatUZS(p.amount_uzs)}</td>
                    <td className="px-5 py-3.5">
                      <div className="font-mono text-slate-800 dark:text-slate-200">{p.card_number}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase">{p.card_holder}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 font-mono">
                      {new Date(p.created_at).toLocaleDateString('uz-UZ')}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium border ${
                        p.status === 'PAID' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40' 
                        : p.status === 'PENDING' 
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40' 
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {p.status === 'PENDING' && (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => onModeratePayout(p.id, 'REJECTED')}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-[11px] transition-colors"
                          >
                            Rad etish
                          </button>
                          <button 
                            onClick={() => onModeratePayout(p.id, 'PAID')}
                            className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-[11px] font-medium transition-colors shadow-sm"
                          >
                            O'tkazildi (Pay)
                          </button>
                        </div>
                      )}
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
