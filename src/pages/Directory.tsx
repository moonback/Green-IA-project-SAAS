import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Globe, MapPin, Search, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shop } from '../lib/types';
import SEO from '../components/SEO';
import { GlassBadge, GlassPanel } from '../components/ui/GlassPrimitives';

export default function Directory() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const { data, error } = await supabase.from('shops').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setShops((data as Shop[]) || []);
      } catch (err) {
        console.error('Erreur de chargement des boutiques:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShops();
  }, []);

  const filtered = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shop.settings?.store_address || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen overflow-hidden bg-brand-950 pb-24 text-white">
      <SEO title="Annuaire des Boutiques | Green IA" description="Trouvez une boutique CBD du réseau Green IA." />

      <section className="app-section relative pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-8 h-72 w-72 rounded-full bg-emerald-300/10 blur-[120px]" />
        </div>
        <div className="content-wrap relative z-10 text-center">
          <GlassBadge className="mx-auto mb-6 w-fit text-emerald-100"><Globe className="h-3 w-3" /> Annuaire vérifié</GlassBadge>
          <h1 className="text-5xl font-black sm:text-7xl">Explorez notre <span className="text-emerald-300">réseau de boutiques</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-zinc-300">Même design premium, chaque boutique garde son identité et ses paramètres de thème.</p>
          <div className="mx-auto mt-8 max-w-xl">
            <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une boutique ou une ville"
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="app-section pt-6">
        <div className="content-wrap">
          {isLoading ? (
            <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent" /></div>
          ) : filtered.length === 0 ? (
            <GlassPanel className="p-10 text-center">
              <Store className="mx-auto mb-3 h-8 w-8 text-zinc-500" />
              <p className="font-semibold">Aucune boutique trouvée</p>
            </GlassPanel>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((shop, i) => (
                <motion.div key={shop.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <Link to={`/${shop.slug}`}>
                    <GlassPanel className="h-full p-6 transition hover:border-emerald-200/40">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-lg font-bold text-white">{shop.name}</p>
                        <ExternalLink className="h-4 w-4 text-zinc-500" />
                      </div>
                      <p className="flex items-center gap-2 text-sm text-zinc-400"><MapPin className="h-4 w-4" /> {shop.settings?.store_address || 'Adresse non renseignée'}</p>
                    </GlassPanel>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
