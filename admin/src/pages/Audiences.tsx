import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';


const audiences = [
  {
    id: 1,
    name: 'Marketing Managers, Agencies, NL',
    filters: ['Marketing Manager', 'Agency', '11-50 employees', 'Netherlands'],
    prospects: 1240,
  },
  {
    id: 2,
    name: 'Heads of Growth, SaaS, EU',
    filters: ['Head of Growth', 'SaaS', '51-200 employees', 'Europe'],
    prospects: 3850,
  },
  {
    id: 3,
    name: 'CMOs, E-commerce, DACH',
    filters: ['CMO', 'E-commerce', '51-200 employees', 'Germany, Austria, Switzerland'],
    prospects: 920,
  },
  {
    id: 4,
    name: 'HR Directors, US',
    filters: ['HR Director', 'All industries', '51-200 employees', 'United States'],
    prospects: 4200,
  },
];

export default function Audiences() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title="Audiences" description="Define your target audiences">
        <Link
          to="/audiences/new"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New audience
        </Link>
      </PageHeader>


      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {audiences.map((a) => (
          <div
            key={a.id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col hover:border-gray-300 transition-colors cursor-pointer"
          >
            <h3 className="text-[14px] font-semibold text-gray-900 mb-3">{a.name}</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {a.filters.map((f) => (
                <span key={f} className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100">
              <span className="text-[12px] font-medium text-gray-900">{a.prospects.toLocaleString()}</span>
              <span className="text-[11px] text-gray-400 ml-1">prospects</span>
            </div>
          </div>
        ))}

        <Link
          to="/audiences/new"
          className="flex flex-col items-center justify-center min-h-[180px] border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
        >
          <Plus size={24} className="mb-2" />
          <span className="text-[13px] font-medium">Create audience</span>
        </Link>
      </div>
    </div>
  );
}
