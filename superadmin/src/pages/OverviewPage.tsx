import React from 'react';
import { TrendingUp, Wallet, Users, CreditCard } from 'lucide-react';
import { PlatformStats, TransactionItem, formatUZS } from '../api/client';
import { CardSkeleton, TableSkeleton } from '../components/Skeletons';

interface OverviewPageProps {
  stats: PlatformStats | null;
  transactions: TransactionItem[];
  loading: boolean;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ stats, transactions, loading }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Platforma Moliyaviy va Texnik Ko'rsatkichlari</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real vaqt monitoringi, 10% sof komissiya va CDN oqimi</p>
        </div>
      </div>

      {/* 4 Metrics Cards with Shimmer Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Umumiy Savdo (GMV)</span>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
              {stats ? formatUZS(stats.gmv_total_uzs) : '0 UZS'}
            </div>
            <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
              <span>+{stats?.monthly_growth_rate || 24.6}%</span>
              <span className="text-slate-500 dark:text-slate-400">o'tgan oyga nisbatan</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Platforma Daromadi (10%)</span>
              <Wallet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mt-2 text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
              {stats ? formatUZS(stats.net_commission_uzs) : '0 UZS'}
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              10% kafolatlangan split komissiya
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Faol Talabalar</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
              {stats?.total_students || 0}
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              {stats?.total_enrollments || 0} ta o'quv obunasi
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Bunny.net CDN Sarfi</span>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
              {stats?.bandwidth_gb_used || 142.8} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">GB</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              4K Himoyalangan video oqimi
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table with Skeletons */}
      {loading ? (
        <TableSkeleton rows={4} />
      ) : (
        <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                So'nggi Tranzaksiyalar (Click / Payme / Uzum)
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Avtomatik split-to'lovlar va 10% platforma hisoboti</p>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{transactions.length} ta yozuv</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 font-medium">
                <tr>
                  <th className="px-5 py-3">Talaba</th>
                  <th className="px-5 py-3">Kurs</th>
                  <th className="px-5 py-3">Summa</th>
                  <th className="px-5 py-3">Platforma (10%)</th>
                  <th className="px-5 py-3">Ustoz Ulushi (90%)</th>
                  <th className="px-5 py-3">To'lov Turi</th>
                  <th className="px-5 py-3">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">{tx.student_name}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">{tx.course_title}</td>
                    <td className="px-5 py-3.5 font-mono font-medium text-slate-900 dark:text-white">{formatUZS(tx.amount_uzs)}</td>
                    <td className="px-5 py-3.5 font-mono text-blue-600 dark:text-blue-400 font-medium">+{formatUZS(tx.platform_fee_uzs)}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600 dark:text-slate-300">{formatUZS(tx.teacher_share_uzs)}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300">
                        {tx.payment_method}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                        {tx.status}
                      </span>
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
