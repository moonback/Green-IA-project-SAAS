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
            title: "BudTender Augmenté",
            description: "Un moteur sémantique qui guide vos clients à travers les nuances moléculaires de votre catalogue.",
            icon: <Cpu className="w-8 h-8 text-emerald-500" />,
            tag: "Intelligence"
        },
        {
            title: "Infrastructure Multi-Tenance",
            description: "Chaque shop bénéficie d'une instance isolée et sécurisée, garantissant une intégrité totale des données.",
            icon: <Lock className="w-8 h-8 text-emerald-500" />,
            tag: "Architecture"
        },
        {
            title: "Omnicanalité Totale",
            description: "Synchronisation atomique entre vos points de vente physiques et votre déploiement digital.",
            icon: <Globe className="w-8 h-8 text-emerald-500" />,
            tag: "Souveraineté"
        },
        {
            title: "Analytics Prédictifs",
            description: "Transformez vos flux de ventes en insights stratégiques pour piloter votre croissance réelle.",
            icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
            tag: "Performance"
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-hidden pb-40 selection:bg-emerald-500 selection:text-black">
            <SEO
                title="Solution SaaS | Green IA Infrastructure Cloud"
                description="Découvrez l'infrastructure la plus avancée du marché pour le retail CBD. Centralisez votre gestion, automatisez vos ventes avec l'IA."
            />

            {/* ─── Elegant Hero Section ─── */}
            <section className="relative pt-60 pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse-slow" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />
                </div>

                <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-emerald-500 text-label"
                    >
                        <Zap className="w-4 h-4 animate-pulse" />
                        L'INFRASTRUCTURE DE RÉFÉRENCE POUR LE RETAIL CBD
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-display"
                    >
                        SOUVERAINETÉ <br />
                        <span className="text-emerald-500 font-light not-italic">TECHNOLOGIQUE.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-premium-body text-zinc-500 max-w-4xl mx-auto border-l-2 border-white/5 pl-10"
                    >
                        Green IA forge les standards de demain : automatisation, gestion multi-nodes et intelligence moléculaire pour les acteurs majeurs du CBD.
                    </motion.p>
                </div>
            </section>

            {/* ─── Pillars Section ─── */}
            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-32">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="group p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-700 relative overflow-hidden"
                            >
                                <div className="absolute -inset-10 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="mb-10 w-20 h-20 rounded-[2rem] bg-zinc-950 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-700 shadow-2xl relative z-10">
                                    {feature.icon}
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <span className="text-label text-zinc-700">{feature.tag}</span>
                                    <h3 className="text-2xl font-black italic tracking-tight uppercase text-white group-hover:text-emerald-500 transition-colors">{feature.title}</h3>
                                    <p className="text-xs text-zinc-600 leading-relaxed font-medium italic">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── AI Interface Deep Dive ─── */}
            <section className="py-60 px-6 bg-zinc-900/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
                    <div className="relative">
                        <div className="absolute -inset-40 bg-emerald-500/10 blur-[150px] rounded-full opacity-30 animate-pulse" />
                        <div className="relative bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 lg:p-16 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/10" />
                                <div className="ml-auto px-6 py-2 bg-emerald-500/10 rounded-xl text-label text-emerald-500 border border-emerald-500/20">Protocol Active</div>
                            </div>

                            <div className="space-y-10">
                                <div className="p-8 bg-white/[0.02] rounded-[2rem] rounded-tl-none border border-white/5 text-base text-zinc-500 italic font-medium">
                                    "Je cherche une solution pour mes troubles du sommeil, sans effet léthargique au réveil."
                                </div>
                                <div className="p-8 bg-emerald-500/5 rounded-[2rem] rounded-tr-none border border-emerald-500/10 text-base text-white font-medium ml-12 shadow-inner">
                                    <div className="flex items-center gap-3 mb-4 text-emerald-500 text-label">
                                        <Sparkles className="w-4 h-4" /> BUDTENDER ENGINE v6.0
                                    </div>
                                    "Pour une régulation circadienne optimale, je suggère la **CBN Deep Sleep Oil**. Sa concentration en Cannabinol interagit avec les récepteurs CB1 pour induire un repos profond, dissipé naturellement à l'aube."
                                </div>
                            </div>

                            <div className="mt-16 flex justify-center">
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [12, 48, 12] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                            className="w-2 bg-emerald-500/40 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-section">
                                VOTRE <span className="text-emerald-500 font-light not-italic">INTELLIGENCE</span>, <br />
                                VOS <span className="text-white opacity-40">STANDARDS.</span>
                            </h2>
                            <p className="text-premium-body border-l-2 border-white/5 pl-10 max-w-xl">
                                L'IA BudTender est un noyau décisionnel entraîné sur des banques de données génétiques, capable d'un conseil d'expert 24/7.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { t: "Orchestration Neutre", d: "Ajustez le ton et les priorités de recommandation selon votre positionnement d'élite." },
                                { t: "Intégrité des Flux", d: "Une connaissance absolue de vos inventaires pour des recommandations uniquement actionnables." },
                                { t: "Excavation de Data", d: "Captez les tendances de consommation moléculaires pour anticiper vos prochains stocks." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-start gap-8 p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-emerald-500/20 transition-all group duration-700 shadow-2xl"
                                >
                                    <div className="mt-1.5 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform" />
                                    <div className="space-y-2">
                                        <h4 className="text-white font-black uppercase text-sm tracking-widest italic group-hover:text-emerald-500 transition-colors">{item.t}</h4>
                                        <p className="text-zinc-500 text-xs leading-relaxed font-medium italic">{item.d}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Global Scalability ─── */}
            <section className="py-60 px-6 text-center relative">
                <div className="max-w-5xl mx-auto space-y-16">
                    <h2 className="text-display scale-75">
                        DÉPLOIEMENT <br /> <span className="text-emerald-500 font-light not-italic">INSTANTANÉ.</span>
                    </h2>
                    <p className="text-premium-body max-w-3xl mx-auto">
                        Oubliez la complexité. Chaque instance Green IA est isolée virtuellement, garantissant une montée en charge fluide et sécurisée.
                    </p>

                    <div className="relative py-32">
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-10 overflow-hidden pointer-events-none">
                            <div className="w-[150%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                            <div className="w-[150%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent rotate-12" />
                            <div className="w-[150%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent -rotate-12" />
                        </div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16">
                            {[
                                { icon: <Database />, title: "Isolation Atomique", label: "Multi-tenant logic" },
                                { icon: <ShieldCheck />, title: "Cryptage Militaire", label: "Protocoles AES-256" },
                                { icon: <Smartphone />, title: "Omnicanalité", label: "SaaS & POS Hybrid" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex flex-col items-center gap-8 group"
                                >
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-emerald-500 group-hover:border-emerald-500/30 group-hover:scale-110 transition-all duration-700 shadow-2xl group-hover:shadow-emerald-500/10">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-white font-black uppercase text-sm tracking-[0.3em] italic">{item.title}</h4>
                                        <p className="text-label text-zinc-700">{item.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Grand Finale CTA ─── */}
            <section className="py-40 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto p-16 md:p-32 bg-white text-black rounded-[5rem] text-center relative overflow-hidden group shadow-[0_100px_200px_rgba(255,255,255,0.05)]"
                >
                    <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-in-out" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/20 blur-[150px] rounded-full -mr-300 -mt-300 pointer-events-none" />

                    <div className="relative z-10 space-y-16">
                        <h2 className="text-display scale-75 text-black">
                            REJOIGNEZ <br /> <span className="font-light not-italic">L'ÉLITE DU CBD.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/ouvrir-boutique"
                                    className="px-20 py-10 bg-black text-white font-black uppercase tracking-[0.4em] text-xs rounded-[2.5rem] shadow-3xl flex items-center gap-4 hover:gap-8 transition-all"
                                >
                                    ACTIVER L'ESSAI <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/contact"
                                    className="px-20 py-10 border-2 border-black/10 text-black font-black uppercase tracking-[0.4em] text-xs rounded-[2.5rem] hover:bg-black hover:text-white transition-all italic"
                                >
                                    DEMANDER UNE SESSION
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
