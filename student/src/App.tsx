import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { CatalogPage } from './pages/CatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ClassroomPage } from './pages/ClassroomPage';
import { MyLearningPage } from './pages/MyLearningPage';
import { AssignmentsHubPage } from './pages/AssignmentsHubPage';
import { LiveSchedulePage } from './pages/LiveSchedulePage';
import { CertificatesLeaderboardPage } from './pages/CertificatesLeaderboardPage';
import { CheckoutModal } from './components/CheckoutModal';
import { fetchCourses, processCheckout, CourseDetail } from './api/client';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseDetail[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [modalCourse, setModalCourse] = useState<CourseDetail | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setCoursesLoading(true);
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setCoursesLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmCheckout = async (courseId: string, tariffId?: string, paymentMethod?: string) => {
    try {
      setIsCheckingOut(true);
      await processCheckout(courseId, tariffId, paymentMethod || 'PAYME');
      setModalCourse(null);
      showToast("To'lov muvaffaqiyatli amalga oshirildi! Kursga xush kelibsiz.");
      navigate(`/classroom/${courseId}`);
    } catch (err) {
      console.error('Checkout failed', err);
      showToast("To'lovda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <Routes>
        <Route element={<Layout toastMessage={toastMessage} />}>
          <Route
            path="/"
            element={
              <CatalogPage
                courses={courses}
                loading={coursesLoading}
                onOpenCheckoutModal={(course) => setModalCourse(course)}
              />
            }
          />
          <Route
            path="/course/:slug"
            element={
              <CourseDetailPage
                onOpenCheckoutModal={(course) => setModalCourse(course)}
              />
            }
          />
          <Route
            path="/classroom/:courseId"
            element={<ClassroomPage onShowToast={showToast} />}
          />
          <Route
            path="/my-learning"
            element={<MyLearningPage />}
          />
          <Route
            path="/assignments"
            element={<AssignmentsHubPage onShowToast={showToast} />}
          />
          <Route
            path="/schedule"
            element={<LiveSchedulePage onShowToast={showToast} />}
          />
          <Route
            path="/certificates"
            element={<CertificatesLeaderboardPage onShowToast={showToast} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      {modalCourse && (
        <CheckoutModal
          course={modalCourse}
          onClose={() => setModalCourse(null)}
          onConfirmCheckout={handleConfirmCheckout}
          isCheckingOut={isCheckingOut}
        />
      )}
    </>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
