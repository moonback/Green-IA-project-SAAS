import React from 'react';
import { SendHorizontal, ShoppingCart, Clock, CheckCircle2, ChevronRight, Gift, Sparkles, Share2, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Message, Answers } from '../../types/budtender';
import { BudTenderMessage, BudTenderTypingIndicator, BudTenderFeedback } from '../budtender-ui';

interface BudTenderChatProps {
    messages: Message[];
    isTyping: boolean;
    chatInput: string;
    setChatInput: (val: string) => void;
    handleSendMessage: (e?: React.FormEvent) => void;
    handleAnswer: (option: any, stepId: string) => void;
    scrollRef: React.RefObject<HTMLDivElement>;
    onProductClick: (product: any) => void;
    onAddToCart: (product: any) => void;
    onShare: () => void;
    onCopyPromo: (code: string) => void;
    hasShared: boolean;
    showPromoTooltip: boolean;
    currentStepIndex: number;
    quizSteps: any[];
    answers: Answers;
}

export function BudTenderChat({
    messages,
    isTyping,
    chatInput,
    setChatInput,
    handleSendMessage,
    handleAnswer,
    scrollRef,
    onProductClick,
    onAddToCart,
    onShare,
    onCopyPromo,
    hasShared,
    showPromoTooltip,
    currentStepIndex,
    quizSteps,
    answers
}: BudTenderChatProps) {
    return (
        <>
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent via-zinc-900/10 to-green-neon/[0.01]"
            >
                <div className="max-w-7xl mx-auto w-full p-5 sm:p-10 space-y-8">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <BudTenderMessage
                                key={msg.id}
                                sender={msg.sender}
                                text={msg.text}
                                type={msg.type}
                                isTyping={isTyping}
                            >
                                {/* Restock card */}
                                {msg.type === 'restock' && msg.restockProduct && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-amber-500/30 rounded-2xl p-4 space-y-3"
                                    >
                                        <div className="flex items-center gap-2 text-amber-400">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-black tracking-widest uppercase">Rappel de Stock</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {msg.restockProduct.image_url && (
                                                <img
                                                    src={msg.restockProduct.image_url}
                                                    alt={msg.restockProduct.product_name}
                                                    className="w-14 h-14 rounded-xl object-cover bg-zinc-900 flex-shrink-0"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-white line-clamp-1">{msg.restockProduct.product_name}</p>
                                                <p className="text-xs text-zinc-400 mt-0.5">
                                                    Commandé il y a <span className="text-amber-400 font-bold">{msg.restockProduct.daysSince}j</span>
                                                </p>
                                                <p className="text-base font-black text-green-neon mt-1">{msg.restockProduct.price.toFixed(2)} €</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => onAddToCart(msg.restockProduct)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-green-neon hover:bg-green-400 text-black font-black text-xs py-2.5 rounded-xl transition-all"
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5" />
                                                Réapprovisionner
                                            </motion.button>
                                            <Link
                                                to={`/catalogue/${msg.restockProduct.slug}`}
                                                onClick={() => onProductClick(msg.restockProduct)}
                                                className="px-3 py-2.5 bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-xl transition-all flex items-center"
                                            >
                                                Voir
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Quiz Options */}
                                {msg.isOptions && msg.options && (
                                    <div className="grid grid-cols-1 gap-2.5 mt-3">
                                        {msg.options.map((opt) => {
                                            const isSelected = answers[msg.stepId!] === opt.value;
                                            const hasAnsweredNext = messages.some(m => m.sender === 'user' && m.text === opt.label);
                                            const isCurrentStep = quizSteps.findIndex(s => s.id === msg.stepId) === currentStepIndex;

                                            return (
                                                <motion.button
                                                    key={opt.value}
                                                    whileHover={{ x: 4, backgroundColor: 'rgba(57,255,20,0.05)' }}
                                                    disabled={!isCurrentStep && msg.stepId !== 'proactive'}
                                                    onClick={() => handleAnswer(opt, msg.stepId!)}
                                                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all ${isSelected || hasAnsweredNext
                                                        ? 'bg-green-neon/10 border-green-neon/50 text-green-neon shadow-[0_0_20px_rgba(57,255,20,0.05)]'
                                                        : 'bg-zinc-800/30 border-zinc-800 hover:border-zinc-600 text-zinc-400 group'
                                                        }`}
                                                >
                                                    <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{opt.emoji}</span>
                                                    <span className="text-sm font-bold tracking-tight">{opt.label}</span>
                                                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isSelected || hasAnsweredNext ? 'text-green-neon rotate-90' : 'text-zinc-600'}`} />
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Recommendation Results */}
                                {msg.isResult && msg.recommended && (
                                    <div className="space-y-4 pt-3">
                                        <p className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Sélection sur-mesure</p>
                                        {msg.recommended.map((product, i) => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.15 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="flex items-center gap-4 bg-zinc-800/40 hover:bg-zinc-800/60 border border-zinc-700/50 hover:border-green-neon/30 p-4 rounded-[1.5rem] transition-all group"
                                            >
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={product.image_url || ''}
                                                        className="w-16 h-16 rounded-2xl object-cover bg-zinc-900 shadow-md transition-transform group-hover:scale-105"
                                                        alt={product.name}
                                                    />
                                                    {product.cbd_percentage && (
                                                        <span className="absolute -top-1 -left-1 bg-green-neon text-black text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                                                            {product.cbd_percentage}%
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <Link
                                                        to={`/catalogue/${product.slug}`}
                                                        onClick={() => onProductClick(product)}
                                                        className="text-sm font-bold text-white hover:text-green-neon line-clamp-1"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-base font-black text-green-neon">{product.price}€</p>
                                                        {product.original_value && (
                                                            <p className="text-[10px] text-zinc-500 line-through">{product.original_value}€</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <motion.button
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => onAddToCart(product)}
                                                    className="w-10 h-10 rounded-xl bg-green-neon hover:bg-green-400 text-black flex items-center justify-center transition-all shadow-lg hover:shadow-green-neon/20"
                                                >
                                                    <ShoppingCart className="w-4 h-4" />
                                                </motion.button>
                                            </motion.div>
                                        ))}

                                        <BudTenderFeedback
                                            onFeedback={async (type) => {
                                                // Handle feedback via callback if needed
                                            }}
                                        />

                                        {/* Ambassador section */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="mt-6 bg-gradient-to-br from-green-neon/10 to-transparent border border-green-neon/20 rounded-2xl p-4 sm:p-5 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                                <Gift className="w-12 h-12 text-green-neon" />
                                            </div>

                                            {!hasShared ? (
                                                <div className="space-y-3 relative z-10">
                                                    <div className="flex items-center gap-2">
                                                        <Sparkles className="w-4 h-4 text-green-neon" />
                                                        <p className="text-xs font-black uppercase tracking-wider text-white">Cadeau Ambassadeur 🏆</p>
                                                    </div>
                                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                                        Partagez vos résultats ou invitez un ami à faire le test pour débloquer un code promo de <span className="text-green-neon font-bold">-10%</span> sur votre commande !
                                                    </p>
                                                    <button
                                                        onClick={onShare}
                                                        className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl transition-all text-xs border border-zinc-700"
                                                    >
                                                        <Share2 className="w-3.5 h-3.5" />
                                                        Partager & Débloquer
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-4 relative z-10">
                                                    <div className="flex items-center gap-2 text-green-neon">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        <p className="text-xs font-black uppercase tracking-wider">Lien Partagé !</p>
                                                    </div>
                                                    <div className="bg-zinc-950/50 border border-green-neon/30 rounded-xl p-3 flex items-center justify-between group">
                                                        <div>
                                                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Votre code :</p>
                                                            <p className="text-lg font-black text-green-neon tracking-tighter">BUDTENDER10</p>
                                                        </div>
                                                        <button
                                                            onClick={() => onCopyPromo('BUDTENDER10')}
                                                            className="relative p-2 bg-green-neon/10 hover:bg-green-neon text-green-neon hover:text-black rounded-lg transition-all"
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                            {showPromoTooltip && (
                                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap shadow-xl">
                                                                    Copié !
                                                                </span>
                                                            )}
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] text-zinc-500 text-center italic">Valable sur tout le catalogue Green IA.</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                )}
                            </BudTenderMessage>
                        ))}
                        {isTyping && <BudTenderTypingIndicator />}
                    </AnimatePresence>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-6 sm:p-10 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-3xl shrink-0">
                <div className="max-w-7xl mx-auto w-full space-y-4">
                    <form
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-3 bg-zinc-900 border-2 border-zinc-700 rounded-[2rem] p-2 focus-within:border-green-neon transition-all shadow-2xl"
                    >
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Posez votre question à l'IA ou décrivez vos besoins..."
                            className="flex-1 bg-transparent border-none text-base text-white px-5 py-3 focus:outline-none placeholder:text-zinc-500"
                        />
                        <button
                            type="submit"
                            disabled={!chatInput.trim() || isTyping}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-neon text-black disabled:opacity-20 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-neon/40"
                        >
                            <SendHorizontal className="w-6 h-6" />
                        </button>
                    </form>
                    <div className="flex justify-center items-center px-1">
                        <p className="text-[10px] text-green-neon font-black uppercase tracking-[0.4em] opacity-80">
                            BudTender IA Expérience
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
