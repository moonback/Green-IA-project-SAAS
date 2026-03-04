import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, ShoppingBag, Star, Sparkles, Package } from 'lucide-react';
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
                    <section key={section.id} className="relative min-h-[60vh] flex items-center justify-center pt-24 px-4 overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            {(section.settings?.image_url || currentShop?.settings?.theme?.hero_image_url) && (
                                <img
                                    src={section.settings?.image_url || currentShop.settings.theme.hero_image_url}
                                    className="w-full h-full object-cover opacity-30"
                                    alt=""
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950" />
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-15"
                                style={{ background: primaryColor }}
                            />
                        </div>

                        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-6"
                            >
                                {currentShop?.logo_url && (
                                    <img
                                        src={currentShop.logo_url}
                                        alt={currentShop.name}
                                        className="w-20 h-20 rounded-2xl mx-auto shadow-2xl border border-white/10"
                                    />
                                )}

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-black uppercase tracking-[0.3em]" style={{ color: primaryColor }}>
                                    <Leaf className="w-4 h-4" />
                                    {section.settings?.badge || content.home.badge}
                                </div>

                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter leading-none">
                                    {section.settings?.title || currentShop?.name.toUpperCase()}
                                </h1>

                                <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                                    {section.settings?.subtitle || content.home.hero_subtitle}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Link
                                        to={shopPath('/catalogue')}
                                        className="inline-flex items-center gap-3 px-10 py-5 font-black rounded-2xl text-black transition-transform hover:scale-105 shadow-xl"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        {content.home.cta_primary}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        to={shopPath('/boutique')}
                                        className="inline-flex items-center gap-3 px-10 py-5 font-bold rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                                    >
                                        {content.home.cta_secondary}
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                );

            case 'categories':
                return categories.length > 0 && (
                    <section key={section.id} className="py-20">
                        <div className="page-block">
                            <div className="text-center mb-16 space-y-3">
                                <h2 className="text-4xl md:text-5xl font-serif font-black">{content.home.section_categories_title.split(' ').slice(0, -1).join(' ')} <span style={{ color: primaryColor }}>{content.home.section_categories_title.split(' ').slice(-1)}</span></h2>
                                <p className="text-zinc-500 text-lg">{content.home.section_categories_subtitle}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((cat, i) => (
                                    <motion.div
                                        key={cat.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            to={shopPath(`/catalogue?cat=${cat.slug}`)}
                                            className="group block relative h-48 rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                                        >
                                            {cat.image_url && (
                                                <img
                                                    src={cat.image_url}
                                                    alt={cat.name}
                                                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-8">
                                                <h3 className="text-2xl font-black text-white">{cat.name}</h3>
                                                {cat.description && (
                                                    <p className="text-sm text-zinc-400 mt-1 line-clamp-1">{cat.description}</p>
                                                )}
                                            </div>
                                            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight className="w-5 h-5 text-white" />
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
                    <section key={section.id} className="py-20 bg-zinc-900/30">
                        <div className="page-block">
                            <div className="flex items-center justify-between mb-12">
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-serif font-black text-white">
                                        <Star className="inline w-8 h-8 mr-2" style={{ color: primaryColor }} />
                                        {content.home.section_featured_title}
                                    </h2>
                                    <p className="text-zinc-500">{content.home.section_featured_subtitle}</p>
                                </div>
                                <Link
                                    to={shopPath('/catalogue')}
                                    className="hidden md:flex items-center gap-2 text-sm font-bold hover:underline transition-colors"
                                    style={{ color: primaryColor }}
                                >
                                    Tout voir
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {isLoading ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="bg-zinc-800/20 rounded-3xl h-72 animate-pulse" />
                                    ))}
                                </div>
                            ) : featuredProducts.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {featuredProducts.map((product, i) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                to={shopPath(`/catalogue/${product.slug}`)}
                                                className="group block bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-600 transition-all"
                                            >
                                                <div className="aspect-square bg-zinc-800 overflow-hidden relative">
                                                    {product.image_url ? (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/6588619/pexels-photo-6588619.jpeg?auto=compress&cs=tinysrgb&w=800';
                                                            }}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Package className="w-12 h-12 text-zinc-700" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="p-5">
                                                    <h3 className="font-bold text-white text-sm truncate">{product.name}</h3>
                                                    <div className="flex items-center justify-between mt-2">
                                                        {product.cbd_percentage && (
                                                            <span className="text-xs text-zinc-500 font-bold">CBD {product.cbd_percentage}%</span>
                                                        )}
                                                        <span className="text-lg font-black" style={{ color: primaryColor }}>
                                                            {product.price.toFixed(2)} €
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
                                    <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                                    <p className="text-sm font-bold uppercase tracking-widest">Catalogue en préparation</p>
                                    <p className="text-xs text-zinc-700 mt-1">Les produits arrivent bientôt !</p>
                                </div>
                            )}

                            <div className="mt-8 text-center md:hidden">
                                <Link
                                    to={shopPath('/catalogue')}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-sm"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Voir tout le catalogue
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                );

            case 'ai_promo':
                return currentShop?.settings?.ai_enabled && (
                    <section key={section.id} className="py-20">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-12 rounded-[3rem] border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[150px] opacity-10" style={{ background: primaryColor }} />
                                <div className="relative z-10 space-y-6">
                                    <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border border-white/10" style={{ backgroundColor: `${primaryColor}15` }}>
                                        <Sparkles className="w-8 h-8" style={{ color: primaryColor }} />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-serif font-black">
                                        {content.home.section_ai_title}
                                    </h3>
                                    <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
                                        {content.home.section_ai_subtitle}
                                    </p>
                                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
                                        {content.home.section_ai_cta}
                                    </p>
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
