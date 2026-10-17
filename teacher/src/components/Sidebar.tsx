import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FolderPlus, 
  Sparkles, 
  Users, 
  Wallet, 
  ShieldCheck, 
  X,
  Radio,
  HelpCircle,
  UserCheck,
  Video,
  Bot,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  pendingSubmissionsCount: number;
  stuckStudentsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  pendingSubmissionsCount,
  stuckStudentsCount,
}) => {
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const navItems = [
    {
      to: '/',
      label: 'Darslar & Kurikulum',
      icon: FolderPlus,
      badge: 0,
      badgeText: '',
      badgeColor: '',
    },
    {
      to: '/live',
      label: 'Jonli Efirlar (Studio)',
      icon: Radio,
      badge: 1,
      badgeText: 'Jonli',
      badgeColor: 'bg-red-600 text-white',
    },
    {
      to: '/inbox',
      label: 'AI Baholash Inboxi',
      icon: Sparkles,
      badge: pendingSubmissionsCount || 3,
      badgeText: `${pendingSubmissionsCount || 3} yangi`,
      badgeColor: 'bg-slate-900 text-white',
    },
    {
      to: '/quizzes',
      label: 'Test & Savollar Banki',
      icon: HelpCircle,
      badge: 0,
      badgeText: '',
      badgeColor: '',
    },
    {
      to: '/crm',
      label: 'Talabalar CRM',
      icon: Users,
      badge: stuckStudentsCount || 3,
      badgeText: `${stuckStudentsCount || 3} qotgan`,
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      to: '/team',
      label: 'Jamoa & Kuratorlar',
      icon: UserCheck,
      badge: 0,
      badgeText: '',
      badgeColor: '',
    },
    {
      to: '/media',
      label: 'Video Ombori & Retention',
      icon: Video,
      badge: 0,
      badgeText: '',
      badgeColor: '',
    },
    {
      to: '/funnels',
      label: 'Sotuv Voronkasi & Bot',
      icon: Bot,
      badge: 0,
      badgeText: '',
      badgeColor: '',
    },
    {
      to: '/finance',
      label: 'Daromad & Tariflar',
      icon: Wallet,
      badge: 0,
      badgeText: '',
      badgeColor: '',
    },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 shrink-0 flex flex-col justify-between transition-all duration-200 ease-in-out lg:static bg-white border-r border-slate-200 h-screen ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarCollapsed ? 'lg:w-18 w-64' : 'w-64'}`}
    >
      <div className="h-full flex flex-col justify-between overflow-hidden">
        {/* Top Brand Header */}
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0">
              EP
            </div>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-bold text-sm tracking-tight text-slate-900">EDUPRO</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200">
                  STUDIO
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setSidebarCollapsed(prev => !prev)}
              className="hidden lg:flex p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              title={sidebarCollapsed ? "Kengaytirish" : "Yig'ish"}
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
              title="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 custom-scrollbar">
          {!sidebarCollapsed && (
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Boshqaruv Bo'limlari
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeSidebarOnMobile}
                title={sidebarCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  } ${sidebarCollapsed ? 'justify-center px-2' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="relative shrink-0 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`} />
                      {sidebarCollapsed && item.badge > 0 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                      )}
                    </div>

                    {!sidebarCollapsed && (
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.badge > 0 && (
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm shrink-0 ml-2 ${
                            isActive ? 'bg-white/20 text-white' : item.badgeColor
                          }`}>
                            {item.badgeText}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-slate-200 shrink-0 bg-slate-50">
          {sidebarCollapsed ? (
            <div className="flex justify-center" title="Sardor Daminov (Senior IELTS 8.5 Instructor)">
              <div className="w-8 h-8 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                SD
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                SD
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 truncate">
                  Sardor Daminov
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] text-slate-500 font-mono truncate">
                    IELTS 8.5 Master Instructor
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
