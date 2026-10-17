import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ChevronRight, 
  Send, 
  Bot, 
  Award,
  HelpCircle
} from 'lucide-react';

interface AssignmentHubItem {
  id: string;
  courseTitle: string;
  lessonTitle: string;
  deadline: string;
  isUrgent: boolean;
  status: 'SUBMITTED' | 'AI_REVIEWED' | 'TEACHER_REVIEWED' | 'PENDING';
  score?: number;
  maxScore: number;
  submittedAt?: string;
  studentAnswerText?: string;
  aiGrammarFeedback?: string;
  aiVocabularyFeedback?: string;
  teacherFeedback?: string;
}

interface AssignmentsHubPageProps {
  onShowToast: (msg: string) => void;
}

export const AssignmentsHubPage: React.FC<AssignmentsHubPageProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed'>('reviewed');

  const [assignments, setAssignments] = useState<AssignmentHubItem[]>([
    {
      id: 'asg-1',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      lessonTitle: 'Writing Task 2: Environmental Problems & Solutions',
      deadline: 'Ertaga, 23:59 gacha',
      isUrgent: true,
      status: 'TEACHER_REVIEWED',
      score: 7.0,
      maxScore: 9.0,
      submittedAt: 'Kecha, 21:15',
      studentAnswerText: 'Global warming represents one of the most pressing dilemmas of contemporary society. While some individuals argue that technological advancement alone will mitigate ecological degradation...',
      aiGrammarFeedback: 'Strong grammatical range with complex conditional structures. Minor punctuation error on line 4 (comma splice avoided).',
      aiVocabularyFeedback: 'Excellent lexical resource: "pressing dilemmas", "contemporary society", "mitigate degradation" used accurately.',
      teacherFeedback: 'Juda yaxshi insho! Fikrlar ketma-ketligi ravshan. Xulosa qismida yana bir yechim keltirsangiz Band 7.5 ga yetardi.'
    },
    {
      id: 'asg-2',
      courseTitle: 'IELTS Band 8.0: Intensive Writing & Speaking',
      lessonTitle: 'Writing Task 1: Bar Chart & Trend Analysis',
      deadline: '3 kun qoldi',
      isUrgent: false,
      status: 'AI_REVIEWED',
      score: 6.5,
      maxScore: 9.0,
      submittedAt: '12 Oktabr',
      studentAnswerText: 'The bar chart illustrates the proportion of renewable energy consumption across four European nations between 2010 and 2025...',
      aiGrammarFeedback: 'Passive voice correctly applied in data description. Past tense consistency maintained.',
      aiVocabularyFeedback: 'Consider replacing "went up" with "witnessed a steady upward trajectory".',
      teacherFeedback: 'Kurator tez orada ko‘rib chiqadi.'
    },
    {
      id: 'asg-3',
      courseTitle: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      lessonTitle: 'Async Endpoints & Pydantic Schema Validation',
      deadline: 'Bugun, 20:00 gacha',
      isUrgent: true,
      status: 'PENDING',
      maxScore: 100,
    }
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentHubItem | null>(assignments[0]);

  // Score progression data
  const scoreProgression = [
    { week: '1-Hafta', score: 5.5, label: 'Boshlang‘ich' },
    { week: '2-Hafta', score: 6.0, label: 'Grammatika o‘sishi' },
    { week: '3-Hafta', score: 6.5, label: 'Leksik boylik' },
    { week: '4-Hafta', score: 7.0, label: 'Joriy Band Ball' },
  ];

  const pendingList = assignments.filter(a => a.status === 'PENDING');
  const reviewedList = assignments.filter(a => a.status !== 'PENDING');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-1">
            <Bot className="w-3.5 h-3.5" /> AI Feedback & Diagnostic Hub
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Mening Vazifalarim va AI Tahlillar</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Barcha uyga vazifalar, yaqinlashayotgan deadlinelar va insho/speaking bo'yicha shaxsiy xatolar tahlili
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('reviewed')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviewed'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Tekshirilgan Tahlillar ({reviewedList.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Topshirilishi Kerak ({pendingList.length})
          </button>
        </div>
      </div>

      {/* Progress Dynamic Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> O'sish Dinamikasi
            </span>
            <h3 className="text-sm font-bold text-white mt-1">
              Writing & Speaking Natijasi: 5.5 dan 7.0 ga ko'tarildi (+1.5 Band)
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-xl self-start sm:self-center">
            Top 5% talabalar safida
          </span>
        </div>

        {/* Timeline progression bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {scoreProgression.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-zinc-400 font-mono">{step.week}</div>
              <div className="text-xl font-bold font-mono text-white mt-0.5">Band {step.score}</div>
              <div className="text-[10px] text-blue-400 font-medium mt-1">{step.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace: Left List, Right Diagnostic Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {activeTab === 'reviewed' ? 'Tekshirilgan Topshiriqlar' : 'Kutilayotgan Deadlinelar'}
          </h3>

          {(activeTab === 'reviewed' ? reviewedList : pendingList).map((asg) => (
            <div
              key={asg.id}
              onClick={() => setSelectedAssignment(asg)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedAssignment?.id === asg.id
                  ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-xs'
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  asg.status === 'TEACHER_REVIEWED'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                    : asg.status === 'AI_REVIEWED'
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                }`}>
                  {asg.status === 'TEACHER_REVIEWED' ? 'Ustoz Tekshirdi' : asg.status === 'AI_REVIEWED' ? 'AI Tekshirdi' : 'Kutilmoqda'}
                </span>

                {asg.score && (
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                    Ball: <strong className="text-blue-600 dark:text-blue-400">{asg.score}</strong> / {asg.maxScore}
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                {asg.lessonTitle}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 line-clamp-1">
                {asg.courseTitle}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {asg.deadline}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-sans font-semibold">Batafsil →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Diagnostic Window */}
        <div className="lg:col-span-2">
          {selectedAssignment ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedAssignment.lessonTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    {selectedAssignment.courseTitle}
                  </p>
                </div>
                {selectedAssignment.score && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Umumiy Natija:</span>
                    <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm shadow-xs">
                      {selectedAssignment.score} / {selectedAssignment.maxScore}
                    </span>
                  </div>
                )}
              </div>

              {/* Student Submission Text */}
              {selectedAssignment.studentAnswerText && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Siz Topshirgan Matn / Insho:
                  </span>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-sans">
                    {selectedAssignment.studentAnswerText}
                  </div>
                </div>
              )}

              {/* AI Diagnostic Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" /> AI Xatolar Tahlili va Tavsiyalar
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20 space-y-1.5">
                    <span className="font-bold text-blue-600 dark:text-blue-400 block text-[11px] uppercase">
                      Grammar & Syntax Tahlili
                    </span>
                    <p className="text-slate-700 dark:text-zinc-300 text-[11px] leading-relaxed">
                      {selectedAssignment.aiGrammarFeedback || "Grammatik xatolar aniqlanmadi."}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-1.5">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[11px] uppercase">
                      Lexical Resource (So'z Boyligi)
                    </span>
                    <p className="text-slate-700 dark:text-zinc-300 text-[11px] leading-relaxed">
                      {selectedAssignment.aiVocabularyFeedback || "Akademik so'zlar me'yorida ishlatilgan."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Teacher Mentor Feedback */}
              {selectedAssignment.teacherFeedback && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" /> Ustoz / Kurator Izohi:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed italic">
                    "{selectedAssignment.teacherFeedback}"
                  </p>
                </div>
              )}

              {/* Action */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onShowToast("AI tyutorga savol yo'llash oynasi ochildi")}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Bot className="w-4 h-4" /> AI Tyutordan Ushbu Xatolarni So'rash
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 text-slate-400 text-xs">
              Topshiriqni tanlang
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
