import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { VoiceState } from '../../hooks/useGeminiLiveVoice';
import { STATUS, STATUS_SUB } from '../../types/voiceAdvisor';
import { PulseRing, WaveformBars, OrbitingDots } from './VoiceVisualizers';

interface VoiceStatusAreaProps {
    voiceState: VoiceState;
    isActive: boolean;
    isMuted: boolean;
    isSupported: boolean;
    error: string | null;
    compatibilityError: string | null;
    onStart: () => void;
}

export function VoiceStatusArea({
    voiceState,
    isActive,
    isMuted,
    isSupported,
    error,
    compatibilityError,
    onStart
}: VoiceStatusAreaProps) {
    return (
        <div className="relative flex-1 flex flex-col items-center justify-center gap-8 px-6 py-6">
            {/* Mic / state visualisation */}
            <div className="relative flex items-center justify-center w-40 h-40">
                <AnimatePresence>
                    {isActive && (
                        <motion.div key="orbit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <OrbitingDots />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {voiceState === 'listening' && (
                        <>
                            <PulseRing delay={0} scale={1.6} />
                            <PulseRing delay={0.5} scale={1.35} />
                            <PulseRing delay={1} scale={1.5} />
                        </>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {voiceState === 'speaking' && (
                        <motion.div key="wave" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute">
                            <WaveformBars />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`absolute inset-0 rounded-full transition-all duration-700 ${isActive ? 'shadow-[0_0_60px_rgba(57,255,20,0.08),_inset_0_0_30px_rgba(57,255,20,0.03)]' : ''}`} />

                <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    whileHover={!isActive && voiceState !== 'connecting' && isSupported ? { scale: 1.05 } : {}}
                    onClick={isActive || voiceState === 'connecting' || !isSupported ? undefined : onStart}
                    disabled={voiceState === 'connecting' || !isSupported}
                    className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500
                        ${voiceState === 'error'
                            ? 'bg-gradient-to-br from-red-500/10 to-red-900/10 border-2 border-red-500/30 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
                            : isActive
                                ? 'bg-gradient-to-br from-green-neon/10 to-emerald-900/10 border-2 border-green-neon/40 text-green-neon shadow-[0_0_50px_rgba(57,255,20,0.12)]'
                                : voiceState === 'connecting'
                                    ? 'bg-zinc-900/80 border-2 border-zinc-700/50 text-zinc-500 cursor-wait'
                                    : 'bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border-2 border-zinc-700/50 text-zinc-400 hover:border-green-neon/30 hover:text-green-neon/80 cursor-pointer hover:shadow-[0_0_40px_rgba(57,255,20,0.08)]'
                        }`}
                >
                    {isActive && <div className="absolute inset-[3px] rounded-full border border-green-neon/10" />}

                    <AnimatePresence mode="wait">
                        {voiceState === 'connecting' && (
                            <motion.div key="spinner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-8 h-8 border-2 border-green-neon/30 border-t-green-neon rounded-full animate-spin" />
                        )}
                        {voiceState === 'speaking' && (
                            <motion.div key="vol" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                <Volume2 className="w-9 h-9" />
                            </motion.div>
                        )}
                        {(voiceState === 'listening' || voiceState === 'idle' || voiceState === 'error') && (
                            <motion.div key="mic" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                {isMuted ? <MicOff className="w-9 h-9" /> : <Mic className="w-9 h-9" />}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Status text */}
            <div className="text-center space-y-2">
                <motion.p
                    key={voiceState}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-base font-bold tracking-tight ${voiceState === 'error' ? 'text-red-400' : isActive ? 'text-white' : 'text-zinc-300'}`}
                >
                    {STATUS[voiceState]}
                </motion.p>
                <p className="text-xs text-zinc-600 font-medium max-w-[260px] mx-auto leading-relaxed">
                    {error || compatibilityError || STATUS_SUB[voiceState]}
                </p>
            </div>
        </div>
    );
}
