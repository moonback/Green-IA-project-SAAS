import { motion } from "motion/react";
import {
    ShieldCheck,
    Sparkles,
    Zap,
    LayoutDashboard,
    Store,
    LineChart,
    Database,
    Lock,
    Smartphone,
    CheckCircle2,
    ArrowRight,
    Globe,
    Cpu,
    BarChart3
} from "lucide-react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function SolutionSaaS() {
    const features = [
        {
            title: "IA BudTender 24/7",
            description: "Une intelligence artificielle experte qui guide vos clients vers les produits adaptés à leurs besoins (sommeil, stress, douleurs).",
            icon: <Cpu className="w-8 h-8 text-green-neon" />,
            tag: "Innovation"
        },
        {
            title: "Multi-tenant Sécurisé",
            description: "Chaque boutique bénéficie d'une instance isolée et sécurisée. Vos données sont protégées par les standards bancaires.",
            icon: <Lock className="w-8 h-8 text-green-neon" />,
            tag: "Sécurité"
        },
        {
            title: "Omnicanal Connecté",
            description: "Synchronisez en temps réel vos stocks magasin et e-commerce. Un seul inventaire pour une vision 360°.",
            icon: <Globe className="w-8 h-8 text-green-neon" />,
            tag: "Performance"
        },
        {
            title: "Analytics Avancés",
            description: "Suivez vos performances avec des tableaux de bord prédictifs. Identifiez vos best-sellers et optimisez vos marges.",
            icon: <BarChart3 className="w-8 h-8 text-green-neon" />,
            tag: "Growth"
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
            <SEO
                title="Solution SaaS | Green Mood Infrastructure Cloud"
                description="Découvrez l'infrastructure la plus avancée du marché pour le retail CBD. Centralisez votre gestion, automatisez vos ventes avec l'IA."
            />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-20 px-5 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-green-neon/5 blur-[120px] rounded-full opacity-30" />
                    <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-4"
                    >
                        <Zap className="w-4 h-4 text-green-neon fill-green-neon" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Infrastructure Multi-tenant Cloud</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-serif font-black tracking-tighter leading-[0.9] mb-10"
                    >
                        ARCHITECTURE <br />
                        <span className="text-green-neon italic glow-green">HAUTE-PERFORMANCE.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        Green Mood n'est pas qu'un simple site web, c'est un moteur technologique
                        complet qui gère l'inventaire, les clients et l'intelligence artificielle
                        pour des centaines de boutiques simultanément.
                    </motion.p>
                </div>
            </section>

            {/* ─── Core Architecture Section ─── */}
            <section className="py-32 px-5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-20 border-b border-white/[0.06]">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-green-neon/30 transition-all duration-500"
                            >
                                <div className="mb-8 p-4 w-16 h-16 rounded-2xl bg-zinc-900 border border-white/[0.06] group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                    {feature.icon}
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{feature.tag}</span>
                                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed font-light">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── AI Deep Dive ─── */}
            <section className="py-32 px-5 bg-zinc-900/20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute -inset-20 bg-green-neon/10 blur-[150px] rounded-full opacity-50" />
                        <div className="relative bg-zinc-950 border border-white/[0.1] rounded-[3rem] p-10 overflow-hidden shadow-2xl">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                <div className="ml-auto px-3 py-1 bg-green-neon/10 rounded-full text-[10px] text-green-neon font-black tracking-widest uppercase">Mode Expert</div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-5 bg-white/[0.03] rounded-2xl rounded-tl-none border border-white/5 text-sm text-zinc-400 font-light">
                                    "Bonjour, je cherche un profil terpénique apaisant mais qui me permet de rester concentré."
                                </div>
                                <div className="p-5 bg-green-neon/5 rounded-2xl rounded-tr-none border border-green-neon/20 text-sm text-white font-medium ml-12">
                                    <div className="flex items-center gap-2 mb-2 text-green-neon uppercase text-[10px] font-black tracking-widest">
                                        <Sparkles className="w-3 h-3" /> BudTender Engine v4
                                    </div>
                                    "Pour une relaxation consciente, je vous oriente vers la **Lemon Haze High-CBD**. Son profil riche en Limonène booste la concentration tandis que le CBD calme le système nerveux."
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center">
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [12, 32, 12] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                            className="w-1.5 bg-green-neon/40 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-tight text-white uppercase italic">
                            VOTRE <span className="text-green-neon">IA</span>, <br />
                            VOS <span className="text-white glow-green">RÈGLES.</span>
                        </h2>
                        <p className="text-zinc-500 text-lg leading-relaxed font-light">
                            L'IA BudTender n'est pas un simple chatbot. C'est un moteur de recommandations
                            entraîné sur des milliers de fiches produits CBD, capable de comprendre
                            les nuances moléculaires et de conseiller vos clients selon l'usage recherché.
                        </p>
                        <div className="space-y-4">
                            {[
                                { t: "Configurable à 100%", d: "Ajustez le ton (expert, amical, médical) selon votre image de marque." },
                                { t: "Synchronisation Catalogue", d: "L'IA connaît vos stocks et ne recommande que ce qui est disponible." },
                                { t: "Collecte de Data", d: "Comprenez ce que vos clients cherchent vraiment (sommeil, anxiété, plaisir)." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/[0.04] rounded-3xl hover:border-green-neon/20 transition-all group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-green-neon shadow-[0_0_8px_rgba(57,255,20,0.8)] group-hover:scale-150 transition-transform" />
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-1">{item.t}</h4>
                                        <p className="text-zinc-500 text-xs leading-relaxed font-light">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Scalability & Multi-Tenant ─── */}
            <section className="py-40 px-5 text-center">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-white uppercase italic">
                        DÉPLOYEZ EN <span className="text-green-neon">QUELQUES CLICS.</span>
                    </h2>
                    <p className="text-zinc-500 text-xl font-light">
                        Oubliez les installations complexes. Chaque boutique Green Mood est
                        automatiquement isolée dans son propre environnement sécurisé,
                        permettant une scalabilité infinie.
                    </p>

                    <div className="relative py-20">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden pointer-events-none">
                            <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-green-neon to-transparent" />
                            <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-green-neon to-transparent rotate-12" />
                            <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-green-neon to-transparent -rotate-12" />
                        </div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: <Database />, title: "Isolément Données", label: "Multi-tenant logic" },
                                { icon: <ShieldCheck />, title: "Sécurité RLS", label: "Zéro leak possible" },
                                { icon: <Smartphone />, title: "POS Natif", label: "Magasin piloté Cloud" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-4">
                                    <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center text-green-neon shadow-2xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase text-sm tracking-widest">{item.title}</h4>
                                        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Final CTA ─── */}
            <section className="py-32 px-5">
                <div className="max-w-5xl mx-auto px-10 py-20 bg-green-neon rounded-[3rem] text-black text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-black/10 blur-[100px] rounded-full" />
                    <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tight mb-8">
                        PRÊT À RÉVOLUTIONNER <br /> VOTRE RETAIL ?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link
                            to="/ouvrir-boutique"
                            className="px-12 py-5 bg-black text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 transition-transform shadow-2xl"
                        >
                            Démarrer l'essai gratuit
                        </Link>
                        <Link
                            to="/contact"
                            className="px-12 py-5 border-2 border-black text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-black hover:text-white transition-all"
                        >
                            Demander une démo
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
