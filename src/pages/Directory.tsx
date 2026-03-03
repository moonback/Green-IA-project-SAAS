import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Store, MapPin, ChevronRight, Search, Star, ExternalLink, Globe } from 'lucide-react';
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
        <div className="min-h-screen bg-zinc-950 text-white overflow-hidden pb-32">
            <SEO
                title="Annuaire des Boutiques — Green IA Shop"
                description="Découvrez toutes les boutiques partenaires de notre réseau Green IA. Trouvez le magasin CBD le plus proche de chez vous."
            />

            {/* Hero Header */}
            <section className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-neon/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-green-neon text-xs font-black uppercase tracking-widest"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="mt-0.5">Réseau Global</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-black"
                    >
                        Annuaire des <span className="text-green-neon italic">Boutiques</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 font-light"
                    >
                        Découvrez nos marchands certifiés et accédez à leur catalogue exclusif.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative max-w-xl mx-auto mt-10"
                    >
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-zinc-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher une boutique, une ville..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-green-neon/50 focus:ring-1 focus:ring-green-neon/50 text-white placeholder:text-zinc-600 outline-none transition-all"
                        />
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
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <Store className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Aucune boutique trouvée</h3>
                        <p className="text-zinc-500 text-sm">Essayez de modifier votre recherche.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredShops.map((shop, index) => (
                            <motion.div
                                key={shop.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/${shop.slug}`}
                                    className="block h-full group bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-800/80 hover:border-white/20 transition-all duration-500"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center p-2 shadow-xl group-hover:scale-110 transition-transform">
                                            {shop.logo_url ? (
                                                <img src={shop.logo_url} alt={shop.name} className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <Store className="w-8 h-8 text-zinc-600" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-xs font-bold text-zinc-400 group-hover:text-green-neon group-hover:border-green-neon/30 transition-colors">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            4.9
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-serif font-black text-white mb-2 group-hover:text-green-neon transition-colors">
                                        {shop.name}
                                    </h3>

                                    <div className="space-y-2 mb-8">
                                        {shop.settings?.store_address && (
                                            <div className="flex items-start gap-2 text-sm text-zinc-500">
                                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span className="line-clamp-2">{shop.settings.store_address}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                        <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                                            Visiter la vitrine
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-neon group-hover:text-black transition-colors">
                                            <ExternalLink className="w-4 h-4" />
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
