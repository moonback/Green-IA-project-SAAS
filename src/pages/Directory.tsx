import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, MapPin, Search, Star, ExternalLink, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shop } from '../lib/types';
import SEO from '../components/SEO';

export default function Directory() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = async () => {
        try {
            const { data, error } = await supabase
                .from('shops')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setShops(data as Shop[]);
        } catch (err) {
            console.error('Erreur de chargement des boutiques:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredShops = shops.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (shop.settings?.store_address || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-brand-950 text-white overflow-hidden pb-32 font-sans selection:bg-green-neon selection:text-black">
            <SEO
                title="Annuaire des Boutiques — Green IA Shop"
                description="Découvrez toutes les boutiques partenaires de notre réseau Green IA. Trouvez le magasin CBD le plus proche de chez vous."
            />

            {/* ─── Hero Header ─── */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/directory-hero-bg.png"
                        onError={(e) => { e.currentTarget.src = "/images/hero-bg.png"; }}
                        alt="Ecosystème Green IA"
                        className="w-full h-full object-cover opacity-60 scale-105 grayscale-[0.5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-950/95 via-brand-950/70 to-brand-950" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-950/90" />
                </div>

                <div className="content-wrap relative z-10 w-full pt-28 pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl mx-auto text-center flex flex-col items-center px-4"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md mb-8 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.24em] text-zinc-400"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-neon animate-pulse" />
                            Réseau Global Green IA
                        </motion.span>

                        <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-[1.1] mb-6">
                            L'Annuaire des <span className="text-green-neon italic font-light drop-shadow-[0_0_15px_rgba(76,255,0,0.3)]">boutiques.</span>
                        </h1>

                        <p className="max-w-xl text-base md:text-lg text-zinc-400 font-normal leading-relaxed mb-12">
                            Explorez l'écosystème Green IA et découvrez nos partenaires certifiés à travers toute l'Europe.
                        </p>

                        <div className="relative w-full max-w-lg mx-auto">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-zinc-100" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher une boutique, une ville..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-3.5 bg-black/40 border border-white/10 rounded-full focus:border-green-neon/50 focus:ring-1 focus:ring-green-neon/50 text-white placeholder:text-zinc-500 outline-none backdrop-blur-xl transition-all shadow-2xl text-sm"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Directory Grid ─── */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto relative z-10 -mt-10">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center py-24"
                        >
                            <div className="w-8 h-8 border-2 border-green-neon border-t-transparent rounded-full animate-spin" />
                        </motion.div>
                    ) : filteredShops.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20 bg-zinc-900/40 rounded-[2rem] border border-white/5 backdrop-blur-lg mx-auto max-w-2xl"
                        >
                            <Store className="w-12 h-12 text-zinc-600 mx-auto mb-4" strokeWidth={1.5} />
                            <h3 className="text-xl font-bold text-white mb-2">Aucune boutique trouvée</h3>
                            <p className="text-zinc-400 text-sm">Modifiez vos critères de recherche pour découvrir plus de partenaires.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            {filteredShops.map((shop, index) => (
                                <motion.div
                                    key={shop.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                >
                                    <Link
                                        to={`/${shop.slug}`}
                                        className="block h-full bg-zinc-900/30 border border-white/5 hover:border-white/10 rounded-2xl p-5 hover:bg-zinc-800/40 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4 mb-5">
                                            <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center p-2.5 shrink-0 shadow-xl group-hover:scale-105 transition-transform">
                                                {shop.logo_url ? (
                                                    <img src={shop.logo_url} alt={shop.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <Store className="w-5 h-5 text-zinc-600" strokeWidth={1.5} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-bold text-base truncate group-hover:text-green-neon transition-colors">
                                                    {shop.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex items-center gap-1 bg-green-neon/10 px-1.5 py-0.5 rounded text-[9px] font-bold text-green-neon uppercase tracking-widest">
                                                        <Star className="w-2.5 h-2.5 fill-current" /> 4.9
                                                    </div>
                                                    <span className="text-[10px] text-zinc-500 font-medium">Partenaire</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {shop.settings?.store_address && (
                                                <div className="flex items-start gap-2 text-zinc-400">
                                                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-500 group-hover:text-green-neon transition-colors" />
                                                    <span className="text-xs line-clamp-2 leading-relaxed font-normal">
                                                        {shop.settings.store_address}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
                                            <span className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" /> Sync
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Activity className="w-3 h-3 text-zinc-400" />
                                                IA Active
                                            </span>
                                            <div className="ml-auto flex items-center gap-1 text-white group-hover:text-green-neon transition-colors">
                                                Visiter <ExternalLink className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
