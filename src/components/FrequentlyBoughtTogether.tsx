import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, ShoppingCart, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';

const FALLBACK_IMG = 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=200';

interface Props {
  productId: string;
  categoryId: string;
  currentPrice: number;
}

export default function FrequentlyBoughtTogether({ productId, categoryId, currentPrice }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const addItem = useCartStore((s) => s.addItem);
  const openSidebar = useCartStore((s) => s.openSidebar);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    async function load() {
      // Fetch products frequently ordered together (same category, different product)
      const { data } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('category_id', categoryId)
        .eq('is_active', true)
        .eq('is_available', true)
        .neq('id', productId)
        .gt('stock_quantity', 0)
        .order('is_featured', { ascending: false })
        .limit(3);

      if (data && data.length > 0) {
        setProducts(data as Product[]);
        setSelected(new Set((data as Product[]).map((p) => p.id)));
      }
    }
    load();
  }, [productId, categoryId]);

  if (products.length === 0) return null;

  const selectedProducts = products.filter((p) => selected.has(p.id));
  const bundleTotal = currentPrice + selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const toggleProduct = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddBundle = () => {
    for (const p of selectedProducts) {
      addItem(p);
    }
    openSidebar();
    addToast({ message: `${selectedProducts.length} produit${selectedProducts.length > 1 ? 's' : ''} ajouté${selectedProducts.length > 1 ? 's' : ''} au panier`, type: 'success' });
  };

  return (
    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Synergie Moléculaire</h3>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">Souvent sélectionnés ensemble</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-400">
          <Plus className="w-3 h-3" /> Bundle Optimal
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 relative z-10">
        {products.map((product, idx) => (
          <div key={product.id} className="flex items-center gap-6">
            {idx > 0 && (
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-zinc-600" />
              </div>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleProduct(product.id)}
              className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 max-w-[280px] ${selected.has(product.id)
                ? 'bg-white/[0.08] border-primary/40 shadow-xl shadow-black/20'
                : 'bg-white/[0.01] border-white/[0.06] opacity-40 hover:opacity-100'
                }`}
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 flex-shrink-0">
                <img
                  src={product.image_url ?? FALLBACK_IMG}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="text-left min-w-0 flex-1 space-y-1">
                <p className="text-xs font-black text-white uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{product.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black text-white">{product.price.toFixed(2)}€</p>
                  {product.cbd_percentage && <span className="text-[8px] font-bold text-primary/60">{product.cbd_percentage}% CBD</span>}
                </div>
              </div>
              <div className={`w-6 h-6 rounded-lg border flex-shrink-0 flex items-center justify-center transition-all ${selected.has(product.id)
                ? 'bg-primary border-primary text-black shadow-lg shadow-primary/20 rotate-0'
                : 'border-white/20 -rotate-12'
                }`}>
                {selected.has(product.id) ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Plus className="w-3 h-3" />
                )}
              </div>
            </motion.button>
          </div>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10 relative z-10">
          <div className="flex items-center gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Valeur de la Collection</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white tracking-tighter">
                  {bundleTotal.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-zinc-500">€</span>
              </div>
            </div>
            {selectedProducts.length > 1 && (
              <div className="h-10 w-px bg-white/10 hidden sm:block" />
            )}
            {selectedProducts.length > 1 && (
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 hidden sm:block">
                Optimisation Confirmée
              </p>
            )}
          </div>

          <button
            onClick={handleAddBundle}
            className="w-full sm:w-auto flex items-center justify-center gap-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] px-12 py-6 rounded-2xl hover:bg-primary hover:shadow-[0_20px_40px_rgba(var(--color-primary-rgb),0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            Ajouter au Panier ({selectedProducts.length + 1})
          </button>
        </div>
      )}
    </div>
  );
}
