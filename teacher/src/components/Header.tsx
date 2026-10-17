import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, RefreshCw, Globe, FileEdit, LayoutDashboard } from 'lucide-react';

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
    <header className="w-full shrink-0 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
          title="Menyuni ochish"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono">EDUPRO Studio</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900">
            {getPageTitle(location.pathname)}
          </span>
        </div>
      </div>

      {/* Center: Clear Top Prototype Switcher Bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
        <Link
          to="/welcome"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/welcome'
              ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>🌐 Ustoz Landing Page</span>
        </Link>
        <Link
          to="/onboarding"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/onboarding'
              ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5 text-amber-600" />
          <span>📝 Ro'yxatdan o'tish (Onboarding 4-Step)</span>
        </Link>
        <Link
          to="/"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            isStudioDashboard
              ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-slate-900" />
          <span>🎛️ Ustoz Studio (Dashboard)</span>
        </Link>
      </div>

      {/* Right: Actions & Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Refresh button */}
        <button 
          onClick={onRefresh}
          disabled={refreshing}
          className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors disabled:opacity-50"
          title="Ma'lumotlarni yangilash"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-slate-900' : ''}`} />
        </button>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600 text-[11px]">API: 8001</span>
        </div>
      </div>
    </header>
  );
};
