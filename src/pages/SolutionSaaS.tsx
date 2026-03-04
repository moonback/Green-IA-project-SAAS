import { motion } from 'motion/react';
import { ArrowRight, BrainCircuit, Database, Globe, LineChart, ShieldCheck, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { GlassBadge, GlassButton, GlassPanel } from '../components/ui/GlassPrimitives';

const pillars = [
  {
    title: 'BudTender IA orienté conversion',
    description: 'Un conseiller intelligent qui comprend le contexte client et augmente le panier moyen.',
    icon: BrainCircuit,
  },
  {
    title: 'Architecture multi-tenant Supabase',
    description: 'Chaque boutique garde son identité et ses réglages sans casser la cohérence plateforme.',
    icon: Database,
  },
  {
    title: 'Vision 360° business',
    description: 'KPIs, ventes, stock et fidélisation centralisés dans un dashboard premium.',
    icon: LineChart,
  },
];

export default function SolutionSaaS() {
  return (
    <div className="min-h-screen overflow-hidden bg-brand-950 text-white">
      <SEO
        title="Solution SaaS | Green IA"
        description="Infrastructure e-commerce CBD IA-native avec expérience dark glassmorphism, multi-tenant et orientée conversion."
      />

      <section className="app-section relative pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[14%] top-16 h-72 w-72 rounded-full bg-emerald-300/10 blur-[120px]" />
          <div className="absolute right-[12%] top-20 h-80 w-80 rounded-full bg-teal-300/10 blur-[140px]" />
        </div>
        <div className="content-wrap relative z-10 text-center">
          <GlassBadge className="mx-auto mb-6 w-fit text-emerald-100">
            <ShieldCheck className="h-3 w-3" />
            Solution SaaS · Dark Glass System
          </GlassBadge>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black tracking-tight sm:text-7xl">
            Une plateforme <span className="text-emerald-300">premium et zen</span> pour les boutiques CBD
          </motion.h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">
            Green IA unifie storefront, intelligence produit, automatisation marketing et pilotage multi-tenant dans une seule expérience.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/contact"><GlassButton icon={<ArrowRight className="h-4 w-4" />}>Planifier une démo</GlassButton></Link>
          </div>
        </div>
      </section>

      <section className="app-section">
        <div className="content-wrap grid gap-4 lg:grid-cols-3">
          {pillars.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <GlassPanel className="h-full p-7">
                <item.icon className="mb-4 h-6 w-6 text-emerald-300" />
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="mt-3 text-zinc-400">{item.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="app-section bg-brand-900/40">
        <div className="content-wrap grid gap-4 md:grid-cols-2">
          {[{ icon: Store, text: 'Storefront personnalisable par boutique' }, { icon: Globe, text: 'Déploiement rapide B2B/B2C' }].map((f) => (
            <GlassPanel key={f.text} className="p-6">
              <f.icon className="mb-3 h-5 w-5 text-emerald-300" />
              <p className="text-zinc-200">{f.text}</p>
            </GlassPanel>
          ))}
        </div>
      </section>
    </div>
  );
}
