import React from 'react';
import { ChevronDown, Play, Lock } from 'lucide-react';
import { Module, Lesson } from '../api/client';

interface TimelineStepperProps {
  modules: Module[];
  currentLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
  openModules: Record<string, boolean>;
  onToggleModule: (moduleId: string) => void;
}

export const TimelineStepper: React.FC<TimelineStepperProps> = ({
  modules,
  currentLesson,
  onSelectLesson,
  openModules,
  onToggleModule,
}) => {
  return (
    <div className="bg-white dark:bg-[#0D0E16] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
          Kurs dasturi
        </h3>
        <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">
          {modules.reduce((acc, m) => acc + m.lessons.length, 0)} ta dars
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {modules.map((mod, modIdx) => {
          const isOpen = openModules[mod.id] ?? true;
          return (
            <div key={mod.id} className="space-y-1">
              <button 
                onClick={() => onToggleModule(mod.id)}
                className="w-full px-4 py-3 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-[10px] flex items-center justify-center font-bold">
                    {modIdx + 1}
                  </span>
                  <span className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {mod.title}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-2 pb-2 space-y-1">
                  {mod.lessons.map((lesson, lesIdx) => {
                    const isCurrent = currentLesson?.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-full px-3 py-2.5 rounded-xl text-left text-xs flex items-center justify-between transition-all ${
                          isCurrent
                            ? 'bg-blue-600 text-white font-semibold shadow-xs'
                            : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                            isCurrent
                              ? 'bg-white text-blue-700 font-bold'
                              : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-400'
                          }`}>
                            ({lesIdx + 1})
                          </span>
                          <span className="truncate">{lesson.title}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {lesson.stop_lesson_required ? (
                            <Lock className={`w-3 h-3 ${isCurrent ? 'text-white' : 'text-amber-500'}`} />
                          ) : (
                            <Play className={`w-3 h-3 fill-current ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
