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
            title: "IA BudTender Conversationnelle",
            description: "Un assistant intelligent qui guide vos clients selon leurs besoins (sommeil, stress, récupération) et booste votre taux de conversion.",
            icon: <Cpu className="w-8 h-8 text-green-neon" />,
            tag: "Intelligence Artificielle"
        },
        {
            title: "Pilotage Multi-Points de Vente",
            description: "Gérez l'ensemble de vos boutiques physiques et en ligne depuis une interface unique et centralisée.",
            icon: <Lock className="w-8 h-8 text-green-neon" />,
            tag: "Gestion Centralisée"
        },
        {
            title: "Synchronisation Omnicanale",
            description: "Stocks, commandes et clients synchronisés en temps réel entre votre e-boutique et votre logiciel de caisse.",
            icon: <Globe className="w-8 h-8 text-green-neon" />,
            tag: "Flux Temps Réel"
        },
        {
            title: "Business Intelligence",
            description: "Analysez vos performances, suivez vos meilleures ventes et optimisez vos stocks grâce à des rapports détaillés.",
            icon: <BarChart3 className="w-8 h-8 text-green-neon" />,
            tag: "Analytics"
        }
    ];

    return (
        <div className="min-h-screen bg-brand-950 text-white overflow-hidden">
            <SEO
                title="Solution SaaS | Green IA Infrastructure Cloud"
                description="Découvrez l'infrastructure la plus avancée du marché pour le retail CBD. Centralisez votre gestion, automatisez vos ventes avec l'IA."
            />

            {/* ─── Hero Section ─── */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background Image & Cinematic Overlays */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/solution-hero-bg.png"
                        alt="Infrastructure Cloud CBD"
                        className="w-full h-full object-cover opacity-60 scale-105"
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
                            L'écosystème ultime pour le retail CBD
                        </motion.span>

                        <h1 className="section-title text-4xl sm:text-6xl lg:text-7xl">
                            Propulsez votre business avec
                            <br />
                            <span className="glow-green italic text-green-neon">l'IA native.</span>
                        </h1>
                        <p className="mt-8 max-w-2xl text-lg sm:text-xl font-light text-zinc-400 leading-relaxed mb-10">
                            De la gestion des stocks à l'assistant client intelligent, Green IA est la plateforme tout-en-un conçue pour scaler votre empire CBD en toute simplicité.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full sm:w-auto">
                            <Link to="/ouvrir-boutique" className="btn-primary px-10 py-5 text-base flex items-center justify-center gap-2 group">
                                Demander une démo <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/ecosysteme" className="btn-secondary px-10 py-5 text-base flex items-center justify-center">
                                Explorer l'écosystème
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Tout ce qu'il faut pour gérer votre boutique CBD ─── */}
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
                            avancé, conçu pour comprendre les spécificités des cannabinoïdes et
                            accompagner vos clients vers le produit idéal en fonction de leurs besoins.
                        </p>
                        <div className="space-y-4">
                            {[
                                { t: "Intelligence Contextuelle", d: "Une compréhension profonde des besoins clients : anxiété, sommeil, douleur ou plaisir." },
                                { t: "Vente Suggestive Intelligente", d: "Augmente le panier moyen en proposant des produits complémentaires pertinents." },
                                { t: "Personnalité de Marque", d: "Adaptez le ton de l'IA pour qu'elle reflète l'identité unique de votre boutique." }
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
                        Green IA repose sur une architecture Cloud native ultra-performante.
                        Chaque instance est isolée, garantissant une sécurité maximale
                        et une disponibilité sans faille pour votre entreprise.
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
                                { icon: <ShieldCheck />, title: "Données protégées", label: "Protection renforcée" },
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
