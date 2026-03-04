import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, ShoppingBag, Star, Sparkles, Package, ChevronRight } from 'lucide-react';
import { useShopStore } from '../store/shopStore';
import { useShopPath } from '../hooks/useShopPath';
import { useShopContent } from '../hooks/useShopContent';
import { useShopLayout } from '../hooks/useShopLayout';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import type { Product, Category } from '../lib/types';
import {
    NewsletterSection,
    TestimonialsSection,
    FAQSection,
    FeaturesGridSection,
    InstagramFeedSection
} from '../components/shop/GenericSections';

export default function ShopHome() {
    const { currentShop } = useShopStore();
    const shopPath = useShopPath();
    const content = useShopContent();
    const { homeSections } = useShopLayout();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const primaryColor = currentShop?.settings?.primary_color || '#39ff14';

    const renderSection = (section: any) => {
        if (!section.enabled) return null;

        switch (section.type) {
            case 'hero':
                return (
                    <section key={section.id} className="relative min-h-[90vh] flex items-center justify-center pt-24 px-4 overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            {(section.settings?.image_url || currentShop?.settings?.theme?.hero_image_url) && (
                                <img
                                    src={section.settings?.image_url || currentShop.settings.theme.hero_image_url}
                                    className="w-full h-full object-cover opacity-20 scale-105 blur-sm"
                                    alt=""
                                />
                            )}
                            <div className="absolute inset-0 bg-zinc-950" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />

                            {/* Dynamic Glows */}
                            <div
                                className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20 animate-pulse-slow"
                                style={{ background: primaryColor }}
                            />
                            <div
                                className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10"
                                style={{ background: primaryColor }}
                            />
                        </div>

                        <div className="relative z-10 max-w-7xl mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 md:p-20 text-center space-y-12 shadow-2xl overflow-hidden"
                            >
                                <div className="absolute -inset-10 bg-gradient-to-br from-white/5 to-transparent opacity-50" />

                                <div className="relative space-y-8">
                                    <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl text-label mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                                        <span className="text-zinc-400">{section.settings?.badge || content.home.badge}</span>
                                    </div>

                                    <h1 className="text-display">
                                        <span className="block text-white mb-2">{section.settings?.title?.split(' ')[0] || currentShop?.name.toUpperCase().split(' ')[0]}</span>
                                        <span className="block font-light not-italic" style={{ color: primaryColor }}>{section.settings?.title?.split(' ').slice(1).join(' ') || currentShop?.name.toUpperCase().split(' ').slice(1).join(' ')}</span>
                                    </h1>

                                    <p className="text-premium-body max-w-3xl mx-auto border-l-2 border-white/5 pl-8">
                                        {section.settings?.subtitle || content.home.hero_subtitle}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                to={shopPath('/catalogue')}
                                                className="inline-flex items-center gap-4 px-12 py-6 font-black rounded-[2rem] text-black transition-all shadow-2xl relative overflow-hidden group/btn"
                                                style={{ backgroundColor: primaryColor }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                                <ShoppingBag className="w-5 h-5 relative z-10" />
                                                <span className="relative z-10 uppercase tracking-widest italic">{content.home.cta_primary}</span>
                                                <ArrowRight className="w-5 h-5 relative z-10" />
                                            </Link>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                to={shopPath('/boutique')}
                                                className="inline-flex items-center gap-4 px-12 py-6 font-black rounded-[2rem] bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-xl uppercase tracking-widest italic"
                                            >
                                                {content.home.cta_secondary}
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                );

            case 'categories':
                return categories.length > 0 && (
                    <section key={section.id} className="py-40 relative">
                        <div className="page-block relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-white/5 pb-10">
                                <div className="space-y-6">
                                    <h2 className="text-label text-zinc-600">Parcourir la Collection</h2>
                                    <p className="text-display scale-50 origin-left">
                                        {content.home.section_categories_title.split(' ').slice(0, -1).join(' ')} <span className="font-light not-italic" style={{ color: primaryColor }}>{content.home.section_categories_title.split(' ').slice(-1)}</span>
                                    </p>
                                </div>
                                <p className="text-premium-body max-w-sm">
                                    {content.home.section_categories_subtitle}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {categories.map((cat, i) => (
                                    <motion.div
                                        key={cat.id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            to={shopPath(`/catalogue?cat=${cat.slug}`)}
                                            className="group block relative h-[450px] rounded-[3rem] overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 shadow-2xl"
                                        >
                                            {cat.image_url && (
                                                <img
                                                    src={cat.image_url}
                                                    alt={cat.name}
                                                    className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />

                                            <div className="absolute bottom-0 left-0 right-0 p-10 space-y-4">
                                                <div className="w-12 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-1000" style={{ backgroundColor: primaryColor }} />
                                                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">{cat.name}</h3>
                                                {cat.description && (
                                                    <p className="text-zinc-400 text-sm italic font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
                                                        {cat.description}
                                                    </p>
                                                )}
                                                <div className="pt-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                                    Découvrir <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                );

            case 'featured_products':
                return (
                    <section key={section.id} className="py-40 relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="page-block relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-white/5 pb-10 relative">
                                <div className="absolute -bottom-[1px] left-0 w-32 h-[1px] shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ backgroundColor: primaryColor }} />
                                <div className="space-y-6">
                                    <h2 className="text-label text-zinc-600">Sélection d'Excellence</h2>
                                    <p className="text-display scale-50 origin-left">
                                        {content.home.section_featured_title.split(' ').slice(0, -1).join(' ')} <span className="font-light not-italic" style={{ color: primaryColor }}>{content.home.section_featured_title.split(' ').slice(-1)}</span>
                                    </p>
                                </div>
                                <div className="flex flex-col md:items-end gap-6">
                                    <p className="text-premium-body">{content.home.section_featured_subtitle}</p>
                                    <Link
                                        to={shopPath('/catalogue')}
                                        className="inline-flex items-center gap-4 text-label text-white hover:text-emerald-400 transition-all group"
                                    >
                                        Voir toute la collection
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="bg-zinc-900/40 rounded-[2.5rem] h-[450px] animate-pulse border border-white/5" />
                                    ))}
                                </div>
                            ) : featuredProducts.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {featuredProducts.map((product, i) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                to={shopPath(`/catalogue/${product.slug}`)}
                                                className="group block relative bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-700 shadow-2xl"
                                            >
                                                <div className="aspect-[4/5] bg-zinc-950 overflow-hidden relative">
                                                    {product.image_url ? (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Package className="w-16 h-16 text-zinc-800" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

                                                    {/* Overlays */}
                                                    <div className="absolute top-6 right-6">
                                                        <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-label text-white italic">
                                                            Prestige
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-8 space-y-4">
                                                    <div className="space-y-1">
                                                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase truncate">{product.name}</h3>
                                                        <div className="flex items-center gap-3">
                                                            {product.cbd_percentage && (
                                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">CBD {product.cbd_percentage}%</span>
                                                            )}
                                                            <div className="w-[1px] h-3 bg-white/10" />
                                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/60 transition-colors" style={{ color: `${primaryColor}99` }}>Édition Limitée</span>
                                                        </div>
                                                    </div>

                                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                                        <span className="text-2xl font-black italic tracking-tighter text-white">
                                                            {product.price.toFixed(2)}<span className="text-xs ml-1 opacity-40">€</span>
                                                        </span>
                                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 transition-all duration-500 group-hover:text-black">
                                                            <ArrowRight className="w-5 h-5 translate-x-[-2px] group-hover:translate-x-0 transition-transform" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-40 bg-zinc-900/20 border-2 border-dashed border-white/5 rounded-[4rem] text-zinc-600">
                                    <Sparkles className="w-16 h-16 mb-8 opacity-20" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] italic">Collection en Devenir</p>
                                    <p className="text-xs text-zinc-700 mt-4 italic font-medium">Les créations d'exception arrivent bientôt.</p>
                                </div>
                            )}
                        </div>
                    </section>
                );

            case 'ai_promo':
                return currentShop?.settings?.ai_enabled && (
                    <section key={section.id} className="py-40 relative">
                        <div className="max-w-6xl mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative rounded-[4rem] border border-white/10 bg-zinc-950 p-12 md:p-24 overflow-hidden group/ai shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                            >
                                {/* Futuristic Background */}
                                <div className="absolute inset-0 bg-zinc-900/20 backdrop-blur-3xl" />
                                <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10 animate-pulse-slow" style={{ background: primaryColor }} />
                                <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-10" style={{ background: primaryColor }} />

                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

                                <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                                    <div className="space-y-12 text-center lg:text-left">
                                        <div className="inline-flex items-center gap-4 px-6 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-label" style={{ color: primaryColor, backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}20` }}>
                                            <Sparkles className="w-5 h-5 animate-pulse" />
                                            {currentShop.name} Intelligence
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-section">
                                                {content.home.section_ai_title}
                                            </h3>
                                            <p className="text-premium-body border-l-2 border-white/5 pl-8 max-w-xl mx-auto lg:mx-0">
                                                {content.home.section_ai_subtitle}
                                            </p>
                                        </div>

                                        <div className="pt-8 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest italic rounded-[2rem] shadow-2xl relative overflow-hidden group/btn"
                                            >
                                                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" style={{ backgroundColor: primaryColor }} />
                                                <span className="relative z-10">{content.home.section_ai_cta}</span>
                                            </motion.button>

                                            <div className="flex -space-x-4">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-zinc-950 bg-zinc-900 overflow-hidden">
                                                        <img src={`https://i.pravatar.cc/100?u=${i + currentShop.id}`} alt="" />
                                                    </div>
                                                ))}
                                                <div className="w-12 h-12 rounded-full border-2 border-zinc-950 bg-emerald-500 flex items-center justify-center text-[10px] font-black text-black" style={{ backgroundColor: primaryColor }}>
                                                    +2k
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative group-hover/ai:scale-105 transition-transform duration-1000 hidden lg:block">
                                        <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-tr from-emerald-500/40 via-transparent to-white/20 blur-xl opacity-50" />
                                        <div className="relative bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 space-y-10 shadow-3xl">
                                            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                                <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase ml-auto">BudTender v4.0.2</div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-zinc-800 shrink-0" />
                                                    <div className="bg-zinc-900 border border-white/5 rounded-[1.5rem] rounded-tl-none p-4 text-sm text-zinc-400 italic">
                                                        Je recherche quelque chose pour me détendre en fin de journée, sans effet trop puissant...
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 justify-end">
                                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[1.5rem] rounded-tr-none p-4 text-sm text-white italic" style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}30` }}>
                                                        Je vous suggère la Zen Collection. Son profil terpénique privilégie le Myrcène pour un apaisement profond et naturel.
                                                    </div>
                                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500 shadow-2xl shrink-0 flex items-center justify-center text-black" style={{ backgroundColor: primaryColor }}>
                                                        <Sparkles className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                );

            case 'newsletter':
                return <NewsletterSection key={section.id} primaryColor={primaryColor} settings={section.settings} />;
            case 'testimonials':
                return <TestimonialsSection key={section.id} primaryColor={primaryColor} settings={section.settings} />;
            case 'faq':
                return <FAQSection key={section.id} primaryColor={primaryColor} settings={section.settings} />;
            case 'features_grid':
                return <FeaturesGridSection key={section.id} primaryColor={primaryColor} settings={section.settings} />;
            case 'instagram_feed':
                return <InstagramFeedSection key={section.id} primaryColor={primaryColor} settings={section.settings} />;

            default:
                return null;
        }
    };

    useEffect(() => {
        if (!currentShop) return;

        const load = async () => {
            setIsLoading(true);
            try {
                const [productsRes, catsRes] = await Promise.all([
                    supabase
                        .from('products')
                        .select('*, category:categories(slug, name)')
                        .eq('is_active', true)
                        .eq('is_featured', true)
                        .eq('shop_id', currentShop.id)
                        .limit(8),
                    supabase
                        .from('categories')
                        .select('*')
                        .eq('is_active', true)
                        .eq('shop_id', currentShop.id)
                        .order('sort_order')
                ]);

                if (productsRes.data) setFeaturedProducts(productsRes.data as Product[]);
                if (catsRes.data) setCategories(catsRes.data as Category[]);
            } catch (err) {
                console.error('Error loading shop home:', err);
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, [currentShop]);

    if (!currentShop) return null;

    return (
        <div className="min-h-screen bg-brand-950 text-white pb-20">
            <SEO
                title={`${currentShop.name} — Boutique CBD`}
                description={`Découvrez la sélection premium de ${currentShop.name}. Produits CBD de qualité, conseils IA personnalisés.`}
            />

            {homeSections.map(renderSection)}
        </div>
    );
}
