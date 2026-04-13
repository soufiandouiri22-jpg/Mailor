import { Link2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface PlaceholderProps {
  title: string;
  description: string;
  integration?: string;
}

export default function Placeholder({ title, description, integration }: PlaceholderProps) {
  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title={title} description={description} />
      <div className="flex flex-col items-center justify-center h-80 bg-gray-50 border border-gray-200 border-dashed rounded-xl">
        <Link2 size={32} className="text-gray-300 mb-3" />
        <p className="text-[13px] text-gray-500 mb-1">Deze pagina is nog niet gekoppeld</p>
        {integration && (
          <p className="text-[12px] text-gray-400">
            Koppel <strong>{integration}</strong> via de Integrations pagina om live data te zien
          </p>
        )}
      </div>
    </div>
  );
}
