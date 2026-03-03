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

  // Helper: construit un chemin relatif au shop ou global
  const sp = (path: string) => shopSlug ? `/${shopSlug}${path}` : path;
  const isShopContext = !!shopSlug;

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
      { name: "Solution SaaS", path: "/catalogue" },
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
      {settings.budtender_enabled && <BudTender />}

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col">
            {/* Top Row: Logo & Actions */}
            <div className="flex items-center justify-between h-20 md:h-24">
              {/* Left spacer for desktop symmetry, Mobile menu button for mobile */}
              <div className="flex-1 lg:flex items-center hidden">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold hidden xl:block">
                  #1 AI-POWERED CBD SAAS PLATFORM
                </span>
              </div>

              {/* Mobile Menu Button - Left on mobile */}
              <div className="lg:hidden flex-1">
                <button
                  className="p-2.5 text-zinc-400 hover:text-white bg-white/[0.04] rounded-xl border border-white/[0.08] transition-all active:scale-95"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

              {/* Centered Logo */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <Link to={isShopContext ? sp('/') : '/'} className="flex items-center group relative z-[1000]" aria-label="Green Mood SaaS — Accueil">
                  <div className="absolute -inset-8 bg-green-neon/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img
                    src="/logo.png"
                    alt="Green Mood CBD SaaS"
                    className="h-30 md:h-32 w-auto object-contain transition-all duration-700 group-hover:scale-105 group-hover:glow-logo"
                  />
                </Link>
              </div>

              {/* Right Actions: Cart & Account */}
              <div className="flex-1 flex justify-end items-center gap-2 md:gap-4">
                {/* Account (Desktop) */}
                {user ? (
                  <div className="relative hidden md:block">
                    <button
                      onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                      className={`flex items-center gap-2.5 p-1.5 pr-4 rounded-full border transition-all duration-300 ${isAccountMenuOpen
                        ? "bg-green-neon border-green-neon text-black"
                        : "bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:border-green-neon/40 hover:text-white shadow-lg"
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isAccountMenuOpen ? "bg-black/20" : "bg-white/[0.08]"
                        }`}>
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">
                        {profile?.full_name?.split(" ")[0] ?? "Profil"}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isAccountMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.95 }}
                          className="absolute right-0 top-full mt-4 w-62 bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-2"
                        >
                          <Link
                            to={sp("/compte")}
                            className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-zinc-400 hover:bg-white/[0.04] hover:text-white rounded-xl transition-all"
                          >
                            <User className="h-4 w-4" />
                            Tableau de bord Console
                          </Link>
                          {profile?.is_admin && (
                            <Link
                              to={sp("/admin")}
                              className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-green-neon hover:bg-green-neon/10 rounded-xl transition-all"
                            >
                              <ShieldCheck className="h-4 w-4" />
                              Gestion Boutiques
                            </Link>
                          )}
                          <div className="h-px bg-white/[0.06] my-2 mx-4" />
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
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                      to={sp("/connexion")}
                      className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors px-4"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/ouvrir-boutique"
                      className="flex items-center gap-3 px-6 py-2.5 bg-green-neon text-black rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:scale-105 active:scale-95 group font-black"
                    >
                      <span className="text-[10px] uppercase tracking-widest">Ouvrir ma boutique</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row: Navigation (Desktop only) */}
            <nav className="hidden lg:flex items-center justify-center gap-2 pb-5 pt-2 border-t border-white/[0.03]">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path ||
                  (link.path !== "/" && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 group ${isActive ? "text-green-neon" : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-green-neon/[0.03] rounded-full border border-green-neon/10 -z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute inset-0 bg-transparent rounded-full group-hover:bg-white/[0.03] transition-all duration-300 -z-0" />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-neon rounded-full shadow-[0_0_8px_rgba(57,255,20,0.8)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
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
              {/* Background Glow Decorations */}
              <div className="absolute top-0 right-0 w-[80%] h-[40%] bg-green-neon/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[60%] h-[30%] bg-green-neon/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

              {/* Mobile header */}
              <div className="flex items-center justify-center px-6 h-32 relative z-10 border-b border-white/[0.04] bg-zinc-950/50 backdrop-blur-md">
                <Link to={isShopContext ? sp('/') : '/'} className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <img src="/logo.png" alt="Green Mood SaaS" className="h-32 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute right-6 p-3 text-zinc-400 hover:text-white rounded-2xl bg-white/[0.04] border border-white/[0.08] active:scale-90 transition-all"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 overflow-y-auto px-6 py-10 relative z-10 scrollbar-none">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-black mb-4 ml-4">Plateforme SaaS</span>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group flex items-center justify-between px-5 py-4 rounded-3xl transition-all duration-300 ${location.pathname === link.path
                          ? "bg-green-neon/10 text-green-neon"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                          }`}
                      >
                        <span className="text-2xl font-serif font-bold tracking-tight">{link.name}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${location.pathname === link.path ? "bg-green-neon text-black rotate-0" : "bg-white/5 text-zinc-600 -rotate-45 group-hover:rotate-0 group-hover:bg-white/10 group-hover:text-white"}`}>
                          <Leaf className="w-4 h-4" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  <div className="h-px bg-white/5 my-6 mx-4" />
                  <Link
                    to="/ouvrir-boutique"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-6 py-5 bg-green-neon rounded-3xl text-black font-black uppercase tracking-widest text-xs"
                  >
                    Ouvrir ma boutique <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </nav>

              {/* Mobile footer actions */}
              <div className="px-6 pb-10 pt-6 border-t border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl relative z-20 space-y-4">
                {user ? (
                  <div className="flex flex-col gap-3 text-center">
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Connecté en tant que</p>
                    <p className="text-white font-serif font-black text-lg">{profile?.full_name}</p>
                    <Link to={sp("/compte")} onClick={() => setIsMenuOpen(false)} className="bg-white/5 py-4 rounded-2xl text-xs font-bold text-white border border-white/5">Console Management</Link>
                    <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="text-red-400 py-3 text-xs font-bold">Déconnexion</button>
                  </div>
                ) : (
                  <Link
                    to={sp("/connexion")}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-4 p-5 bg-white/5 text-white border border-white/10 rounded-3xl text-sm font-black uppercase tracking-[0.2em] active:scale-95 transition-all"
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

      {/* Footer */}
      <footer className="bg-black border-t border-white/[0.06] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 mb-20">
            {/* Brand */}
            <div className="space-y-6">
              <Link to={isShopContext ? sp('/') : '/'} className="flex items-center group" aria-label="Green Mood SaaS">
                <img
                  src="/logo.png"
                  alt="Green Mood SaaS"
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

          <div className="border-t border-white/[0.04] pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            <p>&copy; {new Date().getFullYear()} Green Mood SaaS. Global Node Infrastructure.</p>
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
