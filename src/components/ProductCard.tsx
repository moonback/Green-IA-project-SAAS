import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../lib/types';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import { useWishlistStore } from '../store/wishlistStore';
import StockBadge from './StockBadge';
import { useShopPath } from '../hooks/useShopPath';
import { GlassBadge } from './ui/GlassPrimitives';

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

  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      className="group glass-panel flex h-full flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl">
        <img
          src={product.image_url ?? FALLBACK_IMG}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

        <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
          {product.is_featured && <GlassBadge className="text-emerald-200">Élite</GlassBadge>}
          {product.is_bundle && <GlassBadge>Pack</GlassBadge>}
          <GlassBadge className={isLowStock ? 'border-amber-300/30 text-amber-100' : 'text-emerald-100'}>
            <Activity className="h-3 w-3" />
            Stock live · {product.stock_quantity}
          </GlassBadge>
        </div>

        <button
          onClick={handleToggleWishlist}
          className={`absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl transition ${isWished
            ? 'border-rose-300/40 bg-rose-400/80 text-white'
            : 'border-white/15 bg-black/35 text-zinc-300 hover:text-white'
            }`}
        >
          <Heart className={`h-4 w-4 ${isWished ? 'fill-current' : ''}`} />
        </button>

        <Link to={sp(`/catalogue/${product.slug}`)} className="absolute inset-0 z-10" aria-label={product.name} />

        <motion.button
          onClick={handleAddToCart}
          disabled={!product.is_available || product.stock_quantity === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="absolute bottom-4 right-4 z-30 inline-flex h-12 items-center gap-2 rounded-full border border-emerald-200/40 bg-emerald-300 px-4 text-xs font-black uppercase tracking-[0.15em] text-zinc-950 shadow-[0_14px_30px_rgba(52,211,153,0.35)] transition disabled:opacity-40"
        >
          <ShoppingCart className="h-4 w-4" />
          Ajouter
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex items-start justify-between gap-3">
          <Link to={sp(`/catalogue/${product.slug}`)} className="group/title">
            <h3 className="text-2xl font-semibold text-white transition group-hover/title:text-emerald-100">{product.name}</h3>
          </Link>
          <ArrowUpRight className="h-4 w-4 text-zinc-500" />
        </div>

        <div className="flex items-center gap-2">
          <GlassBadge className="text-emerald-100">CBD {product.cbd_percentage ?? 0}%</GlassBadge>
          <GlassBadge className="text-zinc-300">THC max {product.thc_max ?? 0.2}%</GlassBadge>
          {product.avg_rating ? (
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-zinc-200">
              <Star className="h-3 w-3 fill-emerald-300 text-emerald-300" />
              {product.avg_rating.toFixed(1)}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Prix</p>
            <p className="text-3xl font-black tracking-tight text-white">{Number(product.price).toFixed(2)}€</p>
          </div>
          <StockBadge stock={product.stock_quantity} />
        </div>
      </div>
    </motion.div>
  );
}
