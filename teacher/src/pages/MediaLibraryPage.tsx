import React, { useState } from 'react';
import { 
  Video, 
  UploadCloud, 
  ShieldCheck, 
  TrendingDown, 
  RotateCw, 
  Play, 
  Clock, 
  FileVideo, 
  HardDrive, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Layers
} from 'lucide-react';

interface VideoAsset {
  id: string;
  title: string;
  courseTitle: string;
  durationSeconds: number;
  sizeMb: number;
  status: 'READY' | 'ENCODING' | 'ERROR';
  drmProtected: boolean;
  bunnyVideoId: string;
  totalViews: number;
  avgWatchPercentage: number;
  uploadedAt: string;
}

interface MediaLibraryPageProps {
  onShowToast: (msg: string) => void;
}

export const MediaLibraryPage: React.FC<MediaLibraryPageProps> = ({ onShowToast }) => {
  const [videos, setVideos] = useState<VideoAsset[]>([
    {
      id: 'vid-101',
      title: '01. IELTS Writing Task 2 Overview & Band Descriptors',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      durationSeconds: 1420,
      sizeMb: 420,
      status: 'READY',
      drmProtected: true,
      bunnyVideoId: 'bn-77a8-4421',
      totalViews: 840,
      avgWatchPercentage: 88,
      uploadedAt: '12 Oktabr, 2026'
    },
    {
      id: 'vid-102',
      title: '02. Complex Sentence Structures & Inversion',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      durationSeconds: 1980,
      sizeMb: 580,
      status: 'READY',
      drmProtected: true,
      bunnyVideoId: 'bn-77a8-4422',
      totalViews: 690,
      avgWatchPercentage: 74,
      uploadedAt: '14 Oktabr, 2026'
    },
    {
      id: 'vid-103',
      title: '01. Django Ninja Async Setup & PostgreSQL Architecture',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      durationSeconds: 2450,
      sizeMb: 810,
      status: 'READY',
      drmProtected: true,
      bunnyVideoId: 'bn-88f2-1190',
      totalViews: 520,
      avgWatchPercentage: 92,
      uploadedAt: '15 Oktabr, 2026'
    },
    {
      id: 'vid-104',
      title: '02. Redis Caching & Cache Invalidation Patterns',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      durationSeconds: 1800,
      sizeMb: 490,
      status: 'ENCODING',
      drmProtected: true,
      bunnyVideoId: 'bn-88f2-1191',
      totalViews: 0,
      avgWatchPercentage: 0,
      uploadedAt: 'Bugun, 16:30'
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState<VideoAsset>(videos[0]);

  // Retention mock data points for selected video (0% to 100% time)
  const retentionCurve = [
    { minute: '0m', retention: 100, rewatchPeak: false },
    { minute: '5m', retention: 94, rewatchPeak: false },
    { minute: '10m', retention: 89, rewatchPeak: true }, // Peak: rewatching complex rule
    { minute: '15m', retention: 85, rewatchPeak: false },
    { minute: '20m', retention: 82, rewatchPeak: true }, // Peak: example essay
    { minute: '25m', retention: 76, rewatchPeak: false },
    { minute: '30m', retention: 71, rewatchPeak: false },
  ];

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins} daq ${s > 0 ? `${s} son` : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Bunny.net Stream + DRM Shifrlash
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Video Ombori va Retention Analitika</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Dars videolari holati, transkodlash va talabalarning tomosha qilish (Drop-off & Rewatch) dinamikasi
          </p>
        </div>

        <button
          onClick={() => onShowToast("Video fayl tanlash oynasi ochildi (Maksimal hajm: 4 GB)")}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <UploadCloud className="w-4 h-4" /> Yangi Video Yuklash
        </button>
      </div>

      {/* Storage & CDN Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Ishlatilgan Video Xotira</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            2.3 GB <span className="text-xs text-slate-400 font-sans font-normal">/ 50 GB</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '4.6%' }}></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">Jami Ko'rishlar Soni</div>
          <div className="mt-2 text-2xl font-mono font-bold text-slate-900 dark:text-white">
            2 050 marta
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> 100% o'quvchilar tomonidan
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="text-xs text-slate-500 dark:text-zinc-400">O'rtacha Video Tugatish (Retention)</div>
          <div className="mt-2 text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
            84.6%
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            Yuqori darajadagi e'tibor va jalb etuvchanlik
          </div>
        </div>
      </div>

      {/* Retention Graph & Detailed Analytics of Selected Video */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Retention Graph: "{selectedVideo.title}"
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              Qaysi daqiqada talabalar chiqib ketdi (Drop-off) va qaysi joyini qayta-qayta tomosha qildi (Rewatch Heatmap)
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-500 dark:text-zinc-400">Umumiy ko'rishlar: <strong className="text-slate-900 dark:text-white">{selectedVideo.totalViews}</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tugatish: {selectedVideo.avgWatchPercentage}%</span>
          </div>
        </div>

        {/* Visual Graph Bars */}
        <div className="pt-4 pb-2">
          <div className="h-44 w-full flex items-end gap-3 sm:gap-6 border-b border-slate-200 dark:border-white/10 pb-2 px-2">
            {retentionCurve.map((point, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md font-mono pointer-events-none whitespace-nowrap shadow-lg">
                  {point.minute}: {point.retention}% talaba {point.rewatchPeak && '(Qayta ko‘rish cho‘qqisi)'}
                </div>

                <div className="w-full flex justify-center">
                  <div
                    className={`w-full max-w-[36px] rounded-t-lg transition-all ${
                      point.rewatchPeak
                        ? 'bg-blue-600 shadow-md shadow-blue-500/30'
                        : 'bg-slate-200 dark:bg-white/15 group-hover:bg-blue-400'
                    }`}
                    style={{ height: `${point.retention * 1.5}px` }}
                  ></div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">{point.minute}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500 dark:text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Qayta tomosha cho'qqilari (Eng muhim qismlar)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20"></span> Standart davomiylik
              </span>
            </div>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              Ushbu darsning samaradorlik indeksi: A+
            </span>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Yuklangan Barcha Videolar ({videos.length} ta)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-zinc-400 font-semibold uppercase">
                <th className="py-2.5 px-3">Video Fayl</th>
                <th className="py-2.5 px-3">Kurs</th>
                <th className="py-2.5 px-3 text-center">Davomiyligi</th>
                <th className="py-2.5 px-3 text-center">Hajmi</th>
                <th className="py-2.5 px-3 text-center">Transkoding & DRM</th>
                <th className="py-2.5 px-3 text-right">Analitika</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {videos.map((vid) => (
                <tr
                  key={vid.id}
                  onClick={() => setSelectedVideo(vid)}
                  className={`cursor-pointer transition-colors ${
                    selectedVideo.id === vid.id
                      ? 'bg-blue-50/40 dark:bg-blue-950/20'
                      : 'hover:bg-slate-50/60 dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="py-3 px-3 font-sans">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white text-xs line-clamp-1">{vid.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Bunny ID: {vid.bunnyVideoId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-600 dark:text-zinc-300 text-xs">
                    {vid.courseTitle}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-700 dark:text-slate-300">
                    {formatDuration(vid.durationSeconds)}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-500 dark:text-zinc-400">
                    {vid.sizeMb} MB
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans ${
                      vid.status === 'READY'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                    }`}>
                      {vid.status === 'READY' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Ready (DRM Active)
                        </>
                      ) : (
                        <>
                          <RotateCw className="w-3 h-3 animate-spin" /> Transcoding (1080p)
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideo(vid);
                        onShowToast(`"${vid.title}" retention grafigi ko'rsatilmoqda`);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-semibold hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      Grafik
                    </button>
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
