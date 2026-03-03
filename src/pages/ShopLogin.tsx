import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Store, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { useShopStore } from '../store/shopStore';
import SEO from '../components/SEO';

export default function ShopLogin() {
  const navigate = useNavigate();
  const { shopSlug } = useParams<{ shopSlug: string }>();
  const { currentShop } = useShopStore();
  const { signIn, resetPassword } = useAuthStore();

  const [isForgotMode, setIsForgotMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      await resetPassword(email);
      setSuccess('Un email de réinitialisation a été envoyé.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Impossible d’envoyer le lien de réinitialisation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isForgotMode) return handleResetPassword(e);
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await signIn(email, password);

      const shopId = currentShop?.id;
      if (!shopId) {
        await supabase.auth.signOut();
        throw new Error('Boutique introuvable.');
      }

      const { data: userData } = await supabase.auth.getUser();
      const signedUser = userData.user;
      if (!signedUser) {
        throw new Error('Session invalide. Veuillez réessayer.');
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('current_shop_id')
        .eq('id', signedUser.id)
        .single();

      if (profileError) throw profileError;

      const { data: ownerData, error: ownerError } = await supabase
        .from('shops')
        .select('id')
        .eq('id', shopId)
        .eq('owner_id', signedUser.id)
        .maybeSingle();

      if (ownerError) throw ownerError;

      const isOwnerOfCurrentShop = Boolean(ownerData?.id);
      const isMemberOfCurrentShop = profileData?.current_shop_id === shopId;

      if (!isOwnerOfCurrentShop && !isMemberOfCurrentShop) {
        await supabase.auth.signOut();
        throw new Error('Ce compte n’est pas autorisé pour cette boutique.');
      }

      navigate(`/${shopSlug}/compte`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      if (msg.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.');
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={`Connexion ${currentShop?.name ?? 'boutique'} — Green IA CBD`}
        description="Connectez-vous à votre espace client boutique."
      />

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-green-neon/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(20,229,148,0.08)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-neon/20 blur-2xl" />

          <div className="mb-6 flex items-center justify-between">
            <Link to={`/${shopSlug}`} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Retour boutique
            </Link>
            <span className="text-[10px] px-3 py-1 rounded-full border border-green-neon/30 bg-green-neon/10 text-green-neon uppercase tracking-widest font-black">
              Espace client
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4 mb-6">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Votre boutique</p>
            <p className="text-lg font-bold mt-1">{currentShop?.name ?? shopSlug}</p>
            <p className="text-xs text-zinc-500 mt-1">/{shopSlug}</p>
          </div>

          <h1 className="text-3xl font-serif font-bold mb-2">Connexion</h1>
          <p className="text-zinc-400 text-sm mb-6">Accédez à vos commandes, abonnements et favoris.</p>

          {isForgotMode && (
            <button
              onClick={() => setIsForgotMode(false)}
              className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Retour à la connexion
            </button>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-2 ml-1">Email client</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 focus:border-green-neon outline-none" required />
              </div>
            </div>

            {!isForgotMode && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Mot de passe</label>
                  <button type="button" onClick={() => setIsForgotMode(true)} className="text-[10px] uppercase font-bold text-zinc-600 hover:text-green-neon">Oublié ?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-12 py-4 focus:border-green-neon outline-none" required minLength={6} />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {error && <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-xs">{error}</div>}
            {success && <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-green-400 text-xs">{success}</div>}

            <button type="submit" disabled={isLoading} className="w-full bg-white hover:bg-green-neon text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <>{isForgotMode ? 'Envoyer le lien' : 'Se connecter'} <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <Link to={`/${shopSlug}/inscription`} className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 rounded-2xl py-3.5 text-sm font-bold">
              <UserPlus className="w-4 h-4" /> Créer un compte boutique
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
