import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Rocket, Code, Server, Bot, Mail, ShieldCheck, ArrowRight, Euro, ShoppingBag } from 'lucide-react';

export default function ProjectForSaleModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the popup (optional, but good UX)
        // For now we'll show it every time or maybe use sessionStorage
        const hasSeenPopup = sessionStorage.getItem('hasSeenForSalePopup');
        if (!hasSeenPopup) {
            // Delay slightly for better effect
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenForSalePopup', 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop with strong blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="relative w-full max-w-4xl bg-[#09090b] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(57,255,20,0.15)] flex flex-col md:flex-row"
                    >
                        {/* Left side / Image & Brand */}
                        <div className="md:w-2/5 relative p-8 flex flex-col justify-between overflow-hidden bg-black/50 border-r border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-neon/20 via-transparent to-transparent opacity-50" />
                            <div className="absolute -left-20 -top-20 w-64 h-64 bg-green-neon/20 blur-[100px] rounded-full" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-neon/10 border border-green-neon/20 text-green-neon text-[10px] font-black uppercase tracking-widest mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" />
                                    Opportunité Unique
                                </div>

                                <h2 className="text-4xl md:text-5xl font-serif font-black text-white leading-tight mb-4">
                                    Green IA <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">SaaS</span>
                                </h2>

                                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                                    L'écosystème SaaS révolutionnaire conçu pour automatiser et digitaliser le retail CBD physique et en ligne.
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 hidden md:block">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <p className="text-xs text-zinc-300 italic">"Une architecture multi-tenant robuste, un design ultra-premium, prête au déploiement immédiat."</p>
                                </div>
                            </div>
                        </div>

                        {/* Right side / Content details */}
                        <div className="md:w-3/5 p-8 relative flex flex-col justify-center">
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Ce projet complet est <span className="text-green-neon underline decoration-green-neon/30 underline-offset-4">à vendre</span></h3>
                                    <p className="text-sm text-zinc-400">La plateforme clef-en-main inclut la totalité du code source, la base de données, l'infrastructure SaaS et le design exclusif.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: <Server className="w-5 h-5" />, title: "Architecture SaaS", desc: "Multi-tenant (Boutiques isolées), Postgres RLS" },
                                        { icon: <Bot className="w-5 h-5" />, title: "IA BudTender", desc: "Assistant Gemini Pro intégré au coeur du shop" },
                                        { icon: <ShieldCheck className="w-5 h-5" />, title: "Système de Caisse", desc: "Web POS (Point of Sale) connecté au stock" },
                                        { icon: <Code className="w-5 h-5" />, title: "Code Source", desc: "React/Vite, Zustand, Supabase, Tailwind, Node" }
                                    ].map((feature, idx) => (
                                        <div key={idx} className="flex gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                                            <div className="text-green-neon mt-0.5 shrink-0">{feature.icon}</div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white mb-1">{feature.title}</h4>
                                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center">
                                    <a
                                        href="mailto:contact@green-ia.com"
                                        className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-neon text-black text-sm font-black uppercase tracking-widest rounded-xl hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(57,255,20,0.2)]"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Faire une offre
                                    </a>
                                    <button
                                        onClick={handleClose}
                                        className="w-full sm:w-auto px-6 py-4 rounded-xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all"
                                    >
                                        Explorer la Démo
                                    </button>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
