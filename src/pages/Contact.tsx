import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { GlassBadge, GlassButton, GlassPanel } from '../components/ui/GlassPrimitives';

export default function Contact() {
  return (
    <div className="min-h-screen overflow-hidden bg-brand-950 text-white">
      <SEO title="Contact & Démo | Green IA" description="Contactez Green IA pour une démo et un cadrage de votre projet boutique." />

      <section className="app-section relative pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[12%] top-14 h-72 w-72 rounded-full bg-emerald-300/10 blur-[120px]" />
        </div>
        <div className="content-wrap relative z-10 text-center">
          <GlassBadge className="mx-auto mb-6 w-fit text-emerald-100"><Sparkles className="h-3 w-3" /> Contact & Démo</GlassBadge>
          <h1 className="text-5xl font-black sm:text-7xl">Parlons de votre <span className="text-emerald-300">projet SaaS CBD</span></h1>
          <p className="mx-auto mt-6 max-w-3xl text-zinc-300">Même expérience visuelle premium sur toutes les pages publiques, avec un point d’entrée simple pour vos demandes.</p>
        </div>
      </section>

      <section className="app-section pt-8">
        <div className="content-wrap grid gap-4 lg:grid-cols-3">
          {[{ icon: Mail, text: 'contact@greenia.ai' }, { icon: Phone, text: '+33 1 89 00 00 00' }, { icon: MapPin, text: 'Paris, France' }].map((item) => (
            <GlassPanel key={item.text} className="p-5">
              <item.icon className="mb-2 h-5 w-5 text-emerald-300" />
              <p className="text-zinc-200">{item.text}</p>
            </GlassPanel>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="content-wrap mt-6">
          <GlassPanel className="p-7 md:p-10">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <input className="glass-input" placeholder="Nom de la boutique" />
              <input className="glass-input" type="email" placeholder="Email professionnel" />
              <input className="glass-input md:col-span-2" placeholder="Sujet" />
              <textarea className="glass-input md:col-span-2 min-h-40" placeholder="Décrivez votre besoin" />
              <div className="md:col-span-2">
                <GlassButton icon={<Send className="h-4 w-4" />}>
                  Envoyer ma demande
                </GlassButton>
              </div>
            </form>
          </GlassPanel>
        </motion.div>
      </section>
    </div>
  );
}
