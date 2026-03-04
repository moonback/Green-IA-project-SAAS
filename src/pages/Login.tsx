import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, LayoutDashboard, Store, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import SEO from '../components/SEO';

type Mode = 'login' | 'register';

export default function Login() {
  const navigate = useNavigate();
  const { shopSlug } = useParams<{ shopSlug: string }>();
  const { signIn, signUp, resetPassword } = useAuthStore();
  const isShopAuth = Boolean(shopSlug);

  const [mode, setMode] = useState<Mode>('login');
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
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
      if (mode === 'login') {
        await signIn(email, password);
        if (shopSlug) {
          navigate(`/${shopSlug}/compte`);
        } else {
          navigate('/compte');
        }
      } else {
        if (!isShopAuth) {
          navigate('/ouvrir-boutique');
          return;
        }
        if (!fullName.trim()) {
          setError('Le prénom et nom sont requis.');
          return;
        }
        await signUp(email, password, fullName);
        setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      if (msg.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.');
      } else if (msg.includes('User already registered')) {
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
      <SEO
        title={
          isShopAuth
            ? (mode === 'login' ? 'Connexion boutique — Green IA CBD' : 'Créer un compte boutique — Green IA CBD')
            : 'Connexion SaaS — Green IA'
        }
        description={
          isShopAuth
            ? 'Connectez-vous ou créez un compte client pour accéder à votre espace boutique.'
            : 'Connectez-vous à votre espace SaaS Green IA pour gérer votre boutique.'
        }
      />

      <div className="min-h-screen bg-black flex overflow-hidden font-sans">
        {/* Left Side: Brand & Visuals (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-16 lg:p-24 overflow-hidden bg-brand-950">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-premium.png"
              alt="Elite CBD Experience"
              className="w-full h-full object-cover opacity-30 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-950/40 to-brand-950" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-950/60" />

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-12 left-16 z-10"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>
          </motion.div>

          <div className="relative z-10 max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-serif font-black text-white leading-[1.1] mb-6"
            >
              Votre univers <span className="text-green-neon italic">CBD</span>,<br />
              Propulsé par l'IA.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-xl mb-10 leading-relaxed font-light"
            >
              Accédez à vos conseils personnalisés, vos produits favoris et votre programme de fidélité exclusif.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {[
                { icon: CheckCircle, text: 'Conseils BudTender IA 24/7' },
                { icon: CheckCircle, text: 'Programme fidélité : Gagnez des points' },
                { icon: CheckCircle, text: 'Gestion de vos abonnements CBD' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300">
                  <item.icon className="w-5 h-5 text-green-neon" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-16 z-10 flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                <img src="/logo.png" className="w-4 h-4 rounded-full opacity-100" alt="" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Green IA Secure</span>
            </div>
            <div className="h-px w-8 bg-white/10" />
            <p className="text-zinc-600 text-[9px] uppercase tracking-widest">v4.2.026</p>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-brand-950 relative overflow-y-auto">
          {/* Enhanced background glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-neon/5 blur-[180px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-neon/5 blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md relative z-10"
          >
            {/* Header for mobile only or small screens */}
            <div className="lg:hidden text-center mb-6">
              <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-green-neon shadow-[0_0_20px_rgba(20,229,148,0.3)]" />
              <h1 className="text-2xl font-serif font-bold text-white">Green IA</h1>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold text-white mb-1">
                {isForgotMode
                  ? 'Paramètres d\'accès'
                  : (isShopAuth
                    ? (mode === 'login' ? 'Bon retour !' : 'Rejoindre l\'aventure')
                    : 'Espace SaaS')}
              </h2>
              <p className="text-zinc-400">
                {isForgotMode
                  ? 'Saisissez votre email pour recevoir un lien de réinitialisation.'
                  : (isShopAuth
                    ? (mode === 'login' ? 'Authentifiez-vous pour accéder à votre espace.' : 'Créez votre compte en quelques instants.')
                    : 'Connexion dédiée aux gérants de boutiques SaaS. L’inscription se fait via le parcours “Ouvrir ma boutique”.')
                }
              </p>
            </div>

            <div
              className={`backdrop-blur-3xl rounded-[2.5rem] p-10 border shadow-2xl overflow-hidden relative group ${isShopAuth
                ? 'bg-gradient-to-b from-zinc-900/95 to-zinc-950 border-green-neon/30 shadow-[0_20px_80px_rgba(20,229,148,0.12)]'
                : 'bg-zinc-900/40 border-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.4)]'
                }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-neon/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Animated corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 blur-2xl transition-all duration-700 ${isShopAuth ? 'bg-green-neon/20 group-hover:bg-green-neon/30' : 'bg-green-neon/10 group-hover:bg-green-neon/20'}`} />

              {isShopAuth && !isForgotMode && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-neon/30 bg-green-neon/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-green-neon">
                  <Store className="w-3 h-3" />
                  Espace client boutique
                </div>
              )}

              {/* Tabs (Hidden in forgot mode) */}
              {!isForgotMode && isShopAuth && (
                <div className="flex mb-6 bg-black/50 rounded-xl p-1 border border-green-neon/20">
                  {(['login', 'register'] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                      className={`flex-1 py-2.5 rounded-[0.9rem] text-xs font-semibold transition-all duration-300 ${mode === m
                        ? 'bg-green-neon text-black shadow-[0_4px_12px_rgba(20,229,148,0.2)]'
                        : 'text-zinc-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {m === 'login' ? 'Connexion' : 'Inscription'}
                    </button>
                  ))}
                </div>
              )}

              {isForgotMode && (
                <button
                  onClick={() => setIsForgotMode(false)}
                  className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour à la connexion
                </button>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && isShopAuth && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1.5 ml-1">Nom complet</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-green-neon transition-colors" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jean Dupont"
                        className="w-full bg-black/40 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-green-neon focus:ring-1 focus:ring-green-neon/20 transition-all outline-none"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1.5 ml-1">{isShopAuth ? 'Email client' : 'Email'}</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-green-neon transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.fr"
                      className="w-full bg-black/40 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-green-neon focus:ring-1 focus:ring-green-neon/20 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                {!isForgotMode && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Mot de passe</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setIsForgotMode(true)}
                          className="text-[9px] uppercase font-bold text-zinc-600 hover:text-green-neon transition-colors"
                        >
                          Oublié ?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-green-neon transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/40 border border-zinc-800 rounded-xl pl-11 pr-11 py-3 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-green-neon focus:ring-1 focus:ring-green-neon/20 transition-all outline-none"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 text-xs font-medium">{error}</span>
                  </motion.div>
                )}

                {success && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex gap-3 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">{success}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-green-neon text-black font-bold py-3.5 rounded-xl transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group text-sm"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {isForgotMode
                        ? 'Envoyer le lien'
                        : (mode === 'login'
                          ? (isShopAuth ? 'Se connecter' : 'Accéder au Dashboard')
                          : 'Confirmer')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

            </div>

            {isShopAuth && (
              <div className="mt-8 pt-6 border-t border-zinc-900">
                <Link
                  to="/ouvrir-boutique"
                  className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:border-green-neon/20 transition-all w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-neon/10 flex items-center justify-center text-green-neon">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none mb-1">Vous êtes un professionnel ?</p>
                      <p className="text-[10px] text-zinc-500 leading-none">Ouvrez votre propre boutique SaaS CBD.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-green-neon transition-colors" />
                </Link>
              </div>
            )}

            {!isShopAuth && (
              <div className="mt-8 pt-6 border-t border-zinc-900">
                <Link
                  to="/ouvrir-boutique"
                  className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:border-green-neon/20 transition-all w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-neon/10 flex items-center justify-center text-green-neon">
                      <LayoutDashboard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none mb-1">Pas encore de boutique ?</p>
                      <p className="text-[10px] text-zinc-500 leading-none">Devenez gérant en quelques clics.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-green-neon transition-colors" />
                </Link>
              </div>
            )}

            <p className="text-center text-zinc-600 text-[10px] mt-8 uppercase tracking-tighter">
              En continuant, vous confirmez avoir 18 ans révolus. — Green IA Secure Identity
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
