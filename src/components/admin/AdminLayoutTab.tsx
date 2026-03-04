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
    Package,
    Mail,
    MessageSquare,
    Instagram,
    ListChecks,
    Users,
    Star,
    Settings,
    X,
    ChevronRight,
    Type,
    Image as ImageIcon,
    Megaphone,
    Zap,
    Globe
} from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { supabase } from '../../lib/supabase';
import ImageUpload from './ImageUpload';
import { DEFAULT_HOME_LAYOUT, DEFAULT_ABOUT_LAYOUT, DEFAULT_QUALITY_LAYOUT, PageSection } from '../../hooks/useShopLayout';

type PageKey = 'home' | 'about' | 'quality' | 'global';

export default function AdminLayoutTab() {
    const { currentShop, setShop } = useShopStore();
    const [activePage, setActivePage] = useState<PageKey>('home');
    const [sections, setSections] = useState<PageSection[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingSection, setEditingSection] = useState<PageSection | null>(null);

    const getDefaults = (page: PageKey) => {
        if (page === 'home') return DEFAULT_HOME_LAYOUT;
        if (page === 'about') return DEFAULT_ABOUT_LAYOUT;
        if (page === 'quality') return DEFAULT_QUALITY_LAYOUT;
        if (page === 'global') return [];
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
            enabled: true,
            settings: {}
        };
        setSections(prev => [...prev, newSection]);
    };

    const updateSection = (id: string, updates: Partial<PageSection>) => {
        setSections(prev => prev.map(s =>
            s.id === id ? { ...s, ...updates } : s
        ));
        if (editingSection?.id === id) {
            setEditingSection(prev => prev ? { ...prev, ...updates } : null);
        }
    };

    const sectionLabels: Record<string, string> = {
        // Core sections
        hero: 'Bannière principale (Hero)',
        categories: 'Grille des catégories',
        featured_products: 'Produits vedettes',
        ai_promo: 'Promotion BudTender IA',
        values: 'Valeurs & Engagement',
        visit_cta: 'Appel à l\'action (Contact/Visite)',
        pillars: 'Piliers techniques',
        isolation: 'Isolation des données',
        ai_excellence: 'Excellence IA',
        trust_banner: 'Bannière de confiance',

        // Generic shared sections
        newsletter: 'Newsletter Premium',
        testimonials: 'Avis Clients',
        faq: 'Questions Fréquentes (FAQ)',
        features_grid: 'Grille Points Forts',
        instagram_feed: 'Flux Instagram',
        announcement: 'Bannière d\'annonce',
        trust_badges: 'Badges de confiance',
        quick_contact: 'Contact Rapide',
        reassurance: 'Bannière Réassurance'
    };

    const genericSections = [
        { type: 'newsletter', label: 'Newsletter', icon: Mail },
        { type: 'testimonials', label: 'Avis Clients', icon: MessageSquare },
        { type: 'faq', label: 'FAQ', icon: HelpCircle },
        { type: 'features_grid', label: 'Points Forts', icon: ListChecks },
        { type: 'instagram_feed', label: 'Flux Instagram', icon: Instagram },
        { type: 'announcement', label: 'Annonce', icon: Megaphone },
        { type: 'trust_badges', label: 'Confiance', icon: ShieldCheck },
        { type: 'quick_contact', label: 'Contact', icon: Phone },
        { type: 'reassurance', label: 'Zen / Réassurance', icon: Zap }
    ];

    const specificSectionsByPage: Record<PageKey, { type: string; label: string; icon: any }[]> = {
        home: [
            { type: 'hero', label: 'Bannière d\'accueil', icon: Home },
            { type: 'categories', label: 'Liste des catégories', icon: HelpCircle },
            { type: 'featured_products', label: 'Produits en avant', icon: Package },
            { type: 'ai_promo', label: 'Promo Assistant IA', icon: HelpCircle }
        ],
        about: [
            { type: 'hero', label: 'Bannière À Propos', icon: Info },
            { type: 'values', label: 'Nos Valeurs', icon: ShieldCheck },
            { type: 'visit_cta', label: 'Bloc Contact/Visite', icon: Phone }
        ],
        quality: [
            { type: 'hero', label: 'Bannière Qualité', icon: ShieldCheck },
            { type: 'pillars', label: 'Piliers Techniques', icon: ShieldCheck },
            { type: 'isolation', label: 'Isolation Données', icon: ShieldCheck },
            { type: 'ai_excellence', label: 'Excellence IA', icon: ShieldCheck },
            { type: 'trust_banner', label: 'Bannière Confiance', icon: ShieldCheck }
        ],
        global: []
    };

    const pages = [
        { key: 'home', label: 'Accueil', icon: Home },
        { key: 'about', label: 'À Propos', icon: Info },
        { key: 'quality', label: 'Qualité', icon: ShieldCheck },
        { key: 'global', label: 'Partout (Global)', icon: Globe }
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
                            Structure
                        </span>
                    </div>
                    <h2 className="text-3xl font-black text-white italic">Design du <span className="text-green-neon">Shop</span></h2>
                    <p className="text-zinc-500 max-w-xl">Organisez vos pages en ajoutant des composants pré-conçus.</p>
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
                                    onClick={() => setEditingSection(section)}
                                    className={`p-2.5 rounded-xl transition-all ${section.enabled ? 'text-zinc-400 hover:text-white hover:bg-white/5' : 'text-zinc-800 cursor-not-allowed'
                                        }`}
                                    disabled={!section.enabled}
                                    title="Paramètres"
                                >
                                    <Settings className="w-5 h-5" />
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

                {/* Specific Add Section */}
                <div className="mt-10 p-8 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01] relative overflow-hidden group">
                    <h5 className="text-[10px] font-black text-zinc-500 mb-6 flex items-center gap-2 uppercase tracking-[0.3em]">
                        <Plus className="w-3 h-3 text-green-neon" />
                        Composants spécifiques à cette page
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {specificSectionsByPage[activePage].map((as) => (
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

                {/* Generic Add Section */}
                <div className="mt-6 p-8 rounded-[3rem] border border-zinc-800 bg-black relative overflow-hidden group">
                    <h5 className="text-[10px] font-black text-zinc-400 mb-6 flex items-center gap-2 uppercase tracking-[0.3em]">
                        <Star className="w-3 h-3 text-yellow-500" />
                        Composants universels (S'ajoutent partout)
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {genericSections.map((gs) => {
                            const Icon = gs.icon;
                            return (
                                <button
                                    key={gs.type}
                                    onClick={() => addSection(gs.type)}
                                    className="group/btn flex flex-col items-center gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-white/[0.02] hover:border-green-neon transition-all"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/btn:bg-green-neon/10 transition-colors">
                                        <Icon className="w-5 h-5 text-zinc-500 group-hover/btn:text-green-neon" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-tighter text-zinc-600 group-hover/btn:text-white transition-colors">
                                        {gs.label}
                                    </span>
                                </button>
                            );
                        })}
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
                        <p className="text-sm font-bold text-white">Structure mise à jour !</p>
                    </div>
                </motion.div>
            </div>

            {/* Editing Modal */}
            {editingSection && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end p-4 md:p-6 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        className="w-full max-w-xl h-full bg-zinc-950 border-l border-white/10 shadow-2xl overflow-hidden flex flex-col rounded-[2.5rem]"
                    >
                        {/* Modal Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-green-neon/10 text-green-neon">
                                    <Settings className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Configuration</h3>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{sectionLabels[editingSection.type] || editingSection.type}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEditingSection(null)}
                                className="p-3 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                            {/* Common Settings - ID Override / Label */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Type className="w-3 h-3" />
                                    Textes de la section
                                </h4>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Titre de la section</label>
                                        <input
                                            type="text"
                                            value={editingSection.settings?.title || ''}
                                            onChange={(e) => updateSection(editingSection.id, {
                                                settings: { ...editingSection.settings, title: e.target.value }
                                            })}
                                            placeholder="Titre personnalisé..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-green-neon transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Sous-titre / Description</label>
                                        <textarea
                                            value={editingSection.settings?.subtitle || ''}
                                            onChange={(e) => updateSection(editingSection.id, {
                                                settings: { ...editingSection.settings, subtitle: e.target.value }
                                            })}
                                            placeholder="Description courte..."
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-green-neon transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section Specific: Hero / Banner */}
                            {(editingSection.type === 'hero' || editingSection.type === 'trust_banner') && (
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <ImageIcon className="w-3 h-3" />
                                        Visuels & Media
                                    </h4>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Image de fond</label>
                                        <ImageUpload
                                            value={editingSection.settings?.image_url || ''}
                                            onChange={(url) => updateSection(editingSection.id, {
                                                settings: { ...editingSection.settings, image_url: url }
                                            })}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Section Specific: Newsletter */}
                            {editingSection.type === 'newsletter' && (
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Mail className="w-3 h-3" />
                                        Configuration Newsletter
                                    </h4>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Texte du bouton</label>
                                        <input
                                            type="text"
                                            value={editingSection.settings?.cta_text || "S'inscrire"}
                                            onChange={(e) => updateSection(editingSection.id, {
                                                settings: { ...editingSection.settings, cta_text: e.target.value }
                                            })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-green-neon transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Section Specific: Instagram */}
                            {editingSection.type === 'instagram_feed' && (
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Instagram className="w-3 h-3" />
                                        Réseaux Sociaux
                                    </h4>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Nom d'utilisateur Instagram</label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">@</span>
                                            <input
                                                type="text"
                                                value={editingSection.settings?.username || ''}
                                                onChange={(e) => updateSection(editingSection.id, {
                                                    settings: { ...editingSection.settings, username: e.target.value }
                                                })}
                                                placeholder="votre_boutique"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-5 py-4 text-white focus:outline-none focus:border-green-neon transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section Specific: FAQ Repeater */}
                            {editingSection.type === 'faq' && (
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Plus className="w-3 h-3" />
                                        Questions / Réponses
                                    </h4>
                                    <div className="space-y-3">
                                        {(editingSection.settings?.faqs || [
                                            { q: "Quels sont vos délais ?", a: "Nous livrons en 48h." },
                                            { q: "Vos produits sont-ils bio ?", a: "Oui, 100% naturels." }
                                        ]).map((faq: any, idx: number) => (
                                            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 relative group">
                                                <button
                                                    onClick={() => {
                                                        const newFaqs = [...(editingSection.settings?.faqs || [])];
                                                        newFaqs.splice(idx, 1);
                                                        updateSection(editingSection.id, { settings: { ...editingSection.settings, faqs: newFaqs } });
                                                    }}
                                                    className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <input
                                                    type="text"
                                                    value={faq.q}
                                                    onChange={(e) => {
                                                        const currentFaqs = editingSection.settings?.faqs || [
                                                            { q: "Quels sont vos délais ?", a: "Nous livrons en 48h." },
                                                            { q: "Vos produits sont-ils bio ?", a: "Oui, 100% naturels." }
                                                        ];
                                                        const newFaqs = [...currentFaqs];
                                                        newFaqs[idx] = { ...newFaqs[idx], q: e.target.value };
                                                        updateSection(editingSection.id, { settings: { ...editingSection.settings, faqs: newFaqs } });
                                                    }}
                                                    placeholder="La question..."
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-neon/30"
                                                />
                                                <textarea
                                                    value={faq.a}
                                                    onChange={(e) => {
                                                        const currentFaqs = editingSection.settings?.faqs || [
                                                            { q: "Quels sont vos délais ?", a: "Nous livrons en 48h." },
                                                            { q: "Vos produits sont-ils bio ?", a: "Oui, 100% naturels." }
                                                        ];
                                                        const newFaqs = [...currentFaqs];
                                                        newFaqs[idx] = { ...newFaqs[idx], a: e.target.value };
                                                        updateSection(editingSection.id, { settings: { ...editingSection.settings, faqs: newFaqs } });
                                                    }}
                                                    placeholder="La réponse..."
                                                    rows={2}
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-green-neon/30 resize-none"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => {
                                                const currentFaqs = editingSection.settings?.faqs || [
                                                    { q: "Quels sont vos délais ?", a: "Nous livrons en 48h." },
                                                    { q: "Vos produits sont-ils bio ?", a: "Oui, 100% naturels." }
                                                ];
                                                const newFaqs = [...currentFaqs, { q: "", a: "" }];
                                                updateSection(editingSection.id, { settings: { ...editingSection.settings, faqs: newFaqs } });
                                            }}
                                            className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-green-neon hover:border-green-neon/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-3 h-3" />
                                            Ajouter une question
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Section Specific: Testimonials Repeater */}
                            {editingSection.type === 'testimonials' && (
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Plus className="w-3 h-3" />
                                        Liste des Témoignages
                                    </h4>
                                    <div className="space-y-3">
                                        {(editingSection.settings?.testimonials || [
                                            { name: "Marc D.", role: "Client", text: "Super service !" },
                                            { name: "Sophie L.", role: "Fan", text: "Qualité top." }
                                        ]).map((t: any, idx: number) => (
                                            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 relative group">
                                                <button
                                                    onClick={() => {
                                                        const newT = [...(editingSection.settings?.testimonials || [])];
                                                        newT.splice(idx, 1);
                                                        updateSection(editingSection.id, { settings: { ...editingSection.settings, testimonials: newT } });
                                                    }}
                                                    className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        value={t.name}
                                                        onChange={(e) => {
                                                            const currentT = editingSection.settings?.testimonials || [
                                                                { name: "Marc D.", role: "Client", text: "Super service !" },
                                                                { name: "Sophie L.", role: "Fan", text: "Qualité top." }
                                                            ];
                                                            const newT = [...currentT];
                                                            newT[idx] = { ...newT[idx], name: e.target.value };
                                                            updateSection(editingSection.id, { settings: { ...editingSection.settings, testimonials: newT } });
                                                        }}
                                                        placeholder="Nom"
                                                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-neon/30"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={t.role}
                                                        onChange={(e) => {
                                                            const currentT = editingSection.settings?.testimonials || [
                                                                { name: "Marc D.", role: "Client", text: "Super service !" },
                                                                { name: "Sophie L.", role: "Fan", text: "Qualité top." }
                                                            ];
                                                            const newT = [...currentT];
                                                            newT[idx] = { ...newT[idx], role: e.target.value };
                                                            updateSection(editingSection.id, { settings: { ...editingSection.settings, testimonials: newT } });
                                                        }}
                                                        placeholder="Rôle (ex: Client)"
                                                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-neon/30"
                                                    />
                                                </div>
                                                <textarea
                                                    value={t.text}
                                                    onChange={(e) => {
                                                        const currentT = editingSection.settings?.testimonials || [
                                                            { name: "Marc D.", role: "Client", text: "Super service !" },
                                                            { name: "Sophie L.", role: "Fan", text: "Qualité top." }
                                                        ];
                                                        const newT = [...currentT];
                                                        newT[idx] = { ...newT[idx], text: e.target.value };
                                                        updateSection(editingSection.id, { settings: { ...editingSection.settings, testimonials: newT } });
                                                    }}
                                                    placeholder="Témoignage..."
                                                    rows={2}
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-green-neon/30 resize-none"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => {
                                                const currentT = editingSection.settings?.testimonials || [
                                                    { name: "Marc D.", role: "Client", text: "Super service !" },
                                                    { name: "Sophie L.", role: "Fan", text: "Qualité top." }
                                                ];
                                                const newT = [...currentT, { name: "", role: "Client", text: "" }];
                                                updateSection(editingSection.id, { settings: { ...editingSection.settings, testimonials: newT } });
                                            }}
                                            className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-green-neon hover:border-green-neon/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-3 h-3" />
                                            Ajouter un témoignage
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Section Specific: Features Grid Repeater */}
                            {editingSection.type === 'features_grid' && (
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Plus className="w-3 h-3" />
                                        Grille des Points Forts
                                    </h4>
                                    <div className="space-y-3">
                                        {(editingSection.settings?.features || [
                                            { title: "Point Fort 1", desc: "Description..." },
                                            { title: "Point Fort 2", desc: "Description..." }
                                        ]).map((f: any, idx: number) => (
                                            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 relative group">
                                                <button
                                                    onClick={() => {
                                                        const newF = [...(editingSection.settings?.features || [])];
                                                        newF.splice(idx, 1);
                                                        updateSection(editingSection.id, { settings: { ...editingSection.settings, features: newF } });
                                                    }}
                                                    className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <input
                                                    type="text"
                                                    value={f.title}
                                                    onChange={(e) => {
                                                        const currentF = editingSection.settings?.features || [
                                                            { title: "Point Fort 1", desc: "Description..." },
                                                            { title: "Point Fort 2", desc: "Description..." }
                                                        ];
                                                        const newF = [...currentF];
                                                        newF[idx] = { ...newF[idx], title: e.target.value };
                                                        updateSection(editingSection.id, { settings: { ...editingSection.settings, features: newF } });
                                                    }}
                                                    placeholder="Titre de l'avantage"
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-neon/30"
                                                />
                                                <textarea
                                                    value={f.desc}
                                                    onChange={(e) => {
                                                        const currentF = editingSection.settings?.features || [
                                                            { title: "Point Fort 1", desc: "Description..." },
                                                            { title: "Point Fort 2", desc: "Description..." }
                                                        ];
                                                        const newF = [...currentF];
                                                        newF[idx] = { ...newF[idx], desc: e.target.value };
                                                        updateSection(editingSection.id, { settings: { ...editingSection.settings, features: newF } });
                                                    }}
                                                    placeholder="Description courte..."
                                                    rows={2}
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-green-neon/30 resize-none"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => {
                                                const currentF = editingSection.settings?.features || [
                                                    { title: "Point Fort 1", desc: "Description..." },
                                                    { title: "Point Fort 2", desc: "Description..." }
                                                ];
                                                const newF = [...currentF, { title: "", desc: "" }];
                                                updateSection(editingSection.id, { settings: { ...editingSection.settings, features: newF } });
                                            }}
                                            className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-green-neon hover:border-green-neon/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-3 h-3" />
                                            Ajouter un avantage
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                                    Les modifications sont enregistrées localement dans votre mise en page. N'oubliez pas de cliquer sur <span className="text-white font-bold">Enregistrer</span> dans la barre principale pour les appliquer définitivement.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-white/5 bg-zinc-900/30 flex items-center justify-end">
                            <button
                                onClick={() => setEditingSection(null)}
                                className="px-10 py-4 rounded-2xl bg-green-neon text-black font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-neon/20"
                            >
                                Terminer
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
