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
    { value: "+42%", label: "Conversion", icon: <LineChart className="h-4 w-4" /> },
    { value: "0.2s", label: "Latence", icon: <Zap className="h-4 w-4" /> },
    { value: "100%", label: "Isolation", icon: <ShieldCheck className="h-4 w-4" /> },
    { value: "Scale", label: "Multi-Store", icon: <Database className="h-4 w-4" /> },
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

      <section className="relative pb-32 pt-40 md:pt-56 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[800px] w-[1000px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px] animate-pulse-slow" />
          <div className="absolute right-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-emerald-400/5 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 md:p-24 shadow-2xl overflow-hidden">
            <div className="absolute -inset-10 bg-gradient-to-br from-white/5 to-transparent opacity-30" />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto flex flex-col items-center text-center space-y-12"
            >
              <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl text-label">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                L'Infrastructure de Référence pour le Retail CBD
              </div>

              <h1 className="text-display">
                Architecture <span className="text-emerald-500 font-light not-italic">Intelligente</span> <br />
                <span className="text-white opacity-40">Performance Pure.</span>
              </h1>

              <p className="text-premium-body border-l-2 border-white/5 pl-8 max-w-3xl">
                Green IA centralise votre écosystème e-commerce, vos points de vente physiques et votre relation client au sein d'une forge technologique pilotée par l'IA.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4 w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/ouvrir-boutique" className="px-12 py-6 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl flex items-center gap-4 group/btn relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 italic">Déployer ma Boutique</span>
                    <ArrowRight className="h-5 w-5 relative z-10" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/solution" className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] rounded-[2rem] backdrop-blur-xl hover:bg-white/10 transition-all italic">
                    Spécifications
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-emerald-500/20 transition-all duration-500 group"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-emerald-500/10 p-4 text-emerald-500 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <p className="text-4xl font-black text-white italic tracking-tighter leading-none">{stat.value}</p>
                <p className="text-label text-zinc-600 mt-4">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-3 relative z-10">
          {pillars.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 hover:border-emerald-500/20 transition-all duration-700 group shadow-2xl"
            >
              <div className="mb-8 inline-flex rounded-2xl bg-zinc-950 p-5 text-emerald-500 shadow-inner group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
              <p className="mb-4 text-label text-zinc-700">{feature.tag}</p>
              <h2 className="mb-4 text-2xl font-black italic tracking-tighter text-white uppercase">{feature.title}</h2>
              <p className="text-zinc-500 font-medium italic leading-relaxed text-sm">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6 grid items-center gap-20 lg:grid-cols-2">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 px-5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
              <Cpu className="h-5 w-5" /> BudTender Engine™
            </div>

            <div className="space-y-6">
              <h2 className="text-section">
                Agent <span className="text-white/40 font-light not-italic">Augmenté.</span> <br /> Conversion <span className="text-emerald-500">Optimisée.</span>
              </h2>
              <p className="text-premium-body border-l-2 border-white/5 pl-8">
                Le conseiller conversationnel transforme chaque interaction en une exploration sensorielle, guidant vos clients avec une expertise algorithmique.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Profilage contextuel haute fidélité",
                "Recommandations basées sur les chromatographies",
                "Analyse prédictive de fidélisation",
              ].map((text) => (
                <div key={text} className="flex items-center gap-6 p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md group hover:border-emerald-500/30 transition-all duration-500 shadow-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                  </div>
                  <p className="text-lg text-zinc-300 font-medium italic">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group/sim">
            <div className="absolute -inset-1 rounded-[4rem] bg-gradient-to-tr from-emerald-500/20 to-white/10 blur-2xl opacity-50 transition-opacity group-hover/sim:opacity-100" />
            <div className="relative bg-zinc-950 border border-white/10 rounded-[4rem] p-10 space-y-12 shadow-3xl overflow-hidden backdrop-blur-3xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-8 relative">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Simulation de Dialogue</p>
                  <p className="text-xs font-black text-emerald-500 italic uppercase">BudTender v4 Pro Core</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Engine</span>
                </div>
              </div>
              <div className="space-y-10">
                <div className="flex gap-6 max-w-[90%]">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 shrink-0 flex items-center justify-center">
                    <Users className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div className="rounded-[2rem] rounded-tl-none bg-zinc-900/60 backdrop-blur-md border border-white/5 p-6 text-lg text-zinc-400 italic leading-relaxed">
                    Je recherche une expérience délicate, florale, pour une déconnexion immédiate sans effet sédatif marqué.
                  </div>
                </div>
                <div className="flex gap-6 max-w-[90%] ml-auto flex-row-reverse">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 shrink-0 flex items-center justify-center text-black shadow-2xl shadow-emerald-500/20">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div className="rounded-[2rem] rounded-tr-none bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 p-6 text-lg text-white italic leading-relaxed">
                    Suggestion: Blue Dream Sativa. Profil dominance Terpinolène & Borneol. Parfaite pour l'élévation mentale créative et la clarté.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 relative overflow-hidden bg-brand-950">
        <div className="max-w-7xl mx-auto px-6 grid items-center gap-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              { icon: <ShieldCheck className="h-8 w-8" />, title: "Conformité", desc: "Données chiffrées et isolation multi-tenant stricte." },
              { icon: <Lock className="h-8 w-8" />, title: "Sécurité", desc: "Authentification biométrique et logs d'audit complets." },
              { icon: <BarChart3 className="h-8 w-8" />, title: "Analytics", desc: "Vision temps-réel sur l'ensemble de votre réseau." },
              { icon: <Smartphone className="h-8 w-8" />, title: "Mobilité", desc: "Expérience native sur tous les devices Retail." },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 hover:border-emerald-500/20 transition-all duration-700 shadow-2xl group"
              >
                <div className="mb-8 text-emerald-500 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="mb-4 text-2xl font-black italic tracking-tighter text-white uppercase">{item.title}</h3>
                <p className="text-zinc-500 font-medium italic leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 px-5 py-2 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
              Operations suite
            </div>
            <div className="space-y-6">
              <h2 className="text-section">Maîtrise <span className="text-white/40 font-light not-italic">Unitée.</span> <br /> Vision <span className="text-emerald-500">Globale.</span></h2>
              <p className="text-premium-body border-l-2 border-white/5 pl-8">
                Tableaux de bord analytiques, synchronisation des inventaires et pilotage multisite centralisé pour une gestion sans compromis.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {[LayoutDashboard, Store, Users, Database].map((Icon, idx) => (
                <div key={idx} className="bg-black/40 border border-white/5 px-6 py-4 rounded-2xl flex items-center gap-4 group hover:border-emerald-500/30 transition-all duration-500">
                  <Icon className="h-5 w-5 text-emerald-500 group-hover:animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Actif</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 md:p-24 text-center space-y-12 shadow-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-white/5 opacity-50" />

            <div className="relative space-y-8">
              <h2 className="text-display scale-75">
                Forgez votre <br /> <span className="text-emerald-500 font-light not-italic">Succès.</span>
              </h2>
              <p className="text-premium-body mx-auto max-w-2xl">
                Rejoignez l'élite technologique du CBD et pilotez votre croissance avec une infrastructure conçue pour l'excellence.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/ouvrir-boutique" className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest italic rounded-[2rem] shadow-2xl relative overflow-hidden group/cta">
                    <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10">Démarrer le Déploiement</span>
                  </Link>
                </motion.div>
                <Link to="/contact" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] hover:text-white transition-colors italic">
                  Échanger avec un Architecte
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
