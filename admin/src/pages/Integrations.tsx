import { useState } from 'react';
import { Check, ExternalLink, X, Key, LogIn } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useIntegrations, toggleIntegration, clearSentryMeta, type Integration } from '../lib/integrations';
import { startSentryOAuth } from '../lib/sentryOAuth';

function IntegrationLogo({ id, className }: { id: string; className?: string }) {
  const size = className ?? 'w-10 h-10';
  const logos: Record<string, JSX.Element> = {
    supabase: (
      <svg className={size} viewBox="0 0 96 96" fill="none">
        <path d="M55.7223 93.4383c-2.4014 3.0241-7.2705 1.3672-7.3284-2.4942l-.846-56.4773h37.9752c6.8784 0 10.7146 7.9445 6.4375 13.3315l-36.2383 45.64Z" fill="url(#sb1)"/>
        <path d="M55.7223 93.4383c-2.4014 3.0241-7.2705 1.3672-7.3284-2.4942l-.846-56.4773h37.9752c6.8784 0 10.7146 7.9445 6.4375 13.3315l-36.2383 45.64Z" fill="url(#sb2)" fillOpacity="0.2"/>
        <path d="M40.278 2.56189c2.4014-3.024436 7.2705-1.36726 7.3284 2.49417l.3707 56.47724h-37.5c-6.87853 0-10.714819-7.9446-6.43753-13.3315L40.278 2.56189Z" fill="#3ECF8E"/>
        <defs>
          <linearGradient id="sb1" x1="1011.58" x2="3189.12" y1="1286.71" y2="2199.97" gradientUnits="userSpaceOnUse">
            <stop stopColor="#249361"/><stop offset="1" stopColor="#3ECF8E"/>
          </linearGradient>
          <linearGradient id="sb2" x1="139.561" x2="1537.44" y1="-762.054" y2="1869.38" gradientUnits="userSpaceOnUse">
            <stop/><stop offset="1" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    openai: (
      <svg className={size} viewBox="0 0 24 24" fill="none">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0154-1.164a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" fill="#000"/>
      </svg>
    ),
    revenuecat: (
      <svg className={size} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#F25A5A"/>
        <path d="M8 12c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v4c0 4.4-3.6 8-8 8s-8-3.6-8-8v-4z" fill="#fff"/>
        <circle cx="13" cy="13" r="1.5" fill="#F25A5A"/>
        <circle cx="19" cy="13" r="1.5" fill="#F25A5A"/>
      </svg>
    ),
    instagram: (
      <img src="/integrations/instagram.png" alt="Instagram" className={size + ' rounded-lg object-contain'} />
    ),
    tiktok: (
      <img src="/integrations/tiktok.png" alt="TikTok" className={size + ' rounded-lg object-contain'} />
    ),
    youtube: (
      <svg className={size} viewBox="0 0 90 90" fill="none">
        <path d="M88.119 23.338c-1.035-3.872-4.085-6.922-7.957-7.957C73.144 13.5 45 13.5 45 13.5s-28.144 0-35.162 1.881c-3.872 1.035-6.922 4.085-7.957 7.957C0 30.356 0 45 0 45s0 14.644 1.881 21.662c1.035 3.872 4.085 6.922 7.957 7.957C16.856 76.5 45 76.5 45 76.5s28.144 0 35.162-1.881c3.872-1.035 6.922-4.085 7.957-7.957C90 59.644 90 45 90 45s0-14.644-1.881-21.662z" fill="red"/>
        <path d="M36 58.5L59.38 45 36 31.5z" fill="#fff"/>
      </svg>
    ),
    twitter: (
      <div className={size + ' flex items-center justify-center'}>
        <img src="/integrations/twitter.png" alt="X / Twitter" className="w-9 h-9 rounded-lg object-contain" />
      </div>
    ),
    sentry: (
      <div className={size + ' flex items-center justify-center'}>
        <img src="/integrations/sentry.png" alt="Sentry" className="w-9 h-9 object-contain" />
      </div>
    ),
  };

  return logos[id] ?? <span className="text-2xl w-10 text-center">?</span>;
}

const OAUTH_INTEGRATIONS = new Set(['sentry']);

export default function Integrations() {
  const integrations = useIntegrations();
  const connectedCount = integrations.filter((i) => i.connected).length;
  const [connecting, setConnecting] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  function handleConnectClick(int: Integration) {
    if (OAUTH_INTEGRATIONS.has(int.id)) {
      if (int.id === 'sentry') startSentryOAuth();
      return;
    }
    setConnecting(int);
    setApiKey('');
    setError('');
  }

  function handleConnect() {
    if (!apiKey.trim()) {
      setError('Voer een API key in');
      return;
    }
    toggleIntegration(connecting!.id, true, apiKey.trim());
    setConnecting(null);
    setApiKey('');
    setError('');
  }

  function handleDisconnect(id: string) {
    toggleIntegration(id, false, undefined);
    if (id === 'sentry') clearSentryMeta();
  }

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader
        title="Integrations"
        description={`${connectedCount} van ${integrations.length} services gekoppeld`}
      />

      <div className="space-y-2">
        {integrations.map((int) => (
          <div
            key={int.id}
            className="flex items-center gap-4 px-5 py-4 bg-white border border-gray-200 rounded-xl"
          >
            <IntegrationLogo id={int.id} />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-gray-900">{int.name}</p>
              <p className="text-[12px] text-gray-400">{int.description}</p>
            </div>
            {int.connected ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                  <Check size={14} />
                  Connected
                </span>
                {int.id !== 'supabase' && int.id !== 'openai' && (
                  <button
                    onClick={() => handleDisconnect(int.id)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Loskoppelen"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ) : OAUTH_INTEGRATIONS.has(int.id) ? (
              <button
                onClick={() => handleConnectClick(int)}
                className="flex items-center gap-1.5 text-[12px] font-medium text-white bg-[#362d59] hover:bg-[#2b2448] px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogIn size={14} />
                Login met {int.name}
              </button>
            ) : (
              <button
                onClick={() => handleConnectClick(int)}
                className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ExternalLink size={14} />
                Connect
              </button>
            )}
          </div>
        ))}
      </div>

      {/* API Key modal (for non-OAuth integrations) */}
      {connecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center gap-3 mb-5">
              <IntegrationLogo id={connecting.id} className="w-8 h-8" />
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900">{connecting.name} koppelen</h3>
                <p className="text-[12px] text-gray-400">{connecting.description}</p>
              </div>
            </div>

            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">API Key</label>
            <div className="relative mb-1.5">
              <Key size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => { setApiKey(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                placeholder={`Plak je ${connecting.name} API key...`}
                autoFocus
                className="w-full pl-9 pr-3 py-2.5 text-[13px] border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-mono"
              />
            </div>
            {error && <p className="text-[12px] text-red-500 mb-3">{error}</p>}

            <p className="text-[11px] text-gray-400 mb-5">
              De key wordt versleuteld opgeslagen in je browser en nooit naar derden verstuurd.
            </p>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConnecting(null)}
                className="px-4 py-2 text-[13px] font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleConnect}
                disabled={!apiKey.trim()}
                className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-30 transition-colors"
              >
                Koppelen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
