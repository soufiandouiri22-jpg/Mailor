import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import MetricCard from '../components/MetricCard';
import PageHeader from '../components/PageHeader';

const spark = (base: number, len = 14) =>
  Array.from({ length: len }, () => base + Math.floor(Math.random() * base * 0.4 - base * 0.2));

const funnelData = [
  { step: 'App Open', value: 1000 },
  { step: 'Onboarding Start', value: 850 },
  { step: 'Doelen', value: 720 },
  { step: 'Dieet', value: 680 },
  { step: 'Allergieën', value: 650 },
  { step: 'Compleet', value: 600 },
  { step: 'Paywall', value: 600 },
  { step: 'Trial Start', value: 180 },
  { step: 'Betaald', value: 90 },
];

const featureData = [
  { feature: 'Scan', count: 3291 },
  { feature: 'Zoeken', count: 5104 },
  { feature: 'Alternatieven', count: 1245 },
  { feature: 'Opslaan', count: 892 },
  { feature: 'Delen', count: 234 },
  { feature: 'Community', count: 456 },
];

export default function Metrics() {
  return (
    <div className="p-8 max-w-7xl">
      <PageHeader title="Metrics" description="App usage, funnels en feature usage" />

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">App Usage</h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="App Opens" value="8,432" change="+8.2%" changeType="positive" sparkline={spark(200)} />
        <MetricCard label="Screen Views" value="34,291" change="+5.1%" changeType="positive" sparkline={spark(800)} />
        <MetricCard label="Avg Session" value="3m 42s" change="+12s" changeType="positive" sparkline={spark(220)} sparkColor="#6366f1" />
        <MetricCard label="DAU / MAU" value="24.8%" change="+1.2pp" changeType="positive" sparkline={spark(25)} sparkColor="#6366f1" />
      </div>

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Onboarding & Paywall Funnel</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="step" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
              <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-4 text-[12px] text-gray-500">
          <span>Onboarding completion: <strong className="text-gray-900">60%</strong></span>
          <span>Paywall conversion: <strong className="text-gray-900">9.2%</strong></span>
          <span>Trial → Paid: <strong className="text-gray-900">50%</strong></span>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Feature Usage (deze week)</h2>
      <div className="grid grid-cols-3 gap-4">
        {featureData.map((f) => (
          <MetricCard
            key={f.feature}
            label={f.feature}
            value={f.count.toLocaleString()}
            sparkline={spark(f.count / 10)}
          />
        ))}
      </div>
    </div>
  );
}
