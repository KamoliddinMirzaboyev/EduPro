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
  Bot
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  pendingSubmissionsCount: number;
  stuckStudentsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  pendingSubmissionsCount,
  stuckStudentsCount,
}) => {
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
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
      className={`fixed top-0 bottom-0 left-0 z-50 transition-all duration-300 ease-in-out p-3 md:static md:p-4 shrink-0 flex flex-col justify-between ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } w-64`}
    >
      <div className="h-full bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xl dark:shadow-2xl">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-md shadow-blue-500/30">
                CS
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">EDUPRO</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                  Studio
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Instructor Status Card */}
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500 dark:text-zinc-400">IELTS 8.5 Instructor</span>
              <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800/40 font-medium text-[10px]">
                Tasdiqlangan
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-6 flex-1">
            <div>
              <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2 font-mono">
                Studio Modullari
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={closeSidebar}
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
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 shrink-0" />
                            <span>{item.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {item.badge > 0 && (
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-medium ${item.badgeColor}`}>
                                {item.badgeText}
                              </span>
                            )}
                            {isActive && <span className="text-xs">◆</span>}
                          </div>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom User Card */}
        <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#0B0C12]/50">
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#131522] border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" 
                alt="Nodirbek Alimov" 
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 object-cover"
              />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                  Nodirbek Alimov
                  <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">IELTS Examiner</div>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" title="Online"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};
