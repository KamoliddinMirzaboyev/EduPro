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
  LayoutTemplate
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  pendingTeachersCount: number;
  pendingCoursesCount: number;
  pendingPayoutsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  pendingTeachersCount,
  pendingCoursesCount,
  pendingPayoutsCount,
}) => {
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
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
                EP
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">EDUPRO</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                  Gov
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Grouped Navigation Links */}
          <div className="px-3 py-4 space-y-6 flex-1">
            <div>
              <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 font-medium">
                Boshqaruv
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
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 shrink-0" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge > 0 ? (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isActive ? 'bg-white text-blue-700' : item.badgeColor
                            }`}>
                              {item.badge}
                            </span>
                          ) : isActive ? (
                            <span className="text-xs">◆</span>
                          ) : null}
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
        <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#151824] border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                alt="Shoxrux Qodirov" 
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 object-cover shrink-0"
              />
              <div className="truncate">
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">Shoxrux Qodirov</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Platform Owner</div>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 ml-1.5" title="Online"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};
