import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { Submission } from '../api/client';
import { SideBySideSkeleton } from '../components/Skeletons';

interface InboxPageProps {
  submissions: Submission[];
  loading: boolean;
  onReview: (id: string, score: number, feedback: string) => Promise<void>;
}

export const InboxPage: React.FC<InboxPageProps> = ({ submissions, loading, onReview }) => {
  const [inboxFilter, setInboxFilter] = useState<'ALL' | 'PENDING' | 'AI_GRADED' | 'TEACHER_REVIEWED'>('ALL');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [mobileInboxView, setMobileInboxView] = useState<'essay' | 'ai'>('essay');
  const [teacherScoreInput, setTeacherScoreInput] = useState<number>(7.5);
  const [teacherFeedbackInput, setTeacherFeedbackInput] = useState<string>('');

  const filteredSubmissions = submissions.filter(s => {
    if (inboxFilter === 'ALL') return true;
    return s.status === inboxFilter;
  });

  const activeSubmission = selectedSubmission || (filteredSubmissions.length > 0 ? filteredSubmissions[0] : null);

  const handleSelectSubmission = (s: Submission) => {
    setSelectedSubmission(s);
    setTeacherScoreInput(s.final_score || s.ai_suggested_score || 7.5);
    setTeacherFeedbackInput(s.teacher_feedback || '');
  };

  const handleApproveAIScore = async () => {
    if (!activeSubmission) return;
    const score = activeSubmission.ai_suggested_score || 7.5;
    const feedback = teacherFeedbackInput || "AI tavsiya qilgan baholash to'liq tasdiqlandi. Ajoyib natija!";
    await onReview(activeSubmission.id, score, feedback);
  };

  const handleCustomReview = async () => {
    if (!activeSubmission) return;
    await onReview(activeSubmission.id, teacherScoreInput, teacherFeedbackInput);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI-Assisted Homework Assessment Inbox
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            IELTS 4 Band Descriptors bo'yicha sun'iy intellekt tahlili va ustoz tasdig'i (Side-by-Side)
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-1 rounded-xl text-xs overflow-x-auto max-w-full shadow-sm">
          {(['ALL', 'PENDING', 'AI_GRADED', 'TEACHER_REVIEWED'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setInboxFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                inboxFilter === tab 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab === 'ALL' ? 'Barchasi' : tab === 'AI_GRADED' ? 'AI Baholagan' : tab === 'PENDING' ? 'Kutilmoqda' : 'Tasdiqlangan'}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View Switcher */}
      <div className="flex lg:hidden items-center bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
        <button
          onClick={() => setMobileInboxView('essay')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
            mobileInboxView === 'essay'
              ? 'bg-white dark:bg-[#0F111A] text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-zinc-400'
          }`}
        >
          Talaba Inshosi
        </button>
        <button
          onClick={() => setMobileInboxView('ai')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
            mobileInboxView === 'ai'
              ? 'bg-white dark:bg-[#0F111A] text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-zinc-400'
          }`}
        >
          AI Xulosasi & Baholash
        </button>
      </div>

      {loading ? (
        <SideBySideSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Submissions Selector & Student Essay */}
          <div className={`${mobileInboxView === 'essay' ? 'block' : 'hidden'} lg:block lg:col-span-6 space-y-4`}>
            <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-2.5 flex gap-2 overflow-x-auto shadow-sm">
              {filteredSubmissions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSubmission(s)}
                  className={`px-3 py-2 rounded-xl text-left text-xs shrink-0 border transition-all ${
                    activeSubmission?.id === s.id 
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold' 
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#151824] text-slate-600 dark:text-zinc-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-semibold text-slate-900 dark:text-white">{s.student.full_name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono mt-0.5">{s.status}</div>
                </button>
              ))}
            </div>

            {activeSubmission && (
              <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                      {activeSubmission.assignment_type}
                    </span>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white mt-1">
                      {activeSubmission.assignment_title}
                    </h3>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                      Talaba: <strong className="text-slate-900 dark:text-white">{activeSubmission.student.full_name}</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 dark:text-zinc-400">So'zlar soni</div>
                    <div className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                      {activeSubmission.text_answer ? activeSubmission.text_answer.split(/\s+/).filter(Boolean).length : 0}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-wrap bg-slate-50 dark:bg-white/[0.02] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                  {activeSubmission.text_answer}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: AI Auto-Grader Draft & Action */}
          <div className={`${mobileInboxView === 'ai' ? 'block' : 'hidden'} lg:block lg:col-span-6 space-y-4`}>
            {activeSubmission && (
              <div className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-5 space-y-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">AI Auto-Grader Baholash Xulosasi</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-zinc-400">AI Tavsiya:</span>
                    <span className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                      Band {activeSubmission.ai_suggested_score || 7.5}
                    </span>
                  </div>
                </div>

                {/* 4 Rubric Criteria Breakdown */}
                {activeSubmission.ai_feedback_json?.criteria && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                      <div className="flex justify-between font-semibold text-slate-900 dark:text-white mb-1">
                        <span>Task Response</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">{activeSubmission.ai_feedback_json.criteria.task_response?.score}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2">
                        {activeSubmission.ai_feedback_json.criteria.task_response?.comment}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                      <div className="flex justify-between font-semibold text-slate-900 dark:text-white mb-1">
                        <span>Coherence & Cohesion</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">{activeSubmission.ai_feedback_json.criteria.coherence_cohesion?.score}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2">
                        {activeSubmission.ai_feedback_json.criteria.coherence_cohesion?.comment}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                      <div className="flex justify-between font-semibold text-slate-900 dark:text-white mb-1">
                        <span>Lexical Resource</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">{activeSubmission.ai_feedback_json.criteria.lexical_resource?.score}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2">
                        {activeSubmission.ai_feedback_json.criteria.lexical_resource?.comment}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                      <div className="flex justify-between font-semibold text-slate-900 dark:text-white mb-1">
                        <span>Grammar & Accuracy</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">{activeSubmission.ai_feedback_json.criteria.grammatical_range_accuracy?.score}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2">
                        {activeSubmission.ai_feedback_json.criteria.grammatical_range_accuracy?.comment}
                      </p>
                    </div>
                  </div>
                )}

                {/* Highlighted Corrections with Explanations */}
                {activeSubmission.ai_feedback_json?.highlighted_corrections && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">AI Tuzatishlari va Grammatika:</div>
                    <div className="space-y-2">
                      {activeSubmission.ai_feedback_json.highlighted_corrections.map((item: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="line-through text-red-600 bg-red-50 dark:bg-red-950/30 px-1 py-0.5 rounded font-mono text-[11px]">
                              {item.original}
                            </span>
                            <span className="text-slate-400">→</span>
                            <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1 py-0.5 rounded font-mono font-semibold text-[11px]">
                              {item.correction}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400 ml-auto font-mono">{item.category}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400">{item.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Teacher Action Controls */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                  <div className="grid grid-cols-4 gap-3 items-center">
                    <div className="col-span-1">
                      <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Yakuniy Band</label>
                      <input 
                        type="number" 
                        step="0.5" 
                        min="1" 
                        max="9" 
                        value={teacherScoreInput}
                        onChange={(e) => setTeacherScoreInput(parseFloat(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-mono font-bold"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Ustoz Sharhi (Feedback)</label>
                      <input 
                        type="text" 
                        value={teacherFeedbackInput}
                        onChange={(e) => setTeacherFeedbackInput(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs"
                        placeholder="Qo'shimcha izoh qoldiring..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button 
                      onClick={handleApproveAIScore}
                      className="flex-1 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Check className="w-4 h-4" /> 1-Click AI Bahosini Tasdiqlash
                    </button>
                    <button 
                      onClick={handleCustomReview}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      Tahrirlab Saqlash
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
