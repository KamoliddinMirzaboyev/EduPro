import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, RefreshCw, Shield, FileCheck2, Wallet, Sun, Moon } from 'lucide-react';
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
}) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Boshqaruv Paneli';
      case '/kyc':
        return 'Ustozlar KYC & Tekshiruv';
      case '/courses':
        return 'Kurslar Moderatsiyasi';
      case '/payouts':
        return 'Moliya, Escrow & To\'lovlar';
      case '/security':
        return 'Xavfsizlik & Anti-Piracy Radar';
      case '/disputes':
        return 'Shikoyatlar & Arbitraj';
      case '/infra':
        return 'AI & Server Xarajatlari';
      case '/cms':
        return 'Vitrina & Marketing (CMS)';
      default:
        return 'Superadmin Boshqaruv';
    }
  };

  return (
    <header className="w-full shrink-0 h-14 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 z-30 transition-colors">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1.5 rounded-md border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          title="Menyuni ochish"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500 font-mono">EDUPRO Admin</span>
          <span className="text-slate-300 dark:text-zinc-700">/</span>
          <span className="font-bold text-slate-900 dark:text-zinc-100">
            {getPageTitle(location.pathname)}
          </span>
        </div>
      </div>

      {/* Prototype Switcher Bar */}
      <div className="hidden md:flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium">
        <Link
          to="/"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-semibold shadow-xs border border-slate-200 dark:border-zinc-700'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/60'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>🛡️ Boshqaruv Paneli</span>
        </Link>
        <Link
          to="/kyc"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/kyc'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-semibold shadow-xs border border-slate-200 dark:border-zinc-700'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/60'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>📋 Ustozlar KYC Navbati</span>
        </Link>
        <Link
          to="/payouts"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/payouts'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-semibold shadow-xs border border-slate-200 dark:border-zinc-700'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/60'
          }`}
        >
          <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>💰 Moliya & Escrow</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Input */}
        <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Qidiruv..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-zinc-400 w-36 lg:w-44"
          />
        </div>

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
