import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TERPENE_CHIPS } from '../../constants/budtender';
import { CheckCircle2, RefreshCw } from 'lucide-react';

interface BudTenderQuizProps {
    awaitingTerpene: boolean;
    terpeneSelection: string[];
    setTerpeneSelection: (val: string[] | ((prev: string[]) => string[])) => void;
    confirmTerpeneSelection: () => void;
}

export function BudTenderQuiz({
    awaitingTerpene,
    terpeneSelection,
    setTerpeneSelection,
    confirmTerpeneSelection
}: BudTenderQuizProps) {
    if (!awaitingTerpene) return null;

    const toggleTerpene = (label: string) => {
        setTerpeneSelection(prev =>
            prev.includes(label)
                ? prev.filter((t: string) => t !== label)
                : [...prev, label].slice(0, 3) // Max 3
        );
    };

    return (
        <div className="p-4 border-t border-white/5 bg-zinc-900 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-400">Sélectionnez jusqu'à 3 profils</span>
                <span className="text-xs text-zinc-500">{terpeneSelection.length}/3</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {TERPENE_CHIPS.map(chip => {
                    const isSel = terpeneSelection.includes(chip.label);
                    return (
                        <button
                            key={chip.label}
                            onClick={() => toggleTerpene(chip.label)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${isSel
                                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                    : 'bg-zinc-800 border-white/5 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                                }`}
                        >
                            <span>{chip.emoji}</span>
                            {chip.label}
                            {isSel && <CheckCircle2 className="w-3 h-3 ml-1" />}
                        </button>
                    );
                })}
            </div>
            <button
                onClick={confirmTerpeneSelection}
                className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
                {terpeneSelection.length > 0 ? 'Valider mes préférences' : 'Passer cette étape'}
            </button>
        </div>
    );
}
