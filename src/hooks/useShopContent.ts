/**
 * useShopContent — Hook CMS simplifié
 * Retourne les textes éditables de la boutique depuis shops.settings.content,
 * avec fallback automatique sur les valeurs par défaut si non défini.
 */
import { useMemo } from 'react';
import { useShopStore } from '../store/shopStore';

// ─── Type : structure de tout le contenu éditable ────────────────────────────

export interface ShopContent {
    // Page Vitrine (ShopHome)
    home: {
        badge: string;            // ex: "Boutique CBD"
        hero_subtitle: string;    // sous-titre hero
        cta_primary: string;      // bouton principal
        cta_secondary: string;    // bouton secondaire
        section_categories_title: string;
        section_categories_subtitle: string;
        section_featured_title: string;
        section_featured_subtitle: string;
        section_ai_title: string;
        section_ai_subtitle: string;
        section_ai_cta: string;
    };

    // Page Notre Boutique (ShopAbout)
    about: {
        badge: string;            // ex: "Notre ADN"
        hero_title_line1: string; // "L'EXPÉRIENCE"
        hero_subtitle: string;
        section_values_title: string;
        section_values_subtitle: string;
        cta_title: string;        // "VENEZ NOUS RENDRE VISITE"
        value_1_title: string;
        value_1_desc: string;
        value_2_title: string;
        value_2_desc: string;
        value_3_title: string;
        value_3_desc: string;
        value_4_title: string;
        value_4_desc: string;
        cta_primary: string;
        cta_secondary: string;
        hero_image: string;
    };

    // Page Contact (ShopContact)
    contact: {
        badge: string;
        hero_title_line1: string; // "PARLONS"
        hero_title_line2: string; // "ENSEMBLE."
        hero_subtitle: string;
        form_title: string;
        form_subtitle: string;
        budtender_box_title: string;
        budtender_box_desc: string;
        send_button: string;
        success_title: string;
        success_desc: string;
        hero_image: string;
    };

    quality: {
        badge: string;
        hero_title_line1: string;
        hero_title_line2: string;
        hero_subtitle: string;
        pillar_1_title: string;
        pillar_1_desc: string;
        pillar_2_title: string;
        pillar_2_desc: string;
        pillar_3_title: string;
        pillar_3_desc: string;
        pillar_4_title: string;
        pillar_4_desc: string;
        data_isolation_title: string;
        data_isolation_desc: string;
        ai_excellence_title: string;
        ai_excellence_desc: string;
        trust_banner_title: string;
        trust_banner_desc: string;
        deep_dive_image: string;
    };

    // Page Catalogue (Catalog)
    catalog: {
        badge: string;
        hero_title_line1: string;
        hero_title_line2: string;
        hero_subtitle: string;
        section_ai_badge: string;
        section_ai_title_line1: string;
        section_ai_title_line2: string;
        section_ai_subtitle: string;
        section_ai_cta: string;
        hero_image: string;
    };
}

// ─── Valeurs par défaut ───────────────────────────────────────────────────────

export const DEFAULT_SHOP_CONTENT: ShopContent = {
    home: {
        badge: 'Boutique CBD',
        hero_subtitle: 'Votre destination premium pour des produits CBD de qualité supérieure. Conseils personnalisés et sélection rigoureuse.',
        cta_primary: 'Voir le Catalogue',
        cta_secondary: 'Notre Histoire',
        section_categories_title: 'Nos Catégories',
        section_categories_subtitle: 'Explorez notre sélection par univers',
        section_featured_title: 'Sélection du moment',
        section_featured_subtitle: 'Les produits phares choisis par notre équipe',
        section_ai_title: 'Votre conseiller IA personnel',
        section_ai_subtitle: 'Notre BudTender intelligent vous guide vers les produits parfaits selon vos besoins, votre expérience et vos préférences.',
        section_ai_cta: 'Cliquez sur le widget en bas à droite pour commencer ✦',
    },

    about: {
        badge: 'Notre ADN',
        hero_title_line1: "L'EXPÉRIENCE",
        hero_subtitle: "Plus qu'un point de vente, un espace dédié à la sérénité et à l'excellence naturelle.",
        section_values_title: 'Nos Piliers',
        section_values_subtitle: 'Les valeurs qui définissent chaque décision',
        cta_title: 'VENEZ NOUS RENDRE VISITE.',
        value_1_title: 'Transparence',
        value_1_desc: "Nous publions les certificats d'analyse de chaque lot pour garantir pureté et conformité.",
        value_2_title: 'Exigence',
        value_2_desc: 'Une sélection drastique des producteurs européens les plus qualifiés.',
        value_3_title: 'Accompagnement',
        value_3_desc: 'Nos conseillers sont formés pour vous guider vers la routine adaptée à vos besoins.',
        value_4_title: 'Éthique',
        value_4_desc: 'Des cultures 100% organiques, sans pesticides ni agents chimiques.',
        cta_primary: 'Nous contacter',
        cta_secondary: 'Voir le catalogue',
        hero_image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=2070',
    },

    contact: {
        badge: 'Nous Contacter',
        hero_title_line1: 'PARLONS',
        hero_title_line2: 'ENSEMBLE.',
        hero_subtitle: 'Une question sur un produit, un conseil personnalisé ou une suggestion ? Notre équipe est à votre écoute.',
        form_title: 'Envoyez-nous un message',
        form_subtitle: 'Nous vous répondrons dans les meilleurs délais.',
        budtender_box_title: 'Besoin de conseils ?',
        budtender_box_desc: 'Notre BudTender IA est disponible 24/7 pour répondre à toutes vos questions sur nos produits.',
        send_button: 'ENVOYER LE MESSAGE',
        success_title: 'Message envoyé !',
        success_desc: 'Merci, nous reviendrons vers vous rapidement.',
        hero_image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=2070',
    },

    quality: {
        badge: 'Qualité & Sécurité',
        hero_title_line1: 'LA QUALITÉ QUI',
        hero_title_line2: 'RASSURE VOS CLIENTS.',
        hero_subtitle: "Avec Green IA, vous profitez d'un outil fiable, simple à utiliser, et adapté aux besoins réels des boutiques CBD.",
        pillar_1_title: 'Isolation Multi-Tenant',
        pillar_1_desc: 'Chaque boutique garde ses données séparées. Vos informations restent privées et protégées.',
        pillar_2_title: 'IA BudTender certifiée',
        pillar_2_desc: 'Nos modèles sont entraînés sur des milliers de références botaniques et pharmacologiques pour un conseil ultra-précis.',
        pillar_3_title: 'Infrastructure Global Cloud',
        pillar_3_desc: 'Une plateforme rapide et stable, disponible quand vous en avez besoin pour vendre sans interruption.',
        pillar_4_title: 'Sécurité & RGPD',
        pillar_4_desc: 'Des règles de sécurité solides pour travailler sereinement avec votre équipe et vos clients.',
        data_isolation_title: 'Isolation des Données Zéro Compromis.',
        data_isolation_desc: "Chaque tenant (boutique) est encapsulé dans son propre environnement logique au niveau de la base de données PostgreSQL. Nos règles de sécurité empêchent toute confusion entre boutiques : vos ventes et vos clients restent bien séparés.",
        ai_excellence_title: "Un outil pensé pour les commerçants CBD.",
        ai_excellence_desc: "Notre BudTender n'est pas un simple script. C'est un moteur sémantique qui comprend l'intention du client. En analysant les retours clients et les stocks en temps réel, il adapte son discours pour maximiser la satisfaction et la récurrence.",
        trust_banner_title: 'Performance sans Temps Mort',
        trust_banner_desc: "Optimisé pour la vitesse mobile et les terminaux de vente légers. Votre boutique charge en moins d'une seconde, n'importe où, n'importe quand.",
        deep_dive_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3d58b?auto=format&fit=crop&q=80&w=2070',
    },

    catalog: {
        badge: "L'Innovation N10 est ici",
        hero_title_line1: 'ARCHIVES',
        hero_title_line2: 'MOLECULE',
        hero_subtitle: 'Explorez une curatoriale sans compromis des extractions les plus pures et des molécules de synthèse maîtrisée.',
        hero_image: 'https://images.unsplash.com/photo-1516528387618-afa90b13e000?auto=format&fit=crop&q=80&w=2070',
        section_ai_badge: 'BudTender IA Connecté',
        section_ai_title_line1: 'TROUVEZ VOTRE',
        section_ai_title_line2: 'FRÉQUENCE.',
        section_ai_subtitle: "Laissez notre technologie d'analyse vous guider vers le produit parfaitement calibré pour vos besoins.",
        section_ai_cta: 'Lancer le Diagnostic',
    },
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useShopContent(): ShopContent {
    const { currentShop } = useShopStore();

    return useMemo(() => {
        const savedContent = currentShop?.settings?.content as Partial<ShopContent> | undefined;
        if (!savedContent) return DEFAULT_SHOP_CONTENT;

        // Deep merge : les valeurs sauvegardées écrasent les défauts page par page
        return {
            home: { ...DEFAULT_SHOP_CONTENT.home, ...(savedContent.home ?? {}) },
            about: { ...DEFAULT_SHOP_CONTENT.about, ...(savedContent.about ?? {}) },
            contact: { ...DEFAULT_SHOP_CONTENT.contact, ...(savedContent.contact ?? {}) },
            quality: { ...DEFAULT_SHOP_CONTENT.quality, ...(savedContent.quality ?? {}) },
            catalog: { ...DEFAULT_SHOP_CONTENT.catalog, ...(savedContent.catalog ?? {}) },
        };
    }, [currentShop]);
}
