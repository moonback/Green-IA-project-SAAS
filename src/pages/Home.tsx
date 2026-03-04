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
  MessageSquare,
  Bot,
  PlayCircle,
  Building2,
  ShoppingCart,
  Boxes,
  Activity,
  Check,
  Zap,
  Leaf
} from "lucide-react";
import FAQ from "../components/FAQ";
import SEO from "../components/SEO";
import PricingSection from "../components/PricingSection";

const ChatAnimation = () => {
  return (
    <div className="h-[380px] w-full max-w-sm mx-auto bg-zinc-900 border border-white/5 rounded-[2rem] p-4 flex flex-col relative overflow-hidden backdrop-blur-xl shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-zinc-900 to-transparent z-10 pointer-events-none" />
      <div className="flex-1 flex flex-col justify-end gap-3 pb-2 relative z-0">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="bg-zinc-800 rounded-2xl rounded-bl-sm p-3 text-[13px] text-zinc-200 w-[85%] shadow-lg leading-relaxed">
          Bonjour ! Je cherche quelque chose pour m'aider à dormir, sans être assommé le matin.
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, duration: 0.5 }} className="bg-green-neon/5 border border-green-neon/20 rounded-2xl rounded-br-sm p-3 text-[13px] text-green-neon self-end w-[90%] shadow-lg leading-relaxed">
          <span className="flex items-center gap-1.5 mb-1.5 opacity-70 text-[9px] uppercase font-bold tracking-[0.2em]"><Bot className="w-3 h-3" /> BudTender IA</span>
          Je vous conseille notre Huile CBD+CBN 20% Sommeil. Le CBN cible spécifiquement l'endormissement sans créer de somnolence résiduelle.
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4, duration: 0.5 }} className="bg-zinc-800 rounded-2xl rounded-bl-sm p-3 text-[13px] text-zinc-200 w-[70%] shadow-lg leading-relaxed">
          Parfait, je vais tester ça.
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 5.2, duration: 0.5 }} className="bg-green-neon/5 border border-green-neon/20 rounded-2xl rounded-br-sm p-3 text-[13px] text-green-neon self-end w-[85%] shadow-lg leading-relaxed">
          <span className="flex items-center gap-1.5 mb-1.5 opacity-70 text-[9px] uppercase font-bold tracking-[0.2em]"><Bot className="w-3 h-3" /> BudTender IA</span>
          Excellent choix ! Ajouté à votre panier. Souhaitez-vous découvrir nos infusions relaxantes en complément ?
        </motion.div>
      </div>
    </div>
  )
}

export default function Home() {
  const pillars = [
    {
      title: "IA experte CBD",
      description: "Conseiller intelligent formé sur les produits, effets, profils clients et spécificités de la législation.",
      icon: <Bot className="h-6 w-6 text-green-neon" strokeWidth={1.5} />,
    },
    {
      title: "Conformité intégrée",
      description: "Taux de THC, fiches produits, traçabilité et mentions légales entièrement automatisées.",
      icon: <ShieldCheck className="h-6 w-6 text-green-neon" strokeWidth={1.5} />,
    },
    {
      title: "Multi-boutiques réel",
      description: "Stock, ventes, gestion clients et analytics parfaitement synchronisés entre le physique et le web.",
      icon: <Database className="h-6 w-6 text-green-neon" strokeWidth={1.5} />,
    },
    {
      title: "Performance mesurable",
      description: "Augmentation directe de la conversion, du panier moyen et de la rétention de vos clients.",
      icon: <LineChart className="h-6 w-6 text-green-neon" strokeWidth={1.5} />,
    },
  ];

  const features = [
    { title: "POS CBD", benefit: "Vente rapide, conforme, fiable", icon: <Smartphone className="w-5 h-5 text-white" strokeWidth={1.5} /> },
    { title: "Boutique en ligne", benefit: "Click & collect, livraison native", icon: <Globe className="w-5 h-5 text-white" strokeWidth={1.5} /> },
    { title: "IA Conseiller", benefit: "+ confiance, + de conversion", icon: <MessageSquare className="w-5 h-5 text-white" strokeWidth={1.5} /> },
    { title: "Stock intelligent", benefit: "Zéro rupture, pilotage prédictif", icon: <Boxes className="w-5 h-5 text-white" strokeWidth={1.5} /> },
    { title: "Analytics CBD", benefit: "Décisions basées sur les ventes", icon: <BarChart3 className="w-5 h-5 text-white" strokeWidth={1.5} /> },
    { title: "Multi-boutiques", benefit: "Scalabilité immédiate", icon: <Store className="w-5 h-5 text-white" strokeWidth={1.5} /> },
  ];

  const targets = [
    {
      title: "Boutiques physiques",
      problem: "Ne perdez plus de temps en encaissement et gérez vos stocks sans la moindre erreur.",
      icon: <Store className="w-6 h-6 text-green-neon" strokeWidth={1.5} />
    },
    {
      title: "E-commerçants CBD",
      problem: "Convertissez les visiteurs curieux en acheteurs récurrents avec notre IA BudTender.",
      icon: <ShoppingCart className="w-6 h-6 text-green-neon" strokeWidth={1.5} />
    },
    {
      title: "Réseaux multi-boutiques",
      problem: "Centralisez la gestion de tous vos franchisés sur une seule interface globale.",
      icon: <Building2 className="w-6 h-6 text-green-neon" strokeWidth={1.5} />
    },
    {
      title: "Marques CBD D2C",
      problem: "Offrez une expérience sur mesure pour maximiser la Life-Time Value (LTV).",
      icon: <Activity className="w-6 h-6 text-green-neon" strokeWidth={1.5} />
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-brand-950 text-white font-sans selection:bg-green-neon selection:text-black">
      <SEO
        title="Green IA SaaS | Plateforme Tout-en-un CBD"
        description="Le SaaS tout-en-un pour piloter, vendre et convertir dans le CBD. IA métier, conformité légale et performance e-commerce dans une seule plateforme."
      />

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt="Plateforme SaaS CBD"
            className="w-full h-full object-cover opacity-100 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/90 via-brand-950/50 to-brand-950" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-950/90" />
        </div>

        <div className="content-wrap relative z-10 w-full pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md mb-8 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.24em] text-zinc-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-neon animate-pulse" />
              L'infrastructure intelligente du Retail CBD
            </motion.span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.1] mb-6">
              Le SaaS tout-en-un pour piloter, vendre et <span className="text-green-neon italic font-light drop-shadow-[0_0_15px_rgba(76,255,0,0.3)]">convertir</span> dans le CBD.
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed mb-10">
              Centralisez vos boutiques CBD, automatisez la vente en ligne et en magasin, et augmentez vos conversions grâce à une IA spécialisée CBD.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full sm:w-auto">
              <Link to="/ouvrir-boutique" className="bg-green-neon text-black font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 group hover:bg-white transition-colors text-sm sm:text-base">
                Démarrer gratuitement <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-colors backdrop-blur-md text-sm sm:text-base">
                <PlayCircle className="h-5 w-5 opacity-70" /> Voir une démo (45s)
              </button> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. POURQUOI GREEN IA ? ─── */}
      <section className="py-24 px-4 bg-gradient-to-b from-brand-950 to-zinc-950 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6">Conçu <span className="italic text-zinc-400 font-light">exclusivement</span> pour les professionnels du CBD</h2>
            <p className="text-zinc-400 text-lg">Finis les montages complexes et les plugins incompatibles. Tout ce dont vous avez besoin est nativement intégré.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((feature, i) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 hover:bg-zinc-900/80 transition-colors"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-zinc-950 border border-white/5 p-4 shadow-inner">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-white tracking-tight">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. IA CONSEILLER (Storytelling) ─── */}
      <section className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,255,0,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-neon/20 bg-green-neon/5 mb-6">
              <Leaf className="w-3.5 h-3.5 text-green-neon" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-neon">BudTender Engine™</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 leading-[1.1]">
              Un conseiller CBD disponible <span className="italic font-light text-zinc-400">24/7</span>, en ligne et en magasin.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              Votre IA dialogue avec vos clients, comprend leurs véritables besoins (sommeil, stress, douleur, détente), leur recommande les bons produits et augmente instantanément la confiance à l'achat.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="mt-1"><Users className="w-5 h-5 text-zinc-500" /></div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Pour le client novice</h4>
                  <p className="text-sm text-zinc-400">Pédagogie douce, réassurance légale et guidage pas à pas.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-zinc-500" /></div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Pour le client régulier</h4>
                  <p className="text-sm text-zinc-400">Recommandations pointues basées sur les terpènes et l'historique d'achat.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="mt-1"><Store className="w-5 h-5 text-zinc-500" /></div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Pour vos vendeurs</h4>
                  <p className="text-sm text-zinc-400">Assistant de caisse (POS) pour répondre aux questions pointues en temps réel.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-green-neon/5 blur-[100px] rounded-full" />
            <ChatAnimation />
          </div>
        </div>
      </section>

      {/* ─── 4. FONCTIONNALITÉS ─── */}
      <section className="py-24 px-4 bg-brand-950 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-4">Tout ce dont une boutique CBD a <span className="text-green-neon italic font-light">réellement</span> besoin</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((item, idx) => (
              <div key={idx} className="bg-zinc-900/30 border border-white/5 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/[0.03] transition-colors">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-base text-white font-bold mb-0.5 tracking-tight">{item.title}</h4>
                  <span className="text-xs text-green-neon/90 font-medium">{item.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. À QUI S'ADRESSE LA PLATEFORME ? ─── */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-black mb-8 leading-[1.1]">
                Une architecture adaptée à <span className="italic text-zinc-400 font-light">tout</span> votre réseau.
              </h2>
              <div className="grid gap-6">
                {targets.map((target, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">{target.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1 tracking-tight">{target.title}</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">{target.problem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden">
              <img src="/images/hero-bg.png" alt="Dashboard abstract" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-950 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-green-neon/10 rounded-full blur-2xl animate-pulse" />
                <LogoIcon className="w-16 h-16 text-white/50 absolute" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. POURQUOI NOUS PLUTÔT QU'UN SHOPIFY + PLUGINS ? ─── */}
      <section className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-brand-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6">Pourquoi nous plutôt qu'un <span className="text-zinc-400 italic font-light">Shopify + plugins</span> ?</h2>
            <p className="text-zinc-400 text-lg">La différence fondamentale entre un outil généraliste complexe et une solution pensée spécifiquement pour les professionnels du CBD.</p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-xl">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-white/5 bg-black/40 p-5 md:p-6 text-xs md:text-sm font-bold text-center">
              <div className="text-left text-zinc-500 uppercase tracking-widest text-[10px] md:text-xs">Critères</div>
              <div className="text-zinc-400 font-medium">Shopify + Plugins</div>
              <div className="text-green-neon">Green IA SaaS</div>
            </div>
            {[
              { label: "Spécialisation CBD", shopify: "Interdit (Stripe/Payments)", green: "100% Natif & Autorisé" },
              { label: "IA métier (BudTender)", shopify: "Chatbot basique générique", green: "IA experte (Terpènes, Effets...)" },
              { label: "Conformité légale", shopify: "À gérer manuellement", green: "Automatisée (FR/EU)" },
              { label: "Support client", shopify: "Tickets lents & offshore", green: "Experts CBD basés en France" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-white/5 last:border-0 p-5 md:p-6 text-xs md:text-sm text-center items-center hover:bg-white/[0.02] transition-colors">
                <div className="text-left font-medium text-white">{row.label}</div>
                <div className="text-zinc-500">{row.shopify}</div>
                <div className="text-white font-bold flex items-center justify-center gap-2"><Check className="w-4 h-4 text-green-neon" /> {row.green}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. TARIFICATION ─── */}
      <PricingSection />

      {/* ─── 7. FAQ ─── */}
      <FAQ />

    </div>
  );
}

const LogoIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
