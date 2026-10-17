import React, { useState } from 'react';
import { CreditCard, X, Check } from 'lucide-react';
import { CourseDetail, formatUZS } from '../api/client';

interface CheckoutModalProps {
  course: CourseDetail | null;
  onClose: () => void;
  onConfirmCheckout: (courseId: string, tariffId?: string, paymentMethod?: string) => Promise<void>;
  isCheckingOut: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  course,
  onClose,
  onConfirmCheckout,
  isCheckingOut,
}) => {
  const [selectedTariffId, setSelectedTariffId] = useState<string | null>(null);
  const [paymentProvider, setPaymentProvider] = useState<'PAYME' | 'CLICK' | 'UZUM'>('PAYME');

  if (!course) return null;

  const tariffs = course.tariffs ?? [];

  const currentPrice = selectedTariffId 
    ? (tariffs.find(t => t.id === selectedTariffId)?.price_uzs || course.price)
    : course.price;

  const handlePay = () => {
    onConfirmCheckout(course.id, selectedTariffId || undefined, paymentProvider);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-lg w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Kursga Obuna Bo'lish & To'lov</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">{course.title}</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Tariffs Selection */}
        {tariffs.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 dark:text-white">O'quv Tarifini Tanlang:</label>
            <div className="grid grid-cols-2 gap-3">
              {tariffs.map(t => (
                <div 
                  key={t.id} 
                  onClick={() => setSelectedTariffId(t.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedTariffId === t.id 
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-900/20' 
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white">
                    <span>{t.title}</span>
                    {t.is_popular && (
                      <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded-md">
                        Hit
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {formatUZS(t.price_uzs)}
                  </div>
                  <ul className="text-[10px] text-slate-500 dark:text-zinc-400 mt-2 space-y-1">
                    {t.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Provider Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-900 dark:text-white">Xavfsiz To'lov Usuli (Escrow 100% Kafolat):</label>
          <div className="grid grid-cols-3 gap-3">
            {(['PAYME', 'CLICK', 'UZUM'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPaymentProvider(p)}
                className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                  paymentProvider === p 
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
          <div>
            <div className="text-[11px] text-slate-400">Jami to'lov:</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              {formatUZS(currentPrice)}
            </div>
          </div>
          <button 
            onClick={handlePay}
            disabled={isCheckingOut}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors disabled:opacity-50 shadow-md shadow-blue-500/20"
          >
            {isCheckingOut ? "Qayta ishlanmoqda..." : "Xaridni Tasdiqlash"}
          </button>
        </div>
      </div>
    </div>
  );
};
