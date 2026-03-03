import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Leaf,
  ArrowRight,
  Star,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Zap,
  LayoutDashboard,
  Store,
  Users,
  LineChart,
  Globe,
  Smartphone
} from "lucide-react";
import FAQ from "../components/FAQ";
import SEO from "../components/SEO";

export default function Home() {
  const stats = [
    { value: "40%", label: "Augmentation Conversion", icon: <LineChart className="w-4 h-4" /> },
    { value: "24/7", label: "Conseil IA BudTender", icon: <Sparkles className="w-4 h-4" /> },
    { value: "Multi-Shop", label: "Gestion Centralisée", icon: <LayoutDashboard className="w-4 h-4" /> },
    { value: "Omnicanal", label: "Web + Boutique", icon: <Smartphone className="w-4 h-4" /> },
  ];

  const features = [
    {
      title: "IA BudTender Personnalisée",
      description: "Une intelligence artificielle qui conseille vos clients en fonction de leurs besoins (stress, sommeil, douleurs) et booste votre panier moyen.",
      icon: <MessageCircle className="w-6 h-6 text-green-neon" />
    },
    {
      title: "Plateforme Multi-Tenant",
      description: "Isolée et sécurisée. Gérez un ou plusieurs points de vente depuis une interface unique et ultra-rapide.",
      icon: <ShieldCheck className="w-6 h-6 text-green-neon" />
    },
    {
      title: "POS & E-commerce Synchronisés",
      description: "Vos stocks physique et en ligne sont unis. Un seul inventaire, une seule base client, une fluidité totale.",
      icon: <Store className="w-6 h-6 text-green-neon" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white overflow-hidden font-sans">
      <SEO
        title="Green Mood SaaS | La Plateforme n°1 pour les Boutiques CBD"
        description="Propulsez votre shop CBD avec l'IA. BudTender intelligent, gestion multi-boutique, POS intégré et programme de fidélité automatisé."
      />

      {/* ────────── Hero Section : SaaS Focus ────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-neon/5 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full animate-bounce" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto text-center px-5 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-green-neon/30 bg-green-neon/5 text-green-neon text-xs font-bold tracking-widest mb-8">
              <Sparkles className="w-4 h-4" /> POUR LES PROFESSIONNELS DU CBD
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tighter leading-[0.9] mb-10">
              PASSEZ À L'ÈRE <br />
              <span className="text-green-neon italic glow-green">AUGMENTÉE.</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Green Mood est le premier <span className="text-white font-medium">SaaS IA-Native</span> conçu spécifiquement pour le marché du CBD.
              Vendez plus, comprenez mieux vos clients, automatisez votre succès.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/ouvrir-boutique" className="group relative px-10 py-6 bg-green-neon text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(20,229,148,0.3)]">
                <span className="relative z-10 flex items-center gap-3">
                  LANCER MA BOUTIQUE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/contact" className="px-10 py-6 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all">
                Demander une Démo
              </Link>
            </div>
          </motion.div>

          {/* Simple Dashboard Mockup placeholder style */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 w-full max-w-5xl aspect-video bg-zinc-900 rounded-t-3xl border-x border-t border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden p-4"
          >
            <div className="w-full h-full bg-black/40 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col">
              <div className="h-10 border-b border-zinc-800 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
              </div>
              <div className="flex-1 flex gap-4 p-4">
                <div className="w-16 bg-zinc-900/50 rounded-xl" />
                <div className="flex-1 space-y-4 pt-4">
                  <div className="h-8 bg-zinc-800/50 rounded-lg w-1/3" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-32 bg-green-neon/5 border border-green-neon/10 rounded-2xl" />
                    <div className="h-32 bg-zinc-900/50 border border-zinc-800 rounded-2xl" />
                    <div className="h-32 bg-zinc-900/50 border border-zinc-800 rounded-2xl" />
                  </div>
                  <div className="h-40 bg-zinc-900/50 border border-zinc-800 rounded-2xl" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────── Stats Bar ────────── */}
      <div className="border-y border-white/[0.05] bg-zinc-900/20 backdrop-blur-md relative z-30">
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-green-neon/10 flex items-center justify-center text-green-neon border border-green-neon/20">
                  {s.icon}
                </div>
                <div className="text-center">
                  <span className="text-3xl font-black text-white">{s.value}</span>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────── IA Focus Deep Dive ────────── */}
      <section className="py-32 px-5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              Le premier <br />
              <span className="text-green-neon italic">BudTender IA</span> <br />
              au monde.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed font-light">
              Ne laissez plus un visiteur sans conseil. Notre IA BudTender agit comme votre meilleur vendeur,
              disponible 24/7 sur votre site et en magasin, capable de conseiller sur plus de 1000 références
              en respectant les contraintes légales.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {[
                { t: "Profilage Santé & Wellness", d: "Questionnement intelligent sur le sommeil, le stress et les habitudes." },
                { t: "Vente Suggestive (Cross-Sell)", d: "Algorithme de recommandation basé sur les terpènes et les effets." },
                { t: "Bilingue & Multi-canal", d: "Accessible via chat, QR code en rayon ou terminal vocal." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-green-neon transition-colors shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-neon" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.t}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-green-neon/20 blur-[100px] opacity-30" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 aspect-square flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-2xl border border-zinc-800 bg-black/50 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                    <div className="w-3 h-3 rounded-full bg-green-500/30" />
                  </div>
                  <div className="bg-green-neon/10 px-3 py-1 rounded-full text-[10px] text-green-neon font-black">AI LIVE</div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="bg-zinc-800/50 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-xs text-zinc-400">"Quels sont vos besoins aujourd'hui ? Sommeil, détente ?"</div>
                  <div className="bg-green-neon/20 p-4 rounded-2xl rounded-tr-none max-w-[80%] self-end ml-auto text-xs text-white">"Je cherche quelque chose pour mes douleurs articulaires."</div>
                  <div className="bg-zinc-800/50 p-4 rounded-2xl rounded-tl-none max-w-[90%] text-xs text-zinc-300">
                    <Sparkles className="w-4 h-4 text-green-neon mb-2" />
                    "Je vous recommande notre **Huile Full Spectrum 20%** couplée à l'infusion **Confort**."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Features Grid ────────── */}
      <section className="py-32 px-5 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Un Ecosystème <span className="text-green-neon italic">Complet.</span></h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Plus qu'un simple logiciel, une infrastructure solide pour scaler votre business CBD.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="p-10 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-green-neon/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-green-neon/10 rounded-2xl flex items-center justify-center mb-8">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Pricing Preview (Strategic for SaaS) ────────── */}
      <section className="py-32 px-5 max-w-5xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-neon/5 blur-[100px]" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold">Prêt pour la <br /> <span className="text-green-neon italic">Croissance ?</span></h2>
              <p className="text-zinc-400">Commencez gratuitement avec notre plan Essentiel et débloquez la puissance de l'IA quand vous en avez besoin.</p>
              <ul className="space-y-3">
                {['Zéro frais d\'installation', 'Configuration en 5 minutes', 'Support technique dédié pro'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-neon" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black/40 border border-zinc-800 rounded-3xl p-8 text-center space-y-6">
              <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Plan Essentiel</div>
              <div className="text-6xl font-black">0€<span className="text-sm text-zinc-600">/mois</span></div>
              <p className="text-xs text-zinc-500">Idéal pour tester l'impact de l'IA BudTender sur vos ventes.</p>
              <Link to="/ouvrir-boutique" className="block w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-green-neon transition-all">
                Démarrer Maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── FAQ : Focus SaaS ────────── */}
      <FAQ />

      {/* ────────── Final CTA ────────── */}
      <section className="py-32 text-center px-5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-green-neon/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <h2 className="text-5xl md:text-8xl font-serif font-black text-white tracking-tight">
            VOTRE SUCCÈS <br />
            <span className="text-green-neon">EST AUTOMATIQUE.</span>
          </h2>
          <Link
            to="/ouvrir-boutique"
            className="inline-flex items-center gap-4 px-12 py-6 bg-green-neon text-black font-black rounded-2xl hover:shadow-[0_0_40px_rgba(20,229,148,0.4)] active:scale-[0.98] transition-all text-lg"
          >
            OUVRIR MA BOUTIQUE SAAS
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-zinc-500 text-sm">Libérez-vous des tâches répétitives. Concentrez-vous sur vos clients.</p>
        </motion.div>
      </section>

    </div>
  );
}
