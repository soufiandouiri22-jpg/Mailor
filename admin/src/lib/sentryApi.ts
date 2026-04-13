import { getApiKey, getSentryMeta, setSentryMeta, toggleIntegration } from './integrations';
import { SUPABASE_CALLBACK } from './sentryOAuth';

const ORG_SLUG = 'scanly-yl';
const PROJECT_SLUG = 'react-native';
const BASE = 'https://sentry.io/api/0';

const TOKEN_EXPIRY_BUFFER_MS = 60_000; // refresh 1 minute before actual expiry

async function getValidToken(): Promise<string | null> {
  const token = getApiKey('sentry');
  if (!token) return null;

  const meta = await getSentryMeta();
  if (!meta?.expiresAt || !meta.refreshToken) return token;

  const expiresMs = new Date(meta.expiresAt).getTime();
  const now = Date.now();

  if (now < expiresMs - TOKEN_EXPIRY_BUFFER_MS) return token;

  // Token expired or about to expire — refresh it
  try {
    const res = await fetch(SUPABASE_CALLBACK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: meta.refreshToken,
        installationId: meta.installationId,
      }),
    });

    if (!res.ok) {
      console.error('Sentry token refresh failed:', res.status);
      return token; // use old token as last resort
    }

    const data = await res.json();
    if (data.token) {
      toggleIntegration('sentry', true, data.token);
      await setSentryMeta({
        refreshToken: data.refreshToken ?? meta.refreshToken,
        expiresAt: data.expiresAt ?? meta.expiresAt,
        installationId: meta.installationId,
      });
      console.log('Sentry token refreshed successfully');
      return data.token;
    }
  } catch (err) {
    console.error('Sentry token refresh error:', err);
  }

  return token;
}

async function sentryFetch<T>(path: string): Promise<T | null> {
  const token = await getValidToken();
  if (!token) return null;

  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Sentry API ${res.status}: ${await res.text()}`);
  return res.json();
}

export interface SentryIssue {
  id: string;
  title: string;
  culprit: string;
  shortId: string;
  count: string;
  userCount: number;
  firstSeen: string;
  lastSeen: string;
  level: string;
  status: string;
  platform: string;
  type: string;
}

export interface SentryStats {
  received: number[];
  rejected: number[];
}

export async function getIssues(query = 'is:unresolved', limit = 25): Promise<SentryIssue[]> {
  const data = await sentryFetch<SentryIssue[]>(
    `/projects/${ORG_SLUG}/${PROJECT_SLUG}/issues/?query=${encodeURIComponent(query)}&limit=${limit}`,
  );
  return data ?? [];
}

export async function getIssueDetails(issueId: string): Promise<SentryIssue | null> {
  return sentryFetch<SentryIssue>(`/issues/${issueId}/`);
}

export async function getProjectStats(): Promise<{ total: number; users: number } | null> {
  const issues = await getIssues('is:unresolved', 100);
  if (!issues) return null;
  const total = issues.reduce((sum, i) => sum + parseInt(i.count, 10), 0);
  const users = issues.reduce((sum, i) => sum + i.userCount, 0);
  return { total, users };
}

export function isSentryConnected(): boolean {
  return !!getApiKey('sentry');
}
