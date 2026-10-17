import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  toastMessage?: string | null;
}

export const Layout: React.FC<LayoutProps> = ({ toastMessage }) => {
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100/70 dark:bg-[#08090E] text-slate-900 dark:text-slate-100 flex font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Mobile Drawer Backdrop */}
      {sidebarMobileOpen && (
        <div 
          onClick={() => setSidebarMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Permanently Fixed Floating Curved Sidebar */}
      <Sidebar 
        sidebarMobileOpen={sidebarMobileOpen}
        setSidebarMobileOpen={setSidebarMobileOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Workspace Canvas (Independently Scrollable) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Floating Rounded Navbar */}
        <Header setSidebarMobileOpen={setSidebarMobileOpen} />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 space-y-5 custom-scrollbar">
          {/* Global Toast */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-white dark:bg-[#0D0E16] border border-blue-500 text-slate-900 dark:text-white flex items-center gap-3 text-xs shadow-2xl animate-in slide-in-from-bottom duration-200">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
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
