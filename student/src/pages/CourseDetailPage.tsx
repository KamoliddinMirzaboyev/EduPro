import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, ShieldCheck, Check, Users, Lock, ChevronDown } from 'lucide-react';
import { fetchCourseDetail, CourseDetail, formatUZS } from '../api/client';

interface CourseDetailPageProps {
  onOpenCheckoutModal: (course: CourseDetail) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ onOpenCheckoutModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchCourseDetail(slug)
        .then(c => {
          setCourse(c);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto w-full text-center space-y-4">
        <div className="h-8 w-64 bg-slate-200 dark:bg-white/10 rounded-xl mx-auto animate-pulse"></div>
        <div className="h-64 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold">Kurs topilmadi</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Katalogga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-5xl mx-auto w-full space-y-8">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Katalogga qaytish
      </button>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold">
            {course.category}
          </span>
          {course.has_drip_lock && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-mono">
              Stop-Lesson 🔒
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {course.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Hero Card with Instructor & Actions */}
      <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <img 
            src={course.teacher.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face'} 
            alt={course.teacher.full_name} 
            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-white/10 shrink-0"
          />
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              {course.teacher.full_name}
              {course.teacher.is_verified && <ShieldCheck className="w-4 h-4 text-blue-600" />}
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400">
              {course.teacher.specialization || "Professional Instruktor"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onOpenCheckoutModal(course)}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            Obuna bo'lish ({formatUZS(course.price)})
          </button>
          <button 
            onClick={() => navigate(`/classroom/${course.id}`)}
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Sinov darsi
          </button>
        </div>
      </div>

      {/* Syllabus Modules */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Kurs Dasturi (Syllabus)</h2>
        <div className="space-y-3">
          {course.modules.map((mod, modIdx) => {
            const isOpen = openModules[mod.id] ?? true;
            return (
              <div key={mod.id} className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenModules(prev => ({ ...prev, [mod.id]: !isOpen }))}
                  className="w-full px-5 py-4 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
                      {modIdx + 1}
                    </span>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {mod.title}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="divide-y divide-slate-100 dark:divide-white/5">
                    {mod.lessons.map((lesson, lIdx) => (
                      <div key={lesson.id} className="px-5 py-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                          <span className="font-mono text-slate-400">({lIdx + 1})</span>
                          <span>{lesson.title}</span>
                          {lesson.is_free_preview && (
                            <span className="px-1.5 py-0.2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-mono">
                              Bepul sinov
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                          <span>{Math.round(lesson.duration_seconds / 60)} daq</span>
                          {lesson.stop_lesson_required && <Lock className="w-3 h-3 text-amber-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
