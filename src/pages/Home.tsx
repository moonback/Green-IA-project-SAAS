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

export default function Home() {
  const stats = [
    { value: "+42%", label: "Taux de conversion", icon: <LineChart className="h-4 w-4" /> },
    { value: "0.2s", label: "Latence API Cloud", icon: <Zap className="h-4 w-4" /> },
    { value: "100%", label: "Conformité RLS", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "Multi-store", label: "Architecture native", icon: <Database className="h-4 w-4" /> },
  ];

  const pillars = [
    {
      title: "BudTender IA™ propriétaire",
      description:
        "Un moteur NLP spécialisé qui oriente les clients vers le bon produit avec un langage naturel et contextuel.",
      icon: <Sparkles className="h-5 w-5 text-green-neon" />,
      tag: "Intelligence",
    },
    {
      title: "Infrastructure multi-tenant",
      description:
        "Isolation des données par boutique, sécurité renforcée et scalabilité sans friction pour un déploiement en réseau.",
      icon: <Database className="h-5 w-5 text-green-neon" />,
      tag: "Architecture",
    },
    {
      title: "Commerce omnicanal",
      description:
        "Synchronisation entre POS, e-commerce et analytics pour piloter les ventes en temps réel.",
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

      <section className="app-section relative pb-16 pt-24 sm:pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[550px] w-[720px] -translate-x-1/2 rounded-full bg-green-neon/10 blur-[130px]" />
          <div className="absolute right-[-12%] top-[18%] h-[280px] w-[280px] rounded-full bg-emerald-400/10 blur-[120px]" />
        </div>

        <div className="content-wrap relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            <span className="ui-card mb-8 inline-flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-neon" />
              Next-gen event retail infrastructure
            </span>

            <h1 className="section-title text-4xl sm:text-6xl lg:text-7xl">
              SaaS CBD orienté <span className="glow-green italic text-green-neon">performance réseau</span>
            </h1>
            <p className="section-copy mt-6 max-w-2xl text-base sm:text-lg">
              Green IA aide les dirigeants CBD à industrialiser acquisition, conversion et fidélisation sur tous leurs points de vente.
            </p>

            <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
              <Link to="/ouvrir-boutique" className="btn-primary">
                Parler à un expert SaaS B2B <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/solution" className="btn-secondary">
                Voir l'architecture SaaS
              </Link>
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="ui-card rounded-2xl p-4"
              >
                <div className="mb-2 inline-flex rounded-xl bg-green-neon/10 p-2 text-green-neon">{stat.icon}</div>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{stat.label}</p>
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

          <div className="ui-card rounded-[2rem] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">Simulation conversation</p>
              <span className="rounded-full bg-green-neon/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-green-neon">
                En ligne
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-zinc-300">
                Je veux une suggestion douce pour mes invités qui découvrent le produit.
              </div>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-none border border-green-neon/20 bg-green-neon/10 p-3 text-zinc-100">
                Je recommande un starter pack équilibré, orienté détente, avec dosage progressif et fiche explicative QR.
              </div>
            </div>
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
            <h2 className="section-title mt-4">Fiabilité premium pour les opérateurs CBD</h2>
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
            Prêt à structurer votre <span className="text-green-neon">croissance CBD</span> ?
          </h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">
            Déploiement multi-boutique, pilotage temps réel et automatisation commerciale pour accélérer votre business CBD.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <Link to="/ouvrir-boutique" className="btn-primary">
              Planifier un onboarding
            </Link>
            <Link to="/contact" className="btn-secondary">
              Parler à un expert SaaS
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
