import React, { useState } from 'react';
import { 
  Plus, 
  Lock, 
  FileText, 
  Video, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  Eye, 
  Edit3, 
  Trash2, 
  Layers, 
  Clock, 
  BookOpen, 
  Percent,
  X,
  FileUp,
  AlertCircle
} from 'lucide-react';
import { CourseDetail, Lesson, Module } from '../api/client';
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
  // Course creation modal state
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('IELTS');
  const [newCoursePrice, setNewCoursePrice] = useState('850000');

  // Module modal state
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  // Accordion collapsed state
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});

  // Lesson Editor Drawer/Modal State
  const [activeLessonDrawer, setActiveLessonDrawer] = useState<{
    moduleId: string;
    lesson?: Lesson | null;
  } | null>(null);

  const [lessonFormTitle, setLessonFormTitle] = useState('');
  const [lessonFormDesc, setLessonFormDesc] = useState('');
  const [lessonStopRequired, setLessonStopRequired] = useState(true);
  const [lessonWatchPercent, setLessonWatchPercent] = useState(85);
  const [lessonAssignmentType, setLessonAssignmentType] = useState<'ESSAY' | 'SPEAKING' | 'QUIZ' | 'NONE'>('ESSAY');
  
  // Video upload simulation state
  const [uploadState, setUploadState] = useState<'IDLE' | 'UPLOADING' | 'PROCESSING' | 'DONE'>('IDLE');
  const [uploadPercent, setUploadPercent] = useState(0);

  // Preview video modal
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  const toggleModuleCollapse = (modId: string) => {
    setCollapsedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleOpenAddLesson = (moduleId: string) => {
    setActiveLessonDrawer({ moduleId, lesson: null });
    setLessonFormTitle('');
    setLessonFormDesc('Bu darsda mavzuning amaliy tahlili va uyga vazifalar ko\'rib chiqiladi.');
    setLessonStopRequired(true);
    setLessonWatchPercent(85);
    setLessonAssignmentType('ESSAY');
    setUploadState('IDLE');
    setUploadPercent(0);
  };

  const handleOpenEditLesson = (moduleId: string, lesson: Lesson) => {
    setActiveLessonDrawer({ moduleId, lesson });
    setLessonFormTitle(lesson.title);
    setLessonFormDesc('Ushbu dars bo\'yicha amaliy topshiriqlar va video tahlil.');
    setLessonStopRequired(lesson.stop_lesson_required);
    setLessonWatchPercent(lesson.minimum_watch_percent || 85);
    setLessonAssignmentType('ESSAY');
    setUploadState('DONE');
    setUploadPercent(100);
  };

  const handleSimulateVideoUpload = () => {
    setUploadState('UPLOADING');
    setUploadPercent(15);
    const timer1 = setTimeout(() => {
      setUploadPercent(60);
      setUploadState('PROCESSING');
    }, 800);
    const timer2 = setTimeout(() => {
      setUploadPercent(100);
      setUploadState('DONE');
    }, 1800);
  };

  const handleSaveLessonDrawer = async () => {
    if (!activeLessonDrawer || !lessonFormTitle.trim()) return;
    await onCreateLesson(
      activeLessonDrawer.moduleId, 
      lessonFormTitle, 
      lessonStopRequired, 
      lessonWatchPercent
    );
    setActiveLessonDrawer(null);
  };

  const handleCreateModuleSubmit = async () => {
    if (!newModuleTitle.trim()) return;
    await onCreateModule(newModuleTitle);
    setNewModuleTitle('');
    setShowAddModuleModal(false);
  };

  // Metrics computation
  const totalModulesCount = selectedCourse?.modules?.length || 4;
  const totalLessonsCount = selectedCourse?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 18;
  const totalDurationMin = Math.round(
    (selectedCourse?.modules?.reduce(
      (acc, m) => acc + (m.lessons?.reduce((lAcc, l) => lAcc + (l.duration_seconds || 0), 0) || 0), 
      0
    ) || 45000) / 60
  );

  return (
    <div className="space-y-6">
      {/* 1. Course Selector Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Tanlangan Kurs
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="relative">
                <select
                  value={selectedCourse?.id || ''}
                  onChange={(e) => {
                    const found = courses.find(c => c.id === e.target.value);
                    if (found) onSelectCourse(found);
                  }}
                  className="appearance-none pl-3 pr-8 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                {selectedCourse?.status || 'PUBLISHED'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateCourseModal(true)}
            className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-slate-700" />
            <span>+ Yangi Kurs Yaratish</span>
          </button>

          <button
            onClick={() => setShowAddModuleModal(true)}
            className="px-3.5 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Yangi Modul Qo'shish</span>
          </button>
        </div>
      </div>

      {/* 2. Course Summary Strip (4 Metric Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">Jami Modullar</span>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {totalModulesCount} ta
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Tizimli bosqichlar</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">Jami Videodarslar</span>
            <Video className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {totalLessonsCount} ta <span className="text-xs font-normal text-slate-500">({Math.round(totalDurationMin / 60)} soat)</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">4K Bunny DRM oqimi</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">Biriktirilgan Vazifalar</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">
            12 ta
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">AI baholash bilan</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-medium">O'rtacha Tugatish</span>
            <Percent className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700">
            78%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Stop-dars intizomi tufayli</div>
        </div>
      </div>

      {/* 3. Interactive Curriculum Accordion Tree (Modules -> Lessons) */}
      {loading ? (
        <CurriculumSkeleton />
      ) : (
        <div className="space-y-4">
          {selectedCourse?.modules?.map((mod, modIdx) => {
            const isCollapsed = !!collapsedModules[mod.id];
            return (
              <div 
                key={mod.id} 
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs"
              >
                {/* Module Header Strip */}
                <div 
                  className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer select-none"
                  onClick={() => toggleModuleCollapse(mod.id)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-800 text-xs font-mono font-bold flex items-center justify-center">
                      {modIdx + 1}
                    </span>
                    <h2 className="font-bold text-xs text-slate-900 tracking-tight">
                      {mod.title}
                    </h2>
                    <span className="text-[11px] font-mono text-slate-500">
                      ({mod.lessons?.length || 0} ta dars)
                    </span>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenAddLesson(mod.id)}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-[11px] font-medium flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Dars Qo'shish</span>
                    </button>
                    <button
                      onClick={() => toggleModuleCollapse(mod.id)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                    >
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Lessons List in 1px bordered rows */}
                {!isCollapsed && (
                  <div>
                    {mod.lessons && mod.lessons.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {mod.lessons.map((lesson, lesIdx) => (
                          <div 
                            key={lesson.id} 
                            className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                          >
                            <div className="flex items-start sm:items-center gap-3 min-w-0">
                              <span className="text-xs font-mono text-slate-400 shrink-0 mt-0.5 sm:mt-0">
                                {modIdx + 1}.{lesIdx + 1}
                              </span>

                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-slate-900 flex flex-wrap items-center gap-2">
                                  <span>{lesson.title}</span>
                                  {lesson.is_free_preview && (
                                    <span className="px-1.5 py-0.5 rounded-sm bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-mono">
                                      Bepul Sinov
                                    </span>
                                  )}
                                  {lesson.stop_lesson_required && (
                                    <span className="px-1.5 py-0.5 rounded-sm bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono flex items-center gap-1">
                                      <Lock className="w-2.5 h-2.5" /> Stop-Dars ({lesson.minimum_watch_percent}%)
                                    </span>
                                  )}
                                </div>

                                <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-2 font-mono">
                                  <span className="flex items-center gap-1 text-slate-600">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    {Math.round(lesson.duration_seconds / 60)}:00
                                  </span>
                                  <span>•</span>
                                  <span className="inline-flex items-center gap-1 text-emerald-700">
                                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                    DRM + Watermark Active
                                  </span>
                                  <span>•</span>
                                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                                    {lesIdx % 2 === 0 ? '✍️ AI Essay Vazifa' : '📝 10 ta Test'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                              <button
                                onClick={() => handleOpenEditLesson(mod.id, lesson)}
                                className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-medium flex items-center gap-1 transition-colors"
                                title="Video almashtirish yoki yuklash"
                              >
                                <Upload className="w-3 h-3 text-slate-500" />
                                <span>Video Yuklash</span>
                              </button>

                              <button
                                onClick={() => handleOpenEditLesson(mod.id, lesson)}
                                className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-medium flex items-center gap-1 transition-colors"
                              >
                                <Plus className="w-3 h-3 text-slate-500" />
                                <span>Vazifa Qo'shish</span>
                              </button>

                              <button
                                onClick={() => setPreviewVideoUrl(`https://iframe.mediadelivery.net/embed/demo/${lesson.video_provider_id || 'test'}`)}
                                className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Ko'rish</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500">
                        Bu modulda hali darslar yo'q. Quyidagi tugma orqali yangi dars qo'shing.
                      </div>
                    )}

                    {/* Footer inside Module */}
                    <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => handleOpenAddLesson(mod.id)}
                        className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Yangi Dars Qo'shish</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Lesson Editor Drawer / Modal */}
      {activeLessonDrawer && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-end animate-in fade-in duration-150">
          <div className="bg-white h-full w-full max-w-lg border-l border-slate-200 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {activeLessonDrawer.lesson ? "Darsni Tahrirlash" : "Yangi Dars Qo'shish"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Videodars, Stop-Lesson parametri va AI topshiriq biriktirish
                </p>
              </div>
              <button
                onClick={() => setActiveLessonDrawer(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 flex-1">
              {/* Lesson Title */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Dars Sarlavhasi
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 1.3. True / False / Not Given Strategiyasi"
                  value={lessonFormTitle}
                  onChange={(e) => setLessonFormTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Lesson Description */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Dars Haqida Qisqacha Ma'lumot
                </label>
                <textarea
                  rows={2}
                  placeholder="Ushbu dars nima haqida ekanligini yozing..."
                  value={lessonFormDesc}
                  onChange={(e) => setLessonFormDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Video Upload Area with Simulation */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Videoni Yuklash (Bunny HLS + DRM Suv Belgisi)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 text-center bg-slate-50">
                  {uploadState === 'IDLE' && (
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mx-auto">
                        <Upload className="w-4 h-4" />
                      </div>
                      <div className="text-xs text-slate-700 font-medium">
                        MP4, MOV yoki MKV formatdagi videoni tanlang
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Maksimal hajm: 4 GB. Yuklangach avtomatik dinamik talaba suv belgisi qo'yiladi.
                      </div>
                      <button
                        type="button"
                        onClick={handleSimulateVideoUpload}
                        className="mt-2 px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                      >
                        Faylni tanlash & Yuklash
                      </button>
                    </div>
                  )}

                  {(uploadState === 'UPLOADING' || uploadState === 'PROCESSING') && (
                    <div className="space-y-3 py-2">
                      <div className="text-xs font-semibold text-slate-900 flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                        {uploadState === 'UPLOADING' 
                          ? 'Video serverga yuklanmoqda...' 
                          : 'HLS formatga o\'girilmoqda & DRM shifrlanmoqda...'}
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-slate-900 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadPercent}%` }}
                        />
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {uploadPercent}% bajarildi
                      </div>
                    </div>
                  )}

                  {uploadState === 'DONE' && (
                    <div className="space-y-2 py-1">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-900">
                        Video muvaffaqiyatli yuklandi & himoyalandi!
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        Stream ID: bunny_vid_hls_948123 (1080p, 720p, 480p)
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadState('IDLE')}
                        className="text-[11px] text-blue-600 underline font-medium"
                      >
                        Boshqa video yuklash
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Stop-Lesson Switch */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Stop-Dars (Majburiy ko'rish)
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      O'quvchi belgilangan foizni ko'rmaguncha keyingi dars qulflanadi
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={lessonStopRequired}
                    onChange={(e) => setLessonStopRequired(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                </div>

                {lessonStopRequired && (
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Minimal tomosha foizi:</span>
                    <div className="flex items-center gap-1 font-mono">
                      <input
                        type="number"
                        min="50"
                        max="100"
                        value={lessonWatchPercent}
                        onChange={(e) => setLessonWatchPercent(Number(e.target.value))}
                        className="w-14 px-2 py-1 rounded border border-slate-200 bg-white text-center text-xs font-bold"
                      />
                      <span>%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Assignment Attachment */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Darsga Biriktiriladigan AI Topshiriq
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLessonAssignmentType('ESSAY')}
                    className={`p-2 rounded-md border text-center text-xs font-medium transition-colors ${
                      lessonAssignmentType === 'ESSAY'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ✍️ AI Essay
                  </button>
                  <button
                    type="button"
                    onClick={() => setLessonAssignmentType('SPEAKING')}
                    className={`p-2 rounded-md border text-center text-xs font-medium transition-colors ${
                      lessonAssignmentType === 'SPEAKING'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    🎤 AI Speaking
                  </button>
                  <button
                    type="button"
                    onClick={() => setLessonAssignmentType('QUIZ')}
                    className={`p-2 rounded-md border text-center text-xs font-medium transition-colors ${
                      lessonAssignmentType === 'QUIZ'
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    📝 Test Banki
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50">
              <button
                type="button"
                onClick={() => setActiveLessonDrawer(null)}
                className="px-3.5 py-1.5 rounded-md border border-slate-200 text-xs text-slate-600 hover:bg-white transition-colors"
              >
                Bekor Qilish
              </button>
              <button
                type="button"
                onClick={handleSaveLessonDrawer}
                className="px-4 py-1.5 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Module */}
      {showAddModuleModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg border border-slate-200 max-w-md w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">Yangi Modul Qo'shish</h3>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Modul Nomi
              </label>
              <input 
                type="text"
                placeholder="Masalan: 5-Modul: Advanced Collocations & Idioms"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowAddModuleModal(false)}
                className="px-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-600 hover:bg-slate-100"
              >
                Bekor qilish
              </button>
              <button 
                onClick={handleCreateModuleSubmit}
                className="px-4 py-1.5 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Yaratish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Course */}
      {showCreateCourseModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg border border-slate-200 max-w-md w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">+ Yangi Kurs Yaratish</h3>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Kurs Nomi
              </label>
              <input 
                type="text"
                placeholder="Masalan: IELTS General Training 7.5+ FastTrack"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Yo'nalish
                </label>
                <select
                  value={newCourseCategory}
                  onChange={(e) => setNewCourseCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-200 bg-white"
                >
                  <option value="IELTS">IELTS</option>
                  <option value="SAT">SAT</option>
                  <option value="ENGLISH">Ingliz Tili</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Asosiy Narxi (UZS)
                </label>
                <input
                  type="text"
                  value={newCoursePrice}
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-200 bg-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowCreateCourseModal(false)}
                className="px-3 py-1.5 rounded-md border border-slate-200 text-xs text-slate-600 hover:bg-slate-100"
              >
                Bekor qilish
              </button>
              <button 
                onClick={() => {
                  alert("Kurs yaratildi!");
                  setShowCreateCourseModal(false);
                }}
                className="px-4 py-1.5 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Kursni Yaratish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideoUrl && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 max-w-2xl w-full p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-900">Videodars Preview (DRM Himoya bilan)</span>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video bg-slate-900 rounded-md overflow-hidden relative flex items-center justify-center text-white">
              <div className="text-center space-y-2">
                <Video className="w-10 h-10 text-slate-500 mx-auto" />
                <div className="text-xs text-slate-300">
                  Bunny Stream DRM himoyalangan pleyer namoyishi
                </div>
                <div className="text-[11px] font-mono text-emerald-400">
                  Watermark: +998901234567 • ID: 74819
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="px-3.5 py-1.5 rounded-md bg-slate-900 text-white text-xs font-medium"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
