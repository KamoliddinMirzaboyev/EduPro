import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { OverviewPage } from './pages/OverviewPage';
import { KycPage } from './pages/KycPage';
import { CoursesModerationPage } from './pages/CoursesModerationPage';
import { PayoutsPage } from './pages/PayoutsPage';
import { SecurityPage } from './pages/SecurityPage';
import { DisputesPage } from './pages/DisputesPage';
import { InfraQuotasPage } from './pages/InfraQuotasPage';
import { CmsBannersPage } from './pages/CmsBannersPage';
import { 
  fetchPlatformStats, 
  fetchTeachers, 
  fetchCourses, 
  fetchPayouts, 
  fetchTransactions,
  verifyTeacher,
  moderateCourse,
  moderatePayout,
  PlatformStats,
  TeacherItem,
  CourseItem,
  PayoutItem,
  TransactionItem
} from './api/client';

export function App() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [payouts, setPayouts] = useState<PayoutItem[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAllData = async (force: boolean = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);

    try {
      const [statsData, teachersData, coursesData, payoutsData, txData] = await Promise.all([
        fetchPlatformStats(force),
        fetchTeachers(force),
        fetchCourses(force),
        fetchPayouts(force),
        fetchTransactions(force),
      ]);

      setStats(statsData);
      setTeachers(teachersData);
      setCourses(coursesData);
      setPayouts(payoutsData);
      setTransactions(txData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData(false);
  }, []);

  const handleVerify = async (id: string, isVerified: boolean) => {
    try {
      await verifyTeacher(id, isVerified);
      setTeachers(prev => prev.map(t => t.id === id ? { ...t, is_verified: isVerified } : t));
      showToast(isVerified ? "Ustoz KYC tasdiqlandi!" : "Ustoz tasdig'i bekor qilindi.");
    } catch (err) {
      alert("Xatolik yuz berdi!");
    }
  };

  const handleModerateCourse = async (id: string, status: 'PUBLISHED' | 'DRAFT') => {
    try {
      await moderateCourse(id, status);
      setCourses(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      showToast(status === 'PUBLISHED' ? "Kurs platformada nashr etildi!" : "Kurs qoralamaga qaytarildi.");
    } catch (err) {
      alert("Kurs moderatsiyasida xatolik!");
    }
  };

  const handleModeratePayout = async (id: string, status: 'PAID' | 'REJECTED') => {
    try {
      await moderatePayout(id, status);
      setPayouts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
      showToast(status === 'PAID' ? "To'lov muvaffaqiyatli o'tkazildi!" : "To'lov so'rovi rad etildi.");
    } catch (err) {
      alert("To'lovni tasdiqlashda xatolik!");
    }
  };

  const pendingTeachersCount = teachers.filter(t => !t.is_verified).length;
  const pendingCoursesCount = courses.filter(c => c.status === 'PENDING_REVIEW').length;
  const pendingPayoutsCount = payouts.filter(p => p.status === 'PENDING').length;

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout
                pendingTeachersCount={pendingTeachersCount}
                pendingCoursesCount={pendingCoursesCount}
                pendingPayoutsCount={pendingPayoutsCount}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                refreshing={refreshing}
                onRefresh={() => loadAllData(true)}
                toastMessage={toastMessage}
              />
            }
          >
            <Route 
              index 
              element={
                <OverviewPage 
                  stats={stats} 
                  transactions={transactions} 
                  loading={loading} 
                />
              } 
            />
            <Route 
              path="kyc" 
              element={
                <KycPage 
                  teachers={teachers} 
                  loading={loading} 
                  searchQuery={searchQuery} 
                  onVerify={handleVerify} 
                />
              } 
            />
            <Route 
              path="courses" 
              element={
                <CoursesModerationPage 
                  courses={courses} 
                  loading={loading} 
                  searchQuery={searchQuery} 
                  onModerateCourse={handleModerateCourse} 
                />
              } 
            />
            <Route 
              path="payouts" 
              element={
                <PayoutsPage 
                  payouts={payouts} 
                  loading={loading} 
                  onModeratePayout={handleModeratePayout} 
                />
              } 
            />
            <Route 
              path="security" 
              element={<SecurityPage onShowToast={showToast} />} 
            />
            <Route 
              path="disputes" 
              element={<DisputesPage onShowToast={showToast} />} 
            />
            <Route 
              path="infra" 
              element={<InfraQuotasPage onShowToast={showToast} />} 
            />
            <Route 
              path="cms" 
              element={<CmsBannersPage onShowToast={showToast} />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
