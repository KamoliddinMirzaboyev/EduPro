import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, RefreshCw, Shield, FileCheck2, Wallet } from 'lucide-react';

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
    <header className="w-full shrink-0 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
          title="Menyuni ochish"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono">EDUPRO Admin</span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900">
            {getPageTitle(location.pathname)}
          </span>
        </div>
      </div>

      {/* Prototype Switcher Bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
        <Link
          to="/"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/'
              ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>🛡️ Boshqaruv Paneli</span>
        </Link>
        <Link
          to="/kyc"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/kyc'
              ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
          <span>📋 Ustozlar KYC Navbati</span>
        </Link>
        <Link
          to="/payouts"
          className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 text-[11px] ${
            location.pathname === '/payouts'
              ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Wallet className="w-3.5 h-3.5 text-emerald-600" />
          <span>💰 Moliya & Escrow</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Qidiruv..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs rounded-md border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 w-44"
          />
        </div>

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
