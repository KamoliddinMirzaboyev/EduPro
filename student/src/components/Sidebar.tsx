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
      className={`fixed inset-y-0 left-0 z-50 shrink-0 flex flex-col justify-between transition-all duration-200 ease-in-out lg:static bg-white border-r border-slate-200 h-screen ${
        sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarCollapsed ? 'lg:w-18 w-64' : 'w-64'}`}
    >
      <div className="h-full flex flex-col justify-between overflow-hidden">
        {/* Top Brand Section */}
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0">
              EP
            </div>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-bold text-sm tracking-tight text-slate-900">EDUPRO</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200">
                  Student
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setSidebarCollapsed(prev => !prev)}
              className="hidden lg:flex p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              title={sidebarCollapsed ? "Sidebar kengaytirish" : "Sidebar yig'ish"}
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setSidebarMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 custom-scrollbar">
          {!sidebarCollapsed && (
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              O'quv Bo'limlari
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMobile}
                title={sidebarCollapsed ? item.label : undefined}
                className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  sidebarCollapsed ? 'justify-center px-2' : ''
                } ${
                  isActive 
                    ? 'bg-slate-900 text-white font-semibold shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <div className="relative shrink-0 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
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
        <div className="p-3 border-t border-slate-200 shrink-0 bg-slate-50">
          {sidebarCollapsed ? (
            <div className="flex justify-center" title="Kamron Mirzayev (Talaba)">
              <div className="w-8 h-8 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                KM
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                KM
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 truncate">
                  Kamron Mirzayev
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] text-slate-500 font-mono truncate">
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
