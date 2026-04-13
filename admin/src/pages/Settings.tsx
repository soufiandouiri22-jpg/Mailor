import { useState } from 'react';
import { Mail, User, Globe, Pen, ChevronRight, X, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Settings() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <PageHeader title="Settings" description="Configure your workspace and email settings" />

      <div className="space-y-4">
        {/* Email Connection */}
        <button
          onClick={() => setActiveModal('email')}
          className="w-full bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-900">Email Connection</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Connect your email account to send campaigns</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[12px] font-medium text-gray-400">Not connected</span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </button>

        {/* Sender Info */}
        <button
          onClick={() => setActiveModal('sender')}
          className="w-full bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
              <User size={16} />
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-900">Sender Info</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Soufian Douiri · soufian@ugc.nl</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </button>

        {/* Value Proposition */}
        <button
          onClick={() => setActiveModal('value')}
          className="w-full bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-900">Value Proposition</p>
              <p className="text-[12px] text-gray-400 mt-0.5 max-w-md truncate">We work with several agencies that source UGC content through us at competitive rates</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </button>

        {/* Email Signature */}
        <button
          onClick={() => setActiveModal('signature')}
          className="w-full bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
              <Pen size={16} />
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-900">Email Signature</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Best, Soufian Douiri, UGC.nl</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </button>

        {/* Domain Verification */}
        <button
          onClick={() => setActiveModal('domain')}
          className="w-full bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-gray-300 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
              <Globe size={16} />
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-900">Domain Verification</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Improve deliverability with SPF, DKIM, and DMARC</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[12px] font-medium text-amber-500">Not verified</span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </button>
      </div>

      {/* Email Connection Modal */}
      <Modal open={activeModal === 'email'} onClose={() => setActiveModal(null)} title="Email Connection">
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Email address</label>
            <input type="email" placeholder="you@company.com" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">SMTP Server</label>
            <input type="text" placeholder="smtp.gmail.com" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Port</label>
              <input type="text" placeholder="587" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Encryption</label>
              <select className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors bg-white">
                <option>TLS</option>
                <option>SSL</option>
                <option>None</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-[13px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">Connect email</button>
          </div>
        </div>
      </Modal>

      {/* Sender Info Modal */}
      <Modal open={activeModal === 'sender'} onClose={() => setActiveModal(null)} title="Sender Info">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">First name</label>
              <input type="text" defaultValue="Soufian" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Last name</label>
              <input type="text" defaultValue="Douiri" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Company name</label>
            <input type="text" defaultValue="UGC.nl" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Sending email</label>
            <input type="email" defaultValue="soufian@ugc.nl" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Calendly link</label>
            <input type="text" defaultValue="https://calendly.com/ugc-nl/demo" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-[13px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">Save changes</button>
          </div>
        </div>
      </Modal>

      {/* Value Proposition Modal */}
      <Modal open={activeModal === 'value'} onClose={() => setActiveModal(null)} title="Value Proposition">
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Your value proposition</label>
            <p className="text-[11px] text-gray-400 mb-2">Mailor generates the full value paragraph for {'{{mailor.value_proposition}}'} from your business context (not just one clause).</p>
            <textarea rows={4} defaultValue="source UGC content through us at competitive rates and successfully use it for their clients" className="w-full px-3 py-3 text-[13px] leading-relaxed border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Target audience</label>
            <input type="text" defaultValue="Marketing agencies, e-commerce brands" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-[13px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">Save changes</button>
          </div>
        </div>
      </Modal>

      {/* Signature Modal */}
      <Modal open={activeModal === 'signature'} onClose={() => setActiveModal(null)} title="Email Signature">
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Signature</label>
            <textarea rows={4} defaultValue={`Best,\nSoufian Douiri\nUGC.nl`} className="w-full px-3 py-3 text-[13px] leading-relaxed border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none" />
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-[11px] text-gray-400 mb-2">Preview</p>
            <p className="text-[13px] text-gray-500 leading-relaxed whitespace-pre-wrap">Best,{'\n'}Soufian Douiri{'\n'}UGC.nl</p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-[13px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">Save signature</button>
          </div>
        </div>
      </Modal>

      {/* Domain Modal */}
      <Modal open={activeModal === 'domain'} onClose={() => setActiveModal(null)} title="Domain Verification">
        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Sending domain</label>
            <input type="text" placeholder="company.com" className="w-full px-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors" />
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-[12px] font-medium text-gray-500 mb-3">DNS Records to add</p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">SPF</span>
                  <span className="text-[12px] text-gray-400">Not configured</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">DKIM</span>
                  <span className="text-[12px] text-gray-400">Not configured</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">DMARC</span>
                  <span className="text-[12px] text-gray-400">Not configured</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-[13px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">Verify domain</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
