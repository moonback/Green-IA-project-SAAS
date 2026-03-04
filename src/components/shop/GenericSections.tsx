import { motion } from 'motion/react';
import { Mail, Star, HelpCircle, ShieldCheck, Zap, Heart, Instagram, Send, Plus, ChevronDown, Sparkles, Quote } from 'lucide-react';
import { useState } from 'react';

// --- NEWSLETTER SECTION ---
export function NewsletterSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    return (
        <section className="py-24 px-4 overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/5 blur-[120px] rounded-full opacity-50" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto relative rounded-[3rem] sm:rounded-[4rem] overflow-hidden bg-zinc-950/40 backdrop-blur-3xl border border-white/5 p-8 md:p-20 text-center space-y-10 shadow-2xl shadow-black/50"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] -mr-48 -mt-48 transition-all duration-1000 group-hover:bg-emerald-500/20" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] -ml-48 -mb-48" />

                <div className="flex flex-col items-center gap-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-400">
                        <Sparkles className="w-3 h-3" />
                        {settings?.badge || "Accès Privilège"}
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase italic">
                        {settings?.title ? settings.title : <>Rejoignez le <span className="text-emerald-500">Cercle.</span></>}
                    </h2>

                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {settings?.subtitle || "Recevez nos nouveautés, promotions exclusives et conseils BudTender directement dans votre boîte mail."}
                    </p>
                </div>

                <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto pt-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex-1 relative group">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            className="w-full bg-black/40 border border-white/10 rounded-[1.5rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-medium backdrop-blur-xl"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-10 py-5 rounded-[1.5rem] font-black text-black transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl overflow-hidden group relative"
                        style={{ backgroundColor: primaryColor }}
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="relative z-10 uppercase tracking-widest text-xs">S'inscrire</span>
                        <Send className="w-4 h-4 relative z-10" />
                    </button>
                </form>

                <div className="flex items-center justify-center gap-4 relative z-10">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-black">+2,400 passionnés nous font confiance</p>
                </div>
            </motion.div>
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
        <section className="py-24 px-4 bg-zinc-950/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                        Avis vérifiés
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                        {settings?.title ? settings.title : <>Expérience <span className="text-emerald-500">Premium.</span></>}
                    </h2>
                    <div className="flex justify-center gap-1.5">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-emerald-500 fill-emerald-500 shadow-emerald-500/50" />)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            whileHover={{ y: -10 }}
                            className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] relative group shadow-2xl transition-all duration-500 hover:border-emerald-500/20"
                        >
                            <div className="absolute top-10 right-10 text-emerald-500/20 group-hover:text-emerald-500 transition-colors duration-500">
                                <Quote className="w-12 h-12 fill-current" />
                            </div>

                            <p className="text-xl text-zinc-300 font-medium leading-[1.6] mb-10 relative z-10">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 flex items-center justify-center font-black text-emerald-500 shadow-xl group-hover:scale-110 transition-transform">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-black text-white uppercase tracking-wider text-sm">{t.name}</h4>
                                    <p className="text-[11px] text-zinc-500 font-black uppercase tracking-widest">{t.role}</p>
                                </div>
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
        <section className="py-32 px-4 font-sans relative">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-6">
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500 shadow-2xl shadow-emerald-500/10"
                    >
                        <HelpCircle className="w-8 h-8" />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                        {settings?.title ? settings.title : <>Besoin <span className="text-emerald-500">d'aide ?</span></>}
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((f: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={false}
                            className={`border transition-all duration-500 rounded-[2rem] overflow-hidden ${openIndex === idx ? 'bg-zinc-900/50 border-emerald-500/30' : 'bg-transparent border-white/5 hover:border-white/10'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-8 text-left group"
                            >
                                <span className={`text-lg font-black uppercase tracking-tight transition-colors duration-500 ${openIndex === idx ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{f.q}</span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${openIndex === idx ? 'bg-emerald-500 text-black rotate-180' : 'bg-white/5 text-zinc-500'}`}>
                                    <ChevronDown className="w-5 h-5 shadow-inner" />
                                </div>
                            </button>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={openIndex === idx ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                            >
                                <div className="px-8 pb-8 text-zinc-400 text-lg font-medium leading-relaxed max-w-3xl">
                                    {f.a}
                                </div>
                            </motion.div>
                        </motion.div>
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
        <section className="py-24 px-4 overflow-hidden bg-zinc-950/40">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feat: any, idx: number) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-10 rounded-[3rem] bg-zinc-900/30 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 text-center space-y-6 group shadow-2xl"
                    >
                        <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 border border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 shadow-xl">
                            {typeof feat.icon === 'string' ? <Star className="w-10 h-10" /> : <feat.icon className="w-10 h-10 transition-transform group-hover:scale-95" />}
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-black uppercase tracking-[0.2em] text-xs text-white group-hover:text-emerald-400 transition-colors italic">{feat.title}</h3>
                            <p className="text-zinc-500 text-sm font-medium leading-relaxed group-hover:text-zinc-400 transition-colors">{feat.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// --- INSTAGRAM FEED SECTION ---
export function InstagramFeedSection({ primaryColor, settings }: { primaryColor: string; settings?: any }) {
    const username = settings?.username || "green_IA_cbd";

    return (
        <section className="py-32 px-4 bg-zinc-950">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">
                            <Instagram className="w-5 h-5" />
                            {settings?.badge || "Social Hub"}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                            {settings?.title ? settings.title : <>Suivez la <span className="text-emerald-500">Vibration.</span></>}
                        </h2>
                    </div>
                    <motion.a
                        href={`https://instagram.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all shadow-2xl"
                    >
                        @{username}
                    </motion.a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        'photo-1596755094514-f87034a2612d',
                        'photo-1584467541268-b040f83be3fd',
                        'photo-1623912173595-31633534b868',
                        'photo-1606813907291-d86efa9b94db'
                    ].map((photoId, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-zinc-900 group shadow-2xl cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-emerald-500/80 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col items-center justify-center gap-4">
                                <Instagram className="w-10 h-10 text-black animate-bounce" />
                                <span className="text-black font-black uppercase tracking-widest text-[10px]">Voir le post</span>
                            </div>
                            <img
                                src={`https://images.unsplash.com/${photoId}?auto=format&fit=crop&q=80&w=600&h=600`}
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-6"
                                alt="Insta Post"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://images.pexels.com/photos/6588619/pexels-photo-6588619.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop`;
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
