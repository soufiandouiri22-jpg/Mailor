import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const stepData = [
  {
    title: 'What role does your ideal customer have?',
    key: 'role',
    options: ['CEO', 'CMO', 'Head of Growth', 'Head of Marketing', 'Marketing Manager', 'HR Director', 'VP Sales', 'Founder'],
  },
  {
    title: 'What industry are they in?',
    key: 'industry',
    options: ['Agency', 'SaaS', 'E-commerce', 'Recruiting', 'Finance', 'Healthcare', 'Technology', 'Consulting'],
  },
  {
    title: 'How big is the company?',
    key: 'size',
    options: ['1-10', '11-50', '51-200', '201-500', '500+'],
  },
  {
    title: 'Where are they located?',
    key: 'location',
    options: ['Netherlands', 'Belgium', 'Germany', 'DACH', 'Europe', 'United States', 'United Kingdom', 'Global'],
  },
];

export default function AudienceNew() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selections, setSelections] = useState<Record<string, string[]>>({
    role: [],
    industry: [],
    size: [],
    location: [],
  });

  const current = stepData[step];
  const isLastStep = step === stepData.length;

  const toggleOption = (key: string, value: string) => {
    setSelections((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const canNext = step < stepData.length ? (selections[stepData[step].key]?.length ?? 0) > 0 : name.length > 0;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <PageHeader title="New Audience" description="Define your target audience step by step">
        <Link to="/audiences" className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={14} />
          Back
        </Link>
      </PageHeader>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-8">
        {[...stepData, { title: 'Save' }].map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-gray-900' : 'bg-gray-200'}`} />
        ))}
      </div>

      {/* Steps */}
      {!isLastStep && current && (
        <div>
          <h2 className="text-[18px] font-semibold text-gray-900 mb-6">{current.title}</h2>
          <div className="flex flex-wrap gap-2">
            {current.options.map((opt) => {
              const selected = selections[current.key].includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleOption(current.key, opt)}
                  className={`px-4 py-2.5 rounded-xl text-[13px] font-medium border transition-colors ${
                    selected
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {selected && <Check size={14} className="inline mr-1.5 -mt-0.5" />}
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Save step */}
      {isLastStep && (
        <div>
          <h2 className="text-[18px] font-semibold text-gray-900 mb-6">Name your audience</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Marketing Managers, Agencies, NL"
            className="w-full px-3 py-2.5 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors mb-6"
          />

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-[13px] text-gray-500 font-medium mb-3">Summary</p>
            {stepData.map((s) => (
              <div key={s.key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-[12px] text-gray-400">{s.title.replace('What ', '').replace('How ', '').replace('Where ', '').replace('?', '')}</span>
                <span className="text-[12px] font-medium text-gray-900">{selections[s.key].join(', ') || '—'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        {!isLastStep ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            disabled={!canNext}
            className="inline-flex items-center px-5 py-2 text-[13px] font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Save audience
          </button>
        )}
      </div>
    </div>
  );
}
