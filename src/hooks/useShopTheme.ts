import { useEffect } from 'react';
import { applyThemeCSSVars } from '../components/admin/AdminThemeTab';

export function useShopTheme(currentShop: any) {
    useEffect(() => {
        if (currentShop?.settings?.theme) {
            applyThemeCSSVars(currentShop.settings.theme);
            // Inject Google Font dynamically
            const fontFamily = currentShop.settings.theme.font_family;
            if (fontFamily) {
                const id = `gf-${fontFamily.replace(/\s+/g, '-')}`;
                if (!document.getElementById(id)) {
                    const link = document.createElement('link');
                    link.id = id;
                    link.rel = 'stylesheet';
                    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800;900&display=swap`;
                    document.head.appendChild(link);
                }
            }
        } else if (currentShop?.settings?.primary_color) {
            // Legacy: only primary_color
            document.documentElement.style.setProperty('--shop-primary', currentShop.settings.primary_color);
        }
    }, [currentShop]);
}
