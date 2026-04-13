const SENTRY_CLIENT_ID = 'ccefaf3c972bb916f40e39a8c34a947d70b2ef77ce3cea7a3f6f3c365aa63e2d';
const SENTRY_INSTALL_URL = `https://sentry.io/sentry-apps/scanly-admin/external-install/`;
const SUPABASE_CALLBACK = 'https://rkvdjbmmkyurwadnsoou.supabase.co/functions/v1/sentry-oauth-callback';

export function startSentryOAuth() {
  window.location.href = SENTRY_INSTALL_URL;
}

export function getSentryOAuthUrl(): string {
  return SENTRY_INSTALL_URL;
}

export { SENTRY_CLIENT_ID, SUPABASE_CALLBACK };
