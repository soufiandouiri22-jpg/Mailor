interface FlowConnectorProps {
  delay: string;
}

export default function FlowConnector({ delay }: FlowConnectorProps) {
  return (
    <div className="flex flex-col items-center gap-0 py-1">
      <div className="w-px h-6 bg-gray-200" />
      <span className="text-[11px] text-gray-400 bg-white border border-gray-200 rounded-full px-2.5 py-1 font-medium">
        {delay}
      </span>
      <div className="w-px h-6 bg-gray-200" />
    </div>
  );
}
