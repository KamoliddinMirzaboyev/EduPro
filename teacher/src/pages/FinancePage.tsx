import React, { useState } from 'react';
import { Wallet, Tag, Layers, ArrowUpRight, CheckCircle2, Plus, Clock, CreditCard } from 'lucide-react';
import { formatUZS } from '../api/client';

interface FinancePageProps {
  onShowToast: (msg: string) => void;
  onRequestPayout: (amount: number, card: string) => Promise<void>;
}

interface TariffItem {
  id: string;
  name: string;
  price: number;
  features: string[];
  studentsCount: number;
  isPopular?: boolean;
}

interface TransactionItem {
  id: string;
  studentName: string;
  studentAvatar: string;
  courseTitle: string;
  tariffName: string;
  paymentMethod: 'PAYME' | 'CLICK' | 'UZUM';
  grossAmount: number;
  netProfit: number;
  status: 'COMPLETED' | 'ESCROW_HOLD';
  date: string;
}

export const FinancePage: React.FC<FinancePageProps> = ({ onShowToast, onRequestPayout }) => {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showTariffModal, setShowTariffModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(5000000);
  const [payoutCard, setPayoutCard] = useState<string>('8600 4902 1192 8841');

  // Tariffs constructor state
  const [tariffs, setTariffs] = useState<TariffItem[]>([
    {
      id: 't-1',
      name: 'Standart (Self-Study)',
      price: 390000,
      features: ['Barcha video darslarga 6 oy ruxsat', 'Test va avto-tekshiruv tizimi', 'Dars fayllari va materiallar'],
      studentsCount: 142,
    },
    {
      id: 't-2',
      name: 'Pro Mentor (AI + Kurator)',
      price: 790000,
      features: ['Standart barcha imkoniyatlari', 'Uyga vazifalar kurator tekshiruvi', 'AI Writing & Speaking tahlili', 'Haftalik jonli Q&A sessiyalar'],
      studentsCount: 94,
      isPopular: true
    },
    {
      id: 't-3',
      name: 'VIP Individual',
      price: 1690000,
      features: ['Shaxsiy 1-on-1 kurator tayinlash', 'Telegram yopiq guruhga kirish', 'Mock Exam va rasmiy sertifikat', 'Kafolatlangan natija (7.5+)'],
      studentsCount: 28,
    }
  ]);

  const [newTariffName, setNewTariffName] = useState('');
  const [newTariffPrice, setNewTariffPrice] = useState(490000);
  const [newTariffFeatures, setNewTariffFeatures] = useState('Darslarga doimiy ruxsat, Shaxsiy kurator yordami');

  // Transactions list
  const [transactions] = useState<TransactionItem[]>([
    {
      id: 'TXN-9841',
      studentName: 'Sardorbek Rahimov',
      studentAvatar: 'SR',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      tariffName: 'Pro Mentor',
      paymentMethod: 'PAYME',
      grossAmount: 790000,
      netProfit: 711000,
      status: 'COMPLETED',
      date: 'Bugun, 15:42'
    },
    {
      id: 'TXN-9840',
      studentName: 'Madina Umarova',
      studentAvatar: 'MU',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      tariffName: 'Standart',
      paymentMethod: 'CLICK',
      grossAmount: 390000,
      netProfit: 351000,
      status: 'COMPLETED',
      date: 'Bugun, 14:18'
    },
    {
      id: 'TXN-9839',
      studentName: 'Javohir Toshpo‘latov',
      studentAvatar: 'JT',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      tariffName: 'VIP Individual',
      paymentMethod: 'UZUM',
      grossAmount: 1690000,
      netProfit: 1521000,
      status: 'ESCROW_HOLD',
      date: 'Kecha, 21:05'
    },
    {
      id: 'TXN-9838',
      studentName: 'Nodira Qodirova',
      studentAvatar: 'NQ',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      tariffName: 'Pro Mentor',
      paymentMethod: 'PAYME',
      grossAmount: 790000,
      netProfit: 711000,
      status: 'COMPLETED',
      date: '15 Okt, 18:30'
    },
    {
      id: 'TXN-9837',
      studentName: 'Farrux Aliyev',
      studentAvatar: 'FA',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      tariffName: 'Standart',
      paymentMethod: 'CLICK',
      grossAmount: 390000,
      netProfit: 351000,
      status: 'COMPLETED',
      date: '15 Okt, 11:15'
    }
  ]);

  const handleCreatePayout = async () => {
    if (!payoutAmount || payoutAmount <= 0) return;
    await onRequestPayout(payoutAmount, payoutCard);
    setShowPayoutModal(false);
  };

  const handleAddTariff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTariffName.trim()) return;

    const newTariff: TariffItem = {
      id: `t-${Date.now()}`,
      name: newTariffName,
      price: newTariffPrice,
      features: newTariffFeatures.split(',').map(f => f.trim()).filter(Boolean),
      studentsCount: 0
    };

    setTariffs([...tariffs, newTariff]);
    setNewTariffName('');
    setShowTariffModal(false);
    onShowToast(`Yangi "${newTariff.name}" tarifi muvaffaqiyatli saqlandi!`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Moliya va Pul Yechib Olish</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Real vaqt daromadlari, Escrow xavfsizligi va Uzcard/Humo to'lovlari</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowTariffModal(true)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Yangi Tarif
          </button>
          <button 
            onClick={() => setShowPayoutModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Wallet className="w-4 h-4" /> Pul Yechib Olish
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Mavjud Balans (Yechib olish mumkin)</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            {formatUZS(12450000)}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 90% sof mualliflik ulushi
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Escrow Hamyonda (Muzlatilgan)</div>
          <div className="mt-2 text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
            {formatUZS(2800000)}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" /> Karta yechib olish so'rovida
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Platforma Komissiyasi</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            10.00%
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            Superadmin tomonidan belgilangan
          </div>
        </div>
      </div>

      {/* Kurs Tariflari Konstruktori */}
      <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Kurs Tariflari Konstruktori</h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">Har bir kursingiz uchun bosqichma-bosqich paketlar va narxlar tizimi</p>
            </div>
          </div>
          <button 
            onClick={() => setShowTariffModal(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tarif Qo'shish
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tariffs.map((t) => (
            <div 
              key={t.id}
              className={`p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                t.isPopular 
                  ? 'border-blue-500/50 bg-blue-50/20 dark:bg-blue-950/20 shadow-xs' 
                  : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]'
              }`}
            >
              {t.isPopular && (
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-semibold tracking-wide uppercase">
                  Eng ommabop
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                    {t.studentsCount} ta talaba
                  </span>
                </div>
                <div className="mt-2 text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                  {formatUZS(t.price)}
                </div>
                <ul className="mt-3 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  {t.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Faol paket</span>
                <button 
                  onClick={() => onShowToast(`"${t.name}" tarifi tahrirlash rejimida!`)}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Tahrirlash
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* So'nggi Tranzaksiyalar Tarixi */}
      <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">So'nggi Tranzaksiyalar Tarixi</h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">To'lovlar, Click/Payme integratsiyasi va sof daromadlar jurnali</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
            Jami: {transactions.length} ta operatsiya
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-zinc-400 font-semibold uppercase">
                <th className="py-2.5 px-3">O'quvchi</th>
                <th className="py-2.5 px-3">Kurs & Tarif</th>
                <th className="py-2.5 px-3">To'lov Tizimi</th>
                <th className="py-2.5 px-3">Sana & Vaqt</th>
                <th className="py-2.5 px-3 text-right">Umumiy Summa</th>
                <th className="py-2.5 px-3 text-right">Sof Foyda (90%)</th>
                <th className="py-2.5 px-3 text-center">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5 font-sans">
                      <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                        {txn.studentAvatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white text-xs">{txn.studentName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{txn.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <div className="text-slate-800 dark:text-slate-200 text-xs font-medium line-clamp-1">{txn.courseTitle}</div>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{txn.tariffName}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider ${
                      txn.paymentMethod === 'PAYME' 
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/40'
                        : txn.paymentMethod === 'CLICK'
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                        : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40'
                    }`}>
                      {txn.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-zinc-400 font-sans">
                    {txn.date}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-900 dark:text-white font-bold text-xs">
                    {formatUZS(txn.grossAmount)}
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    +{formatUZS(txn.netProfit)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium font-sans ${
                      txn.status === 'COMPLETED'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                    }`}>
                      {txn.status === 'COMPLETED' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Muvaffaqiyatli
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" /> Escrowda
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promo-Codes */}
      <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Faol Promo-kodlar</h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">Talabalar uchun maxsus chegirmalar yaratish</p>
          </div>
          <button 
            onClick={() => onShowToast("Yangi 'EDUPRO20' promo-kodi faollashtirildi!")}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Tag className="w-3.5 h-3.5" /> + Yangi Promo-kod
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between">
            <div>
              <div className="font-mono font-bold text-slate-900 dark:text-white">IELTS9NOW</div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">15% chegirma barcha tariflarga</div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300">
              42 marta ishlatilgan
            </span>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between">
            <div>
              <div className="font-mono font-bold text-slate-900 dark:text-white">SPRING2026</div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">100 000 UZS qat'iy chegirma</div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300">
              18 marta ishlatilgan
            </span>
          </div>
        </div>
      </div>

      {/* Modal: Tariff Constructor */}
      {showTariffModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Yangi Kurs Tarifi Yaratish</h3>
            <form onSubmit={handleAddTariff} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Tarif Nomi</label>
                <input 
                  type="text"
                  required
                  placeholder="masalan: VIP Mentorlik"
                  value={newTariffName}
                  onChange={(e) => setNewTariffName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Narxi (UZS)</label>
                <input 
                  type="number"
                  required
                  value={newTariffPrice}
                  onChange={(e) => setNewTariffPrice(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-mono font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Imkoniyatlar (vergul bilan ajrating)</label>
                <textarea 
                  rows={3}
                  value={newTariffFeatures}
                  onChange={(e) => setNewTariffFeatures(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowTariffModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                >
                  Tarifni Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Payout Request */}
      {showPayoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Uzcard / Humo ga Pul Yechib Olish</h3>
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Summa (UZS)</label>
              <input 
                type="number"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-mono font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Karta Raqami (8600... yoki 9860...)</label>
              <input 
                type="text"
                value={payoutCard}
                onChange={(e) => setPayoutCard(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Pul Superadmin tasdig'idan so'ng 1-2 soat ichida to'liq kartangizga tushadi.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowPayoutModal(false)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Bekor qilish
              </button>
              <button 
                onClick={handleCreatePayout}
                className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                Yechib Olish So'rovi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
