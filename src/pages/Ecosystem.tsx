import { motion } from "motion/react";
import {
    ArrowRight,
    Globe,
    Cpu,
    Zap,
    ShieldCheck,
    Database,
    Layers,
    Webhook,
    Share2,
    Users,
    Store,
    Smartphone,
    CreditCard,
    MessageSquare,
    Network
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Ecosystem() {
    const integrations = [
        { name: "Viva Wallet", category: "Paiement", icon: <CreditCard className="w-5 h-5" />, status: "Natif" },
        { name: "Stripe", category: "Paiement", icon: <ShieldCheck className="w-5 h-5" />, status: "Certifié" },
        { name: "Shopify Sync", category: "E-commerce", icon: <Layers className="w-5 h-5" />, status: "Beta" },
        { name: "WooCommerce", category: "E-commerce", icon: <Layers className="w-5 h-5" />, status: "Bientôt" },
        { name: "WhatsApp Pro", category: "Support", icon: <MessageSquare className="w-5 h-5" />, status: "Natif" },
        { name: "Google Analytics", category: "Marketing", icon: <Zap className="w-5 h-5" />, status: "Natif" },
    ];

    const ecosystemNodes = [
        {
            title: "Marchands Connectés",
            desc: "Accédez à un réseau de boutiques certifiées et partagez vos stocks ou vos expériences.",
            icon: <Network className="w-10 h-10 text-green-neon" />,
            link: "/annuaire",
            linkText: "Voir l'annuaire"
        },
        {
            title: "API Développeurs",
            desc: "Construisez vos propres intégrations ou connectez vos outils existants via notre API REST.",
            icon: <Webhook className="w-10 h-10 text-green-neon" />,
            link: "/contact",
            linkText: "Documentation"
        },
        {
            title: "IA BudTender Core",
            desc: "Le cerveau de votre boutique, capable d'évoluer et d'apprendre des tendances du marché.",
            icon: <Cpu className="w-10 h-10 text-green-neon" />,
            link: "/solution",
            linkText: "Découvrir l'IA"
        }
    ];

    return (
        <div className="min-h-screen bg-brand-950 text-white overflow-hidden selection:bg-green-neon selection:text-black">
            <SEO
                title="L'Écosystème Green IA | Intégrations & Partenaires"
                description="Explorez l'écosystème complet Green IA : intégrations natives, API développeurs, réseau de marchands et technologie IA."
            />

            {/* ─── Hero Section ─── */}
            <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-40 px-4">
                {/* Background Visuals */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-green-neon/5 rounded-full blur-[200px] animate-pulse" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-6"
                    >
                        <Share2 className="w-4 h-4 text-green-neon" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Architecture Ouverte & Connectée</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter leading-[0.85] uppercase"
                    >
                        UN UNIVERS <br />
                        <span className="text-green-neon italic glow-green">SYNCHRONISÉ.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto text-lg md:text-2xl text-zinc-400 font-light leading-relaxed"
                    >
                        De l'encaissement physique aux ventes digitales, Green IA connecte chaque aspect de votre retail CBD dans une infrastructure unifiée et évolutive.
                    </motion.p>
                </div>
            </section>

            {/* ─── Core Nodes ─── */}
            <section className="py-32 px-5 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ecosystemNodes.map((node, i) => (
                        <motion.div
                            key={node.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-10 rounded-[3rem] bg-zinc-900 shadow-2xl border border-white/[0.05] hover:border-green-neon/30 hover:bg-zinc-800/50 transition-all duration-500 flex flex-col items-center text-center"
                        >
                            <div className="mb-10 w-24 h-24 rounded-[2rem] bg-black flex items-center justify-center border border-white/5 shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                {node.icon}
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-6 uppercase tracking-tight">{node.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed font-light mb-10">{node.desc}</p>
                            <Link
                                to={node.link}
                                className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 group-hover:text-green-neon transition-colors"
                            >
                                {node.linkText} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── Integrations Grid ─── */}
            <section className="py-40 px-5 bg-zinc-900/30">
                <div className="max-w-7xl mx-auto text-center space-y-24">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-6xl font-serif font-black text-white">INTÉGRATIONS <br /><span className="text-green-neon italic">NATIVES.</span></h2>
                        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Connectez les outils que vous utilisez déjà en un clic.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {integrations.map((app, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-6 rounded-3xl bg-zinc-950 border border-white/5 hover:border-green-neon/20 transition-all group"
                            >
                                <div className="mb-4 w-12 h-12 mx-auto rounded-2xl bg-white/[0.03] flex items-center justify-center text-zinc-500 group-hover:text-green-neon group-hover:scale-110 transition-all">
                                    {app.icon}
                                </div>
                                <h4 className="text-xs font-black text-white uppercase tracking-wider truncate mb-1">{app.name}</h4>
                                <div className="flex flex-col gap-1 items-center">
                                    <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{app.category}</span>
                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${app.status === 'Natif' ? 'bg-green-neon/10 text-green-neon' : 'bg-white/5 text-zinc-500'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-12">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-white hover:text-green-neon transition-colors"
                        >
                            <div className="w-12 h-px bg-green-neon/40" />
                            Suggérer une intégration
                            <div className="w-12 h-px bg-green-neon/40" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Developer CTA ─── */}
            <section className="py-40 px-5">
                <div className="max-w-7xl mx-auto px-10 py-24 rounded-[4rem] bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-neon/5 blur-[120px] rounded-full group-hover:bg-green-neon/10 transition-all duration-1000" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-green-neon/5 border border-green-neon/20 text-green-neon text-[10px] font-black uppercase tracking-widest">
                                <Webhook className="w-4 h-4" />
                                Pour les Développeurs
                            </div>
                            <h2 className="text-5xl md:text-7xl font-serif font-black text-white tracking-tighter leading-none">
                                UNE API <br /> <span className="text-zinc-500">SANS LIMITES.</span>
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed font-light">
                                Intégrez vos données de vente, vos clients et vos stocks dans vos applications personnalisées.
                                Notre API REST sécurisée vous offre un contrôle total sur votre écosystème commercial.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/contact" className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-green-neon transition-all">
                                    Accéder au SDK
                                </Link>
                                <Link to="/contact" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all">
                                    Support Dev
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 font-mono text-[10px] leading-relaxed text-zinc-400 overflow-hidden shadow-2xl">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/30" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-green-neon/60">// Synchronize stock across all nodes</p>
                                    <p className="text-white">POST /api/v1/sync/inventory</p>
                                    <p>Authorization: Bearer {'<YOUR_TOKEN>'}</p>
                                    <p>{'{'}</p>
                                    <p className="pl-4">"shop_id": "8b9cad0e1f20",</p>
                                    <p className="pl-4">"action": "distribute",</p>
                                    <p className="pl-4 text-green-neon">"logic": "smart_allocation_v4"</p>
                                    <p>{'}'}</p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                                    <span className="uppercase tracking-widest font-black text-zinc-600">Response 200 OK</span>
                                    <Zap className="w-4 h-4 text-green-neon animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Final Network Section ─── */}
            <section className="py-40 px-5 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                    <h2 className="text-5xl md:text-8xl font-serif font-black text-white uppercase italic leading-none">
                        REJOIGNEZ <br /> <span className="text-green-neon">LE RÉSEAU.</span>
                    </h2>
                    <p className="text-zinc-500 text-xl font-light">
                        Plus qu'une solution logicielle, Green IA est un écosystème en pleine croissance
                        qui transforme l'industrie du CBD.
                    </p>
                    <div className="pt-10">
                        <Link
                            to="/ouvrir-boutique"
                            className="inline-flex items-center gap-4 bg-green-neon text-black font-black uppercase tracking-widest text-sm px-14 py-6 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(57,255,20,0.4)]"
                        >
                            Devenir Partenaire
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
