import { supabase } from './supabase';
import { getIssues, isSentryConnected } from './sentryApi';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY ?? '';

const SYSTEM_PROMPT = `Je bent de Scanly AI Agent — een slimme assistent voor het Scanly admin dashboard.
Je spreekt Nederlands en bent behulpzaam, beknopt en data-gedreven.

Je bent direct gekoppeld aan alle Scanly APIs en services:

SUPABASE DATABASE:
- products: barcode, product_name, brands, score (0-100), image_url, category_slug, brand_slug, nova_group, nutriscore_grade
- brands: slug, name, product_count, avg_score
- product_categories: slug, name_nl, parent_slug, sort_order
- product_alternatives: barcode, alt_barcode, alt_product_name, alt_brands, alt_score, alt_image_url
- user_profiles: user_id, goals (array), birth_date, diet (array), allergies (array), onboarding_done, recent_searches, last_store, updated_at
- scan_history: user_id, barcode, product_data (json), scanned_at
- saved_products: user_id, barcode, product_data (json), saved_at
- scan_limits: user_id, scan_date, scans_used

SENTRY (error tracking):
- Je hebt volledige toegang tot Sentry issues, crashes en errors
- Elke issue heeft een directe URL die je ALTIJD moet meegeven in je antwoord
- Geef URLs altijd als klikbare links

Je kunt:
1. Database queries uitvoeren (producten zoeken, tellen, filteren op score/merk/categorie)
2. Statistieken ophalen (gemiddelde scores, aantallen, top/slechtste producten)
3. Merken en categorieën analyseren
4. Gebruikersdata analyseren (hoeveel gebruikers, doelen verdeling, dieet, allergieën, onboarding rate)
5. Scan activiteit bekijken (meest gescande producten, scan patronen, opgeslagen producten)
6. Gebruiker specifieke info opzoeken (scan geschiedenis, opgeslagen producten, profiel)
7. Alternatieven bekijken die in de database staan
8. Sentry errors, crashes en performance issues ophalen — inclusief directe links naar elke issue

Houd antwoorden kort en overzichtelijk. Gebruik opsommingen waar nodig.
Geef ALTIJD directe links mee als je Sentry issues toont.
Als een integratie (bv. RevenueCat, social media) nog niet gekoppeld is, leg dan kort uit dat die nog opgezet moet worden via de Integrations pagina.`;

const TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'count_products',
      description: 'Tel het aantal producten, optioneel gefilterd op merk, categorie of minimum score',
      parameters: {
        type: 'object',
        properties: {
          brand_slug: { type: 'string', description: 'Filter op merk slug (bv. "mcdonalds")' },
          category_slug: { type: 'string', description: 'Filter op categorie slug' },
          min_score: { type: 'number', description: 'Minimale score filter' },
          max_score: { type: 'number', description: 'Maximale score filter' },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'search_products',
      description: 'Zoek producten op naam, merk of categorie. Geeft max 10 resultaten.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Zoekterm voor productnaam' },
          brand_slug: { type: 'string', description: 'Filter op merk slug' },
          category_slug: { type: 'string', description: 'Filter op categorie slug' },
          order_by: { type: 'string', enum: ['score_desc', 'score_asc', 'name'], description: 'Sortering' },
          limit: { type: 'number', description: 'Max resultaten (standaard 10)' },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_product_stats',
      description: 'Haal statistieken op: gem. score, score verdeling, top/slechtste producten',
      parameters: {
        type: 'object',
        properties: {
          brand_slug: { type: 'string', description: 'Beperk tot een specifiek merk' },
          category_slug: { type: 'string', description: 'Beperk tot een categorie' },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_brands',
      description: 'Lijst van merken, gesorteerd op product_count of avg_score',
      parameters: {
        type: 'object',
        properties: {
          search: { type: 'string', description: 'Zoek op merknaam' },
          order_by: { type: 'string', enum: ['product_count', 'avg_score_desc', 'avg_score_asc'], description: 'Sortering' },
          limit: { type: 'number', description: 'Max resultaten (standaard 20)' },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_categories',
      description: 'Lijst van categorieën, optioneel subcategorieën van een parent',
      parameters: {
        type: 'object',
        properties: {
          parent_slug: { type: 'string', description: 'Toon alleen subcategorieën van deze parent (null voor root)' },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_database_overview',
      description: 'Haal een totaaloverzicht op van de database: totale producten, merken, categorieën, gebruikers en gem. score',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_user_stats',
      description: 'Haal gebruikersstatistieken op: totaal, onboarding rate, doelen verdeling, dieet verdeling, allergieën verdeling',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_users',
      description: 'Lijst van gebruikers met hun profiel, gesorteerd op updated_at',
      parameters: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Max resultaten (standaard 20)' },
          onboarding_done: { type: 'boolean', description: 'Filter op onboarding status' },
          goal: { type: 'string', description: 'Filter op een specifiek doel (bv. "gewicht", "energie", "spieren")' },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_user_profile',
      description: 'Haal het volledige profiel op van een specifieke gebruiker inclusief scan geschiedenis en opgeslagen producten',
      parameters: {
        type: 'object',
        properties: {
          user_id: { type: 'string', description: 'De user ID om op te zoeken' },
        },
        required: ['user_id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_scan_activity',
      description: 'Haal scan activiteit op: meest gescande producten, recente scans, scan aantallen per gebruiker',
      parameters: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['most_scanned', 'recent_scans', 'top_scanners', 'scan_counts'], description: 'Type activiteit' },
          limit: { type: 'number', description: 'Max resultaten (standaard 10)' },
        },
        required: ['type'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_saved_products_stats',
      description: 'Haal statistieken op over opgeslagen/favoriete producten: meest opgeslagen, recente, totalen',
      parameters: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['most_saved', 'recent_saved', 'total_count'], description: 'Type statistiek' },
          limit: { type: 'number', description: 'Max resultaten (standaard 10)' },
        },
        required: ['type'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_alternatives',
      description: 'Bekijk alternatieven die in de database staan voor een specifiek product',
      parameters: {
        type: 'object',
        properties: {
          barcode: { type: 'string', description: 'Barcode van het product' },
        },
        required: ['barcode'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_sentry_issues',
      description: 'Haal open errors/crashes op uit Sentry. Toont issues met event count, getroffen users, en level (error/fatal/warning)',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Sentry zoekquery (standaard "is:unresolved"). Voorbeelden: "is:unresolved", "level:fatal", "is:unresolved level:error"' },
          limit: { type: 'number', description: 'Max resultaten (standaard 10)' },
        },
      },
    },
  },
];

// ── Tool execution ──

async function executeTool(name: string, args: Record<string, unknown>): Promise<string> {
  try {
    switch (name) {
      case 'count_products': {
        let query = supabase.from('products').select('barcode', { count: 'exact', head: true });
        if (args.brand_slug) query = query.eq('brand_slug', args.brand_slug);
        if (args.category_slug) query = query.eq('category_slug', args.category_slug);
        if (args.min_score) query = query.gte('score', args.min_score);
        if (args.max_score) query = query.lte('score', args.max_score);
        const { count, error } = await query;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ count });
      }

      case 'search_products': {
        const limit = Math.min((args.limit as number) || 10, 20);
        let query = supabase
          .from('products')
          .select('barcode, product_name, brands, score, image_url, category_slug, brand_slug');
        if (args.query) query = query.ilike('product_name', `%${args.query}%`);
        if (args.brand_slug) query = query.eq('brand_slug', args.brand_slug);
        if (args.category_slug) query = query.eq('category_slug', args.category_slug);
        if (args.order_by === 'score_asc') query = query.order('score', { ascending: true });
        else if (args.order_by === 'name') query = query.order('product_name');
        else query = query.order('score', { ascending: false });
        query = query.limit(limit);
        const { data, error } = await query;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ products: data, count: data?.length ?? 0 });
      }

      case 'get_product_stats': {
        let query = supabase.from('products').select('score');
        if (args.brand_slug) query = query.eq('brand_slug', args.brand_slug);
        if (args.category_slug) query = query.eq('category_slug', args.category_slug);
        const { data, error } = await query.limit(5000);
        if (error) return JSON.stringify({ error: error.message });
        const scores = (data ?? []).map((r) => r.score).filter((s): s is number => s != null);
        if (scores.length === 0) return JSON.stringify({ message: 'Geen producten gevonden' });
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const good = scores.filter((s) => s >= 60).length;
        const mid = scores.filter((s) => s >= 40 && s < 60).length;
        const bad = scores.filter((s) => s < 40).length;

        // top & bottom 5
        let topQ = supabase.from('products').select('product_name, brands, score');
        if (args.brand_slug) topQ = topQ.eq('brand_slug', args.brand_slug);
        if (args.category_slug) topQ = topQ.eq('category_slug', args.category_slug);
        const { data: top5 } = await topQ.order('score', { ascending: false }).limit(5);

        let botQ = supabase.from('products').select('product_name, brands, score');
        if (args.brand_slug) botQ = botQ.eq('brand_slug', args.brand_slug);
        if (args.category_slug) botQ = botQ.eq('category_slug', args.category_slug);
        const { data: bottom5 } = await botQ.order('score', { ascending: true }).limit(5);

        return JSON.stringify({ total: scores.length, avg_score: avg, good, mid, bad, top5, bottom5 });
      }

      case 'list_brands': {
        const limit = Math.min((args.limit as number) || 20, 50);
        let query = supabase.from('brands').select('slug, name, product_count, avg_score');
        if (args.search) query = query.ilike('name', `%${args.search}%`);
        if (args.order_by === 'avg_score_desc') query = query.order('avg_score', { ascending: false });
        else if (args.order_by === 'avg_score_asc') query = query.order('avg_score', { ascending: true });
        else query = query.order('product_count', { ascending: false });
        query = query.limit(limit);
        const { data, error } = await query;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ brands: data, count: data?.length ?? 0 });
      }

      case 'list_categories': {
        let query = supabase.from('product_categories').select('slug, name_nl, parent_slug, sort_order');
        if (args.parent_slug) query = query.eq('parent_slug', args.parent_slug);
        else if (args.parent_slug === undefined) query = query.is('parent_slug', null);
        query = query.order('sort_order').limit(100);
        const { data, error } = await query;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ categories: data, count: data?.length ?? 0 });
      }

      case 'get_database_overview': {
        const [prodRes, brandRes, catRes, userRes, scanRes, savedRes] = await Promise.all([
          supabase.from('products').select('score', { count: 'exact' }).limit(5000),
          supabase.from('brands').select('slug', { count: 'exact', head: true }),
          supabase.from('product_categories').select('slug', { count: 'exact', head: true }),
          supabase.from('user_profiles').select('user_id', { count: 'exact', head: true }),
          supabase.from('scan_history').select('barcode', { count: 'exact', head: true }),
          supabase.from('saved_products').select('barcode', { count: 'exact', head: true }),
        ]);
        const scores = (prodRes.data ?? []).map((r: { score: number }) => r.score).filter(Boolean);
        const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        return JSON.stringify({
          total_products: prodRes.count ?? scores.length,
          total_brands: brandRes.count ?? 0,
          total_categories: catRes.count ?? 0,
          avg_score: avg,
          total_users: userRes.count ?? 0,
          total_scans: scanRes.count ?? 0,
          total_saved: savedRes.count ?? 0,
        });
      }

      case 'get_user_stats': {
        const { data: profiles, error } = await supabase
          .from('user_profiles')
          .select('user_id, goals, diet, allergies, onboarding_done');
        if (error) return JSON.stringify({ error: error.message });
        const all = profiles ?? [];
        const total = all.length;
        const onboarded = all.filter((u: any) => u.onboarding_done).length;

        const goalCounts: Record<string, number> = {};
        const dietCounts: Record<string, number> = {};
        const allergyCounts: Record<string, number> = {};

        for (const u of all) {
          for (const g of ((u as any).goals ?? [])) {
            goalCounts[g] = (goalCounts[g] || 0) + 1;
          }
          for (const d of ((u as any).diet ?? [])) {
            dietCounts[d] = (dietCounts[d] || 0) + 1;
          }
          for (const a of ((u as any).allergies ?? [])) {
            allergyCounts[a] = (allergyCounts[a] || 0) + 1;
          }
        }

        return JSON.stringify({
          total_users: total,
          onboarded,
          onboarding_rate: total > 0 ? `${Math.round((onboarded / total) * 100)}%` : '0%',
          goals: goalCounts,
          diets: dietCounts,
          allergies: allergyCounts,
        });
      }

      case 'list_users': {
        const limit = Math.min((args.limit as number) || 20, 50);
        let query = supabase
          .from('user_profiles')
          .select('user_id, goals, birth_date, diet, allergies, onboarding_done, updated_at');
        if (args.onboarding_done !== undefined) query = query.eq('onboarding_done', args.onboarding_done);
        if (args.goal) query = query.contains('goals', [args.goal]);
        query = query.order('updated_at', { ascending: false }).limit(limit);
        const { data, error } = await query;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ users: data, count: data?.length ?? 0 });
      }

      case 'get_user_profile': {
        const userId = args.user_id as string;
        const [profileRes, scansRes, savedRes] = await Promise.all([
          supabase.from('user_profiles').select('*').eq('user_id', userId).single(),
          supabase.from('scan_history').select('barcode, scanned_at').eq('user_id', userId).order('scanned_at', { ascending: false }).limit(20),
          supabase.from('saved_products').select('barcode, saved_at').eq('user_id', userId).order('saved_at', { ascending: false }).limit(20),
        ]);
        return JSON.stringify({
          profile: profileRes.data,
          recent_scans: scansRes.data ?? [],
          saved_products: savedRes.data ?? [],
          scan_count: scansRes.data?.length ?? 0,
          saved_count: savedRes.data?.length ?? 0,
        });
      }

      case 'get_scan_activity': {
        const limit = Math.min((args.limit as number) || 10, 30);
        const type = args.type as string;

        if (type === 'most_scanned') {
          const { data, error } = await supabase
            .from('scan_history')
            .select('barcode');
          if (error) return JSON.stringify({ error: error.message });
          const counts: Record<string, number> = {};
          for (const row of (data ?? [])) {
            counts[row.barcode] = (counts[row.barcode] || 0) + 1;
          }
          const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit);

          const barcodes = sorted.map(([bc]) => bc);
          const { data: prodData } = await supabase
            .from('products')
            .select('barcode, product_name, brands, score')
            .in('barcode', barcodes);
          const prodMap = new Map((prodData ?? []).map((p: any) => [p.barcode, p]));

          const results = sorted.map(([bc, count]) => ({
            barcode: bc,
            scan_count: count,
            ...(prodMap.get(bc) ?? {}),
          }));
          return JSON.stringify({ most_scanned: results });
        }

        if (type === 'recent_scans') {
          const { data, error } = await supabase
            .from('scan_history')
            .select('user_id, barcode, scanned_at')
            .order('scanned_at', { ascending: false })
            .limit(limit);
          if (error) return JSON.stringify({ error: error.message });
          return JSON.stringify({ recent_scans: data });
        }

        if (type === 'top_scanners') {
          const { data, error } = await supabase
            .from('scan_history')
            .select('user_id');
          if (error) return JSON.stringify({ error: error.message });
          const counts: Record<string, number> = {};
          for (const row of (data ?? [])) {
            counts[row.user_id] = (counts[row.user_id] || 0) + 1;
          }
          const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit)
            .map(([uid, count]) => ({ user_id: uid, scan_count: count }));
          return JSON.stringify({ top_scanners: sorted });
        }

        if (type === 'scan_counts') {
          const { count, error } = await supabase
            .from('scan_history')
            .select('barcode', { count: 'exact', head: true });
          if (error) return JSON.stringify({ error: error.message });
          return JSON.stringify({ total_scans: count });
        }

        return JSON.stringify({ error: 'Onbekend type. Gebruik: most_scanned, recent_scans, top_scanners, scan_counts' });
      }

      case 'get_saved_products_stats': {
        const limit = Math.min((args.limit as number) || 10, 30);
        const type = args.type as string;

        if (type === 'most_saved') {
          const { data, error } = await supabase
            .from('saved_products')
            .select('barcode');
          if (error) return JSON.stringify({ error: error.message });
          const counts: Record<string, number> = {};
          for (const row of (data ?? [])) {
            counts[row.barcode] = (counts[row.barcode] || 0) + 1;
          }
          const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit);

          const barcodes = sorted.map(([bc]) => bc);
          const { data: prodData } = await supabase
            .from('products')
            .select('barcode, product_name, brands, score')
            .in('barcode', barcodes);
          const prodMap = new Map((prodData ?? []).map((p: any) => [p.barcode, p]));

          const results = sorted.map(([bc, count]) => ({
            barcode: bc,
            save_count: count,
            ...(prodMap.get(bc) ?? {}),
          }));
          return JSON.stringify({ most_saved: results });
        }

        if (type === 'recent_saved') {
          const { data, error } = await supabase
            .from('saved_products')
            .select('user_id, barcode, saved_at')
            .order('saved_at', { ascending: false })
            .limit(limit);
          if (error) return JSON.stringify({ error: error.message });
          return JSON.stringify({ recent_saved: data });
        }

        if (type === 'total_count') {
          const { count, error } = await supabase
            .from('saved_products')
            .select('barcode', { count: 'exact', head: true });
          if (error) return JSON.stringify({ error: error.message });
          return JSON.stringify({ total_saved: count });
        }

        return JSON.stringify({ error: 'Onbekend type. Gebruik: most_saved, recent_saved, total_count' });
      }

      case 'get_alternatives': {
        const barcode = args.barcode as string;
        const { data, error } = await supabase
          .from('product_alternatives')
          .select('*')
          .eq('barcode', barcode);
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ alternatives: data ?? [], count: data?.length ?? 0 });
      }

      case 'get_sentry_issues': {
        if (!isSentryConnected()) {
          return JSON.stringify({ error: 'Sentry is nog niet gekoppeld. Ga naar Integrations om een Sentry Auth Token toe te voegen.' });
        }
        const query = (args.query as string) || 'is:unresolved';
        const limit = Math.min((args.limit as number) || 10, 25);
        try {
          const issues = await getIssues(query, limit);
          const summary = issues.map((i) => ({
            id: i.id,
            title: i.title,
            culprit: i.culprit,
            level: i.level,
            events: parseInt(i.count, 10),
            users: i.userCount,
            first_seen: i.firstSeen,
            last_seen: i.lastSeen,
            url: `https://scanly-yl.sentry.io/issues/${i.id}/?project=4511189110882384`,
          }));
          return JSON.stringify({ issues: summary, count: issues.length });
        } catch (err: unknown) {
          return JSON.stringify({ error: `Sentry API fout: ${err instanceof Error ? err.message : String(err)}` });
        }
      }

      default:
        return JSON.stringify({ error: `Unknown tool: ${name}` });
    }
  } catch (err: unknown) {
    return JSON.stringify({ error: String(err) });
  }
}

// ── Chat API ──

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

interface ToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      role: 'assistant';
      content: string | null;
      tool_calls?: ToolCall[];
    };
    finish_reason: string;
  }>;
}

export async function sendAgentMessage(
  history: ChatMessage[],
  userText: string,
  onStream?: (partial: string) => void,
): Promise<{ reply: string; updatedHistory: ChatMessage[] }> {
  if (!OPENAI_API_KEY.trim()) {
    throw new Error(
      'VITE_OPENAI_API_KEY ontbreekt. Kopieer admin/.env.example naar admin/.env.local en zet je OpenAI API key.',
    );
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: userText },
  ];

  let currentMessages = [...messages];
  const MAX_TOOL_ROUNDS = 5;

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: currentMessages,
        tools: TOOLS,
        tool_choice: 'auto',
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errText}`);
    }

    const data: OpenAIResponse = await response.json();
    const choice = data.choices[0];
    const assistantMsg = choice.message;

    currentMessages.push({
      role: 'assistant',
      content: assistantMsg.content,
      tool_calls: assistantMsg.tool_calls,
    });

    if (!assistantMsg.tool_calls || assistantMsg.tool_calls.length === 0) {
      const reply = assistantMsg.content ?? '';
      if (onStream) onStream(reply);

      const updatedHistory = currentMessages
        .filter((m) => m.role !== 'system')
        .slice(-30);

      return { reply, updatedHistory };
    }

    for (const tc of assistantMsg.tool_calls) {
      const args = JSON.parse(tc.function.arguments);
      if (onStream) onStream(`[Zoeken: ${tc.function.name}...]`);
      const result = await executeTool(tc.function.name, args);
      currentMessages.push({
        role: 'tool',
        content: result,
        tool_call_id: tc.id,
      });
    }
  }

  return {
    reply: 'Ik heb te veel stappen nodig om dit te beantwoorden. Kun je je vraag specifieker stellen?',
    updatedHistory: currentMessages.filter((m) => m.role !== 'system').slice(-30),
  };
}
