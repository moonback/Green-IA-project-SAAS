import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, SlidersHorizontal, X, Sparkles, Filter, LayoutGrid,
  CalendarCheck, Info, ShieldCheck, ArrowUpDown, ChevronLeft,
  ChevronRight, MousePointer2, Tag, Trash2, Zap, ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Category, Product } from '../lib/types';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useShopStore } from '../store/shopStore';
import { useShopPath } from '../hooks/useShopPath';
import { useShopContent } from '../hooks/useShopContent';

export default function Catalog() {
  const { currentShop } = useShopStore();
  const sp = useShopPath();
  const content = useShopContent();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [selectedAroma, setSelectedAroma] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest'>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const categoryQuery = supabase.from('categories').select('*').eq('is_active', true).order('sort_order');
      const productQuery = supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('name');

      if (currentShop) {
        categoryQuery.eq('shop_id', currentShop.id);
        productQuery.eq('shop_id', currentShop.id);
      }

      const [{ data: cats }, { data: prods }] = await Promise.all([
        categoryQuery,
        productQuery,
      ]);
      setCategories((cats as Category[]) ?? []);

      const productList = (prods as Product[]) ?? [];

      if (productList.length > 0) {
        const productIds = productList.map((p) => p.id);
        const { data: ratingsData } = await supabase
          .from('reviews')
          .select('product_id, rating')
          .in('product_id', productIds)
          .eq('is_published', true);

        const ratingMap = new Map<string, { sum: number; count: number }>();
        (ratingsData ?? []).forEach((r: { product_id: string; rating: number }) => {
          const cur = ratingMap.get(r.product_id) ?? { sum: 0, count: 0 };
          ratingMap.set(r.product_id, { sum: cur.sum + r.rating, count: cur.count + 1 });
        });

        const withRatings = productList.map((p) => {
          const r = ratingMap.get(p.id);
          return r ? { ...p, avg_rating: r.sum / r.count, review_count: r.count } : p;
        });
        setProducts(withRatings);
      } else {
        setProducts(productList);
      }

      setIsLoading(false);
    }
    load();
  }, [currentShop]);

  const allBenefits = useMemo(() => Array.from(new Set(products.flatMap(p => p.attributes?.benefits || []))), [products]);
  const allAromas = useMemo(() => Array.from(new Set(products.flatMap(p => p.attributes?.aromas || []))), [products]);

  const filtered = products.filter((p) => {
    const matchCat = !selectedCategory || p.category_id === selectedCategory;
    const matchBenefit = !selectedBenefit || (p.attributes?.benefits || []).includes(selectedBenefit);
    const matchAroma = !selectedAroma || (p.attributes?.aromas || []).includes(selectedAroma);
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchBenefit && matchAroma && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'rating': return (b.avg_rating ?? 0) - (a.avg_rating ?? 0);
      case 'newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default: return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    }
  });

  const totalPages = Math.ceil(sorted.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sorted.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => { setCurrentPage(1); }, [selectedCategory, selectedBenefit, selectedAroma, searchQuery, sortBy]);

  const activeFilterCount = [selectedBenefit, selectedAroma].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedBenefit(null);
    setSelectedAroma(null);
    setSelectedCategory(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-32 selection:bg-primary selection:text-black">
      <SEO
        title={`${currentShop?.name || 'Green IA'} — Catalogue Moléculaire`}
        description="Explorez notre sélection premium de fleurs, résines et huiles de CBD. Qualité laboratoire, service élite."
      />

      {/* ────────── Elegant Hero Section ────────── */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        {/* Ambient Visual Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-zinc-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />

          {/* Dynamic Glows */}
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20 animate-pulse-slow"
            style={{ background: 'emerald' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10"
            style={{ background: 'emerald' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 md:p-24 shadow-2xl overflow-hidden">
            <div className="absolute -inset-10 bg-gradient-to-br from-white/5 to-transparent opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-8 space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Inventory Status: Verified Premium</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="space-y-8"
                >
                  <h1 className="text-display">
                    <span className="text-white">Exploration</span>
                    <span className="text-primary font-light not-italic">
                      SÉLECTIVE.
                    </span>
                  </h1>
                  <p className="text-premium-body border-l-2 border-white/5 pl-8 max-w-2xl">
                    Une curation rigoureuse des meilleures génétiques européennes, <br className="hidden md:block" />
                    forge technologique pour une pureté absolue.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-16 pt-6"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-5xl font-black text-white italic tracking-tighter">{products.length}+</span>
                    <span className="text-label text-zinc-600">Références</span>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="flex flex-col gap-2">
                    <span className="text-5xl font-black text-white italic tracking-tighter">100%</span>
                    <span className="text-label text-zinc-600">Authenticité</span>
                  </div>
                </motion.div>
              </div>

              <div className="hidden lg:block lg:col-span-4 perspective-1000">
                <motion.div
                  initial={{ opacity: 0, rotateY: 15, scale: 0.95 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] group/hero-img"
                >
                  <img
                    src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800"
                    className="w-full h-full object-cover grayscale-[20%] group-hover/hero-img:grayscale-0 group-hover/hero-img:scale-110 transition-all duration-1000"
                    alt="Premium Product"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10 p-8 backdrop-blur-3xl bg-black/40 border border-white/5 rounded-[2rem] translate-y-4 group-hover/hero-img:translate-y-0 transition-transform duration-700">
                    <p className="text-label text-primary mb-2">Focus du Mois</p>
                    <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tight italic">Deep Emerald Kush</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Main Navigation & Filters ────────── */}
      <section className="relative z-30 -mt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Main Control Bar (Floating Capsule) */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-10 flex flex-col md:flex-row items-stretch md:items-center gap-4 p-3 bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-50"
          >
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une molécule, un arôme..."
                className="w-full bg-transparent border-none pl-16 pr-8 py-6 text-sm font-medium focus:outline-none placeholder:text-zinc-700 italic"
              />
            </div>

            <div className="w-px h-10 bg-white/5 hidden md:block" />

            {/* Category Launcher */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-3 py-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all italic ${!selectedCategory ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                Collection Complète
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={`whitespace-nowrap px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all italic ${selectedCategory === cat.id ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="w-px h-10 bg-white/5 hidden md:block" />

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pr-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-3 px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all italic ${showFilters || activeFilterCount > 0 ? 'bg-white text-black' : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Paramètres {activeFilterCount > 0 && `(${activeFilterCount})`}
              </motion.button>

              <div className="relative hidden lg:block group/select">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white/5 border border-white/5 rounded-[1.5rem] pl-8 pr-12 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 focus:outline-none hover:bg-white/10 transition-all cursor-pointer italic group-hover/select:text-white"
                >
                  <option value="featured">Populaires</option>
                  <option value="price_asc">Prix ↑</option>
                  <option value="price_desc">Prix ↓</option>
                  <option value="rating">Notes</option>
                </select>
                <ArrowUpDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Active Filter Chips */}
          <AnimatePresence>
            {(selectedBenefit || selectedAroma || searchQuery) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap items-center gap-3 px-6"
              >
                {searchQuery && <FilterChip label={`"${searchQuery}"`} onRemove={() => setSearchQuery('')} icon={<Search className="w-3 h-3" />} />}
                {selectedBenefit && <FilterChip label={selectedBenefit} onRemove={() => setSelectedBenefit(null)} icon={<Filter className="w-3 h-3" />} />}
                {selectedAroma && <FilterChip label={selectedAroma} onRemove={() => setSelectedAroma(null)} icon={<Sparkles className="w-3 h-3" />} />}
                <button onClick={resetFilters} className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-400 transition-colors">Tout Effacer</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detailed Filters Modal/Tray */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-zinc-900/60 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-12 overflow-hidden relative shadow-3xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -mr-32 -mt-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10">

                  {/* Benefits */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Bénéfices Moléculaires</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {allBenefits.map(b => (
                        <button
                          key={b}
                          onClick={() => setSelectedBenefit(selectedBenefit === b ? null : b)}
                          className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border italic ${selectedBenefit === b ? 'bg-emerald-500 border-transparent text-black' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-white/20'}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aromas */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-white" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Spectre Aromatique</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {allAromas.map(a => (
                        <button
                          key={a}
                          onClick={() => setSelectedAroma(selectedAroma === a ? null : a)}
                          className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border italic ${selectedAroma === a ? 'bg-white border-transparent text-black' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-white/20'}`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Information Panel */}
                  <div className="bg-black/40 rounded-[2.5rem] p-10 border border-white/5 flex flex-col justify-between shadow-inner">
                    <div className="space-y-6">
                      <h4 className="text-lg font-black italic text-emerald-500 uppercase tracking-tighter">Note de l'Exploitant</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed italic font-medium">Chaque échantillon est codifié pour une traçabilité totale. Explorez les analyses de laboratoire pour chaque lot certifié.</p>
                    </div>
                    <button onClick={resetFilters} className="mt-10 flex items-center justify-between text-zinc-600 hover:text-white group transition-colors">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Réinitialiser les Params</span>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                        <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      </div>
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
                {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'La Réserve'}
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">{filtered.length} Échantillons de Haute Qualité</p>
              </div>
            </div>
            <div className="hidden sm:flex gap-4">
              <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
                <button className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-lg"><LayoutGrid className="w-4 h-4" /></button>
                <button className="w-10 h-10 rounded-xl text-zinc-500 hover:text-white flex items-center justify-center hover:bg-white/5 transition-all"><SlidersHorizontal className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="px-2">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-16">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 bg-white/[0.02] border border-dashed border-white/10 rounded-[4rem] px-8"
              >
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-xl animate-pulse" />
                  <Search className="w-10 h-10 text-zinc-700 relative z-10" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Aucune Molécule Détectée</h3>
                <p className="text-zinc-500 max-w-sm mx-auto text-lg italic font-medium leading-relaxed">Nous n'avons trouvé aucun échantillon correspondant à vos paramètres actuels.</p>
                <button onClick={resetFilters} className="mt-12 px-12 py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-[2rem] hover:bg-emerald-500 transition-all shadow-2xl italic">Réinitialiser l'Exploration</button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-16">
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (idx % 4) * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                      layout
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-20">
              <div className="flex items-center gap-3 p-2 bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem]">
                <button
                  onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className="w-14 h-14 rounded-[1.5rem] flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                      className={`w-14 h-14 rounded-[1.5rem] text-[10px] font-black uppercase transition-all ${page === currentPage ? 'bg-primary text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  className="w-14 h-14 rounded-[1.5rem] flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ────────── Luxurious AI / Concierge Section ────────── */}
      <section className="py-60 relative px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-32 group"
          >
            <div className="relative aspect-square w-full max-w-lg">
              {/* Animated rings */}
              <div className="absolute inset-0 border border-emerald-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-10 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-40 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />

              <div className="absolute inset-x-0 bottom-0 bg-zinc-950/80 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] translate-y-16 rotate-2 group-hover:rotate-0 transition-transform duration-1000">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-[2rem] bg-emerald-500 flex items-center justify-center text-black shadow-2xl shadow-emerald-500/40">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-[0.4em] text-white italic">{content.catalog.section_ai_badge}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic mt-1">Analyse Moléculaire Temps-Réel</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-emerald-500/60">
                      <span>Pureté</span>
                      <span>99.9%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-emerald-500" initial={{ width: 0 }} whileInView={{ width: '99.9%' }} transition={{ duration: 2.5, ease: "easeOut" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-zinc-600">
                      <span>Complexité Terpénique</span>
                      <span>85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-emerald-500/30" initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 2, delay: 0.5, ease: "easeOut" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-12 text-center lg:text-left">
              <div className="space-y-8">
                <div className="space-y-8">
                  <h2 className="text-section">
                    {content.catalog.section_ai_title_line1} <br />
                    <span className="text-primary font-light not-italic">{content.catalog.section_ai_title_line2}</span>
                  </h2>
                  <p className="text-premium-body max-w-2xl mx-auto lg:mx-0 border-l-2 border-white/5 pl-10">
                    {content.catalog.section_ai_subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const btn = document.querySelector('[aria-label="Toggle BudTender"]') as HTMLButtonElement;
                    if (btn) btn.click();
                  }}
                  className="px-16 py-8 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-[2.5rem] shadow-[0_30px_60px_rgba(255,255,255,0.1)] transition-all hover:bg-emerald-500 italic relative overflow-hidden group/ai-btn"
                >
                  <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover/ai-btn:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10">{content.catalog.section_ai_cta}</span>
                </motion.button>
                <Link
                  to={sp('/boutique')}
                  className="px-16 py-8 bg-white/5 border border-white/10 text-white text-label rounded-[2.5rem] hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                >
                  Standards Laboratoire <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────── Trust Parameters ────────── */}
      <section className="py-60 bg-zinc-950 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/10 via-transparent to-transparent hidden lg:block" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {[
            { icon: <ShieldCheck className="w-8 h-8" />, title: "Génétique Certifiée", desc: "Souches inscrites au catalogue européen, garantissant conformité et stabilité pharmacologique." },
            { icon: <Zap className="w-8 h-8" />, title: "Pureté Moléculaire", desc: "Extractions CO2 supercritique garantissant l'absence totale de solvants ou résidus lourds." },
            { icon: <CalendarCheck className="w-8 h-8" />, title: "Logistique Élite", desc: "Expédition protégée sous 24h avec suivi temps réel et emballage neutre ultra-discret." },
            { icon: <Info className="w-8 h-8" />, title: "Savoir-Faire Maître", desc: "Une expertise artisanale alliée aux standards industriels les plus exigeants du marché." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 rounded-[4rem] bg-zinc-900/20 border border-white/5 space-y-8 hover:border-emerald-500/20 transition-all duration-700 group backdrop-blur-xl shadow-2xl"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:scale-110 group-hover:text-emerald-500 transition-all duration-500">
                {item.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white italic">{item.title}</h4>
                <p className="text-[12px] text-zinc-600 leading-relaxed font-medium group-hover:text-zinc-400 transition-colors italic">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-48 text-center space-y-12">
          <div className="flex items-center justify-center gap-8 text-label">
            <div className="h-[1px] w-20 bg-zinc-900" />
            Protocole de Sécurité & Légalité
            <div className="h-[1px] w-20 bg-zinc-900" />
          </div>
          <p className="text-[10px] text-zinc-700 leading-relaxed uppercase tracking-[0.2em] px-12 italic font-medium max-w-4xl mx-auto">
            La vente est strictement interdite aux mineurs de moins de 18 ans. Les produits présentés ne sont pas des médicaments et ne peuvent se substituer à un traitement médical. Déconseillé aux femmes enceintes ou allaitantes. Green IA s'engage pour une consommation responsable et informée par la science.
          </p>
        </div>
      </section>

    </div>
  );
}


// ─── Sub-components ─────────────────────────────────────────────────────────

function FilterChip({ label, onRemove, icon }: { label: string; onRemove: () => void; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-400 group transition-all hover:border-emerald-500/30 backdrop-blur-md"
    >
      <span className="text-emerald-500/60 group-hover:text-emerald-500 transition-colors">{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-widest italic">{label}</span>
      <button onClick={onRemove} className="ml-1 w-5 h-5 rounded-full flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/10 transition-all">
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse space-y-10 group/skeleton">
      <div className="aspect-[4/5] bg-white/[0.02] border border-white/[0.05] rounded-[3.5rem] relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent" />
      </div>
      <div className="space-y-6 px-4">
        <div className="flex gap-2">
          <div className="h-2 bg-white/[0.05] rounded-full w-1/4" />
          <div className="h-2 bg-white/[0.05] rounded-full w-1/6" />
        </div>
        <div className="space-y-3">
          <div className="h-8 bg-white/[0.05] rounded-2xl w-full" />
          <div className="h-8 bg-white/[0.05] rounded-2xl w-2/3" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="h-10 bg-white/[0.05] rounded-2xl w-1/3" />
          <div className="h-12 w-12 bg-white/[0.05] rounded-full" />
        </div>
      </div>
    </div>
  );
}
