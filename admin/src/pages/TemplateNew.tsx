import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb } from 'lucide-react';
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

const starterTemplate = `Hey {{contact.first_name}},

{{mailor.icebreaker}}

{{mailor.value_proposition}}

Happy to do a quick demo if you are interested:
{{sender.calendly_link}}`;

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

export default function TemplateNew() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [body, setBody] = useState('');
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

  const loadStarter = () => {
    setName('Cold Intro');
    setSubject('Quick question about {{account.name}}');
    setPreviewText('Thought we could be a great fit.');
    setBody(starterTemplate);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <PageHeader title="New Template" description="Create a new email template">
        <Link to="/templates" className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={14} />
          Back
        </Link>
      </PageHeader>

      <div className="flex items-center gap-2 mb-6">
        <Lightbulb size={14} className="text-gray-300 shrink-0" />
        <p className="text-[12px] text-gray-400">
          Tip: Keep your emails short and authentic for better credibility.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Editor */}
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[12px] font-medium text-gray-500">Body</label>
              <button
                onClick={loadStarter}
                className="text-[11px] text-pink-600 hover:text-pink-800 font-medium transition-colors"
              >
                Load Mailor template
              </button>
            </div>
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

          <button className="inline-flex items-center px-5 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
            Save template
          </button>
        </div>

        {/* Preview */}
        <div>
          <p className="text-[12px] font-medium text-gray-500 mb-1.5">Preview</p>
          <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[400px]">
            {(subject || previewText) && (
              <div className="mb-3 pb-3 border-b border-gray-100">
                <p className="text-[11px] text-gray-400 mb-0.5">Subject</p>
                <p className="text-[13px] font-medium text-gray-900">
                  {subject ? highlightPreview(subject) : <span className="text-gray-300">No subject</span>}
                  {previewText && <span className="text-gray-400 font-normal"> · {previewText}</span>}
                </p>
              </div>
            )}
            <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {body ? highlightPreview(body) : (
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
