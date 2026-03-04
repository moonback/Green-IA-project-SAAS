import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, X, Radio } from 'lucide-react';
import { Product } from '../lib/types';
import { PastProduct, SavedPrefs } from '../hooks/useBudTenderMemory';
import { useGeminiLiveVoice } from '../hooks/useGeminiLiveVoice';
import { useSettingsStore } from '../store/settingsStore';

// Modularized imports
import { VoiceStatusArea } from './voice/VoiceStatusArea';
import { VoiceControls } from './voice/VoiceControls';

interface Props {
    products: Product[];
    pastProducts: PastProduct[];
    savedPrefs: SavedPrefs | null;
    userName: string | null;
    isOpen: boolean;
    onClose: () => void;
    onHangup?: () => void;
    onAddItem?: (product: Product, quantity: number) => void;
    onViewProduct?: (product: Product) => void;
    onNavigate?: (path: string) => void;
    showUI?: boolean;
}

export default function VoiceAdvisor({
    products,
    pastProducts,
    savedPrefs,
    userName,
    isOpen,
    onClose,
    onHangup,
    onAddItem,
    onViewProduct,
    onNavigate,
    showUI = true
}: Props) {
    const { settings } = useSettingsStore();

    const {
        voiceState,
        error,
        isMuted,
        isSupported,
        compatibilityError,
        startSession,
        stopSession,
        toggleMute
    } = useGeminiLiveVoice({
        products,
        pastProducts,
        savedPrefs,
        userName,
        onAddItem,
        deliveryFee: settings.delivery_fee,
        deliveryFreeThreshold: settings.delivery_free_threshold,
        onCloseSession: onClose,
        onViewProduct,
        onNavigate
    });

    // Auto-start when opened
    useEffect(() => {
        if (isOpen && voiceState === 'idle' && isSupported) {
            const timer = setTimeout(() => {
                startSession();
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isOpen, voiceState, isSupported, startSession]);

    const isActive = voiceState === 'listening' || voiceState === 'speaking';

    const handleClose = () => {
        stopSession();
        onClose();
    };

    const handleHangup = () => {
        stopSession();
        onClose();
        if (onHangup) onHangup();
    };

    if (!showUI) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 flex flex-col overflow-hidden"
                >
                    {/* Layered background */}
                    <div className="absolute inset-0 bg-zinc-950/[0.98]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(57,255,20,0.03)_0%,_transparent_70%)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-neon/[0.02] blur-[120px] rounded-full" />

                    {/* Header */}
                    <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/[0.04] shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-green-neon/10 border border-green-neon/20 flex items-center justify-center">
                                <Headphones className="w-4 h-4 text-green-neon" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
                                    CONSEILLER VOCAL
                                    <motion.span
                                        animate={isActive ? { opacity: [1, 0.5, 1] } : {}}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-[9px] bg-green-neon/10 text-green-neon px-2.5 py-0.5 rounded-full border border-green-neon/20 font-bold tracking-wider inline-flex items-center gap-1"
                                    >
                                        <Radio className="w-2.5 h-2.5" />
                                        LIVE
                                    </motion.span>
                                </h3>
                                <p className="text-[10px] text-zinc-600 mt-0.5 font-medium">
                                    Gemini Live · Audio natif temps réel
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="p-2.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/5"
                            aria-label="Fermer le conseiller vocal"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Main voice area */}
                    <VoiceStatusArea
                        voiceState={voiceState}
                        isActive={isActive}
                        isMuted={isMuted}
                        isSupported={isSupported}
                        error={error}
                        compatibilityError={compatibilityError}
                        onStart={startSession}
                    />

                    {/* Session Controls */}
                    <VoiceControls
                        voiceState={voiceState}
                        isActive={isActive}
                        isMuted={isMuted}
                        onToggleMute={toggleMute}
                        onHangup={handleHangup}
                        isSupported={isSupported}
                        onStart={startSession}
                    />

                    {/* Fallback when voice is unsupported */}
                    {!isSupported && (
                        <div className="relative px-5 pb-5 pt-2 shrink-0">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-full py-4 rounded-2xl bg-zinc-800/80 border border-zinc-700 text-zinc-200 font-black text-sm uppercase tracking-wider hover:bg-zinc-700/80 transition-all duration-300"
                            >
                                💬 Continuer en chat texte
                            </button>
                            <p className="text-[10px] text-zinc-600 text-center mt-3 font-medium">
                                Votre navigateur ne supporte pas toutes les APIs vocales nécessaires.
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
