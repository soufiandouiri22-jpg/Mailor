import { Link } from 'react-router-dom';
import { Plus, Pencil } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatBadge from '../components/StatBadge';
import { buildPreviewTagMap, defaultTemplateListPreviewLead } from '../data/templates';

const templateListPreviewMap = buildPreviewTagMap(defaultTemplateListPreviewLead);


const templates = [
  {
    id: 1,
    name: 'Cold Intro',
    body: `Hey {{contact.first_name}},

{{mailor.icebreaker}}

{{mailor.value_proposition}}

Happy to do a quick demo if you are interested:
{{sender.calendly_link}}`,
    openRate: '67.3%',
    replyRate: '14.2%',
    clickRate: '9.8%',
  },
  {
    id: 2,
    name: 'Follow-up',
    body: `Hey {{contact.first_name}},

Just following up on my last email. I know things get busy so I wanted to keep this short.

We have been helping teams like yours and would love to show you how.

Open to a quick 15 min call?
{{sender.calendly_link}}`,
    openRate: '61.8%',
    replyRate: '11.7%',
    clickRate: '7.2%',
  },
  {
    id: 3,
    name: 'Final Follow-up',
    body: `Hey {{contact.first_name}},

Last follow-up from my side. If the timing is not right, no worries at all.

If you are ever looking for a reliable partner, feel free to reach out anytime.`,
    openRate: '55.2%',
    replyRate: '8.4%',
    clickRate: '5.1%',
  },
];

const mailorMarkerClass =
  'rounded-sm px-0.5 py-px box-decoration-clone bg-pink-200/70 text-gray-900';

/** Resolved preview: same lead on all cards; Mailor lines with highlighter. */
function renderResolvedTemplateBody(body: string) {
  const map = templateListPreviewMap;
  const parts = body.split(/({{[^}]+}})/g);
  return parts.map((part, i) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const resolved = map[part] ?? part;
      if (part.includes('mailor.')) {
        return (
          <span key={i} className={mailorMarkerClass}>
            {resolved}
          </span>
        );
      }
      return <span key={i}>{resolved}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Templates() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title="Templates" description="Email templates for your campaigns">
        <Link
          to="/templates/new"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New template
        </Link>
      </PageHeader>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {templates.map((t) => (
          <div
            key={t.id}
            className="relative bg-white border border-gray-200 rounded-xl p-5 flex flex-col"
          >
            <Link
              to={`/templates/${t.id}/edit`}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Pencil size={14} />
            </Link>
            <div className="mb-3 pb-3 border-b border-gray-100">
              <h3 className="text-[14px] font-semibold text-gray-900">{t.name}</h3>
            </div>
            <div className="flex-1 text-[12px] text-gray-500 leading-relaxed whitespace-pre-wrap overflow-hidden mb-4">
              {renderResolvedTemplateBody(t.body)}
              <div className="mt-3 pt-3 border-t border-gray-100 text-gray-400">Best,{'\n'}Soufian Douiri{'\n'}UGC.nl</div>
            </div>
            <div className="mt-auto flex items-center gap-4 pt-3 border-t border-gray-100">
              <StatBadge label="open" value={t.openRate} />
              <StatBadge label="reply" value={t.replyRate} />
              <StatBadge label="click" value={t.clickRate} />
            </div>
          </div>
        ))}

        {/* Add new template card */}
        <Link
          to="/templates/new"
          className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
        >
          <Plus size={24} className="mb-2" />
          <span className="text-[13px] font-medium">Create template</span>
        </Link>
      </div>
    </div>
  );
}
