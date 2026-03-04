import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Coins, X, Award, Star, Crown, ChevronRight, Gift } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useShopPath } from '../hooks/useShopPath';

interface LoyaltyWidgetProps {
    primaryColor?: string;
}

const TIERS = [
    { name: 'Bronze', minPoints: 0, maxPoints: 499, icon: Award, color: '#b45309' },
    { name: 'Silver', minPoints: 500, maxPoints: 1499, icon: Star, color: '#a1a1aa' },
    { name: 'Gold', minPoints: 1500, maxPoints: null, icon: Crown, color: '#eab308' },
];

function getCurrentTier(points: number) {
    for (let i = TIERS.length - 1; i >= 0; i--) {
        if (points >= TIERS[i].minPoints) return TIERS[i];
    }
    return TIERS[0];
}

function getNextTier(points: number) {
    const current = getCurrentTier(points);
    const idx = TIERS.indexOf(current);
    return idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
}

export default function LoyaltyWidget({ primaryColor = '#39ff14' }: LoyaltyWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, profile } = useAuthStore();
    const sp = useShopPath();

    if (!user || !profile) return null;

    const points = profile.loyalty_points ?? 0;
    const currentTier = getCurrentTier(points);
    const nextTier = getNextTier(points);
    const progressPercent = nextTier
        ? Math.min(Math.round(((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100), 100)
        : 100;
    const pointsToNext = nextTier ? nextTier.minPoints - points : 0;
    const TierIcon = currentTier.icon;

    return (
        <>
            {/* Floating trigger */}
            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="fixed left-4 bottom-28 z-40 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-black shadow-xl transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: '#eab308' }}
                aria-label="Mes points fidélité"
            >
                <Coins className="w-4 h-4" />
                <span className="font-black">{points}</span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70">pts</span>
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        />

                        {/* Widget panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed left-4 bottom-20 z-50 w-80 bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="relative p-5 border-b border-white/5">
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{ background: `radial-gradient(circle at top right, #eab308, transparent)` }}
                                />
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#eab30820' }}>
                                            <TierIcon className="w-5 h-5" style={{ color: currentTier.color }} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Statut {currentTier.name}</p>
                                            <p className="text-sm font-black text-white">{points} <span className="text-yellow-500">pts</span></p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-zinc-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Points display */}
                            <div className="p-5 space-y-4">
                                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4 text-center space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-yellow-600">Solde actuel</p>
                                    <p className="text-4xl font-black text-yellow-500 leading-none">{points}</p>
                                    <p className="text-xs text-yellow-600/70">= {Math.floor(points / 100)} bon(s) de 5€</p>
                                </div>

                                {/* Progress to next tier */}
                                {nextTier && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span style={{ color: currentTier.color }}>{currentTier.name}</span>
                                            <span className="text-zinc-500">{nextTier.name} dans {pointsToNext} pts</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercent}%` }}
                                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: nextTier ? nextTier.color : currentTier.color }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Rewards */}
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Avantages disponibles</p>
                                    {currentTier.name === 'Gold' ? (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                            <Gift className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                            <p className="text-xs text-yellow-400 font-bold">Livraison offerte + -15% VIP</p>
                                        </div>
                                    ) : currentTier.name === 'Silver' ? (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-300/5 border border-zinc-300/20">
                                            <Gift className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                                            <p className="text-xs text-zinc-300 font-bold">Livraison offerte dès 30€</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-600/5 border border-amber-600/20">
                                            <Gift className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                            <p className="text-xs text-amber-500 font-bold">1 point par euro dépensé</p>
                                        </div>
                                    )}
                                </div>

                                {/* CTA */}
                                <Link
                                    to={sp('/compte/fidelite')}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-[1.02]"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Voir mon historique
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
