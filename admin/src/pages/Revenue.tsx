import { useEffect, useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { RefreshCw } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import PageHeader from '../components/PageHeader';
import { useIntegrations } from '../lib/integrations';
import {
  getOverviewMetrics,
  findMetric,
  formatCurrency,
  type OverviewMetric,
} from '../lib/revenuecatService';

const MOCK_SPARK = (base: number, len = 14) =>
  Array.from({ length: len }, () => base + Math.floor(Math.random() * base * 0.4 - base * 0.2));

const MOCK_MRR = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'][i],
  mrr: 800 + i * 180 + Math.floor(Math.random() * 200),
}));

const MOCK_SUBS = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  new: Math.floor(Math.random() * 8) + 1,
  churned: Math.floor(Math.random() * 3),
}));

function metricValue(metrics: OverviewMetric[], id: string): number {
  return findMetric(metrics, id)?.value ?? 0;
}

function isMoney(id: string): boolean {
  return ['mrr', 'revenue', 'revenue_today', 'arpu'].includes(id);
}

export default function Revenue() {
  const integrations = useIntegrations();
  const connected = integrations.find(i => i.id === 'revenuecat')?.connected ?? false;

  const [metrics, setMetrics] = useState<OverviewMetric[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async () => {
    if (!connected) return;
    setLoading(true);
    setError('');
    try {
      const data = await getOverviewMetrics('EUR');
      setMetrics(data.metrics);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fout bij ophalen');
    } finally {
      setLoading(false);
    }
  }, [connected]);

  useEffect(() => { load(); }, [load]);

  if (!connected) {
    return (
      <div className="p-8 max-w-7xl">
        <PageHeader title="Revenue" description="RevenueCat subscription metrics">
          <div className="px-3 py-1.5 bg-amber-50 text-amber-700 text-[12px] font-medium rounded-lg border border-amber-200">
            Koppel RevenueCat via Integrations voor live data
          </div>
        </PageHeader>
        <MockRevenue />
      </div>
    );
  }

  const mrr = metricValue(metrics, 'mrr');
  const activeSubs = metricValue(metrics, 'active_subscriptions');
  const activeTrials = metricValue(metrics, 'active_trials');
  const churnRate = metricValue(metrics, 'churn_rate');
  const trialConversion = metricValue(metrics, 'trial_conversion');
  const revenue = metricValue(metrics, 'revenue');
  const refunds = metricValue(metrics, 'refund_rate');
  const newSubs = metricValue(metrics, 'new_subscriptions');

  return (
    <div className="p-8 max-w-7xl">
      <PageHeader title="Revenue" description="RevenueCat subscription metrics — live data">
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-[11px] text-gray-400">
              Bijgewerkt: {lastUpdated.toLocaleTimeString('nl-NL')}
            </span>
          )}
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Ververs
          </button>
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[12px] font-medium rounded-lg border border-emerald-200">
            Live — RevenueCat
          </span>
        </div>
      </PageHeader>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-700">
          {error}
        </div>
      )}

      {loading && metrics.length === 0 ? (
        <p className="text-gray-400 text-sm">Data ophalen van RevenueCat...</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <MetricCard
              label="MRR"
              value={formatCurrency(mrr)}
              sparkColor="#6366f1"
            />
            <MetricCard
              label="Active Subscribers"
              value={activeSubs.toLocaleString()}
              sparkColor="#6366f1"
            />
            <MetricCard
              label="Active Trials"
              value={activeTrials.toLocaleString()}
              sparkColor="#f59e0b"
            />
            <MetricCard
              label="New Subscriptions"
              value={newSubs.toLocaleString()}
              sparkColor="#10b981"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <MetricCard
              label="Revenue"
              value={formatCurrency(revenue)}
              sparkColor="#10b981"
            />
            <MetricCard
              label="Trial → Paid"
              value={`${(trialConversion / 100).toFixed(1)}%`}
              sparkColor="#10b981"
            />
            <MetricCard
              label="Churn Rate"
              value={`${(churnRate / 100).toFixed(1)}%`}
              sparkColor="#ef4444"
            />
            <MetricCard
              label="Refund Rate"
              value={`${(refunds / 100).toFixed(1)}%`}
              sparkColor="#ef4444"
            />
          </div>

          {metrics.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-[13px] text-gray-500 font-medium mb-4">Alle metrics</p>
              <div className="grid grid-cols-3 gap-3">
                {metrics.map(m => (
                  <div key={m.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-[12px] text-gray-400">{m.name}</p>
                      <p className="text-[14px] font-semibold text-gray-900">
                        {isMoney(m.id) ? formatCurrency(m.value) : m.value.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-300 font-mono">{m.id}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MockRevenue() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6 opacity-60">
        <MetricCard label="MRR" value="€—" change="Geen data" changeType="neutral" sparkline={MOCK_SPARK(600)} sparkColor="#6366f1" />
        <MetricCard label="Active Subscribers" value="—" change="Geen data" changeType="neutral" sparkline={MOCK_SPARK(50)} sparkColor="#6366f1" />
        <MetricCard label="Active Trials" value="—" change="Geen data" changeType="neutral" sparkline={MOCK_SPARK(15)} sparkColor="#f59e0b" />
        <MetricCard label="Churn Rate" value="—" change="Geen data" changeType="neutral" sparkline={MOCK_SPARK(4)} sparkColor="#ef4444" />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6 opacity-60">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-[13px] text-gray-500 font-medium mb-4">MRR Trend</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_MRR}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} formatter={(v) => [`€${v}`, 'MRR']} />
                <Line type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-[13px] text-gray-500 font-medium mb-4">New vs Churned (mock data)</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SUBS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                <Bar dataKey="new" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="churned" fill="#ef4444" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
