import { useState, useEffect } from 'react';
import { motion, Reorder } from 'motion/react';
import {
    Layout,
    Eye,
    EyeOff,
    GripVertical,
    Save,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Plus,
    Trash2,
    Home,
    Info,
    ShieldCheck,
    Phone,
    HelpCircle,
    Package
} from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { supabase } from '../../lib/supabase';
import { DEFAULT_HOME_LAYOUT, DEFAULT_ABOUT_LAYOUT, DEFAULT_QUALITY_LAYOUT, PageSection } from '../../hooks/useShopLayout';

type PageKey = 'home' | 'about' | 'quality';

export default function AdminLayoutTab() {
    const { currentShop, setShop } = useShopStore();
    const [activePage, setActivePage] = useState<PageKey>('home');
    const [sections, setSections] = useState<PageSection[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getDefaults = (page: PageKey) => {
        if (page === 'home') return DEFAULT_HOME_LAYOUT;
        if (page === 'about') return DEFAULT_ABOUT_LAYOUT;
        if (page === 'quality') return DEFAULT_QUALITY_LAYOUT;
        return [];
    };

    useEffect(() => {
        if (currentShop?.settings?.layout?.[activePage]?.sections) {
            setSections(currentShop.settings.layout[activePage].sections);
        } else {
            setSections(getDefaults(activePage));
        }
    }, [currentShop, activePage]);

    const handleSave = async () => {
        if (!currentShop) return;
        setIsSaving(true);
        setError(null);

        try {
            const newSettings = {
                ...currentShop.settings,
                layout: {
                    ...currentShop.settings?.layout,
                    [activePage]: {
                        ...currentShop.settings?.layout?.[activePage],
                        sections
                    }
                }
            };

            const { error: updateError } = await supabase
                .from('shops')
                .update({ settings: newSettings })
                .eq('id', currentShop.id);

            if (updateError) throw updateError;

            setShop({ ...currentShop, settings: newSettings });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error('Error saving layout:', err);
            setError('Erreur lors de l\'enregistrement de la mise en page');
        } finally {
            setIsSaving(false);
        }
    };

    const toggleSection = (id: string) => {
        setSections(prev => prev.map(s =>
            s.id === id ? { ...s, enabled: !s.enabled } : s
        ));
    };

    const removeSection = (id: string) => {
        setSections(prev => prev.filter(s => s.id !== id));
    };

    const addSection = (type: string) => {
        const id = `${type}-${Date.now()}`;
        const newSection: PageSection = {
            id,
            type,
            enabled: true
        };
        setSections(prev => [...prev, newSection]);
    };

    const sectionLabels: Record<string, string> = {
        hero: 'Bannière principale (Hero)',
        categories: 'Grille des catégories',
        featured_products: 'Produits vedettes',
        ai_promo: 'Promotion BudTender IA',
        values: 'Valeurs & Engagement',
        visit_cta: 'Appel à l\'action (Contact/Visite)',
        pillars: 'Piliers techniques',
        isolation: 'Isolation des données (Focus)',
        ai_excellence: 'Excellence IA (Focus)',
        trust_banner: 'Bannière de confiance'
    };

    const availableSectionsByPage: Record<PageKey, { type: string; label: string }[]> = {
        home: [
            { type: 'hero', label: 'Bannière d\'accueil' },
            { type: 'categories', label: 'Liste des catégories' },
            { type: 'featured_products', label: 'Produits en avant' },
            { type: 'ai_promo', label: 'Promo Assistant IA' }
        ],
        about: [
            { type: 'hero', label: 'Bannière À Propos' },
            { type: 'values', label: 'Nos Valeurs' },
            { type: 'visit_cta', label: 'Bloc Contact/Visite' }
        ],
        quality: [
            { type: 'hero', label: 'Bannière Qualité' },
            { type: 'pillars', label: 'Piliers Techniques' },
            { type: 'isolation', label: 'Isolation Données' },
            { type: 'ai_excellence', label: 'Excellence IA' },
            { type: 'trust_banner', label: 'Bannière Confiance' }
        ]
    };

    const pages = [
        { key: 'home', label: 'Accueil', icon: Home },
        { key: 'about', label: 'À Propos', icon: Info },
        { key: 'quality', label: 'Qualité', icon: ShieldCheck }
    ];

    if (!currentShop) return null;

    const hasChanges = JSON.stringify(sections) !== JSON.stringify(currentShop.settings?.layout?.[activePage]?.sections || getDefaults(activePage));

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-400 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                            <Layout className="w-3 h-3 text-green-neon" />
                            Layout
                        </span>
                    </div>
                    <h2 className="text-3xl font-black text-white italic">Structure des <span className="text-green-neon">Pages</span></h2>
                    <p className="text-zinc-500 max-w-xl">Configurez l'ordre des sections et la visibilité des blocs pour optimiser l'expérience client.</p>
                </div>

                <div className="flex items-center gap-3">
                    {hasChanges && (
                        <button
                            onClick={() => setSections(currentShop.settings?.layout?.[activePage]?.sections || getDefaults(activePage))}
                            className="px-4 py-2 rounded-xl text-sm font-bold text-zinc-400 hover:text-white transition-colors"
                        >
                            Annuler
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isSaving || !hasChanges}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-neon text-black font-black hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)]"
                    >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </div>
            </div>

            {/* Page Selector */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-900/50 border border-white/5 w-fit">
                {pages.map((p) => {
                    const Icon = p.icon;
                    return (
                        <button
                            key={p.key}
                            onClick={() => setActivePage(p.key as PageKey)}
                            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl transition-all ${activePage === p.key
                                    ? 'bg-green-neon text-black font-black shadow-lg shadow-green-neon/40 border border-green-neon/50'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${activePage === p.key ? 'text-black' : 'text-zinc-500'}`} />
                            <span className="text-sm font-bold tracking-tight">{p.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* List */}
            <div className="max-w-3xl">
                <div className="mb-4 flex items-center justify-between px-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Ordre des sections</span>
                    <span className="text-[10px] font-bold text-zinc-500 italic">Glissez pour réorganiser</span>
                </div>

                <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-3">
                    {sections.map((section) => (
                        <Reorder.Item
                            key={section.id}
                            value={section}
                            className={`group flex items-center gap-4 p-5 rounded-[2rem] border transition-all ${section.enabled
                                    ? 'bg-zinc-900/50 border-white/[0.05] hover:border-white/10 shadow-xl'
                                    : 'bg-zinc-950 border-dashed border-white/5 opacity-40 grayscale'
                                }`}
                        >
                            <div className="cursor-grab active:cursor-grabbing text-zinc-700 group-hover:text-green-neon/50 transition-colors">
                                <GripVertical className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className={`font-black uppercase tracking-wider transition-colors ${section.enabled ? 'text-white' : 'text-zinc-600'}`}>
                                    {sectionLabels[section.type] || section.type}
                                </h4>
                                <p className="text-[10px] text-zinc-500 font-mono tracking-tighter opacity-50">Type: {section.type}</p>
                            </div>

                            <div className="flex items-center gap-1 border-l border-white/5 pl-4">
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className={`p-2.5 rounded-xl transition-all ${section.enabled
                                            ? 'text-green-neon hover:bg-green-neon/10'
                                            : 'text-zinc-600 hover:bg-white/5'
                                        }`}
                                    title={section.enabled ? 'Désactiver' : 'Activer'}
                                >
                                    {section.enabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={() => removeSection(section.id)}
                                    className="p-2.5 rounded-xl text-zinc-700 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                {/* Add Section */}
                <div className="mt-10 p-8 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-neon/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h5 className="text-[10px] font-black text-zinc-500 mb-6 flex items-center gap-2 uppercase tracking-[0.3em]">
                        <Plus className="w-3 h-3 text-green-neon" />
                        Ajouter un nouveau composant sur la page
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {availableSectionsByPage[activePage].map((as) => (
                            <button
                                key={as.type}
                                onClick={() => addSection(as.type)}
                                className="group/btn relative px-4 py-4 rounded-2xl bg-zinc-900 border border-white/[0.05] hover:border-green-neon/50 transition-all text-center overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-green-neon/[0.02] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <span className="relative z-10 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover/btn:text-green-neon transition-colors">
                                    {as.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showSuccess ? 1 : 0, y: showSuccess ? 0 : 20 }}
                    className="flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-zinc-900 border border-green-500/20 text-green-neon shadow-2xl backdrop-blur-xl"
                >
                    <div className="w-8 h-8 rounded-full bg-green-neon/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-black uppercase tracking-widest text-[10px]">Success</p>
                        <p className="text-sm font-bold text-white">Mise en page enregistrée avec succès</p>
                    </div>
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-zinc-900 border border-red-500/20 text-red-500 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-black uppercase tracking-widest text-[10px]">Erreur</p>
                            <p className="text-sm font-bold text-white">{error}</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
