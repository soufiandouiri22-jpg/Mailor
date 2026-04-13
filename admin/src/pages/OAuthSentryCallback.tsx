import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toggleIntegration, setSentryMeta } from '../lib/integrations';
import { Check, AlertTriangle, Loader2 } from 'lucide-react';

export default function OAuthSentryCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const expiresAt = params.get('expiresAt');
    const installationId = params.get('installationId');
    const error = params.get('error');

    if (error) {
      setStatus('error');
      const messages: Record<string, string> = {
        missing_params: 'Sentry heeft geen geldige code teruggestuurd',
        token_exchange_failed: 'Kon de token niet ophalen bij Sentry',
        no_token: 'Sentry gaf geen access token terug',
        server_error: 'Er ging iets mis op de server',
      };
      setErrorMsg(messages[error] ?? `Onbekende fout: ${error}`);
      return;
    }

    if (token) {
      toggleIntegration('sentry', true, token);

      if (refreshToken && expiresAt && installationId) {
        setSentryMeta({ refreshToken, expiresAt, installationId });
      }

      setStatus('success');
      setTimeout(() => navigate('/integrations'), 2000);
    } else {
      setStatus('error');
      setErrorMsg('Geen token ontvangen van Sentry');
    }
  }, [params, navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-sm">
        {status === 'loading' && (
          <>
            <Loader2 size={32} className="text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-[14px] text-gray-600 font-medium">Sentry koppelen...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-emerald-600" />
            </div>
            <p className="text-[14px] text-gray-900 font-semibold">Sentry gekoppeld</p>
            <p className="text-[13px] text-gray-500 mt-1">Je wordt doorgestuurd naar Integrations...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <p className="text-[14px] text-gray-900 font-semibold">Koppeling mislukt</p>
            <p className="text-[13px] text-gray-500 mt-1">{errorMsg}</p>
            <button
              onClick={() => navigate('/integrations')}
              className="mt-4 px-4 py-2 text-[13px] font-medium text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Terug naar Integrations
            </button>
          </>
        )}
      </div>
    </div>
  );
}
