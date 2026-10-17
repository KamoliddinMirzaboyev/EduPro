import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Radio, 
  Clock, 
  Users, 
  PlayCircle, 
  Video, 
  CheckCircle2, 
  Bell, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface LiveClass {
  id: string;
  title: string;
  courseTitle: string;
  instructorName: string;
  dayOfWeek: string;
  timeString: string;
  durationMinutes: number;
  status: 'UPCOMING' | 'LIVE_NOW' | 'RECORDING_AVAILABLE';
  countdownSeconds: number;
  meetingUrl: string;
}

interface LiveSchedulePageProps {
  onShowToast: (msg: string) => void;
}

export const LiveSchedulePage: React.FC<LiveSchedulePageProps> = ({ onShowToast }) => {
  const [classes, setClasses] = useState<LiveClass[]>([
    {
      id: 'live-1',
      title: 'IELTS Writing Task 2: Advanced Cohesion & Inversion',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      instructorName: 'Sardor Daminov',
      dayOfWeek: 'Bugun',
      timeString: '20:00 (1080p WebRTC)',
      durationMinutes: 60,
      status: 'LIVE_NOW',
      countdownSeconds: 0,
      meetingUrl: '/classroom/ielts-band-8'
    },
    {
      id: 'live-2',
      title: 'Django Ninja Async ORM & Redis Live Coding Session',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      instructorName: 'Ulug‘bek Samig‘jonov',
      dayOfWeek: 'Ertaga (Shanba)',
      timeString: '19:30',
      durationMinutes: 90,
      status: 'UPCOMING',
      countdownSeconds: 84600,
      meetingUrl: '/classroom/full-stack-nextjs'
    },
    {
      id: 'live-3',
      title: 'Speaking Part 2: Cue Card Simulation & Mock Test',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      instructorName: 'Sardor Daminov',
      dayOfWeek: '14 Oktabr',
      timeString: '20:00',
      durationMinutes: 65,
      status: 'RECORDING_AVAILABLE',
      countdownSeconds: 0,
      meetingUrl: '/classroom/ielts-band-8'
    }
  ]);

  const [activeDay, setActiveDay] = useState('Bugun');

  const daysOfWeek = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-[11px] font-semibold mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Jonli Efirlar Taqvimi
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Jonli Darslar va Vebinarlar Jadvali</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Haftalik jonli efirlar, interaktiv Q&A sessiyalar va dars boshlanishiga qolgan vaqt
          </p>
        </div>

        <button
          onClick={() => onShowToast("Telegram bot orqali dars eslatmalari faollashtirildi!")}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Bell className="w-4 h-4" /> Dars Eslatmasini Yoqish
        </button>
      </div>

      {/* Live Now Hero Banner */}
      {classes.find(c => c.status === 'LIVE_NOW') && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-red-900/30 border border-red-500/30 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> HOZIR JONLI EFIRDA
                </span>
                <span className="text-xs text-zinc-300 font-mono">
                  48 nafar talaba kuzatmoqda
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white">
                {classes[0].title}
              </h2>
              <p className="text-xs text-zinc-300">
                Ustoz: <strong className="text-white">{classes[0].instructorName}</strong> • {classes[0].courseTitle}
              </p>
            </div>

            <button
              onClick={() => onShowToast("Jonli efir xonasiga ulanmoqda (WebRTC LiveKit)...")}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-red-600/30 self-start lg:self-center"
            >
              <Radio className="w-4 h-4 animate-pulse" /> Jonli Dars Xonasiga Kirish
            </button>
          </div>
        </div>
      )}

      {/* Week Calendar Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
              activeDay === day
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] text-slate-600 dark:text-zinc-400 hover:border-slate-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Classes Schedule Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Rejalashtirilgan Barcha Efirlar
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    item.status === 'LIVE_NOW'
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40 font-bold'
                      : item.status === 'UPCOMING'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                  }`}>
                    {item.status === 'LIVE_NOW' ? 'Efirda' : item.status === 'UPCOMING' ? 'Rejalashtirilgan' : 'Yozuvi Tayyor'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.durationMinutes} daqiqa
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1">
                  Ustoz: {item.instructorName} • {item.courseTitle}
                </p>

                <div className="pt-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {item.dayOfWeek}, {item.timeString}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                {item.status === 'LIVE_NOW' ? (
                  <button
                    onClick={() => onShowToast("Jonli dars xonasiga yo'naltirilmoqda...")}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Radio className="w-3.5 h-3.5 animate-pulse" /> Darsga Kirish
                  </button>
                ) : item.status === 'RECORDING_AVAILABLE' ? (
                  <button
                    onClick={() => onShowToast("Dars videosi yozuvi ochilmoqda...")}
                    className="w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <PlayCircle className="w-4 h-4" /> Dars Yozuvini Ko'rish
                  </button>
                ) : (
                  <button
                    onClick={() => onShowToast(`"${item.title}" uchun eslatma taqvimingizga saqlandi!`)}
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Bell className="w-3.5 h-3.5" /> Eslatma Belgilash
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
