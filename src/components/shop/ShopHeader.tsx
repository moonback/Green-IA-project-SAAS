import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
    Menu, X, ShoppingCart, User, LogOut, ShieldCheck,
    Search, Heart, ChevronDown, ArrowRight, Package, Sparkles
} from "lucide-react";

interface ShopHeaderProps {
    currentShop: any;
    shopName: string;
    primaryColor: string;
    itemCount: number;
    onOpenCart: () => void;
    user: any;
    profile: any;
    isRegisteredToShop: boolean;
    isAccountMenuOpen: boolean;
    setIsAccountMenuOpen: (open: boolean) => void;
    onSignOut: () => void;
    onMenuToggle: () => void;
    navLinks: Array<{ name: string; path: string }>;
    sp: (path: string) => string;
    isOwner: boolean;
}

export function ShopHeader({
    currentShop,
    shopName,
    primaryColor,
    itemCount,
    onOpenCart,
    user,
    profile,
    isRegisteredToShop,
    isAccountMenuOpen,
    setIsAccountMenuOpen,
    onSignOut,
    onMenuToggle,
    navLinks,
    sp,
    isOwner
}: ShopHeaderProps) {
    const location = useLocation();

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="sticky top-0 z-[999] w-full"
        >
            <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-3xl border-b border-white/[0.05] shadow-[0_8px_40px_rgba(0,0,0,0.4)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between h-20 md:h-24">

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden">
                        <button
                            className="p-2.5 text-zinc-400 hover:text-white bg-white/[0.04] rounded-2xl border border-white/[0.08] transition-all active:scale-95"
                            onClick={onMenuToggle}
                            aria-label="Ouvrir le menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Shop Brand */}
                    <Link to={sp("/")} className="flex items-center gap-4 group">
                        <div className="relative">
                            {currentShop?.logo_url ? (
                                <img
                                    src={currentShop.logo_url}
                                    alt={shopName}
                                    className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl object-cover border border-white/10 group-hover:border-emerald-500/50 shadow-2xl transition-all duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div
                                    className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center border border-white/10 font-black text-white text-xl shadow-xl transition-all duration-500 group-hover:scale-105"
                                    style={{
                                        backgroundColor: primaryColor,
                                        boxShadow: `0 8px 24px ${primaryColor}40`
                                    }}
                                >
                                    {shopName[0]}
                                </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-black text-white tracking-tighter leading-none group-hover:text-emerald-400 transition-colors uppercase italic italic">
                                {shopName}
                            </h1>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                    Premium Selection
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-full backdrop-blur-md">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path ||
                                (link.path !== sp("/") && location.pathname.startsWith(link.path));
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-full group ${isActive
                                        ? "text-black"
                                        : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="shop-nav-active"
                                            className="absolute inset-0 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                                            style={{ backgroundColor: primaryColor }}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    {!isActive && (
                                        <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/[0.05] transition-colors" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-4 ml-2">
                        <button className="hidden sm:flex p-3 text-zinc-400 hover:text-white transition-all rounded-2xl hover:bg-white/[0.05] border border-transparent hover:border-white/10">
                            <Search className="w-5 h-5" />
                        </button>

                        <button
                            onClick={onOpenCart}
                            className="relative p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white transition-all group overflow-hidden"
                            aria-label="Panier"
                        >
                            <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.08] transition-colors" />
                            <ShoppingCart className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center text-black shadow-lg z-20"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </button>

                        {user && isRegisteredToShop ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                    className={`flex items-center gap-3 p-1 rounded-full border transition-all duration-500 group ${isAccountMenuOpen
                                        ? "border-white/20 bg-white/10"
                                        : "bg-white/[0.04] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]"
                                        }`}
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 group-hover:scale-105 transition-transform shadow-xl">
                                        {profile?.avatar_url ? (
                                            <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="h-4 w-4 text-zinc-400" />
                                        )}
                                    </div>
                                    <div className="hidden lg:flex flex-col items-start pr-3">
                                        <span className="text-xs font-black text-white uppercase tracking-tight leading-none mb-1">
                                            {profile?.full_name?.split(" ")[0] ?? "Profil"}
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-none">
                                            <Sparkles className="w-2.5 h-2.5" />
                                            VIP
                                        </div>
                                    </div>
                                    <ChevronDown className={`hidden md:block w-3.5 h-3.5 text-zinc-500 mr-2 transition-transform duration-500 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isAccountMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-4 w-80 bg-zinc-950/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden z-50 p-4"
                                        >
                                            <div className="px-5 py-5 mb-3 bg-white/[0.03] rounded-3xl border border-white/[0.05] relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                    <Sparkles className="w-12 h-12 text-emerald-500" />
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-2">Membre Privilège</p>
                                                <h3 className="text-white font-black text-xl leading-tight mb-1 uppercase tracking-tighter">{profile?.full_name}</h3>
                                                <p className="text-xs text-zinc-500 truncate font-medium">{user.email}</p>
                                            </div>

                                            <div className="space-y-1.5 px-1">
                                                <Link
                                                    to={sp("/compte")}
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="flex items-center justify-between px-4 py-3.5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-2xl transition-all group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-all">
                                                            <User className="h-4.5 w-4.5" />
                                                        </div>
                                                        Mon Compte
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-600" />
                                                </Link>
                                                <Link
                                                    to={sp("/compte/commandes")}
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="flex items-center justify-between px-4 py-3.5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-2xl transition-all group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-all">
                                                            <Package className="h-4.5 w-4.5" />
                                                        </div>
                                                        Mes Commandes
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-600" />
                                                </Link>
                                                <Link
                                                    to={sp("/compte/favoris")}
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="flex items-center justify-between px-4 py-3.5 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-2xl transition-all group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-all">
                                                            <Heart className="h-4.5 w-4.5" />
                                                        </div>
                                                        Mes Favoris
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-600" />
                                                </Link>
                                            </div>

                                            {isOwner && (
                                                <div className="mt-4 pt-4 border-t border-white/[0.08] px-1">
                                                    <Link
                                                        to={sp("/admin")}
                                                        onClick={() => setIsAccountMenuOpen(false)}
                                                        className="flex items-center justify-between px-5 py-4 rounded-3xl transition-all group overflow-hidden relative"
                                                        style={{ backgroundColor: `${primaryColor}15` }}
                                                    >
                                                        <div className="flex items-center gap-4 relative z-10">
                                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform" style={{ backgroundColor: primaryColor }}>
                                                                <ShieldCheck className="h-6 w-6 text-black" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Owner Portal</span>
                                                                <span className="text-sm font-black text-white uppercase italic tracking-tight">Gérer le Shop</span>
                                                            </div>
                                                        </div>
                                                        <ChevronDown className="w-4 h-4 -rotate-90 relative z-10 text-zinc-500" />
                                                    </Link>
                                                </div>
                                            )}

                                            <button
                                                onClick={onSignOut}
                                                className="w-full mt-3 flex items-center gap-4 px-5 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all group"
                                            >
                                                <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                                Fermer la session
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                to={sp("/connexion")}
                                className="hidden md:flex items-center gap-3 px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-black relative group overflow-hidden"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <User className="w-3.5 h-3.5 relative z-10" />
                                <span className="relative z-10">Connexion</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
