import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { Assignment, Submission } from '../api/client';

interface QuizModalProps {
  assignment: Assignment | null;
  onClose: () => void;
  onSubmit: (assignmentId: string, answer: string) => Promise<Submission>;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  assignment,
  onClose,
  onSubmit,
}) => {
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Submission | null>(null);

  if (!assignment) return null;

  const handleSubmit = async () => {
    if (!answerText.trim()) return;
    setSubmitting(true);
    try {
      const sub = await onSubmit(assignment.id, answerText);
      setResult(sub);
    } catch (e) {
      alert("Topshiriq yuborishda xatolik!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-xl w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{assignment.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed bg-slate-50 dark:bg-white/[0.02] p-3.5 rounded-xl border border-slate-200 dark:border-white/10">
          <strong>Topshiriq sharti:</strong> {assignment.instructions}
        </div>

        {!result ? (
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-900 dark:text-white">
              Javobingizni yozing (Insho yoki tahlil):
            </label>
            <textarea
              rows={8}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Inshongizni shu yerga kiriting..."
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#151824] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
            ></textarea>
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
              <span>So'zlar: {answerText.split(/\s+/).filter(Boolean).length}</span>
              <button
                onClick={handleSubmit}
                disabled={submitting || !answerText.trim()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-md shadow-blue-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? "AI Baholamoqda..." : "Yuborish & AI Bahosi"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200 dark:border-blue-800/40">
                <span className="font-semibold text-blue-900 dark:text-blue-300">AI Auto-Grader Natijasi:</span>
                <span className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">
                  Band {result.ai_suggested_score || 7.5}
                </span>
              </div>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Topshirig'ingiz qabul qilindi va AI tomonidan tahlil qilindi. To'liq bahoni ustoz tasdiqlagach ko'rishingiz mumkin.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-semibold"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
