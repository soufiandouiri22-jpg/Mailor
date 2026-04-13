import { useEffect, useState, useRef, useCallback } from 'react';
import { Search, Package } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProductDetail from '../components/ProductDetail';
import { supabase } from '../lib/supabase';

interface Brand {
  slug: string;
  name: string;
  product_count: number;
  avg_score: number | null;
}

interface ProductRow {
  barcode: string;
  product_name: string;
  score: number;
  image_url: string | null;
}

const PAGE_SIZE = 50;

export default function DatabaseBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Brand | null>(null);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const productListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('brands')
        .select('slug, name, product_count, avg_score')
        .order('product_count', { ascending: false })
        .limit(500);
      if (data) setBrands(data);
      setLoading(false);
    }
    load();
  }, []);

  const loadProducts = useCallback(async (slug: string, offset: number) => {
    const { data } = await supabase
      .from('products')
      .select('barcode, product_name, score, image_url')
      .eq('brand_slug', slug)
      .order('score', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);
    return data ?? [];
  }, []);

  useEffect(() => {
    if (!selected) {
      setProducts([]);
      setHasMore(true);
      return;
    }
    let cancelled = false;
    async function load() {
      const data = await loadProducts(selected!.slug, 0);
      if (cancelled) return;
      setProducts(data);
      setHasMore(data.length >= PAGE_SIZE);
    }
    load();
    return () => { cancelled = true; };
  }, [selected, loadProducts]);

  const handleScroll = useCallback(async () => {
    const el = productListRef.current;
    if (!el || !selected || !hasMore || loadingMore) return;
    if (el.scrollTop + el.clientHeight < el.scrollHeight - 100) return;

    setLoadingMore(true);
    const data = await loadProducts(selected.slug, products.length);
    setProducts(prev => [...prev, ...data]);
    setHasMore(data.length >= PAGE_SIZE);
    setLoadingMore(false);
  }, [selected, hasMore, loadingMore, products.length, loadProducts]);

  const filtered = search
    ? brands.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    : brands;

  if (loading) {
    return (
      <div className="p-8">
        <PageHeader title="Merken & Restaurants" />
        <p className="text-gray-400 text-sm">Laden...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader
        title="Merken & Restaurants"
        description={`${brands.length} merken in de database`}
      />

      <div className="flex gap-6">
        {/* Brand list */}
        <div className="w-80 shrink-0">
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek merk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="space-y-0.5 max-h-[calc(100vh-220px)] overflow-y-auto">
            {filtered.map((b) => (
              <button
                key={b.slug}
                onClick={() => setSelected(b)}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  selected?.slug === b.slug ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-medium truncate">{b.name}</p>
                  <p className="text-[11px] text-gray-400">{b.product_count} producten</p>
                </div>
                {b.avg_score != null && <ScoreBadge score={b.avg_score} />}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
                  <p className="text-[12px] text-gray-400">
                    {selected.product_count} producten · Gem. score: {selected.avg_score ?? '—'}
                  </p>
                </div>
              </div>
              <div
                ref={productListRef}
                onScroll={handleScroll}
                className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto"
              >
                {products.map((p) => (
                  <div
                    key={p.barcode}
                    onClick={() => setSelectedBarcode(p.barcode)}
                    className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    {p.image_url ? (
                      <img src={p.image_url} alt="" className="w-9 h-9 rounded object-cover bg-gray-100" />
                    ) : (
                      <div className="w-9 h-9 rounded bg-gray-100 flex items-center justify-center">
                        <Package size={16} className="text-gray-300" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-gray-900 truncate">{p.product_name}</p>
                    </div>
                    <ScoreBadge score={p.score} />
                  </div>
                ))}
                {loadingMore && (
                  <p className="text-center text-[12px] text-gray-400 py-2">Laden...</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-60 text-gray-400 text-sm">
              Selecteer een merk om producten te bekijken
            </div>
          )}
        </div>
      </div>
      <ProductDetail barcode={selectedBarcode} onClose={() => setSelectedBarcode(null)} />
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 60 ? 'text-emerald-600 bg-emerald-50' : score >= 40 ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50';
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{score}</span>
  );
}
