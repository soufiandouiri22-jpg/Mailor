import { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Calendar, ChevronDown, X, Check } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import PageHeader from '../components/PageHeader';

const chartData = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  sent: 40 + Math.floor(Math.random() * 30),
  replies: 5 + Math.floor(Math.random() * 12),
}));

const spark = (base: number, len = 14) =>
  Array.from({ length: len }, () => base + Math.floor(Math.random() * base * 0.4 - base * 0.2));

const activity = [
  { text: 'Daniel van Dijk replied', detail: 'AdScale', time: '2 min ago' },
  { text: 'Meeting booked', detail: 'Sarah Chen, Funnel.io · Thursday 10:00', time: '18 min ago' },
  { text: 'Tom de Vries opened email', detail: 'ScaleUp', time: '1h ago' },
  { text: 'Meeting booked', detail: 'Lisa Müller, Packhelp · Friday 14:00', time: '2h ago' },
  { text: 'New reply from Marc Jansen', detail: 'BoldMedia', time: '3h ago' },
  { text: 'Follow-up sent', detail: 'Anna de Boer, Freshworks', time: '4h ago' },
];

const dateRangePresets = ['Last 7 days', 'Last 14 days', 'Last 30 days', 'Last 90 days', 'Custom'];
const compareOptions = [
  { value: 'Previous period', detail: 'Oct 13 – Jan 10' },
  { value: 'None', detail: '' },
];
const campaignOptions = ['All campaigns', 'Agency Outreach NL', 'SaaS Decision Makers', 'E-commerce DACH'];

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

function getDateRange(preset: string): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  const days = preset === 'Last 7 days' ? 7 : preset === 'Last 14 days' ? 14 : preset === 'Last 90 days' ? 90 : 30;
  start.setDate(end.getDate() - days);
  const fmt = (d: Date) => d.toISOString().split('T')[0];
  return { start: fmt(start), end: fmt(end) };
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [compareWith, setCompareWith] = useState('Previous period');
  const [campaign, setCampaign] = useState('All campaigns');

  const [dateOpen, setDateOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);

  const initialDates = getDateRange('Last 30 days');
  const [draftPreset, setDraftPreset] = useState('Last 30 days');
  const [startDate, setStartDate] = useState(initialDates.start);
  const [endDate, setEndDate] = useState(initialDates.end);

  const dateRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const campaignRef = useRef<HTMLDivElement>(null);

  useClickOutside(dateRef, () => setDateOpen(false));
  useClickOutside(compareRef, () => setCompareOpen(false));
  useClickOutside(campaignRef, () => setCampaignOpen(false));

  const handlePresetChange = (preset: string) => {
    setDraftPreset(preset);
    if (preset !== 'Custom') {
      const dates = getDateRange(preset);
      setStartDate(dates.start);
      setEndDate(dates.end);
    }
  };

  const applyDateRange = () => {
    setDateRange(draftPreset === 'Custom' ? `${startDate} – ${endDate}` : draftPreset);
    setDateOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title="Analytics" description="Performance overview of your outreach" />

      {/* Filters */}
      <div className="flex items-end gap-4 mb-8">
        {/* Date range */}
        <div className="relative" ref={dateRef}>
          <label className="block text-[11px] font-medium text-gray-400 mb-1.5">Date range</label>
          <button
            onClick={() => { setDateOpen(!dateOpen); setCompareOpen(false); setCampaignOpen(false); }}
            className={`h-[36px] pl-8 pr-3 flex items-center gap-2 text-[13px] font-medium text-gray-700 bg-white border rounded-lg transition-colors cursor-pointer focus:outline-none ${dateOpen ? 'border-gray-400' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <Calendar size={14} className="absolute left-3 text-gray-400" />
            <span>{dateRange}</span>
            <ChevronDown size={14} className="text-gray-400 ml-1" />
          </button>
          {dateOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-5 z-50 w-[500px]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-semibold text-gray-900">Date range</p>
                <button onClick={() => setDateOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1.5">Preset</label>
                  <div className="relative">
                    <select
                      value={draftPreset}
                      onChange={(e) => handlePresetChange(e.target.value)}
                      className="w-full h-[36px] pl-3 pr-8 text-[13px] font-medium text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                    >
                      {dateRangePresets.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1.5">Start date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setDraftPreset('Custom'); }}
                    className="w-full h-[36px] px-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1.5">End date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setDraftPreset('Custom'); }}
                    className="w-full h-[36px] px-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setDateOpen(false)}
                  className="px-4 py-1.5 text-[13px] font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={applyDateRange}
                  className="px-4 py-1.5 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Compare with */}
        <div className="relative" ref={compareRef}>
          <label className="block text-[11px] font-medium text-gray-400 mb-1.5">Compare with</label>
          <button
            onClick={() => { setCompareOpen(!compareOpen); setDateOpen(false); setCampaignOpen(false); }}
            className={`h-[36px] px-3 flex items-center gap-2 text-[13px] font-medium text-gray-700 bg-white border rounded-lg transition-colors cursor-pointer focus:outline-none ${compareOpen ? 'border-gray-400' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <span>{compareWith}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {compareOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 min-w-[240px]">
              {compareOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setCompareWith(opt.value); setCompareOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 flex items-center justify-center">
                      {compareWith === opt.value && <Check size={14} className="text-gray-900" />}
                    </div>
                    <span className="text-[13px] font-medium text-gray-700">{opt.value}</span>
                  </div>
                  {opt.detail && <span className="text-[11px] text-gray-400 ml-4">{opt.detail}</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter by campaign */}
        <div className="relative" ref={campaignRef}>
          <label className="block text-[11px] font-medium text-gray-400 mb-1.5">Filter by campaign</label>
          <button
            onClick={() => { setCampaignOpen(!campaignOpen); setDateOpen(false); setCompareOpen(false); }}
            className={`h-[36px] px-3 flex items-center gap-2 text-[13px] font-medium text-gray-700 bg-white border rounded-lg transition-colors cursor-pointer focus:outline-none ${campaignOpen ? 'border-gray-400' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <span>{campaign}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {campaignOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 min-w-[240px]">
              {campaignOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setCampaign(opt); setCampaignOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-4 flex items-center justify-center">
                    {campaign === opt && <Check size={14} className="text-gray-900" />}
                  </div>
                  <span className="text-[13px] font-medium text-gray-700">{opt}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Emails Sent"
          value="2,847"
          change="+12.3% vs last week"
          changeType="positive"
          sparkline={spark(200)}
          sparkColor="#93c5fd"
        />
        <MetricCard
          label="Replies"
          value="382"
          change="+18.7%"
          changeType="positive"
          sparkline={spark(50)}
          sparkColor="#86efac"
        />
        <MetricCard
          label="Meetings Booked"
          value="47"
          change="+8 this week"
          changeType="positive"
          sparkline={spark(12)}
          sparkColor="#93c5fd"
        />
        <MetricCard
          label="Open Rate"
          value="64.2%"
          change="+2.1pp"
          changeType="positive"
          sparkline={spark(64)}
          sparkColor="#86efac"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <MetricCard label="Reply Rate" value="13.4%" change="+1.8pp" changeType="positive" sparkline={spark(13)} sparkColor="#93c5fd" />
        <MetricCard label="Click Rate" value="8.7%" change="+0.6pp" changeType="positive" sparkline={spark(9)} sparkColor="#86efac" />
        <MetricCard label="Bounce Rate" value="1.2%" change="Stable" changeType="neutral" sparkline={spark(1)} sparkColor="#93c5fd" />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13px] text-gray-500 font-medium">Emails Sent & Replies</p>
            <p className="text-[12px] text-gray-400 mt-0.5">{dateRange}</p>
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
              <Line type="monotone" dataKey="sent" stroke="#f9a8d4" strokeWidth={2} dot={false} name="Sent" />
              <Line type="monotone" dataKey="replies" stroke="#93c5fd" strokeWidth={2} dot={false} name="Replies" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-[13px] text-gray-500 font-medium mb-4">Recent Activity</p>
        <div className="space-y-0">
          {activity.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-[13px] font-medium text-gray-900">{item.text}</p>
                <p className="text-[12px] text-gray-400 mt-0.5">{item.detail}</p>
              </div>
              <span className="text-[11px] text-gray-400 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
