import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { VoiceState } from '../../hooks/useGeminiLiveVoice';

interface VoiceControlsProps {
    voiceState: VoiceState;
    isActive: boolean;
    isMuted: boolean;
    onToggleMute: () => void;
    onHangup: () => void;
    isSupported: boolean;
    onStart: () => void;
}

export function VoiceControls({
    voiceState,
    isActive,
    isMuted,
    onToggleMute,
    onHangup,
    isSupported,
    onStart
}: VoiceControlsProps) {
    return (
        <div className="shrink-0 space-y-4">
            {/* Active session controls */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className="flex items-center justify-center gap-3 pb-6"
                    >
                        <button
                            type="button"
                            onClick={onToggleMute}
                            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${isMuted
                                ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.05)]'
                                : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:border-white/10 hover:text-zinc-300'
                                }`}
                        >
                            {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                            {isMuted ? 'Micro coupé' : 'Couper le micro'}
                        </button>

                        <button
                            type="button"
                            onClick={onHangup}
                            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold bg-red-500/[0.06] border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300"
                        >
                            <PhoneOff className="w-3.5 h-3.5" />
                            Raccrocher
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Start / retry button */}
            <AnimatePresence>
                {(voiceState === 'idle' || voiceState === 'error') && isSupported && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="px-5 pb-5 pt-2"
                    >
                        <button
                            type="button"
                            onClick={onStart}
                            className="group w-full py-4 rounded-2xl bg-gradient-to-r from-green-neon to-emerald-400 text-black font-black text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(57,255,20,0.25)] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative">
                                {voiceState === 'error' ? '🔄 Réessayer la connexion' : '🎤 Démarrer la session vocale'}
                            </span>
                        </button>
                        <p className="text-[10px] text-zinc-600 text-center mt-3 font-medium flex items-center justify-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-green-neon/40" />
                            Microphone requis · Connexion directe sécurisée
                            <span className="w-1 h-1 rounded-full bg-green-neon/40" />
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
