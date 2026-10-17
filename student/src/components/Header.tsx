import { Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, Globe, Compass } from 'lucide-react';
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
    if (location.pathname === '/my-learning') return 'Mening Kurslarim';
    if (location.pathname === '/assignments') return 'Vazifalar & AI Tahlil';
    if (location.pathname === '/schedule') return 'Jonli Efirlar Jadvali';
    if (location.pathname === '/certificates') return 'Reyting & Sertifikatlar';
    if (location.pathname.startsWith('/classroom')) return 'Himoyalangan Sinfxona';
    if (location.pathname.startsWith('/course')) return 'Kurs Tafsilotlari';
    return 'Bosh sahifa';
  };

  return (
    <header className="mx-3 mt-3 md:mx-4 md:mt-4 mb-2 shrink-0 h-16 bg-white/90 dark:bg-[#0F111A]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-between px-4 sm:px-6 shadow-xs z-30 transition-colors">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          title="Menyuni ochish"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500 font-mono">EDUPRO Student</span>
          <span className="text-slate-300 dark:text-zinc-700">/</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Portal Switchers */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-xs">
          <Link
            to="/welcome"
            className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 font-medium transition-all flex items-center gap-1.5 text-[11px]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Landing</span>
          </Link>
          <Link
            to="/onboarding"
            className="px-2.5 py-1 rounded-lg text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 font-medium transition-all flex items-center gap-1.5 text-[11px]"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Onboarding</span>
          </Link>
        </div>

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

        {/* Live Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-white/10 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-500 dark:text-zinc-400 text-[11px]">API: 8001</span>
        </div>
      </div>
    </header>
  );
};
