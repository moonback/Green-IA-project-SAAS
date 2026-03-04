import { motion } from 'motion/react';
import { CheckCircle2, FileCheck2, FlaskConical, ShieldCheck, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { GlassBadge, GlassPanel } from '../components/ui/GlassPrimitives';

const guarantees = [
  { title: 'Traçabilité complète', desc: 'Origine, lots, fournisseurs et historique produit consultables.', icon: FileCheck2 },
  { title: 'Conformité réglementaire', desc: 'Cadre légal FR/UE et contrôles continus des flux e-commerce.', icon: ShieldCheck },
  { title: 'Contrôles qualité', desc: 'Protocoles de vérification sur la composition et la stabilité.', icon: FlaskConical },
];

export default function Quality() {
  return (
    <div className="min-h-screen overflow-hidden bg-brand-950 text-white">
      <SEO title="Qualité & Sécurité | Green IA" description="Standards qualité et sécurité pour l’écosystème Green IA." />

      <section className="app-section relative pt-28 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[10%] top-10 h-80 w-80 rounded-full bg-emerald-300/10 blur-[130px]" />
        </div>
        <div className="content-wrap relative z-10">
          <GlassBadge className="mx-auto mb-6 w-fit text-emerald-100"><Sparkles className="h-3 w-3" /> Qualité & Sécurité</GlassBadge>
          <h1 className="text-5xl font-black sm:text-7xl">Confiance, conformité et <span className="text-emerald-300">transparence</span></h1>
          <p className="mx-auto mt-6 max-w-3xl text-zinc-300">Nous appliquons une approche stricte sur la qualité produit, la sécurité des données et la gouvernance multi-tenant.</p>
        </div>
      </section>

      <section className="app-section">
        <div className="content-wrap grid gap-4 lg:grid-cols-3">
          {guarantees.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <GlassPanel className="h-full p-7">
                <item.icon className="mb-4 h-6 w-6 text-emerald-300" />
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-3 text-zinc-400">{item.desc}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="app-section bg-brand-900/40">
        <div className="content-wrap">
          <GlassPanel className="p-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">Engagements opérationnels</p>
            <div className="grid gap-3 md:grid-cols-2">
              {['Isolation des données entre boutiques', 'Suivi des accès administrateurs', 'Contrôles de disponibilité service', 'Approche privacy-first'].map((line) => (
                <p key={line} className="flex items-center gap-2 text-zinc-200"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{line}</p>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>
    </div>
  );
}
