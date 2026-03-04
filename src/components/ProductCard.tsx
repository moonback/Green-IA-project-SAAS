import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Package, RefreshCw, Heart, ArrowUpRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../lib/types';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import { useWishlistStore } from '../store/wishlistStore';
import StockBadge from './StockBadge';
import StarRating from './StarRating';
import { useShopPath } from '../hooks/useShopPath';

const FALLBACK_IMG = 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openSidebar = useCartStore((s) => s.openSidebar);
  const addToast = useToastStore((s) => s.addToast);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWished = useWishlistStore((s) => s.hasItem(product.id));
  const sp = useShopPath();

  const handleToggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    addToast({
      message: isWished ? `${product.name} retiré` : `${product.name} ajouté aux favoris`,
      type: isWished ? 'info' : 'success',
    });
  };

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    addItem(product);
    openSidebar();
    addToast({ message: `${product.name} ajouté au panier`, type: 'success' });
  };

  const tags: { label: string; variant: 'spec' | 'benefit' | 'aroma' }[] = [];
  if (product.cbd_percentage != null) tags.push({ label: `${product.cbd_percentage}% CBD`, variant: 'spec' });
  if (product.weight_grams != null && tags.length < 2) tags.push({ label: `${product.weight_grams}g`, variant: 'spec' });
  for (const b of (product.attributes?.benefits || []).slice(0, 1)) {
    if (tags.length < 2) tags.push({ label: b, variant: 'benefit' });
  }

  const tagStyles = {
    spec: 'bg-white/[0.04] text-zinc-400 border border-white/[0.06]',
    benefit: 'bg-primary/5 text-primary border border-primary/20',
    aroma: 'bg-white/[0.04] text-zinc-400 border border-white/[0.06]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      className="group relative flex flex-col h-full bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/[0.06] overflow-hidden transition-all duration-700 hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
    >
      {/* ─── Media Section ─── */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40 opacity-20 z-10" />

        {/* Top Badges */}
        <div className="absolute top-5 left-5 z-30 flex flex-col gap-2">
          {product.is_featured && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 bg-primary/90 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-black shadow-lg shadow-primary/20"
            >
              <Star className="w-2.5 h-2.5 fill-current" />
              Édition Élite
            </motion.div>
          )}
          {product.is_bundle && (
            <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white">
              <Package className="w-2.5 h-2.5" />
              Collection Pack
            </div>
          )}
        </div>

        {/* Quick Actions (Floating) */}
        <div className="absolute top-5 right-5 z-30 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={handleToggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-2xl border transition-all duration-300 ${isWished
              ? 'bg-red-500 border-red-400 text-white shadow-lg'
              : 'bg-black/40 border-white/10 text-white/60 hover:text-white hover:bg-black/60'
              }`}
          >
            <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-2xl border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-all"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Image Link */}
        <Link
          to={sp(`/catalogue/${product.slug}`)}
          className="block h-full group/img"
        >
          <img
            src={product.image_url ?? FALLBACK_IMG}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover/img:scale-110"
          />

          {/* Hover Specs Overlay */}
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center mx-auto mb-2">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Explorer l'échantillon</p>
              <div className="flex gap-4 justify-center">
                {product.attributes?.benefits?.slice(0, 2).map(b => (
                  <div key={b} className="text-[9px] uppercase tracking-widest text-zinc-300 border-b border-primary/30 pb-1">{b}</div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* ─── Content Section ─── */}
      <div className="flex flex-col flex-1 p-7 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Ref: #{product.id.slice(0, 5).toUpperCase()}</span>
            {product.cbd_percentage != null && (
              <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                {product.cbd_percentage}% CBD
              </span>
            )}
          </div>

          <Link to={sp(`/catalogue/${product.slug}`)} className="block group/title">
            <h3 className="font-serif font-bold text-2xl text-white leading-tight group-hover/title:translate-x-1 transition-transform">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          {product.avg_rating ? (
            <div className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-primary fill-current" />
              <span className="text-xs font-bold text-white">{product.avg_rating.toFixed(1)}</span>
              <span className="text-xs text-zinc-600">({product.review_count})</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Premium Grade</span>
            </div>
          )}
          <StockBadge stock={product.stock_quantity} />
        </div>

        <div className="h-px bg-gradient-to-r from-white/[0.08] to-transparent" />

        <div className="flex items-center justify-between gap-6 pt-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white tracking-tighter">
                {Number(product.price).toFixed(2)}
              </span>
              <span className="text-sm font-bold text-zinc-400">€</span>
            </div>
            {product.original_value && product.original_value > product.price && (
              <span className="text-[10px] text-zinc-600 line-through">
                {product.original_value.toFixed(2)}€
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.is_available || product.stock_quantity === 0}
            className="relative group/btn flex items-center justify-center w-14 h-14 bg-white text-black rounded-2xl transition-all duration-500 overflow-hidden hover:w-32 active:scale-95 disabled:opacity-20 disabled:grayscale"
          >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center gap-3">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Prendre
              </span>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

