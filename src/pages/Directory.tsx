import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Store, MapPin, Search, Star, ExternalLink, Globe } from 'lucide-react';
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
        <div className="min-h-screen bg-brand-950 text-white overflow-hidden pb-32">
            <SEO
                title="Annuaire des Boutiques — Green IA Shop"
                description="Découvrez toutes les boutiques partenaires de notre réseau Green IA. Trouvez le magasin CBD le plus proche de chez vous."
            />

            {/* Hero Header */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background Image & Overlays */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero-bg.png"
                        alt="Ecosystème Green IA"
                        className="w-full h-full object-cover opacity-100 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-950/90 via-brand-950/40 to-brand-950" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-950/80" />
                </div>

                <div className="content-wrap relative z-10 w-full pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl mx-auto text-center flex flex-col items-center"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 text-[10px] font-black uppercase tracking-[0.24em] text-zinc-300"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-neon animate-pulse" />
                            Réseau Global Green IA
                        </motion.span>

                        <h1 className="section-title text-4xl sm:text-6xl lg:text-7xl">
                            L'Annuaire des
                            <br />
                            <span className="glow-green italic text-green-neon">boutiques.</span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg sm:text-xl font-light text-zinc-400 leading-relaxed mb-10">
                            Explorez l'écosystème Green IA et découvrez nos partenaires certifiés à travers toute l'Europe.
                        </p>

                        <div className="relative w-full max-w-lg mx-auto">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-zinc-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher une boutique..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 bg-white/[0.02] border border-white/10 rounded-2xl focus:border-green-neon/50 focus:ring-1 focus:ring-green-neon/50 text-white placeholder:text-zinc-600 outline-none backdrop-blur-3xl transition-all shadow-2xl text-base"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Directory Grid */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-green-neon border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredShops.length === 0 ? (
                    <div className="text-center py-24 bg-white/[0.02] rounded-[3rem] border border-white/5 backdrop-blur-3xl">
                        <Store className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                        <h3 className="text-2xl font-serif font-black text-white mb-2 uppercase tracking-tight">Aucune boutique trouvée</h3>
                        <p className="text-zinc-500 font-light translate-y-[-2px]">Essayez de modifier les termes de votre recherche.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredShops.map((shop, index) => (
                            <motion.div
                                key={shop.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/${shop.slug}`}
                                    className="block h-full group relative"
                                >
                                    {/* Hover Glow */}
                                    <div className="absolute inset-x-4 -inset-y-4 bg-green-neon/10 rounded-[4rem] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <div className="relative h-full bg-zinc-900 shadow-2xl border border-white/[0.05] rounded-[2rem] p-6 flex flex-col transition-all duration-700 group-hover:translate-y-[-5px] group-hover:bg-zinc-800/80 group-hover:border-white/20">

                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center p-3 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                                {shop.logo_url ? (
                                                    <img src={shop.logo_url} alt={shop.name} className="max-w-full max-h-full object-contain" />
                                                ) : (
                                                    <Store className="w-8 h-8 text-zinc-800" />
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <div className="flex items-center gap-1.5 bg-green-neon/5 px-2.5 py-1 rounded-full border border-green-neon/20 text-[9px] font-black text-green-neon uppercase tracking-widest group-hover:bg-green-neon group-hover:text-black transition-all">
                                                    <Star className="w-2.5 h-2.5 fill-current" />
                                                    4.9
                                                </div>
                                                <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest leading-none">Certifié</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 flex-1">
                                            <h3 className="text-xl font-serif font-black text-white group-hover:text-green-neon transition-colors leading-tight uppercase tracking-tight">
                                                {shop.name}
                                            </h3>

                                            <div className="space-y-3">
                                                {shop.settings?.store_address && (
                                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-colors relative overflow-hidden text-ellipsis">
                                                        <MapPin className="w-4 h-4 text-green-neon shrink-0 relative z-10" />
                                                        <div className="flex flex-col relative z-10 overflow-hidden">
                                                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-0.5">Localisation</span>
                                                            <span className="text-xs text-zinc-300 line-clamp-1 leading-relaxed font-medium">
                                                                {shop.settings.store_address}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[7px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300">CBD Premium</span>
                                                    <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[7px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300">Sync Active</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-8">
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors">
                                                Accéder
                                            </span>
                                            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-neon group-hover:text-black group-hover:rotate-45 transition-all duration-500">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
