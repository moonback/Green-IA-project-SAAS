import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            setSuccess(true);
            setTimeout(() => navigate('/connexion'), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16 font-sans">
            <SEO title="Nouveau mot de passe — Green Mood" description="Mise à jour sécurisée de vos accès." />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-neon/10 blur-2xl group-hover:bg-green-neon/20 transition-all duration-700" />

                    {success ? (
                        <div className="text-center py-6 space-y-4">
                            <div className="w-16 h-16 bg-green-neon/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8 text-green-neon" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-white">Mot de passe mis à jour !</h2>
                            <p className="text-zinc-400">Redirection vers la page de connexion...</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-serif font-bold text-white mb-2">Sécurité</h2>
                                <p className="text-zinc-400">Définissez votre nouveau mot de passe.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[11px] uppercase tracking-widest font-bold text-zinc-500 mb-2 ml-1">Nouveau mot de passe</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-green-neon transition-colors" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-green-neon transition-all outline-none"
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

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-xs">
                                        {error}
                                    </div>
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
                                            Mettre à jour
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
