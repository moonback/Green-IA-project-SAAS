import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AdminRoute() {
  const { user, profile, isLoading } = useAuthStore();
  const { shopSlug } = useParams<{ shopSlug: string }>();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !profile?.is_admin) {
    const homePath = shopSlug ? `/${shopSlug}` : '/';
    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
}
