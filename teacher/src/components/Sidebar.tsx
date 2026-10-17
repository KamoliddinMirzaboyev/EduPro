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
  PanelLeftOpen
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
      badgeColor: 'bg-red-600 text-white animate-pulse',
    },
    {
      to: '/inbox',
      label: 'AI Baholash Inboxi',
      icon: Sparkles,
      badge: pendingSubmissionsCount,
      badgeText: `${pendingSubmissionsCount} yangi`,
      badgeColor: 'bg-blue-600 text-white',
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
      badge: stuckStudentsCount,
      badgeText: `${stuckStudentsCount} qotgan`,
      badgeColor: 'bg-amber-500 text-white',
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
      className={`fixed inset-y-0 left-0 z-50 p-3 md:p-4 shrink-0 flex flex-col justify-between transition-all duration-300 ease-in-out lg:static ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarCollapsed ? 'lg:w-20 w-72' : 'w-72'}`}
    >
      <div className="h-full bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xs transition-colors">
        {/* Top Brand Header */}
        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-md shadow-blue-500/30 shrink-0">
              CS
            </div>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2 truncate animate-in fade-in duration-150">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">EDUPRO</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                  Studio
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
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeSidebarOnMobile}
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
                      {sidebarCollapsed && item.badge > 0 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#0F111A]"></span>
                      )}
                    </div>

                    {!sidebarCollapsed && (
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.badge > 0 && (
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-2 ${
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
        <div className="p-3 border-t border-slate-100 dark:border-white/5 shrink-0 bg-slate-50/50 dark:bg-white/[0.01]">
          {sidebarCollapsed ? (
            <div className="flex justify-center" title="Sardor Daminov (Senior IELTS Instructor)">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shadow-xs">
                SD
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                SD
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Sardor Daminov
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono truncate">
                    Senior IELTS Mentor
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
