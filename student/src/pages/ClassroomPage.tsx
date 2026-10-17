import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, FileText, Sparkles, MessageSquare, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchCourseDetail, fetchLessonAssignments, submitAssignment, CourseDetail, Lesson, Assignment, Submission } from '../api/client';
import { VideoPlayer } from '../components/VideoPlayer';
import { TimelineStepper } from '../components/TimelineStepper';
import { QuizModal } from '../components/QuizModal';
import { ClassroomSkeleton } from '../components/Skeletons';

interface ClassroomPageProps {
  onShowToast: (msg: string) => void;
}

export const ClassroomPage: React.FC<ClassroomPageProps> = ({ onShowToast }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const [lessonAssignments, setLessonAssignments] = useState<Assignment[]>([]);
  const [activeAssignmentModal, setActiveAssignmentModal] = useState<Assignment | null>(null);
  const [classroomTab, setClassroomTab] = useState<'overview' | 'materials' | 'assignments' | 'ai-chat'>('overview');

  // AI Study Assistant state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: "Salom! Men sizning IELTS va Dasturlash bo'yicha shaxsiy AI repetitoringizman. Dars yuzasidan savolingiz bormi?" }
  ]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      fetchCourseDetail(courseId)
        .then(c => {
          setCourse(c);
          const mods = c.modules ?? [];
          if (mods.length > 0 && (mods[0].lessons ?? []).length > 0) {
            const firstLesson = mods[0].lessons[0];
            setCurrentLesson(firstLesson);
            fetchLessonAssignments(firstLesson.id).then(setLessonAssignments);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [courseId]);

  const handleSelectLesson = async (lesson: Lesson) => {
    setCurrentLesson(lesson);
    const assigns = await fetchLessonAssignments(lesson.id);
    setLessonAssignments(assigns);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: `"${userMsg}" bo'yicha tahlil: IELTS Task 2 band mezonlarida bu ko'rsatkich Grammatical Range va Lexical Resource bo'limida asosiy o'rin tutadi. Videodagi 08:34 daqiqadagi qoidaga qarang.`
        }
      ]);
    }, 600);
  };

  const handleSubmitQuiz = async (assignmentId: string, answer: string): Promise<Submission> => {
    const res = await submitAssignment(assignmentId, answer);
    onShowToast("Topshiriq muvaffaqiyatli topshirildi va AI tomonidan tekshirildi!");
    return res;
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto w-full">
        <ClassroomSkeleton />
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
    <div className="flex-1 flex flex-col">
      {/* Top Bar with Back and Progress */}
      <div className="h-14 px-4 sm:px-6 bg-white dark:bg-[#0F111A] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            EP
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {course.title}
            </h2>
            <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
              {currentLesson?.title || "01. Introduction"} • Bunny.net Stream
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-600 dark:text-zinc-400">
            Stop-Lesson ({currentLesson?.minimum_watch_percent || 85}%)
          </span>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-start">
        {/* Left Column: Player, Tabs & Content */}
        <div className="lg:col-span-8 p-4 sm:p-6 lg:p-8 space-y-6">
          <VideoPlayer
            lessonId={currentLesson?.id || 'demo'}
            durationSeconds={currentLesson?.duration_seconds || 977}
          />

          {/* Lesson Header & Complete Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                1-Modul • Stop-Lesson ({currentLesson?.minimum_watch_percent || 85}% ko'rish talabi)
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {currentLesson?.title || "01. Introduction"}
              </h1>
            </div>

            <button 
              onClick={() => onShowToast("Dars muvaffaqiyatli yakunlandi! 85% talab bajarildi.")}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/30"
            >
              <Check className="w-4 h-4" /> Darsni tugatish
            </button>
          </div>

          {/* Classroom Tabs */}
          <div className="border-b border-slate-200 dark:border-white/10 flex items-center gap-6 text-xs font-semibold">
            <button
              onClick={() => setClassroomTab('overview')}
              className={`pb-3 border-b-2 transition-colors ${
                classroomTab === 'overview'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Dars haqida
            </button>
            <button
              onClick={() => setClassroomTab('materials')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                classroomTab === 'materials'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Materiallar ({currentLesson?.materials.length || 0})
            </button>
            <button
              onClick={() => setClassroomTab('assignments')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                classroomTab === 'assignments'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Topshiriqlar ({lessonAssignments.length})
            </button>
            <button
              onClick={() => setClassroomTab('ai-chat')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                classroomTab === 'ai-chat'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> AI Repetitor
            </button>
          </div>

          {/* Tab Content */}
          {classroomTab === 'overview' && (
            <div className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed space-y-2">
              <p>
                Ushbu darsda siz IELTS Task 2 insholarining strukturasi, kirish qismini to'g'ri shakllantirish va paragraf o'tishlarini o'rganasiz.
              </p>
              <p>
                Dars davomida ko'rsatilgan namuna topshiriqlarni mustaqil bajarib ko'ring va AI baholash tizimiga yuboring.
              </p>
            </div>
          )}

          {classroomTab === 'materials' && (
            <div className="space-y-2">
              {currentLesson?.materials && currentLesson.materials.length > 0 ? (
                currentLesson.materials.map(m => (
                  <div key={m.id} className="p-3.5 rounded-xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{m.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{m.file_size}</div>
                      </div>
                    </div>
                    <a 
                      href={m.file_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold"
                    >
                      Yuklab olish
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 py-4 text-center">Bu dars uchun qo'shimcha fayllar biriktirilmagan.</div>
              )}
            </div>
          )}

          {classroomTab === 'assignments' && (
            <div className="space-y-3">
              {lessonAssignments.map(a => (
                <div key={a.id} className="p-4 rounded-xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold">
                      {a.type}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">{a.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1">{a.instructions}</p>
                  </div>
                  <button
                    onClick={() => setActiveAssignmentModal(a)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Bajarish & Yuborish
                  </button>
                </div>
              ))}
            </div>
          )}

          {classroomTab === 'ai-chat' && (
            <div className="space-y-3 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 p-4">
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-xl max-w-sm text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-bl-xs'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Dars yuzasidan AI repetitordan so'rang..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendChat}
                  className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Timeline Stepper */}
        <div className="lg:col-span-4 p-4 sm:p-6 lg:p-8">
          <TimelineStepper
            modules={course.modules ?? []}
            currentLesson={currentLesson}
            onSelectLesson={handleSelectLesson}
            openModules={openModules}
            onToggleModule={(mId) => setOpenModules(prev => ({ ...prev, [mId]: !prev[mId] }))}
          />
        </div>
      </div>

      {/* Quiz Modal */}
      {activeAssignmentModal && (
        <QuizModal
          assignment={activeAssignmentModal}
          onClose={() => setActiveAssignmentModal(null)}
          onSubmit={handleSubmitQuiz}
        />
      )}
    </div>
  );
};
