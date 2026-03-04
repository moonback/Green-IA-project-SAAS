import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
    Menu, X, ShoppingCart, User, LogOut, ShieldCheck,
    Search, Heart, ChevronDown, ArrowRight, Package
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
            <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-3xl border-b border-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between h-20 md:h-24">

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden">
                        <button
                            className="p-2.5 text-zinc-400 hover:text-white bg-white/[0.04] rounded-xl border border-white/[0.08] transition-all active:scale-95"
                            onClick={onMenuToggle}
                            aria-label="Ouvrir le menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Shop Brand */}
                    <Link to={sp("/")} className="flex items-center gap-3 group">
                        {currentShop?.logo_url ? (
                            <img
                                src={currentShop.logo_url}
                                alt={shopName}
                                className="h-10 w-10 rounded-xl object-cover border border-white/10 group-hover:scale-110 transition-transform"
                            />
                        ) : (
                            <div
                                className="h-10 w-10 rounded-xl flex items-center justify-center border border-white/10 font-black text-black text-lg"
                                style={{ backgroundColor: primaryColor }}
                            >
                                {shopName[0]}
                            </div>
                        )}
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-black text-white tracking-tight leading-none group-hover:text-green-400 transition-colors">
                                {shopName}
                            </h1>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                                Boutique CBD
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1.5 px-1.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path ||
                                (link.path !== sp("/") && location.pathname.startsWith(link.path));
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-5 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-full group ${isActive
                                        ? "text-black"
                                        : "text-zinc-500 hover:text-white"
                                        }`}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="shop-nav-active"
                                            className="absolute inset-0 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
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
                        <button className="hidden md:flex p-2.5 text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.04]">
                            <Search className="w-5 h-5" />
                        </button>

                        <button
                            onClick={onOpenCart}
                            className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white transition-all group overflow-hidden"
                            aria-label="Panier"
                        >
                            <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.08] transition-colors" />
                            <ShoppingCart className="w-5 h-5 relative z-10" />
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-black flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] z-20"
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
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 group-hover:scale-105 transition-transform">
                                        {profile?.avatar_url ? (
                                            <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="h-4 w-4 text-zinc-400" />
                                        )}
                                    </div>
                                    <div className="hidden lg:flex flex-col items-start pr-3">
                                        <span className="text-xs font-black text-white uppercase tracking-tighter leading-none mb-0.5">
                                            {profile?.full_name?.split(" ")[0] ?? "Profil"}
                                        </span>
                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">
                                            Connecté
                                        </span>
                                    </div>
                                    <ChevronDown className={`hidden md:block w-3 h-3 text-zinc-500 mr-2 transition-transform duration-500 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isAccountMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-4 w-72 bg-zinc-900/90 backdrop-blur-3xl border border-white/[0.1] rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50 p-3"
                                        >
                                            <div className="px-4 py-4 mb-2 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
                                                <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Session Magasin</p>
                                                <h3 className="text-white font-serif font-black text-lg leading-tight mb-1">{profile?.full_name}</h3>
                                                <p className="text-xs text-zinc-400 truncate opacity-60">{user.email}</p>
                                            </div>

                                            <div className="space-y-1">
                                                <Link
                                                    to={sp("/compte")}
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="flex items-center justify-between px-4 py-3 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <User className="h-4 w-4" />
                                                        </div>
                                                        Tableau de Bord
                                                    </div>
                                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-600" />
                                                </Link>
                                                <Link
                                                    to={sp("/compte/commandes")}
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="flex items-center justify-between px-4 py-3 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Package className="h-4 w-4" />
                                                        </div>
                                                        Historique Achats
                                                    </div>
                                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-600" />
                                                </Link>
                                                <Link
                                                    to={sp("/compte/favoris")}
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                    className="flex items-center justify-between px-4 py-3 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Heart className="h-4 w-4" />
                                                        </div>
                                                        Produits Favoris
                                                    </div>
                                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-600" />
                                                </Link>
                                            </div>

                                            {isOwner && (
                                                <div className="mt-3 pt-3 border-t border-white/[0.05]">
                                                    <Link
                                                        to={sp("/admin")}
                                                        onClick={() => setIsAccountMenuOpen(false)}
                                                        className="flex items-center justify-between px-4 py-4 rounded-2xl transition-all group overflow-hidden relative"
                                                        style={{ backgroundColor: `${primaryColor}08` }}
                                                    >
                                                        <div className="flex items-center gap-3 relative z-10">
                                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform" style={{ backgroundColor: primaryColor }}>
                                                                <ShieldCheck className="h-5 w-5 text-black" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-black uppercase tracking-tight" style={{ color: primaryColor }}>Management</span>
                                                                <span className="text-xs font-bold text-white">Gestion Boutique</span>
                                                            </div>
                                                        </div>
                                                        <ChevronDown className="w-4 h-4 -rotate-90 relative z-10 text-zinc-500" />
                                                    </Link>
                                                </div>
                                            )}

                                            <button
                                                onClick={onSignOut}
                                                className="w-full mt-2 flex items-center gap-3 px-4 py-4 text-xs font-black uppercase tracking-[0.2em] text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all group"
                                            >
                                                <LogOut className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                                                Fermer la session
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                to={sp("/connexion")}
                                className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] text-black"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <User className="w-3.5 h-3.5" />
                                Se Connecter
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
