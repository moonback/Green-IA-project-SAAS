import { useMemo } from 'react';
import { useShopStore } from '../store/shopStore';
import { Shop } from '../lib/types';

export interface PageSection {
    id: string;
    type: string;
    enabled: boolean;
    settings?: any;
}

export const DEFAULT_HOME_LAYOUT: PageSection[] = [
    { id: 'hero-1', type: 'hero', enabled: true },
    { id: 'categories-1', type: 'categories', enabled: true },
    { id: 'featured-1', type: 'featured_products', enabled: true },
    { id: 'ai-promo-1', type: 'ai_promo', enabled: true },
];

export const DEFAULT_ABOUT_LAYOUT: PageSection[] = [
    { id: 'hero-about', type: 'hero', enabled: true },
    { id: 'values-about', type: 'values', enabled: true },
    { id: 'visit-cta-about', type: 'visit_cta', enabled: true },
];

export const DEFAULT_QUALITY_LAYOUT: PageSection[] = [
    { id: 'hero-quality', type: 'hero', enabled: true },
    { id: 'pillars-quality', type: 'pillars', enabled: true },
    { id: 'isolation-quality', type: 'isolation', enabled: true },
    { id: 'ai-excellence-quality', type: 'ai_excellence', enabled: true },
    { id: 'trust-quality', type: 'trust_banner', enabled: true },
];

export function useShopLayout() {
    const { currentShop } = useShopStore() as { currentShop: Shop | null };

    const homeSections = useMemo(() => {
        if (currentShop?.settings?.layout?.home?.sections) {
            return currentShop.settings.layout.home.sections as PageSection[];
        }
        return DEFAULT_HOME_LAYOUT;
    }, [currentShop]);

    const aboutSections = useMemo(() => {
        // @ts-ignore - settings.layout can have about
        if (currentShop?.settings?.layout?.about?.sections) {
            // @ts-ignore
            return currentShop.settings.layout.about.sections as PageSection[];
        }
        return DEFAULT_ABOUT_LAYOUT;
    }, [currentShop]);

    const qualitySections = useMemo(() => {
        // @ts-ignore - settings.layout can have quality
        if (currentShop?.settings?.layout?.quality?.sections) {
            // @ts-ignore
            return currentShop.settings.layout.quality.sections as PageSection[];
        }
        return DEFAULT_QUALITY_LAYOUT;
    }, [currentShop]);

    const globalSections = useMemo(() => {
        // @ts-ignore
        if (currentShop?.settings?.layout?.global?.sections) {
            // @ts-ignore
            return currentShop.settings.layout.global.sections as PageSection[];
        }
        return [];
    }, [currentShop]);

    return {
        homeSections,
        aboutSections,
        qualitySections,
        globalSections
    };
}
