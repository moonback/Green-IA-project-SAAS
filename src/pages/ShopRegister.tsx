import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Lock, User, Store } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useShopStore } from '../store/shopStore';
import SEO from '../components/SEO';

export default function ShopRegister() {
  const navigate = useNavigate();
  const { shopSlug } = useParams<{ shopSlug: string }>();
  const { currentShop } = useShopStore();
  const { signUp } = useAuthStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await signUp(email, password, fullName);
      setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
      setTimeout(() => navigate(`/${shopSlug}/connexion`), 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      if (msg.includes('User already registered')) {
        setError('Un compte existe déjà avec cet email.');
      } else {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO title={`Inscription ${currentShop?.name ?? 'boutique'} — Green IA CBD`} description="Créez votre compte client boutique." />

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-green-neon/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(20,229,148,0.08)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-neon/20 blur-2xl" />

          <div className="mb-6 flex items-center justify-between">
            <Link to={`/${shopSlug}/connexion`} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Déjà client ? Connexion
            </Link>
            <span className="text-[10px] px-3 py-1 rounded-full border border-green-neon/30 bg-green-neon/10 text-green-neon uppercase tracking-widest font-black">
              Inscription boutique
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4 mb-6">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Boutique rattachée</p>
            <p className="text-lg font-bold mt-1">{currentShop?.name ?? shopSlug}</p>
            <p className="text-xs text-zinc-500 mt-1">/{shopSlug}</p>
          </div>

          <h1 className="text-3xl font-serif font-bold mb-2">Créer mon compte</h1>
          <p className="text-zinc-400 text-sm mb-3">Un compte dédié à cette boutique pour suivre vos commandes et favoris.</p>
          <p className="text-[11px] text-zinc-500 mb-6">Inscription client uniquement — cet accès sert à acheter sur cette boutique.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-2 ml-1">Nom complet</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 focus:border-green-neon outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-2 ml-1">Email client</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 focus:border-green-neon outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-2 ml-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 focus:border-green-neon outline-none" required minLength={6} />
              </div>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-xs">{error}</div>}
            {success && <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-green-400 text-xs">{success}</div>}

            <button type="submit" disabled={isLoading} className="w-full bg-white hover:bg-green-neon text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <>Créer mon compte <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <Link to={`/${shopSlug}`} className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 rounded-2xl py-3.5 text-sm font-bold">
              <Store className="w-4 h-4" /> Retour à la boutique
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
