import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Package,
  MapPin,
  Coins,
  ChevronRight,
  LogOut,
  RefreshCw,
  Star,
  Shield,
  Sparkles,
  ArrowRight,
  CreditCard,
  Settings,
  Heart,
  BarChart3,
  Cpu,
  Database,
  Globe,
  Plus,
  Zap,
  LayoutDashboard,
  Wallet,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';
import { useShopPath } from '../hooks/useShopPath';
import { supabase } from '../lib/supabase';
import { Shop } from '../lib/types';
import SEO from '../components/SEO';

export default function Account() {
  const { profile, user, signOut } = useAuthStore();
  const { settings } = useSettingsStore();
  const sp = useShopPath();
  const [userShops, setUserShops] = useState<Shop[]>([]);
  const [isLoadingShops, setIsLoadingShops] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserShops();
    }
  }, [user]);

  const fetchUserShops = async () => {
    try {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserShops(data || []);
    } catch (err) {
      console.error('Error fetching user shops:', err);
    } finally {
      setIsLoadingShops(false);
    }
  };

  const initials = profile?.full_name
    ? profile.full_name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    : '?';

  const stats = [
    { label: 'Points Privilège', value: profile?.loyalty_points ?? 0, icon: Coins, color: 'text-yellow-500' },
    { label: 'Boutiques Actives', value: userShops.length, icon: LayoutDashboard, color: 'text-green-neon' },
    { label: 'Commandes Totales', value: 0, icon: Package, color: 'text-blue-500' },
  ];

  const quotas = [
    { label: 'Appels API IA', current: 1420, max: 5000, icon: Cpu, unit: 'req' },
    { label: 'Stockage Cloud', current: 4.2, max: 20, icon: Database, unit: 'GB' },
    { label: 'Bande Passante', current: 85, max: 100, icon: Globe, unit: '%' },
  ];

  return (
    <div className="min-h-scxreen bg-zinc-950 text-white pt-32 pb-40">
      <SEO title="Console Pro — Green IA SaaS" description="Gérez votre infrastructure CBD et vos boutiques." />

      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER DASHBOARD ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-green-neon/10 border border-green-neon/20 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-green-neon">Session Active : Infrastructure Cloud</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-2">
              Bonjour, <span className="text-green-neon italic">{profile?.full_name?.split(' ')[0] ?? 'Partner'}</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">Gérez vos instances, vos quotas et vos points d'excellence depuis votre centre de contrôle.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/ouvrir-boutique"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-green-neon transition-all shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
            >
              <Plus className="w-4 h-4" />
              Nouvelle Instance
            </Link>
            <button
              onClick={signOut}
              className="p-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 transition-all"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT: STATS & QUOTAS ── */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div className="text-xl font-black">{stat.value}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Infrastructure Quotas */}
            <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <BarChart3 className="w-12 h-12 text-zinc-900 absolute top-0 right-0 opacity-20" />
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-neon/10 rounded-lg">
                  <Zap className="w-4 h-4 text-green-neon" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Quotas Plateforme</h3>
              </div>

              <div className="space-y-6 relative z-10">
                {quotas.map((quota) => (
                  <div key={quota.label} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <quota.icon className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">{quota.label}</span>
                      </div>
                      <div className="text-[10px] font-mono">
                        <span className="text-white font-black">{quota.current}</span>
                        <span className="text-zinc-600"> / {quota.max} {quota.unit}</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(quota.current / quota.max) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${(quota.current / quota.max) > 0.8 ? 'bg-red-500' : 'bg-green-neon'
                          }`}
                        style={{ boxShadow: `0 0 10px ${(quota.current / quota.max) > 0.8 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(57, 255, 20, 0.3)'}` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/solution" className="flex items-center justify-between px-5 py-4 bg-green-neon/5 border border-green-neon/10 rounded-2xl group/link transition-all hover:bg-green-neon/10">
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-neon">Augmenter mes limites</span>
                  <ArrowRight className="w-4 h-4 text-green-neon transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Loyalty Wallet Overlay */}
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[80px]" />
              <div className="flex justify-between items-center relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Privilège Wallet</span>
                  <span className="text-2xl font-serif font-black">{profile?.loyalty_points ?? 0} Carats</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                  <Wallet className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed relative z-10">
                Cumulez des carats à chaque opération infrastructure pour débloquer des modules IA premiums.
              </p>
              <button className="w-full py-4 text-[9px] font-black uppercase tracking-widest border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-zinc-400">
                Détails des points
              </button>
            </div>
          </div>

          {/* ── RIGHT: MAIN CONTENT ── */}
          <div className="lg:col-span-8 space-y-12">

            {/* Active Instances (Shops) */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-3">
                  Instances Actives
                  <span className="px-2 py-0.5 bg-zinc-900 rounded-md text-[9px] text-zinc-400">{userShops.length}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {isLoadingShops ? (
                    [1, 2].map(i => (
                      <div key={i} className="h-40 bg-white/[0.02] border border-white/5 rounded-[2.5rem] animate-pulse" />
                    ))
                  ) : userShops.length > 0 ? (
                    userShops.map((shop) => (
                      <motion.div
                        key={shop.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            {shop.logo_url ? (
                              <img src={shop.logo_url} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt={shop.name} />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-green-neon/10 border border-green-neon/20 flex items-center justify-center font-black text-green-neon text-xl">
                                {shop.name[0]}
                              </div>
                            )}
                            <div>
                              <h4 className="text-lg font-serif font-black">{shop.name}</h4>
                              <p className="text-[10px] font-mono text-zinc-500">{shop.slug}.greenIA.cloud</p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${shop.subscription_plan === 'pro' ? 'bg-green-neon text-black' : 'bg-zinc-800 text-zinc-400'
                            }`}>
                            {shop.subscription_plan || 'free'}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Link
                            to={`/${shop.slug}/admin`}
                            className="flex-1 py-3.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-center transition-all"
                          >
                            Console Admin
                          </Link>
                          <Link
                            to={`/${shop.slug}`}
                            className="px-4 py-3.5 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:bg-green-neon"
                          >
                            Voir Shop
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 py-20 bg-white/[0.01] border border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-16 h-16 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center">
                        <LayoutDashboard className="w-8 h-8 text-zinc-800" />
                      </div>
                      <div>
                        <p className="text-zinc-500 font-medium">Aucune instance active detectée.</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700 mt-1">Démarrez votre premier shop en quelques secondes.</p>
                      </div>
                      <Link to="/ouvrir-boutique" className="px-8 py-3 bg-zinc-900 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                        Lancer un Shop
                      </Link>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Other Services */}
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600">Services Cloud</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Historique & Facturation', desc: 'Gérez vos paiements et factures SaaS.', icon: Package, to: sp('/compte/commandes') },
                  { label: 'Paramètres Sécurité', desc: 'Isolation des données et accès API.', icon: Settings, to: sp('/compte/profil') },
                  { label: 'Adresses de Livraison', desc: 'Gestion des hubs logistiques.', icon: MapPin, to: sp('/compte/adresses') },
                  { label: 'Support Prioritaire', desc: 'Assistance technique 24/7.', icon: Shield, to: '/contact' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="p-6 bg-white/[0.01] border border-white/[0.04] rounded-3xl flex items-center gap-6 hover:bg-white/[0.03] hover:border-white/10 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-green-neon/10 transition-all">
                      <item.icon className="w-5 h-5 text-zinc-500 group-hover:text-green-neon" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{item.label}</h4>
                      <p className="text-[10px] text-zinc-500">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-800 ml-auto group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
