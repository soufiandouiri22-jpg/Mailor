import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Send, Reply, MousePointerClick, CalendarCheck, TrendingUp, TrendingDown } from 'lucide-react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const snapshot = [
  { label: 'Total sends', value: '2,847', change: '+12.3%', positive: true },
  { label: 'Open rate', value: '64.2%', change: '+2.1pp', positive: true },
  { label: 'Reply rate', value: '13.4%', change: '+1.8pp', positive: true },
  { label: 'Click rate', value: '8.7%', change: '-0.3pp', positive: false },
  { label: 'Meetings booked', value: '47', change: '+8', positive: true },
  { label: 'Bounce rate', value: '1.2%', change: 'Stable', positive: true },
];

const recentCampaigns = [
  { id: 1, name: 'Agency Outreach NL', status: 'active', sent: 842, openRate: '67.3%', replyRate: '14.2%' },
  { id: 2, name: 'SaaS Decision Makers', status: 'active', sent: 1204, openRate: '61.8%', replyRate: '11.7%' },
  { id: 3, name: 'E-commerce DACH', status: 'paused', sent: 389, openRate: '58.4%', replyRate: '9.1%' },
];

const statusColors: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  paused: 'bg-amber-50 text-amber-700',
  draft: 'bg-gray-100 text-gray-500',
};

const recentActivity = [
  { text: 'Daniel van Dijk replied', detail: 'AdScale', time: '2 min ago' },
  { text: 'Meeting booked', detail: 'Sarah Chen, Funnel.io', time: '18 min ago' },
  { text: 'Tom de Vries opened email', detail: 'ScaleUp', time: '1h ago' },
  { text: 'New reply from Marc Jansen', detail: 'BoldMedia', time: '3h ago' },
];

const quickActions = [
  { label: 'New campaign', icon: Send, to: '/campaigns/new', description: 'Send a one-time email' },
  { label: 'New template', icon: Reply, to: '/templates/new', description: 'Create an email template' },
  { label: 'New flow', icon: MousePointerClick, to: '/flows/new', description: 'Build an outreach sequence' },
  { label: 'New audience', icon: CalendarCheck, to: '/audiences/new', description: 'Import or create a list' },
];

export default function Overview() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <p className="text-[13px] text-gray-400 mb-1">Soufian&apos;s Workspace</p>
        <h1 className="text-[28px] font-semibold text-gray-900 tracking-tight">
          {getGreeting()}, Soufian
        </h1>
      </div>

      {/* Snapshot */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[14px] font-semibold text-gray-900">Performance snapshot</p>
          <Link to="/analytics" className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            Analytics
            <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
          {snapshot.map((s) => (
            <div key={s.label}>
              <p className="text-[11px] text-gray-400 mb-1">{s.label}</p>
              <p className="text-[20px] font-semibold text-gray-900 tracking-tight">{s.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {s.change !== 'Stable' ? (
                  s.positive ? (
                    <TrendingUp size={12} className="text-emerald-500" />
                  ) : (
                    <TrendingDown size={12} className="text-gray-400" />
                  )
                ) : null}
                <span className={`text-[11px] ${s.change === 'Stable' ? 'text-gray-400' : s.positive ? 'text-emerald-500' : 'text-gray-400'}`}>
                  {s.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {quickActions.map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
              <a.icon size={16} className="text-gray-500" />
            </div>
            <p className="text-[13px] font-medium text-gray-900">{a.label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{a.description}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent campaigns */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-semibold text-gray-900">Recent campaigns</p>
            <Link to="/campaigns" className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
              All campaigns
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-0">
            {recentCampaigns.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-medium text-gray-900">{c.name}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-[12px] text-gray-400">
                  <span>{c.sent.toLocaleString()} sent</span>
                  <span>{c.openRate} open</span>
                  <span>{c.replyRate} reply</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-semibold text-gray-900">Activity</p>
            <Link to="/inbox" className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
              Inbox
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-0">
            {recentActivity.map((item, i) => (
              <div key={i} className="py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-medium text-gray-900">{item.text}</p>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-2">{item.time}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Templates */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[14px] font-semibold text-gray-900">Your templates</p>
          <Link to="/templates" className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            View all templates
            <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Cold Intro', type: 'Email', desc: 'Initial outreach with your value proposition and icebreaker.' },
            { name: 'Follow-up', type: 'Email', desc: 'Short follow-up referencing your previous email.' },
            { name: 'Final Follow-up', type: 'Email', desc: 'Last touchpoint, no pressure, leaves the door open.' },
          ].map((t) => (
            <Link
              key={t.name}
              to="/templates"
              className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
            >
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded mb-2">
                {t.type}
              </span>
              <p className="text-[13px] font-medium text-gray-900">{t.name}</p>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{t.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            to="/templates/new"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Plus size={14} />
            Start from scratch
          </Link>
        </div>
      </div>
    </div>
  );
}
