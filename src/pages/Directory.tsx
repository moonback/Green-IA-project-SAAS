import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Store, MapPin, ChevronRight, Search, Star, ExternalLink, Globe, Phone, Mail, Clock } from 'lucide-react';
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
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                {/* Background Image & Overlays */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/directory-hero-bg.png"
                        alt="Ecosystème Green IA"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/40 to-zinc-950" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-zinc-950/80" />
                </div>

                <div className="content-wrap relative z-10 w-full pt-20 max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-green-neon text-[10px] font-black uppercase tracking-[0.24em]"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="mt-0.5">Réseau Global Green IA</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-serif font-black leading-none"
                        >
                            L'Annuaire des <br />
                            <span className="text-green-neon italic glow-green">Boutiques.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto"
                        >
                            Explorez l'écosystème Green IA et découvrez nos marchands certifiés à travers toute l'Europe.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative max-w-xl mx-auto mt-12"
                        >
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-zinc-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher une boutique, une ville..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-green-neon/50 focus:ring-1 focus:ring-green-neon/50 text-white placeholder:text-zinc-600 outline-none backdrop-blur-sm transition-all shadow-2xl"
                            />
                        </motion.div>
                    </div>
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
                                            <div className="flex items-start gap-3 p-3 rounded-2xl bg-black/20 border border-white/5">
                                                <MapPin className="w-5 h-5 text-green-neon shrink-0 mt-0.5" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white mb-0.5">Adresse</span>
                                                    <span className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                                        {shop.settings.store_address}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Phone/Email Contacts if available in settings */}
                                        {(shop.settings?.contact_phone || shop.settings?.contact_email) && (
                                            <div className="flex flex-col gap-2 p-3 rounded-2xl bg-black/20 border border-white/5">
                                                {shop.settings?.contact_phone && (
                                                    <div className="flex items-center gap-3">
                                                        <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                                                        <span className="text-xs text-zinc-400 font-medium">{shop.settings.contact_phone}</span>
                                                    </div>
                                                )}
                                                {shop.settings?.contact_email && (
                                                    <div className="flex items-center gap-3">
                                                        <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                                                        <span className="text-xs text-zinc-400 font-medium truncate">{shop.settings.contact_email}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Brief Description or Slogan if available */}
                                        {shop.settings?.content?.home?.subtitle && (
                                            <p className="text-xs text-zinc-500 italic px-2 line-clamp-2">
                                                "{shop.settings.content.home.subtitle}"
                                            </p>
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
