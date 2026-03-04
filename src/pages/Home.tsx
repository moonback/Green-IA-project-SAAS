import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Leaf,
  LineChart,
  Lock,
  ShieldCheck,
  Sparkles,
  Store,
} from 'lucide-react';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import { GlassBadge, GlassButton, GlassPanel } from '../components/ui/GlassPrimitives';

export default function Home() {
  const sections = [
    {
      id: 'conversion',
      title: 'Landing SaaS orientée conversion',
      description: 'Hero premium, preuve sociale et CTA à haut contraste pour transformer les visites en demandes de démo.',
      icon: <LineChart className="h-5 w-5 text-emerald-300" />,
    },
    {
      id: 'tenant',
      title: 'Storefront multi-tenant personnalisé',
      description: 'Variables dynamiques de thème par boutique via Supabase pour conserver une identité propre à chaque shop.',
      icon: <Store className="h-5 w-5 text-emerald-300" />,
    },
    {
      id: 'admin',
      title: 'Dashboard Admin glassmorphism',
      description: 'Cartes analytiques, actions rapides et navigation tabulaire modernisée pour le pilotage quotidien.',
      icon: <BarChart3 className="h-5 w-5 text-emerald-300" />,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-brand-950 text-white">
      <SEO
        title="Green IA SaaS | Plateforme e-commerce CBD IA-native"
        description="Refonte premium dark glassmorphism pour les boutiques CBD multi-tenant avec BudTender intelligent et dashboard admin moderne."
      />

      <section className="app-section relative pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-10 h-[280px] w-[280px] rounded-full bg-emerald-400/15 blur-[120px]" />
          <div className="absolute right-[10%] top-28 h-[260px] w-[260px] rounded-full bg-teal-300/10 blur-[140px]" />
        </div>

        <div className="content-wrap relative z-10">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl text-center">
            <GlassBadge className="mx-auto mb-6 w-fit text-emerald-100">
              <Leaf className="h-3 w-3" />
              UI/UX Overhaul · Premium Zen Conversion
            </GlassBadge>
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
              Green IA devient une expérience <span className="text-emerald-300">Dark Glass</span> nouvelle génération
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">
              Une structure claire pour la landing SaaS, la storefront boutique et le dashboard admin avec animations fluides Framer Motion.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/ouvrir-boutique"><GlassButton icon={<ArrowRight className="h-4 w-4" />}>Demander une démo</GlassButton></Link>
              <Link to="/solution"><GlassButton variant="secondary">Voir l'architecture UI</GlassButton></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="app-section">
        <div className="content-wrap grid gap-4 lg:grid-cols-3">
          {sections.map((section, i) => (
            <motion.div key={section.id} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <GlassPanel className="h-full p-7">
                <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-black/30 p-3">{section.icon}</div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                <p className="mt-3 text-zinc-400">{section.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="app-section bg-brand-900/40">
        <div className="content-wrap grid gap-8 lg:grid-cols-2">
          <GlassPanel className="p-8">
            <p className="section-kicker">Composants Atomes modernisés</p>
            <ul className="mt-5 space-y-4 text-sm text-zinc-300">
              {[
                'Boutons avec effet de brillance au survol (shimmer).',
                'Inputs avec halo lumineux sur focus pour guider la saisie.',
                'Badges vitreux pour signaler le contexte produit, stock et IA.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />{item}</li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="p-8">
            <p className="section-kicker">Sécurité & Performance</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[{ icon: ShieldCheck, text: 'Isolation tenant' }, { icon: Lock, text: 'Règles d’accès strictes' }, { icon: BrainCircuit, text: 'IA contextuelle BudTender' }, { icon: Sparkles, text: 'Animations progressives' }].map((item) => (
                <div key={item.text} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-200">
                  <item.icon className="mb-2 h-4 w-4 text-emerald-300" />
                  {item.text}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
