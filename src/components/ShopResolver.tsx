import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useShopStore } from '../store/shopStore';

/**
 * ShopResolver — Résout le shop via le slug dans l'URL.
 * Charge le currentShop dans le store Zustand avant de rendre les routes enfants.
 */
const RESERVED_SLUGS = ['admin', 'pos', '404', 'catalogue', 'qualite', 'contact', 'connexion', 'ouvrir-boutique', 'reset-password', 'mentions-legales', 'compte', 'profil', 'commandes', 'favorites', 'parrainage', 'addresses', 'abonnements', 'fidelite', 'avis'];

export default function ShopResolver() {
    const { shopSlug } = useParams<{ shopSlug: string }>();
    const { currentShop, isLoading, error, fetchShopBySlug } = useShopStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!shopSlug) return;

        // Si le slug est réservé (ex: /compte, /admin) mais qu'il a atterri ici,
        // c'est qu'il n'existe pas de route globale correspondante.
        if (RESERVED_SLUGS.includes(shopSlug)) {
            navigate('/404', { replace: true });
            return;
        }

        if (!currentShop || currentShop.slug !== shopSlug) {
            fetchShopBySlug(shopSlug);
        }
    }, [shopSlug, currentShop, fetchShopBySlug, navigate]);

    // Redirect to 404 if shop not found
    useEffect(() => {
        if (error && !isLoading) {
            navigate('/404', { replace: true });
        }
    }, [error, isLoading, navigate]);

    if (isLoading || !currentShop) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-zinc-800 border-t-green-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-green-500/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>
                <div className="text-center">
                    <p className="text-sm font-bold text-white uppercase tracking-widest">Chargement de la boutique</p>
                    <p className="text-xs text-zinc-600 mt-1">{shopSlug}</p>
                </div>
            </div>
        );
    }

    return <Outlet />;
}
