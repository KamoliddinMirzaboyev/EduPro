import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, RefreshCw, Bell, Sparkles } from 'lucide-react';
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
  pendingSubmissionsCount,
}) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Darslar & Kurikulum';
      case '/live':
        return 'Jonli Efirlar (WebRTC LiveKit)';
      case '/inbox':
        return 'AI Baholash Inboxi';
      case '/quizzes':
        return 'Test & Savollar Banki';
      case '/crm':
        return 'Talabalar CRM & Davomat';
      case '/team':
        return 'Jamoa & Kuratorlar';
      case '/media':
        return 'Video Ombori & Retention';
      case '/funnels':
        return 'Sotuv Voronkasi & Bot';
      case '/finance':
        return 'Daromad & Tariflar';
      default:
        return 'Studio Boshqaruv';
    }
  };

  return (
    <header className="mx-3 mt-3 md:mx-4 md:mt-4 mb-2 shrink-0 h-16 bg-white/90 dark:bg-[#0F111A]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-between px-4 sm:px-6 shadow-xs z-30 transition-colors">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          title="Menyuni ochish"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500 font-mono">EDUPRO Studio</span>
          <span className="text-slate-300 dark:text-zinc-700">/</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {getPageTitle(location.pathname)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Refresh button */}
        <button 
          onClick={onRefresh}
          disabled={refreshing}
          className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
          title="Ma'lumotlarni yangilash"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center"
          title={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'u rejimga o'tish"}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 transition-transform hover:-rotate-12" />
          )}
        </button>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/10 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-500 dark:text-zinc-400 text-[11px]">Server: Faol (8000)</span>
        </div>
      </div>
    </header>
  );
};
