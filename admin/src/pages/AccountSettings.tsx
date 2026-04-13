import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const tabs = ['Profile', 'Security'];

export default function AccountSettings() {
  const [tab, setTab] = useState('Profile');

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight">Settings</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">Manage your account</p>
        </div>
      </div>

      <div className="flex gap-1 border-b border-gray-200 mb-8">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-colors relative ${
              tab === t
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t}
            {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />}
          </button>
        ))}
      </div>

      {tab === 'Profile' && (
        <div className="space-y-0">
          <Row label="E-Mail Address" value="soufian@ugc.nl" />
          <Row label="Given Name" value="Soufian" action="Update Name" />
          <Row label="Last Name" value="Douiri" action="Update Name" />
          <Row label="Current Plan" value="Pro" action="Manage Subscription" />
          <Row label="Application Language" value="English" />
        </div>
      )}

      {tab === 'Security' && (
        <div className="space-y-0">
          <Row label="Password" value="••••••••" action="Change Password" />
          <Row label="Two-Factor Authentication" value="Disabled" action="Enable 2FA" />
          <Row label="Sign Out of All Devices" value="Sign out of all active sessions" action="Sign Out" />
          <div className="pt-8 mt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-red-600">Delete Account</p>
                <p className="text-[12px] text-gray-400 mt-0.5 max-w-md">Permanently delete your account and all associated data. This action cannot be undone.</p>
              </div>
              <button className="px-4 py-2 text-[13px] font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, action }: { label: string; value: string; action?: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      <div>
        <p className="text-[14px] font-medium text-gray-900">{label}</p>
        <p className="text-[12px] text-gray-400 mt-0.5">{value}</p>
      </div>
      {action && (
        <button className="px-4 py-1.5 text-[13px] font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shrink-0">
          {action}
        </button>
      )}
    </div>
  );
}
