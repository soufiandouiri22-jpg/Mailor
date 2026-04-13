import { Link } from 'react-router-dom';
import { Plus, MessageSquare } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Tooltip from '../components/Tooltip';

const flows = [
  {
    id: 1,
    name: 'Standard Follow-up',
    steps: [
      { type: 'email', label: 'Initial Email' },
      { type: 'delay', label: '3 days' },
      { type: 'followup', label: 'Follow-up 1' },
      { type: 'delay', label: '5 days' },
      { type: 'followup', label: 'Follow-up 2' },
    ],
    autoRespond: true,
  },
  {
    id: 2,
    name: 'Aggressive',
    steps: [
      { type: 'email', label: 'Initial Email' },
      { type: 'delay', label: '2 days' },
      { type: 'followup', label: 'Follow-up 1' },
      { type: 'delay', label: '3 days' },
      { type: 'followup', label: 'Follow-up 2' },
      { type: 'delay', label: '5 days' },
      { type: 'followup', label: 'Final Follow-up' },
    ],
    autoRespond: true,
  },
  {
    id: 3,
    name: 'Gentle',
    steps: [
      { type: 'email', label: 'Initial Email' },
      { type: 'delay', label: '5 days' },
      { type: 'followup', label: 'One Follow-up' },
    ],
    autoRespond: false,
  },
];

export default function Flows() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title={<span className="inline-flex items-center gap-2">Flows <Tooltip text="A flow combines a template and an audience into an automated sequence. Create a template and an audience first, then build your flow." /></span>} description="Automated follow-up and response workflows">
        <Link
          to="/flows/new"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New flow
        </Link>
      </PageHeader>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {flows.map((f) => {
          const emailCount = f.steps.filter((s) => s.type !== 'delay').length;
          return (
            <Link
              key={f.id}
              to={`/flows/${f.id}/edit`}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-semibold text-gray-900">{f.name}</h3>
                <span className="text-[11px] text-gray-400">{emailCount} emails</span>
              </div>

              <div className="flex items-center flex-wrap gap-1.5 mb-4">
                {f.steps.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {step.type === 'delay' ? (
                      <span className="text-[11px] text-gray-400 font-medium">{step.label}</span>
                    ) : (
                      <span className="text-[11px] text-gray-700 font-medium bg-gray-100 px-2.5 py-1 rounded-full">{step.label}</span>
                    )}
                  </span>
                ))}
              </div>

              {f.autoRespond && (
                <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-gray-100">
                  <MessageSquare size={12} className="text-gray-400" />
                  <span className="text-[11px] text-gray-400">Auto-respond enabled</span>
                </div>
              )}
            </Link>
          );
        })}

        <Link
          to="/flows/new"
          className="flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
        >
          <Plus size={24} className="mb-2" />
          <span className="text-[13px] font-medium">Create flow</span>
        </Link>
      </div>
    </div>
  );
}
