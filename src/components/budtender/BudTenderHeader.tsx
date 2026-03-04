import React from 'react';
import { Leaf, Mic, History, RefreshCw, X } from 'lucide-react';

interface HeaderActionProps {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
    isActive?: boolean;
    label: string;
}

function HeaderAction({ icon, title, onClick, isActive, label }: HeaderActionProps) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`
                flex flex-col items-center justify-center gap-1.5 px-3 py-2 rounded-xl transition-all group
                ${isActive ? 'bg-green-neon text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'}
            `}
        >
            <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:block ${isActive ? 'text-black' : 'text-zinc-600 group-hover:text-zinc-400 font-bold'}`}>
                {label}
            </span>
        </button>
    );
}

interface BudTenderHeaderProps {
    isLoggedIn: boolean;
    userName?: string;
    isHistoryOpen: boolean;
    onToggleHistory: () => void;
    onVoiceClick: () => void;
    onReset: () => void;
    onClose: () => void;
}

export function BudTenderHeader({
    isLoggedIn,
    userName,
    isHistoryOpen,
    onToggleHistory,
    onVoiceClick,
    onReset,
    onClose
}: BudTenderHeaderProps) {
    return (
        <div className="relative z-40 px-6 py-6 sm:py-8 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-6">
                {/* Left: Branding & Status */}
                <div className="flex items-center gap-5">
                    <div className="relative group">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center transition-all group-hover:border-green-neon/40 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-green-neon transition-transform group-hover:scale-110" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-neon rounded-full border-[3px] border-zinc-950 shadow-[0_0_10px_rgba(57,255,20,0.4)]" />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase italic">
                                BudTender <span className="text-green-neon not-italic">AI</span>
                            </h3>
                            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-neon/5 border border-green-neon/10">
                                <span className="w-1.5 h-1.5 bg-green-neon rounded-full animate-pulse shadow-[0_0_5px_rgba(57,255,20,0.8)]" />
                                <span className="text-[10px] font-black text-green-neon tracking-widest uppercase">Live Expert</span>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
                            {isLoggedIn && userName
                                ? `Session active · Bonjour, ${userName}`
                                : 'Conseiller spécialisé en cannabinoïdes'}
                        </p>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-10 w-[1px] bg-white/5 mx-2 hidden sm:block" />

                    <HeaderAction
                        icon={<Mic className="w-5 h-5" />}
                        title="Conseiller vocal (Gemini Live)"
                        onClick={onVoiceClick}
                        label="Voix"
                    />

                    <HeaderAction
                        icon={<History className="w-5 h-5" />}
                        title="Historique des discussions"
                        onClick={onToggleHistory}
                        isActive={isHistoryOpen}
                        label="Historique"
                    />

                    <HeaderAction
                        icon={<RefreshCw className="w-5 h-5" />}
                        title="Nouvelle session"
                        onClick={onReset}
                        label="Nouvelle"
                    />

                    <div className="h-10 w-[1px] bg-white/5 mx-2" />

                    <button
                        onClick={onClose}
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                        title="Fermer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
