import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Store, Globe, Mail, Lock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Rocket, Crown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import SEO from '../components/SEO';

const PLANS = [
    {
        id: 'free',
        name: 'Essentiel',
        price: '0€',
        features: ['100 appels IA / mois', 'Catalogue illimité', 'IA BudTender Standard', 'Support Communauté'],
        color: 'border-zinc-800'
    },
    {
        id: 'pro',
        name: 'Expansion',
        price: '49€',
        features: ['2000 appels IA / mois', 'IA BudTender Personnalisée', 'Statut Shop Vérifié', 'Support Prioritaire'],
        color: 'border-green-neon/50 shadow-[0_0_20px_rgba(20,229,148,0.1)]'
    }
];

export default function RegisterShop() {
    const navigate = useNavigate();
    const { signUp } = useAuthStore();

    const [step, setStep] = useState(1);
    const [shopName, setShopName] = useState('');
    const [shopSlug, setShopSlug] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('free');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (val: string) => {
        setShopName(val);
        if (step === 1) setShopSlug(slugify(val));
    };

    const handleCreateShop = async () => {
        setIsLoading(true);
        setError('');

        try {
            // 1. Sign up user (Atomically creates Shop + Member + Profile via Trigger)
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: `${shopName} Gérant`,
                        is_shop_registration: true,
                        shop_name: shopName,
                        shop_slug: shopSlug,
                        shop_plan: selectedPlan
                    }
                }
            });

            if (signUpError) throw signUpError;
            if (!authData.user) throw new Error("Erreur lors de la création du compte.");

            // Étape 4 (Succès) directement car le trigger a tout fait en une transaction
            setStep(4);
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-neon selection:text-black">
            <SEO title="Ouvrir ma boutique — Green IA SaaS" description="Rejoignez la plateforme SaaS CBD n°1 et lancez votre boutique avec IA." />

            <div className="max-w-8xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Marketing */}
                <div className="space-y-8">
                    <Link to="/" className="inline-flex items-center gap-2 group">
                        <div className="bg-green-neon p-1 rounded-lg">
                            <Building2 className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-xl font-serif font-black tracking-tight group-hover:text-green-neon transition-colors">
                            GREEN <span className="text-green-neon">IA</span> BUSINESS
                        </span>
                    </Link>

                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight">
                            Déployez votre activité <br />
                            <span className="text-green-neon italic">en mode SaaS</span>.
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-md">
                            Une stack SaaS complète pour dirigeants CBD : opérations, ventes, fidélisation et pilotage temps réel.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                        {[
                            { title: 'IA BudTender', desc: 'Conseil IA orienté conversion' },
                            { title: 'Multi-Tenant', desc: 'Conformité multi-tenant' },
                            { title: 'Fidélité Pro', desc: 'Programmes CRM et rétention' },
                            { title: 'Statistiques', desc: 'KPI business en temps réel' }
                        ].map((f, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                                <p className="font-bold text-white mb-1">{f.title}</p>
                                <p className="text-xs text-zinc-500">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Stepper Form */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-neon/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                    <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-green-neon/20 rounded-3xl p-8 lg:p-10 shadow-[0_0_50px_rgba(20,229,148,0.06)] overflow-hidden">
                        <div className="absolute -top-20 -right-14 w-52 h-52 rounded-full bg-green-neon/10 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-14 w-52 h-52 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

                        <div className="relative mb-8 flex items-center justify-between gap-3 border border-green-neon/20 bg-green-neon/5 rounded-2xl px-4 py-3">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-neon">
                                <Rocket className="w-4 h-4" />
                                Onboarding Shop Pro
                            </div>
                            <span className="text-[10px] font-semibold text-zinc-400">Configuration en ~2 min</span>
                        </div>

                        {/* Success View */}
                        <AnimatePresence mode="wait">
                            {step === 4 ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-10 space-y-6"
                                >
                                    <div className="w-20 h-20 bg-green-neon/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ShieldCheck className="w-10 h-10 text-green-neon" />
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold">Boutique créée ! 🎉</h2>
                                    <p className="text-zinc-400">
                                        Votre boutique <span className="text-white font-bold">{shopName}</span> est maintenant en ligne.
                                        Connectez-vous pour accéder à votre dashboard admin.
                                    </p>
                                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-4 text-sm">
                                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Adresse de votre boutique</p>
                                        <p className="text-green-neon font-mono font-bold">/{shopSlug}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                        <Link
                                            to={`/${shopSlug}`}
                                            className="flex-1 inline-flex items-center justify-center gap-2 bg-green-neon text-black font-bold px-6 py-4 rounded-2xl hover:scale-105 transition-transform"
                                        >
                                            Voir ma boutique <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            to="/connexion"
                                            className="flex-1 inline-flex items-center justify-center gap-2 bg-zinc-800 text-white font-bold px-6 py-4 rounded-2xl hover:bg-zinc-700 transition-colors"
                                        >
                                            Se connecter
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="form" className="space-y-8">

                                    {/* Progress Header */}
                                    <div className="flex items-center gap-4 mb-10">
                                        {[1, 2, 3].map((s) => (
                                            <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-zinc-800">
                                                <motion.div
                                                    className="h-full bg-green-neon"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: step >= s ? '100%' : '0%' }}
                                                />
                                            </div>
                                        ))}
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Étape {step}/3</span>
                                    </div>

                                    {step === 1 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <div>
                                                <h2 className="text-2xl font-serif font-bold mb-2">Identité de votre shop</h2>
                                                <p className="text-sm text-zinc-500">Choisissez comment vos clients vous trouveront.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1">Nom de la boutique</label>
                                                    <div className="relative group">
                                                        <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-green-neon" />
                                                        <input
                                                            type="text"
                                                            value={shopName}
                                                            onChange={(e) => handleNameChange(e.target.value)}
                                                            placeholder="ex: Green IA Paris"
                                                            className="w-full bg-black/40 border border-zinc-700 rounded-2xl pl-12 pr-4 py-4 focus:border-green-neon outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1">URL de votre boutique</label>
                                                    <div className="relative group">
                                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                                        <input
                                                            type="text"
                                                            value={shopSlug}
                                                            onChange={(e) => setShopSlug(slugify(e.target.value))}
                                                            placeholder="mon-shop-cbd"
                                                            className="w-full bg-black/40 border border-zinc-700 rounded-2xl pl-12 pr-4 py-4 focus:border-green-neon outline-none transition-all"
                                                        />
                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-mono">.greenIA.saas</span>
                                                    </div>
                                                </div>

                                                <div className="rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3">
                                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Aperçu URL</p>
                                                    <p className="text-sm font-bold text-white">green-ia.app/<span className="text-green-neon">{shopSlug || 'votre-shop'}</span></p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setStep(2)}
                                                disabled={!shopName || !shopSlug}
                                                className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-neon transition-colors disabled:opacity-50"
                                            >
                                                Suivant <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <div>
                                                <h2 className="text-2xl font-serif font-bold mb-2">Choisissez votre plan</h2>
                                                <p className="text-sm text-zinc-500">Commencez gratuitement, évoluez selon vos besoins.</p>
                                            </div>

                                            <div className="grid gap-4">
                                                {PLANS.map((p) => (
                                                    <div
                                                        key={p.id}
                                                        onClick={() => setSelectedPlan(p.id)}
                                                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedPlan === p.id ? p.color : 'border-zinc-800 grayscale opacity-60'}`}
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <h3 className="font-bold text-lg">{p.name}</h3>
                                                                <p className="text-2xl font-black text-green-neon">{p.price}<span className="text-xs text-zinc-500 font-normal">/mois</span></p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {p.id === 'pro' && <Crown className="w-4 h-4 text-amber-300" />}
                                                                {selectedPlan === p.id && <CheckCircle2 className="w-5 h-5 text-green-neon" />}
                                                            </div>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {p.features.map((f, i) => (
                                                                <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                                                                    <div className="w-1 h-1 bg-green-neon rounded-full" /> {f}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex gap-4">
                                                <button onClick={() => setStep(1)} className="flex-1 bg-zinc-800 text-white font-bold py-4 rounded-2xl">Retour</button>
                                                <button onClick={() => setStep(3)} className="flex-1 bg-white text-black font-bold py-4 rounded-2xl hover:bg-green-neon">Suivant</button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <div>
                                                <h2 className="text-2xl font-serif font-bold mb-2">Informations de connexion</h2>
                                                <p className="text-sm text-zinc-500">Ces accès vous permettront de gérer votre shop.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1">Email professionnel</label>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="votre@email.fr"
                                                            className="w-full bg-black/40 border border-zinc-700 rounded-2xl pl-12 pr-4 py-4 focus:border-green-neon outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 ml-1">Mot de passe</label>
                                                    <div className="relative group">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder="••••••••"
                                                            className="w-full bg-black/40 border border-zinc-700 rounded-2xl pl-12 pr-4 py-4 focus:border-green-neon outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-xs">
                                                    {error}
                                                </div>
                                            )}

                                            <div className="rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3 text-xs text-zinc-400 space-y-1">
                                                <p className="font-bold text-zinc-200">Récapitulatif</p>
                                                <p>Boutique: <span className="text-white">{shopName || '—'}</span></p>
                                                <p>Slug: <span className="text-green-neon">/{shopSlug || '—'}</span></p>
                                                <p>Plan: <span className="text-white">{selectedPlan === 'pro' ? 'Expansion' : 'Essentiel'}</span></p>
                                            </div>

                                            <div className="flex gap-4">
                                                <button onClick={() => setStep(2)} className="flex-1 bg-zinc-800 text-white font-bold py-4 rounded-2xl">Retour</button>
                                                <button
                                                    onClick={handleCreateShop}
                                                    disabled={isLoading || !email || !password}
                                                    className="flex-[2] bg-white text-black font-bold py-4 rounded-2xl hover:bg-green-neon disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    {isLoading ? <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : 'Créer ma boutique'}
                                                    {!isLoading && <Sparkles className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>

            </div>
        </div>
    );
}
