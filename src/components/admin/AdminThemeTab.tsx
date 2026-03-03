import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Palette, Save, Eye, RefreshCw, Check, Sparkles,
    Type, Layout, Square, Sliders, Monitor, Sun, Moon,
    Wand2, ChevronRight, Zap, Image as ImageIcon, X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useShopStore } from '../../store/shopStore';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShopTheme {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    background_color: string;
    text_color: string;
    font_family: string;
    border_radius: 'sharp' | 'rounded' | 'pill';
    button_style: 'filled' | 'outline' | 'ghost';
    nav_style: 'dark' | 'light' | 'transparent' | 'colored';
    card_style: 'glass' | 'solid' | 'minimal' | 'bordered';
    hero_style: 'gradient' | 'image' | 'solid' | 'overlay';
    hero_image_url: string | null;
    logo_position: 'left' | 'center';
    show_banner: boolean;
    banner_color: string;
    banner_text_color: string;
    dark_mode: boolean;
    animations_enabled: boolean;
    preset: string;
}

// ─── Presets ─────────────────────────────────────────────────────────────────

const THEME_PRESETS: {
    id: string;
    name: string;
    emoji: string;
    description: string;
    gradient: string;
    theme: Partial<ShopTheme>;
}[] = [
        {
            id: 'green',
            name: 'Green CBD',
            emoji: '🌿',
            description: 'Vert néon sur fond sombre — identité Green IA par défaut',
            gradient: 'from-green-500 to-emerald-600',
            theme: {
                primary_color: '#39ff14',
                secondary_color: '#ffffff',
                accent_color: '#a3e635',
                background_color: '#09090b',
                text_color: '#f4f4f5',
                dark_mode: true,
                nav_style: 'dark',
                card_style: 'glass',
                hero_style: 'gradient',
                border_radius: 'rounded',
                button_style: 'filled',
            },
        },
        {
            id: 'ocean',
            name: 'Océan',
            emoji: '🌊',
            description: 'Bleu profond élégant — ambiance premium et apaisante',
            gradient: 'from-blue-500 to-cyan-600',
            theme: {
                primary_color: '#06b6d4',
                secondary_color: '#e0f2fe',
                accent_color: '#38bdf8',
                background_color: '#0c1a2e',
                text_color: '#e0f2fe',
                dark_mode: true,
                nav_style: 'dark',
                card_style: 'glass',
                hero_style: 'gradient',
                border_radius: 'rounded',
                button_style: 'filled',
            },
        },
        {
            id: 'luxury',
            name: 'Luxe Doré',
            emoji: '✨',
            description: 'Or sur noir profond — boutique haut de gamme et exclusive',
            gradient: 'from-yellow-400 to-amber-600',
            theme: {
                primary_color: '#f59e0b',
                secondary_color: '#fef3c7',
                accent_color: '#fbbf24',
                background_color: '#0a0a0a',
                text_color: '#fef3c7',
                dark_mode: true,
                nav_style: 'dark',
                card_style: 'glass',
                hero_style: 'gradient',
                border_radius: 'rounded',
                button_style: 'filled',
            },
        },
        {
            id: 'sunset',
            name: 'Coucher de Soleil',
            emoji: '🌅',
            description: 'Dégradé corail-violet — chaleureux et moderne',
            gradient: 'from-rose-500 to-purple-600',
            theme: {
                primary_color: '#f43f5e',
                secondary_color: '#fdf2f8',
                accent_color: '#c084fc',
                background_color: '#1a0a1e',
                text_color: '#fdf4ff',
                dark_mode: true,
                nav_style: 'dark',
                card_style: 'glass',
                hero_style: 'gradient',
                border_radius: 'pill',
                button_style: 'filled',
            },
        },
        {
            id: 'minimal',
            name: 'Minimaliste',
            emoji: '⬜',
            description: 'Blanc épuré — design minimal et professionnel clair',
            gradient: 'from-zinc-300 to-zinc-500',
            theme: {
                primary_color: '#18181b',
                secondary_color: '#71717a',
                accent_color: '#3f3f46',
                background_color: '#ffffff',
                text_color: '#09090b',
                dark_mode: false,
                nav_style: 'light',
                card_style: 'bordered',
                hero_style: 'solid',
                border_radius: 'sharp',
                button_style: 'filled',
            },
        },
        {
            id: 'nature',
            name: 'Nature Bio',
            emoji: '🌱',
            description: 'Terreux et naturel — tons de terre et de vert foncé',
            gradient: 'from-stone-500 to-green-700',
            theme: {
                primary_color: '#4ade80',
                secondary_color: '#f5f0eb',
                accent_color: '#86efac',
                background_color: '#1c1407',
                text_color: '#f5f0eb',
                dark_mode: true,
                nav_style: 'dark',
                card_style: 'solid',
                hero_style: 'gradient',
                border_radius: 'rounded',
                button_style: 'filled',
            },
        },
    ];

// ─── Default theme ────────────────────────────────────────────────────────────

const DEFAULT_THEME: ShopTheme = {
    primary_color: '#39ff14',
    secondary_color: '#ffffff',
    accent_color: '#a3e635',
    background_color: '#09090b',
    text_color: '#f4f4f5',
    font_family: 'Inter',
    border_radius: 'rounded',
    button_style: 'filled',
    nav_style: 'dark',
    card_style: 'glass',
    hero_style: 'gradient',
    hero_image_url: null,
    logo_position: 'left',
    show_banner: true,
    banner_color: '#39ff14',
    banner_text_color: '#000000',
    dark_mode: true,
    animations_enabled: true,
    preset: 'green',
};

// ─── Font options ─────────────────────────────────────────────────────────────

const FONT_OPTIONS = [
    { value: 'Inter', label: 'Inter', preview: 'Modern & Clean' },
    { value: 'Poppins', label: 'Poppins', preview: 'Friendly & Rounded' },
    { value: 'Montserrat', label: 'Montserrat', preview: 'Bold & Strong' },
    { value: 'Playfair Display', label: 'Playfair Display', preview: 'Elegant & Serif' },
    { value: 'Raleway', label: 'Raleway', preview: 'Stylish & Light' },
    { value: 'Nunito', label: 'Nunito', preview: 'Casual & Warm' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '57, 255, 20';
};

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, icon: Icon, children, badge }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    badge?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/60 border border-white/[0.07] rounded-2xl p-6 space-y-5"
        >
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-zinc-300" style={{ width: '18px', height: '18px' }} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">{title}</h3>
                {badge && (
                    <span className="ml-auto text-[10px] font-black px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-widest">
                        {badge}
                    </span>
                )}
            </div>
            {children}
        </motion.div>
    );
}

// ─── Color Input ──────────────────────────────────────────────────────────────

function ColorInput({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</label>
            <div className="flex items-center gap-2 bg-zinc-800 border border-white/[0.08] rounded-xl px-3 py-2 group focus-within:border-white/20 transition-colors">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                    style={{ minWidth: '28px' }}
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) onChange(e.target.value);
                    }}
                    className="flex-1 bg-transparent text-sm font-mono text-white focus:outline-none uppercase"
                    maxLength={7}
                />
            </div>
        </div>
    );
}

// ─── Preview Component ────────────────────────────────────────────────────────

function LivePreview({ theme, shopName }: { theme: ShopTheme; shopName: string }) {
    const radiusMap = {
        sharp: '0px',
        rounded: '12px',
        pill: '9999px',
    };

    const navBg = {
        dark: 'rgba(9,9,11,0.95)',
        light: 'rgba(255,255,255,0.95)',
        transparent: 'transparent',
        colored: theme.primary_color,
    }[theme.nav_style];

    const navTextColor = theme.nav_style === 'light' ? '#18181b' : theme.nav_style === 'colored' ? '#000' : '#fff';

    const cardBg = {
        glass: `rgba(255,255,255,0.04)`,
        solid: 'rgba(30,30,32,0.95)',
        minimal: 'transparent',
        bordered: '#fff',
    }[theme.card_style];

    const cardBorder = {
        glass: '1px solid rgba(255,255,255,0.07)',
        solid: '1px solid rgba(255,255,255,0.06)',
        minimal: 'none',
        bordered: `2px solid ${theme.primary_color}40`,
    }[theme.card_style];

    const bg = theme.background_color;
    const primary = theme.primary_color;

    return (
        <div
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ background: bg, fontFamily: theme.font_family }}
        >
            {/* Mini Nav */}
            <div
                className="flex items-center justify-between px-4 py-3 gap-4"
                style={{ background: navBg, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                        style={{ background: primary, color: '#000', borderRadius: theme.border_radius === 'pill' ? '9999px' : theme.border_radius === 'sharp' ? '4px' : '8px' }}
                    >
                        {shopName[0]}
                    </div>
                    <span className="text-xs font-black" style={{ color: navTextColor }}>{shopName}</span>
                </div>
                <div className="flex items-center gap-3">
                    {['Vitrine', 'Catalogue'].map((n) => (
                        <span key={n} className="text-[10px] font-black opacity-50" style={{ color: navTextColor }}>{n}</span>
                    ))}
                    <div
                        className="text-[10px] font-black px-3 py-1.5"
                        style={{
                            background: theme.button_style === 'filled' ? primary : 'transparent',
                            color: theme.button_style === 'filled' ? '#000' : primary,
                            border: theme.button_style !== 'filled' ? `1.5px solid ${primary}` : 'none',
                            borderRadius: radiusMap[theme.border_radius],
                        }}
                    >
                        Se connecter
                    </div>
                </div>
            </div>

            {/* Hero */}
            <div
                className="relative px-6 pt-8 pb-6"
                style={{
                    background: theme.hero_style === 'gradient'
                        ? `linear-gradient(135deg, ${primary}18 0%, transparent 60%)`
                        : theme.hero_style === 'solid'
                            ? `${primary}10`
                            : bg,
                }}
            >
                <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl"
                    style={{ background: primary }}
                />
                <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: primary }}>
                    Boutique Premium CBD
                </p>
                <h2 className="text-xl font-black mb-1" style={{ color: theme.text_color }}>
                    Bienvenue chez<br /><span style={{ color: primary }}>{shopName}</span>
                </h2>
                <p className="text-xs opacity-50 mb-4" style={{ color: theme.text_color }}>
                    Produits premium de qualité supérieure
                </p>
                <div
                    className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-2.5"
                    style={{
                        background: theme.button_style === 'filled' ? primary : 'transparent',
                        color: theme.button_style === 'filled' ? '#000' : primary,
                        border: theme.button_style !== 'filled' ? `1.5px solid ${primary}` : 'none',
                        borderRadius: radiusMap[theme.border_radius],
                    }}
                >
                    Explorer le catalogue →
                </div>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-3 gap-2 px-4 pb-5 pt-2">
                {['CBD Fleurs', 'Huiles CBD', 'Infusions'].map((name, i) => (
                    <div
                        key={name}
                        className="overflow-hidden"
                        style={{
                            background: cardBg,
                            border: cardBorder,
                            borderRadius: theme.border_radius === 'pill' ? '16px' : theme.border_radius === 'sharp' ? '4px' : '12px',
                        }}
                    >
                        <div
                            className="h-14 flex items-center justify-center text-lg"
                            style={{ background: `${primary}${[18, 12, 15][i].toString(16).padStart(2, '0')}` }}
                        >
                            {['🌿', '💧', '🍵'][i]}
                        </div>
                        <div className="px-2 py-2">
                            <p className="text-[9px] font-black" style={{ color: theme.text_color }}>{name}</p>
                            <p className="text-[10px] font-black" style={{ color: primary }}>
                                {['12.90', '24.90', '8.50'][i]} €
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminThemeTab() {
    const { currentShop, fetchShop } = useShopStore();

    const [theme, setTheme] = useState<ShopTheme>(DEFAULT_THEME);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [activeSection, setActiveSection] = useState<'presets' | 'colors' | 'typography' | 'layout' | 'advanced'>('presets');
    const [showPreview, setShowPreview] = useState(true);
    const [hasChanges, setHasChanges] = useState(false);

    // Load existing theme from shop settings
    useEffect(() => {
        if (currentShop?.settings?.theme) {
            setTheme({ ...DEFAULT_THEME, ...currentShop.settings.theme });
        } else if (currentShop?.settings?.primary_color) {
            // Legacy fallback
            setTheme((prev) => ({
                ...prev,
                primary_color: currentShop.settings.primary_color,
            }));
        }
    }, [currentShop]);

    const updateTheme = useCallback((updates: Partial<ShopTheme>) => {
        setTheme((prev) => ({ ...prev, ...updates, preset: 'custom' }));
        setHasChanges(true);
    }, []);

    const applyPreset = (preset: typeof THEME_PRESETS[0]) => {
        setTheme((prev) => ({
            ...prev,
            ...preset.theme,
            preset: preset.id,
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        if (!currentShop) return;
        setIsSaving(true);
        setSaveSuccess(false);

        try {
            // Inject Google Font in head for immediate effect
            injectGoogleFont(theme.font_family);

            const newSettings = {
                ...currentShop.settings,
                primary_color: theme.primary_color, // backward compat
                theme,
            };

            const { error } = await supabase
                .from('shops')
                .update({ settings: newSettings })
                .eq('id', currentShop.id);

            if (error) throw error;

            // Refresh shop in store
            await fetchShop(currentShop.id);

            // Apply CSS variables immediately on the page
            applyThemeCSSVars(theme);

            setSaveSuccess(true);
            setHasChanges(false);
            setTimeout(() => setSaveSuccess(false), 3500);
        } catch (err) {
            console.error('Error saving theme:', err);
            alert('Erreur lors de la sauvegarde du thème.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        if (!confirm('Réinitialiser le thème aux valeurs par défaut ?')) return;
        setTheme(DEFAULT_THEME);
        setHasChanges(true);
    };

    const shopName = currentShop?.name || 'Ma Boutique';

    const SECTIONS = [
        { key: 'presets', label: 'Thèmes prédéfinis', icon: Wand2 },
        { key: 'colors', label: 'Couleurs', icon: Palette },
        { key: 'typography', label: 'Typographie', icon: Type },
        { key: 'layout', label: 'Design & Mise en page', icon: Layout },
        { key: 'advanced', label: 'Avancé', icon: Sliders },
    ] as const;

    return (
        <div className="space-y-6 pb-32">
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="text-xl font-black text-white mb-1 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-green-400" />
                        Thème & Design de la Boutique
                    </h2>
                    <p className="text-sm text-zinc-500">
                        Personnalisez l'apparence visuelle de votre shop — couleurs, typographie, styles des composants.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${showPreview
                                ? 'bg-white/10 border-white/20 text-white'
                                : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white'
                            }`}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        Aperçu
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Réinitialiser
                    </button>
                </div>
            </div>

            {/* ── Save Bar (sticky) ────────────────────────────────────────────── */}
            <AnimatePresence>
                {hasChanges && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="sticky top-4 z-40 flex items-center justify-between bg-zinc-900/95 backdrop-blur-xl border border-green-500/30 rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(57,255,20,0.1)]"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm font-black text-white">Modifications non sauvegardées</span>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-green-500 hover:bg-green-400 text-black transition-all disabled:opacity-60"
                        >
                            {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {isSaving ? 'Enregistrement...' : saveSuccess ? 'Sauvegardé !' : 'Sauvegarder'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main 2-col layout ─────────────────────────────────────────────── */}
            <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-[1fr_360px]' : 'grid-cols-1'}`}>
                {/* ── Left: Controls ── */}
                <div className="space-y-4">
                    {/* Section nav tabs */}
                    <div className="flex flex-wrap gap-2">
                        {SECTIONS.map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeSection === key
                                        ? 'bg-white/10 text-white border border-white/20'
                                        : 'text-zinc-500 hover:text-zinc-300 border border-transparent hover:bg-white/[0.04]'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* ── Presets ── */}
                    {activeSection === 'presets' && (
                        <Section title="Thèmes prédéfinis" icon={Wand2} badge="Recommandé">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {THEME_PRESETS.map((preset) => {
                                    const isActive = theme.preset === preset.id;
                                    return (
                                        <motion.button
                                            key={preset.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => applyPreset(preset)}
                                            className={`relative flex flex-col items-start gap-2 p-4 rounded-2xl border transition-all text-left overflow-hidden ${isActive
                                                    ? 'border-white/30 bg-white/10 shadow-[0_4px_20px_rgba(255,255,255,0.08)]'
                                                    : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]'
                                                }`}
                                        >
                                            {/* Gradient top bar */}
                                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${preset.gradient}`} />

                                            {isActive && (
                                                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-black" />
                                                </div>
                                            )}

                                            <span className="text-2xl mt-1">{preset.emoji}</span>
                                            <span className="text-sm font-black text-white">{preset.name}</span>
                                            <span className="text-[10px] text-zinc-500 leading-relaxed">{preset.description}</span>

                                            {/* Color swatches */}
                                            <div className="flex gap-1 mt-1">
                                                {[
                                                    (preset.theme as ShopTheme).primary_color,
                                                    (preset.theme as ShopTheme).secondary_color,
                                                    (preset.theme as ShopTheme).background_color,
                                                ].map((c, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-5 h-5 rounded-full border-2 border-white/10"
                                                        style={{ background: c }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <p className="text-xs text-zinc-600 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
                                Appliquez un thème prédéfini puis affinez selon vos préférences dans les autres onglets.
                            </p>
                        </Section>
                    )}

                    {/* ── Colors ── */}
                    {activeSection === 'colors' && (
                        <Section title="Palette de couleurs" icon={Palette}>
                            <div className="grid grid-cols-2 gap-4">
                                <ColorInput
                                    label="Couleur principale"
                                    value={theme.primary_color}
                                    onChange={(v) => updateTheme({ primary_color: v })}
                                />
                                <ColorInput
                                    label="Couleur secondaire"
                                    value={theme.secondary_color}
                                    onChange={(v) => updateTheme({ secondary_color: v })}
                                />
                                <ColorInput
                                    label="Couleur d'accentuation"
                                    value={theme.accent_color}
                                    onChange={(v) => updateTheme({ accent_color: v })}
                                />
                                <ColorInput
                                    label="Couleur de fond"
                                    value={theme.background_color}
                                    onChange={(v) => updateTheme({ background_color: v })}
                                />
                                <ColorInput
                                    label="Couleur du texte"
                                    value={theme.text_color}
                                    onChange={(v) => updateTheme({ text_color: v })}
                                />
                            </div>

                            <div className="pt-2 border-t border-white/[0.05]">
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Bannière promotionnelle</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <ColorInput
                                        label="Fond bannière"
                                        value={theme.banner_color}
                                        onChange={(v) => updateTheme({ banner_color: v })}
                                    />
                                    <ColorInput
                                        label="Texte bannière"
                                        value={theme.banner_text_color}
                                        onChange={(v) => updateTheme({ banner_text_color: v })}
                                    />
                                </div>
                            </div>

                            {/* Palette preview row */}
                            <div className="flex gap-2 h-10 rounded-xl overflow-hidden border border-white/[0.08]">
                                {[theme.primary_color, theme.secondary_color, theme.accent_color, theme.background_color, theme.text_color].map((c, i) => (
                                    <div key={i} className="flex-1" style={{ background: c }} />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* ── Typography ── */}
                    {activeSection === 'typography' && (
                        <Section title="Typographie" icon={Type}>
                            <div className="space-y-3">
                                {FONT_OPTIONS.map((font) => {
                                    const isSelected = theme.font_family === font.value;
                                    return (
                                        <button
                                            key={font.value}
                                            onClick={() => updateTheme({ font_family: font.value })}
                                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${isSelected
                                                    ? 'border-white/25 bg-white/10'
                                                    : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15'
                                                }`}
                                        >
                                            <div className="flex flex-col items-start gap-0.5">
                                                <span
                                                    className="text-xl text-white"
                                                    style={{ fontFamily: font.value }}
                                                >
                                                    {font.label}
                                                </span>
                                                <span className="text-xs text-zinc-500">{font.preview}</span>
                                            </div>
                                            {isSelected ? (
                                                <Check className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-zinc-600" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Font Preview */}
                            <div
                                className="p-5 bg-white/[0.03] border border-white/[0.07] rounded-2xl"
                                style={{ fontFamily: theme.font_family }}
                            >
                                <p className="text-xs text-zinc-500 mb-2 font-sans">Aperçu de la police</p>
                                <p className="text-2xl font-black text-white mb-1" style={{ color: theme.primary_color }}>
                                    AaBbCcDd 0123
                                </p>
                                <p className="text-sm text-zinc-300">Votre boutique CBD premium — qualité et confiance garanties.</p>
                            </div>
                        </Section>
                    )}

                    {/* ── Layout ── */}
                    {activeSection === 'layout' && (
                        <Section title="Design & Mise en page" icon={Layout}>
                            {/* Border radius */}
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Arrondi des éléments</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'sharp', label: 'Angulaire', desc: 'Précis, technique', preview: '4px' },
                                        { value: 'rounded', label: 'Arrondi', desc: 'Moderne, équilibré', preview: '12px' },
                                        { value: 'pill', label: 'Pilule', desc: 'Doux, amical', preview: '9999px' },
                                    ].map(({ value, label, desc, preview }) => (
                                        <button
                                            key={value}
                                            onClick={() => updateTheme({ border_radius: value as ShopTheme['border_radius'] })}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${theme.border_radius === value
                                                    ? 'border-white/25 bg-white/10 text-white'
                                                    : 'border-white/[0.07] bg-white/[0.03] text-zinc-400 hover:border-white/15'
                                                }`}
                                        >
                                            <div
                                                className="w-10 h-10 border-2 border-current"
                                                style={{ borderRadius: preview }}
                                            />
                                            <span className="text-xs font-black">{label}</span>
                                            <span className="text-[10px] text-zinc-600">{desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Button style */}
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Style des boutons</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'filled', label: 'Plein' },
                                        { value: 'outline', label: 'Contour' },
                                        { value: 'ghost', label: 'Ghost' },
                                    ].map(({ value, label }) => (
                                        <button
                                            key={value}
                                            onClick={() => updateTheme({ button_style: value as ShopTheme['button_style'] })}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${theme.button_style === value
                                                    ? 'border-white/25 bg-white/10'
                                                    : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15'
                                                }`}
                                        >
                                            <div
                                                className="px-4 py-1.5 text-xs font-black"
                                                style={{
                                                    background: value === 'filled' ? theme.primary_color : 'transparent',
                                                    color: value === 'filled' ? '#000' : theme.primary_color,
                                                    border: value !== 'filled' ? `1.5px solid ${theme.primary_color}` : 'none',
                                                    borderRadius: theme.border_radius === 'pill' ? '9999px' : theme.border_radius === 'sharp' ? '4px' : '8px',
                                                }}
                                            >
                                                Bouton
                                            </div>
                                            <span className={`text-xs font-black ${theme.button_style === value ? 'text-white' : 'text-zinc-400'}`}>
                                                {label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Nav style */}
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Style de la navigation</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: 'dark', label: 'Sombre', desc: 'Fond noir premium' },
                                        { value: 'light', label: 'Clair', desc: 'Fond blanc épuré' },
                                        { value: 'transparent', label: 'Transparent', desc: 'Flottant au dessus' },
                                        { value: 'colored', label: 'Coloré', desc: 'Couleur principale' },
                                    ].map(({ value, label, desc }) => (
                                        <button
                                            key={value}
                                            onClick={() => updateTheme({ nav_style: value as ShopTheme['nav_style'] })}
                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${theme.nav_style === value
                                                    ? 'border-white/25 bg-white/10'
                                                    : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15'
                                                }`}
                                        >
                                            <div
                                                className="w-10 h-7 rounded border flex-shrink-0"
                                                style={{
                                                    background: value === 'dark' ? '#09090b' : value === 'light' ? '#fff' : value === 'colored' ? theme.primary_color : 'transparent',
                                                    borderColor: 'rgba(255,255,255,0.15)',
                                                }}
                                            />
                                            <div>
                                                <p className={`text-xs font-black ${theme.nav_style === value ? 'text-white' : 'text-zinc-400'}`}>{label}</p>
                                                <p className="text-[10px] text-zinc-600">{desc}</p>
                                            </div>
                                            {theme.nav_style === value && <Check className="w-3.5 h-3.5 text-green-400 ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Card style */}
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Style des cartes produits</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: 'glass', label: 'Verre (Glass)', desc: 'Effet glassmorphism' },
                                        { value: 'solid', label: 'Solide', desc: 'Fond opaque uniforme' },
                                        { value: 'minimal', label: 'Minimal', desc: 'Fond transparent' },
                                        { value: 'bordered', label: 'Bordé', desc: 'Bordure colorée' },
                                    ].map(({ value, label, desc }) => (
                                        <button
                                            key={value}
                                            onClick={() => updateTheme({ card_style: value as ShopTheme['card_style'] })}
                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${theme.card_style === value
                                                    ? 'border-white/25 bg-white/10'
                                                    : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15'
                                                }`}
                                        >
                                            {theme.card_style === value && <Check className="w-3.5 h-3.5 text-green-400" />}
                                            <div>
                                                <p className={`text-xs font-black ${theme.card_style === value ? 'text-white' : 'text-zinc-400'}`}>{label}</p>
                                                <p className="text-[10px] text-zinc-600">{desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Hero style */}
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Style du Hero (vitrine)</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: 'gradient', label: 'Dégradé', desc: 'Couleur principale en fond' },
                                        { value: 'solid', label: 'Couleur unie', desc: 'Ton de la couleur principale' },
                                        { value: 'image', label: 'Image de fond', desc: 'Votre propre image hero' },
                                        { value: 'overlay', label: 'Overlay', desc: 'Image + filtre couleur' },
                                    ].map(({ value, label, desc }) => (
                                        <button
                                            key={value}
                                            onClick={() => updateTheme({ hero_style: value as ShopTheme['hero_style'] })}
                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${theme.hero_style === value
                                                    ? 'border-white/25 bg-white/10'
                                                    : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15'
                                                }`}
                                        >
                                            {theme.hero_style === value && <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />}
                                            <div>
                                                <p className={`text-xs font-black ${theme.hero_style === value ? 'text-white' : 'text-zinc-400'}`}>{label}</p>
                                                <p className="text-[10px] text-zinc-600">{desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {(theme.hero_style === 'image' || theme.hero_style === 'overlay') && (
                                    <div className="mt-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">URL de l'image hero</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="url"
                                                value={theme.hero_image_url || ''}
                                                onChange={(e) => updateTheme({ hero_image_url: e.target.value || null })}
                                                placeholder="https://... (image haute résolution)"
                                                className="flex-1 bg-zinc-800 border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                                            />
                                            {theme.hero_image_url && (
                                                <button
                                                    onClick={() => updateTheme({ hero_image_url: null })}
                                                    className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Section>
                    )}

                    {/* ── Advanced ── */}
                    {activeSection === 'advanced' && (
                        <Section title="Options avancées" icon={Sliders}>
                            <div className="space-y-4">
                                {/* Dark mode */}
                                <div className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl">
                                    <div className="flex items-center gap-3">
                                        {theme.dark_mode ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-yellow-400" />}
                                        <div>
                                            <p className="text-sm font-black text-white">Mode {theme.dark_mode ? 'Sombre' : 'Clair'}</p>
                                            <p className="text-xs text-zinc-500">Fond général de la boutique</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateTheme({
                                            dark_mode: !theme.dark_mode,
                                            background_color: !theme.dark_mode ? '#09090b' : '#ffffff',
                                            text_color: !theme.dark_mode ? '#f4f4f5' : '#09090b',
                                        })}
                                        className={`w-12 h-6 rounded-full transition-all relative ${theme.dark_mode ? 'bg-blue-500' : 'bg-zinc-600'
                                            }`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${theme.dark_mode ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                {/* Animations */}
                                <div className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-4 h-4 text-yellow-400" />
                                        <div>
                                            <p className="text-sm font-black text-white">Animations</p>
                                            <p className="text-xs text-zinc-500">Transitions et micro-animations</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateTheme({ animations_enabled: !theme.animations_enabled })}
                                        className={`w-12 h-6 rounded-full transition-all relative ${theme.animations_enabled ? 'bg-yellow-500' : 'bg-zinc-600'
                                            }`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${theme.animations_enabled ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                {/* Logo position */}
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Position du logo</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: 'left', label: 'Gauche', desc: 'Standard' },
                                            { value: 'center', label: 'Centré', desc: 'Signature' },
                                        ].map(({ value, label, desc }) => (
                                            <button
                                                key={value}
                                                onClick={() => updateTheme({ logo_position: value as ShopTheme['logo_position'] })}
                                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${theme.logo_position === value
                                                        ? 'border-white/25 bg-white/10'
                                                        : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15'
                                                    }`}
                                            >
                                                {theme.logo_position === value && <Check className="w-3.5 h-3.5 text-green-400" />}
                                                <div>
                                                    <p className={`text-xs font-black ${theme.logo_position === value ? 'text-white' : 'text-zinc-400'}`}>{label}</p>
                                                    <p className="text-[10px] text-zinc-600">{desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CSS Variables info */}
                                <div className="p-4 bg-blue-500/[0.05] border border-blue-500/20 rounded-xl">
                                    <div className="flex items-start gap-2.5">
                                        <Monitor className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-black text-blue-300 mb-1">Variables CSS appliquées</p>
                                            <p className="text-xs text-zinc-500 leading-relaxed">
                                                Chaque couleur est appliquée comme variable CSS globale (
                                                <code className="text-blue-400">--shop-primary</code>,{' '}
                                                <code className="text-blue-400">--shop-bg</code>, etc.) sur l'ensemble du site. Elles prennent effet immédiatement après sauvegarde.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* ── Save button (bottom) ── */}
                    <div className="flex items-center gap-4 pt-2">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-black text-black transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 shadow-[0_4px_20px_rgba(57,255,20,0.3)]"
                            style={{ background: theme.primary_color }}
                        >
                            {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {isSaving ? 'Enregistrement…' : saveSuccess ? 'Thème sauvegardé !' : 'Sauvegarder le thème'}
                        </button>
                        {saveSuccess && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm font-bold text-green-400"
                            >
                                ✓ Appliqué sur votre boutique
                            </motion.span>
                        )}
                    </div>
                </div>

                {/* ── Right: Live Preview ── */}
                {showPreview && (
                    <div className="hidden lg:block">
                        <div className="sticky top-24 space-y-3">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-zinc-500" />
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Aperçu en direct</p>
                                <div
                                    className="ml-auto w-2.5 h-2.5 rounded-full animate-pulse"
                                    style={{ background: theme.primary_color }}
                                />
                            </div>
                            <LivePreview theme={theme} shopName={shopName} />
                            <p className="text-[10px] text-zinc-600 text-center">
                                Aperçu simplifié — le rendu réel peut différer légèrement
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Utility: Apply CSS vars globally ────────────────────────────────────────

export function applyThemeCSSVars(theme: ShopTheme) {
    const root = document.documentElement;
    root.style.setProperty('--shop-primary', theme.primary_color);
    root.style.setProperty('--shop-primary-rgb', hexToRgb(theme.primary_color));
    root.style.setProperty('--shop-secondary', theme.secondary_color);
    root.style.setProperty('--shop-accent', theme.accent_color);
    root.style.setProperty('--shop-bg', theme.background_color);
    root.style.setProperty('--shop-text', theme.text_color);
    root.style.setProperty('--shop-font', theme.font_family);
    root.style.setProperty('--shop-banner-bg', theme.banner_color);
    root.style.setProperty('--shop-banner-text', theme.banner_text_color);
}

// ─── Utility: Inject Google Font ─────────────────────────────────────────────

function injectGoogleFont(fontFamily: string) {
    const id = `gf-${fontFamily.replace(/\s+/g, '-')}`;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800;900&display=swap`;
    document.head.appendChild(link);
}
