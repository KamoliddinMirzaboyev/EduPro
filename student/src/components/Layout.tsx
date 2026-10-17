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
    <div className="h-screen w-screen overflow-hidden bg-[#FAFAFA] text-slate-900 flex font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* Mobile Drawer Backdrop */}
      {sidebarMobileOpen && (
        <div 
          onClick={() => setSidebarMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Docked Left Sidebar */}
      <Sidebar 
        sidebarMobileOpen={sidebarMobileOpen}
        setSidebarMobileOpen={setSidebarMobileOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Workspace Canvas (Independently Scrollable) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Docked Top Navbar */}
        <Header setSidebarMobileOpen={setSidebarMobileOpen} />

        {/* Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-[#FAFAFA]">
          {/* Global Toast */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-md bg-white border border-slate-200 text-slate-900 flex items-center gap-3 text-xs shadow-lg animate-in slide-in-from-bottom duration-200">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
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
