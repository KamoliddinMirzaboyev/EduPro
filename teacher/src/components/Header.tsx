import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, RefreshCw, Globe, FileEdit, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  refreshing: boolean;
  onRefresh: () => void;
  pendingSubmissionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  setSidebarOpen,
  refreshing,
  onRefresh,
}) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Darslar & Kurikulum';
      case '/live':
        return 'Jonli Efirlar (Studio)';
      case '/inbox':
        return 'AI Baholash Inboxi';
      case '/quizzes':
        return 'Test & Savollar Banki';
      case '/crm':
        return 'Talabalar CRM';
      case '/team':
        return 'Jamoa & Kuratorlar';
      case '/media':
        return 'Video Ombori & Retention';
      case '/funnels':
        return 'Sotuv Voronkasi & Bot';
      case '/finance':
        return 'Daromad & Tariflar';
      case '/welcome':
        return 'Ustoz Landing Sahifasi';
      case '/onboarding':
        return 'Ustoz Onboarding';
      default:
        return 'Studio Boshqaruv';
    }
  };

  const isStudioDashboard = !['/welcome', '/onboarding'].includes(location.pathname);

  return (
    <header className="w-full shrink-0 h-14 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 z-30 transition-colors">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1.5 rounded-md border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          title="Menyuni ochish"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500 font-mono">EDUPRO Studio</span>
          <span className="text-slate-300 dark:text-zinc-700">/</span>
          <span className="font-bold text-slate-900 dark:text-zinc-100">
            {getPageTitle(location.pathname)}
          </span>
        </div>
      </div>

      {/* Center: Clear Top Prototype Switcher Bar */}
      <div className="hidden md:flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium">
        <Link
          to="/welcome"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/welcome'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-semibold shadow-xs border border-slate-200 dark:border-zinc-700'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/60'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>🌐 Ustoz Landing Page</span>
        </Link>
        <Link
          to="/onboarding"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/onboarding'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-semibold shadow-xs border border-slate-200 dark:border-zinc-700'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/60'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>📝 Ro'yxatdan o'tish (Onboarding)</span>
        </Link>
        <Link
          to="/"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            isStudioDashboard
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-semibold shadow-xs border border-slate-200 dark:border-zinc-700'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/60'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-slate-900 dark:text-zinc-100" />
          <span>🎛️ Ustoz Studio (Dashboard)</span>
        </Link>
      </div>

      {/* Right: Actions, Theme Toggle & Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Light / Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
          title={theme === 'dark' ? "Yorug' rejimga o'tish (Light Mode)" : "Qorong'i rejimga o'tish (Dark Mode)"}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-[11px] text-zinc-300">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline text-[11px] text-slate-600">Dark</span>
            </>
          )}
        </button>

        {/* Refresh button */}
        <button 
          onClick={onRefresh}
          disabled={refreshing}
          className="p-1.5 rounded-md border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
          title="Ma'lumotlarni yangilash"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-slate-900 dark:text-zinc-100' : ''}`} />
        </button>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-zinc-700 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600 dark:text-zinc-400 text-[11px]">API: 8001</span>
        </div>
      </div>
    </header>
  );
};
