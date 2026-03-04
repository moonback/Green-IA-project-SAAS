import { motion } from "motion/react";
import { Send, MapPin, Clock, Phone, Mail, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import SEO from "../components/SEO";
import { useShopStore } from "../store/shopStore";
import { useSettingsStore } from "../store/settingsStore";
import { useShopPath } from "../hooks/useShopPath";
import { useShopContent } from "../hooks/useShopContent";

/**
 * ShopContact — Page contact propre au shop actuel.
 * Affiche les informations de contact du shop et un formulaire de message.
 */
export default function ShopContact() {
    const { currentShop } = useShopStore();
    const settings = useSettingsStore((s) => s.settings);
    const shopPath = useShopPath();
    const content = useShopContent();
    const [sent, setSent] = useState(false);

    if (!currentShop) return null;

    const primaryColor = currentShop.settings?.primary_color || '#10b981';
    const shopName = currentShop.name || 'Boutique CBD';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-32 font-sans selection:bg-emerald-500 selection:text-black">
            <SEO
                title={`Contact — ${shopName}`}
                description={`Nous contacter. Retrouvez toutes les informations de ${shopName} : adresse, horaires, téléphone et formulaire de contact.`}
            />

            {/* Elegant Hero Section */}
            <section className="relative pt-60 pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={content.contact.hero_image}
                        className="w-full h-full object-cover opacity-10 filter grayscale contrast-125"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/80 to-zinc-950" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] rounded-full blur-[150px] opacity-10 animate-pulse-slow" style={{ background: primaryColor }} />
                </div>

                <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-label"
                        style={{ color: primaryColor }}
                    >
                        <MessageCircle className="w-4 h-4 animate-pulse" />
                        {content.contact.badge}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-display"
                    >
                        {content.contact.hero_title_line1} <br />
                        <span className="font-light not-italic" style={{ color: primaryColor }}>{content.contact.hero_title_line2}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-premium-body text-zinc-500 max-w-2xl mx-auto border-l-2 border-white/5 pl-10"
                    >
                        {content.contact.hero_subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Main Grid */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                    {/* Info Cards (Left) */}
                    <div className="lg:col-span-5 space-y-10">
                        {settings.store_address && (
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-700 group relative overflow-hidden"
                            >
                                <div className="absolute -inset-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="flex items-start gap-8 relative z-10">
                                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-white/20 transition-all duration-700 shadow-2xl">
                                        <MapPin className="w-8 h-8" style={{ color: primaryColor }} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black italic tracking-tight uppercase group-hover:text-white transition-colors">Notre Sanctuaire</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">{settings.store_address}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {settings.store_hours && (
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-700 group relative overflow-hidden"
                            >
                                <div className="absolute -inset-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="flex items-start gap-8 relative z-10">
                                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-white/20 transition-all duration-700 shadow-2xl">
                                        <Clock className="w-8 h-8" style={{ color: primaryColor }} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black italic tracking-tight uppercase group-hover:text-white transition-colors">Cycles de Disponibilité</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed whitespace-pre-line font-medium italic">{settings.store_hours}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {settings.store_phone && (
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-700 group relative overflow-hidden"
                            >
                                <div className="absolute -inset-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="flex items-start gap-8 relative z-10">
                                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-white/20 transition-all duration-700 shadow-2xl">
                                        <Phone className="w-8 h-8" style={{ color: primaryColor }} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-black italic tracking-tight uppercase group-hover:text-white transition-colors">Liaison Directe</h3>
                                        <a href={`tel:${settings.store_phone.replace(/\s/g, '')}`} className="text-zinc-400 text-lg hover:text-white transition-colors font-medium italic tracking-widest">
                                            {settings.store_phone}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Visit CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-12 rounded-[4rem] border border-white/5 relative overflow-hidden shadow-2xl shadow-black/50"
                        >
                            <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-3xl" />
                            <div className="absolute -inset-10 bg-gradient-to-br from-white/5 to-transparent opacity-30" />

                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-950 border border-white/5 flex items-center justify-center text-emerald-500 shadow-2xl">
                                    <Sparkles className="w-8 h-8 animate-pulse" style={{ color: primaryColor }} />
                                </div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tight">{content.contact.budtender_box_title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed italic font-medium">
                                    {content.contact.budtender_box_desc}
                                </p>
                                <div className="flex items-center gap-4 text-label" style={{ color: primaryColor }}>
                                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    Widget Actif en bas à droite
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 lg:p-20 space-y-16 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] opacity-10 -mr-32 -mt-32" style={{ background: primaryColor }} />

                            <div className="space-y-6 relative z-10">
                                <h2 className="text-section">
                                    {content.contact.form_title.split(' ').slice(0, -1).join(' ')} <br />
                                    <span className="font-light not-italic" style={{ color: primaryColor }}>{content.contact.form_title.split(' ').slice(-1)}</span>
                                </h2>
                                <p className="text-premium-body border-l-2 border-white/5 pl-8 max-w-lg">{content.contact.form_subtitle}</p>
                            </div>

                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-24 text-center space-y-8 relative z-10"
                                >
                                    <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center border border-white/10 bg-white/5 shadow-2xl" style={{ borderColor: `${primaryColor}30` }}>
                                        <Send className="w-10 h-10 animate-bounce" style={{ color: primaryColor }} />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black italic uppercase tracking-tight">{content.contact.success_title}</h3>
                                        <p className="text-zinc-500 text-sm font-medium italic">{content.contact.success_desc}</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-label text-zinc-700 ml-8">Identité</label>
                                            <input
                                                type="text"
                                                placeholder="Votre nom"
                                                required
                                                className="w-full bg-black/40 border border-white/5 rounded-[2rem] px-8 py-6 text-white placeholder-zinc-800 focus:outline-none focus:border-white/20 transition-all italic font-medium"
                                                onFocus={(e) => e.target.style.borderColor = primaryColor}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-label text-zinc-700 ml-8">Vecteur Email</label>
                                            <input
                                                type="email"
                                                placeholder="votre@email.fr"
                                                required
                                                className="w-full bg-black/40 border border-white/5 rounded-[2rem] px-8 py-6 text-white placeholder-zinc-800 focus:outline-none focus:border-white/20 transition-all italic font-medium"
                                                onFocus={(e) => e.target.style.borderColor = primaryColor}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-label text-zinc-700 ml-8">Nature du Message</label>
                                        <div className="relative group">
                                            <select
                                                className="w-full bg-black/40 border border-white/5 rounded-[2rem] px-8 py-6 text-zinc-600 focus:outline-none transition-all appearance-none cursor-pointer italic font-medium"
                                            >
                                                <option>Question sur un produit</option>
                                                <option>Conseil Personnalisé</option>
                                                <option>État d'une commande</option>
                                                <option>Feedback Expérience</option>
                                                <option>Autre Requête</option>
                                            </select>
                                            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-800 group-hover:text-white transition-colors">
                                                <ArrowRight className="w-5 h-5 rotate-90" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-label text-zinc-700 ml-8">Détails de la Requête</label>
                                        <textarea
                                            rows={5}
                                            placeholder="Votre message..."
                                            required
                                            className="w-full bg-black/40 border border-white/5 rounded-[3rem] px-10 py-8 text-white placeholder-zinc-800 focus:outline-none transition-all resize-none italic font-medium"
                                            onFocus={(e) => e.target.style.borderColor = primaryColor}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full font-black uppercase tracking-[0.4em] py-8 rounded-[2.5rem] flex items-center justify-center gap-6 text-black transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden italic"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-500" />
                                        <span className="relative z-10 flex items-center gap-4 text-[11px]">
                                            <Send className="w-5 h-5" />
                                            {content.contact.send_button}
                                        </span>
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
