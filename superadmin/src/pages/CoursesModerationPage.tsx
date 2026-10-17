import React from 'react';
import { CourseItem, formatUZS } from '../api/client';
import { CourseSkeletonGrid } from '../components/Skeletons';

interface CoursesModerationPageProps {
  courses: CourseItem[];
  loading: boolean;
  searchQuery: string;
  onModerateCourse: (id: string, status: 'PUBLISHED' | 'DRAFT') => Promise<void>;
}

export const CoursesModerationPage: React.FC<CoursesModerationPageProps> = ({
  courses,
  loading,
  searchQuery,
  onModerateCourse,
}) => {
  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.teacher.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Kurslar Moderatsiyasi</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Yangi yaratilgan kurslarni ko'rib chiqish va marketpleysga chiqarish</p>
        </div>
      </div>

      {loading ? (
        <CourseSkeletonGrid count={3} />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredCourses.map((c) => (
            <div 
              key={c.id} 
              className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-500/50 transition-all shadow-sm"
            >
              <div className="flex items-start gap-4">
                <img 
                  src={c.thumbnail_url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&fit=crop'} 
                  alt={c.title}
                  className="w-24 h-16 rounded-xl border border-slate-200 dark:border-white/10 object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                      {c.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium ${
                      c.status === 'PUBLISHED' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40' 
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40'
                    }`}>
                      {c.status}
                    </span>
                    {c.has_drip_lock && (
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Drip Lock 🔒</span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">{c.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{c.description}</p>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 flex items-center gap-3">
                    <span>Ustoz: <strong className="text-slate-900 dark:text-white">{c.teacher.full_name}</strong></span>
                    <span>•</span>
                    <span className="font-mono">{formatUZS(c.price)}</span>
                    <span>•</span>
                    <span>{c.total_modules || 3} modullar</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {c.status === 'PENDING_REVIEW' ? (
                  <>
                    <button 
                      onClick={() => onModerateCourse(c.id, 'DRAFT')}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      Qaytarish
                    </button>
                    <button 
                      onClick={() => onModerateCourse(c.id, 'PUBLISHED')}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-colors shadow-sm"
                    >
                      Tasdiqlash & Nashr etish
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => onModerateCourse(c.id, 'DRAFT')}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Qoralamaga o'tkazish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
