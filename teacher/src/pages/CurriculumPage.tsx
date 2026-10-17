import React, { useState } from 'react';
import { Plus, Lock, FileText, Video, ChevronDown } from 'lucide-react';
import { CourseDetail } from '../api/client';
import { CurriculumSkeleton } from '../components/Skeletons';

interface CurriculumPageProps {
  courses: CourseDetail[];
  selectedCourse: CourseDetail | null;
  onSelectCourse: (course: CourseDetail) => void;
  loading: boolean;
  onCreateModule: (title: string) => Promise<void>;
  onCreateLesson: (moduleId: string, title: string, stopRequired: boolean, watchPercent: number) => Promise<void>;
}

export const CurriculumPage: React.FC<CurriculumPageProps> = ({
  courses,
  selectedCourse,
  onSelectCourse,
  loading,
  onCreateModule,
  onCreateLesson,
}) => {
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  const [showAddLessonModal, setShowAddLessonModal] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonStopRequired, setNewLessonStopRequired] = useState(true);
  const [newLessonWatchPercent, setNewLessonWatchPercent] = useState(85);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<{ video_id: string } | null>(null);

  const handleCreateModule = async () => {
    if (!newModuleTitle.trim()) return;
    await onCreateModule(newModuleTitle);
    setNewModuleTitle('');
    setShowAddModuleModal(false);
  };

  const handleCreateLesson = async () => {
    if (!showAddLessonModal || !newLessonTitle.trim()) return;
    await onCreateLesson(showAddLessonModal, newLessonTitle, newLessonStopRequired, newLessonWatchPercent);
    setNewLessonTitle('');
    setShowAddLessonModal(null);
  };

  const handleUploadSimulation = () => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadResult({ video_id: `b_tus_${Math.random().toString(36).substring(7)}` });
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Darslar & Kurikulum Boshqaruvi</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Bunny.net TUS video yuklash, Stop-Lesson (85% tomosha) va dars materiallari
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Course Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedCourse?.id || ''}
              onChange={(e) => {
                const found = courses.find(c => c.id === e.target.value);
                if (found) onSelectCourse(found);
              }}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-blue-500"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Video className="w-3.5 h-3.5 text-blue-600" /> TUS Video
          </button>

          <button
            onClick={() => setShowAddModuleModal(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Yangi Modul
          </button>
        </div>
      </div>

      {loading ? (
        <CurriculumSkeleton />
      ) : (
        <div className="space-y-4">
          {selectedCourse?.modules.map((mod, modIdx) => (
            <div key={mod.id} className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
              <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-mono flex items-center justify-center">
                    {modIdx + 1}
                  </span>
                  <h2 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">{mod.title}</h2>
                </div>
                <button 
                  onClick={() => {
                    setShowAddLessonModal(mod.id);
                    setNewLessonTitle('');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Dars qo'shish
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {mod.lessons.map((lesson, lesIdx) => (
                  <div key={lesson.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">
                        {lesIdx + 1 < 10 ? `0${lesIdx + 1}` : lesIdx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-medium text-slate-900 dark:text-white flex items-center gap-2">
                          {lesson.title}
                          {lesson.is_free_preview && (
                            <span className="px-1.5 py-0.2 rounded-md bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[10px] font-mono">
                              Bepul sinov
                            </span>
                          )}
                          {lesson.stop_lesson_required && (
                            <span className="px-1.5 py-0.2 rounded-md bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-[10px] flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> Stop-Lesson ({lesson.minimum_watch_percent}%)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 flex items-center gap-2 font-mono">
                          <span>Bunny ID: {lesson.video_provider_id || 'b_stream_demo'}</span>
                          <span>•</span>
                          <span>{Math.round(lesson.duration_seconds / 60)} daqiqa</span>
                          {lesson.materials.length > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                                <FileText className="w-3 h-3" /> {lesson.materials.length} ta material
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 text-[11px] font-mono">Tartib: #{lesson.order}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Module */}
      {showAddModuleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Yangi Modul Qo'shish</h3>
            <input 
              type="text"
              placeholder="Modul nomi (masalan: Module 4: Reading Speed Techniques)"
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowAddModuleModal(false)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Bekor qilish
              </button>
              <button 
                onClick={handleCreateModule}
                className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Lesson */}
      {showAddLessonModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Yangi Dars Qo'shish</h3>
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Dars Mavzusi</label>
              <input 
                type="text"
                placeholder="Dars sarlavhasi..."
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Stop-Lesson Rules */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2 text-xs">
              <label className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={newLessonStopRequired}
                  onChange={(e) => setNewLessonStopRequired(e.target.checked)}
                  className="rounded text-blue-600"
                />
                Stop-Lesson qoidasini yoqish (🔒 Drip content)
              </label>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Talaba keyingi darsni ochishi uchun videoni kamida belgilangan foizda ko'rishi shart.
              </p>
              {newLessonStopRequired && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">Minimal tomosha foizi:</span>
                  <input 
                    type="number" 
                    value={newLessonWatchPercent} 
                    onChange={(e) => setNewLessonWatchPercent(parseInt(e.target.value))}
                    className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-black text-xs font-mono"
                  />
                  <span className="text-[11px] font-mono">%</span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowAddLessonModal(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Bekor qilish
              </button>
              <button 
                onClick={handleCreateLesson}
                className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                Darsni Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Bunny.net TUS Upload Simulation */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-600" />
                Bunny.net Direct TUS Video Upload
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 text-xs">✕</button>
            </div>

            <div className="p-5 rounded-xl border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-center space-y-2">
              <Video className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-xs font-semibold text-slate-900 dark:text-white">4K / 1080p Video faylni tanlang</div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">MP4, MOV yoki MKV formatida (Max 5GB)</p>
            </div>

            {uploadProgress > 0 && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-zinc-400">
                  <span>Yuklanmoqda (Bunny Stream)...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            {uploadResult && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                <div className="font-semibold">Muvaffaqiyatli saqlandi!</div>
                <div className="font-mono text-[11px]">Video ID: {uploadResult.video_id}</div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={handleUploadSimulation}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                {uploadProgress === 100 ? "Yana yuklash" : "TUS Yuklashni Boshlash"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
