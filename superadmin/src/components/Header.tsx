import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Sun, Moon, RefreshCw, Bell, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
  notificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
  refreshing,
  onRefresh,
  notificationsCount,
}) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Boshqaruv Paneli';
      case '/kyc':
        return 'Ustozlar KYC & Tekshiruv';
      case '/courses':
        return 'Kurslar Moderatsiyasi';
      case '/payouts':
        return 'Escrow & Pul Yechish';
      case '/security':
        return 'Xavfsizlik & Anti-Piracy Radar';
      case '/disputes':
        return 'Shikoyatlar & Arbitraj';
      case '/infra':
        return 'AI & Server Xarajatlari (Quotas)';
      case '/cms':
        return 'Vitrina & Marketing (CMS)';
      default:
        return 'Boshqaruv Paneli';
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
          <span className="text-slate-400 dark:text-zinc-500 font-mono">EDUPRO Admin</span>
          <span className="text-slate-300 dark:text-zinc-700">/</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {getPageTitle(location.pathname)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Qidiruv (Ustoz, kurs...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

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
          <span className="text-slate-500 dark:text-zinc-400 text-[11px]">Core: 8000</span>
        </div>
      </div>
    </header>
  );
};
