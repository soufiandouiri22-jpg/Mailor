import { useEffect, useState } from 'react';
import {
  X, Package, ShieldAlert, Leaf, FlaskConical, Atom,
  Bug, AlertTriangle, Droplets, Pill, ThumbsUp, ThumbsDown,
  Activity, Gauge, Flame, Wheat, Beef, Droplet, CircleDot,
  ChevronDown, ChevronUp, BarChart3,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  barcode: string | null;
  onClose: () => void;
}

export default function ProductDetail({ barcode, onClose }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  useEffect(() => {
    if (!barcode) { setData(null); return; }
    setLoading(true);
    setShowScoreBreakdown(false);
    supabase
      .from('products')
      .select('*')
      .eq('barcode', barcode)
      .single()
      .then(({ data: row }) => {
        setData(row);
        setLoading(false);
      });
  }, [barcode]);

  if (!barcode) return null;

  const product = data?.scanly_product;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-[520px] max-w-full bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-200 shrink-0">
          {loading || !product ? (
            <div className="flex-1">
              <div className="h-5 w-48 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-32 bg-gray-100 rounded animate-pulse mt-2" />
            </div>
          ) : (
            <>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Package size={24} className="text-gray-300" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold text-gray-900 leading-tight">{product.name}</h2>
                <p className="text-[13px] text-gray-500 mt-0.5">{product.brand || 'Onbekend merk'}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 font-mono">{barcode}</p>
              </div>
              <ScoreRing score={product.score} />
            </>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 shrink-0 -mt-1 -mr-1">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-xl animate-pulse" />)}
            </div>
          ) : product ? (
            <div className="p-6 space-y-6">
              {/* Verdict */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-[13px] font-semibold text-gray-900 mb-1">{product.verdict}</p>
                <p className="text-[12px] text-gray-500 leading-relaxed">{product.summary}</p>
              </div>

              {/* Breakdown */}
              <Section title="Analyse" icon={<Activity size={15} />}>
                <div className="grid grid-cols-2 gap-2">
                  <BreakdownCard label="Verwerking" value={product.breakdown?.processing} icon={<Gauge size={14} />} />
                  <BreakdownCard label="Samenstelling" value={product.breakdown?.composition} icon={<Wheat size={14} />} />
                  <BreakdownCard label="Additieven" value={product.breakdown?.additives} icon={<FlaskConical size={14} />} />
                  <BreakdownCard label="Ingrediëntkwaliteit" value={product.breakdown?.ingredientQuality} icon={<Leaf size={14} />} />
                </div>
              </Section>

              {/* Risks */}
              <Section title="Risico's" icon={<ShieldAlert size={15} />}>
                <div className="space-y-1.5">
                  <RiskRow label="Pesticiden" status={product.risks?.pesticides} detail={product.riskDetails?.pesticides?.explanation} icon={<Bug size={14} />} />
                  <RiskRow label="Kankerverwekkend" status={product.risks?.carcinogens} detail={product.riskDetails?.carcinogens?.explanation} icon={<Atom size={14} />} />
                  <RiskRow label="Microplastics" status={product.risks?.microplastics} detail={product.riskDetails?.microplastics?.explanation} icon={<Droplets size={14} />} />
                  <RiskRow label="Schadelijke stoffen" status={product.risks?.harmfulSubstances} detail={product.riskDetails?.harmfulSubstances?.explanation} icon={<AlertTriangle size={14} />} />
                </div>
              </Section>

              {/* Nutrients */}
              {product.nutrients && Object.keys(product.nutrients).length > 0 && (
                <Section title="Voedingswaarden" icon={<Flame size={15} />}>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {product.nutrients.calories != null && <NutrientRow label="Calorieën" value={`${product.nutrients.calories} kcal`} icon={<Flame size={13} />} />}
                    {product.nutrients.sugar != null && <NutrientRow label="Suiker" value={`${product.nutrients.sugar}g`} icon={<CircleDot size={13} />} />}
                    {product.nutrients.fat != null && <NutrientRow label="Vet" value={`${product.nutrients.fat}g`} icon={<Droplet size={13} />} />}
                    {product.nutrients.saturatedFat != null && <NutrientRow label="Verzadigd vet" value={`${product.nutrients.saturatedFat}g`} icon={<Droplet size={13} />} />}
                    {product.nutrients.salt != null && <NutrientRow label="Zout" value={`${product.nutrients.salt}g`} icon={<CircleDot size={13} />} />}
                    {product.nutrients.protein != null && <NutrientRow label="Eiwit" value={`${product.nutrients.protein}g`} icon={<Beef size={13} />} />}
                    {product.nutrients.fiber != null && <NutrientRow label="Vezels" value={`${product.nutrients.fiber}g`} icon={<Wheat size={13} />} />}
                  </div>
                </Section>
              )}

              {/* Pros & Cons */}
              {((product.pros?.length ?? 0) > 0 || (product.cons?.length ?? 0) > 0) && (
                <Section title="Plus- & Minpunten" icon={<ThumbsUp size={15} />}>
                  <div className="space-y-1.5">
                    {product.pros?.map((p: string, i: number) => (
                      <div key={`pro-${i}`} className="flex items-start gap-2 text-[12px]">
                        <ThumbsUp size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{p}</span>
                      </div>
                    ))}
                    {product.cons?.map((c: string, i: number) => (
                      <div key={`con-${i}`} className="flex items-start gap-2 text-[12px]">
                        <ThumbsDown size={13} className="text-red-500 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{c}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Harmful Ingredients */}
              {product.harmfulIngredients?.length > 0 && (
                <Section title="Schadelijke ingrediënten" icon={<Pill size={15} />}>
                  <div className="space-y-2">
                    {product.harmfulIngredients.map((h: any, i: number) => (
                      <div key={i} className="bg-red-50 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${h.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'}`} />
                          <span className="text-[12px] font-medium text-gray-900">{h.label}</span>
                          <span className="text-[10px] text-gray-400 ml-auto">{h.category}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 pl-3.5">{h.explanation}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Ingredient Quality Profile */}
              {product.ingredientQualityProfile?.affectedAspects?.length > 0 && (
                <Section title="Ingrediëntkwaliteit" icon={<Leaf size={15} />}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-medium text-gray-500">Beoordeling:</span>
                    <QualityBadge value={product.ingredientQualityProfile.baseAssessment} />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredientQualityProfile.affectedAspects.map((a: string) => (
                      <span key={a} className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                        {formatAspect(a)}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Score Breakdown (collapsible) */}
              {product.scoreBreakdown && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-700">
                      <BarChart3 size={15} className="text-gray-400" />
                      Score berekening
                    </div>
                    {showScoreBreakdown ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>
                  {showScoreBreakdown && (
                    <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                      <div className="space-y-1.5 text-[12px]">
                        <ScoreRow label="Basis nutritie score" value={product.scoreBreakdown.baseNutritionScore} />
                        <ScoreRow label="Verwerkingsstraf" value={-product.scoreBreakdown.processingPenalty} negative />
                        <ScoreRow label="Additievenstraf" value={-product.scoreBreakdown.additivesPenalty} negative />
                        <ScoreRow label="Ingrediëntkwaliteitsstraf" value={-product.scoreBreakdown.ingredientQualityPenalty} negative />
                        <ScoreRow label="Kankerverwekkendstraf" value={-product.scoreBreakdown.carcinogenicPenalty} negative />
                        <ScoreRow label="Pesticidenstraf" value={-product.scoreBreakdown.pesticidesPenalty} negative />
                        <ScoreRow label="Microplasticsstraf" value={-product.scoreBreakdown.microplasticsPenalty} negative />
                        <ScoreRow label="Bonussen" value={product.scoreBreakdown.bonusTotal} />
                        {product.scoreBreakdown.appliedScoreCap != null && (
                          <ScoreRow label={`Cap: ${product.scoreBreakdown.capReason}`} value={product.scoreBreakdown.appliedScoreCap} cap />
                        )}
                        <div className="border-t border-gray-200 pt-1.5 mt-1.5 flex items-center justify-between font-semibold">
                          <span className="text-gray-900">Eindscore</span>
                          <span className="text-gray-900">{product.scoreBreakdown.finalScore}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Score versie: {product.scoreBreakdown.scoreVersion} · Grade: {product.scoreBreakdown.grade}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Labels & Allergens */}
              <div className="flex flex-wrap gap-4">
                {product.labelsTags?.length > 0 && (
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Labels</p>
                    <div className="flex flex-wrap gap-1">
                      {product.labelsTags.map((l: string) => (
                        <span key={l} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                          {l.replace(/^en:/, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {product.allergensTags?.length > 0 && (
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Allergenen</p>
                    <div className="flex flex-wrap gap-1">
                      {product.allergensTags.map((a: string) => (
                        <span key={a} className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded">
                          {a.replace(/^en:/, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="text-[11px] text-gray-400 border-t border-gray-100 pt-4 space-y-0.5">
                <p>Score versie: {data?.score_version}</p>
                <p>Categorie: {data?.category_slug || '—'}</p>
                <p>Merk slug: {data?.brand_slug || '—'}</p>
                <p>Aangemaakt: {data?.created_at ? new Date(data.created_at).toLocaleString('nl-NL') : '—'}</p>
                <p>Bijgewerkt: {data?.updated_at ? new Date(data.updated_at).toLocaleString('nl-NL') : '—'}</p>
              </div>
            </div>
          ) : (
            <div className="p-6 text-gray-400 text-sm">Product niet gevonden</div>
          )}
        </div>
      </div>
    </>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gray-400">{icon}</span>
        <h3 className="text-[13px] font-semibold text-gray-700">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 60 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  const circumference = 2 * Math.PI * 22;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="22" fill="none" stroke="#f3f4f6" strokeWidth="4" />
        <circle
          cx="28" cy="28" r="22" fill="none"
          stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 28 28)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[15px] font-bold" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

function BreakdownCard({ label, value, icon }: { label: string; value?: string; icon: React.ReactNode }) {
  const levelColor = getLevelColor(value);
  return (
    <div className={`rounded-lg px-3 py-2.5 border ${levelColor.border} ${levelColor.bg}`}>
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className={levelColor.text}>{icon}</span>
        <span className="text-[11px] text-gray-500">{label}</span>
      </div>
      <p className={`text-[12px] font-semibold ${levelColor.text}`}>{value || '—'}</p>
    </div>
  );
}

function RiskRow({ label, status, detail, icon }: { label: string; status?: string; detail?: string; icon: React.ReactNode }) {
  const isRisky = status && !['Niet gevonden', 'Niet gelinkt', 'Laag risico', 'Niet van toepassing'].includes(status);
  return (
    <div className={`rounded-lg px-3 py-2 ${isRisky ? 'bg-red-50 border border-red-100' : 'bg-gray-50 border border-gray-100'}`}>
      <div className="flex items-center gap-2">
        <span className={isRisky ? 'text-red-500' : 'text-gray-400'}>{icon}</span>
        <span className="text-[12px] font-medium text-gray-900">{label}</span>
        <span className={`text-[11px] ml-auto font-medium ${isRisky ? 'text-red-600' : 'text-emerald-600'}`}>{status || '—'}</span>
      </div>
      {detail && <p className="text-[11px] text-gray-500 mt-1 pl-6">{detail}</p>}
    </div>
  );
}

function NutrientRow({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-gray-400">{icon}</span>
      <span className="text-[12px] text-gray-600 flex-1">{label}</span>
      <span className="text-[12px] font-medium text-gray-900">{value}</span>
    </div>
  );
}

function ScoreRow({ label, value, negative, cap }: { label: string; value: number; negative?: boolean; cap?: boolean }) {
  const color = value === 0 ? 'text-gray-400' : negative && value < 0 ? 'text-red-500' : cap ? 'text-amber-600' : 'text-emerald-600';
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={`font-medium ${color}`}>{value > 0 && !cap ? '+' : ''}{value}</span>
    </div>
  );
}

function QualityBadge({ value }: { value?: string }) {
  const map: Record<string, string> = {
    schoon: 'text-emerald-700 bg-emerald-50',
    redelijk: 'text-amber-700 bg-amber-50',
    zwak: 'text-red-700 bg-red-50',
  };
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${map[value ?? ''] ?? 'text-gray-500 bg-gray-100'}`}>
      {value || '—'}
    </span>
  );
}

function getLevelColor(value?: string) {
  const good = ['Onbewerkt', 'Licht bewerkt', 'Goed', 'Niet gevonden'];
  const mid = ['Bewerkt', 'Matig', 'Enkele', 'Let op'];
  if (good.includes(value ?? '')) return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700' };
  if (mid.includes(value ?? '')) return { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700' };
  if (value) return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700' };
  return { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-500' };
}

function formatAspect(aspect: string): string {
  const map: Record<string, string> = {
    artificial_sweeteners: 'Kunstmatige zoetstoffen',
    refined_sugars: 'Geraffineerde suikers',
    cheap_oils: 'Goedkope oliën',
    low_quality_fats: 'Laagwaardig vet',
    artificial_flavors: 'Kunstmatige smaakstoffen',
    colorants: 'Kleurstoffen',
    preservatives: 'Conserveringsmiddelen',
    fillers: 'Vulstoffen',
    base_quality: 'Basiskwaliteit',
  };
  return map[aspect] ?? aspect;
}
