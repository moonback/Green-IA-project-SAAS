import { motion } from "motion/react";
import {
    ShieldCheck,
    Store,
    Database,
    Lock,
    Smartphone,
    ArrowRight,
    Globe,
    Cpu,
    Bot,
    Sparkles,
} from "lucide-react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function SolutionSaaS() {
    const features = [
        {
            title: "IA Budtender Conversationnelle",
            description: "Un conseiller intelligent qui comprend les besoins clients (stress, sommeil, douleur…) et recommande les bons produits en toute conformité.",
            icon: <Bot className="w-5 h-5 text-white" strokeWidth={1.5} />,
            tag: "Intelligence"
        },
        {
            title: "Pilotage multi-points de vente",
            description: "Centralisez ventes, stocks et clients de toutes vos boutiques physiques et en ligne depuis une interface unique.",
            icon: <Store className="w-5 h-5 text-white" strokeWidth={1.5} />,
            tag: "Gestion"
        },
        {
            title: "Synchronisation omnicanale",
            description: "Stocks, commandes et clients synchronisés en temps réel entre votre POS en magasin, votre e-commerce et votre IA.",
            icon: <Globe className="w-5 h-5 text-white" strokeWidth={1.5} />,
            tag: "Connectivité"
        }
    ];

    return (
        <div className="min-h-screen bg-brand-950 text-white overflow-hidden font-sans selection:bg-green-neon selection:text-black">
            <SEO
                title="Solution SaaS | Green IA Infrastructure Cloud"
                description="L'IA métier conçue pour vendre du CBD, partout. Pilotez vos boutiques, automatisez la vente et augmentez vos conversions."
            />

            {/* ─── Hero Section ─── */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/solution-hero-bg.png"
                        alt="Infrastructure Cloud CBD"
                        className="w-full h-full object-cover opacity-100 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-950/90 via-brand-950/50 to-brand-950" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-950/90" />
                </div>

                <div className="content-wrap relative z-10 w-full pt-28 pb-20">
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md mb-8 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.24em] text-zinc-400"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-neon animate-pulse" />
                            Solution dédiée aux professionnels du CBD
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.1] mb-6">
                            <span className="text-green-neon italic font-light drop-shadow-[0_0_15px_rgba(76,255,0,0.3)]">L'IA métier</span> conçue pour vendre du CBD, partout.
                        </h1>
                        <p className="max-w-2xl text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-10">
                            Pilotez vos boutiques, automatisez la vente et augmentez vos conversions grâce à une IA spécialisée retail CBD.
                        </p>

                        <div className="flex flex-col items-center">
                            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full sm:w-auto mb-4">
                                <Link to="/contact" className="bg-green-neon text-black font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 group hover:bg-white transition-colors text-sm sm:text-base">
                                    Demander une démo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/ecosysteme" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center transition-colors backdrop-blur-md text-sm sm:text-base">
                                    Explorer l'écosystème
                                </Link>
                            </div>
                            <span className="text-xs text-zinc-500 font-medium">Déployé et opérationnel en moins de 5 minutes.</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Tout ce qu'il faut pour gérer votre boutique CBD ─── */}
            <section className="py-24 px-4 bg-brand-950 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-black mb-4">Tout ce qu'il vous faut pour <span className="text-zinc-400 italic font-light">scaler</span> dans le CBD</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-6 md:p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="mb-6 inline-flex rounded-xl bg-white/5 border border-white/5 p-3">
                                    {feature.icon}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-white tracking-tight">{feature.title}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── AI Deep Dive (Storytelling) ─── */}
            <section className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* Visualizer */}
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-10 bg-green-neon/5 blur-[100px] rounded-full pointer-events-none" />

                        <div className="relative bg-zinc-900 border border-white/5 rounded-[2rem] p-6 lg:p-8 overflow-hidden shadow-2xl backdrop-blur-xl">
                            <div className="absolute top-4 right-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-white/5 px-3 py-1 bg-white/5 rounded-full">
                                Scénario réel client
                            </div>

                            <div className="flex items-center gap-3 mb-10 opacity-60">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            </div>

                            <div className="space-y-5">
                                <div className="p-4 bg-zinc-800 rounded-2xl rounded-tl-none border border-white/5 text-[13px] text-zinc-200 shadow-sm leading-relaxed w-[90%]">
                                    "Bonjour, je cherche un profil terpénique apaisant mais qui me permet de rester concentré au bureau."
                                </div>
                                <div className="p-4 bg-green-neon/5 rounded-2xl rounded-tr-none border border-green-neon/20 text-[13px] text-green-neon ml-auto w-[90%] shadow-sm leading-relaxed">
                                    <div className="flex items-center gap-1.5 mb-1.5 opacity-70 text-[9px] uppercase font-bold tracking-[0.2em] text-green-neon">
                                        <Bot className="w-3 h-3" /> BudTender Engine™
                                    </div>
                                    "Pour une relaxation consciente, je vous oriente vers la Lemon Haze High-CBD. Son profil riche en Limonène booste la concentration tandis que le CBD calme subtilement le système nerveux."
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 leading-[1.1]">
                            Une IA qui s'adapte à votre boutique, <span className="italic font-light text-zinc-400">pas l'inverse.</span>
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 font-normal">
                            L'IA BudTender Green IA analyse les profils clients, comprend leurs attentes et applique vos règles commerciales, votre catalogue précis et le ton unique de votre marque.
                        </p>

                        <div className="space-y-4">
                            {[
                                { t: "Intelligence contextuelle CBD", d: "Connaissance fine des effets, profils de consommateurs et cadre légal." },
                                { t: "Vente assistée intelligente", d: "Automatise naturellement l'upsell et le cross-sell sur des produits complémentaires." },
                                { t: "Personnalité personnalisable", d: "Ton éditorial 100% adaptable pour refléter l'identité de votre enseigne." }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 lg:p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                                    <div className="mt-1 sm:mt-0 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-neon" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-1">{item.t}</h4>
                                        <p className="text-zinc-400 text-xs sm:text-sm font-normal">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ─── Scalability & Multi-Tenant ─── */}
            <section className="py-24 px-4 bg-brand-950">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-black mb-6">
                        Déployé rapidement. <br />Sécurisé par <span className="italic text-zinc-400 font-light">design.</span>
                    </h2>
                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto mb-16">
                        Une infrastructure cloud native pensée dès le premier jour pour le retail CBD, avec isolation complète des données et haute disponibilité garantie.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { icon: <Database className="w-6 h-6" />, title: "Isolation des données", label: "Multi-tenant sécurisé" },
                            { icon: <ShieldCheck className="w-6 h-6" />, title: "Données protégées", label: "Chiffrement & RGPD" },
                            { icon: <Smartphone className="w-6 h-6" />, title: "POS natif cloud", label: "Magasin & en ligne" }
                        ].map((item, i) => (
                            <div key={i} className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl flex flex-col items-center gap-4 text-center">
                                <div className="text-green-neon">
                                    {item.icon}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                                    <p className="text-zinc-500 text-xs">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Final CTA ─── */}
            <section className="py-24 px-4 bg-gradient-to-b from-brand-950 to-zinc-950">
                <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 bg-green-neon rounded-[2.5rem] md:rounded-[3rem] text-black text-center box-border border-4 border-green-neon/50">
                    <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight mb-6">
                        Prêt à faire passer votre boutique CBD <span className="italic font-light opacity-80">à l'échelle</span> ?
                    </h2>
                    <p className="text-black/80 text-base md:text-lg max-w-xl mx-auto font-medium mb-10">
                        Testez Green IA gratuitement ou échangez avec un expert CBD pour découvrir comment notre IA peut transformer vos ventes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/ouvrir-boutique"
                            className="bg-black text-white font-bold px-8 py-4 rounded-full hover:bg-zinc-900 transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
                        >
                            Démarrer l'essai gratuit
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-transparent border-2 border-black text-black font-bold px-8 py-4 rounded-full hover:bg-black/5 transition-colors text-sm sm:text-base w-full sm:w-auto text-center"
                        >
                            Demander une démo
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
