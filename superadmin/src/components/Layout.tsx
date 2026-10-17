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
  setSearchQuery: (query: string) => void;
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100/70 dark:bg-[#08090E] text-slate-900 dark:text-slate-100 flex font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-150"
        />
      )}

      {/* Permanently Fixed Floating Curved Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        pendingTeachersCount={pendingTeachersCount}
        pendingCoursesCount={pendingCoursesCount}
        pendingPayoutsCount={pendingPayoutsCount}
      />

      {/* Main Content Workspace (Independently Scrollable) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Floating Rounded Navbar */}
        <Header 
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refreshing={refreshing}
          onRefresh={onRefresh}
          notificationsCount={pendingTeachersCount + pendingCoursesCount + pendingPayoutsCount}
        />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 space-y-5 custom-scrollbar">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 text-xs animate-in slide-in-from-top-2 duration-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{toastMessage}</span>
            </div>
          )}

          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
