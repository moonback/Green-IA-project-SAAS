import { motion } from 'framer-motion';
import { Mail, Star, HelpCircle, ShieldCheck, Zap, Heart, Instagram, Send, Plus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// --- NEWSLETTER SECTION ---
export function NewsletterSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-5xl mx-auto relative rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/5 p-12 md:p-20 text-center space-y-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-neon/5 blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px]" />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                    <Mail className="w-3 h-3" />
                    {settings?.badge || "Restez Informé"}
                </div>

                <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-none text-white">
                    {settings?.title ? settings.title : <>Rejoignez le <span className="italic" style={{ color: primaryColor }}>Cercle Privé.</span></>}
                </h2>

                <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-light">
                    {settings?.subtitle || "Recevez nos nouveautés, promotions exclusives et conseils BudTender directement dans votre boîte mail."}
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="votre@email.com"
                        className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-neon/50 transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-10 py-4 rounded-2xl font-black text-black transition-transform hover:scale-105 flex items-center justify-center gap-2"
                        style={{ backgroundColor: primaryColor }}
                    >
                        {settings?.cta_text || "S'inscrire"}
                        <Send className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Zéro spam. Désinscription en 1 clic.</p>
            </div>
        </section>
    );
}

// --- TESTIMONIALS SECTION ---
export function TestimonialsSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    const testimonials = settings?.testimonials || [
        { name: "Marc D.", role: "Client Fidèle", text: "La qualité du CBD est exceptionnelle. Le BudTender IA m'a aidé à trouver exactement ce qu'il me fallait pour mes insomnies." },
        { name: "Sophie L.", role: "Utilisatrice Occasionnelle", text: "Livraison ultra-rapide et emballage soigné. Je recommande les fleurs de la gamme Green IA !" },
        { name: "Thomas R.", role: "Expert", text: "Le meilleur rapport qualité-prix du marché. On sent que les produits sont sélectionnés avec soin." }
    ];

    return (
        <section className="py-24 px-4 bg-zinc-900/20">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif font-black">
                        {settings?.title ? settings.title : <>Ce que disent <span style={{ color: primaryColor }}>nos clients</span></>}
                    </h2>
                    <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-black border border-white/5 p-8 rounded-[2.5rem] relative group"
                        >
                            <div className="absolute top-8 right-8 text-zinc-800 group-hover:text-green-neon transition-colors">
                                <Heart className="w-8 h-8 fill-current" />
                            </div>
                            <p className="text-lg text-zinc-300 font-light italic leading-relaxed mb-8">"{t.text}"</p>
                            <div>
                                <h4 className="font-bold text-white uppercase tracking-widest text-sm">{t.name}</h4>
                                <p className="text-xs text-zinc-600 font-medium">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- FAQ SECTION ---
export function FAQSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = settings?.faqs || [
        { q: "Quels sont vos délais de livraison ?", a: "Nous livrons en 24h/48h partout en France. Pour les commandes locales, nous proposons également le Click & Collect." },
        { q: "Vos produits sont-ils légaux ?", a: "Oui, tous nos produits sont conformes à la législation européenne avec un taux de THC inférieur à 0,3%." },
        { q: "Comment utiliser le BudTender IA ?", a: "Il suffit de cliquer sur l'icône de l'assistant en bas de l'écran ou d'utiliser le questionnaire personnalisé sur la page d'accueil." }
    ];

    return (
        <section className="py-24 px-4 font-sans">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto" style={{ color: primaryColor }}>
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl font-serif font-black">
                        {settings?.title ? settings.title : <>Questions <span style={{ color: primaryColor }}>Fréquentes</span></>}
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((f: any, idx: number) => (
                        <div key={idx} className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-white tracking-wide">{f.q}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} style={{ color: primaryColor }} />
                            </button>
                            {openIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="px-6 pb-6 text-zinc-400 font-light leading-relaxed"
                                >
                                    {f.a}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- FEATURES GRID SECTION ---
export function FeaturesGridSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    const features = settings?.features || [
        { icon: ShieldCheck, title: "Qualité Premium", desc: "Produits testés en laboratoire indépendant." },
        { icon: Zap, title: "Livraison Flash", desc: "Expédition le jour même pour toute commande avant 14h." },
        { icon: Heart, title: "Engagement Eco", desc: "Emballages biodégradables et culture responsable." },
        { icon: Star, title: "Service Client", desc: "Experts à votre écoute 7j/7 via chat ou téléphone." }
    ];

    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feat: any, idx: number) => (
                    <div key={idx} className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all text-center space-y-4 group">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                            {typeof feat.icon === 'string' ? <Star className="w-8 h-8" style={{ color: primaryColor }} /> : <feat.icon className="w-8 h-8" style={{ color: primaryColor }} />}
                        </div>
                        <h3 className="font-black uppercase tracking-widest text-sm text-white">{feat.title}</h3>
                        <p className="text-zinc-500 text-sm font-light leading-relaxed">{feat.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// --- INSTAGRAM FEED SECTION ---
export function InstagramFeedSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    const username = settings?.username || "green_IA_cbd";

    return (
        <section className="py-24 px-4 bg-black">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: primaryColor }}>
                            <Instagram className="w-4 h-4" />
                            {settings?.badge || "Suivez-nous"}
                        </div>
                        <h2 className="text-4xl font-serif font-black tracking-tight">
                            {settings?.title ? settings.title : <>Rejoignez la <span className="italic" style={{ color: primaryColor }}>Communauté.</span></>}
                        </h2>
                    </div>
                    <a
                        href={`https://instagram.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        @{username}
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        'photo-1596755094514-f87034a2612d',
                        'photo-1584467541268-b040f83be3fd',
                        'photo-1623912173595-31633534b868',
                        'photo-1606813907291-d86efa9b94db'
                    ].map((photoId, idx) => (
                        <div key={idx} className="relative aspect-square rounded-[2rem] overflow-hidden bg-zinc-900 group">
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                <Instagram className="w-8 h-8 text-white" />
                            </div>
                            <img
                                src={`https://images.unsplash.com/${photoId}?auto=format&fit=crop&q=80&w=400&h=400`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt="Insta Post"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://images.pexels.com/photos/6588619/pexels-photo-6588619.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`;
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- ANNOUNCEMENT BAR ---
export function AnnouncementBar({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    if (!settings?.text && !settings?.title) {
        settings = { ...settings, title: "Livraison offerte dès 50€ d'achat !" };
    }
    return (
        <div className="py-3 px-4 text-center relative overflow-hidden group" style={{ backgroundColor: primaryColor }}>
            <div className="absolute inset-0 bg-black/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black relative z-10">
                {settings?.title || settings?.text}
            </p>
        </div>
    );
}

// --- TRUST BADGES ---
export function TrustBadgesSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    const badges = settings?.badges || [
        { icon: ShieldCheck, label: "Paiement Sécurisé", desc: "SSL & 3D Secure" },
        { icon: Zap, label: "Livraison 48H", desc: "Suivi en temps réel" },
        { icon: Star, label: "Qualité Labo", desc: "Certifié 100% légal" },
        { icon: Heart, label: "Eco-Responsable", desc: "Emballage durable" }
    ];

    return (
        <div className="py-12 border-y border-white/5 bg-zinc-950/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                {badges.map((badge: any, idx: number) => {
                    const Icon = badge.icon;
                    return (
                        <div key={idx} className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-green-neon/30 transition-all">
                                <Icon className="w-6 h-6" style={{ color: primaryColor }} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{badge.label}</h4>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase">{badge.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// --- QUICK CONTACT ---
export function QuickContactSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    return (
        <section className="py-24 px-4">
            <div className="max-w-5xl mx-auto p-12 rounded-[3.5rem] bg-zinc-900/40 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-4xl font-serif font-black">{settings?.title || <>Besoin d'un <span style={{ color: primaryColor }}>conseil ?</span></>}</h2>
                    <p className="text-zinc-500 max-w-sm">{settings?.subtitle || "Nos experts BudTender sont disponibles pour vous accompagner dans votre choix."}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href={`tel:${settings?.phone || "0102030405"}`} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all flex items-center gap-3">
                        <Send className="w-4 h-4" style={{ color: primaryColor }} />
                        Par Téléphone
                    </a>
                    <a href={`mailto:${settings?.email || "hello@greenmoon.ia"}`} className="px-8 py-4 rounded-2xl font-black text-black hover:scale-105 transition-all flex items-center gap-3" style={{ backgroundColor: primaryColor }}>
                        <Mail className="w-4 h-4" />
                        Nous Écrire
                    </a>
                </div>
            </div>
        </section>
    );
}

// --- REASSURANCE SECTION ---
export function ReassuranceSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    return (
        <section className="py-12 bg-black overflow-hidden relative">
            <div className="flex whitespace-nowrap animate-marquee items-center gap-12">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 text-[13px] font-black uppercase tracking-[0.3em] text-zinc-700 italic">
                        <Zap className="w-4 h-4" style={{ color: primaryColor }} />
                        <span>Culture 100% Bio</span>
                        <Star className="w-4 h-4 text-zinc-800" />
                        <span>Laboratoire Indépendant</span>
                        <Zap className="w-4 h-4" style={{ color: primaryColor }} />
                        <span>Green Moon IA Premium</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
