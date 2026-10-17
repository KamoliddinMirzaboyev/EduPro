import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Compass, 
  X, 
  FileText, 
  Calendar, 
  Award,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface SidebarProps {
  sidebarMobileOpen: boolean;
  setSidebarMobileOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarMobileOpen,
  setSidebarMobileOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const closeMobile = () => {
    if (window.innerWidth < 1024) {
      setSidebarMobileOpen(false);
    }
  };

  const navItems = [
    {
      to: '/',
      label: 'Katalog & Kurslar',
      icon: Home,
    },
    {
      to: '/my-learning',
      label: 'Mening Kurslarim',
      icon: BookOpen,
    },
    {
      to: '/assignments',
      label: 'Vazifalar & AI Tahlil',
      icon: FileText,
    },
    {
      to: '/schedule',
      label: 'Jonli Efirlar Jadvali',
      icon: Calendar,
    },
    {
      to: '/certificates',
      label: 'Reyting & Sertifikatlar',
      icon: Award,
    },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 p-3 md:p-4 shrink-0 flex flex-col justify-between transition-all duration-300 ease-in-out lg:static ${
        sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarCollapsed ? 'lg:w-20 w-72' : 'w-72'}`}
    >
      <div className="h-full bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xs transition-colors">
        {/* Top Brand Section */}
        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-md shadow-blue-500/30 shrink-0">
              EP
            </div>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2 truncate animate-in fade-in duration-150">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">EDUPRO</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                  Student
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setSidebarCollapsed(prev => !prev)}
              className="hidden lg:flex p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              title={sidebarCollapsed ? "Sidebar kengaytirish" : "Sidebar yig'ish"}
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setSidebarMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMobile}
                title={sidebarCollapsed ? item.label : undefined}
                className={({ isActive }) => `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  sidebarCollapsed ? 'justify-center px-0' : ''
                } ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <div className="relative shrink-0 flex items-center justify-center">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                        isActive ? 'text-white' : 'text-slate-500 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`} />
                    </div>

                    {!sidebarCollapsed && (
                      <span className="truncate flex-1 min-w-0">{item.label}</span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User Profile */}
        <div className="p-3 border-t border-slate-100 dark:border-white/5 shrink-0 bg-slate-50/50 dark:bg-white/[0.01]">
          {sidebarCollapsed ? (
            <div className="flex justify-center" title="Kamron Mirzayev (Talaba)">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shadow-xs">
                KM
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                KM
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Kamron Mirzayev
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono truncate">
                    Faol Talaba
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
