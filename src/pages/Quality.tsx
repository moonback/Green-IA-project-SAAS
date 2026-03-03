import { motion } from "motion/react";
import { ShieldCheck, Cpu, Lock, Globe, Zap, Server, Database, Sparkles, Code, Terminal } from "lucide-react";
import SEO from "../components/SEO";
import { useShopContent } from "../hooks/useShopContent";
import { useShopStore } from "../store/shopStore";

export default function Quality() {
  const content = useShopContent();
  const { currentShop } = useShopStore();
  const primaryColor = currentShop?.settings?.primary_color || '#39ff14';

  const pillars = [
    {
      title: content.quality.pillar_1_title,
      icon: Lock,
      detail: content.quality.pillar_1_desc
    },
    {
      title: content.quality.pillar_2_title,
      icon: Cpu,
      detail: content.quality.pillar_2_desc
    },
    {
      title: content.quality.pillar_3_title,
      icon: Globe,
      detail: content.quality.pillar_3_desc
    },
    {
      title: content.quality.pillar_4_title,
      icon: ShieldCheck,
      detail: content.quality.pillar_4_desc
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <SEO
        title="Qualité & Sécurité — Green IA SaaS"
        description="Découvrez comment Green IA protège votre activité et vous aide à vendre en confiance."
      />

      {/* ────────── Hero Section : Tech Focus ────────── */}
      <section className="relative pt-48 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-neon/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-neon/10 border border-green-neon/20 text-green-neon text-xs font-black uppercase tracking-widest mb-10"
            style={{ color: primaryColor, borderColor: `${primaryColor}33`, backgroundColor: `${primaryColor}1a` }}
          >
            <Terminal className="w-4 h-4" />
            {content.quality.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-black tracking-tighter leading-none mb-10"
          >
            {content.quality.hero_title_line1} <br />
            <span className="italic glow-green" style={{ color: primaryColor }}>{content.quality.hero_title_line2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-12"
          >
            {content.quality.hero_subtitle}
          </motion.p>
        </div>
      </section>

      {/* ────────── Technical Pillars ────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-green-neon/30 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: `${primaryColor}1a` }}>
                <item.icon className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider mb-4">{item.title}</h3>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────── Deep Dive : Data Isolation ────────── */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40">

          {/* Secure Infrastructure Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif font-black">{content.quality.data_isolation_title.split(' ').slice(0, -2).join(' ')} <br /> <span className="text-green-neon italic" style={{ color: primaryColor }}>{content.quality.data_isolation_title.split(' ').slice(-2).join(' ')}</span></h2>
              </div>
              <div className="space-y-8">
                <p className="text-lg text-zinc-400 leading-relaxed font-light">
                  {content.quality.data_isolation_desc}
                </p>
                <div className="grid gap-6">
                  <div className="flex gap-5 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
                    <Database className="w-8 h-8 text-green-neon shrink-0" />
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-2">Backups Temps-Réel</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed font-light">
                        Récupération point-in-time de vos données. Votre inventaire et vos ventes sont sauvegardés à chaque seconde.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-5 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
                    <Server className="w-8 h-8 text-green-neon shrink-0" />
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-2">Plateforme moderne</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed font-light">
                        Capacité de montée en charge infinie lors de vos pics de trafic (Soldes, lancements). Performance constante.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
            >
              <div className="w-full h-full bg-black rounded-2xl p-8 font-mono text-xs text-green-neon/70 overflow-hidden leading-relaxed">
                <div className="text-zinc-500 mb-4">-- PostgreSQL Multi-tenant Security</div>
                <div>CREATE POLICY shop_isolation_policy ON public.orders</div>
                <div>FOR ALL TO authenticated</div>
                <div>USING (</div>
                <div className="pl-4">shop_id IN (</div>
                <div className="pl-8 text-white font-bold">SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid()</div>
                <div className="pl-4">)</div>
                <div>);</div>
                <div className="mt-8 opacity-50">-- Ensuring perfect data isolation --</div>
                <div className="flex gap-2 mt-4">
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span>Security Policy Active</span>
                </div>
                <div className="mt-20 flex flex-col gap-2">
                  <div className="h-1 bg-green-neon/20 w-full rounded-full overflow-hidden">
                    <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-green-neon w-1/3" />
                  </div>
                  <div className="h-1 bg-green-neon/20 w-3/4 rounded-full overflow-hidden">
                    <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="h-full bg-green-neon w-1/3" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900 to-transparent h-20" />
            </motion.div>
          </div>

          {/* AI Excellence Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-zinc-800 lg:order-last bg-zinc-900 p-1 flex items-center justify-center"
            >
              <div className="relative w-full h-full rounded-[2.8rem] bg-black overflow-hidden flex flex-col items-center justify-center p-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-neon/5 blur-[80px]" />
                <Sparkles className="w-24 h-24 text-green-neon animate-pulse mb-8" />
                <h4 className="text-2xl font-serif font-bold text-center mb-4">Neural BudTender Engine v4.0</h4>
                <p className="text-zinc-500 text-center text-sm">Fine-tuné sur les terpènes et les interactions cannabinoïdes.</p>
                <div className="mt-10 flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-neon animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-green-neon animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-green-neon animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif font-black">{content.quality.ai_excellence_title.split(' ').slice(0, -3).join(' ')} <br /> <span className="text-green-neon italic" style={{ color: primaryColor }}>{content.quality.ai_excellence_title.split(' ').slice(-3).join(' ')}</span></h2>
              </div>
              <div className="space-y-8">
                <p className="text-lg text-zinc-400 leading-relaxed font-light">
                  {content.quality.ai_excellence_desc}
                </p>

                <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-[3.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-neon/10 blur-[60px]" />
                  <div className="flex items-center gap-6 mb-8">
                    <Code className="w-10 h-10 text-green-neon" />
                    <h3 className="text-xl font-black uppercase tracking-widest text-white">Technologie N10</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light mb-10">
                    Notre algorithme exclusif 'N10' calcule un score de compatibilité entre un profil utilisateur et un produit,
                    permettant une personnalisation que même le meilleur vendeur en boutique ne pourrait atteindre manuellement.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {["Conseils automatiques", "Recherche intelligente", "Mise à jour immédiate", "Prêt pour l'évolution"].map(tag => (
                      <span key={tag} className="px-5 py-2.5 rounded-xl bg-black border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-green-neon transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────── Trust Banner ────────── */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-16 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[4rem] text-center space-y-10 shadow-2xl">
          <Zap className="w-16 h-16 text-green-neon mx-auto animate-pulse" />
          <div className="space-y-5">
            <h3 className="text-3xl md:text-4xl font-serif font-black">{content.quality.trust_banner_title}</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed text-lg">
              {content.quality.trust_banner_desc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
