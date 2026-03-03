import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useShopStore } from '../store/shopStore';

export default function AdminRoute() {
  const { user, profile, isLoading: isAuthLoading } = useAuthStore();
  const { currentShop, isLoading: isShopLoading } = useShopStore();
  const { shopSlug } = useParams<{ shopSlug: string }>();

  if (isAuthLoading || isShopLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isOwner = currentShop && user && currentShop.owner_id === user.id;

  // L'utilisateur doit être admin (créateur de shop) ET propriétaire du shop courant
  if (!user || !profile?.is_admin || !isOwner) {
    const homePath = shopSlug ? `/${shopSlug}` : '/';
    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
}
