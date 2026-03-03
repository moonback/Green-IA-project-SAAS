import { useParams } from 'react-router-dom';

/**
 * useShopPath — Hook utilitaire pour construire des chemins relatifs au shop actuel.
 * 
 * @example
 * const shopPath = useShopPath();
 * <Link to={shopPath('/catalogue')}>  // → "/ma-boutique/catalogue"
 * <Link to={shopPath('/admin')}>      // → "/ma-boutique/admin"
 */
export function useShopPath() {
    const { shopSlug } = useParams<{ shopSlug: string }>();

    return (path: string = '') => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        if (!shopSlug) return cleanPath;
        return `/${shopSlug}${cleanPath}`;
    };
}
