import { useState, useCallback, useEffect, useRef } from 'react';
import { Message, Answers } from '../types/budtender';
import { BudTenderSettings, QuizOption } from '../lib/budtenderSettings';
import { SavedPrefs } from '../hooks/useBudTenderMemory';
import { useCartStore } from '../store/cartStore';

export function useBudTenderChat(
    memory: any,
    settings: BudTenderSettings,
    startQuizCallback: () => void,
    skipQuizCallback: () => Promise<void>,
    generateRecommendationsCallback: (answers: Answers, format?: string) => Promise<void>
) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const addBotMessage = useCallback((msg: Partial<Message>, delay?: number) => {
        setIsTyping(true);
        let baseDelay = 1000;
        if (settings?.typing_speed === 'fast') baseDelay = 400;
        if (settings?.typing_speed === 'slow') baseDelay = 2000;

        const ms = delay ?? (baseDelay + Math.random() * (baseDelay / 2));
        setTimeout(() => {
            setMessages((prev) => [...prev, {
                id: Math.random().toString(36).substring(7),
                sender: 'bot',
                ...msg
            }]);
            setIsTyping(false);
        }, ms);
    }, [settings?.typing_speed]);

    const addUserMessage = useCallback((text: string) => {
        setMessages((prev) => [...prev, {
            id: Math.random().toString(36).substring(7),
            sender: 'user',
            text,
        }]);
    }, []);

    const buildWelcomeMessages = useCallback(() => {
        const { isLoggedIn, userName, pastProducts, restockCandidates, savedPrefs } = memory;
        const cartItems = useCartStore.getState().items;
        const currentPath = window.location.pathname;

        let greeting: string;
        if (!isLoggedIn) {
            greeting = settings?.welcome_message || 'Bienvenue !';
        } else if (pastProducts.length > 0) {
            const last = pastProducts[0];
            greeting = `Content de te revoir${userName ? `, ${userName}` : ''} ! 👋 La dernière fois tu avais commandé **${last.product_name}** — tu l'as apprécié ? Je suis là pour te trouver quelque chose d'encore mieux.`;
        } else {
            greeting = `Bienvenue${userName ? `, ${userName}` : ''} ! 🌿 Je suis BudTender, votre conseiller CBD de confiance chez Green IA. Prêt à découvrir votre sélection idéale ?`;
        }

        addBotMessage({ text: greeting }, 600);

        setTimeout(() => {
            if (cartItems.length === 0 && currentPath.includes('/catalogue')) {
                addBotMessage({
                    text: "Je vois que votre panier est encore vide ! 🛒 Souhaitez-vous que je vous guide vers nos best-sellers du moment ?",
                    isOptions: true,
                    stepId: 'proactive',
                    options: [{ label: "Oui, conseiller moi ✨", value: "start_quiz", emoji: "✨" }, { label: "Plus tard", value: "later", emoji: "⏳" }]
                }, 400);
            } else if (currentPath.includes('/catalogue/') && cartItems.length > 0) {
                addBotMessage({
                    text: "Excellent choix ! 🌿 Saviez-vous que ce produit se marie parfaitement avec l'une de nos huiles sublinguales pour un effet renforcé ?",
                    isOptions: true,
                    stepId: 'proactive',
                    options: [{ label: "En savoir plus", value: "upsell_info", emoji: "💡" }, { label: "Non merci", value: "later", emoji: "✖️" }]
                }, 400);
            }
        }, 1200);

        restockCandidates.forEach((candidate: any, i: number) => {
            setTimeout(() => {
                setMessages((prev) => [...prev, {
                    id: Math.random().toString(36).substring(7),
                    sender: 'bot',
                    type: 'restock',
                    text: `Il y a ${candidate.daysSince} jours que tu as commandé ce produit — il est peut-être temps de renouveler ? 🔄`,
                    restockProduct: candidate,
                }]);
            }, 2000 + i * 600);
        });

        if (savedPrefs) {
            const delay = 2000 + restockCandidates.length * 600 + 400;
            setTimeout(() => {
                setMessages((prev) => [...prev, {
                    id: Math.random().toString(36).substring(7),
                    sender: 'bot',
                    type: 'skip-quiz',
                    text: `Je me souviens de tes préférences ! Veux-tu que je te génère de nouvelles recommandations directement, ou préfères-tu refaire le quiz ?`,
                }]);
            }, delay);
        }
    }, [memory, settings, addBotMessage]);

    const resetChat = useCallback(() => {
        setMessages([]);
        setChatInput('');
    }, []);

    // Effect for auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return {
        messages,
        setMessages,
        isTyping,
        setIsTyping,
        chatInput,
        setChatInput,
        scrollRef,
        addBotMessage,
        addUserMessage,
        buildWelcomeMessages,
        resetChat
    };
}
