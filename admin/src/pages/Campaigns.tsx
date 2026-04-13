import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';


const campaigns = [
  {
    id: 1,
    name: 'Agency Outreach NL',
    status: 'active',
    audience: 'Marketing Managers, Agencies, NL',
    template: 'Cold Intro',
    sent: 842,
    openRate: '67.3%',
    replyRate: '14.2%',
  },
  {
    id: 2,
    name: 'SaaS Decision Makers',
    status: 'active',
    audience: 'Heads of Growth, SaaS, EU',
    template: 'Follow-up',
    sent: 1204,
    openRate: '61.8%',
    replyRate: '11.7%',
  },
  {
    id: 3,
    name: 'E-commerce DACH',
    status: 'paused',
    audience: 'CMOs, E-commerce, DACH',
    template: 'Thought Leadership',
    sent: 389,
    openRate: '58.4%',
    replyRate: '9.1%',
  },
  {
    id: 4,
    name: 'Recruiting Test',
    status: 'draft',
    audience: 'HR Directors, 51-200, US',
    template: 'Final Follow-up',
    sent: 0,
    openRate: '—',
    replyRate: '—',
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  paused: 'bg-amber-50 text-amber-700 border-amber-100',
  draft: 'bg-gray-50 text-gray-500 border-gray-200',
};

export default function Campaigns() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title="Campaigns" description="Manage your outreach campaigns">
        <Link
          to="/campaigns/new"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New campaign
        </Link>
      </PageHeader>


      <div className="space-y-3">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="text-[14px] font-semibold text-gray-900">{c.name}</h3>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border capitalize ${statusColors[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-gray-400">
                <span>{c.audience}</span>
                <span>·</span>
                <span>{c.template}</span>
              </div>
            </div>
            <div className="flex items-center gap-8 shrink-0">
              <div className="text-right">
                <p className="text-[13px] font-medium text-gray-900">{c.sent.toLocaleString()}</p>
                <p className="text-[11px] text-gray-400">sent</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-medium text-gray-900">{c.openRate}</p>
                <p className="text-[11px] text-gray-400">open rate</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-medium text-gray-900">{c.replyRate}</p>
                <p className="text-[11px] text-gray-400">reply rate</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
