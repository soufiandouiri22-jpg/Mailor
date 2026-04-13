interface StatBadgeProps {
  label: string;
  value: string;
}

export default function StatBadge({ label, value }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[12px] font-medium text-gray-900">{value}</span>
      <span className="text-[11px] text-gray-400">{label}</span>
    </div>
  );
}
