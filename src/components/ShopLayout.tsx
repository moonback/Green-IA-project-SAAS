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
            {settings.budtender_enabled && <BudTender />}
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
                    <div className="flex items-center justify-between h-18 md:h-20">

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
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                    Boutique CBD
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path ||
                                    (link.path !== sp("/") && location.pathname.startsWith(link.path));
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full ${isActive
                                            ? "text-black"
                                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                                            }`}
                                        style={isActive ? { backgroundColor: primaryColor } : {}}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* Cart */}
                            <button
                                onClick={openSidebar}
                                className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white transition-all"
                                aria-label="Panier"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {itemCount > 0 && (
                                    <span
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center text-black shadow-lg"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {/* Account */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                        className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all duration-300 ${isAccountMenuOpen
                                            ? "border-white/20 bg-white/10 text-white"
                                            : "bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white"
                                            }`}
                                    >
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.08]">
                                            <User className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline">
                                            {profile?.full_name?.split(" ")[0] ?? "Profil"}
                                        </span>
                                        <ChevronDown className={`w-3 h-3 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isAccountMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 top-full mt-3 w-56 bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                                            >
                                                <Link
                                                    to={sp("/compte")}
                                                    className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-zinc-400 hover:bg-white/[0.04] hover:text-white rounded-xl transition-all"
                                                >
                                                    <User className="h-4 w-4" />
                                                    Mon Compte
                                                </Link>
                                                <Link
                                                    to={sp("/compte/commandes")}
                                                    className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-zinc-400 hover:bg-white/[0.04] hover:text-white rounded-xl transition-all"
                                                >
                                                    <Package className="h-4 w-4" />
                                                    Mes Commandes
                                                </Link>
                                                <Link
                                                    to={sp("/compte/favoris")}
                                                    className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-zinc-400 hover:bg-white/[0.04] hover:text-white rounded-xl transition-all"
                                                >
                                                    <Heart className="h-4 w-4" />
                                                    Mes Favoris
                                                </Link>
                                                {profile?.is_admin && (
                                                    <>
                                                        <div className="h-px bg-white/[0.06] my-1 mx-3" />
                                                        <Link
                                                            to={sp("/admin")}
                                                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold hover:bg-green-500/10 rounded-xl transition-all"
                                                            style={{ color: primaryColor }}
                                                        >
                                                            <ShieldCheck className="h-4 w-4" />
                                                            Gestion Boutique
                                                        </Link>
                                                    </>
                                                )}
                                                <div className="h-px bg-white/[0.06] my-1 mx-3" />
                                                <button
                                                    onClick={signOut}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Déconnexion
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    to={sp("/connexion")}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all text-black"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    <User className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Connexion</span>
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
                            <div className="absolute top-0 right-0 w-[80%] h-[40%] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" style={{ background: primaryColor }} />

                            {/* Mobile header */}
                            <div className="flex items-center justify-between px-6 h-20 relative z-10 border-b border-white/[0.04] bg-zinc-950/50 backdrop-blur-md">
                                <Link to={sp("/")} className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                                    {currentShop?.logo_url ? (
                                        <img src={currentShop.logo_url} alt={shopName} className="h-10 w-10 rounded-xl object-cover" />
                                    ) : (
                                        <div className="h-10 w-10 rounded-xl flex items-center justify-center text-black font-black text-lg" style={{ backgroundColor: primaryColor }}>
                                            {shopName[0]}
                                        </div>
                                    )}
                                    <span className="text-lg font-black text-white">{shopName}</span>
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-3 text-zinc-400 hover:text-white rounded-2xl bg-white/[0.04] border border-white/[0.08]"
                                    aria-label="Fermer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Navigation links */}
                            <nav className="flex-1 overflow-y-auto px-6 py-10 relative z-10">
                                <div className="flex flex-col gap-2">
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
                                                className={`group flex items-center justify-between px-5 py-4 rounded-3xl transition-all ${location.pathname === link.path
                                                    ? "text-black"
                                                    : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                                                    }`}
                                                style={location.pathname === link.path ? { backgroundColor: primaryColor } : {}}
                                            >
                                                <span className="text-2xl font-serif font-bold">{link.name}</span>
                                                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </nav>

                            {/* Mobile footer */}
                            <div className="px-6 pb-10 pt-6 border-t border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl relative z-20 space-y-4">
                                {user ? (
                                    <div className="flex flex-col gap-3 text-center">
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Connecté en tant que</p>
                                        <p className="text-white font-serif font-black text-lg">{profile?.full_name}</p>
                                        <Link to={sp("/compte")} onClick={() => setIsMenuOpen(false)} className="bg-white/5 py-4 rounded-2xl text-xs font-bold text-white border border-white/5">Mon Compte</Link>
                                        <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="text-red-400 py-3 text-xs font-bold">Déconnexion</button>
                                    </div>
                                ) : (
                                    <Link
                                        to={sp("/connexion")}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center gap-4 p-5 rounded-3xl text-sm font-black uppercase tracking-[0.2em] text-black"
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
            <main className="flex-grow">
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

                    <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
                        <p>&copy; {new Date().getFullYear()} {shopName}. Propulsé par Green Mood SaaS.</p>
                        <div className="flex gap-6">
                            <Link to={sp("/mentions-legales")} className="hover:text-white transition-colors">Mentions Légales</Link>
                            <a href="/" className="hover:text-white transition-colors" style={{ color: primaryColor }}>Green Mood Platform</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
