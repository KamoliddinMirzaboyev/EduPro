import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  setSidebarMobileOpen: (open: boolean) => void;
  pageTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ setSidebarMobileOpen, pageTitle }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getBreadcrumb = () => {
    if (pageTitle) return pageTitle;
    if (location.pathname === '/') return 'Kurslar Katalogi';
    if (location.pathname.startsWith('/my-learning')) return 'Mening Kurslarim';
    if (location.pathname.startsWith('/classroom')) return 'Himoyalangan Sinfxona';
    if (location.pathname.startsWith('/course')) return 'Kurs Tafsilotlari';
    return 'Bosh sahifa';
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0F111A]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500 font-mono">EDUPRO</span>
          <span className="text-slate-300 dark:text-zinc-600">/</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'u rejimga o'tish"}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
