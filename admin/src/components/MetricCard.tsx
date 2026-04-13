import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  sparkline?: number[];
  sparkColor?: string;
}

export default function MetricCard({
  label,
  value,
  change,
  changeType = 'neutral',
  sparkline,
  sparkColor = '#93c5fd',
}: MetricCardProps) {
  const changeColorClass =
    changeType === 'positive'
      ? 'text-emerald-400'
      : changeType === 'negative'
        ? 'text-red-400'
        : 'text-gray-400';

  const data = sparkline?.map((v, i) => ({ i, v }));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between min-h-[140px]">
      <p className="text-[13px] text-gray-500 font-medium">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <div>
          <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
          {change && (
            <p className={`text-[12px] font-medium mt-0.5 ${changeColorClass}`}>{change}</p>
          )}
        </div>
        {data && data.length > 0 && (
          <div className="w-24 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={sparkColor}
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
