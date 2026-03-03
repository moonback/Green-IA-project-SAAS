import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute() {
  const { user, isLoading } = useAuthStore();
  const { shopSlug } = useParams<{ shopSlug: string }>();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    const loginPath = shopSlug ? `/${shopSlug}/connexion` : '/connexion';
    return <Navigate to={loginPath} replace />;
  }

  return <Outlet />;
}
