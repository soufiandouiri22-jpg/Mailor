import { useSyncExternalStore } from 'react';
import { encrypt, decrypt } from './crypto';

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  apiKey?: string;
}

export interface SentryTokenMeta {
  refreshToken: string;
  expiresAt: string;
  installationId: string;
}

const DEFAULT_INTEGRATIONS: Integration[] = [
  { id: 'supabase', name: 'Supabase', description: 'Product database, analytics events, gebruikers', icon: '⚡', connected: true },
  { id: 'openai', name: 'OpenAI', description: 'AI Agent function calling, enrichment', icon: '🤖', connected: true },
  { id: 'revenuecat', name: 'RevenueCat', description: 'Subscriptions, MRR, trials, churn', icon: '💰', connected: false },
  { id: 'instagram', name: 'Instagram', description: 'Posts, stories, reels, engagement metrics', icon: '📸', connected: false },
  { id: 'tiktok', name: 'TikTok', description: 'Video performance, views, engagement', icon: '🎵', connected: false },
  { id: 'youtube', name: 'YouTube', description: 'Video analytics, subscribers, watch time', icon: '▶️', connected: false },
  { id: 'twitter', name: 'X / Twitter', description: 'Tweets, impressions, engagement', icon: '𝕏', connected: false },
  { id: 'sentry', name: 'Sentry', description: 'Error tracking, crash reports, performance', icon: '🐛', connected: false },
];

const STORAGE_KEY = 'scanly_admin_integrations';
const KEYS_STORAGE_KEY = 'scanly_admin_keys';
const SENTRY_META_KEY = 'scanly_admin_sentry_meta';
const CRYPTO_PASS = 'scanly-admin-enc-2026';

// ── State ──

let _integrations = DEFAULT_INTEGRATIONS.map((int) => ({ ...int }));
let _listeners = new Set<() => void>();
let _loaded = false;

function notify() {
  for (const fn of _listeners) fn();
}

// ── Persist (connection status = plain, keys = encrypted) ──

async function persist() {
  const status: Record<string, boolean> = {};
  const keys: Record<string, string> = {};

  for (const int of _integrations) {
    status[int.id] = int.connected;
    if (int.apiKey) keys[int.id] = int.apiKey;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));

  if (Object.keys(keys).length > 0) {
    const encrypted = await encrypt(JSON.stringify(keys), CRYPTO_PASS);
    localStorage.setItem(KEYS_STORAGE_KEY, encrypted);
  } else {
    localStorage.removeItem(KEYS_STORAGE_KEY);
  }
}

async function loadFromStorage() {
  if (_loaded) return;
  _loaded = true;

  try {
    const statusRaw = localStorage.getItem(STORAGE_KEY);
    const status: Record<string, boolean> = statusRaw ? JSON.parse(statusRaw) : {};

    let keys: Record<string, string> = {};
    const keysRaw = localStorage.getItem(KEYS_STORAGE_KEY);
    if (keysRaw) {
      try {
        const decrypted = await decrypt(keysRaw, CRYPTO_PASS);
        keys = JSON.parse(decrypted);
      } catch {
        localStorage.removeItem(KEYS_STORAGE_KEY);
      }
    }

    _integrations = DEFAULT_INTEGRATIONS.map((int) => ({
      ...int,
      connected: status[int.id] ?? int.connected,
      apiKey: keys[int.id],
    }));

    notify();
  } catch {}
}

loadFromStorage();

// ── Public API ──

export function getIntegrations(): Integration[] {
  return _integrations;
}

export function toggleIntegration(id: string, connected: boolean, apiKey?: string) {
  _integrations = _integrations.map((int) =>
    int.id === id
      ? { ...int, connected, apiKey: connected ? (apiKey ?? int.apiKey) : undefined }
      : int,
  );
  notify();
  persist();
}

export function getConnectedNames(): string[] {
  return _integrations.filter((i) => i.connected).map((i) => i.name);
}

export function getApiKey(id: string): string | undefined {
  return _integrations.find((i) => i.id === id)?.apiKey;
}

export function useIntegrations(): Integration[] {
  return useSyncExternalStore(
    (cb) => { _listeners.add(cb); return () => _listeners.delete(cb); },
    () => _integrations,
  );
}

// ── Sentry token meta (refresh token, expiry, installation ID) ──

let _sentryMeta: SentryTokenMeta | null = null;

export async function getSentryMeta(): Promise<SentryTokenMeta | null> {
  if (_sentryMeta) return _sentryMeta;
  try {
    const raw = localStorage.getItem(SENTRY_META_KEY);
    if (!raw) return null;
    const decrypted = await decrypt(raw, CRYPTO_PASS);
    _sentryMeta = JSON.parse(decrypted);
    return _sentryMeta;
  } catch {
    localStorage.removeItem(SENTRY_META_KEY);
    return null;
  }
}

export async function setSentryMeta(meta: SentryTokenMeta) {
  _sentryMeta = meta;
  const encrypted = await encrypt(JSON.stringify(meta), CRYPTO_PASS);
  localStorage.setItem(SENTRY_META_KEY, encrypted);
}

export function clearSentryMeta() {
  _sentryMeta = null;
  localStorage.removeItem(SENTRY_META_KEY);
}
