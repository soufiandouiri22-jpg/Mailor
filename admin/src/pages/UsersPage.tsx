import { Search, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import MetricCard from '../components/MetricCard';

const spark = (base: number, len = 14) =>
  Array.from({ length: len }, () => base + Math.floor(Math.random() * base * 0.4 - base * 0.2));

const MOCK_USERS = Array.from({ length: 20 }, (_, i) => ({
  id: `user_${1000 + i}`,
  platform: i % 3 === 0 ? 'Android' : 'iOS',
  status: i < 3 ? 'Pro' : i < 7 ? 'Trial' : 'Free',
  scans: Math.floor(Math.random() * 50) + 1,
  lastActive: `${Math.floor(Math.random() * 24) + 1}u geleden`,
  onboarded: i < 16,
}));

export default function UsersPage() {
  return (
    <div className="p-8 max-w-6xl">
      <PageHeader title="Users" description="Gebruikersbeheer en activiteit" />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard label="Total Users" value="2,847" change="+134 deze week" changeType="positive" sparkline={spark(800)} />
        <MetricCard label="DAU" value="312" change="+8.2%" changeType="positive" sparkline={spark(100)} />
        <MetricCard label="Day 7 Retention" value="42%" change="+1.2pp" changeType="positive" sparkline={spark(42)} sparkColor="#6366f1" />
        <MetricCard label="Avg Scans / User" value="4.2" change="+0.3" changeType="positive" sparkline={spark(4)} sparkColor="#f59e0b" />
      </div>

      <div className="relative mb-4 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Zoek op user ID..."
          className="w-full pl-9 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
        />
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2.5 font-medium text-gray-500">User ID</th>
              <th className="text-left px-4 py-2.5 font-medium text-gray-500">Platform</th>
              <th className="text-left px-4 py-2.5 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-2.5 font-medium text-gray-500">Scans</th>
              <th className="text-left px-4 py-2.5 font-medium text-gray-500">Onboarded</th>
              <th className="text-left px-4 py-2.5 font-medium text-gray-500">Laatste activiteit</th>
              <th className="text-right px-4 py-2.5 font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((u) => (
              <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                <td className="px-4 py-2.5 font-medium text-gray-900 font-mono text-[12px]">{u.id}</td>
                <td className="px-4 py-2.5 text-gray-500">{u.platform}</td>
                <td className="px-4 py-2.5">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-4 py-2.5 text-gray-500">{u.scans}</td>
                <td className="px-4 py-2.5">
                  <span className={u.onboarded ? 'text-emerald-600' : 'text-gray-400'}>
                    {u.onboarded ? 'Ja' : 'Nee'}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-400">{u.lastActive}</td>
                <td className="px-4 py-2.5 text-right">
                  <ChevronRight size={14} className="text-gray-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pro: 'text-indigo-700 bg-indigo-50',
    Trial: 'text-amber-700 bg-amber-50',
    Free: 'text-gray-500 bg-gray-100',
  };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${styles[status] ?? styles.Free}`}>
      {status}
    </span>
  );
}
