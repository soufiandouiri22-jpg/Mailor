import { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  text: string;
  size?: number;
}

export default function Tooltip({ text, size = 14 }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Info size={size} className="text-gray-300 hover:text-gray-400 transition-colors cursor-help" />
      {visible && (
        <span className="absolute top-full left-0 mt-2 px-3 py-2 text-[11px] text-gray-600 bg-white border border-gray-200 rounded-lg shadow-lg whitespace-normal w-[220px] leading-relaxed z-50 pointer-events-none">
          {text}
          <span className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-200" />
        </span>
      )}
    </span>
  );
}
