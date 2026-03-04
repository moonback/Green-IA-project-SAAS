import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already verified their age
    const isVerified = localStorage.getItem('ageVerified');
    if (!isVerified) {
      // Small delay to ensure smooth rendering before popup appears
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
  };

  const handleDeny = () => {
    // Redirect to a safe page (e.g., Google) if under 18
    window.location.href = 'https://www.google.com';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-2xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-lg bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.8)] text-center overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -ml-32 -mb-32" />

            <div className="relative z-10">
              <div className="mx-auto w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl">
                <ShieldAlert className="h-10 w-10 text-emerald-500" />
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 font-mono font-mono">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                Vérification d'identité
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
                Accès <span className="text-emerald-500">Privé.</span>
              </h2>

              <p className="text-zinc-400 mb-12 leading-relaxed text-lg font-medium max-w-md mx-auto">
                Ce sanctuaire digital est exclusivement réservé aux connaisseurs de plus de <span className="text-white font-bold">18 ans.</span>
                <br />
                <span className="text-zinc-600 text-sm italic">Le CBD est interdit aux mineurs.</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className="group relative overflow-hidden bg-emerald-500 text-black py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-emerald-500/20"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Je suis majeur
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeny}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
                >
                  Quitter le site
                </motion.button>
              </div>

              <p className="mt-10 text-[10px] text-zinc-600 uppercase tracking-widest font-black flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-zinc-800" />
                Dégustation responsable uniquement
                <div className="w-8 h-px bg-zinc-800" />
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
