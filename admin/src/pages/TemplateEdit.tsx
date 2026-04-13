import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Lightbulb, RotateCcw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { exampleLead } from '../data/templates';

const availableTags = [
  { tag: '{{contact.first_name}}', label: 'First name' },
  { tag: '{{contact.last_name}}', label: 'Last name' },
  { tag: '{{account.name}}', label: 'Company' },
  { tag: '{{mailor.icebreaker}}', label: 'Icebreaker', ai: true },
  { tag: '{{sender.first_name}}', label: 'Your name' },
  { tag: '{{sender.company_name}}', label: 'Company name' },
  { tag: '{{mailor.value_proposition}}', label: 'Value proposition', ai: true },
  { tag: '{{sender.calendly_link}}', label: 'Calendly link' },
];

const templatesData: Record<string, { name: string; subject: string; previewText: string; body: string }> = {
  '1': {
    name: 'Cold Intro',
    subject: 'Quick question about {{account.name}}',
    previewText: 'Thought we could be a great fit.',
    body: `Hey {{contact.first_name}},

{{mailor.icebreaker}}

{{mailor.value_proposition}}

Happy to do a quick demo if you are interested:
{{sender.calendly_link}}`,
  },
  '2': {
    name: 'Follow-up',
    subject: 'Re: Quick question about {{account.name}}',
    previewText: 'Following up on my last email.',
    body: `Hey {{contact.first_name}},

Just following up on my last email. I know things get busy so I wanted to keep this short.

We have been helping teams like yours and would love to show you how.

Open to a quick 15 min call?
{{sender.calendly_link}}`,
  },
  '3': {
    name: 'Final Follow-up',
    subject: 'Re: Quick question about {{account.name}}',
    previewText: 'Last follow-up from my side.',
    body: `Hey {{contact.first_name}},

Last follow-up from my side. If the timing is not right, no worries at all.

If you are ever looking for a reliable partner, feel free to reach out anytime.`,
  },
};

const mailorMarkerClass =
  'rounded-sm px-0.5 py-px box-decoration-clone bg-pink-200/70 text-gray-900';

function renderPreview(text: string) {
  const parts = text.split(/({{[^}]+}})/g);
  return parts.map((part, i) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const resolved = exampleLead[part] ?? part;
      const isMailorAi = part.includes('mailor.');
      if (isMailorAi) {
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

export default function TemplateEdit() {
  const { id } = useParams<{ id: string }>();
  const original = templatesData[id ?? ''];

  const [name, setName] = useState(original?.name ?? '');
  const [subject, setSubject] = useState(original?.subject ?? '');
  const [previewText, setPreviewText] = useState(original?.previewText ?? '');
  const [body, setBody] = useState(original?.body ?? '');
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (tag: string) => {
    const ta = bodyRef.current;
    if (!ta) { setBody((prev) => prev + tag); return; }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = body.slice(0, start);
    const after = body.slice(end);
    const newBody = before + tag + after;
    setBody(newBody);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + tag.length;
      ta.setSelectionRange(pos, pos);
    });
  };

  const hasChanges = original && (
    name !== original.name || subject !== original.subject || previewText !== original.previewText || body !== original.body
  );

  const restore = () => {
    if (original) {
      setName(original.name);
      setSubject(original.subject);
      setPreviewText(original.previewText);
      setBody(original.body);
    }
  };

  if (!original) {
    return (
      <div className="p-8">
        <p className="text-[14px] text-gray-500">Template not found.</p>
        <Link to="/templates" className="text-[13px] text-pink-600 hover:text-pink-700 mt-2 inline-block">Back to templates</Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <PageHeader title={`Edit: ${original.name}`} description="Edit your email template">
        <div className="flex items-center gap-3">
          {hasChanges && (
            <button
              onClick={restore}
              className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              <RotateCcw size={14} />
              Restore original
            </button>
          )}
          <Link to="/templates" className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>
      </PageHeader>

      <div className="flex items-center gap-2 mb-6">
        <Lightbulb size={14} className="text-gray-300 shrink-0" />
        <p className="text-[12px] text-gray-400">
          Tip: Keep your emails short and authentic for better credibility.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Template name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cold Intro"
              className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Subject line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Quick question about {{account.name}}"
              className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Preview text</label>
            <input
              type="text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Shown next to the subject in the inbox"
              className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Body</label>
            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={16}
              placeholder="Write your email here..."
              className="w-full px-3 py-2 text-[13px] leading-relaxed border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none font-mono"
            />
          </div>
          <div>
            <p className="text-[11px] font-medium text-gray-400 mb-2">Insert tag</p>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((t) => (
                <button
                  key={t.tag}
                  onClick={() => insertTag(t.tag)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                    t.ai
                      ? 'bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center px-5 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
              Save changes
            </button>
            {hasChanges && (
              <span className="text-[11px] text-gray-400">Unsaved changes</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-[12px] font-medium text-gray-500 mb-1.5">Preview</p>
          <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[400px]">
            {(subject || previewText) && (
              <div className="mb-3 pb-3 border-b border-gray-100">
                <p className="text-[11px] text-gray-400 mb-0.5">Subject</p>
                <p className="text-[13px] font-medium text-gray-900">
                  {subject ? renderPreview(subject) : <span className="text-gray-300">No subject</span>}
                  {previewText && <span className="text-gray-400 font-normal"> · {previewText}</span>}
                </p>
              </div>
            )}
            <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {body ? renderPreview(body) : (
                <span className="text-gray-300">Your email preview will appear here...</span>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[13px] text-gray-400 leading-relaxed whitespace-pre-wrap">Best,{'\n'}Soufian Douiri{'\n'}UGC.nl</p>
              <p className="text-[10px] text-gray-300 mt-2">Signature from <a href="/settings" className="underline hover:text-gray-400">Settings</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
