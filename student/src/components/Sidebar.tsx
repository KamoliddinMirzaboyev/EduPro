import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Compass, X, FileText, Calendar, Award } from 'lucide-react';

interface SidebarProps {
  sidebarMobileOpen: boolean;
  setSidebarMobileOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
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
      className={`fixed top-0 bottom-0 left-0 z-50 transition-all duration-300 ease-in-out p-3 lg:static lg:p-4 shrink-0 flex flex-col justify-between ${
        sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="h-full bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xl dark:shadow-2xl">
        {/* Top Brand Section */}
        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-md shadow-blue-500/30 shrink-0">
              EP
            </div>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">EDUPRO</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                  Student
                </span>
              </div>
            )}
          </div>
          <button 
            onClick={() => setSidebarMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            {!sidebarCollapsed && (
              <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2 font-mono">
                O'qish
              </div>
            )}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `w-full px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-zinc-400'}`} />
                          {!sidebarCollapsed && <span>{item.label}</span>}
                        </div>
                        {isActive && !sidebarCollapsed && (
                          <span className="text-xs">◆</span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom User Profile & Collapse Toggle */}
        <div className="p-3 border-t border-slate-100 dark:border-white/5 space-y-3 bg-slate-50/50 dark:bg-[#0B0C12]/50">
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#131522] border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face" 
                alt="Jasur" 
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 object-cover"
              />
              {!sidebarCollapsed && (
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">Jasur A.</div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">Talaba</div>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <div className="w-2 h-2 rounded-full bg-emerald-500" title="Online"></div>
            )}
          </div>

          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex w-full py-1.5 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-zinc-300 text-[11px] items-center justify-center gap-1.5 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            {!sidebarCollapsed && <span>Yig'ish</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
