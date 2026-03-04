import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface ShopFooterProps {
    currentShop: any;
    shopName: string;
    primaryColor: string;
    settings: any;
    navLinks: Array<{ name: string; path: string }>;
    sp: (path: string) => string;
}

export function ShopFooter({
    currentShop,
    shopName,
    primaryColor,
    settings,
    navLinks,
    sp
}: ShopFooterProps) {
    return (
        <footer className="bg-zinc-950 border-t border-white/[0.05] pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-8">
                        <Link to={sp("/")} className="flex items-center gap-4 group">
                            {currentShop?.logo_url ? (
                                <img src={currentShop.logo_url} alt={shopName} className="h-12 w-12 rounded-2xl object-cover border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl" />
                            ) : (
                                <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-2xl" style={{ backgroundColor: primaryColor }}>
                                    {shopName[0]}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-white italic group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{shopName}</span>
                                <div className="flex items-center gap-1.5 opacity-60">
                                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">Green IA Certified</span>
                                </div>
                            </div>
                        </Link>

                        <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-sm">
                            L'excellence du CBD rencontrant l'intelligence artificielle.
                            Une expérience sensorielle et technologique sans précédent.
                        </p>

                        <div className="flex gap-4">
                            {['Instagram', 'Twitter', 'Facebook'].map(social => (
                                <motion.a
                                    key={social}
                                    href="#"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all shadow-xl"
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-1 h-1 bg-current rounded-full" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="md:col-span-3">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">Exploration</h3>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-zinc-400 hover:text-white transition-all text-sm font-black uppercase tracking-widest group flex items-center gap-2">
                                        <span className="w-0 group-hover:w-2 h-px bg-emerald-500 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Hours */}
                    <div className="md:col-span-4 space-y-10">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-10">Maison {shopName}</h3>
                        <div className="space-y-6">
                            {settings.store_address && (
                                <div className="flex items-start gap-4 text-sm text-zinc-400 group">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                                        <MapPin className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Localisation</span>
                                        <span className="font-medium">{settings.store_address}</span>
                                    </div>
                                </div>
                            )}
                            {settings.store_hours && (
                                <div className="flex items-start gap-4 text-sm text-zinc-400 group">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                                        <Clock className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Horaires d'Ouverture</span>
                                        <span className="font-medium whitespace-pre-line">{settings.store_hours}</span>
                                    </div>
                                </div>
                            )}
                            {settings.store_phone && (
                                <div className="flex items-start gap-4 text-sm text-zinc-400 group">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                                        <Phone className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Ligne Directe</span>
                                        <span className="font-medium">{settings.store_phone}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/[0.04] pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <p>&copy; {new Date().getFullYear()} {shopName}. Art de vivre & CBD.</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <Link to={sp("/mentions-legales")} className="hover:text-white transition-colors">Mentions Légales</Link>
                        <a href="/" className="flex items-center gap-2 group text-emerald-500/70 hover:text-emerald-500 transition-all">
                            Propulsé par Green IA
                            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] -mb-64 -mr-64 pointer-events-none" />
        </footer>
    );
}
