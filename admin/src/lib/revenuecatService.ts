import { getApiKey } from './integrations';

const PROXY_URL = 'https://rkvdjbmmkyurwadnsoou.supabase.co/functions/v1/revenuecat-proxy';

let _projectId: string | null = null;

function getRcKey(): string {
  const key = getApiKey('revenuecat');
  if (!key) throw new Error('RevenueCat niet gekoppeld — ga naar Integrations');
  return key;
}

async function rcFetch(path: string, params?: Record<string, string>) {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rc-api-key': getRcKey(),
    },
    body: JSON.stringify({ path, params }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`RevenueCat ${res.status}: ${body}`);
  }
  return res.json();
}

async function getProjectId(): Promise<string> {
  if (_projectId) return _projectId;
  const data = await rcFetch('/projects');
  const items = data?.items ?? data;
  if (Array.isArray(items) && items.length > 0) {
    _projectId = items[0].id;
    return _projectId!;
  }
  throw new Error('Geen RevenueCat project gevonden — controleer je API key');
}

export interface OverviewMetric {
  id: string;
  name: string;
  description: string;
  unit: string;
  period: string;
  value: number;
  last_updated_at: number;
}

export interface OverviewMetrics {
  metrics: OverviewMetric[];
}

export async function getOverviewMetrics(currency = 'EUR'): Promise<OverviewMetrics> {
  const pid = await getProjectId();
  return rcFetch(`/projects/${pid}/metrics/overview`, { currency });
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface ChartResponse {
  display_name: string;
  values: ChartDataPoint[];
  summary?: Record<string, number>;
}

export async function getChartData(
  chartName: string,
  opts: { startDate?: string; endDate?: string; resolution?: string; currency?: string } = {},
): Promise<ChartResponse> {
  const pid = await getProjectId();
  const params: Record<string, string> = {};
  if (opts.currency) params.currency = opts.currency;
  if (opts.startDate) params.start_date = opts.startDate;
  if (opts.endDate) params.end_date = opts.endDate;
  if (opts.resolution) params.resolution = opts.resolution;
  return rcFetch(`/projects/${pid}/charts/${chartName}`, params);
}

export function findMetric(metrics: OverviewMetric[], id: string): OverviewMetric | undefined {
  return metrics.find(m => m.id === id);
}

export function formatCurrency(value: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function formatCurrencyDecimal(value: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value / 100);
}
