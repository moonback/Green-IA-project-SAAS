import { motion } from "motion/react";
import { Check, Zap, Sparkles, Store, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PLANS = [
    {
        name: "Starter",
        price: "49",
        description: "Parfait pour lancer votre boutique CBD physique.",
        features: [
            "Logiciel de Caisse (POS)",
            "Gestion d'inventaire CBD",
            "Boutique en ligne basique",
            "Support humain inclus",
            "1 Point de vente"
        ],
        cta: "Commencer gratuitement",
        highlight: false
    },
    {
        name: "Croissance IA",
        price: "129",
        description: "Pour les boutiques qui veulent automatiser et scaler.",
        features: [
            "IA Conseiller (BudTender)",
            "Multi-boutiques synchronisé",
            "Analytics avancés",
            "Programme fidélité IA",
            "Support prioritaire CBD",
            "Support humain inclus",
        ],
        cta: "Essayer la puissance IA",
        highlight: true
    },
    {
        name: "Empire Retail",
        price: "299",
        description: "Pour les réseaux de franchises et multi-boutiques complexes.",
        features: [
            "Tout le pack Croissance",
            "Multi-Boutiques illimité",
            "API de personnalisation",
            "Account Manager dédié",
            "Infrastructure dédiée (High Priority)",
            "Support humain inclus"
        ],
        cta: "Contacter le service Pro",
        highlight: false
    }
];

export default function PricingSection() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-neon/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 space-y-6">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-green-neon font-black uppercase text-[10px] tracking-[0.4em]"
                    >
                        Sans engagement – Résiliation en 1 clic
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-black text-white"
                    >
                        Investissez dans <br /> votre <span className="text-green-neon italic">réussite</span>.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PLANS.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-10 rounded-[3rem] border transition-all duration-500 group ${plan.highlight
                                ? "bg-zinc-900 border-green-neon/40 shadow-[0_0_50px_rgba(57,255,20,0.1)] scale-105 z-10"
                                : "bg-zinc-950/50 border-white/10 hover:border-white/20"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-neon text-black text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-[0_4px_15px_rgba(57,255,20,0.5)]">
                                    Recommandé
                                </div>
                            )}

                            <div className="mb-10 text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-zinc-500 mb-8">{plan.description}</p>
                                <div className="flex items-end justify-center gap-1">
                                    <span className="text-5xl font-black text-white">{plan.price}€</span>
                                    <span className="text-zinc-600 font-bold mb-1 uppercase text-[10px] tracking-widest">/ mois</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-12">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex gap-3 items-start">
                                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? "bg-green-neon/20 text-green-neon" : "bg-zinc-900 text-zinc-500"}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-sm text-zinc-400">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to={plan.name === "Empire Retail" ? "/contact" : "/ouvrir-boutique"}
                                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 ${plan.highlight
                                    ? "bg-green-neon text-black hover:scale-[1.02] shadow-2xl"
                                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                    }`}
                            >
                                {plan.cta}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
