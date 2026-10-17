import React, { useState } from 'react';
import { 
  Radio, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Monitor, 
  Users, 
  Clock, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Share2, 
  Settings2,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

interface LiveSession {
  id: string;
  title: string;
  courseTitle: string;
  moduleName: string;
  scheduledAt: string;
  durationMinutes: number;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
  recordingStatus?: 'PROCESSING' | 'READY' | 'ATTACHED';
  viewersCount: number;
}

interface AttendanceRecord {
  id: string;
  studentName: string;
  joinTime: string;
  stayDurationMinutes: number;
  totalPercentage: number;
  status: 'PRESENT' | 'PARTIAL' | 'ABSENT';
}

interface LiveStudioPageProps {
  onShowToast: (msg: string) => void;
}

export const LiveStudioPage: React.FC<LiveStudioPageProps> = ({ onShowToast }) => {
  const [sessions, setSessions] = useState<LiveSession[]>([
    {
      id: 'live-101',
      title: 'IELTS Writing Task 2: Advanced Cohesion & Coherence',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      moduleName: '3-Modul: Essay Structures',
      scheduledAt: 'Bugun, 20:00 (Jonli Efirda)',
      durationMinutes: 60,
      status: 'LIVE',
      viewersCount: 48,
    },
    {
      id: 'live-102',
      title: 'Django Ninja Async ORM & Redis Caching Live Coding',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      moduleName: '4-Modul: Performance & Cache',
      scheduledAt: 'Ertaga, 19:30',
      durationMinutes: 90,
      status: 'SCHEDULED',
      viewersCount: 72,
    },
    {
      id: 'live-100',
      title: 'Speaking Part 2: Cue Card Strategy & Mock Practice',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      moduleName: '2-Modul: Speaking Fluency',
      scheduledAt: '14 Oktabr, 20:00',
      durationMinutes: 65,
      status: 'COMPLETED',
      recordingStatus: 'ATTACHED',
      viewersCount: 56,
    }
  ]);

  const [activeSession, setActiveSession] = useState<LiveSession | null>(sessions[0]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // New session modal inputs
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('IELTS Band 8.0: Intensive Writing & Speaking');
  const [newDate, setNewDate] = useState('2026-10-20T19:00');
  const [newDuration, setNewDuration] = useState(60);

  // Auto-attendance sample data
  const [attendance] = useState<AttendanceRecord[]>([
    { id: 'att-1', studentName: 'Sardorbek Rahimov', joinTime: '20:02', stayDurationMinutes: 58, totalPercentage: 96, status: 'PRESENT' },
    { id: 'att-2', studentName: 'Madina Umarova', joinTime: '20:00', stayDurationMinutes: 60, totalPercentage: 100, status: 'PRESENT' },
    { id: 'att-3', studentName: 'Javohir Toshpo‘latov', joinTime: '20:15', stayDurationMinutes: 45, totalPercentage: 75, status: 'PARTIAL' },
    { id: 'att-4', studentName: 'Nodira Qodirova', joinTime: '20:01', stayDurationMinutes: 59, totalPercentage: 98, status: 'PRESENT' },
    { id: 'att-5', studentName: 'Farrux Aliyev', joinTime: '20:30', stayDurationMinutes: 25, totalPercentage: 41, status: 'PARTIAL' },
  ]);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSess: LiveSession = {
      id: `live-${Date.now()}`,
      title: newTitle,
      courseTitle: newCourse,
      moduleName: 'Rejalashtirilgan Vebinar',
      scheduledAt: newDate.replace('T', ' '),
      durationMinutes: newDuration,
      status: 'SCHEDULED',
      viewersCount: 0
    };

    setSessions([newSess, ...sessions]);
    setShowScheduleModal(false);
    setNewTitle('');
    onShowToast(`"${newTitle}" jonli darsi muvaffaqiyatli rejalashtirildi!`);
  };

  const handleAttachRecording = (sessId: string) => {
    setSessions(sessions.map(s => s.id === sessId ? { ...s, recordingStatus: 'ATTACHED' } : s));
    onShowToast("Dars yozuvi (Recording) avtomatik ravishda tegishli kurs moduliga joylandi!");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-[11px] font-semibold mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> WebRTC LiveKit Studio
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Jonli Efirlar va Vebinarlar</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Brauzer orqali to'g'ridan-to'g'ri dars o'tish, avto-davomat va dars yozuvlarini modulga biriktirish
          </p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" /> Yangi Jonli Dars
        </button>
      </div>

      {/* Main Studio Interactive Room (if activeSession is LIVE) */}
      {activeSession && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Broadcast Viewport */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-xl">
              {/* Top overlay */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> JONLI EFIR
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-red-400" /> 00:42:18
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-400" /> {activeSession.viewersCount} kishi kuzatmoqda
                  </span>
                </div>
              </div>

              {/* Stream Screen Mock */}
              <div className="my-auto text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                  {isScreenSharing ? <Monitor className="w-8 h-8" /> : <Video className="w-8 h-8" />}
                </div>
                <div className="text-white text-sm font-semibold">{activeSession.title}</div>
                <p className="text-zinc-400 text-xs">
                  {isScreenSharing ? "Ekran translyatsiyasi yoqilgan (1080p 60fps WebRTC)" : "Ustoz kamerasi faol holatda"}
                </p>
              </div>

              {/* Bottom Control Bar */}
              <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 bg-black/40 backdrop-blur-md -mx-4 -mb-4 px-4 py-3">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setIsMicOn(!isMicOn); onShowToast(isMicOn ? "Mikrofon o'chirildi" : "Mikrofon yoqildi"); }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                      isMicOn 
                        ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                        : 'bg-red-500/20 border-red-500/40 text-red-400'
                    }`}
                  >
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => { setIsVideoOn(!isVideoOn); onShowToast(isVideoOn ? "Kamera o'chirildi" : "Kamera yoqildi"); }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                      isVideoOn 
                        ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                        : 'bg-red-500/20 border-red-500/40 text-red-400'
                    }`}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => { setIsScreenSharing(!isScreenSharing); onShowToast(isScreenSharing ? "Ekran ulanishi to'xtatildi" : "Ekran muvaffaqiyatli ulashildi"); }}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isScreenSharing 
                        ? 'bg-blue-600 border-blue-500 text-white' 
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    <Monitor className="w-4 h-4" /> Ekran Ulashish
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShowToast("Dars havolasi nusxalandi: https://edupro.uz/live/ielts-101")}
                    className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs hover:bg-white/20"
                    title="Havola ulashish"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleAttachRecording(activeSession.id)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <FileCheck2 className="w-4 h-4" /> Yozuvni Modulga Biriktirish
                  </button>
                </div>
              </div>
            </div>

            {/* Auto Attendance Table */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Avto-Davomat Jurnali (Jonli Monitor)
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  O'rtacha qatnashish: 82%
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-zinc-400 font-semibold uppercase">
                      <th className="py-2 px-2.5">Talaba</th>
                      <th className="py-2 px-2.5">Kirgan Vaqti</th>
                      <th className="py-2 px-2.5">O'tirgan Daqiqasi</th>
                      <th className="py-2 px-2.5">Davomat %</th>
                      <th className="py-2 px-2.5 text-right">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
                    {attendance.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                        <td className="py-2.5 px-2.5 font-sans font-medium text-slate-900 dark:text-white">
                          {rec.studentName}
                        </td>
                        <td className="py-2.5 px-2.5 text-slate-500 dark:text-zinc-400">
                          {rec.joinTime}
                        </td>
                        <td className="py-2.5 px-2.5 text-slate-700 dark:text-slate-300">
                          {rec.stayDurationMinutes} daqiqa
                        </td>
                        <td className="py-2.5 px-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs">{rec.totalPercentage}%</span>
                            <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${rec.totalPercentage >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                style={{ width: `${rec.totalPercentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-2.5 text-right font-sans">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                            rec.status === 'PRESENT'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                          }`}>
                            {rec.status === 'PRESENT' ? 'Qatnashdi' : 'Qisman'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right sidebar: All Sessions & Recordings */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Barcha Jonli Darslar
              </h3>
              <div className="space-y-2.5">
                {sessions.map((sess) => (
                  <div
                    key={sess.id}
                    onClick={() => setActiveSession(sess)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      activeSession?.id === sess.id
                        ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-xs'
                        : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        sess.status === 'LIVE'
                          ? 'bg-red-500 text-white animate-pulse'
                          : sess.status === 'SCHEDULED'
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-400'
                      }`}>
                        {sess.status === 'LIVE' ? 'Jonli Efirda' : sess.status === 'SCHEDULED' ? 'Rejalashtirilgan' : 'Tugatilgan'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {sess.durationMinutes} min
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                      {sess.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 line-clamp-1">
                      {sess.courseTitle}
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{sess.scheduledAt}</span>
                      {sess.recordingStatus === 'ATTACHED' && (
                        <span className="text-emerald-500 font-sans font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Modulda
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20 space-y-2">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" /> Avtomatik Bulut Yozuvi (Cloud Recording)
              </div>
              <p className="text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed">
                Dars yakunlanishi bilanoq LiveKit serveri avtomatik transkod qilib, Bunny.net Stream orqali tegishli dars sahifasiga joylaydi. Faylni yuklab qayta joylash talab etilmaydi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Schedule Session */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Yangi Jonli Efir Rejalashtirish</h3>
            <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Dars Mavzusi</label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Task 2 Essay Analizi"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Kurs</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                >
                  <option value="IELTS Band 8.0: Intensive Writing & Speaking">IELTS Band 8.0: Intensive Writing & Speaking</option>
                  <option value="Full-Stack Next.js 15 & Django Ninja Masterclass">Full-Stack Next.js 15 & Django Ninja Masterclass</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Sana va Vaqt</label>
                  <input
                    type="datetime-local"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Davomiyligi (daqiqa)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(parseInt(e.target.value) || 60)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Rejalashtirish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
