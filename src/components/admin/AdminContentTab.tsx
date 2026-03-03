import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Save, Check, RefreshCw, Home, Users, Phone, ShieldCheck, ShoppingBag,
    ChevronRight, Type, AlertCircle, Eye, EyeOff
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useShopStore } from '../../store/shopStore';
import { DEFAULT_SHOP_CONTENT, ShopContent } from '../../hooks/useShopContent';
import ImageUpload from './ImageUpload';

// ─── Types ────────────────────────────────────────────────────────────────────

type PageKey = 'home' | 'about' | 'contact' | 'quality' | 'catalog';

// ─── Field definitions ────────────────────────────────────────────────────────

const PAGE_FIELDS: Record<PageKey, {
    label: string;
    icon: React.ElementType;
    emoji: string;
    desc: string;
    fields: {
        key: string;
        label: string;
        hint?: string;
        multiline?: boolean;
        type?: 'text' | 'textarea' | 'image';
        aspectRatio?: 'square' | 'video' | 'wide' | 'any';
    }[];
}> = {
    home: {
        label: 'Vitrine',
        icon: Home,
        emoji: '🏠',
        desc: 'Page d\'accueil de votre boutique',
        fields: [
            { key: 'badge', label: 'Badge (étiquette haut)', hint: 'ex: Boutique CBD' },
            { key: 'hero_subtitle', label: 'Sous-titre hero', multiline: true },
            { key: 'cta_primary', label: 'Bouton principal', hint: 'ex: Voir le Catalogue' },
            { key: 'cta_secondary', label: 'Bouton secondaire', hint: 'ex: Notre Histoire' },
            { key: 'section_categories_title', label: 'Titre section Catégories' },
            { key: 'section_categories_subtitle', label: 'Sous-titre section Catégories' },
            { key: 'section_featured_title', label: 'Titre section Produits vedette' },
            { key: 'section_featured_subtitle', label: 'Sous-titre section Produits vedette' },
            { key: 'section_ai_title', label: 'Titre section BudTender IA' },
            { key: 'section_ai_subtitle', label: 'Sous-titre section BudTender IA', multiline: true },
            { key: 'section_ai_cta', label: 'Texte CTA BudTender' },
        ],
    },
    catalog: {
        label: 'Catalogue',
        icon: ShoppingBag,
        emoji: '🧪',
        desc: 'Page catalogue et liste des produits',
        fields: [
            { key: 'badge', label: 'Badge (hero)', hint: 'ex: L\'Innovation N10' },
            { key: 'hero_title_line1', label: 'Titre hero (ligne 1)' },
            { key: 'hero_title_line2', label: 'Titre hero (ligne 2, accentuée)' },
            { key: 'hero_subtitle', label: 'Sous-titre hero', multiline: true },
            { key: 'hero_image', label: 'Image hero catalogue', type: 'image', aspectRatio: 'wide' },
            { key: 'section_ai_badge', label: 'Badge encart IA' },
            { key: 'section_ai_title_line1', label: 'Titre encart IA (ligne 1)' },
            { key: 'section_ai_title_line2', label: 'Titre encart IA (ligne 2, accentuée)' },
            { key: 'section_ai_subtitle', label: 'Sous-titre encart IA', multiline: true },
            { key: 'section_ai_cta', label: 'Bouton encart IA' },
        ],
    },
    about: {
        label: 'Notre Boutique',
        icon: Users,
        emoji: '🏪',
        desc: 'Page "Notre Boutique" — histoire et valeurs',
        fields: [
            { key: 'badge', label: 'Badge (étiquette)', hint: 'ex: Notre ADN' },
            { key: 'hero_title_line1', label: 'Titre hero (ligne 1)', hint: 'ex: L\'EXPÉRIENCE' },
            { key: 'hero_subtitle', label: 'Sous-titre hero', multiline: true },
            { key: 'section_values_title', label: 'Titre section Valeurs', hint: 'ex: Nos Piliers' },
            { key: 'section_values_subtitle', label: 'Sous-titre section Valeurs' },
            { key: 'value_1_title', label: 'Valeur 1 — Titre' },
            { key: 'value_1_desc', label: 'Valeur 1 — Description', multiline: true },
            { key: 'value_2_title', label: 'Valeur 2 — Titre' },
            { key: 'value_2_desc', label: 'Valeur 2 — Description', multiline: true },
            { key: 'value_3_title', label: 'Valeur 3 — Titre' },
            { key: 'value_3_desc', label: 'Valeur 3 — Description', multiline: true },
            { key: 'value_4_title', label: 'Valeur 4 — Titre' },
            { key: 'value_4_desc', label: 'Valeur 4 — Description', multiline: true },
            { key: 'cta_title', label: 'Titre CTA visite', hint: 'ex: VENEZ NOUS RENDRE VISITE.' },
            { key: 'cta_primary', label: 'Bouton CTA principal' },
            { key: 'cta_secondary', label: 'Bouton CTA secondaire' },
            { key: 'hero_image', label: 'Image de fond hero', type: 'image', aspectRatio: 'wide' },
        ],
    },
    contact: {
        label: 'Contact',
        icon: Phone,
        emoji: '📞',
        desc: 'Page de contact — formulaire et coordonnées',
        fields: [
            { key: 'badge', label: 'Badge', hint: 'ex: Nous Contacter' },
            { key: 'hero_title_line1', label: 'Titre hero (ligne 1)', hint: 'ex: PARLONS' },
            { key: 'hero_title_line2', label: 'Titre hero (ligne 2)', hint: 'ex: ENSEMBLE.' },
            { key: 'hero_subtitle', label: 'Sous-titre hero', multiline: true },
            { key: 'form_title', label: 'Titre du formulaire' },
            { key: 'form_subtitle', label: 'Sous-titre du formulaire' },
            { key: 'budtender_box_title', label: 'Titre encart BudTender' },
            { key: 'budtender_box_desc', label: 'Texte encart BudTender', multiline: true },
            { key: 'send_button', label: 'Texte bouton envoi' },
            { key: 'success_title', label: 'Message succès — Titre' },
            { key: 'success_desc', label: 'Message succès — Texte' },
            { key: 'hero_image', label: 'Image de fond hero', type: 'image', aspectRatio: 'wide' },
        ],
    },
    quality: {
        label: 'Qualité',
        icon: ShieldCheck,
        emoji: '🛡️',
        desc: 'Page Qualité & Sécurité — engagements',
        fields: [
            { key: 'badge', label: 'Badge' },
            { key: 'hero_title_line1', label: 'Titre hero (ligne 1)' },
            { key: 'hero_title_line2', label: 'Titre hero (ligne 2, accentuée)' },
            { key: 'hero_subtitle', label: 'Sous-titre hero', multiline: true },
            { key: 'pillar_1_title', label: 'Pilier 1 — Titre' },
            { key: 'pillar_1_desc', label: 'Pilier 1 — Description', multiline: true },
            { key: 'pillar_2_title', label: 'Pilier 2 — Titre' },
            { key: 'pillar_2_desc', label: 'Pilier 2 — Description', multiline: true },
            { key: 'pillar_3_title', label: 'Pilier 3 — Titre' },
            { key: 'pillar_3_desc', label: 'Pilier 3 — Description', multiline: true },
            { key: 'pillar_4_title', label: 'Pilier 4 — Titre' },
            { key: 'pillar_4_desc', label: 'Pilier 4 — Description', multiline: true },
            { key: 'data_isolation_title', label: 'Isolation — Titre' },
            { key: 'data_isolation_desc', label: 'Isolation — Description', multiline: true },
            { key: 'ai_excellence_title', label: 'Excellence IA — Titre' },
            { key: 'ai_excellence_desc', label: 'Excellence IA — Description', multiline: true },
            { key: 'deep_dive_image', label: 'Grande image d\'illustration', type: 'image', aspectRatio: 'wide' },
            { key: 'trust_banner_title', label: 'Bannière Confiance — Titre' },
            { key: 'trust_banner_desc', label: 'Bannière Confiance — Description', multiline: true },
        ],
    },
};

// ─── Input component ──────────────────────────────────────────────────────────

function ContentField({
    label,
    value,
    defaultValue,
    multiline,
    type = 'text',
    aspectRatio = 'any',
    hint,
    onChange,
}: {
    label: string;
    value: string;
    defaultValue: string;
    multiline?: boolean;
    type?: 'text' | 'textarea' | 'image';
    aspectRatio?: 'square' | 'video' | 'wide' | 'any';
    hint?: string;
    onChange: (v: string) => void;
}) {
    const isModified = value !== defaultValue;

    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex-1">
                    {label}
                </label>
                {isModified && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
                        Modifié
                    </span>
                )}
                {isModified && (
                    <button
                        onClick={() => onChange(defaultValue)}
                        className="text-[9px] text-zinc-600 hover:text-zinc-400 transition-colors"
                        title="Réinitialiser à la valeur par défaut"
                    >
                        <RefreshCw className="w-3 h-3" />
                    </button>
                )}
            </div>

            {type === 'image' ? (
                <ImageUpload
                    value={value || defaultValue}
                    onChange={(url) => onChange(url || '')}
                    aspectRatio={aspectRatio as any}
                />
            ) : multiline ? (
                <textarea
                    rows={3}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={defaultValue}
                    className={`w-full bg-zinc-800/80 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none leading-relaxed ${isModified
                        ? 'border-amber-500/30 focus:border-amber-500/60'
                        : 'border-white/[0.06] focus:border-white/20'
                        }`}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={hint || defaultValue}
                    className={`w-full bg-zinc-800/80 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${isModified
                        ? 'border-amber-500/30 focus:border-amber-500/60'
                        : 'border-white/[0.06] focus:border-white/20'
                        }`}
                />
            )}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminContentTab() {
    const { currentShop, fetchShop } = useShopStore();

    const [activePage, setActivePage] = useState<PageKey>('home');
    const [content, setContent] = useState<ShopContent>(DEFAULT_SHOP_CONTENT);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [showDefaults, setShowDefaults] = useState(false);

    // Load existing content from shop settings
    useEffect(() => {
        if (currentShop?.settings?.content) {
            const saved = currentShop.settings.content as Partial<ShopContent>;
            setContent({
                home: { ...DEFAULT_SHOP_CONTENT.home, ...(saved.home ?? {}) },
                about: { ...DEFAULT_SHOP_CONTENT.about, ...(saved.about ?? {}) },
                contact: { ...DEFAULT_SHOP_CONTENT.contact, ...(saved.contact ?? {}) },
                quality: { ...DEFAULT_SHOP_CONTENT.quality, ...(saved.quality ?? {}) },
                catalog: { ...DEFAULT_SHOP_CONTENT.catalog, ...(saved.catalog ?? {}) },
            });
        }
    }, [currentShop]);

    const updateField = (page: PageKey, key: string, value: string) => {
        setContent((prev) => ({
            ...prev,
            [page]: {
                ...prev[page],
                [key]: value,
            },
        }));
        setHasChanges(true);
    };

    const resetPage = (page: PageKey) => {
        if (!confirm(`Réinitialiser tous les textes de la page "${PAGE_FIELDS[page].label}" ?`)) return;
        setContent((prev) => ({
            ...prev,
            [page]: { ...DEFAULT_SHOP_CONTENT[page] },
        }));
        setHasChanges(true);
    };

    const resetAll = () => {
        if (!confirm('Réinitialiser TOUS les textes aux valeurs par défaut ?')) return;
        setContent(DEFAULT_SHOP_CONTENT);
        setHasChanges(true);
    };

    const handleSave = async () => {
        if (!currentShop) return;
        setIsSaving(true);
        setSaveSuccess(false);

        try {
            const newSettings = {
                ...currentShop.settings,
                content,
            };

            const { error } = await supabase
                .from('shops')
                .update({ settings: newSettings })
                .eq('id', currentShop.id);

            if (error) throw error;

            await fetchShop(currentShop.id);
            setSaveSuccess(true);
            setHasChanges(false);
            setTimeout(() => setSaveSuccess(false), 3500);
        } catch (err) {
            console.error('Error saving content:', err);
            alert('Erreur lors de la sauvegarde des textes.');
        } finally {
            setIsSaving(false);
        }
    };

    const activePageDef = PAGE_FIELDS[activePage];
    const activeContent = content[activePage] as Record<string, string>;
    const activeDefaults = DEFAULT_SHOP_CONTENT[activePage] as Record<string, string>;

    // Count modified fields per page
    const modifiedCount = (page: PageKey) => {
        const c = content[page] as Record<string, string>;
        const d = DEFAULT_SHOP_CONTENT[page] as Record<string, string>;
        return Object.keys(d).filter((k) => c[k] !== d[k]).length;
    };

    const totalModified = (['home', 'about', 'contact', 'quality', 'catalog'] as PageKey[]).reduce(
        (sum, p) => sum + modifiedCount(p),
        0
    );

    return (
        <div className="space-y-6 pb-32">
            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="text-xl font-black text-white mb-1 flex items-center gap-2">
                        <Type className="w-5 h-5 text-blue-400" />
                        Textes & Contenu des Pages
                    </h2>
                    <p className="text-sm text-zinc-500">
                        Modifiez les titres, sous-titres, boutons et descriptions de toutes les pages de votre boutique.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowDefaults(!showDefaults)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${showDefaults
                            ? 'bg-white/10 border-white/20 text-white'
                            : 'bg-white/[0.03] border-white/[0.08] text-zinc-500 hover:text-zinc-300'
                            }`}
                    >
                        {showDefaults ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        Défauts
                    </button>
                    <button
                        onClick={resetAll}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider border border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-500 transition-all"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Tout réinitialiser
                    </button>
                </div>
            </div>

            {/* ── Stats banner ── */}
            {totalModified > 0 && (
                <div className="flex items-center gap-2.5 bg-amber-500/[0.08] border border-amber-500/20 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-sm text-amber-300">
                        <strong>{totalModified} champ{totalModified > 1 ? 's' : ''}</strong> modifié{totalModified > 1 ? 's' : ''} par rapport aux textes par défaut.
                    </span>
                </div>
            )}

            {/* ── Save bar (sticky) ── */}
            <AnimatePresence>
                {hasChanges && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="sticky top-4 z-40 flex items-center justify-between bg-zinc-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(59,130,246,0.1)]"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-sm font-black text-white">Modifications non sauvegardées</span>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-500 hover:bg-blue-400 text-white transition-all disabled:opacity-60"
                        >
                            {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                            {isSaving ? 'Enregistrement...' : saveSuccess ? 'Sauvegardé !' : 'Sauvegarder'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Page tabs ── */}
            <div className="flex flex-wrap gap-2">
                {(Object.keys(PAGE_FIELDS) as PageKey[]).map((page) => {
                    const def = PAGE_FIELDS[page];
                    const Icon = def.icon;
                    const count = modifiedCount(page);
                    const isActive = activePage === page;

                    return (
                        <button
                            key={page}
                            onClick={() => setActivePage(page)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all relative ${isActive
                                ? 'bg-white/10 text-white border border-white/20'
                                : 'text-zinc-500 hover:text-zinc-300 border border-transparent hover:bg-white/[0.04]'
                                }`}
                        >
                            <span>{def.emoji}</span>
                            <Icon className="w-3.5 h-3.5" />
                            {def.label}
                            {count > 0 && (
                                <span className="ml-1 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/20">
                                    {count}
                                </span>
                            )}
                            {isActive && (
                                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ── Fields for active page ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activePage}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="bg-zinc-900/60 border border-white/[0.07] rounded-2xl p-6 space-y-5"
                >
                    {/* Page header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xl">
                                {activePageDef.emoji}
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                    Page : {activePageDef.label}
                                </h3>
                                <p className="text-xs text-zinc-500">{activePageDef.desc}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => resetPage(activePage)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-red-400 border border-transparent hover:border-red-500/20 hover:bg-red-500/[0.05] transition-all"
                        >
                            <RefreshCw className="w-3 h-3" />
                            Réinitialiser page
                        </button>
                    </div>

                    <div className="border-t border-white/[0.05]" />

                    {/* Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activePageDef.fields.map(({ key, label, hint, multiline, type, aspectRatio }) => (
                            <div key={key} className={multiline || type === 'image' ? 'md:col-span-2' : ''}>
                                <ContentField
                                    label={label}
                                    value={activeContent[key] ?? activeDefaults[key]}
                                    defaultValue={activeDefaults[key]}
                                    multiline={multiline}
                                    type={type as any}
                                    aspectRatio={aspectRatio as any}
                                    hint={hint}
                                    onChange={(v) => updateField(activePage, key, v)}
                                />
                                {showDefaults && (
                                    <p className="mt-1 text-[10px] text-zinc-600 italic pl-1">
                                        Défaut : « {activeDefaults[key]} »
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ── Save button ── */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-black text-white bg-blue-600 hover:bg-blue-500 transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
                >
                    {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Enregistrement…' : saveSuccess ? 'Textes sauvegardés !' : 'Sauvegarder les textes'}
                </button>
                {saveSuccess && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-bold text-blue-400"
                    >
                        ✓ Appliqué sur toutes les pages
                    </motion.span>
                )}
            </div>
        </div>
    );
}
