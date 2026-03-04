import { motion } from 'motion/react';
import { Leaf, Mic } from 'lucide-react';

export interface BudTenderWidgetProps {
    /** Called when the user clicks the floating button */
    onClick: () => void;
    /** Called when the user clicks the quick voice button */
    onVoiceClick?: () => void;
    /** Whether the button should play the slow-pulse attention animation */
    pulse?: boolean;
    /** Whether a voice session is currently active */
    isVoiceActive?: boolean;
    /** Number of unread messages to show as a badge (0 = hidden) */
    unreadCount?: number;
    /** 'default' or 'expand' (when chat is shrunk) */
    mode?: 'default' | 'expand';
}

/**
 * The floating "BudTender IA" button that sits in the bottom-right corner.
 */
export default function BudTenderWidget({ onClick, onVoiceClick, pulse = false, isVoiceActive = false, unreadCount = 0, mode = 'default' }: BudTenderWidgetProps) {
    const isExpand = mode === 'expand';

    return (
        <div className="fixed bottom-6 right-6 z-[99999] flex items-center gap-3">
            {/* Quick Voice Button */}
            {!isExpand && onVoiceClick && (
                <motion.button
                    initial={{ scale: 0, opacity: 0, x: 20 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        x: 0,
                    }}
                    exit={{ scale: 0, opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onVoiceClick();
                    }}
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all relative glass-panel ${isVoiceActive
                        ? 'border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-emerald-500/10'
                        : 'border-white/10 text-emerald-500 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-emerald-500/50'
                        }`}
                >
                    <Mic className={`w-5 h-5 ${isVoiceActive ? 'animate-pulse' : ''}`} />
                    {isVoiceActive && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                    )}
                </motion.button>
            )}

            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className={`flex items-center gap-3 border text-white rounded-2xl px-5 py-4 transition-all group glass-panel ${pulse ? 'animate-pulse' : ''} ${isExpand
                    ? 'border-emerald-500 bg-emerald-900/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]'
                    : 'border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-emerald-500/30'
                    }`}
            >
                <div className="relative">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isExpand ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-emerald-500/10 text-emerald-500'
                        }`}>
                        <Leaf className={`w-5 h-5 ${isExpand ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform duration-300'}`} />
                    </div>

                    {!isExpand && (unreadCount > 0 ? (
                        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-emerald-500 text-white text-[10px] font-black rounded-full border-2 border-zinc-900 px-1 leading-none shadow-lg">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    ) : (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    ))}
                </div>

                <div className="text-left hidden sm:block">
                    <p className="text-sm font-bold text-emerald-500 leading-none tracking-tight">
                        {isExpand ? 'Reprendre' : 'BudTender IA'}
                    </p>
                    <p className="text-[11px] text-zinc-400 leading-none mt-1 group-hover:text-zinc-200 transition-colors uppercase font-medium tracking-widest">
                        {isExpand ? 'Discussion en cours' : 'Expert Certifié'}
                    </p>
                </div>
            </motion.button>
        </div>
    );
}
