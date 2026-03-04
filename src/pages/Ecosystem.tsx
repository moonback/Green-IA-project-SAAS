import { motion } from "motion/react";
import {
    ArrowRight,
    Cpu,
    Zap,
    ShieldCheck,
    Layers,
    Webhook,
    MessageSquare,
    Network,
    Lock,
    Globe,
    Building2,
    Check
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Ecosystem() {
    const integrations = [
        { name: "Viva Wallet", category: "Paiement", icon: <ShieldCheck className="w-5 h-5 text-zinc-400" />, status: "Natif" },
        { name: "Stripe", category: "Paiement", icon: <Lock className="w-5 h-5 text-zinc-400" />, status: "Certifié" },
        { name: "Shopify", category: "E-commerce", icon: <Globe className="w-5 h-5 text-zinc-400" />, status: "Beta" },
        { name: "WooCommerce", category: "E-commerce", icon: <Layers className="w-5 h-5 text-zinc-400" />, status: "En cours" },
        { name: "WhatsApp Pro", category: "Support", icon: <MessageSquare className="w-5 h-5 text-zinc-400" />, status: "Natif" },
        { name: "HubSpot", category: "CRM", icon: <Building2 className="w-5 h-5 text-zinc-400" />, status: "À venir" },
    ];

    const ecosystemNodes = [
        {
            title: "Marchands Connectés",
            desc: "Accédez à un réseau de boutiques CBD certifiées, partagez des données, synchronisez stocks et ventes.",
            icon: <Network className="w-6 h-6 text-white" strokeWidth={1.5} />,
            link: "/annuaire",
            linkText: "Explorer le réseau"
        },
        {
            title: "Développeurs & Intégrateurs",
            desc: "Créez des applications ou connecteurs autour de Green IA grâce à une API REST documentée.",
            icon: <Webhook className="w-6 h-6 text-white" strokeWidth={1.5} />,
            link: "/contact",
            linkText: "Voir la documentation"
        },
        {
            title: "IA BudTender Core",
            desc: "Le moteur d'intelligence CBD qui alimente recommandations, ventes assistées et personnalisation.",
            icon: <Cpu className="w-6 h-6 text-white" strokeWidth={1.5} />,
            link: "/solution",
            linkText: "Découvrir l'IA"
        }
    ];

    return (
        <div className="min-h-screen bg-brand-950 text-white overflow-hidden font-sans selection:bg-green-neon selection:text-black">
            <SEO
                title="L'Écosystème CBD Green IA | API & Réseau"
                description="L'écosystème CBD qui connecte vente, données et intelligence. Une infrastructure unifiée pour les professionnels du retail CBD."
            />

            {/* ─── Hero Section ─── */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/ecosystem-hero-bg.png"
                        alt="Ecosystème Cloud CBD"
                        className="w-full h-full object-cover opacity-80 scale-105 grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-950/95 via-brand-950/70 to-brand-950" />
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
                            Une plateforme ouverte et connectée
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.1] mb-6">
                            L'écosystème CBD qui connecte <br />vente, données et <span className="text-green-neon italic font-light drop-shadow-[0_0_15px_rgba(76,255,0,0.3)]">intelligence.</span>
                        </h1>
                        <p className="max-w-2xl text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-10">
                            Une infrastructure unifiée où boutiques, partenaires et développeurs évoluent de manière sécurisée sur une même base technologique.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full sm:w-auto">
                            <Link to="/ouvrir-boutique" className="bg-green-neon text-black font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 group hover:bg-white transition-colors text-sm sm:text-base">
                                Devenir partenaire <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/contact" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center transition-colors backdrop-blur-md text-sm sm:text-base">
                                Documentation API
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Acteurs de l'écosystème ─── */}
            <section className="py-24 px-4 bg-zinc-950 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                        {ecosystemNodes.map((node, i) => (
                            <motion.div
                                key={node.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-green-neon/30 transition-all flex flex-col h-full"
                            >
                                <div className="mb-6 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                                    {node.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{node.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed font-normal flex-grow mb-8 line-clamp-2">{node.desc}</p>
                                <Link
                                    to={node.link}
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-green-neon transition-colors"
                                >
                                    {node.linkText} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Intégrations Natives ─── */}
            <section className="py-24 px-4 bg-brand-950 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-serif font-black mb-4">Connecté à vos outils, <br /><span className="italic text-zinc-400 font-light">dès le premier jour.</span></h2>
                        <p className="text-zinc-400 text-lg">Branchez Green IA à votre stack existante sans développement complexe.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {integrations.map((app, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-white/[0.02] transition-colors flex flex-col items-center text-center"
                            >
                                <div className="mb-4">
                                    {app.icon}
                                </div>
                                <h4 className="text-sm font-bold text-white mb-2">{app.name}</h4>
                                <div className="space-y-1.5 flex flex-col items-center">
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{app.category}</span>
                                    <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ${app.status === 'Natif' ? 'bg-green-neon/10 text-green-neon' : app.status === 'Certifié' ? 'bg-white/10 text-white' : 'bg-transparent border border-white/10 text-zinc-500'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Developer API ─── */}
            <section className="py-24 px-4 bg-zinc-950 relative border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Code Block */}
                            <div className="bg-[#0D0D11] border border-white/10 rounded-2xl p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed text-zinc-400 shadow-2xl relative w-full lg:w-[110%] z-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                    <span className="ml-auto text-[10px] text-zinc-600">sync.ts</span>
                                </div>
                                <div className="space-y-1.5 overflow-x-auto pb-4">
                                    <p className="text-zinc-600">/* Retrieve real-time inventory for a specific CBD SKU */</p>
                                    <p className="text-blue-400 mt-2">const</p> <span className="text-white">fetchInventory</span> <span className="text-blue-400">=</span> <span className="text-purple-400">async</span> () <span className="text-blue-400">=&gt;</span> {'{'}
                                    <p className="pl-4"><span className="text-blue-400">const</span> response <span className="text-blue-400">= await</span> <span className="text-green-200">fetch</span>(<span className="text-green-neon">'https://api.green-ia.com/v1/inventory/sku_cbd_01'</span>, {'{'}</p>
                                    <p className="pl-8">headers: {'{'}</p>
                                    <p className="pl-12"><span className="text-green-neon">'Authorization'</span>: <span className="text-green-neon">`Bearer ${'{'}API_KEY{'}'}`</span></p>
                                    <p className="pl-8">{'}'}</p>
                                    <p className="pl-4">{'}'});</p>
                                    <p className="pl-4 mt-2"><span className="text-blue-400">if</span> (<span className="text-blue-400">!</span>response.ok) <span className="text-blue-400">throw new</span> <span className="text-yellow-200">Error</span>(<span className="text-green-neon">'API Sync Failed'</span>);</p>
                                    <p className="pl-4 mt-2"><span className="text-blue-400">return</span> response.<span className="text-white">json</span>();</p>
                                    <p>{'}'};</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 leading-[1.1]">
                                    Une API conçue pour construire, <span className="text-zinc-400 italic font-light">pas bricoler.</span>
                                </h2>
                                <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-normal">
                                    Accédez aux ventes, clients, stocks et événements en temps réel. Créez vos propres outils métier ou connectez Green IA de façon invisible à vos systèmes existants.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    "API REST sécurisée & scalable",
                                    "Webhooks temps réel sur événements de vente",
                                    "Gestion fine des droits d'accès administratifs",
                                    "Architecture Multi-boutiques gérée nativement"
                                ].map((bullet, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Check className="w-4 h-4 text-green-neon shrink-0" />
                                        <span className="text-sm font-medium text-white">{bullet}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/contact" className="bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors text-sm text-center">
                                    Accéder au SDK
                                </Link>
                                <Link to="/contact" className="bg-transparent border border-white/20 text-white font-bold px-6 py-3 rounded-full hover:bg-white/5 transition-colors text-sm text-center">
                                    Support développeur
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Final Network Section ─── */}
            <section className="py-24 px-4 bg-gradient-to-t from-brand-950 to-zinc-950 relative overflow-hidden text-center">
                <div className="max-w-3xl mx-auto relative z-10 px-6 py-16 bg-zinc-900/40 border border-white/5 rounded-3xl backdrop-blur-sm">
                    <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6">
                        Rejoignez un <span className="text-green-neon italic font-light">réseau CBD</span> en pleine expansion.
                    </h2>
                    <p className="text-zinc-400 text-base md:text-lg font-normal mb-10 max-w-2xl mx-auto">
                        Green IA n'est pas qu'un simple logiciel de caisse. C'est une infrastructure partagée qui standardise, sécurise et accélère directement l'industrie légale du CBD.
                    </p>
                    <Link
                        to="/ouvrir-boutique"
                        className="inline-flex items-center gap-2 bg-green-neon text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors text-sm sm:text-base"
                    >
                        Devenir partenaire Green IA
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
