import { motion } from "motion/react";
import { Send, Sparkles, Globe, Zap, Headphones, Building2, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-40 font-sans selection:bg-emerald-500 selection:text-black">
      <SEO
        title="Contactez Green IA SaaS | Support & Démo"
        description="Besoin d'une démonstration de notre IA BudTender ? Un problème technique ? Notre équipe d'experts SaaS CBD est à votre écoute."
      />

      {/* ────────── Elegant Hero Section ────────── */}
      <section className="relative pt-60 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-emerald-500 text-label"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            VOTRE RÉUSSITE EST NOTRE SEUL PROTOCOLE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display"
          >
            PARLONS DE VOTRE <br />
            <span className="text-emerald-500 font-light not-italic">VISION CBD.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-premium-body text-zinc-500 max-w-3xl mx-auto border-l-2 border-white/5 pl-10"
          >
            Nous forgeons les outils technologiques qui transformeront votre boutique en une expérience d'élite.
          </motion.p>
        </div>
      </section>

      {/* ────────── Main Grid ────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

          {/* Contact Info (Left) */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-8">
              {[
                {
                  title: "Démonstration Élite",
                  desc: "Exploration immersive de l'architecture IA appliquée à votre catalogue spécifique.",
                  icon: Zap,
                  color: "text-emerald-500",
                  link: "/ouvrir-boutique",
                  label: "Planifier une session"
                },
                {
                  title: "Soutien Technique",
                  desc: "Une équipe d'ingénieurs dédiée à la stabilité de votre écosystème e-commerce.",
                  icon: Headphones,
                  color: "text-zinc-400",
                  link: "mailto:support@greenIA.io",
                  label: "Ouvrir un protocole"
                },
                {
                  title: "Expansion Network",
                  desc: "Solutions scalables pour les réseaux de franchises et architectures multi-boutiques.",
                  icon: Building2,
                  color: "text-emerald-300",
                  link: "mailto:partners@greenIA.io",
                  label: "Devenir architecte"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-700 group relative overflow-hidden"
                >
                  <div className="absolute -inset-10 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <div className="flex items-start gap-10 relative z-10">
                    <div className={`w-20 h-20 rounded-[2rem] bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-700 ${item.color} shadow-2xl`}>
                      <item.icon className="w-10 h-10" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black italic tracking-tight uppercase group-hover:text-emerald-400 transition-colors leading-none">{item.title}</h3>
                      <p className="text-zinc-600 text-xs leading-relaxed font-medium italic">{item.desc}</p>
                      <a href={item.link} className={`inline-flex items-center gap-3 pt-4 text-label ${item.color} hover:gap-5 transition-all`}>
                        {item.label} <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form (Right) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 lg:p-20 space-y-16 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -mr-32 -mt-32" />

              <div className="space-y-6">
                <h2 className="text-section">
                  Inaugurez votre <br />
                  <span className="text-emerald-500 font-light not-italic">prochaine ère.</span>
                </h2>
                <p className="text-premium-body border-l-2 border-white/5 pl-8 max-w-lg">Notre équipe d'élite vous répondra sous un cycle de 8 heures.</p>
              </div>

              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-label text-zinc-700 ml-8">Identité Corporative</label>
                    <input
                      type="text"
                      placeholder="Ex: Green Research Lab"
                      className="w-full bg-black/40 border border-white/5 rounded-[2rem] px-8 py-6 text-white placeholder-zinc-800 focus:outline-none focus:border-emerald-500/40 focus:bg-black/60 transition-all italic font-medium"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-label text-zinc-700 ml-8">Vecteur de Communication</label>
                    <input
                      type="email"
                      placeholder="contact@lab-hq.io"
                      className="w-full bg-black/40 border border-white/5 rounded-[2rem] px-8 py-6 text-white placeholder-zinc-800 focus:outline-none focus:border-emerald-500/40 focus:bg-black/60 transition-all italic font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-label text-zinc-700 ml-8">Nature du Protocole</label>
                  <div className="relative group">
                    <select className="w-full bg-black/40 border border-white/5 rounded-[2rem] px-8 py-6 text-zinc-600 focus:outline-none focus:border-emerald-500/40 focus:bg-black/60 transition-all appearance-none cursor-pointer italic font-medium group-hover:text-zinc-400">
                      <option>Demande de Démo Custom</option>
                      <option>Accélération Startup</option>
                      <option>Questionnement Technique</option>
                      <option>Architecture Multi-Shop</option>
                      <option>Autre Requête</option>
                    </select>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-800 group-hover:text-emerald-500 transition-colors">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-label text-zinc-700 ml-8">Détails de la Vision</label>
                  <textarea
                    rows={6}
                    placeholder="Quels sont les objectifs de domination de votre marché ?"
                    className="w-full bg-black/40 border border-white/5 rounded-[3rem] px-10 py-8 text-white placeholder-zinc-800 focus:outline-none focus:border-emerald-500/40 focus:bg-black/60 transition-all resize-none italic font-medium"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black font-black uppercase tracking-[0.4em] py-8 rounded-[2.5rem] flex items-center justify-center gap-6 hover:bg-emerald-500 transition-all group shadow-2xl relative overflow-hidden italic"
                >
                  <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center gap-4 text-[11px]">
                    ACTIVER LA LIAISON
                    <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  </span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────── Trust Links ────────── */}
      <section className="mt-40 pt-24 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
          <div className="space-y-4">
            <h4 className="text-3xl font-black italic flex items-center gap-6 justify-center md:justify-start tracking-tighter uppercase">
              <Globe className="w-8 h-8 text-emerald-500" /> GREEN IA NETWORK
            </h4>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-label text-zinc-700">Écosystème CBD Souverain Européen</p>
            </div>
          </div>
          <div className="flex gap-20">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Paris Headquarters</p>
              <p className="font-black text-zinc-400 italic tracking-tight uppercase">Avenue des Champs-Élysées</p>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Support Cloud</p>
              <p className="font-black text-zinc-400 italic tracking-tight uppercase">24/7 Global Intelligence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
