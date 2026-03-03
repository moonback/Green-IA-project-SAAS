import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, LayoutDashboard, Store, CheckCircle, ArrowRight, Github, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import SEO from '../components/SEO';

type Mode = 'login' | 'register';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp, resetPassword } = useAuthStore();

  const [mode, setMode] = useState<Mode>('login');
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      await resetPassword(email);
      setSuccess('Un email de réinitialisation a été envoyé.');
    } catch (err: any) {
      setError(err.message);
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
        navigate('/compte');
      } else {
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
        title={mode === 'login' ? 'Connexion — Green IA CBD' : 'Créer un compte — Green IA CBD'}
        description="Connectez-vous ou créez un compte pour accéder à votre historique de commandes et programme de fidélité."
      />

      <div className="min-h-screen bg-black flex overflow-hidden font-sans">
        {/* Left Side: Brand & Visuals (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 z-0">
            <img
              src="/cbd_saas_login_bg_1772555110205.png"
              alt="CBD Premium"
              className="w-full h-full object-cover opacity-60 scale-110 blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/80 via-transparent to-zinc-950/80" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-green-neon p-1.5 rounded-lg shadow-[0_0_15px_rgba(20,229,148,0.4)]">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
              </div>
              <span className="text-2xl font-serif font-black text-white tracking-tight">
                GREEN <span className="text-green-neon">IA</span>
              </span>
            </Link>
          </motion.div>

          <div className="relative z-10 max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-serif font-bold text-white leading-tight mb-6"
            >
              Votre univers <span className="text-green-neon italic">CBD</span>,<br />
              Propulsé par l'IA.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-lg mb-8 leading-relaxed"
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
            className="relative z-10 pt-8 border-t border-white/10"
          >
            <p className="text-zinc-500 text-xs">© 2026 Green IA SaaS Platform. Tous droits réservés.</p>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-950 relative overflow-y-auto">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-neon/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-green-neon/5 blur-[80px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md relative z-10"
          >
            {/* Header for mobile only or small screens */}
            <div className="lg:hidden text-center mb-10">
              <img src="/logo.png" alt="Logo" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-green-neon shadow-[0_0_20px_rgba(20,229,148,0.3)]" />
              <h1 className="text-3xl font-serif font-bold text-white">Green IA</h1>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-white mb-2">
                {isForgotMode ? 'Paramètres d\'accès' : (mode === 'login' ? 'Bon retour !' : 'Rejoindre l\'aventure')}
              </h2>
              <p className="text-zinc-400">
                {isForgotMode
                  ? 'Saisissez votre email pour recevoir un lien de réinitialisation.'
                  : (mode === 'login' ? 'Authentifiez-vous pour accéder à votre espace.' : 'Créez votre compte en quelques instants.')
                }
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800 shadow-2xl overflow-hidden relative group">
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-neon/10 blur-2xl group-hover:bg-green-neon/20 transition-all duration-700" />

              {/* Tabs (Hidden in forgot mode) */}
              {!isForgotMode && (
                <div className="flex mb-8 bg-black/40 rounded-2xl p-1.5 border border-zinc-800/50">
                  {(['login', 'register'] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === m
                        ? 'bg-green-neon text-black shadow-[0_4px_15px_rgba(20,229,148,0.4)]'
                        : 'text-zinc-500 hover:text-white'
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

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-2 ml-1">Nom complet</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-green-neon transition-colors" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jean Dupont"
                        className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-green-neon focus:ring-1 focus:ring-green-neon/20 transition-all outline-none"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-2 ml-1">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-green-neon transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.fr"
                      className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-green-neon focus:ring-1 focus:ring-green-neon/20 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                {!isForgotMode && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Mot de passe</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setIsForgotMode(true)}
                          className="text-[10px] uppercase font-bold text-zinc-600 hover:text-green-neon transition-colors"
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
                        className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-green-neon focus:ring-1 focus:ring-green-neon/20 transition-all outline-none"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  className="w-full bg-white hover:bg-green-neon text-black font-bold py-4 rounded-2xl transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {isForgotMode ? 'Envoyer le lien' : (mode === 'login' ? 'Se connecter' : 'Confirmer l\'inscription')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Login Divider */}
              {!isForgotMode && (
                <>
                  <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
                    <span className="relative z-10 bg-[#161616] px-4 text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Ou continuer avec</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-3.5 rounded-2xl transition-all group"
                    >
                      <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100" />
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('github')}
                      className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-3.5 rounded-2xl transition-all group"
                    >
                      <Github className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                      GitHub
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* SaaS Section for Professionals */}
            <div className="mt-10 pt-8 border-t border-zinc-800">
              <Link
                to="/ouvrir-boutique"
                className="bg-gradient-to-r from-green-neon/5 to-transparent border border-green-neon/20 rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:border-green-neon/40 transition-all w-full text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-neon/10 flex items-center justify-center text-green-neon">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Vous êtes un professionnel ?</p>
                    <p className="text-xs text-zinc-500">Ouvrez votre propre boutique SaaS CBD.</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-green-neon transition-colors" />
              </Link>
            </div>

            <p className="text-center text-zinc-600 text-[10px] mt-8 uppercase tracking-tighter">
              En continuant, vous confirmez avoir 18 ans révolus. — Green IA Secure Identity
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
