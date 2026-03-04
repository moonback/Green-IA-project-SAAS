import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Package, ArrowUpRight, Search, Heart, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../lib/types';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import { useWishlistStore } from '../store/wishlistStore';
import StockBadge from './StockBadge';
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      className="group relative bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] active:scale-[0.98]"
    >
      {/* ─── Media Section ─── */}
      <div className="relative aspect-[1/1.2] overflow-hidden">
        {/* Badges on Media */}
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
          <StockBadge stock={product.stock_quantity} />
          {product.is_featured && (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-label flex items-center gap-2 shadow-xl lowercase">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span className="uppercase tracking-[0.4em]">Exceptionnel</span>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleWishlist}
          className={`absolute top-5 right-5 z-20 w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-2xl border transition-all duration-500 ${isWished
            ? 'bg-emerald-500 border-emerald-400 text-black'
            : 'bg-black/40 border-white/10 text-white/70 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 shadow-2xl'
            }`}
        >
          <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Floating Add to Cart (Quick Action) */}
        <div className="absolute bottom-6 left-6 right-6 z-30 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={!product.is_available || product.stock_quantity === 0}
            className="w-full bg-emerald-500 text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            <ShoppingCart className="w-4 h-4 relative z-10" />
            <span className="relative z-10 italic">Ajouter au Panier</span>
          </motion.button>
        </div>

        <Link to={sp(`/catalogue/${product.slug}`)} className="block h-full overflow-hidden">
          <img
            src={product.image_url ?? FALLBACK_IMG}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        </Link>
      </div>

      {/* ─── Info Section ─── */}
      <div className="p-8 flex flex-col flex-1 space-y-6 relative">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-label text-emerald-500/80">
              {product.category?.name || 'Exceptionnel'}
            </span>
            <div className="flex gap-2">
              {product.cbd_percentage != null && (
                <span className="text-label text-zinc-500 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 lowercase tracking-widest">
                  <span className="uppercase">{product.cbd_percentage}% CBD</span>
                </span>
              )}
            </div>
          </div>
          <Link to={sp(`/catalogue/${product.slug}`)}>
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-emerald-400 transition-colors leading-none">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-5 text-label text-zinc-600">
          <div className="flex items-center gap-1.5 group/stat">
            <Star className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 shadow-emerald-500/50" />
            <span className="text-zinc-300">{product.avg_rating?.toFixed(1) || '5.0'}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-zinc-700" />
            <span>{product.weight_grams ? `${product.weight_grams}g` : 'Premium'}</span>
          </div>
        </div>

        <div className="pt-6 mt-auto flex items-center justify-between border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-white italic tracking-tighter">
              {Number(product.price).toFixed(2)}<span className="text-emerald-500 text-sm not-italic ml-0.5">€</span>
            </span>
            {product.original_value && product.original_value > product.price && (
              <span className="text-label text-zinc-700 line-through px-1">
                {product.original_value.toFixed(2)}€
              </span>
            )}
          </div>

          <Link
            to={sp(`/catalogue/${product.slug}`)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-500 group/link shadow-xl"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </motion.div>
  );
}

