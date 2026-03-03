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
  Smartphone,
  Cpu,
  Database,
  Lock,
  BarChart3
} from "lucide-react";
import FAQ from "../components/FAQ";
import SEO from "../components/SEO";

export default function Home() {
  const stats = [
    { value: "+42%", label: "Taux de Conversion", icon: <LineChart className="w-4 h-4" /> },
    { value: "0.2s", label: "Latence API Cloud", icon: <Zap className="w-4 h-4" /> },
    { value: "100%", label: "Conformité RLS", icon: <ShieldCheck className="w-4 h-4" /> },
    { value: "Multi-Store", label: "Architecture Native", icon: <Database className="w-4 h-4" /> },
  ];

  const features = [
    {
      title: "BudTender IA™ Propriétaire",
      description: "Notre moteur NLP spécialisé CBD analyse les besoins physiologiques pour recommander les terpènes et concentrations exactes.",
      icon: <Sparkles className="w-6 h-6 text-green-neon" />,
      tag: "Intelligence"
    },
    {
      title: "Infrastructure Multi-Tenant",
      description: "Une isolation totale des bases de données par boutique pour une sécurité maximale et une scalabilité globale instantanée.",
      icon: <Database className="w-6 h-6 text-green-neon" />,
      tag: "Infrastructure"
    },
    {
      title: "Écosystème Omnicanal",
      description: "Synchronisation biométrique du stock entre votre terminal point de vente (POS) et votre boutique e-commerce.",
      icon: <Globe className="w-6 h-6 text-green-neon" />,
      tag: "Operations"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white overflow-hidden font-sans selection:bg-green-neon selection:text-black">
      <SEO
        title="Green IA SaaS | L'Infrastructure Intelligence Artificielle pour le Retail CBD"
        description="Propulsez votre entreprise CBD avec le premier SaaS IA-Native. BudTender intelligent, gestion multi-boutique, POS intégré et sécurité bancaire."
      />

      {/* ────────── Hero Section : Ultra B2B SaaS ────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-green-neon/[0.03] blur-[150px] rounded-full" />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-zinc-900/50 blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto text-center px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 py-2 px-5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-neon"></span>
              </span>
              <span className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">Next-Gen CBD Infrastructure</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter leading-[0.85] mb-12">
              RETAIL <br />
              <span className="text-green-neon italic glow-green">AUGMENTÉ.</span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-16 px-4">
              Green IA est le premier <span className="text-white font-medium">SaaS Cloud-Native</span> conçu pour l'industrie du CBD.
              Centralisez vos opérations, sécurisez vos data et automatisez vos ventes grâce à l'IA.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/ouvrir-boutique" className="group relative px-12 py-6 bg-green-neon text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(20,229,148,0.2)]">
                <span className="relative z-10 flex items-center gap-3 text-sm">
                  DÉPLOYER MON SHOP <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/solution" className="px-12 py-6 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.08] text-white font-bold rounded-2xl transition-all text-sm">
                Voir l'Architecture
              </Link>
            </div>
          </motion.div>

          {/* SaaS Console Preview */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-28 w-full max-w-6xl relative"
          >
            <div className="absolute -inset-10 bg-green-neon/10 blur-[100px] opacity-20" />
            <div className="relative bg-zinc-900/60 rounded-t-[3rem] border-x border-t border-white/[0.08] backdrop-blur-3xl shadow-[0_-20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="h-12 border-b border-white/[0.06] flex items-center px-6 gap-3 bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1.5 bg-black/40 rounded-lg border border-white/[0.04] text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-2.5 h-2.5" /> greenIA-console.cloud
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 aspect-[21/9] flex gap-8">
                {/* Visual Dashboard Mockup */}
                <div className="w-1/4 h-full space-y-4 hidden md:block">
                  <div className="h-16 bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
                  <div className="h-32 bg-green-neon/5 rounded-2xl border border-green-neon/10" />
                  <div className="h-16 bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
                </div>
                <div className="flex-1 space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-zinc-800/40 rounded-lg w-1/3" />
                    <div className="h-8 bg-green-neon/10 rounded-lg w-20" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="h-40 bg-zinc-800/20 rounded-[2rem] border border-white/5" />
                    <div className="h-40 bg-zinc-800/20 rounded-[2rem] border border-white/5" />
                    <div className="h-40 bg-zinc-800/20 rounded-[2rem] border border-white/5 hidden md:block" />
                  </div>
                  <div className="h-32 bg-zinc-900/40 rounded-[2rem] border border-white/5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────── Stats Grid : Business Focused ────────── */}
      <section className="relative z-30 py-24 border-y border-white/[0.05] bg-zinc-900/10 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-green-neon group hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div>
                  <span className="text-4xl font-serif font-black text-white tracking-tighter">{s.value}</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-2">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Features : The 3 Pillars ────────── */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <div className="max-w-2xl space-y-6">
              <span className="text-green-neon text-xs font-black uppercase tracking-[0.4em]">Core Capabilities</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-none uppercase">
                UNE MACHINE <br /> DE <span className="text-green-neon italic">CROISSANCE.</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm font-light leading-relaxed">
              Nous avons simplifié la complexité technologique pour vous permettre de vous concentrer sur l'essentiel : vos produits et vos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-10 rounded-[3rem] bg-zinc-900 border border-white/[0.04] hover:border-green-neon/30 hover:bg-zinc-900/60 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-neon/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-10 border border-white/[0.08] group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{feature.tag}</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{feature.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">{feature.description}</p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/[0.04] flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── IA BudTender : Deep Value ────────── */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-neon/[0.02] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-green-neon/5 border border-green-neon/10">
              <Cpu className="w-4 h-4 text-green-neon" />
              <span className="text-green-neon text-[10px] font-black uppercase tracking-widest">BudTender Engine™ v4.2</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif font-black leading-[0.9] text-white uppercase italic tracking-tighter">
              L'IA QUI <br /> <span className="text-green-neon glow-green">VEND</span> POUR VOUS.
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed font-light">
              Le BudTender IA n'est pas un simple moteur de recherche. C'est une intelligence entraînée
              sur des milliers d'analyses terpéniques et de retours clients pour offrir un conseil
              plus précis qu'un expert humain, 24/7.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { t: "Profilage Physiologique", d: "Analyse intelligente du sommeil, de l'anxiété et de la douleur." },
                { t: "Recommandation par Terpènes", d: "Suggestion basée sur la bio-chimie réelle des produits." },
                { t: "Fidélisation Prédictive", d: "Détecte les besoins récurrents de vos clients." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 bg-white/[0.02] border border-white/[0.04] rounded-[2rem] hover:border-green-neon/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-neon" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{item.t}</h4>
                    <p className="text-zinc-500 text-sm font-light">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-green-neon/10 blur-[100px] opacity-30" />
            <div className="relative bg-zinc-950 border border-white/[0.08] rounded-[3rem] p-8 aspect-square flex flex-col shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-10 border-b border-white/[0.06] pb-6">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
                <div className="text-[10px] font-black text-green-neon uppercase tracking-widest bg-green-neon/10 px-3 py-1.5 rounded-full">BudTender Online</div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 shrink-0" />
                  <div className="p-4 bg-zinc-900 rounded-2xl rounded-tl-none text-xs text-zinc-400 leading-relaxed font-light">
                    "Bonjour, je cherche une fleur pour soulager mes tensions cervicales sans effet cérébral trop marqué."
                  </div>
                </div>
                <div className="flex gap-3 max-w-[90%] ml-auto flex-row-reverse">
                  <div className="w-8 h-8 rounded-lg bg-green-neon flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                  <div className="p-5 bg-green-neon/5 border border-green-neon/10 rounded-2xl rounded-tr-none text-xs text-white leading-relaxed font-medium">
                    "Je vous suggère la **Purple Kush H4** : son profil riche en Myrcène cible les récepteurs musculaires, idéale pour vos tensions, sans altérer votre concentration."
                  </div>
                </div>
              </div>

              <div className="mt-8 h-20 bg-white/[0.02] border-t border-white/[0.06] -mx-8 -mb-8 flex items-center justify-center px-8">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <motion.div key={i} animate={{ height: [8, 24, 8] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }} className="w-1 bg-green-neon/30 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Enterprise Reliability Section ────────── */}
      <section className="py-40 px-6 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <ShieldCheck />, title: "Full Compliance", desc: "RLS & Supabase Auth Standards" },
                { icon: <Lock />, title: "Data Isolation", desc: "Point-to-point Encryption" },
                { icon: <BarChart3 />, title: "Real-time Stats", desc: "WebSocket infrastructure" },
                { icon: <Smartphone />, title: "Cloud POS", desc: "Native Hardware Integration" }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-black border border-white/5 rounded-3xl space-y-4">
                  <div className="text-green-neon">{item.icon}</div>
                  <h4 className="text-white font-bold text-sm tracking-tight">{item.title}</h4>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-zinc-600 text-xs font-black uppercase tracking-[0.4em]">Enterprise Operations</h3>
            <h2 className="text-5xl md:text-6xl font-serif font-black text-white italic leading-tight uppercase">
              UNE FIABILITÉ <br /> POUR VOTRE <br /> <span className="text-green-neon">BUSINESS.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">
              Nous opérons sur un cluster mondial de bases de données pour garantir
              un temps de réponse ultra-rapide et une disponibilité de 99.99%.
              Vos données sont en sécurité, votre croissance libérée.
            </p>
            <div className="pt-8">
              <Link to="/solution" className="inline-flex items-center gap-4 text-white font-black uppercase text-xs tracking-widest group">
                Explorer la tech stack <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Pricing / Start for Free ────────── */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto rounded-[4rem] bg-zinc-900 border border-white/[0.08] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-neon/5 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000" />

          <div className="relative z-10 space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-white leading-none uppercase italic">
                PRÊT À <br /> <span className="text-green-neon glow-green">SCALER ?</span>
              </h2>
              <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Rejoignez les professionnels qui ont déjà transformé leur business CBD
                grâce à notre plateforme intelligente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/ouvrir-boutique" className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-green-neon hover:scale-105 transition-all shadow-2xl">
                Essai Gratuit : 0€ / mois
              </Link>
              <Link to="/contact" className="px-12 py-6 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-xs">
                Demander une Démo Directe
              </Link>
            </div>

            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em]">
              Zéro frais d'installation • Configuration en 5 minutes
            </p>
          </div>
        </div>
      </section>

      <FAQ />

      {/* ────────── Footer CTA ────────── */}
      <section className="py-40 text-center px-6 relative border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-7xl font-serif font-black text-white tracking-tight uppercase">
            VOTRE SUCCÈS EST <br />
            <span className="text-green-neon italic">AUTOMATIQUE.</span>
          </h2>
          <Link
            to="/ouvrir-boutique"
            className="inline-flex items-center gap-4 px-12 py-6 bg-green-neon text-black font-black rounded-2xl hover:shadow-[0_0_50px_rgba(20,229,148,0.4)] active:scale-[0.98] transition-all text-sm uppercase tracking-widest"
          >
            OUVRIR MON SHOP SAAS
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

