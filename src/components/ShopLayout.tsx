import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    Menu, X, ShoppingCart, User, LogOut, ShieldCheck,
    Search, Heart, ChevronDown, Leaf, MapPin, Clock,
    Phone, ArrowRight, Package
} from "lucide-react";
import AgeGate from "./AgeGate";
import CartSidebar from "./CartSidebar";
import BudTender from "./BudTender";
import ToastContainer from "./Toast";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useShopStore } from "../store/shopStore";
import { useSettingsStore } from "../store/settingsStore";

/**
 * ShopLayout — Layout dédié aux boutiques.
 * Header personnalisé avec nom/logo du shop, couleur primaire, et navigation boutique.
 * Utilisé uniquement sous les routes /:shopSlug/*
 */
export default function ShopLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const location = useLocation();
    const { shopSlug } = useParams<{ shopSlug: string }>();

    const { currentShop } = useShopStore();
    const itemCount = useCartStore((s) => s.itemCount());
    const openSidebar = useCartStore((s) => s.openSidebar);
    const { user, profile, signOut } = useAuthStore();
    const settings = useSettingsStore((s) => s.settings);

    const isOwner = currentShop && user && currentShop.owner_id === user.id;
    const isRegisteredToShop = Boolean(isOwner || (profile?.current_shop_id === currentShop?.id));

    const sp = (path: string) => `/${shopSlug}${path}`;
    const primaryColor = currentShop?.settings?.primary_color || '#39ff14';

    useEffect(() => {
        setIsMenuOpen(false);
        setIsAccountMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const navLinks = [
        { name: "Vitrine", path: sp("/") },
        { name: "Catalogue", path: sp("/catalogue") },
        { name: "Notre Boutique", path: sp("/boutique") },
        { name: "Qualité", path: sp("/qualite") },
        { name: "Contact", path: sp("/contact") },
    ];

    const shopName = currentShop?.name || 'Boutique CBD';

    return (
        <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
            <AgeGate />
            <CartSidebar />
            {settings.budtender_enabled && user && isRegisteredToShop && <BudTender />}
            <ToastContainer />

            {/* ═══ SHOP HEADER ═══ */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="sticky top-0 z-[999] w-full"
            >
                <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-3xl border-b border-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between h-20 md:h-24">

                        {/* Mobile Menu */}
                        <div className="lg:hidden">
                            <button
                                className="p-2.5 text-zinc-400 hover:text-white bg-white/[0.04] rounded-xl border border-white/[0.08] transition-all active:scale-95"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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

                        {/* Account & Meta Actions */}
                        <div className="flex items-center gap-2 md:gap-4 ml-2">
                            {/* Search Trigger (Visual only for now) */}
                            <button className="hidden md:flex p-2.5 text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.04]">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Cart */}
                            <button
                                onClick={openSidebar}
                                className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white transition-all group overflow-hidden"
                                aria-label="Panier"
                            >
                                <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.08] transition-colors" />
                                <ShoppingCart className="w-5 h-5 relative z-10" />
                                {itemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-black flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-20"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        {itemCount}
                                    </motion.span>
                                )}
                            </button>

                            {/* Account Dropdown */}
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
                                            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
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
                                                {/* Profile Info Section */}
                                                <div className="px-4 py-4 mb-2 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
                                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Session Magasin</p>
                                                    <h3 className="text-white font-serif font-black text-lg leading-tight mb-1">{profile?.full_name}</h3>
                                                    <p className="text-xs text-zinc-400 truncate opacity-60">{user.email}</p>
                                                </div>

                                                <div className="space-y-1">
                                                    <Link
                                                        to={sp("/compte")}
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
                                                    onClick={signOut}
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

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isMenuOpen && (
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
                                <Link to={sp("/")} className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
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
                                    onClick={() => setIsMenuOpen(false)}
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
                                                onClick={() => setIsMenuOpen(false)}
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
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex flex-col items-center gap-2 p-5 bg-white/[0.04] border border-white/[0.06] rounded-3xl hover:bg-white/[0.08] transition-colors"
                                            >
                                                <User className="w-5 h-5 text-zinc-400" />
                                                <span className="text-xs font-black uppercase tracking-widest text-zinc-300">Compte</span>
                                            </Link>
                                            {isOwner && (
                                                <Link
                                                    to={sp("/admin")}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex flex-col items-center gap-2 p-5 bg-green-neon/5 border border-green-neon/10 rounded-3xl"
                                                >
                                                    <ShieldCheck className="w-5 h-5 text-green-neon" />
                                                    <span className="text-xs font-black uppercase tracking-widest text-green-neon">Admin</span>
                                                </Link>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => { signOut(); setIsMenuOpen(false); }}
                                            className="w-full py-2 text-xs font-black uppercase tracking-[0.3em] text-red-400/60 hover:text-red-400 transition-colors"
                                        >
                                            Déconnexion
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to={sp("/connexion")}
                                        onClick={() => setIsMenuOpen(false)}
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
            </motion.header>

            {/* Main Content */}
            <main className="flex-grow page-content-shell">
                <Outlet />
            </main>

            {/* ═══ SHOP FOOTER ═══ */}
            <footer className="bg-black border-t border-white/[0.06] pt-16 pb-10">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        {/* Brand */}
                        <div className="space-y-5">
                            <Link to={sp("/")} className="flex items-center gap-3 group">
                                {currentShop?.logo_url ? (
                                    <img src={currentShop.logo_url} alt={shopName} className="h-10 w-10 rounded-xl object-cover" />
                                ) : (
                                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-black font-black text-lg" style={{ backgroundColor: primaryColor }}>
                                        {shopName[0]}
                                    </div>
                                )}
                                <span className="text-xl font-black text-white group-hover:text-green-400 transition-colors">{shopName}</span>
                            </Link>
                            <p className="text-zinc-500 text-sm leading-relaxed font-light">
                                Votre boutique CBD de confiance.
                                Produits premium, conseils IA et service sur mesure.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200 mb-6">Navigation</h3>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-zinc-500 hover:text-white transition-colors text-sm font-light">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Info */}
                        <div className="space-y-5">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200 mb-6">Informations</h3>
                            {settings.store_address && (
                                <div className="flex items-start gap-3 text-sm text-zinc-500">
                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                                    <span>{settings.store_address}</span>
                                </div>
                            )}
                            {settings.store_hours && (
                                <div className="flex items-start gap-3 text-sm text-zinc-500">
                                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                                    <span>{settings.store_hours}</span>
                                </div>
                            )}
                            {settings.store_phone && (
                                <div className="flex items-start gap-3 text-sm text-zinc-500">
                                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                                    <span>{settings.store_phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-600">
                        <p>&copy; {new Date().getFullYear()} {shopName}. Propulsé par Green IA SaaS.</p>
                        <div className="flex gap-6">
                            <Link to={sp("/mentions-legales")} className="hover:text-white transition-colors">Mentions Légales</Link>
                            <a href="/" className="hover:text-white transition-colors" style={{ color: primaryColor }}>Green IA Platform</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
