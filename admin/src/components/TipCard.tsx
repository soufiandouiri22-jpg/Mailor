import { Lightbulb } from 'lucide-react';
import { useMemo } from 'react';

interface TipCardProps {
  tips: string[];
}

export default function TipCard({ tips }: TipCardProps) {
  const tip = useMemo(() => tips[Math.floor(Math.random() * tips.length)], [tips]);

  return (
    <div className="flex items-start gap-3 rounded-xl bg-amber-50/60 border border-amber-100 px-4 py-3.5 mb-6">
      <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
      <p className="text-[13px] text-amber-800/70 leading-relaxed">{tip}</p>
    </div>
  );
}
