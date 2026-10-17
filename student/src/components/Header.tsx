import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Globe, Compass, GraduationCap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  setSidebarMobileOpen: (open: boolean) => void;
  pageTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ setSidebarMobileOpen, pageTitle }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const getBreadcrumb = () => {
    if (pageTitle) return pageTitle;
    if (location.pathname === '/') return 'Kurslar Katalogi & Vitrina';
    if (location.pathname === '/my-learning') return 'Mening Kurslarim';
    if (location.pathname === '/assignments') return 'Vazifalar & AI Tahlil';
    if (location.pathname === '/schedule') return 'Jonli Efirlar Jadvali';
    if (location.pathname === '/certificates') return 'Reyting & Sertifikatlar';
    if (location.pathname.startsWith('/classroom')) return 'Himoyalangan Sinfxona';
    if (location.pathname.startsWith('/course')) return 'Kurs Tafsilotlari';
    return 'Bosh sahifa';
  };

  const isLmsActive = !['/welcome', '/onboarding'].includes(location.pathname);

  return (
    <header className="w-full shrink-0 h-14 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 z-30 transition-colors">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarMobileOpen(true)}
          className="lg:hidden p-1.5 rounded-md border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          title="Menyuni ochish"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500 font-mono">EDUPRO Student</span>
          <span className="text-slate-300 dark:text-zinc-700">/</span>
          <span className="font-bold text-slate-900 dark:text-zinc-100">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Prototype Switcher Bar */}
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
          <span>🌐 Marketplace Vitrina</span>
        </Link>
        <Link
          to="/onboarding"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/onboarding'
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-semibold shadow-xs border border-slate-200 dark:border-zinc-700'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>📝 O'quvchi Onboarding</span>
        </Link>
        <Link
          to="/"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            isLmsActive
              ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-semibold shadow-xs border border-slate-200 dark:border-zinc-700'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/60'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-slate-900 dark:text-zinc-100" />
          <span>🎓 Mening Darslarim</span>
        </Link>
      </div>

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

        {/* Live Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-zinc-700 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600 dark:text-zinc-400 text-[11px]">API: 8001</span>
        </div>
      </div>
    </header>
  );
};
