import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  pendingTeachersCount: number;
  pendingCoursesCount: number;
  pendingPayoutsCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
  toastMessage: string | null;
}

export const Layout: React.FC<LayoutProps> = ({
  pendingTeachersCount,
  pendingCoursesCount,
  pendingPayoutsCount,
  searchQuery,
  setSearchQuery,
  refreshing,
  onRefresh,
  toastMessage,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090E] text-slate-900 dark:text-slate-100 flex font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200 overflow-x-hidden">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-150"
        />
      )}

      {/* Floating Curved Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pendingTeachersCount={pendingTeachersCount}
        pendingCoursesCount={pendingCoursesCount}
        pendingPayoutsCount={pendingPayoutsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refreshing={refreshing}
          onRefresh={onRefresh}
          notificationsCount={pendingTeachersCount + pendingCoursesCount + pendingPayoutsCount}
        />

        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 text-xs animate-in fade-in duration-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-medium">{toastMessage}</span>
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
};
