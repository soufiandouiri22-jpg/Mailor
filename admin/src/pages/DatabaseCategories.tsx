import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronRight, FolderOpen, Package } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProductDetail from '../components/ProductDetail';
import { supabase } from '../lib/supabase';

interface Category {
  slug: string;
  name_nl: string;
  parent_slug: string | null;
  sort_order: number;
  product_count?: number;
}

interface ProductRow {
  barcode: string;
  product_name: string;
  brands: string;
  score: number;
  image_url: string | null;
}

const PAGE_SIZE = 50;

export default function DatabaseCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [path, setPath] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const productListRef = useRef<HTMLDivElement>(null);

  const currentSlug = path.length > 0 ? path[path.length - 1].slug : null;

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('product_categories')
        .select('slug, name_nl, parent_slug, sort_order')
        .order('sort_order');
      if (data) setCategories(data);
      setLoading(false);
    }
    load();
  }, []);

  const children = categories.filter((c) => c.parent_slug === currentSlug);

  function getDescendantSlugs(parentSlug: string): string[] {
    const result = [parentSlug];
    const queue = [parentSlug];
    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const c of categories) {
        if (c.parent_slug === current) {
          result.push(c.slug);
          queue.push(c.slug);
        }
      }
    }
    return result;
  }

  const loadProducts = useCallback(async (slugs: string[], offset: number) => {
    const { data } = await supabase
      .from('products')
      .select('barcode, product_name, brands, score, image_url')
      .in('category_slug', slugs)
      .order('score', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);
    return data ?? [];
  }, []);

  useEffect(() => {
    if (!currentSlug) {
      setProducts([]);
      setHasMore(true);
      return;
    }
    let cancelled = false;
    async function init() {
      const slugs = getDescendantSlugs(currentSlug!);
      const data = await loadProducts(slugs, 0);
      if (cancelled) return;
      setProducts(data);
      setHasMore(data.length >= PAGE_SIZE);
    }
    init();
    return () => { cancelled = true; };
  }, [currentSlug, categories, loadProducts]);

  const handleProductScroll = useCallback(async () => {
    const el = productListRef.current;
    if (!el || !currentSlug || !hasMore || loadingMore) return;
    if (el.scrollTop + el.clientHeight < el.scrollHeight - 100) return;

    setLoadingMore(true);
    const slugs = getDescendantSlugs(currentSlug);
    const data = await loadProducts(slugs, products.length);
    setProducts(prev => [...prev, ...data]);
    setHasMore(data.length >= PAGE_SIZE);
    setLoadingMore(false);
  }, [currentSlug, hasMore, loadingMore, products.length, loadProducts]);

  function navigate(cat: Category) {
    setPath([...path, cat]);
  }

  function navigateTo(index: number) {
    setPath(path.slice(0, index + 1));
  }

  function goRoot() {
    setPath([]);
  }

  if (loading) {
    return (
      <div className="p-8">
        <PageHeader title="Categorieën" />
        <p className="text-gray-400 text-sm">Laden...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader
        title="Categorieën"
        description={`${categories.length} categorieën in de database`}
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] mb-5">
        <button onClick={goRoot} className="text-gray-500 hover:text-gray-900 font-medium">
          Root
        </button>
        {path.map((cat, i) => (
          <span key={cat.slug} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-gray-300" />
            <button
              onClick={() => navigateTo(i)}
              className={`font-medium ${i === path.length - 1 ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {cat.name_nl}
            </button>
          </span>
        ))}
      </div>

      {/* Subcategories */}
      {children.length > 0 && (
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Subcategorieën ({children.length})
          </p>
          <div className="grid grid-cols-3 gap-2">
            {children.map((cat) => {
              const subCount = categories.filter((c) => c.parent_slug === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => navigate(cat)}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all text-left"
                >
                  <FolderOpen size={18} className="text-gray-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-gray-900 truncate">{cat.name_nl}</p>
                    <p className="text-[11px] text-gray-400">
                      {subCount > 0 ? `${subCount} subcategorieën` : 'Bladcategorie'}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 ml-auto shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Products */}
      {currentSlug && (
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Producten ({products.length})
          </p>
          {products.length === 0 ? (
            <p className="text-sm text-gray-400">Geen producten in deze categorie</p>
          ) : (
            <div
              ref={productListRef}
              onScroll={handleProductScroll}
              className="space-y-1 max-h-[calc(100vh-380px)] overflow-y-auto"
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
                    <p className="text-[11px] text-gray-400 truncate">{p.brands || 'Onbekend merk'}</p>
                  </div>
                  <ScoreBadge score={p.score} />
                </div>
              ))}
              {loadingMore && (
                <p className="text-center text-[12px] text-gray-400 py-2">Laden...</p>
              )}
            </div>
          )}
        </div>
      )}
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
