import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { getQuizPrompt, getChatPrompt } from '../lib/budtenderPrompts';
import { BudTenderSettings } from '../lib/budtenderSettings';
import { useAuthStore } from '../store/authStore';
import { useShopStore } from '../store/shopStore';
import { Answers } from '../types/budtender';
import { scoreProduct } from '../utils/budtenderScoring';

export async function callAI(
    answers: Answers,
    products: Product[],
    settings: BudTenderSettings,
    history: { role: 'user' | 'assistant'; content: string }[] = [],
    context?: string
): Promise<string | null> {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || !settings.ai_enabled) return null;

    // RAG: Select the most relevant products to send to the AI
    // For the quiz, we send the top scored locally + some featured ones
    const topScored = [...products]
        .map(p => ({ p, s: scoreProduct(p, answers) }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 15);

    const catalog = topScored
        .map(({ p }) => {
            const aromas = (p.attributes?.aromas ?? []).join(', ');
            const benefits = (p.attributes?.benefits ?? []).join(', ');
            return `- ${p.name} (${p.category?.slug}, CBD ${p.cbd_percentage ?? '?'}%, ${p.price}€). ${p.description ?? ''} ${aromas ? 'Arômes: ' + aromas : ''} ${benefits ? 'Effets: ' + benefits : ''}`;
        })
        .join('\n');

    const { currentShop } = useShopStore.getState();

    const systemPromptMessage = {
        role: 'system',
        content: getQuizPrompt(
            answers,
            settings.quiz_steps,
            catalog,
            currentShop?.name || 'Green IA CBD',
            currentShop?.settings?.ai_instructions,
            context
        )
    };

    const messages = [
        systemPromptMessage,
        ...history
    ];

    // Ensure the last message is from the user if we're asking for final advice
    if (messages[messages.length - 1].role !== 'user') {
        messages.push({ role: 'user', content: "Basé sur mes réponses et notre échange, donne-moi tes conseils finaux." });
    }

    const modelToUse = settings.ai_model || 'google/gemini-2.0-flash-lite-preview-02-05:free';

    // --- SAAS: Check Quota ---
    if (currentShop) {
        const { data: hasQuota, error: quotaErr } = await supabase.rpc('check_ai_quota', { p_shop_id: currentShop.id });
        if (quotaErr) {
            console.error('[BudTender Quota callAI] Error:', quotaErr);
        } else if (hasQuota === false) {
            throw new Error("L'IA est temporairement indisponible (quota atteint).");
        }
    }

    console.log('[BudTender callAI] Model:', modelToUse);

    try {
        const res = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'X-Title': 'Green IA BudTender',
                    'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
                },
                body: JSON.stringify({
                    model: modelToUse,
                    messages,
                    temperature: settings.ai_temperature,
                    max_tokens: settings.ai_max_tokens,
                }),
            }
        );

        const json = await res.json();

        if (!res.ok) {
            console.error('[BudTender callAI] API Error:', {
                status: res.status,
                statusText: res.statusText,
                body: json
            });
            return null;
        }

        const responseText = json?.choices?.[0]?.message?.content ?? null;

        // --- SAAS: Log Usage ---
        if (currentShop && responseText) {
            supabase.from('ai_usage_logs').insert({
                shop_id: currentShop.id,
                user_id: useAuthStore.getState().user?.id,
                interaction_type: 'quiz',
                tokens_estimate: responseText.length / 4
            }).then();
        }

        return responseText;
    } catch (err) {
        console.error('[BudTender callAI] Fetch Error:', err);
        return null;
    }
}
