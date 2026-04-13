import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  Home, Megaphone, FileText, GitBranch,
  UsersRound, Inbox, Settings, PanelLeft,
  Sparkles, MessageSquareText, BookOpen, HelpCircle, Bell,
  BarChart3, LogOut, CreditCard, User,
} from 'lucide-react';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    items: [
      { to: '/', icon: <Home size={18} />, label: 'Home' },
      { to: '/campaigns', icon: <Megaphone size={18} />, label: 'Campaigns' },
      { to: '/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
    ],
  },
  {
    title: 'Build',
    items: [
      { to: '/templates', icon: <FileText size={18} />, label: 'Templates' },
      { to: '/flows', icon: <GitBranch size={18} />, label: 'Flows' },
      { to: '/audiences', icon: <UsersRound size={18} />, label: 'Audiences' },
    ],
  },
  {
    title: 'Communicate',
    items: [
      { to: '/inbox', icon: <Inbox size={18} />, label: 'Inbox' },
    ],
  },
  {
    items: [
      { to: '/settings', icon: <Settings size={18} />, label: 'Settings' },
    ],
  },
];

function SidebarLink({ to, icon, label, collapsed }: NavItem & { collapsed: boolean }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium overflow-hidden whitespace-nowrap transition-colors duration-200 ${
          isActive
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
        }`
      }
    >
      <span className="shrink-0">{icon}</span>
      <span
        className="transition-opacity duration-200 overflow-hidden"
        style={{ opacity: collapsed ? 0 : 1 }}
      >
        {label}
      </span>
    </NavLink>
  );
}

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/campaigns': 'Campaigns',
  '/analytics': 'Analytics',
  '/campaigns/new': 'New Campaign',
  '/templates': 'Templates',
  '/templates/new': 'New Template',
  '/flows': 'Flows',
  '/flows/new': 'New Flow',
  '/audiences': 'Audiences',
  '/audiences/new': 'New Audience',
  '/inbox': 'Inbox',
  '/settings': 'Settings',
  '/account': 'Account',
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (/^\/templates\/\d+\/edit$/.test(pathname)) return 'Edit Template';
  if (/^\/flows\/\d+\/edit$/.test(pathname)) return 'Edit Flow';
  return '';
}

function TopBar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!profileRef.current || profileRef.current.contains(e.target as Node)) return;
      setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex items-center justify-between px-8 h-[52px] shrink-0 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <PanelLeft size={18} className={collapsed ? 'scale-x-[-1]' : ''} />
        </button>
        <span className="text-[14px] font-semibold text-gray-900">{title}</span>
      </div>

      <div className="flex items-center gap-1">
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Sparkles size={14} />
          What&apos;s new
        </button>
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <MessageSquareText size={14} />
          Feedback
        </button>
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <BookOpen size={14} />
          Docs
        </button>
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <HelpCircle size={14} />
          Ask
        </button>

        <div className="w-px h-5 bg-gray-200 mx-2" />

        <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-pink-500" />
        </button>

        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-8 h-8 rounded-full bg-pink-500 text-white text-[12px] font-semibold flex items-center justify-center hover:bg-pink-600 transition-colors focus:outline-none"
          >
            S
          </button>
          {profileOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-[240px] z-50 py-2">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[13px] font-semibold text-gray-900">Soufian Douiri</p>
                <p className="text-[11px] text-gray-400 mt-0.5">soufian@ugc.nl</p>
                <p className="text-[10px] font-medium text-gray-400 mt-1">Soufian&apos;s Workspace · Pro plan</p>
              </div>
              <div className="py-1">
                <Link to="/account" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={14} className="text-gray-400" />
                  Account settings
                </Link>
                <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings size={14} className="text-gray-400" />
                  Workspace settings
                </Link>
                <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
                  <CreditCard size={14} className="text-gray-400" />
                  Subscription
                </button>
              </div>
              <div className="border-t border-gray-100 pt-1">
                <Link to="/login" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
                  <LogOut size={14} className="text-gray-400" />
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      <aside
        className={`bg-[#F7F7F8] border-r border-gray-200 flex flex-col transition-all duration-200 ${
          collapsed ? 'w-[60px]' : 'w-[250px]'
        }`}
      >
        <div className="flex items-baseline py-5 px-4 overflow-hidden gap-2 text-[19px] text-gray-900 tracking-[-0.02em] whitespace-nowrap font-black">
          <img src="/images/mailor-logo.png" alt="Mailor" className="h-[1em] w-auto shrink-0 self-center object-contain" />
          <span
            className="transition-opacity duration-200"
            style={{ opacity: collapsed ? 0 : 1 }}
          >
            Mailor
          </span>
        </div>

        <nav className="flex-1 pb-4 overflow-y-auto hide-scrollbar space-y-5 px-2">
          {NAV.map((group, gi) => (
            <div key={gi}>
              {group.title && (
                <p
                  className="px-3 mb-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap transition-opacity duration-200"
                  style={{ opacity: collapsed ? 0 : 1 }}
                >
                  {group.title}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <SidebarLink key={item.to} {...item} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-h-0">
        <TopBar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
