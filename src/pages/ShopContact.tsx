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

    const primaryColor = currentShop.settings?.primary_color || '#39ff14';
    const shopName = currentShop.name || 'Boutique CBD';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: envoyer le message via Supabase Edge Function
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            <SEO
                title={`Contact — ${shopName}`}
                description={`Nous contacter. Retrouvez toutes les informations de ${shopName} : adresse, horaires, téléphone et formulaire de contact.`}
            />

            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={content.contact.hero_image}
                        className="w-full h-full object-cover opacity-20 filter grayscale"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950" />
                </div>

                <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.2em]"
                        style={{ color: primaryColor }}
                    >
                        <MessageCircle className="w-4 h-4" />
                        {content.contact.badge}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-none"
                    >
                        {content.contact.hero_title_line1} <br />
                        <span className="italic" style={{ color: primaryColor }}>{content.contact.hero_title_line2}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 max-w-xl mx-auto font-light"
                    >
                        {content.contact.hero_subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Main Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Info Cards (Left) */}
                    <div className="lg:col-span-5 space-y-6">
                        {settings.store_address && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all group"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${primaryColor}15` }}>
                                        <MapPin className="w-6 h-6" style={{ color: primaryColor }} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Notre Adresse</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{settings.store_address}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {settings.store_hours && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all group"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${primaryColor}15` }}>
                                        <Clock className="w-6 h-6" style={{ color: primaryColor }} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Horaires d'ouverture</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{settings.store_hours}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {settings.store_phone && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all group"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${primaryColor}15` }}>
                                        <Phone className="w-6 h-6" style={{ color: primaryColor }} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">Téléphone</h3>
                                        <a href={`tel:${settings.store_phone.replace(/\s/g, '')}`} className="text-zinc-400 text-sm hover:text-white transition-colors">
                                            {settings.store_phone}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Visit CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-3xl border border-white/10 relative overflow-hidden"
                            style={{ backgroundColor: `${primaryColor}08` }}
                        >
                            <div className="relative z-10 space-y-4">
                                <Sparkles className="w-8 h-8" style={{ color: primaryColor }} />
                                <h3 className="text-xl font-black">{content.contact.budtender_box_title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {content.contact.budtender_box_desc}
                                </p>
                                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
                                    Cliquez sur le widget en bas à droite ✦
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 lg:p-12 space-y-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20" style={{ background: primaryColor }} />

                            <div className="space-y-3 relative z-10">
                                <h2 className="text-3xl font-serif font-black">
                                    {content.contact.form_title.split(' ').slice(0, -1).join(' ')} <br />
                                    <span className="italic" style={{ color: primaryColor }}>{content.contact.form_title.split(' ').slice(-1)}</span>
                                </h2>
                                <p className="text-zinc-500 text-sm">{content.contact.form_subtitle}</p>
                            </div>

                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-16 text-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                                        <Send className="w-7 h-7" style={{ color: primaryColor }} />
                                    </div>
                                    <h3 className="text-2xl font-bold">{content.contact.success_title}</h3>
                                    <p className="text-zinc-400 text-sm">{content.contact.success_desc}</p>
                                </motion.div>
                            ) : (
                                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-3">Nom</label>
                                            <input
                                                type="text"
                                                placeholder="Votre nom"
                                                required
                                                className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 text-white placeholder-zinc-700 focus:outline-none transition-all"
                                                style={{ borderColor: 'transparent' }}
                                                onFocus={(e) => e.target.style.borderColor = primaryColor}
                                                onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-3">Email</label>
                                            <input
                                                type="email"
                                                placeholder="votre@email.fr"
                                                required
                                                className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 text-white placeholder-zinc-700 focus:outline-none transition-all"
                                                style={{ borderColor: 'transparent' }}
                                                onFocus={(e) => e.target.style.borderColor = primaryColor}
                                                onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-3">Sujet</label>
                                        <select
                                            className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-400 focus:outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option>Question sur un produit</option>
                                            <option>Demande de conseil personnalisé</option>
                                            <option>Problème avec une commande</option>
                                            <option>Suggestion ou retour</option>
                                            <option>Autre</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-3">Message</label>
                                        <textarea
                                            rows={5}
                                            placeholder="Votre message..."
                                            required
                                            className="w-full bg-black border border-zinc-800 rounded-3xl px-6 py-5 text-white placeholder-zinc-700 focus:outline-none transition-all resize-none"
                                            style={{ borderColor: 'transparent' }}
                                            onFocus={(e) => e.target.style.borderColor = primaryColor}
                                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full font-black uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-4 text-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        <Send className="w-5 h-5" />
                                        {content.contact.send_button}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
