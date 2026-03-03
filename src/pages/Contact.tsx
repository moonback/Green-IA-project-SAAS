import { motion } from "motion/react";
import { MessageCircle, Send, Sparkles, Globe, ShieldCheck, Zap, Headphones, Building2, UserPlus } from "lucide-react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-32 font-sans">
      <SEO
        title="Contactez Green Mood SaaS | Support & Démo"
        description="Besoin d'une démonstration de notre IA BudTender ? Un problème technique ? Notre équipe d'experts SaaS CBD est à votre écoute."
      />

      {/* ────────── Hero Section ────────── */}
      <section className="relative pt-48 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-green-neon/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-neon/10 border border-green-neon/20 text-green-neon text-xs font-black uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-4 h-4" />
            VOTRE RÉUSSITE EST NOTRE PRIORITÉ
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-black tracking-tighter leading-none mb-8"
          >
            CONSTRUISONS <br />
            <span className="text-green-neon italic glow-green">L'AVENIR DU CBD.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Démonstration, support technique ou partenariat stratégique :
            nos experts SaaS sont là pour propulser votre business.
          </motion.p>
        </div>
      </section>

      {/* ────────── Main Grid ────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Contact Info (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {[
                {
                  title: "Démo Personnalisée",
                  desc: "Découvrez comment l'IA BudTender peut transformer vos ventes.",
                  icon: Zap,
                  color: "text-green-neon",
                  link: "/ouvrir-boutique",
                  label: "Lancer la démo"
                },
                {
                  title: "Support SaaS 24/7",
                  desc: "Une équipe technique dédiée pour vos déploiements.",
                  icon: Headphones,
                  color: "text-blue-400",
                  link: "mailto:support@greenmood.io",
                  label: "Ouvrir un ticket"
                },
                {
                  title: "Partenariats Shop",
                  desc: "Rejoignez l'écosystème Green Mood en tant que partenaire.",
                  icon: Building2,
                  color: "text-purple-400",
                  link: "mailto:partners@greenmood.io",
                  label: "Devenir partenaire"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-start gap-8">
                    <div className={`w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${item.color}`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                      <a href={item.link} className={`inline-block pt-2 font-black uppercase tracking-widest text-[10px] ${item.color} hover:underline`}>
                        {item.label}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-zinc-800 rounded-[3.5rem] p-10 lg:p-16 space-y-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-neon/5 blur-[50px]" />
              <div className="space-y-4">
                <h2 className="text-4xl font-serif font-black">Besoin d'aide <br /><span className="text-green-neon italic">Sur-Mesure ?</span></h2>
                <p className="text-zinc-500 text-sm">Transmettez-nous vos besoins, un conseiller SaaS reviendra vers vous sous 12h.</p>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Nom de l'Entreprise / Shop</label>
                    <input
                      type="text"
                      placeholder="Ex: Green Shop Paris"
                      className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 text-white placeholder-zinc-700 focus:outline-none focus:border-green-neon transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Email Professionnel</label>
                    <input
                      type="email"
                      placeholder="votre@compte-pro.fr"
                      className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 text-white placeholder-zinc-700 focus:outline-none focus:border-green-neon transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Sujet de Consultation</label>
                  <select className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 text-zinc-400 focus:outline-none focus:border-green-neon transition-all appearance-none cursor-pointer">
                    <option>Demande de Démonstration IA</option>
                    <option>Problème d'Intégration API</option>
                    <option>Question Facturation & Plans</option>
                    <option>Devenir Partenaire Solution</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Détails de votre Projet</label>
                  <textarea
                    rows={6}
                    placeholder="Comment Green Mood peut-il aider votre business aujourd'hui ?"
                    className="w-full bg-black border border-zinc-800 rounded-[2.5rem] px-8 py-6 text-white placeholder-zinc-700 focus:outline-none focus:border-green-neon transition-all resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-white text-black font-black uppercase tracking-widest py-7 rounded-2xl flex items-center justify-center gap-4 hover:bg-green-neon transition-all group shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <span className="relative z-10 flex items-center gap-3">
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    SOUMETTRE MA DEMANDE
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────── Trust Links ────────── */}
      <section className="mt-32 pt-20 border-t border-zinc-800 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-xl font-serif font-black flex items-center gap-3 justify-center md:justify-start">
              <Globe className="w-6 h-6 text-green-neon" /> GREEN MOOD NETWORK
            </h4>
            <p className="text-zinc-600 text-sm">L'écosystème CBD le plus avancé d'Europe.</p>
          </div>
          <div className="flex gap-10">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase">Paris Headquarters</p>
              <p className="font-bold text-zinc-300">Avenue des Champs-Élysées</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase">Support Cloud</p>
              <p className="font-bold text-zinc-300">24/7 Global Response</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
