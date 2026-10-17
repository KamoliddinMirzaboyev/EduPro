import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Sliders, 
  Plus, 
  CheckCircle2, 
  FileText, 
  Volume2, 
  Edit3, 
  Trash2, 
  Layers, 
  Save, 
  Zap,
  Check
} from 'lucide-react';

interface QuestionItem {
  id: string;
  type: 'MULTIPLE_CHOICE' | 'GAP_FILL' | 'AUDIO_SPEAKING';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  lessonTitle: string;
  isStopTest: boolean;
}

interface QuizBuilderPageProps {
  onShowToast: (msg: string) => void;
}

export const QuizBuilderPage: React.FC<QuizBuilderPageProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'bank' | 'ai-generator' | 'rubrics'>('bank');

  // Questions Bank state
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: 'q-1',
      type: 'MULTIPLE_CHOICE',
      prompt: 'Which cohesive device best introduces an opposing viewpoint in academic writing?',
      options: ['Furthermore', 'Conversely', 'Consequently', 'In addition'],
      correctAnswer: 'Conversely',
      lessonTitle: 'IELTS Writing: Essay Cohesion',
      isStopTest: true,
    },
    {
      id: 'q-2',
      type: 'GAP_FILL',
      prompt: 'The government should invest in public transport to [...] traffic congestion.',
      correctAnswer: 'alleviate',
      lessonTitle: 'IELTS Vocabulary: Urban Issues',
      isStopTest: false,
    },
    {
      id: 'q-3',
      type: 'AUDIO_SPEAKING',
      prompt: 'Describe an environmental issue that your country is facing. Speak for 90 seconds.',
      correctAnswer: 'Speech recognition audio evaluation',
      lessonTitle: 'Speaking Part 2: Environmental Topics',
      isStopTest: true,
    },
    {
      id: 'q-4',
      type: 'MULTIPLE_CHOICE',
      prompt: 'In Django Ninja, which decorator is used to define an asynchronous POST endpoint?',
      options: ['@api.get', '@api.post', '@router.async_post', '@ninja.view'],
      correctAnswer: '@api.post',
      lessonTitle: 'Django Ninja: Async Endpoints',
      isStopTest: true,
    }
  ]);

  // AI Generator state
  const [selectedLessonForAI, setSelectedLessonForAI] = useState('IELTS Writing: Essay Cohesion');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(15);
  const [generatedPreview, setGeneratedPreview] = useState<Array<{ prompt: string; options: string[]; answer: string }>>([]);

  // Rubric Settings state
  const [rubricStrictness, setRubricStrictness] = useState<'lenient' | 'moderate' | 'strict'>('strict');
  const [grammarWeight, setGrammarWeight] = useState(30);
  const [vocabularyWeight, setVocabularyWeight] = useState(30);
  const [coherenceWeight, setCoherenceWeight] = useState(25);
  const [taskResponseWeight, setTaskResponseWeight] = useState(15);

  const handleGenerateAI = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      setGeneratedPreview([
        {
          prompt: 'What is the primary function of a thesis statement in an agree/disagree essay?',
          options: ['To ask rhetorical questions', 'To clearly state the writer’s position', 'To cite external references', 'To introduce counterarguments only'],
          answer: 'To clearly state the writer’s position'
        },
        {
          prompt: 'Identify the collocation: "The proposal met with fierce [...]"',
          options: ['resistance', 'complaint', 'fight', 'dispute'],
          answer: 'resistance'
        },
        {
          prompt: 'Which word has the closest meaning to "paramount" in Task 2 context?',
          options: ['trivial', 'vital/utmost', 'negligible', 'temporary'],
          answer: 'vital/utmost'
        }
      ]);
      onShowToast("AI video transkriptini tahlil qildi va 15 ta test savolini yaratdi!");
    }, 1200);
  };

  const handleApplyAITests = () => {
    const newItems: QuestionItem[] = generatedPreview.map((item, idx) => ({
      id: `ai-q-${Date.now()}-${idx}`,
      type: 'MULTIPLE_CHOICE',
      prompt: item.prompt,
      options: item.options,
      correctAnswer: item.answer,
      lessonTitle: selectedLessonForAI,
      isStopTest: true
    }));

    setQuestions([...newItems, ...questions]);
    setGeneratedPreview([]);
    setActiveTab('bank');
    onShowToast("Yaratilgan testlar savollar bankiga muvaffaqiyatli qo'shildi!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Test va Savollar Banki</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Avtomatlashtirilgan testlar, 1-Click AI generator va insho/speaking rubrika sozlamalari
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'bank'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Savollar Banki ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('ai-generator')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'ai-generator'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> 1-Click AI Generator
          </button>
          <button
            onClick={() => setActiveTab('rubrics')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'rubrics'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> AI Rubrika Sozlamasi
          </button>
        </div>
      </div>

      {/* Tab 1: Questions Bank */}
      {activeTab === 'bank' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-zinc-400">
              Jami savollar soni: <strong className="text-slate-900 dark:text-white font-mono">{questions.length} ta</strong>
            </span>
            <button
              onClick={() => onShowToast("Yangi savol tuzish oynasi ochildi")}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Yangi Savol Qo'shish
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-white/20 transition-all"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase ${
                      q.type === 'MULTIPLE_CHOICE'
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                        : q.type === 'GAP_FILL'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                        : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40'
                    }`}>
                      {q.type === 'MULTIPLE_CHOICE' ? 'Variantli Test' : q.type === 'GAP_FILL' ? 'Bo‘sh joy to‘ldirish' : 'Speaking Audio'}
                    </span>
                    {q.isStopTest && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
                        Stop-Test (Majburiy)
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-sans">
                      Dars: <strong className="text-slate-600 dark:text-zinc-300">{q.lessonTitle}</strong>
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {q.prompt}
                  </p>

                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">To'g'ri javob:</span>
                    <span className="font-mono bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-slate-800 dark:text-zinc-200">
                      {q.correctAnswer}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <button
                    onClick={() => onShowToast(`"${q.prompt.slice(0, 20)}..." tahrirlanmoqda`)}
                    className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setQuestions(questions.filter(item => item.id !== q.id));
                      onShowToast("Savol o'chirildi");
                    }}
                    className="p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: 1-Click AI Generator */}
      {activeTab === 'ai-generator' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" /> 1-Click AI Quiz Generator
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Dars Videosi Transkriptidan Avtomatik Test Yaratish
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              OpenAI Whisper dars videosidagi nutqni matnga aylantiradi va GPT-4o avtomatik tarzda mavzuga oid asosiy tushunchalarni tekshiruvchi 15 ta variantli test savollarini tuzib beradi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1 font-semibold">
                  Kurs Darsini Tanlang
                </label>
                <select
                  value={selectedLessonForAI}
                  onChange={(e) => setSelectedLessonForAI(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-medium"
                >
                  <option value="IELTS Writing: Essay Cohesion">IELTS Writing: Essay Cohesion</option>
                  <option value="Django Ninja: Async Endpoints">Django Ninja: Async Endpoints</option>
                  <option value="Speaking Part 2: Environmental Topics">Speaking Part 2: Environmental Topics</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1 font-semibold">
                  Tuziladigan Savollar Soni
                </label>
                <input
                  type="number"
                  value={generatedCount}
                  onChange={(e) => setGeneratedCount(parseInt(e.target.value) || 15)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-mono font-semibold"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateAI}
              disabled={aiGenerating}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              {aiGenerating ? "AI transkriptni o'rganmoqda..." : "1-Click bilan Testlarni Yaratish"}
            </button>
          </div>

          {/* Generated Preview */}
          {generatedPreview.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  AI Yaratgan Testlar Namunalari ({generatedPreview.length} ta)
                </h3>
                <button
                  onClick={handleApplyAITests}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" /> Bankka Qo'shish va Saqlash
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {generatedPreview.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/20 space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {i + 1}. {item.prompt}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {item.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg border font-mono ${
                            opt === item.answer
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                              : 'border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] text-slate-600 dark:text-zinc-400'
                          }`}
                        >
                          {opt} {opt === item.answer && '✓ (To‘g‘ri javob)'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: AI Rubric Settings */}
      {activeTab === 'rubrics' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              AI Auto-Grader Rubrika va Qat'iylik Mezonlari
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Talabalarning insho (Writing) va og'zaki nutqini (Speaking) tekshirishda AI ning qanchalik qattiqqo'l bo'lishini va baholash parametrlarini sozlang.
            </p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-2">
                Tekshirish Qat'iyligi (Strictness Mode)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'lenient', label: 'Yumshoq', desc: 'Rag‘batlantiruvchi' },
                  { key: 'moderate', label: 'Standart', desc: 'Haqiqiy imtihon darajasi' },
                  { key: 'strict', label: 'Qattiqqo‘l', desc: 'Har bir nuansga e’tibor' }
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setRubricStrictness(m.key as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      rubricStrictness === m.key
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{m.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Baholash Mezonlari Taqsimoti (% da)
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold">
                    <span className="text-slate-700 dark:text-zinc-300">Grammar & Syntax Accuracy</span>
                    <span className="font-mono text-blue-600">{grammarWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={grammarWeight}
                    onChange={(e) => setGrammarWeight(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold">
                    <span className="text-slate-700 dark:text-zinc-300">Lexical Resource & Vocabulary</span>
                    <span className="font-mono text-blue-600">{vocabularyWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={vocabularyWeight}
                    onChange={(e) => setVocabularyWeight(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold">
                    <span className="text-slate-700 dark:text-zinc-300">Coherence & Cohesion</span>
                    <span className="font-mono text-blue-600">{coherenceWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={coherenceWeight}
                    onChange={(e) => setCoherenceWeight(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold">
                    <span className="text-slate-700 dark:text-zinc-300">Task Response / Completion</span>
                    <span className="font-mono text-blue-600">{taskResponseWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={taskResponseWeight}
                    onChange={(e) => setTaskResponseWeight(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onShowToast("AI rubrika sozlamalari muvaffaqiyatli yangilandi!")}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-4 h-4" /> Sozlamalarni Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
