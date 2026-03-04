import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Database,
  Globe,
  LayoutDashboard,
  LineChart,
  Lock,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Users,
  Zap,
} from "lucide-react";
import FAQ from "../components/FAQ";
import SEO from "../components/SEO";
import AiSimulator from "../components/AiSimulator";
import PricingSection from "../components/PricingSection";

export default function Home() {
  const stats = [
    { value: "+42%", label: "Taux de conversion", icon: <LineChart className="h-4 w-4" /> },
    { value: "0.2s", label: "Rapidité de la plateforme", icon: <Zap className="h-4 w-4" /> },
    { value: "100%", label: "Sécurité des données", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "Multi-store", label: "Gestion multi-boutique", icon: <Database className="h-4 w-4" /> },
  ];

  const pillars = [
    {
      title: "Conseiller de vente intelligent",
      description:
        "Un assistant qui guide vos clients vers les bons produits et augmente votre panier moyen.",
      icon: <Sparkles className="h-5 w-5 text-green-neon" />,
      tag: "Intelligence",
    },
    {
      title: "Gestion multi-boutique",
      description:
        "Gérez une ou plusieurs boutiques depuis un seul espace, sans complexité technique.",
      icon: <Database className="h-5 w-5 text-green-neon" />,
      tag: "Gestion",
    },
    {
      title: "Ventes en ligne + magasin",
      description:
        "Vos stocks, commandes et performances restent synchronisés automatiquement.",
      icon: <Globe className="h-5 w-5 text-green-neon" />,
      tag: "Opérations",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-brand-950 text-white">
      <SEO
        title="Green IA SaaS | L'Infrastructure Intelligence Artificielle pour le Retail CBD"
        description="Propulsez votre entreprise CBD avec le premier SaaS IA-Native. BudTender intelligent, gestion multi-boutique, POS intégré et sécurité bancaire."
      />

      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt="Zen CBD Backdrop"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-950/20 to-brand-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-transparent to-brand-950/40" />
        </div>

        <div className="content-wrap relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-neon/10 border border-green-neon/20 text-[11px] font-black uppercase tracking-[0.3em] text-green-neon mb-8"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-neon animate-pulse" />
              L'Elite du SaaS CBD — Propulsé par l'IA
            </motion.span>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-white mb-8">
              L'INTELLIGENCE <br />
              AU SERVICE DE <br />
              <span className="glow-green italic text-green-neon">VOTRE CROISSANCE.</span>
            </h1>

            <p className="section-copy text-lg sm:text-xl max-w-2xl text-zinc-300 mb-10 leading-relaxed font-light">
              Green IA est la première plateforme "AI-Native" conçue exclusivement pour l'industrie du CBD.
              Automatisez vos conseils, optimisez vos stocks et scalez votre business sans limites.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <Link to="/ouvrir-boutique" className="btn-primary px-10 py-5 text-base flex items-center justify-center gap-2 group">
                Commencer l'expérience <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/solution" className="btn-secondary px-10 py-5 text-base flex items-center justify-center">
                Découvrir la plateforme
              </Link>
            </div>
          </motion.div>

          {/* Floating Stats or subtle element if needed */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
              >
                <div className="mb-3 text-green-neon">{stat.icon}</div>
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-section bg-brand-900/60">
        <div className="content-wrap grid gap-6 lg:grid-cols-3">
          {pillars.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="ui-card p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-zinc-900 p-3">{feature.icon}</div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">{feature.tag}</p>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">{feature.title}</h2>
              <p className="section-copy">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="app-section">
        <div className="content-wrap grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="section-kicker mb-4 inline-flex items-center gap-2">
              <Cpu className="h-4 w-4" /> BudTender Engine™
            </p>
            <h2 className="section-title">
              Une IA utile, <span className="text-green-neon">sans friction</span>
            </h2>
            <p className="section-copy mt-5">
              Le conseiller conversationnel personnalise l’expérience en direct et transforme les interactions en décisions d’achat.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Profilage client contextuel et recommandations instantanées",
                "Suggestions basées sur les terpènes et préférences",
                "Relances intelligentes pour fidélisation événementielle",
              ].map((text) => (
                <div key={text} className="ui-card flex items-start gap-3 rounded-2xl p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-neon" />
                  <p className="text-sm text-zinc-300">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <AiSimulator />
          </div>
        </div>
      </section>

      <section className="app-section bg-brand-900/60">
        <div className="content-wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Conformité", desc: "Sécurité des accès et données compartimentées." },
              { icon: <Lock className="h-5 w-5" />, title: "Isolation", desc: "Protection stricte de chaque boutique." },
              { icon: <BarChart3 className="h-5 w-5" />, title: "Analytics", desc: "KPIs en temps réel et pilotage rapide." },
              { icon: <Smartphone className="h-5 w-5" />, title: "POS mobile", desc: "Compatibilité terrain pour événements." },
            ].map((item) => (
              <div key={item.title} className="ui-card rounded-2xl p-5">
                <div className="mb-3 text-green-neon">{item.icon}</div>
                <h3 className="mb-1 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="section-kicker">Operations suite</p>
            <h2 className="section-title mt-4">Une plateforme fiable pour votre quotidien</h2>
            <p className="section-copy mt-5">
              Tableaux de bord, suivi des interactions et vision unifiée des ventes pour un pilotage fluide sur mobile, tablette et desktop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[LayoutDashboard, Store, Users].map((Icon, idx) => (
                <span key={idx} className="ui-card inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs uppercase tracking-[0.14em] text-zinc-300">
                  <Icon className="h-4 w-4 text-green-neon" /> Module actif
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-section">
        <div className="content-wrap ui-card rounded-[2.2rem] p-8 text-center sm:p-12">
          <h2 className="section-title mx-auto max-w-3xl text-4xl sm:text-6xl">
            Prêt à faire grandir votre <span className="text-green-neon">boutique CBD</span> ?
          </h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">
            Lancez rapidement votre espace pro et pilotez vos ventes sans passer par des outils compliqués.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <Link to="/ouvrir-boutique" className="btn-primary">
              Commencer maintenant
            </Link>
            <Link to="/contact" className="btn-secondary">
              Parler à un conseiller
            </Link>
          </div>
        </div>
      </section>

      <PricingSection />
      <FAQ />
    </div>
  );
}
