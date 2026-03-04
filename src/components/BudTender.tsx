import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Sparkles, RotateCcw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { getBudTenderSettings, BUDTENDER_DEFAULTS } from '../lib/budtenderSettings';
import { getCachedProducts, getCachedSettings } from '../lib/budtenderCache';
import { useCartStore } from '../store/cartStore';
import { useBudTenderMemory } from '../hooks/useBudTenderMemory';
import { useAuthStore } from '../store/authStore';
import { useShopStore } from '../store/shopStore';
import { BudTenderWidget } from './budtender-ui';
import VoiceAdvisor from './VoiceAdvisor';

// Modularized imports
import { Message, Answers } from '../types/budtender';
import { useBudTenderChat } from '../hooks/useBudTenderChat';
import { useBudTenderQuiz } from '../hooks/useBudTenderQuiz';
import { callAI as callAIService } from '../services/budtenderService';
import { scoreProduct, scoreTerpenes, generateAdvice } from '../utils/budtenderScoring';

// Sub-components
import { BudTenderHeader } from './budtender/BudTenderHeader';
import { BudTenderChat } from './budtender/BudTenderChat';
import { BudTenderQuiz } from './budtender/BudTenderQuiz';
import { BudTenderHistory } from './budtender/BudTenderHistory';

type BudTenderTheme = 'default' | 'sleep' | 'stress' | 'energy';

const THEME_CONFIG: Record<BudTenderTheme, { bg: string; accent: string; glow: string; label: string }> = {
    default: {
        bg: 'from-brand-950 via-zinc-900/50 to-emerald-950/30',
        accent: 'emerald',
        glow: 'rgba(16, 185, 129, 0.05)',
        label: 'Zen & Pur'
    },
    sleep: {
        bg: 'from-[#020617] via-[#0f172a]/80 to-[#1e1b4b]/40',
        accent: 'indigo',
        glow: 'rgba(99, 102, 241, 0.1)',
        label: 'Nuit Paisible'
    },
    stress: {
        bg: 'from-[#052e16] via-[#064e3b]/80 to-[#14532d]/40',
        accent: 'emerald',
        glow: 'rgba(16, 185, 129, 0.1)',
        label: 'Vert Brumeux'
    },
    energy: {
        bg: 'from-[#451a03] via-[#78350f]/80 to-[#92400e]/40',
        accent: 'amber',
        glow: 'rgba(245, 158, 11, 0.1)',
        label: 'Énergie Solaire'
    }
};

export default function BudTender() {
    const navigate = useNavigate();
    const { shopSlug } = useParams<{ shopSlug: string }>();
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [pulse, setPulse] = useState(false);
    const [settings, setSettings] = useState(BUDTENDER_DEFAULTS);
    const [isVoiceOpen, setIsVoiceOpen] = useState(false);
    const [isShrink, setIsShrink] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [hasShared, setHasShared] = useState(false);
    const [showPromoTooltip, setShowPromoTooltip] = useState(false);
    const [activeTheme, setActiveTheme] = useState<BudTenderTheme>('default');

    const addItem = useCartStore((s) => s.addItem);
    const openSidebar = useCartStore((s) => s.openSidebar);
    const memory = useBudTenderMemory();
    const hasTriedLoad = useRef(false);

    // ── Recommendations Logic ───
    const generateRecommendations = async (finalAnswers: Answers) => {
        chatHook.setIsTyping(true);
        memory.savePrefs(finalAnswers as any);

        const scored = [...products]
            .map((p) => ({ product: p, score: scoreProduct(p, finalAnswers) + scoreTerpenes(p, quizHook.terpeneSelection) }))
            .sort((a, b) => b.score - a.score)
            .filter((x) => x.score > 0)
            .slice(0, settings.recommendations_count)
            .map((x) => x.product);

        const ctxParts: string[] = [];
        if (memory.pastProducts.length > 0) {
            ctxParts.push(`Derniers achats : ${memory.pastProducts.slice(0, 3).map(p => p.product_name).join(', ')}.`);
        }
        if (quizHook.terpeneSelection.length > 0) {
            ctxParts.push(`Arômes & effets préférés : ${quizHook.terpeneSelection.join(', ')}.`);
        }

        const history = chatHook.messages
            .filter(m => m.text && !m.isResult)
            .map(m => ({
                role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
                content: m.text || ''
            }));

        const aiText = await callAIService(finalAnswers, products, settings, history, ctxParts.join(' '));
        const adviceText = aiText ?? generateAdvice(finalAnswers, quizHook.terpeneSelection);

        chatHook.setMessages((prev) => [...prev, {
            id: Math.random().toString(36).substring(7),
            sender: 'bot',
            text: adviceText,
            isResult: true,
            recommended: scored,
        }]);

        // Log recommendation
        const { user } = useAuthStore.getState();
        if (user && scored.length > 0) {
            const { currentShop } = useShopStore.getState();
            supabase.from('budtender_interactions').insert({
                user_id: user.id,
                interaction_type: 'recommendation',
                recommended_products: scored.map(p => p.id),
                quiz_answers: finalAnswers,
                shop_id: currentShop?.id
            }).then();
        }
        chatHook.setIsTyping(false);
    };

    // ── Hooks Initialization ──
    const chatHook = useBudTenderChat(
        memory,
        settings,
        () => quizHook.startQuiz(),
        async () => {
            const prefs = memory.savedPrefs;
            if (prefs) {
                const answersFromPrefs: Answers = {
                    goal: prefs.goal,
                    experience: prefs.experience,
                    format: prefs.format,
                    budget: prefs.budget,
                };
                quizHook.setAnswers(answersFromPrefs);
                await generateRecommendations(answersFromPrefs);
            }
        },
        generateRecommendations
    );

    const quizHook = useBudTenderQuiz(
        settings,
        chatHook.addBotMessage,
        chatHook.addUserMessage,
        generateRecommendations
    );

    // Update theme based on goal - MUST be after quizHook
    useEffect(() => {
        const goal = quizHook.answers.goal;
        if (goal === 'sommeil' || goal === 'sleep') setActiveTheme('sleep');
        else if (goal === 'stress' || goal === 'anxiété') setActiveTheme('stress');
        else if (goal === 'énergie' || goal === 'focus') setActiveTheme('energy');
        else setActiveTheme('default');
    }, [quizHook.answers.goal]);

    // ── Side Effects ──
    useEffect(() => {
        if (isOpen) getCachedSettings().then(setSettings);
    }, [isOpen]);

    useEffect(() => {
        getCachedProducts().then(setProducts);
        const currentSettings = getBudTenderSettings();
        if (currentSettings.pulse_delay > 0) {
            const t = setTimeout(() => setPulse(true), currentSettings.pulse_delay * 1000);
            return () => clearTimeout(t);
        }
    }, []);

    useEffect(() => {
        if (chatHook.messages.length > 0) {
            memory.saveChatHistory(chatHook.messages);
        }
    }, [chatHook.messages, chatHook.isTyping]);

    useEffect(() => {
        if (!hasTriedLoad.current && memory.chatHistory.length > 0 && chatHook.messages.length === 0) {
            chatHook.setMessages(memory.chatHistory as Message[]);
            hasTriedLoad.current = true;
        } else if (memory.chatHistory.length === 0) {
            hasTriedLoad.current = true;
        }
    }, [memory.chatHistory, chatHook.messages.length]);

    // ── Handlers ──
    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const text = chatHook.chatInput.trim();
        if (!text || chatHook.isTyping) return;

        chatHook.addUserMessage(text);
        memory.logQuestion(text);
        chatHook.setChatInput('');
        chatHook.setIsTyping(true);

        const { currentShop } = useShopStore.getState();
        const history = chatHook.messages.map(m => ({
            role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
            content: m.text || ''
        }));

        try {
            const responseText = await callAIService({}, products, settings, history, '');
            if (responseText) {
                chatHook.addBotMessage({ text: responseText }, 200);
            }
        } catch (err) {
            chatHook.addBotMessage({ text: "Désolé, j'ai une petite erreur de connexion. Pouvez-vous réessayer ?" });
        } finally {
            chatHook.setIsTyping(false);
        }
    };

    const reset = () => {
        memory.clearChatHistory();
        chatHook.resetChat();
        quizHook.resetQuiz();
        setHasShared(false);
        setActiveTheme('default');
        setTimeout(() => chatHook.buildWelcomeMessages(), 100);
    };

    const handleShare = async () => {
        try {
            const shareData = {
                title: 'Green IA CBD',
                text: 'Mon diagnostic CBD BudTender !',
                url: window.location.origin
            };
            if (navigator.share) {
                await navigator.share(shareData);
                setHasShared(true);
            } else {
                navigator.clipboard.writeText(shareData.url);
                setHasShared(true);
                alert("Lien copié !");
            }
        } catch (err) { console.error(err); }
    };

    const copyPromoCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setShowPromoTooltip(true);
        setTimeout(() => setShowPromoTooltip(false), 2000);
    };

    // ── Helpers ──
    const showStartButton = quizHook.stepIndex === -1 && !chatHook.isTyping
        && chatHook.messages.length > 0
        && !chatHook.messages.some(m => m.type === 'skip-quiz' || m.type === 'restock' || m.isOptions);

    const showSkipQuizActions = chatHook.messages.some(m => m.type === 'skip-quiz')
        && quizHook.stepIndex === -1 && !chatHook.isTyping
        && !chatHook.messages.some(m => m.isOptions || m.isResult);

    const theme = THEME_CONFIG[activeTheme];

    return (
        <>
            <AnimatePresence>
                {isOpen && !isShrink ? null : settings.enabled && (
                    <BudTenderWidget
                        onClick={() => isShrink ? setIsShrink(false) : setIsOpen(true)}
                        onVoiceClick={() => setIsVoiceOpen(!isVoiceOpen)}
                        isVoiceActive={isVoiceOpen}
                        pulse={pulse}
                        mode={isShrink ? 'expand' : 'default'}
                    />
                )}
            </AnimatePresence>

            <VoiceAdvisor
                products={products}
                pastProducts={memory.pastProducts}
                savedPrefs={memory.savedPrefs}
                userName={memory.userName}
                isOpen={isVoiceOpen}
                onClose={() => { setIsVoiceOpen(false); setIsShrink(false); }}
                onHangup={() => setIsShrink(true)}
                onAddItem={(p, q) => { addItem(p, q); openSidebar(); setIsShrink(true); }}
                onViewProduct={(p) => {
                    const path = shopSlug ? `/${shopSlug}/catalogue/${p.slug}` : `/catalogue/${p.slug}`;
                    navigate(path);
                    setIsShrink(true);
                }}
                onNavigate={(path) => {
                    const fullPath = shopSlug ? `/${shopSlug}${path}` : path;
                    navigate(fullPath);
                    setIsShrink(false);
                }}
                showUI={isOpen}
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={isShrink ? { opacity: 0, scale: 0.8, y: 100, pointerEvents: 'none' } : { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className={`fixed inset-0 z-[9999] bg-brand-950 flex flex-col overflow-hidden origin-bottom-right transition-colors duration-1000`}
                    >
                        {/* Dynamic Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} transition-colors duration-1000 opacity-60`} />
                        <div
                            className="absolute inset-0 opacity-30 mix-blend-overlay"
                            style={{
                                backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.glow}, transparent 70%)`,
                                transition: 'all 1s ease'
                            }}
                        />

                        <div className="relative z-10 flex flex-col h-full bg-zinc-950/20 backdrop-blur-[2px]">
                            <BudTenderHeader
                                isLoggedIn={memory.isLoggedIn}
                                userName={memory.userName}
                                isHistoryOpen={isHistoryOpen}
                                onToggleHistory={() => {
                                    setIsHistoryOpen(!isHistoryOpen);
                                    if (!isHistoryOpen) memory.fetchAllSessions();
                                }}
                                onVoiceClick={() => setIsVoiceOpen(true)}
                                onReset={reset}
                                onClose={() => setIsOpen(false)}
                                themeLabel={theme.label}
                            />

                            <BudTenderHistory
                                isHistoryOpen={isHistoryOpen}
                                onClose={() => setIsHistoryOpen(false)}
                                isLoggedIn={memory.isLoggedIn}
                                isLoading={memory.isHistoryLoading}
                                sessions={memory.allChatSessions}
                                onSelectSession={(s) => {
                                    chatHook.setMessages(s.messages as any);
                                    setIsHistoryOpen(false);
                                }}
                            />

                            {/* Logic-heavy part of the chat area */}
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <BudTenderChat
                                    messages={chatHook.messages}
                                    isTyping={chatHook.isTyping}
                                    chatInput={chatHook.chatInput}
                                    setChatInput={chatHook.setChatInput}
                                    handleSendMessage={handleSendMessage}
                                    handleAnswer={quizHook.handleAnswer}
                                    scrollRef={chatHook.scrollRef}
                                    onProductClick={(p) => {
                                        const path = shopSlug ? `/${shopSlug}/catalogue/${p.slug}` : `/catalogue/${p.slug}`;
                                        navigate(path);
                                        setIsShrink(true);
                                    }}
                                    onAddToCart={(p) => { addItem(p); openSidebar(); setIsShrink(true); }}
                                    onShare={handleShare}
                                    onCopyPromo={copyPromoCode}
                                    hasShared={hasShared}
                                    showPromoTooltip={showPromoTooltip}
                                    currentStepIndex={quizHook.stepIndex}
                                    quizSteps={settings.quiz_steps}
                                    answers={quizHook.answers}
                                />

                                <BudTenderQuiz
                                    awaitingTerpene={quizHook.awaitingTerpene}
                                    terpeneSelection={quizHook.terpeneSelection}
                                    setTerpeneSelection={quizHook.setTerpeneSelection}
                                    confirmTerpeneSelection={quizHook.confirmTerpeneSelection}
                                />

                                {/* CTAs */}
                                <div className="max-w-7xl mx-auto w-full px-5 pointer-events-none">
                                    {showStartButton && (
                                        <div className="flex justify-center py-10 pointer-events-auto">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                onClick={quizHook.startQuiz}
                                                className="bg-emerald-600 text-white font-black px-12 py-5 rounded-2xl flex items-center gap-3 shadow-2xl shadow-emerald-500/20 hover:bg-emerald-500 transition-colors"
                                            >
                                                <Sparkles className="w-5 h-5 text-emerald-300" />
                                                Lancer mon diagnostic personnalisé
                                            </motion.button>
                                        </div>
                                    )}

                                    {showSkipQuizActions && (
                                        <div className="flex justify-center gap-4 flex-wrap py-6 pointer-events-auto">
                                            <motion.button
                                                onClick={async () => {
                                                    const prefs = memory.savedPrefs;
                                                    if (prefs) {
                                                        chatHook.addBotMessage({ text: "✨ **Recherche en cours...**" }, 200);
                                                        await generateRecommendations(prefs as any);
                                                    }
                                                }}
                                                className="bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 shadow-xl hover:bg-emerald-500 transition-colors"
                                            >
                                                <Sparkles className="w-4 h-4 text-emerald-300" />
                                                Recommandations rapides
                                            </motion.button>
                                            <motion.button
                                                onClick={() => { memory.clearPrefs(); quizHook.startQuiz(); }}
                                                className="bg-zinc-800 text-zinc-300 font-bold px-8 py-4 rounded-2xl border border-zinc-700 flex items-center gap-2 hover:bg-zinc-700 transition-colors"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                                Refaire le quiz
                                            </motion.button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
