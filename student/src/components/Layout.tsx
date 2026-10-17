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
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090E] text-slate-900 dark:text-slate-100 flex font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200 overflow-x-hidden">
      {/* Mobile Drawer Backdrop */}
      {sidebarMobileOpen && (
        <div 
          onClick={() => setSidebarMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Floating Curved Sidebar */}
      <Sidebar 
        sidebarMobileOpen={sidebarMobileOpen}
        setSidebarMobileOpen={setSidebarMobileOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header setSidebarMobileOpen={setSidebarMobileOpen} />

        <main className="flex-1 flex flex-col min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-white dark:bg-[#0D0E16] border border-blue-500 text-slate-900 dark:text-white flex items-center gap-3 text-xs shadow-2xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
