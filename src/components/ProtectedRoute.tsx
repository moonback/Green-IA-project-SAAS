import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useShopStore } from '../store/shopStore';

export default function ProtectedRoute() {
  const { user, profile, isLoading: isAuthLoading } = useAuthStore();
  const { currentShop, isLoading: isShopLoading } = useShopStore();
  const { shopSlug } = useParams<{ shopSlug: string }>();

  if (isAuthLoading || isShopLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-zinc-800 border-t-green-500 rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-green-500/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        <p className="text-sm font-bold text-white uppercase tracking-widest animate-pulse">Vérification des accès</p>
      </div>
    );
  }

  // Vérifier si l'utilisateur est inscrit à cette boutique spécifique dans le cas d'une route boutique
  const isShopRoute = !!shopSlug;
  const isOwner = currentShop && user && currentShop.owner_id === user.id;
  const isRegisteredToShop = !isShopRoute || isOwner || (profile?.current_shop_id === currentShop?.id);

  if (!user || !isRegisteredToShop) {
    const loginPath = shopSlug ? `/${shopSlug}/connexion` : '/connexion';
    return <Navigate to={loginPath} replace />;
  }

  return <Outlet />;
}
