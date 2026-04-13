import { useEffect, useState, useCallback } from 'react';
import { Search, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProductDetail from '../components/ProductDetail';
import { supabase } from '../lib/supabase';

interface ProductRow {
  barcode: string;
  product_name: string;
  brands: string;
  score: number;
  image_url: string | null;
  category_slug: string | null;
  brand_slug: string | null;
}

const PAGE_SIZE = 25;

export default function DatabaseProducts() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('barcode, product_name, brands, score, image_url, category_slug, brand_slug', { count: 'exact' })
      .order('score', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (search.trim()) {
      query = query.ilike('product_name', `%${search.trim()}%`);
    }

    const { data, count } = await query;
    setProducts(data ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [search, page]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => { setPage(0); }, [search]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader
        title="Producten"
        description={`${total.toLocaleString()} producten in de database`}
      />

      <div className="relative mb-4 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Zoek op productnaam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
        />
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Laden...</p>
      ) : (
        <>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500">Product</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500">Merk</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500">Categorie</th>
                  <th className="text-right px-4 py-2.5 font-medium text-gray-500">Score</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.barcode} onClick={() => setSelectedBarcode(p.barcode)} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        {p.image_url ? (
                          <img src={p.image_url} alt="" className="w-8 h-8 rounded object-cover bg-gray-100" />
                        ) : (
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                            <Package size={14} className="text-gray-300" />
                          </div>
                        )}
                        <span className="font-medium text-gray-900 truncate max-w-[280px]">{p.product_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 truncate max-w-[140px]">{p.brands || '—'}</td>
                    <td className="px-4 py-2.5 text-gray-400 truncate max-w-[140px]">{p.category_slug || '—'}</td>
                    <td className="px-4 py-2.5 text-right">
                      <ScoreBadge score={p.score} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-[13px] text-gray-500">
            <span>
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} van {total.toLocaleString()}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <span>Pagina {page + 1} / {totalPages || 1}</span>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
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
