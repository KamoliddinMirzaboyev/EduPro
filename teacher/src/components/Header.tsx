import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, RefreshCw, Bell } from 'lucide-react';
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
      case '/inbox':
        return 'AI Baholash Inboxi';
      case '/crm':
        return 'Talabalar CRM & Davomat';
      case '/finance':
        return 'Daromad & Tariflar';
      default:
        return 'Darslar & Kurikulum';
    }
  };

  return (
    <header className="h-16 bg-white/80 dark:bg-[#0F111A]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500 font-mono">EDUPRO Studio</span>
          <span className="text-slate-300 dark:text-zinc-600">/</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {getPageTitle(location.pathname)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          title={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'u rejimga o'tish"}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          title="Keshni yangilash"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
          <Bell className="w-4 h-4" />
          {pendingSubmissionsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
          )}
        </button>
      </div>
    </header>
  );
};
