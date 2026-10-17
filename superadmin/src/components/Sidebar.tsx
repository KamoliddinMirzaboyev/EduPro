import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  BookOpenCheck, 
  Wallet, 
  X,
  ShieldAlert,
  Scale,
  Server,
  LayoutTemplate,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  pendingTeachersCount: number;
  pendingCoursesCount: number;
  pendingPayoutsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  pendingTeachersCount,
  pendingCoursesCount,
  pendingPayoutsCount,
}) => {
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const navItems = [
    {
      to: '/',
      label: 'Boshqaruv Paneli',
      icon: LayoutDashboard,
      badge: 0,
      badgeColor: '',
    },
    {
      to: '/kyc',
      label: 'Ustozlar KYC',
      icon: UserCheck,
      badge: pendingTeachersCount,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    },
    {
      to: '/courses',
      label: 'Kurslar Moderatsiyasi',
      icon: BookOpenCheck,
      badge: pendingCoursesCount,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    },
    {
      to: '/payouts',
      label: "Escrow & To'lovlar",
      icon: Wallet,
      badge: pendingPayoutsCount,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    },
    {
      to: '/security',
      label: 'Xavfsizlik & Anti-Piracy',
      icon: ShieldAlert,
      badge: 2,
      badgeColor: 'bg-red-600 text-white animate-pulse',
    },
    {
      to: '/disputes',
      label: 'Shikoyatlar & Arbitraj',
      icon: Scale,
      badge: 2,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      to: '/infra',
      label: 'AI & Server Xarajatlari',
      icon: Server,
      badge: 0,
      badgeColor: '',
    },
    {
      to: '/cms',
      label: 'Vitrina & Marketing',
      icon: LayoutTemplate,
      badge: 0,
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
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm tracking-wider shadow-sm shrink-0">
              SA
            </div>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2 truncate animate-in fade-in duration-150">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">EDUPRO</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                  Admin
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
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs' 
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <div className="relative shrink-0 flex items-center justify-center">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                        isActive ? 'text-white dark:text-slate-950' : 'text-slate-500 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white'
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
                            isActive ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-950' : item.badgeColor
                          }`}>
                            {item.badge}
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

        {/* Bottom Status / Profile */}
        <div className="p-3 border-t border-slate-100 dark:border-white/5 shrink-0 bg-slate-50/50 dark:bg-white/[0.01]">
          {sidebarCollapsed ? (
            <div className="flex justify-center" title="Platform Superadmin (Xavfsiz ulanish)">
              <div className="w-9 h-9 rounded-xl bg-slate-900/10 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shadow-xs">
                AD
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900/10 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                AD
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Platforma Egasi
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono truncate">
                    superadmin@edupro.uz
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
