import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, SlidersHorizontal, X, Sparkles, Filter, LayoutGrid,
  CalendarCheck, Info, ShieldCheck, ArrowUpDown, ChevronLeft,
  ChevronRight, MousePointer2, Tag, Trash2, Zap
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
      <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden">
        {/* Ambient Visual Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--color-primary-rgb),0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] opacity-10 animate-pulse"
            style={{ background: `radial-gradient(circle, var(--color-primary) 0%, transparent 70%)` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8 space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Inventory Status: Verified</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.8] uppercase flex flex-col">
                  <span className="text-white">Exploration</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary animate-gradient-x italic font-light">
                    SÉLECTIVE.
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-500 max-w-xl font-light leading-relaxed">
                  Une curation rigoureuse des meilleures génétiques européennes, testées en laboratoire pour une pureté absolue.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-12 pt-4"
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">{products.length}+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Références</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Organique</span>
                </div>
              </motion.div>
            </div>

            <div className="hidden lg:block lg:col-span-4 perspective-1000">
              <motion.div
                initial={{ opacity: 0, rotateY: 20, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
              >
                <img
                  src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800"
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                  alt="Premium Product"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 right-10 p-6 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-3xl">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2">Focus du Mois</p>
                  <p className="text-xl font-serif font-bold text-white uppercase tracking-tight italic">Deep Emerald Kush</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Main Navigation & Filters ────────── */}
      <section className="relative z-30 -mt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Main Control Bar (Floating Capsule) */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-10 flex flex-col md:flex-row items-stretch md:items-center gap-2 p-2 bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl z-50"
          >
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une molécule, un arôme..."
                className="w-full bg-transparent border-none pl-14 pr-6 py-5 text-sm font-medium focus:outline-none placeholder:text-zinc-600"
              />
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block" />

            {/* Category Launcher */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all ${!selectedCategory ? 'bg-primary text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                Tout voir
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={`whitespace-nowrap px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all ${selectedCategory === cat.id ? 'bg-primary text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block" />

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pr-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all ${showFilters || activeFilterCount > 0 ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filtres {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              <div className="relative hidden lg:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white/5 border border-white/5 rounded-full pl-6 pr-10 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 focus:outline-none hover:bg-white/10 transition-all cursor-pointer"
                >
                  <option value="featured">Populaires</option>
                  <option value="price_asc">Prix ↑</option>
                  <option value="price_desc">Prix ↓</option>
                  <option value="rating">Notes</option>
                </select>
                <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600 pointer-events-none" />
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
                className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10">

                  {/* Benefits */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Bénéfices recherchés</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {allBenefits.map(b => (
                        <button
                          key={b}
                          onClick={() => setSelectedBenefit(selectedBenefit === b ? null : b)}
                          className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedBenefit === b ? 'bg-primary border-transparent text-black' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-white/20'}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aromas */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Notes Aromatiques</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {allAromas.map(a => (
                        <button
                          key={a}
                          onClick={() => setSelectedAroma(selectedAroma === a ? null : a)}
                          className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedAroma === a ? 'bg-white border-transparent text-black' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:border-white/20'}`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Information Panel */}
                  <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="text-sm font-serif italic text-primary">Le saviez-vous ?</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">Chaque échantillon est codifié pour une traçabilité totale du producteur jusqu'à votre session. Explorez les notes de labo pour chaque lot.</p>
                    </div>
                    <button onClick={resetFilters} className="mt-8 flex items-center justify-between text-zinc-500 hover:text-white group transition-colors">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Reset All Parameters</span>
                      <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Header */}
          <div className="flex items-end justify-between px-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-serif font-black tracking-tighter uppercase">{selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'Le Dépôt'}</h2>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">{filtered.length} Échantillons Validés</p>
            </div>
            <div className="hidden sm:flex gap-4">
              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"><LayoutGrid className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="px-2">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 bg-white/[0.02] border border-dashed border-white/10 rounded-[4rem]"
              >
                <Search className="w-12 h-12 text-zinc-800 mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">Aucun résultat</h3>
                <p className="text-zinc-600 max-w-xs mx-auto text-sm mt-4 leading-relaxed">Ajustez vos filtres ou explorez une autre catégorie pour découvrir nos pépites.</p>
                <button onClick={resetFilters} className="mt-8 px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-primary transition-all">Retourner au Dépôt</button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
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
      <section className="py-40 relative px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-24 group"
          >
            <div className="relative aspect-square w-full max-w-md">
              {/* Animated rings */}
              <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-5 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-20 bg-primary/10 rounded-full blur-[60px]" />

              <div className="absolute inset-x-0 bottom-0 bg-zinc-950 p-10 rounded-[3rem] border border-white/5 shadow-2xl translate-y-12 rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-black">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-[0.2em]">{content.catalog.section_ai_badge}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">Analyse Moléculaire en Direct</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary" initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 2 }} />
                  </div>
                  <div className="h-2 w-3/4 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary/40" initial={{ width: 0 }} whileInView={{ width: '60%' }} transition={{ duration: 1.5, delay: 0.5 }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-[5.5rem] font-serif font-black leading-[0.9] text-white uppercase tracking-tighter">
                  {content.catalog.section_ai_title_line1} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-gradient-x italic">{content.catalog.section_ai_title_line2}</span>
                </h2>
                <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {content.catalog.section_ai_subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button
                  onClick={() => {
                    const btn = document.querySelector('[aria-label="Toggle BudTender"]') as HTMLButtonElement;
                    if (btn) btn.click();
                  }}
                  className="px-12 py-7 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-all shadow-2xl shadow-primary/20"
                >
                  {content.catalog.section_ai_cta}
                </button>
                <Link
                  to={sp('/boutique')}
                  className="px-12 py-7 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-white/10 transition-all font-serif italic"
                >
                  Expertise & Standards
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────── Trust Parameters ────────── */}
      <section className="py-40 bg-zinc-900/20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/10 via-transparent to-transparent hidden lg:block" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {[
            { icon: <ShieldCheck className="w-6 h-6" />, title: "Génétique Certifiée", desc: "Souches inscrites au catalogue européen, garantissant conformité et stabilité." },
            { icon: <Zap className="w-6 h-6" />, title: "Pureté Moléculaire", desc: "Extractions CO2 supercritique garantissant l'absence de solvants résiduels." },
            { icon: <CalendarCheck className="w-6 h-6" />, title: "Logistique Élite", desc: "Expédition protégée sous 24h avec suivi temps réel et emballage neutre." },
            { icon: <Info className="w-6 h-6" />, title: "Usage Master", desc: "Produits destinés aux collectionneurs et à l'aromathérapie sensorielle." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-[3rem] bg-zinc-950/50 border border-white/5 space-y-6 hover:border-primary/20 transition-all group backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:scale-110 group-hover:text-primary transition-all shadow-lg">
                {item.icon}
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">{item.title}</h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium group-hover:text-zinc-400 transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-32 text-center space-y-8">
          <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">
            <div className="h-px w-12 bg-zinc-800" />
            Avertissement Légal & Sécurité
            <div className="h-px w-12 bg-zinc-800" />
          </div>
          <p className="text-[10px] text-zinc-600 leading-relaxed uppercase tracking-widest px-12 italic">
            La vente est strictement interdite aux mineurs de moins de 18 ans. Les produits présentés ne sont pas des médicaments et ne peuvent se substituer à un traitement médical. Déconseillé aux femmes enceintes ou allaitantes. Green IA s'engage pour une consommation responsable et informée.
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
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-zinc-300 group transition-all hover:border-white/20"
    >
      <span className="text-zinc-500">{icon}</span>
      <span className="text-[10px] font-bold">{label}</span>
      <button onClick={onRemove} className="text-zinc-600 hover:text-white transition-colors">
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="aspect-[4/5] bg-white/[0.02] border border-white/[0.05] rounded-[2rem]" />
      <div className="space-y-3 px-2">
        <div className="h-2 bg-white/[0.05] rounded-full w-1/3" />
        <div className="h-6 bg-white/[0.05] rounded-xl w-3/4" />
        <div className="h-10 bg-white/[0.05] rounded-xl w-1/2" />
      </div>
    </div>
  );
}
