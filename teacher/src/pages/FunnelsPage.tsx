import React, { useState } from 'react';
import { 
  Share2, 
  Send, 
  ShoppingCart, 
  Percent, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  BellRing,
  Bot
} from 'lucide-react';
import { formatUZS } from '../api/client';

interface AbandonedCartItem {
  id: string;
  studentName: string;
  telegramUsername: string;
  phone: string;
  courseTitle: string;
  tariffName: string;
  cartPrice: number;
  timeAgo: string;
  discountSent: boolean;
}

interface FunnelsPageProps {
  onShowToast: (msg: string) => void;
}

export const FunnelsPage: React.FC<FunnelsPageProps> = ({ onShowToast }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const landingUrl = 'https://edupro.uz/courses/ielts-band-8-intensive';
  const telegramBotUsername = '@EduProIELTS_bot';

  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCartItem[]>([
    {
      id: 'cart-1',
      studentName: 'Otabek Qodirov',
      telegramUsername: '@otabek_ielts',
      phone: '+998 90 999 11 22',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      tariffName: 'Pro Mentor',
      cartPrice: 790000,
      timeAgo: '42 daqiqa oldin',
      discountSent: false
    },
    {
      id: 'cart-2',
      studentName: 'Zilola Ergasheva',
      telegramUsername: '@zilola_e',
      phone: '+998 93 444 77 88',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      tariffName: 'Standart',
      cartPrice: 390000,
      timeAgo: '2 soat oldin',
      discountSent: false
    },
    {
      id: 'cart-3',
      studentName: 'Sherzod Mahmudov',
      telegramUsername: '@sherzod_m',
      phone: '+998 97 123 00 44',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      tariffName: 'VIP Individual',
      cartPrice: 1690000,
      timeAgo: '5 soat oldin',
      discountSent: true
    }
  ]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(landingUrl);
    setCopiedLink(true);
    onShowToast("Kurs landing sahifasi havolasi nusxalandi!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendDiscount = (cartId: string, studentName: string) => {
    setAbandonedCarts(abandonedCarts.map(c => c.id === cartId ? { ...c, discountSent: true } : c));
    onShowToast(`${studentName} ga Telegram orqali 20% maxsus chegirma havolasi yuborildi!`);
  };

  const handleBulkDiscount = () => {
    setAbandonedCarts(abandonedCarts.map(c => ({ ...c, discountSent: true })));
    onShowToast("Barcha to'lov qilmay chiqqan talabalarga Telegram orqali 1-click chegirma yuborildi!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-1">
            <Bot className="w-3.5 h-3.5" /> Telegram Bot + Voronka Integratsiyasi
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Sotuv Voronkalari va Tashlab Ketilgan Savatlar</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Kursga maxsus landing havolalar, Telegram bot orqali lidlarni ushlash va savatchada qolganlarga qayta sotuv
          </p>
        </div>

        <button
          onClick={handleBulkDiscount}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <BellRing className="w-4 h-4" /> Barchaga 1-Click Chegirma Yuborish
        </button>
      </div>

      {/* Funnel Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">1. Landing Sahifa Tashriflari</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            1 840 ta
          </div>
          <div className="mt-1 text-[10px] text-slate-400 font-mono">Telegram kanaldan kelganlar</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">2. Savatchaga Qo'shganlar</div>
          <div className="mt-2 text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
            320 ta
          </div>
          <div className="mt-1 text-[10px] text-blue-500 font-mono">17.4% konversiya</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">3. To'lov Qilganlar (Muvaffaqiyat)</div>
          <div className="mt-2 text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
            264 ta
          </div>
          <div className="mt-1 text-[10px] text-emerald-500 font-mono">82.5% to'lov darajasi</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-[11px] text-slate-500 dark:text-zinc-400">4. Tashlab Ketilganlar (Savatcha)</div>
          <div className="mt-2 text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
            56 ta
          </div>
          <div className="mt-1 text-[10px] text-amber-500 font-mono">Qayta ishlash mumkin</div>
        </div>
      </div>

      {/* Integration Links & Telegram Bot Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Landing Page Share */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Kursning Maxsus Landing Havolasi
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
              Faol
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            Telegram kanalingiz, Instagram bio yoki reklamalar uchun to'g'ridan-to'g'ri kurs xaridiga olib boruvchi havolani ulashing.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={landingUrl}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-mono select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? "Nusxalandi" : "Nusxalash"}
            </button>
          </div>
        </div>

        {/* Telegram Bot Webhook */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Telegram Bot Integratsiyasi
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
              Webhook Uланган
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            O'quvchilar ushbu bot orqali dars eslatmalari, vazifa baholari va maxsus promo-kodlarni avtomatik qabul qilishadi.
          </p>
          <div className="flex items-center justify-between pt-1 font-mono text-xs">
            <span className="text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-blue-500" /> {telegramBotUsername}
            </span>
            <button
              onClick={() => onShowToast("Telegram bot sozlamalari tekshirildi (Ping: 42ms)")}
              className="text-blue-600 dark:text-blue-400 font-semibold text-[11px] hover:underline"
            >
              Test Xabar Yuborish
            </button>
          </div>
        </div>
      </div>

      {/* Abandoned Carts Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Tashlab Ketilgan Savatlar (Abandoned Carts)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Savatchada qolib ketgan summa: <strong className="text-amber-600 dark:text-amber-400">{formatUZS(2870000)}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-zinc-400 font-semibold uppercase">
                <th className="py-2.5 px-3">O'quvchi</th>
                <th className="py-2.5 px-3">Telegram / Telefon</th>
                <th className="py-2.5 px-3">Tanlangan Kurs & Tarif</th>
                <th className="py-2.5 px-3 text-right">Summa</th>
                <th className="py-2.5 px-3 text-center">Vaqti</th>
                <th className="py-2.5 px-3 text-right">Tezkor Qaytarish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {abandonedCarts.map((cart) => (
                <tr key={cart.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                  <td className="py-3 px-3 font-sans font-semibold text-slate-900 dark:text-white text-xs">
                    {cart.studentName}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-zinc-300">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{cart.telegramUsername}</span>
                    <span className="text-slate-400 text-[10px] block">{cart.phone}</span>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <div className="text-slate-800 dark:text-slate-200 text-xs font-medium line-clamp-1">{cart.courseTitle}</div>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{cart.tariffName}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white text-xs">
                    {formatUZS(cart.cartPrice)}
                  </td>
                  <td className="py-3 px-3 text-center text-[11px] text-slate-500 dark:text-zinc-400 font-sans">
                    {cart.timeAgo}
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    {cart.discountSent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Chegirma Yuborildi
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSendDiscount(cart.id, cart.studentName)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-semibold flex items-center gap-1.5 ml-auto shadow-xs"
                      >
                        <Percent className="w-3.5 h-3.5" /> Chegirma Yuborish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
