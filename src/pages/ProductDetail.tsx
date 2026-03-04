import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CATEGORY_SLUGS } from '../lib/constants';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ShoppingCart,
  Leaf,
  FlaskConical,
  Weight,
  Star,
  RefreshCw,
  CheckCircle,
  Send,
  MessageSquare,
  Package,
  Tag,
  Shield,
  ChevronRight,
  Quote,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Review, SubscriptionFrequency, BundleItem } from '../lib/types';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import StockBadge from '../components/StockBadge';
import QuantitySelector from '../components/QuantitySelector';
import StarRating from '../components/StarRating';
import SEO from '../components/SEO';
import RelatedProducts from '../components/RelatedProducts';
import FrequentlyBoughtTogether from '../components/FrequentlyBoughtTogether';
import { useSettingsStore } from '../store/settingsStore';
import { useShopStore } from '../store/shopStore';
import { useShopPath } from '../hooks/useShopPath';

const FREQUENCY_LABELS: Record<SubscriptionFrequency, string> = {
  weekly: 'Chaque semaine',
  biweekly: 'Toutes les 2 semaines',
  monthly: 'Chaque mois',
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { currentShop } = useShopStore();
  const sp = useShopPath();

  const [product, setProduct] = useState<Product | null>(null);
  const [bundleItems, setBundleItems] = useState<BundleItem[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Subscription state
  const [subFrequency, setSubFrequency] = useState<SubscriptionFrequency>('monthly');
  const [subQty, setSubQty] = useState(1);
  const [subSuccess, setSubSuccess] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [canReview, setCanReview] = useState(false);
  const [reviewableOrderId, setReviewableOrderId] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const openSidebar = useCartStore((s) => s.openSidebar);
  const settings = useSettingsStore((s) => s.settings);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    if (!slug) return;
    const query = supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .eq('is_active', true);

    if (currentShop) {
      query.eq('shop_id', currentShop.id);
    }

    query.single()
      .then(({ data, error }) => {
        if (error || !data) {
          navigate(sp('/catalogue'), { replace: true });
          return;
        }
        const p = data as Product;
        setProduct(p);
        setIsLoading(false);
        loadReviews(p.id);
        if (user) checkCanReview(p.id, user.id);

        // Build images array (main + extra from product_images table)
        const mainImage = p.image_url ?? 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800';
        supabase
          .from('product_images')
          .select('image_url, sort_order')
          .eq('product_id', p.id)
          .order('sort_order')
          .then(({ data: extraImages, error: imgError }) => {
            if (imgError || !extraImages) {
              setProductImages([mainImage]);
              return;
            }
            const urls = extraImages.map((img: { image_url: string }) => img.image_url);
            setProductImages([mainImage, ...urls]);
          });
        // Load bundle items if applicable
        if (p.is_bundle) {
          supabase
            .from('bundle_items')
            .select('*, product:products(id, name, slug, price, image_url, cbd_percentage, weight_grams)')
            .eq('bundle_id', p.id)
            .then(({ data: items }) => {
              if (items) setBundleItems(items as BundleItem[]);
            });
        }
      });
  }, [slug, navigate, user]);

  async function loadReviews(productId: string) {
    const { data } = await supabase
      .from('reviews')
      .select('*, profile:profiles(full_name)')
      .eq('product_id', productId)
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    const list = (data as Review[]) ?? [];
    setReviews(list);
    if (list.length > 0) {
      setAvgRating(list.reduce((s, r) => s + r.rating, 0) / list.length);
    }
  }

  async function checkCanReview(productId: string, userId: string) {
    // Find delivered order items for this product by this user
    const { data: items } = await supabase
      .from('order_items')
      .select('order_id')
      .eq('product_id', productId);

    if (!items || items.length === 0) return;
    const orderIds = items.map((i: { order_id: string }) => i.order_id);

    const { data: deliveredOrders } = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', userId)
      .eq('status', 'delivered')
      .in('id', orderIds);

    if (!deliveredOrders || deliveredOrders.length === 0) return;

    // Check no existing review for this product
    const { data: existing } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .limit(1);

    if (!existing || existing.length === 0) {
      setCanReview(true);
      setReviewableOrderId(deliveredOrders[0].id);
    }
  }

  async function handleSubscribe() {
    if (!user) {
      navigate('/connexion');
      return;
    }
    if (!product) return;
    setSubLoading(true);

    const next = new Date();
    if (subFrequency === 'weekly') next.setDate(next.getDate() + 7);
    else if (subFrequency === 'biweekly') next.setDate(next.getDate() + 14);
    else next.setMonth(next.getMonth() + 1);

    await supabase.from('subscriptions').insert({
      user_id: user.id,
      product_id: product.id,
      quantity: subQty,
      frequency: subFrequency,
      next_delivery_date: next.toISOString().split('T')[0],
      status: 'active',
    });

    setSubLoading(false);
    setSubSuccess(true);
  }

  async function handleSubmitReview() {
    if (!user || !product || !reviewableOrderId) return;
    setIsSubmittingReview(true);
    setReviewError('');

    const { error } = await supabase.from('reviews').insert({
      product_id: product.id,
      user_id: user.id,
      order_id: reviewableOrderId,
      rating: reviewRating,
      comment: reviewComment.trim() || null,
      is_verified: true,
      is_published: false,
    });

    if (error) {
      setReviewError('Erreur lors de l\'envoi. Veuillez réessayer.');
      setIsSubmittingReview(false);
      return;
    }

    setReviewSuccess(true);
    setShowReviewForm(false);
    setCanReview(false);
    setIsSubmittingReview(false);
  }

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    if (quantity > 1) updateQuantity(product.id, quantity);
    openSidebar();
    addToast({ message: `${product.name} ajouté au panier`, type: 'success' });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    setQuantity(Math.max(1, Math.min(parseFloat(e.target.value) || 1, product.stock_quantity)));
  }, [product?.stock_quantity]);

  const isOil = product?.category?.slug === CATEGORY_SLUGS.OILS && !product?.is_bundle;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-32 selection:bg-emerald-500/30">
      <SEO
        title={`${product.name} — Green IA Excellence`}
        description={product.description ?? `Découvrez ${product.name} par Green IA. L'excellence du CBD.`}
      />

      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-6 text-label text-zinc-600 mb-16">
          <Link to={sp('/catalogue')} className="group flex items-center gap-3 hover:text-emerald-400 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="italic">Catalogue</span>
          </Link>
          <span className="w-1 h-1 rounded-full bg-zinc-800" />
          {product.category && (
            <>
              <span className="text-zinc-500">{product.category.name}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-800" />
            </>
          )}
          <span className="text-emerald-500/80">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group lg:sticky lg:top-28"
          >
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10 group-hover:bg-primary/10 transition-all duration-1000" />

            {/* Badges */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              {product.is_bundle && (
                <div className="flex items-center gap-2 bg-purple-600/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-2xl">
                  <Package className="w-3 h-3" />
                  Écrin Prestige
                </div>
              )}
              {product.is_featured && !product.is_bundle && (
                <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-black shadow-2xl">
                  <Star className="w-3 h-3 fill-current" />
                  Sélection Maître
                </div>
              )}
            </div>

            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.06] relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={productImages[activeImageIndex] || product.image_url || 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800'}
                  alt={`${product.name} - Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out shadow-inner"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${idx === activeImageIndex
                      ? 'border-primary shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.3)]'
                      : 'border-white/[0.08] opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt={`Vue ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications Overlay (Desktop Only) */}
            <div className="hidden md:flex absolute -bottom-6 -right-6 gap-3 z-30">
              {product.cbd_percentage != null && (
                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
                  <p className="text-xs text-zinc-500 font-medium uppercase mb-1">Concentration</p>
                  <p className="text-3xl font-serif font-bold text-primary leading-none">{product.cbd_percentage}% <span className="text-xs uppercase font-sans tracking-tight">CBD</span></p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              {product.category && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-label text-emerald-400">{product.category.name}</span>
                </div>
              )}
              <h1 className="text-display scale-75 origin-left">
                {product.name}<span className="text-emerald-500 font-light not-italic">.</span>
              </h1>

              {reviews.length > 0 && (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <StarRating rating={avgRating} size="sm" />
                    <span className="text-label text-white ml-1">{avgRating.toFixed(1)}</span>
                  </div>
                  <span className="text-label text-zinc-500">
                    {reviews.length} Témoignages vérifiés
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <p className="text-premium-body">
                {product.description || "Une création singulière, élaborée avec la plus grande exigence pour une expérience sensorielle hors du temps."}
              </p>

              <div className="flex flex-wrap gap-8">
                {(product.attributes?.benefits || []).length > 0 && (
                  <div className="space-y-4">
                    <p className="text-label text-zinc-700 flex items-center gap-3">
                      <span className="w-10 h-[1px] bg-emerald-500/30" /> Effets Principaux
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {product.attributes.benefits!.map(b => (
                        <span key={b} className="text-label text-zinc-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:border-emerald-500/30 transition-all cursor-default">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative group/panel">
              <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl rounded-[3rem] opacity-0 group-hover/panel:opacity-100 transition-opacity duration-1000" />
              <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-12 overflow-hidden shadow-2xl">
                <div className="flex flex-wrap items-end justify-between gap-8">
                  <div className="flex flex-wrap gap-12">
                    <div className="space-y-2">
                      <p className="text-label text-zinc-700">Prix Unitaire</p>
                      <p className="text-section text-emerald-400 leading-none">
                        {product.price.toFixed(2)}<span className="text-lg opacity-60 ml-1">€</span><span className="text-label text-zinc-500 ml-1">/ g</span>
                      </p>
                    </div>
                    <div className="w-[1px] h-12 bg-white/5 hidden sm:block" />
                    <div className="space-y-2">
                      <p className="text-label text-emerald-500/60">Estimation Total ({quantity}g)</p>
                      <p className="text-section text-white leading-none">
                        {(product.price * quantity).toFixed(2)}<span className="text-2xl text-emerald-500 ml-2">€</span>
                      </p>
                    </div>
                  </div>
                  <StockBadge stock={product.stock_quantity} />
                </div>

                {product.is_available && product.stock_quantity > 0 ? (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-3">
                        {[1, 5, 10, 30, 50, 100].map((weight) => (
                          <motion.button
                            key={weight}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setQuantity(Math.min(weight, product.stock_quantity))}
                            className={`px-6 py-3 rounded-2xl text-label transition-all duration-500 ${quantity === weight
                              ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_20px_40px_rgba(16,185,129,0.2)]'
                              : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/20'
                              }`}
                          >
                            {weight}g
                          </motion.button>
                        ))}
                      </div>

                      <div className="flex flex-col md:flex-row items-stretch gap-4">
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center backdrop-blur-md shadow-inner">
                          <div className="flex items-center gap-4 px-2">
                            <span className="text-label text-zinc-700">Poids:</span>
                            <input
                              type="number"
                              step="1"
                              min="1"
                              max={product.stock_quantity}
                              value={quantity}
                              onChange={handleQuantityChange}
                              className="w-16 bg-transparent text-xl font-black text-white text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none italic leading-none"
                            />
                            <span className="text-label text-zinc-500 uppercase">Grammes</span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleAddToCart}
                          className="flex-1 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-4 relative overflow-hidden group/btn"
                        >
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                          <ShoppingCart className="w-5 h-5 relative z-10" />
                          <span className="relative z-10 italic">{addedFeedback ? 'Ajouté avec succès' : 'Ajouter au Panier'}</span>
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-label text-zinc-700 justify-center pt-6 border-t border-white/5">
                      <span className="flex items-center gap-2 decoration-emerald-500/30 underline underline-offset-4"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /> Livraison Discrète</span>
                      <span className="flex items-center gap-2 decoration-zinc-500/30 underline underline-offset-4"><span className="w-1.5 h-1.5 rounded-full bg-zinc-700" /> Paiement Sécurisé</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 border-2 border-dashed border-white/5 rounded-[2rem] text-center bg-white/[0.02]">
                    <p className="text-label text-zinc-700">Édition Temporairement Épuisée</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bundle Content */}
            {product.is_bundle && bundleItems.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-label text-zinc-500">Composition de l'Écrin</h3>
                    <p className="text-xs font-black text-purple-400 italic">Prestige Sélection</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  {bundleItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-6 bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[2rem] p-5 group/item transition-all duration-500"
                    >
                      {item.product?.image_url && (
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl">
                          <img
                            src={item.product.image_url}
                            alt={item.product?.name}
                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-1000"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/catalogue/${item.product?.slug}`}
                          className="text-lg font-black italic uppercase tracking-tighter text-white hover:text-emerald-400 transition-colors line-clamp-1 leading-none"
                        >
                          {item.quantity > 1 && <span className="text-emerald-500 mr-2">{item.quantity}×</span>}
                          {item.product?.name}
                        </Link>
                        {item.product?.cbd_percentage && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-label text-zinc-700 scale-75 origin-left">Concentration :</span>
                            <span className="text-label text-emerald-500/80 scale-75 origin-left">{item.product.cbd_percentage}% CBD</span>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-700 group-hover/item:text-emerald-500 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Subscription Card */}
            {settings.subscriptions_enabled && product.is_subscribable && !subSuccess && (
              <div className="relative group/ritual overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-[3rem] opacity-0 group-hover/ritual:opacity-100 transition-opacity duration-1000" />
                <div className="relative bg-gradient-to-br from-emerald-500/10 via-zinc-900/40 to-transparent border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-10 space-y-10 backdrop-blur-2xl">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/10">
                      <RefreshCw className="w-7 h-7 animate-spin-slow" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Rituel d'Excellence<span className="text-emerald-500">.</span></h3>
                      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] mt-2">Abonnement Privilège Automatisé</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-label text-zinc-700">Fréquence de Livraison</p>
                      <div className="flex flex-wrap gap-3">
                        {(Object.keys(FREQUENCY_LABELS) as SubscriptionFrequency[]).map((freq) => (
                          <button
                            key={freq}
                            onClick={() => setSubFrequency(freq)}
                            className={`px-6 py-3 rounded-2xl text-label transition-all duration-500 ${subFrequency === freq
                              ? 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/20'
                              : 'bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:border-white/20'
                              }`}
                          >
                            {FREQUENCY_LABELS[freq]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubscribe}
                      disabled={subLoading}
                      className="w-full flex items-center justify-center gap-4 bg-zinc-950/80 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500 hover:text-black text-white font-black uppercase tracking-[0.2em] py-6 rounded-[2rem] transition-all duration-700 shadow-2xl group/ritual-btn"
                    >
                      {subLoading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 group-hover/ritual-btn:animate-pulse" />
                          <span className="italic">Initier le Rituel</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {settings.subscriptions_enabled && product.is_subscribable && subSuccess && (
              <div className="bg-green-900/20 border border-green-800 rounded-2xl p-5 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-400 font-semibold">Abonnement créé !</p>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    Gérez vos livraisons depuis{' '}
                    <Link to="/compte/abonnements" className="text-primary hover:underline">
                      Mon compte
                    </Link>.
                  </p>
                </div>
              </div>
            )}

            {/* Legal */}
            <div className="pt-8 border-t border-white/5">
              <p className="text-label text-zinc-700 leading-loose">
                Produit contenant moins de 0,3% de THC. Conforme à la réglementation française.
                <br />Vente strictement réservée aux personnes majeures.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Frequently Bought Together */}
        {!product.is_bundle && (
          <div className="mt-20">
            <FrequentlyBoughtTogether
              productId={product.id}
              categoryId={product.category_id}
              currentPrice={product.price}
            />
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-40 space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-10 relative">
            <div className="absolute -bottom-[1px] left-0 w-32 h-[1px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <div className="space-y-6">
              <h2 className="text-label text-zinc-700">Expérience & Témoignages</h2>
              <p className="text-section text-white">L'Expression de nos Membres<span className="text-emerald-500 font-light not-italic">.</span></p>
            </div>
            {reviews.length > 0 && (
              <div className="flex items-center gap-8 bg-black/40 border border-white/5 px-10 py-5 rounded-[2rem] backdrop-blur-xl shadow-2xl">
                <div className="flex flex-col items-center">
                  <StarRating rating={avgRating} size="sm" />
                  <p className="text-label text-zinc-700 mt-2">Satisfaction</p>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white italic tracking-tighter leading-none">{avgRating.toFixed(1)}</span>
                  <p className="text-label text-emerald-500 mt-2">Score</p>
                </div>
              </div>
            )}
          </div>

          {/* Can review CTA */}
          {canReview && !reviewSuccess && !showReviewForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group/cta overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/5 blur-3xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-1000" />
              <div className="relative bg-zinc-900/40 border-2 border-dashed border-emerald-500/20 rounded-[2.5rem] p-12 text-center space-y-8 backdrop-blur-xl">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <p className="text-section text-white">Partagez votre voyage sensoriel<span className="text-emerald-500 font-light not-italic">.</span></p>
                  <p className="text-premium-body max-w-md mx-auto">Votre expertise est la pierre angulaire de notre quête d'excellence.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReviewForm(true)}
                  className="bg-emerald-500 text-black font-black uppercase tracking-[0.2em] px-10 py-5 rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all"
                >
                  Rédiger mon Impression
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Review success message */}
          {reviewSuccess && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-8 flex items-center gap-8 backdrop-blur-xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-label text-emerald-400">Impression Transmise</p>
                <p className="text-premium-body text-zinc-500 italic max-w-xl">Votre témoignage est en cours de modération par notre comité d'excellence.</p>
              </div>
            </div>
          )}

          {/* Review form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-10"
              >
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold italic text-white leading-none">Votre Note.</h3>
                  <StarRating
                    rating={reviewRating}
                    size="lg"
                    interactive
                    onRate={setReviewRating}
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-label text-zinc-700">VOTRE TÉMOIGNAGE</p>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={5}
                    placeholder="Décrivez les nuances, l'arôme, et l'expérience vécue..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-6 text-white placeholder-zinc-800 focus:outline-none focus:border-emerald-500/40 focus:bg-black/60 transition-all italic font-medium resize-none shadow-inner"
                  />
                </div>

                {reviewError && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-500">{reviewError}</p>
                )}

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleSubmitReview}
                    disabled={isSubmittingReview}
                    className="flex-1 bg-primary text-black font-semibold uppercase tracking-wider py-5 rounded-2xl hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmittingReview ? 'TRANSMISSION...' : 'TRANSMETTRE'}
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="px-10 py-5 text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-white transition-colors"
                  >
                    ANNULER
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews list */}
          {reviews.length === 0 ? (
            <div className="py-32 text-center space-y-8 bg-zinc-900/20 border-2 border-dashed border-white/5 rounded-[3rem] backdrop-blur-md">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/5 flex items-center justify-center text-zinc-800">
                <MessageSquare className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <p className="text-4xl font-black text-zinc-800 italic uppercase tracking-tighter leading-none">Silence Éloquent<span className="text-zinc-900">.</span></p>
                <p className="text-zinc-700 text-sm max-w-xs mx-auto italic font-medium">Aucune impression n'a encore été consignée pour cette édition.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-10">
              {reviews.map((review, i) => {
                const initials = (review.profile?.full_name ?? 'C L')
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();
                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group/review"
                  >
                    <div className="absolute inset-0 bg-white/[0.02] blur-2xl rounded-[2.5rem] opacity-0 group-hover/review:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 md:p-10 hover:border-emerald-500/20 transition-all duration-500">
                      <div className="flex flex-col md:flex-row gap-10">
                        <div className="w-20 h-20 rounded-3xl bg-zinc-950 border border-white/5 flex items-center justify-center text-emerald-500 font-black text-lg tracking-[0.2em] shadow-inner relative shrink-0">
                          <div className="absolute inset-2 border border-emerald-500/10 rounded-2xl" />
                          {initials}
                        </div>
                        <div className="flex-1 space-y-8">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                              <p className="text-xl font-black text-white italic uppercase tracking-tighter">{review.profile?.full_name ?? 'Membre Anonyme'}</p>
                              <div className="flex items-center gap-5">
                                <StarRating rating={review.rating} size="sm" />
                                {review.is_verified && (
                                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                    <Shield className="w-3 h-3 text-emerald-400" />
                                    <span className="text-label text-emerald-400 scale-75 origin-left">Achat Certifié</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col md:items-end">
                              <p className="text-label text-zinc-700">Archivé le</p>
                              <p className="text-label text-zinc-400 mt-1">
                                {new Date(review.created_at).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                          {review.comment && (
                            <div className="relative">
                              <Quote className="absolute -top-4 -left-4 w-10 h-10 text-emerald-500/5 rotate-12" />
                              <p className="text-premium-body border-l-2 border-emerald-500/20 pl-8">
                                "{review.comment.trim()}"
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <div className="mt-40 pt-20 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <div className="mb-20 space-y-6 text-center">
            <h2 className="text-label text-zinc-700">Découvertes Similaires</h2>
            <p className="text-section text-white">Poursuivre l'Odyssée<span className="text-emerald-500 font-light not-italic">.</span></p>
          </div>
          <RelatedProducts productId={product.id} categoryId={product.category_id} />
        </div>

        {/* Legal Footer */}
        <div className="mt-40 pt-20 border-t border-white/5 text-center">
          <p className="text-label text-zinc-800 leading-loose max-w-3xl mx-auto opacity-40">
            LES PRODUITS PRÉSENTÉS SONT CONFORMES AUX DÉCRETS N°2021-1282. TAUX DE THC INFÉRIEUR À 0.3%.
            DESTINÉS EXCLUSIVEMENT À UN PUBLIC MAJEUR ET AVERTI. TOUS DROITS RÉSERVÉS GREEN IA.
          </p>
        </div>
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      {
        product.is_available && product.stock_quantity > 0 && (
          <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden px-4 pb-8 pointer-events-none">
            <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 p-4 rounded-[2rem] flex items-center gap-4 shadow-2xl pointer-events-auto">
              <div className="px-4 border-r border-white/10">
                <p className="text-section text-white scale-75 origin-left">
                  {product.price.toFixed(2)}<span className="text-sm text-emerald-500 ml-1">€</span>
                </p>
                <p className="text-label text-zinc-700 scale-75 origin-left -mt-1">TTC/g</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-label">{addedFeedback ? 'DÉPOSÉ' : 'AJOUTER'}</span>
              </motion.button>
            </div>
          </div>
        )
      }
    </div>
  );
}
