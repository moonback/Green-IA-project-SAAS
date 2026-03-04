import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, User, ChevronRight } from "lucide-react";

const DEMO_CONVERSATIONS = [
    {
        q: "Quels terpènes recommandez-vous pour l'anxiété ?",
        a: "Pour apaiser l'anxiété, je privilégie les variétés riches en **Linalol** (lavande) et en **Limonène**. La *Lemon Haze* ou une huile Full Spectrum 15% seraient idéales pour calmer le système nerveux tout en restant actif."
    },
    {
        q: "Quelle est la différence entre fleurs et résines ?",
        a: "Les **fleurs** offrent une expérience plus brute et aromatique avec un taux de CBD contenu (5-10%). Les **résines** sont des concentrés, plus riches en saveurs boisées et avec des taux de CBD souvent supérieurs à 25%."
    },
    {
        q: "Conseillez-moi un produit pour mieux dormir.",
        a: "Je vous suggère notre huile **Deep Sleep au CBN**. Le CBN agit en synergie avec le CBD pour favoriser l'endormissement profond sans effet de somnolence le lendemain matin."
    }
];

export default function AiSimulator() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isTyping) {
            let i = 0;
            const fullText = DEMO_CONVERSATIONS[currentIdx].a;
            setDisplayedText("");

            const interval = setInterval(() => {
                setDisplayedText(fullText.slice(0, i));
                i++;
                if (i > fullText.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 30);

            return () => clearInterval(interval);
        }
    }, [isTyping, currentIdx]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-zinc-900/80 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
                {/* Header */}
                <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-neon/10 flex items-center justify-center text-green-neon">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white uppercase tracking-widest">BudTender AI v4.2</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" />
                                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Temps réel</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="p-8 space-y-6 min-h-[300px]">
                    {/* Question */}
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-zinc-300">
                            {DEMO_CONVERSATIONS[currentIdx].q}
                        </div>
                    </div>

                    {/* Answer */}
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-green-neon/20 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-green-neon" />
                        </div>
                        <div className="bg-green-neon/5 border border-green-neon/20 rounded-2xl rounded-tl-none p-5 text-sm text-white leading-relaxed flex flex-col gap-2">
                            <p>{displayedText}</p>
                            {isTyping && <span className="w-1.5 h-4 bg-green-neon animate-pulse" />}
                        </div>
                    </div>
                </div>

                {/* Predefined Questions */}
                <div className="p-6 bg-black/40 border-t border-white/5 grid grid-cols-1 gap-2">
                    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600 mb-2 ml-2">Simulez une interaction :</p>
                    <div className="flex flex-wrap gap-2">
                        {DEMO_CONVERSATIONS.map((conv, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIdx(idx);
                                    setIsTyping(true);
                                }}
                                disabled={isTyping}
                                className={`text-xs px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 ${currentIdx === idx
                                        ? "bg-green-neon/10 border-green-neon text-green-neon"
                                        : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {conv.q}
                                <ChevronRight className="w-3 h-3 opacity-50" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
