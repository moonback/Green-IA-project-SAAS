import { motion } from "motion/react";
import { MapPin, Clock, Phone, ShieldCheck, Leaf, Users, Award, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useShopStore } from "../store/shopStore";
import { useSettingsStore } from "../store/settingsStore";
import { useShopPath } from "../hooks/useShopPath";
import { useShopContent } from "../hooks/useShopContent";
import { useShopLayout } from "../hooks/useShopLayout";

/**
 * ShopAbout — Page "Notre Boutique" dynamique, affichant les infos du shop actuel.
 */
export default function ShopAbout() {
    const { currentShop } = useShopStore();
    const settings = useSettingsStore((s) => s.settings);
    const shopPath = useShopPath();
    const content = useShopContent();
    const { aboutSections } = useShopLayout();

    if (!currentShop) return null;

    const primaryColor = currentShop.settings?.primary_color || '#39ff14';
    const shopName = currentShop.name || 'Boutique CBD';

    const values = [
        {
            icon: <ShieldCheck className="w-7 h-7" style={{ color: primaryColor }} />,
            title: content.about.value_1_title,
            desc: content.about.value_1_desc
        },
        {
            icon: <Award className="w-7 h-7" style={{ color: primaryColor }} />,
            title: content.about.value_2_title,
            desc: content.about.value_2_desc
        },
        {
            icon: <Users className="w-7 h-7" style={{ color: primaryColor }} />,
            title: content.about.value_3_title,
            desc: content.about.value_3_desc
        },
        {
            icon: <Leaf className="w-7 h-7" style={{ color: primaryColor }} />,
            title: content.about.value_4_title,
            desc: content.about.value_4_desc
        }
    ];

    const renderSection = (section: any) => {
        if (!section.enabled) return null;

        switch (section.type) {
            case 'hero':
                return (
                    <section key={section.id} className="relative min-h-[50vh] flex items-center justify-center pt-24 px-4 overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img
                                src={content.about.hero_image}
                                className="w-full h-full object-cover opacity-20 filter grayscale"
                                alt=""
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950" />
                        </div>

                        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-6"
                            >
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-black uppercase tracking-[0.3em]"
                                    style={{ color: primaryColor }}
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {content.about.badge}
                                </div>
                                <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-none">
                                    {content.about.hero_title_line1} <br />
                                    <span className="italic" style={{ color: primaryColor }}>{shopName.toUpperCase()}.</span>
                                </h1>
                                <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed pt-4">
                                    {content.about.hero_subtitle}
                                </p>
                            </motion.div>
                        </div>
                    </section>
                );

            case 'values':
                return (
                    <section key={section.id} className="py-24 bg-zinc-900/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-20 space-y-3">
                                <h2 className="text-4xl md:text-5xl font-serif font-black">
                                    {content.about.section_values_title.split(' ').slice(0, -1).join(' ')} <span style={{ color: primaryColor }}>{content.about.section_values_title.split(' ').slice(-1)}</span>
                                </h2>
                                <p className="text-zinc-500 text-lg">{content.about.section_values_subtitle} {shopName}.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {values.map((v, i) => (
                                    <motion.div
                                        key={v.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 rounded-3xl bg-zinc-950 border border-white/5 hover:border-white/10 transition-all group"
                                    >
                                        <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {v.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                                        <p className="text-zinc-400 text-sm font-light leading-relaxed">{v.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                );

            case 'visit_cta':
                return (
                    <section key={section.id} className="py-24 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center space-y-10"
                        >
                            <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tight">
                                {content.about.cta_title.split(' ').slice(0, -2).join(' ')} <br />
                                <span className="italic" style={{ color: primaryColor }}>{content.about.cta_title.split(' ').slice(-2).join(' ')}</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                {settings.store_address && (
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                                            <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
                                        </div>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Adresse</p>
                                        <p className="text-white text-sm font-medium text-center">{settings.store_address}</p>
                                    </div>
                                )}

                                {settings.store_hours && (
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                                            <Clock className="w-5 h-5" style={{ color: primaryColor }} />
                                        </div>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Horaires</p>
                                        <p className="text-white text-sm font-medium text-center whitespace-pre-line">{settings.store_hours}</p>
                                    </div>
                                )}

                                {settings.store_phone && (
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                                            <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                                        </div>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Téléphone</p>
                                        <p className="text-white text-sm font-medium">{settings.store_phone}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link
                                    to={shopPath("/contact")}
                                    className="px-10 py-5 font-black rounded-2xl text-black transition-transform hover:scale-105 flex items-center justify-center gap-3"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    {content.about.cta_primary}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to={shopPath("/catalogue")}
                                    className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                                >
                                    {content.about.cta_secondary}
                                </Link>
                            </div>
                        </motion.div>
                    </section>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-hidden pb-20">
            <SEO
                title={`${shopName} — Notre Boutique`}
                description={`Découvrez l'univers ${shopName}. Nos valeurs, notre histoire et notre engagement pour un CBD de qualité.`}
            />

            {aboutSections.map(renderSection)}
        </div>
    );
}
