import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { CurriculumPage } from './pages/CurriculumPage';
import { InboxPage } from './pages/InboxPage';
import { CrmPage } from './pages/CrmPage';
import { FinancePage } from './pages/FinancePage';
import { LiveStudioPage } from './pages/LiveStudioPage';
import { QuizBuilderPage } from './pages/QuizBuilderPage';
import { TeamCuratorsPage } from './pages/TeamCuratorsPage';
import { MediaLibraryPage } from './pages/MediaLibraryPage';
import { FunnelsPage } from './pages/FunnelsPage';
import { 
  fetchCourses, 
  fetchCourseDetail, 
  addModule, 
  addLesson, 
  fetchSubmissions, 
  reviewSubmission, 
  fetchCRMStudents, 
  sendTelegramReminder,
  createPayout,
  CourseDetail,
  Submission,
  CRMStudent
} from './api/client';

export function App() {
  const [courses, setCourses] = useState<CourseDetail[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [crmStudents, setCrmStudents] = useState<CRMStudent[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAll = async (force: boolean = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);

    try {
      const [coursesList, subsList, crmList] = await Promise.all([
        fetchCourses(force),
        fetchSubmissions(undefined, force),
        fetchCRMStudents(force),
      ]);

      setCourses(coursesList);
      setSubmissions(subsList);
      setCrmStudents(crmList);

      if (coursesList.length > 0 && (!selectedCourse || force)) {
        const detail = await fetchCourseDetail(coursesList[0].id, force);
        setSelectedCourse(detail);
      }
    } catch (err) {
      console.error('Error fetching teacher studio data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAll(false);
  }, []);

  const handleSelectCourse = async (c: CourseDetail) => {
    try {
      const detail = await fetchCourseDetail(c.id);
      setSelectedCourse(detail);
    } catch (e) {
      setSelectedCourse(c);
    }
  };

  const handleCreateModule = async (title: string) => {
    if (!selectedCourse) return;
    try {
      await addModule(selectedCourse.id, title);
      const detail = await fetchCourseDetail(selectedCourse.id, true);
      setSelectedCourse(detail);
      showToast("Yangi modul muvaffaqiyatli yaratildi!");
    } catch (e) {
      alert("Modul yaratishda xatolik!");
    }
  };

  const handleCreateLesson = async (moduleId: string, title: string, stopRequired: boolean, watchPercent: number) => {
    if (!selectedCourse) return;
    try {
      await addLesson(moduleId, {
        title,
        duration_seconds: 900,
        is_free_preview: false,
        stop_lesson_required: stopRequired,
        minimum_watch_percent: watchPercent
      });
      const detail = await fetchCourseDetail(selectedCourse.id, true);
      setSelectedCourse(detail);
      showToast("Yangi dars qo'shildi!");
    } catch (e) {
      alert("Dars qo'shishda xatolik!");
    }
  };

  const handleReview = async (id: string, score: number, feedback: string) => {
    try {
      await reviewSubmission(id, score, feedback);
      setSubmissions(prev => prev.map(s => s.id === id ? { 
        ...s, 
        status: 'TEACHER_REVIEWED', 
        final_score: score, 
        teacher_feedback: feedback 
      } : s));
      showToast("Vazifa muvaffaqiyatli baholandi!");
    } catch (err) {
      alert("Baholashni saqlashda xatolik!");
    }
  };

  const handleSendTelegram = async (studentId: string, studentName: string) => {
    try {
      await sendTelegramReminder(studentId);
      showToast(`${studentName} ga Telegram eslatma yuborildi!`);
    } catch (e) {
      showToast(`${studentName} ga Telegram eslatma simulyatsiyasi qilindi.`);
    }
  };

  const handleRequestPayout = async (amount: number, card: string) => {
    try {
      await createPayout(amount, card);
      showToast("Pul yechib olish so'rovi Superadminga yuborildi!");
    } catch (e) {
      alert("So'rov yuborishda xatolik!");
    }
  };

  const pendingSubmissionsCount = submissions.filter(s => s.status === 'PENDING' || s.status === 'AI_GRADED').length;
  const stuckStudentsCount = crmStudents.filter(s => s.is_stuck).length;

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout
                pendingSubmissionsCount={pendingSubmissionsCount}
                stuckStudentsCount={stuckStudentsCount}
                refreshing={refreshing}
                onRefresh={() => loadAll(true)}
                toastMessage={toastMessage}
              />
            }
          >
            <Route 
              index 
              element={
                <CurriculumPage
                  courses={courses}
                  selectedCourse={selectedCourse}
                  onSelectCourse={handleSelectCourse}
                  loading={loading}
                  onCreateModule={handleCreateModule}
                  onCreateLesson={handleCreateLesson}
                />
              } 
            />
            <Route 
              path="live" 
              element={<LiveStudioPage onShowToast={showToast} />} 
            />
            <Route 
              path="inbox" 
              element={
                <InboxPage
                  submissions={submissions}
                  loading={loading}
                  onReview={handleReview}
                />
              } 
            />
            <Route 
              path="quizzes" 
              element={<QuizBuilderPage onShowToast={showToast} />} 
            />
            <Route 
              path="crm" 
              element={
                <CrmPage
                  students={crmStudents}
                  loading={loading}
                  onSendTelegram={handleSendTelegram}
                />
              } 
            />
            <Route 
              path="team" 
              element={<TeamCuratorsPage onShowToast={showToast} />} 
            />
            <Route 
              path="media" 
              element={<MediaLibraryPage onShowToast={showToast} />} 
            />
            <Route 
              path="funnels" 
              element={<FunnelsPage onShowToast={showToast} />} 
            />
            <Route 
              path="finance" 
              element={
                <FinancePage
                  onShowToast={showToast}
                  onRequestPayout={handleRequestPayout}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
