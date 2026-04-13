import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Mail, MessageSquare, Trash2, Eye, Calendar, Info } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Tooltip from '../components/Tooltip';
import { templateContents, highlightTags } from '../data/templates';

interface FlowStep {
  id: number;
  type: 'email' | 'followup';
  label: string;
  template: string;
  delay: string;
}

interface FlowData {
  name: string;
  audience: number | null;
  autoRespond: boolean;
  steps: FlowStep[];
}

const delayOptions = ['1 day', '2 days', '3 days', '5 days', '7 days', '14 days'];
const delayDays: Record<string, number> = { '1 day': 1, '2 days': 2, '3 days': 3, '5 days': 5, '7 days': 7, '14 days': 14 };

const availableTemplates = Object.keys(templateContents);

const audiences = [
  { id: 1, name: 'Marketing Managers, Agencies, NL', count: 1240 },
  { id: 2, name: 'Heads of Growth, SaaS, EU', count: 3850 },
  { id: 3, name: 'CMOs, E-commerce, DACH', count: 920 },
];

const flowsData: Record<string, FlowData> = {
  '1': {
    name: 'Standard Follow-up',
    audience: 1,
    autoRespond: true,
    steps: [
      { id: 1, type: 'email', label: 'Initial Email', template: 'Cold Intro', delay: '' },
      { id: 2, type: 'followup', label: 'Follow-up 1', template: 'Follow-up', delay: '3 days' },
      { id: 3, type: 'followup', label: 'Follow-up 2', template: 'Final Follow-up', delay: '5 days' },
    ],
  },
  '2': {
    name: 'Aggressive',
    audience: 2,
    autoRespond: true,
    steps: [
      { id: 1, type: 'email', label: 'Initial Email', template: 'Cold Intro', delay: '' },
      { id: 2, type: 'followup', label: 'Follow-up 1', template: 'Follow-up', delay: '2 days' },
      { id: 3, type: 'followup', label: 'Follow-up 2', template: 'Final Follow-up', delay: '3 days' },
      { id: 4, type: 'followup', label: 'Final Follow-up', template: 'Final Follow-up', delay: '5 days' },
    ],
  },
  '3': {
    name: 'Gentle',
    audience: 3,
    autoRespond: false,
    steps: [
      { id: 1, type: 'email', label: 'Initial Email', template: 'Final Follow-up', delay: '' },
      { id: 2, type: 'followup', label: 'One Follow-up', template: 'Gentle Nudge', delay: '5 days' },
    ],
  },
};

function TagSpan({ part }: { part: ReturnType<typeof highlightTags>[number] }) {
  if (part.isTag) {
    if (part.isAi) {
      return <span className="inline px-1 py-0.5 rounded text-[11px] font-mono bg-pink-50 text-pink-600">{part.text}</span>;
    }
    return <span className="text-[11px] font-mono text-gray-500">{part.text}</span>;
  }
  return <>{part.text}</>;
}

export default function FlowEdit() {
  const { id } = useParams<{ id: string }>();
  const flow = flowsData[id ?? ''];

  const [name, setName] = useState(flow?.name ?? '');
  const [selectedAudience, setSelectedAudience] = useState<number | null>(flow?.audience ?? null);
  const [autoRespond, setAutoRespond] = useState(flow?.autoRespond ?? false);
  const [steps, setSteps] = useState<FlowStep[]>(flow?.steps ?? []);
  const [selectedStepId, setSelectedStepId] = useState<number>(flow?.steps?.[0]?.id ?? 1);

  if (!flow) {
    return (
      <div className="p-8">
        <p className="text-[14px] text-gray-500">Flow not found.</p>
        <Link to="/flows" className="text-[13px] text-pink-600 hover:text-pink-700 mt-2 inline-block">Back to flows</Link>
      </div>
    );
  }

  let nextId = steps.reduce((max, s) => Math.max(max, s.id), 0) + 1;

  const addFollowUp = () => {
    const newStep: FlowStep = {
      id: nextId++,
      type: 'followup',
      label: `Follow-up ${steps.length}`,
      template: '',
      delay: '3 days',
    };
    setSteps([...steps, newStep]);
    setSelectedStepId(newStep.id);
  };

  const removeStep = (stepId: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((s) => s.id !== stepId);
      setSteps(newSteps);
      if (selectedStepId === stepId) setSelectedStepId(newSteps[0].id);
    }
  };

  const updateStep = (stepId: number, updates: Partial<FlowStep>) => {
    setSteps(steps.map((s) => (s.id === stepId ? { ...s, ...updates } : s)));
  };

  const selectedStep = steps.find((s) => s.id === selectedStepId);
  const selectedTemplate = selectedStep?.template ? templateContents[selectedStep.template] : null;

  const totalDays = steps.reduce((sum, s) => sum + (delayDays[s.delay] ?? 0), 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title={`Edit: ${flow.name}`} description="Edit your automated outreach sequence">
        <Link to="/flows" className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={14} />
          Back
        </Link>
      </PageHeader>

      <div className="flex items-center gap-2 mb-6">
        <Info size={14} className="text-gray-300 shrink-0" />
        <p className="text-[12px] text-gray-400">
          Note: When a prospect replies, all scheduled follow-ups are automatically canceled.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Flow name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Agency Outreach Sequence"
            className="w-full h-[38px] px-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors placeholder:text-[#9ca3af] placeholder:opacity-100"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Audience</label>
          <select
            value={selectedAudience ?? ''}
            onChange={(e) => setSelectedAudience(Number(e.target.value) || null)}
            className={`w-full h-[38px] px-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors bg-white ${selectedAudience === null ? 'text-[#9ca3af]' : 'text-gray-900'}`}
          >
            <option value="">Select an audience</option>
            {audiences.map((a) => (
              <option key={a.id} value={a.id}>{a.name} ({a.count.toLocaleString()})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 mb-1.5">Auto-respond <Tooltip text="Let Mailor automatically respond when a prospect replies." /></label>
          <button
            onClick={() => setAutoRespond(!autoRespond)}
            className="w-full h-[38px] flex items-center gap-3 px-3 border border-gray-200 bg-white rounded-lg transition-colors hover:border-gray-300"
          >
            <MessageSquare size={16} className={autoRespond ? 'text-gray-900' : 'text-[#9ca3af]'} />
            <span className={`text-[13px] ${autoRespond ? 'font-medium text-gray-900' : 'text-[#9ca3af]'}`}>
              {autoRespond ? 'Enabled' : 'Disabled'}
            </span>
            <div className="ml-auto">
              <div className={`w-9 h-5 rounded-full transition-colors relative ${autoRespond ? 'bg-gray-900' : 'bg-gray-200'}`}>
                <div className={`absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${autoRespond ? 'translate-x-[14px]' : ''}`} />
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-[12px] font-medium text-gray-500 mb-4">Sequence</p>
        <div className="overflow-x-auto pb-4">
          <div className="flex items-start gap-0 min-w-min">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-start">
                {i > 0 && (
                  <div className="flex items-center self-center pt-4">
                    <div className="w-8 h-px bg-gray-200" />
                    <select
                      value={step.delay}
                      onChange={(e) => updateStep(step.id, { delay: e.target.value })}
                      className="text-[11px] text-gray-500 bg-white border border-gray-200 rounded-full px-2.5 py-1 font-medium focus:outline-none focus:border-gray-400 shrink-0"
                    >
                      {delayOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <div className="w-8 h-px bg-gray-200" />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedStepId(step.id)}
                  className={`w-[240px] shrink-0 border-2 rounded-xl p-4 text-left transition-colors ${
                    selectedStepId === step.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        step.type === 'email' ? 'bg-pink-50 text-pink-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        <Mail size={14} />
                      </div>
                      <span className="text-[13px] font-medium text-gray-900">{step.label}</span>
                    </div>
                    {step.type !== 'email' && (
                      <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); removeStep(step.id); }}
                        className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </span>
                    )}
                  </div>
                  <select
                    value={step.template}
                    onChange={(e) => { e.stopPropagation(); updateStep(step.id, { template: e.target.value }); }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-2.5 py-1.5 text-[12px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-700"
                  >
                    <option value="">Choose template</option>
                    {availableTemplates.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <p className="text-[11px] text-gray-400 mt-2">
                    {step.type === 'email' ? 'Sent when flow starts' : 'Sent if no reply'}
                  </p>
                </button>
              </div>
            ))}

            <div className="flex items-center self-center pt-4">
              <div className="w-8 h-px bg-gray-200" />
              <button
                onClick={addFollowUp}
                className="w-[120px] shrink-0 flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
              >
                <Plus size={18} className="mb-1" />
                <span className="text-[11px] font-medium">Follow-up</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Eye size={14} className="text-gray-400" />
            <p className="text-[12px] font-medium text-gray-500">
              Template preview {selectedStep ? `\u2014 ${selectedStep.label}` : ''}
            </p>
          </div>
          {selectedTemplate ? (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="mb-3 pb-3 border-b border-gray-100">
                <p className="text-[11px] text-gray-400 mb-0.5">Subject</p>
                <p className="text-[13px] font-medium text-gray-900">
                  {highlightTags(selectedTemplate.subject).map((p) => <TagSpan key={p.key} part={p} />)}
                </p>
              </div>
              <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {highlightTags(selectedTemplate.body).map((p) => <TagSpan key={p.key} part={p} />)}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[13px] text-gray-400 leading-relaxed whitespace-pre-wrap">Best,{'\n'}Soufian Douiri{'\n'}UGC.nl</p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-center min-h-[200px]">
              <p className="text-[13px] text-gray-300">
                {selectedStep?.template ? 'No preview available' : 'Select a template to see the preview'}
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} className="text-gray-400" />
            <p className="text-[12px] font-medium text-gray-500">Timeline</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="space-y-0">
              {steps.map((step, i) => {
                const dayCount = steps.slice(0, i + 1).reduce((sum, s) => sum + (delayDays[s.delay] ?? 0), 0);
                return (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        step.type === 'email' ? 'bg-pink-400' : 'bg-blue-400'
                      }`} />
                      {i < steps.length - 1 && <div className="w-px h-8 bg-gray-200" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-[12px] font-medium text-gray-900">{step.label}</p>
                      <p className="text-[11px] text-gray-400">
                        {i === 0 ? 'Day 0' : `Day ${dayCount}`}
                        {step.template ? ` \u00b7 ${step.template}` : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-3 mt-1 border-t border-gray-100">
              <p className="text-[11px] text-gray-400">
                {steps.length} email{steps.length > 1 ? 's' : ''} over {totalDays} day{totalDays !== 1 ? 's' : ''}
              </p>
              {autoRespond && (
                <p className="text-[11px] text-gray-400 font-medium mt-1">Auto-respond enabled</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button className="inline-flex items-center px-5 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
        Save changes
      </button>
    </div>
  );
}
