import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Sparkles, Package, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { useCartStore } from '../store/cartStore';
import { useShopStore } from '../store/shopStore';
import { useShopPath } from '../hooks/useShopPath';

interface RelatedProductsProps {
    productId: string;
    categoryId?: string;
    title?: string;
}

export default function RelatedProducts({
    productId,
    categoryId,
    title = 'Vous aimerez aussi',
}: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const addItem = useCartStore((s) => s.addItem);
    const openSidebar = useCartStore((s) => s.openSidebar);
    const { currentShop } = useShopStore();
    const sp = useShopPath();

    useEffect(() => {
        if (!productId) return;
        setLoading(true);
        fetchRecommendations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const fetchRecommendations = async () => {
        // 1. Try the RPC (requires migration to be applied)
        const { data: rpcData, error: rpcError } = await supabase.rpc(
            'get_product_recommendations',
            { p_product_id: productId, p_limit: 4 }
        );

        if (!rpcError && rpcData && rpcData.length > 0) {
            // Further filter RPC data by shop_id if needed (though RPC should ideally handle it)
            const filteredRpc = currentShop
                ? rpcData.filter((p: any) => p.shop_id === currentShop.id)
                : rpcData;
            setProducts(filteredRpc as Product[]);
            setLoading(false);
            return;
        }

        // 2. Fallback: same category, direct query (works before migration)
        // First get the current product's category_id if not provided
        let catId = categoryId;
        if (!catId) {
            const { data: prod } = await supabase
                .from('products')
                .select('category_id')
                .eq('id', productId)
                .single();
            catId = prod?.category_id;
        }

        if (!catId) {
            setLoading(false);
            return;
        }

        const query = supabase
            .from('products')
            .select('*')
            .eq('category_id', catId)
            .eq('is_active', true)
            .eq('is_available', true)
            .neq('id', productId)
            .order('is_featured', { ascending: false })
            .limit(4);

        if (currentShop) {
            query.eq('shop_id', currentShop.id);
        }

        const { data: fallback } = await query;

        setProducts((fallback ?? []) as Product[]);
        setLoading(false);
    };

    const handleAdd = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        addItem(product);
        openSidebar();
    };

    // Skeleton while loading
    if (loading) {
        return (
            <section className="mt-20">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 animate-pulse" />
                    <div className="h-7 w-40 bg-zinc-800 rounded-lg animate-pulse" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="bg-zinc-900/50 rounded-2xl border border-white/[0.06] overflow-hidden animate-pulse">
                            <div className="aspect-[4/5] bg-zinc-800/50" />
                            <div className="p-3 space-y-2">
                                <div className="h-4 bg-zinc-800 rounded-md w-3/4" />
                                <div className="h-3 bg-zinc-800 rounded-md w-1/2" />
                                <div className="h-8 bg-zinc-800 rounded-xl mt-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="mt-40">
            {/* Elegant Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 px-2">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Curations Supplémentaires</h2>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif font-black tracking-tighter uppercase text-white">{title}</h3>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent hidden sm:block mb-4 mx-8" />
                <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <Package className="w-3.5 h-3.5" /> Sélection Élite
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {products.map((product, i) => {
                    const savings =
                        product.is_bundle && product.original_value && product.original_value > product.price
                            ? product.original_value - product.price
                            : null;

                    return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            className="group relative bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/[0.08] overflow-hidden hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-700 flex flex-col shadow-2xl shadow-black/40"
                        >
                            {/* Badges Overlay */}
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                {product.is_bundle && (
                                    <span className="flex items-center gap-2 bg-purple-600/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                                        <Package className="w-3 h-3" /> Pack
                                    </span>
                                )}
                                {product.is_featured && (
                                    <span className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-black shadow-lg">
                                        <Star className="w-3 h-3" /> Top
                                    </span>
                                )}
                            </div>

                            {/* Premium Image Container */}
                            <Link to={sp(`/catalogue/${product.slug}`)} className="block aspect-[4/5] overflow-hidden bg-zinc-950 relative">
                                <img
                                    src={product.image_url ?? 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400'}
                                    alt={product.name}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/6588619/pexels-photo-6588619.jpeg?auto=compress&cs=tinysrgb&w=400';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                            </Link>

                            {/* Refined Content */}
                            <div className="p-6 flex flex-col flex-1 space-y-4">
                                <div className="space-y-1">
                                    <Link
                                        to={sp(`/catalogue/${product.slug}`)}
                                        className="text-xs font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-1 block"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className="flex items-center justify-between">
                                        {product.cbd_percentage != null ? (
                                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{product.cbd_percentage}% CBD</span>
                                        ) : (
                                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{product.category?.name || 'Molécule'}</span>
                                        )}
                                        {product.is_available && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        )}
                                    </div>
                                </div>

                                {/* Minimal Price + CTA */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <div className="space-y-0.5">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-black text-white tracking-tighter">
                                                {Number(product.price).toFixed(2)}
                                            </span>
                                            <span className="text-xs font-bold text-zinc-500">€</span>
                                        </div>
                                        {savings && (
                                            <span className="block text-[8px] font-black uppercase tracking-widest text-purple-400">
                                                Economie {savings.toFixed(2)}€
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => handleAdd(e, product)}
                                        disabled={!product.is_available || product.stock_quantity === 0}
                                        aria-label={`Ajouter ${product.name} au panier`}
                                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-black hover:bg-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-90 shadow-xl shadow-black/20"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
