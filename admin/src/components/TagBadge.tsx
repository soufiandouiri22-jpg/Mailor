interface TagBadgeProps {
  tag: string;
  variant?: 'ai' | 'variable';
}

export default function TagBadge({ tag, variant = 'variable' }: TagBadgeProps) {
  const classes =
    variant === 'ai'
      ? 'bg-purple-50 text-purple-600 border-purple-100'
      : 'bg-blue-50 text-blue-600 border-blue-100';

  return (
    <span className={`inline-flex px-1.5 py-0.5 rounded text-[11px] font-mono border ${classes}`}>
      {tag}
    </span>
  );
}
