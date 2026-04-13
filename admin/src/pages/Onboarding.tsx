import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Building2, Target, User, Pen } from 'lucide-react';

const steps = ['Company', 'Value proposition', 'Sender', 'Signature'];
const stepIcons = [Building2, Target, User, Pen];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [product, setProduct] = useState('');
  const [valueProposition, setValueProposition] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [calendlyLink, setCalendlyLink] = useState('');
  const [signature, setSignature] = useState('');

  const canNext = (() => {
    switch (step) {
      case 0: return companyName.trim() !== '' && product.trim() !== '';
      case 1: return valueProposition.trim() !== '';
      case 2: return firstName.trim() !== '' && senderEmail.trim() !== '';
      case 3: return true;
      default: return false;
    }
  })();

  const buildSignature = () => {
    const name = [firstName, lastName].filter(Boolean).join(' ');
    return `Best,\n${name}${companyName ? `\n${companyName}` : ''}`;
  };

  const handleNextFromSender = () => {
    if (!signature) {
      setSignature(buildSignature());
    }
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[520px]">
        <div className="flex items-baseline justify-center gap-2 mb-8 text-[22px] text-gray-900 tracking-[-0.02em] font-black">
          <img src="/images/mailor-logo.png" alt="Mailor" className="h-[1em] w-auto shrink-0 self-center object-contain" />
          <span>Mailor</span>
        </div>

        <h1 className="text-[22px] font-bold text-gray-900 text-center mb-2">Set up your workspace</h1>
        <p className="text-[14px] text-gray-500 text-center mb-10">This takes about 2 minutes. We&apos;ll use this to personalize your outreach.</p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={s} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      i < step
                        ? 'bg-gray-900 text-white'
                        : i === step
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {i < step ? <Check size={14} /> : <Icon size={14} />}
                  </div>
                  <span className={`text-[12px] font-medium hidden sm:block ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className="w-6 h-px bg-gray-200" />}
              </div>
            );
          })}
        </div>
        {/* Form content — fixed height to prevent layout shift */}
        <div className="min-h-[320px]">
        {/* Step 0: Company */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Company name *</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Inc."
                className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. https://acme.com"
                className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">What do you sell or offer? *</label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. UGC content, SaaS platform, consulting"
                className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Step 1: Value proposition */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Your value proposition *</label>
              <p className="text-[12px] text-gray-400 mb-3">What do you offer and why should prospects care? Mailor uses this to understand your business and tailor outreach accordingly.</p>
              <textarea
                value={valueProposition}
                onChange={(e) => setValueProposition(e.target.value)}
                placeholder="e.g. We work with several agencies that source UGC content through us at competitive rates and successfully use it for their clients."
                rows={4}
                className="w-full px-3 py-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Target audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Marketing agencies, e-commerce brands"
                className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Step 2: Sender info */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">First name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Soufian"
                  className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Douiri"
                  className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Sending email *</label>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="soufian@acme.com"
                className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Calendly link</label>
              <input
                type="url"
                value={calendlyLink}
                onChange={(e) => setCalendlyLink(e.target.value)}
                placeholder="https://calendly.com/you/meeting"
                className="w-full h-[44px] px-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Step 3: Signature */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email signature</label>
              <p className="text-[12px] text-gray-400 mb-3">This will appear at the bottom of every email you send.</p>
              <textarea
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                rows={4}
                className="w-full px-3 py-3 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={14} />
              Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              onClick={() => step === 2 ? handleNextFromSender() : setStep(step + 1)}
              disabled={!canNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Continue
              <ArrowRight size={14} />
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            >
              Launch your workspace
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
