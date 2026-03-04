import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, User, ShieldCheck } from "lucide-react";

interface ShopMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentShop: any;
    shopName: string;
    primaryColor: string;
    navLinks: Array<{ name: string; path: string }>;
    sp: (path: string) => string;
    user: any;
    profile: any;
    isRegisteredToShop: boolean;
    isOwner: boolean;
    onSignOut: () => void;
}

export function ShopMobileMenu({
    isOpen,
    onClose,
    currentShop,
    shopName,
    primaryColor,
    navLinks,
    sp,
    user,
    profile,
    isRegisteredToShop,
    isOwner,
    onSignOut
}: ShopMobileMenuProps) {
    const location = useLocation();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[100] lg:hidden bg-zinc-950 flex flex-col overflow-hidden"
                >
                    {/* Decorative background blur */}
                    <div className="absolute top-0 right-0 w-[100%] h-[50%] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 pointer-events-none" style={{ background: primaryColor }} />
                    <div className="absolute bottom-0 left-0 w-[80%] h-[30%] blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 pointer-events-none" style={{ background: primaryColor }} />

                    {/* Mobile header */}
                    <div className="flex items-center justify-between px-6 h-20 relative z-10 border-b border-white/[0.04] bg-zinc-950/40 backdrop-blur-xl">
                        <Link to={sp("/")} className="flex items-center gap-3" onClick={onClose}>
                            <div className="relative group">
                                <div className="absolute inset-0 blur-lg rounded-xl opacity-50 transition-opacity group-active:opacity-100" style={{ background: primaryColor }} />
                                {currentShop?.logo_url ? (
                                    <img src={currentShop.logo_url} alt={shopName} className="h-10 w-10 rounded-xl object-cover relative z-10 border border-white/10" />
                                ) : (
                                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-black font-black text-lg relative z-10 shadow-lg" style={{ backgroundColor: primaryColor }}>
                                        {shopName[0]}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-white uppercase tracking-wider leading-none mb-0.5">{shopName}</span>
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] leading-none">Boutique Officielle</span>
                            </div>
                        </Link>
                        <button
                            onClick={onClose}
                            className="p-3 text-zinc-400 hover:text-white rounded-2xl bg-white/[0.04] border border-white/[0.08] active:scale-95 transition-all"
                            aria-label="Fermer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation links */}
                    <nav className="flex-1 overflow-y-auto px-6 py-10 relative z-10">
                        <div className="space-y-4">
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 ml-4 mb-2">Navigation</p>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={onClose}
                                        className={`group flex items-center justify-between px-6 py-5 rounded-[2rem] transition-all border ${location.pathname === link.path
                                            ? "text-black border-transparent shadow-xl"
                                            : "text-zinc-400 border-white/[0.03] hover:bg-white/[0.02]"
                                            }`}
                                        style={location.pathname === link.path ? { backgroundColor: primaryColor } : {}}
                                    >
                                        <span className="text-3xl font-serif font-black tracking-tight">{link.name}</span>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${location.pathname === link.path ? "bg-black/20" : "bg-white/5 group-hover:bg-white/10 group-hover:rotate-45"}`}>
                                            <ArrowRight className={`w-5 h-5 ${location.pathname === link.path ? "text-black" : "text-zinc-600"}`} />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </nav>

                    {/* Mobile footer actions */}
                    <div className="px-6 pb-10 pt-6 border-t border-white/[0.06] bg-zinc-950/60 backdrop-blur-2xl relative z-10">
                        {user && isRegisteredToShop ? (
                            <div className="space-y-4 text-center">
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none">Session Ouverte</p>
                                <p className="text-white font-serif font-black text-xl leading-none mb-1">{profile?.full_name}</p>
                                <p className="text-xs text-zinc-600 font-bold uppercase tracking-wider mb-4 truncate">{user.email}</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        to={sp("/compte")}
                                        onClick={onClose}
                                        className="flex flex-col items-center gap-2 p-5 bg-white/[0.04] border border-white/[0.06] rounded-3xl hover:bg-white/[0.08] transition-colors"
                                    >
                                        <User className="w-5 h-5 text-zinc-400" />
                                        <span className="text-xs font-black uppercase tracking-widest text-zinc-300">Compte</span>
                                    </Link>
                                    {isOwner && (
                                        <Link
                                            to={sp("/admin")}
                                            onClick={onClose}
                                            className="flex flex-col items-center gap-2 p-5 bg-green-neon/5 border border-green-neon/10 rounded-3xl"
                                        >
                                            <ShieldCheck className="w-5 h-5 text-green-neon" />
                                            <span className="text-xs font-black uppercase tracking-widest text-green-neon">Admin</span>
                                        </Link>
                                    )}
                                </div>
                                <button
                                    onClick={() => { onSignOut(); onClose(); }}
                                    className="w-full py-2 text-xs font-black uppercase tracking-[0.3em] text-red-400/60 hover:text-red-400 transition-colors"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <Link
                                to={sp("/connexion")}
                                onClick={onClose}
                                className="flex items-center justify-center gap-4 p-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-2xl text-black"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <User className="h-5 w-5" /> Se Connecter
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
