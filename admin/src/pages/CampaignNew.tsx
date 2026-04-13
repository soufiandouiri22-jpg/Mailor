import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Send } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { templateContents, highlightTags } from '../data/templates';

const audiences = [
  { id: 1, name: 'Marketing Managers, Agencies, NL', count: 1240 },
  { id: 2, name: 'Heads of Growth, SaaS, EU', count: 3850 },
  { id: 3, name: 'CMOs, E-commerce, DACH', count: 920 },
];

const templates = [
  { id: 1, name: 'Cold Intro', openRate: '67.3%', replyRate: '14.2%' },
  { id: 2, name: 'Follow-up', openRate: '61.8%', replyRate: '11.7%' },
  { id: 3, name: 'Final Follow-up', openRate: '55.2%', replyRate: '8.4%' },
];

const steps = ['Audience', 'Template', 'Review'];

function TagSpan({ part }: { part: { key: number; text: string; isTag: boolean; isAi: boolean } }) {
  if (part.isTag) {
    if (part.isAi) {
      return <span className="inline px-1 py-0.5 rounded text-[11px] font-mono bg-pink-50 text-pink-600">{part.text}</span>;
    }
    return <span className="text-[11px] font-mono text-gray-500">{part.text}</span>;
  }
  return <>{part.text}</>;
}

export default function CampaignNew() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<{ audience: number | null; template: number | null }>({
    audience: null,
    template: null,
  });
  const [sendOption, setSendOption] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('09:00');

  const canNext =
    (step === 0 && selected.audience !== null) ||
    (step === 1 && selected.template !== null) ||
    step === 2;

  const selectedAudience = audiences.find((a) => a.id === selected.audience);
  const selectedTemplate = templates.find((t) => t.id === selected.template);
  const templateContent = selectedTemplate ? templateContents[selectedTemplate.name] : null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <PageHeader title="New Campaign" description="Send a one-time email to an audience">
        <Link to="/campaigns" className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={14} />
          Back
        </Link>
      </PageHeader>

      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium border transition-colors ${
                i < step
                  ? 'bg-gray-900 border-gray-900 text-white'
                  : i === step
                    ? 'bg-gray-900 border-gray-900 text-white'
                    : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={`text-[13px] font-medium ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-3">
          <p className="text-[13px] text-gray-500 mb-4">Choose an audience for this campaign</p>
          {audiences.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected({ ...selected, audience: a.id })}
              className={`w-full text-left p-4 rounded-xl border transition-colors ${
                selected.audience === a.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <p className="text-[14px] font-medium text-gray-900">{a.name}</p>
              <p className="text-[12px] text-gray-400 mt-1">{a.count.toLocaleString()} prospects</p>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <p className="text-[13px] text-gray-500 mb-4">Choose a template</p>
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected({ ...selected, template: t.id })}
              className={`w-full text-left p-4 rounded-xl border transition-colors ${
                selected.template === t.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <p className="text-[14px] font-medium text-gray-900">{t.name}</p>
              <div className="flex gap-4 mt-1.5">
                <span className="text-[12px] text-gray-400">{t.openRate} open rate</span>
                <span className="text-[12px] text-gray-400">{t.replyRate} reply rate</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          {/* Review summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Review your campaign</h3>
            <div className="space-y-0">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-[13px] text-gray-500">Audience</span>
                <div className="text-right">
                  <span className="text-[13px] font-medium text-gray-900">{selectedAudience?.name}</span>
                  <p className="text-[11px] text-gray-400 mt-0.5">{selectedAudience?.count.toLocaleString()} prospects</p>
                </div>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-[13px] text-gray-500">Template</span>
                <span className="text-[13px] font-medium text-gray-900">{selectedTemplate?.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-[13px] text-gray-500">From</span>
                <div className="text-right">
                  <span className="text-[13px] font-medium text-gray-900">Soufian Douiri</span>
                  <p className="text-[11px] text-gray-400 mt-0.5">soufian@ugc.nl</p>
                </div>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[13px] text-gray-500">Subject</span>
                <span className="text-[13px] font-medium text-gray-900">{templateContent?.subject}</span>
              </div>
            </div>
          </div>

          {/* Send time */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">When to send</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSendOption('now')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left ${
                  sendOption === 'now'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Send size={18} className={sendOption === 'now' ? 'text-gray-900' : 'text-gray-400'} />
                <div>
                  <p className="text-[13px] font-medium text-gray-900">Send now</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Starts sending immediately</p>
                </div>
              </button>
              <button
                onClick={() => setSendOption('schedule')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left ${
                  sendOption === 'schedule'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Clock size={18} className={sendOption === 'schedule' ? 'text-gray-900' : 'text-gray-400'} />
                <div>
                  <p className="text-[13px] font-medium text-gray-900">Schedule</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Pick a date and time</p>
                </div>
              </button>
            </div>
            {sendOption === 'schedule' && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Time</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Template preview */}
          {templateContent && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Email preview</h3>
              <div className="mb-3 pb-3 border-b border-gray-100">
                <p className="text-[11px] text-gray-400 mb-0.5">Subject</p>
                <p className="text-[13px] font-medium text-gray-900">
                  {highlightTags(templateContent.subject).map((p) => <TagSpan key={p.key} part={p} />)}
                </p>
              </div>
              <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {highlightTags(templateContent.body).map((p) => <TagSpan key={p.key} part={p} />)}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[13px] text-gray-400 leading-relaxed whitespace-pre-wrap">Best,{'\n'}Soufian Douiri{'\n'}UGC.nl</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ArrowRight size={14} />
          </button>
        ) : (
          <button className="inline-flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
            {sendOption === 'now' ? 'Send Campaign' : 'Schedule Campaign'}
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
