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
    <div className="h-screen w-screen overflow-hidden bg-[#FAFAFA] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex font-sans antialiased selection:bg-slate-900 selection:text-white transition-colors">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-in fade-in duration-150"
        />
      )}

      {/* Docked Left Sidebar */}
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
        {/* Docked Top Navbar */}
        <Header 
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refreshing={refreshing}
          onRefresh={onRefresh}
          notificationsCount={pendingTeachersCount + pendingCoursesCount + pendingPayoutsCount}
        />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-[#FAFAFA] dark:bg-zinc-950 transition-colors">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2.5 text-xs animate-in slide-in-from-top-2 duration-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
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
