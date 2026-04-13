import { useEffect, useState } from 'react';
import { AlertTriangle, ExternalLink, RefreshCw, Link2, Copy, Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import MetricCard from '../components/MetricCard';
import { getIssues, isSentryConnected, type SentryIssue } from '../lib/sentryApi';
import { useIntegrations } from '../lib/integrations';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m geleden`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}u geleden`;
  const days = Math.floor(hrs / 24);
  return `${days}d geleden`;
}

export default function Errors() {
  const integrations = useIntegrations();
  const connected = isSentryConnected();
  const [issues, setIssues] = useState<SentryIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function load() {
    if (!connected) return;
    setLoading(true);
    setError('');
    try {
      const data = await getIssues('is:unresolved', 25);
      setIssues(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [connected]);

  const totalEvents = issues.reduce((sum, i) => sum + parseInt(i.count, 10), 0);
  const totalUsers = issues.reduce((sum, i) => sum + i.userCount, 0);

  if (!connected) {
    return (
      <div className="p-8 max-w-3xl">
        <PageHeader title="Errors" description="Crashes, error rates en performance" />
        <div className="flex flex-col items-center justify-center h-80 bg-gray-50 border border-gray-200 border-dashed rounded-xl">
          <Link2 size={32} className="text-gray-300 mb-3" />
          <p className="text-[13px] text-gray-500 mb-1">Sentry is nog niet gekoppeld</p>
          <p className="text-[12px] text-gray-400 mb-4">
            Koppel Sentry via de <strong>Integrations</strong> pagina met een Auth Token
          </p>
          <p className="text-[11px] text-gray-400 max-w-md text-center">
            Maak een token aan op sentry.io → Settings → Auth Tokens met <code className="bg-gray-100 px-1 rounded">project:read</code> en <code className="bg-gray-100 px-1 rounded">event:read</code> permissions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader title="Errors" description="Sentry error tracking — scanly-yl/react-native">
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Vernieuwen
        </button>
      </PageHeader>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard label="Open Issues" value={issues.length} />
        <MetricCard label="Total Events" value={totalEvents.toLocaleString()} />
        <MetricCard label="Users Affected" value={totalUsers.toLocaleString()} />
        <MetricCard label="Status" value={error ? 'Error' : 'Connected'} changeType={error ? 'negative' : 'positive'} change={error || 'Sentry actief'} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-[13px] text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Laden van Sentry issues...</p>
      ) : issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 bg-emerald-50 border border-emerald-200 rounded-xl">
          <p className="text-[14px] font-medium text-emerald-700">Geen open issues</p>
          <p className="text-[12px] text-emerald-600 mt-1">Alles draait soepel</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-medium text-gray-500">Issue</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-500">Events</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-500">Users</th>
                <th className="text-left px-4 py-2.5 font-medium text-gray-500">Laatste</th>
                <th className="text-right px-4 py-2.5 font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <LevelBadge level={issue.level} />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[400px]">{issue.title}</p>
                        <p className="text-[11px] text-gray-400 truncate max-w-[400px]">{issue.culprit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700 font-medium">{parseInt(issue.count, 10).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-500">{issue.userCount}</td>
                  <td className="px-4 py-3 text-gray-400">{timeAgo(issue.lastSeen)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          const url = `https://scanly-yl.sentry.io/issues/${issue.id}/?project=4511189110882384`;
                          navigator.clipboard.writeText(url);
                          setCopiedId(issue.id);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        title="Kopieer Sentry URL"
                      >
                        {copiedId === issue.id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                      <a
                        href={`https://scanly-yl.sentry.io/issues/${issue.id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        title="Open in Sentry"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LevelBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    error: 'text-red-600',
    fatal: 'text-red-700',
    warning: 'text-amber-600',
    info: 'text-blue-500',
  };
  return (
    <AlertTriangle size={16} className={`shrink-0 mt-0.5 ${styles[level] ?? styles.error}`} />
  );
}
