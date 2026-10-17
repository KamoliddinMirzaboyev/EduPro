import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  MapPin, 
  Ban, 
  RefreshCw, 
  AlertTriangle, 
  Eye, 
  Lock, 
  CheckCircle2, 
  UserX,
  Search
} from 'lucide-react';

interface SecurityAlert {
  id: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  alertType: 'MULTI_DEVICE' | 'STREAM_SCRAPING' | 'DEVTOOLS_RECORD';
  concurrentDevicesCount: number;
  locations: string[];
  ips: string[];
  timestamp: string;
  status: 'FLAGGED' | 'RESOLVED' | 'BANNED';
  riskScore: number;
}

interface SecurityPageProps {
  onShowToast: (msg: string) => void;
}

export const SecurityPage: React.FC<SecurityPageProps> = ({ onShowToast }) => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    {
      id: 'sec-901',
      studentName: 'Asadbek Nurmatov',
      studentEmail: 'asad.bek99@gmail.com',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      alertType: 'MULTI_DEVICE',
      concurrentDevicesCount: 4,
      locations: ['Toshkent (Chrome/Windows)', 'Samarqand (Safari/iPhone)', 'Namangan (Chrome/Android)', 'Buxoro (Firefox/Mac)'],
      ips: ['178.218.201.12', '84.54.88.190', '213.230.77.10', '185.139.137.45'],
      timestamp: 'Bugun, 15:10',
      status: 'FLAGGED',
      riskScore: 94
    },
    {
      id: 'sec-902',
      studentName: 'Kamola Rustamova',
      studentEmail: 'kamola.r@mail.ru',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      alertType: 'STREAM_SCRAPING',
      concurrentDevicesCount: 1,
      locations: ['Toshkent (Postman/Curl)'],
      ips: ['94.158.52.21'],
      timestamp: 'Bugun, 14:02',
      status: 'FLAGGED',
      riskScore: 88
    },
    {
      id: 'sec-903',
      studentName: 'Javlon Ismoilov',
      studentEmail: 'javlon_dev@inbox.uz',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      alertType: 'DEVTOOLS_RECORD',
      concurrentDevicesCount: 1,
      locations: ['Farg‘ona (Chrome DevTools Active)'],
      ips: ['217.30.160.101'],
      timestamp: 'Kecha, 22:45',
      status: 'RESOLVED',
      riskScore: 65
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleBanStudent = (alertId: string, studentName: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status: 'BANNED' } : a));
    onShowToast(`"${studentName}" qoidabuzarlik sababli butun platformadan bloklandi va barcha faol sessiyalari uzildi!`);
  };

  const handleResetSessions = (alertId: string, studentName: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status: 'RESOLVED', concurrentDevicesCount: 1 } : a));
    onShowToast(`"${studentName}" ning barcha begona qurilmalari tizimdan chiqarib yuborildi (Sessiyalar tozalandi).`);
  };

  const filteredAlerts = alerts.filter(a => 
    a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-[11px] font-semibold mb-1">
            <ShieldAlert className="w-3.5 h-3.5" /> DRM & Anti-Piracy Radar
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Xavfsizlik va Anti-Piracy Monitoringi</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Bitta akkauntdan bir vaqtda 3-4 kishi kirishini aniqlash, video o'g'irlash urinishlari va avto-bloklash
          </p>
        </div>

        <button
          onClick={() => onShowToast("Anti-piracy skaneri ishga tushirildi: 0 ta yangi xavf aniqlandi")}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Qayta Skan Qilish
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Shubhali Multi-Device Kirishlar</div>
          <div className="mt-2 text-2xl font-mono font-bold text-red-600 dark:text-red-400">
            {alerts.filter(a => a.alertType === 'MULTI_DEVICE' && a.status === 'FLAGGED').length} ta
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            Bir vaqtda 2+ viloyat/IP dan foydalanganlar
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Stream Scraping Urinishlari</div>
          <div className="mt-2 text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
            1 ta
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Bunny.net DRM tomonidan qaytarildi
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Himoyalangan Dars Videolari</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            100%
          </div>
          <div className="mt-2 text-[11px] text-blue-600 dark:text-blue-400 font-mono">
            Dinamik harakatlanuvchi talaba suv belgisi (Watermark)
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Talaba ismi, email yoki kurs nomi..."
          className="w-full bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Security Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-2xl border transition-all ${
              alert.status === 'BANNED'
                ? 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01] opacity-60'
                : 'border-red-200 dark:border-red-900/30 bg-white dark:bg-[#0F111A] shadow-xs'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                    alert.alertType === 'MULTI_DEVICE'
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40'
                      : alert.alertType === 'STREAM_SCRAPING'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                      : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40'
                  }`}>
                    {alert.alertType === 'MULTI_DEVICE' ? 'Multi-Device Login Alert' : alert.alertType === 'STREAM_SCRAPING' ? 'Stream Scraping Attempt' : 'Screen Record Alert'}
                  </span>
                  <span className="text-[11px] font-mono text-red-600 dark:text-red-400 font-bold">
                    Xavf darajasi: {alert.riskScore}/100
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {alert.timestamp}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {alert.studentName} <span className="text-xs text-slate-400 font-mono font-normal">({alert.studentEmail})</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Kurs: <strong className="text-slate-700 dark:text-zinc-300 font-medium">{alert.courseTitle}</strong>
                  </p>
                </div>

                {/* Devices & Locations */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                    Bir vaqtda faol bo'lgan qurilmalar va joylashuvlar ({alert.concurrentDevicesCount} ta):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                    {alert.locations.map((loc, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <span className="text-slate-800 dark:text-zinc-200">{loc}</span>
                        <span className="text-slate-400 text-[10px]">{alert.ips[i] || 'IP Yashirin'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row lg:flex-col gap-2 shrink-0 self-end lg:self-center">
                {alert.status === 'BANNED' ? (
                  <span className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 text-xs font-bold border border-red-200 dark:border-red-800/40 flex items-center gap-1">
                    <Ban className="w-3.5 h-3.5" /> Bloklangan
                  </span>
                ) : alert.status === 'RESOLVED' ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-xs font-bold border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hal Qilingan
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleResetSessions(alert.id, alert.studentName)}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Sessiyalarni Tozalash
                    </button>
                    <button
                      onClick={() => handleBanStudent(alert.id, alert.studentName)}
                      className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Ban className="w-3.5 h-3.5" /> Akkauntni Bloklash
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
