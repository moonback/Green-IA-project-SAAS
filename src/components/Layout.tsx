import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import {
  Menu,
  X,
  Leaf,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  ShoppingCart,
  User,
  LogOut,
  ShieldCheck,
  ArrowRight,
  Globe,
  Store,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import AgeGate from "./AgeGate";
import CartSidebar from "./CartSidebar";
import BudTender from "./BudTender";
import ToastContainer from "./Toast";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useSettingsStore } from "../store/settingsStore";
import { useShopStore } from "../store/shopStore";

const RESERVED_SLUGS = ['admin', 'pos', '404', 'catalogue', 'qualite', 'contact', 'connexion', 'ouvrir-boutique', 'reset-password', 'mentions-legales', 'compte', 'profil', 'commandes', 'favorites', 'parrainage', 'addresses', 'abonnements', 'fidelite', 'avis'];

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const location = useLocation();
  const { shopSlug } = useParams<{ shopSlug: string }>();

  const itemCount = useCartStore((s) => s.itemCount());
  const openSidebar = useCartStore((s) => s.openSidebar);
  const { user, profile, signOut } = useAuthStore();
  const settings = useSettingsStore((s) => s.settings);
  const currentShop = useShopStore((s) => s.currentShop);

  const isOwner = currentShop && user && currentShop.owner_id === user.id;

  // Helper: construit un chemin relatif au shop ou global
  const sp = (path: string) => (shopSlug && !RESERVED_SLUGS.includes(shopSlug)) ? `/${shopSlug}${path}` : path;

  // Chemin pour l'admin : utilise le slug de l'URL (si valide), ou le slug du shop chargé, ou fallback
  const effectiveSlug = (shopSlug && !RESERVED_SLUGS.includes(shopSlug)) ? shopSlug : currentShop?.slug;
  const adminPath = effectiveSlug ? `/${effectiveSlug}/admin` : "/admin";

  const isShopContext = !!shopSlug && !RESERVED_SLUGS.includes(shopSlug);
  const isRegisteredToShop = !isShopContext || isOwner || (profile?.current_shop_id === currentShop?.id);

  // Close menus on route change and scroll to top
  useEffect(() => {
    setIsMenuOpen(false);
    setIsAccountMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Navigation adaptative : SaaS global vs Boutique
  const navLinks = isShopContext
    ? [
      { name: "Vitrine", path: sp("/") },
      { name: "Catalogue", path: sp("/catalogue") },
      { name: "Notre Boutique", path: sp("/boutique") },
      { name: "Contact", path: sp("/contact") },
    ]
    : [
      { name: "Accueil", path: "/" },
      { name: "Solution SaaS", path: "/solution" },
      { name: "Qualité & Sécurité", path: "/qualite" },
      { name: "Contact & Démo", path: "/contact" },
    ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      {/* Age Verification Popup */}
      <AgeGate />

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* BudTender IA Widget */}
      {settings.budtender_enabled && user && isRegisteredToShop && <BudTender />}

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Promotional Banner */}
      <AnimatePresence>
        {isBannerVisible && settings.banner_enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-green-neon text-black relative flex items-center justify-center overflow-hidden z-[60]"
          >
            <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-center w-full max-w-7xl mx-auto pr-10">
              <span className="inline-block animate-pulse mr-2">✦</span>
              NOUVEAU : {settings.banner_text}
              <span className="inline-block animate-pulse ml-2">✦</span>
            </div>
            <button
              onClick={() => setIsBannerVisible(false)}
              className="absolute right-4 p-1.5 hover:bg-black/10 rounded-full transition-colors group"
              aria-label="Fermer la bannière"
            >
              <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-[999] w-full"
      >
        {/* Header Background with Glassmorphism */}
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-3xl border-b border-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />

        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20 md:h-24 gap-4 lg:gap-8">
            {/* Left: Brand Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-3 group relative transition-all duration-500"
              >
                <div className="absolute inset-0 bg-green-neon/10 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="Green Moon"
                    className="h-12 md:h-30 w-auto object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                  />
                </div>

              </Link>
            </div>

            {/* Center: Navigation (Desktop only) */}
            <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-md shadow-inner">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path ||
                  (link.path !== "/" && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-xl group ${isActive ? "text-black" : "text-zinc-500 hover:text-white"
                      }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive ? (
                      <motion.div
                        layoutId="saas-nav-active"
                        className="absolute inset-0 bg-green-neon rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute inset-0 bg-transparent rounded-xl group-hover:bg-white/[0.04] transition-all duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: User / Auth / Mobile Trigger */}
            <div className="flex items-center gap-3 md:gap-4">
              {user && isRegisteredToShop ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className={`flex items-center gap-3 p-1 rounded-full border transition-all duration-500 group ${isAccountMenuOpen
                      ? "border-green-neon/50 bg-green-neon/10"
                      : "bg-white/[0.04] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                  >
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-800 to-black border border-white/10 group-hover:scale-105 transition-transform">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-zinc-400 group-hover:text-green-neon transition-colors" />
                      )}
                    </div>
                    <div className="hidden md:flex flex-col items-start pr-3">
                      <span className="text-xs font-black text-white uppercase tracking-tighter mb-0.5 group-hover:text-green-neon transition-colors">
                        {profile?.full_name?.split(" ")[0] ?? "Profil"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-green-neon animate-pulse" />
                        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Console</span>
                      </div>
                    </div>
                    <ChevronDown className={`hidden md:block w-3 h-3 text-zinc-500 mr-2 transition-transform duration-500 ${isAccountMenuOpen ? 'rotate-180 text-green-neon' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isAccountMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute right-0 top-full mt-4 w-72 bg-zinc-900/95 backdrop-blur-3xl border border-white/[0.1] rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden z-50 p-4"
                      >
                        <div className="px-5 py-5 mb-3 bg-white/[0.03] rounded-3xl border border-white/[0.05]">
                          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Cloud Intelligence</p>
                          <h3 className="text-white font-serif font-black text-xl leading-tight mb-2">{profile?.full_name}</h3>
                          <div className="flex items-center gap-2">
                            {profile?.is_admin && (
                              <span className="px-2 py-0.5 bg-green-neon text-black text-[11px] font-black uppercase tracking-widest rounded-md">Admin</span>
                            )}
                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest opacity-60 truncate">{user.email}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Link
                            to={sp("/compte")}
                            className="flex items-center justify-between px-4 py-4 text-[11px] font-bold text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-2xl transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-700 transition-all">
                                <User className="h-4 w-4" />
                              </div>
                              Mon Dashboard
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-600" />
                          </Link>

                          {(isOwner || (!isShopContext && profile?.is_admin)) && (
                            <div className="mt-3 pt-3 border-t border-white/[0.05]">
                              <Link
                                to={adminPath}
                                className="flex items-center justify-between px-4 py-4 rounded-3xl transition-all group relative overflow-hidden bg-green-neon/5 hover:bg-green-neon/10 border border-green-neon/10 hover:border-green-neon/30"
                              >
                                <div className="flex items-center gap-3 relative z-10">
                                  <div className="w-10 h-10 rounded-xl bg-green-neon flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.2)] group-hover:scale-105 transition-transform text-black">
                                    <ShieldCheck className="h-5 w-5" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-black uppercase tracking-tight text-green-neon">Gestion Shops</span>
                                    <span className="text-xs font-bold text-white tracking-tight">Console Admin</span>
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 relative z-10 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/[0.05]">
                          <button
                            onClick={signOut}
                            className="w-full flex items-center gap-3 px-4 py-4 text-xs font-black uppercase tracking-[0.3em] text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all group"
                          >
                            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Déconnexion
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/connexion"
                    className="hidden md:block text-xs font-black uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-all px-6 py-3 hover:bg-white/[0.04] rounded-2xl border border-transparent hover:border-white/[0.08] active:scale-95"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/ouvrir-boutique"
                    className="group relative flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-green-neon rounded-2xl md:rounded-[1.25rem] transition-all hover:scale-[1.05] active:scale-95 shadow-[0_15px_40px_rgba(57,255,20,0.25)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-[-45deg]" />
                    <Store className="w-4 h-4 text-black relative z-10" />
                    <span className="text-xs font-black uppercase tracking-[0.15em] text-black relative z-10">Ouvrir un Shop</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Trigger (On the right) */}
              <div className="lg:hidden">
                <button
                  className="p-3.5 text-zinc-400 hover:text-white bg-white/[0.04] rounded-[1.25rem] border border-white/[0.08] active:scale-90 transition-all shadow-xl hover:bg-white/[0.08]"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
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
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed inset-0 z-[100] lg:hidden bg-zinc-950 flex flex-col overflow-hidden"
            >
              {/* Background Glow Decorations */}
              <div className="absolute top-0 right-0 w-[100%] h-[50%] bg-green-neon/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[80%] h-[30%] bg-green-neon/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              {/* Mobile header */}
              <div className="flex items-center justify-between px-6 h-24 relative z-10 border-b border-white/[0.04] bg-zinc-950/40 backdrop-blur-2xl">
                <Link to={isShopContext ? sp('/') : '/'} className="flex items-center group" onClick={() => setIsMenuOpen(false)}>
                  <div className="relative">
                    <div className="absolute inset-0 blur-2xl bg-green-neon/20 rounded-full scale-150" />
                    <img src="/logo.png" alt="Green IA SaaS" className="h-16 md:h-20 w-auto object-contain relative z-10" />
                  </div>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-4 text-zinc-400 hover:text-white rounded-[2rem] bg-white/[0.04] border border-white/[0.08] active:scale-95 transition-all shadow-xl"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 overflow-y-auto px-6 py-12 relative z-10 scrollbar-none">
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 ml-6 mb-4">Espace Plateforme</p>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, type: "spring", damping: 20 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center justify-between px-8 py-6 rounded-[2.5rem] transition-all duration-500 border ${location.pathname === link.path
                          ? "bg-green-neon text-black border-transparent shadow-[0_20px_40px_rgba(57,255,20,0.2)]"
                          : "text-zinc-400 border-white/[0.03] hover:bg-white/[0.02] hover:border-white/[0.08]"
                          }`}
                      >
                        <span className="text-3xl font-serif font-black tracking-tight">{link.name}</span>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${location.pathname === link.path ? "bg-black/10" : "bg-white/5 text-zinc-600 group-hover:rotate-45 group-hover:bg-white/10 group-hover:text-white"}`}>
                          <ArrowRight className={`w-6 h-6 ${location.pathname === link.path ? "text-black" : ""}`} />
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  <div className="pt-8">
                    <Link
                      to="/ouvrir-boutique"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-8 py-7 bg-white text-black rounded-[2.5rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-[1.02] transition-transform active:scale-95"
                    >
                      <div className="flex items-center gap-4">
                        <Store className="w-5 h-5" />
                        Lancer ma Boutique Cloud
                      </div>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </nav>

              {/* Mobile footer actions */}
              <div className="px-6 pb-12 pt-8 border-t border-white/[0.06] bg-zinc-950/60 backdrop-blur-3xl relative z-20">
                {user && isRegisteredToShop ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-5 bg-white/[0.03] border border-white/[0.06] rounded-[2.5rem]">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg">
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-7 h-7 text-zinc-500" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white font-serif font-black text-xl leading-none mb-1.5">{profile?.full_name}</p>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.15em] opacity-60 truncate max-w-[180px]">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        to={sp("/compte")}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex flex-col items-center gap-3 p-6 bg-white/[0.04] border border-white/[0.06] rounded-[2rem] hover:bg-white/[0.08] transition-all"
                      >
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                          <User className="w-5 h-5 text-zinc-400" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-300">Console</span>
                      </Link>
                      {(isOwner || (!isShopContext && profile?.is_admin)) && (
                        <Link
                          to={adminPath}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex flex-col items-center gap-3 p-6 bg-green-neon/5 border border-green-neon/10 rounded-[2rem] hover:bg-green-neon/10 transition-all"
                        >
                          <div className="w-10 h-10 rounded-xl bg-green-neon flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-black" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-green-neon">Admin</span>
                        </Link>
                      )}
                    </div>

                    <button
                      onClick={() => { signOut(); setIsMenuOpen(false); }}
                      className="w-full py-2 text-xs font-black uppercase tracking-[0.4em] text-red-400/50 hover:text-red-400 transition-colors"
                    >
                      Fermer la console
                    </button>
                  </div>
                ) : (
                  <Link
                    to={sp("/connexion")}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-4 p-7 bg-zinc-800 text-white border border-white/10 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.25em] active:scale-[0.98] transition-all shadow-2xl"
                  >
                    <User className="h-6 w-6" /> Accéder à la Console
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

      {/* Footer */}
      <footer className="bg-black border-t border-white/[0.06] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-20">
            {/* Brand */}
            <div className="space-y-6">
              <Link to={isShopContext ? sp('/') : '/'} className="flex items-center group" aria-label="Green IA SaaS">
                <img
                  src="/logo.png"
                  alt="Green IA SaaS"
                  className="h-12 w-auto object-contain transition-all duration-500 group-hover:glow-logo"
                />
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">
                La plateforme SaaS Cloud nº1 pour le retail CBD.
                Intelligence Artificielle, Multi-tenant et Performance.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Globe, ShieldCheck].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-green-neon hover:border-green-neon/30 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200 mb-8 underline decoration-green-neon underline-offset-8">Plateforme</h3>
              <ul className="space-y-4">
                {[
                  { name: "IA BudTender", path: sp("/catalogue") },
                  { name: "Gestion Stocks", path: sp("/compte") },
                  { name: "Système POS", path: sp("/admin") },
                  { name: "Fidélité & Web3", path: sp("/compte/fidelite") }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-zinc-500 hover:text-white transition-colors text-sm font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-200 mb-8 underline decoration-green-neon underline-offset-8">Ressources</h3>
              <ul className="space-y-4 text-sm text-zinc-500 font-light">
                {["Documentation API", "Centre de Support", "Status Plateforme", "Sécurité & RLS"].map((item) => (
                  <li key={item} className="hover:text-white cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-4">
              <h4 className="text-white font-bold">Prêt à scaler ?</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">Rejoignez plus de 500 shops CBD qui utilisent déjà notre IA.</p>
              <Link to="/ouvrir-boutique" className="block w-full text-center py-3 bg-green-neon text-black text-xs font-black uppercase rounded-xl hover:scale-105 transition-transform">
                Essai Gratuit
              </Link>
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
            <p>&copy; {new Date().getFullYear()} Green IA SaaS. Global Node Infrastructure.</p>
            <div className="flex gap-8">
              <Link to="/mentions-legales" className="hover:text-green-neon transition-colors">Politique de Confidentialité</Link>
              <Link to="/mentions-legales" className="hover:text-green-neon transition-colors">Termes SaaS</Link>
              <Link to="/mentions-legales" className="hover:text-green-neon transition-colors">SLA</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
