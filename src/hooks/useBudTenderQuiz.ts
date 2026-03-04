import { useState } from 'react';
import { Answers, Message } from '../types/budtender';
import { BudTenderSettings, QuizOption } from '../lib/budtenderSettings';

export function useBudTenderQuiz(
    settings: BudTenderSettings,
    addBotMessage: (msg: Partial<Message>, delay?: number) => void,
    addUserMessage: (text: string) => void,
    generateRecommendations: (answers: Answers) => Promise<void>
) {
    const [stepIndex, setStepIndex] = useState(-1);
    const [answers, setAnswers] = useState<Answers>({});
    const [terpeneSelection, setTerpeneSelection] = useState<string[]>([]);
    const [awaitingTerpene, setAwaitingTerpene] = useState(false);

    const startQuiz = () => {
        setStepIndex(0);
        const firstStep = settings?.quiz_steps[0];
        if (firstStep) {
            addBotMessage({
                text: firstStep.question,
                isOptions: true,
                options: firstStep.options,
                stepId: firstStep.id,
            });
        }
    };

    const handleAnswer = async (option: QuizOption, stepId: string) => {
        addUserMessage(option.label);

        // Proactive Actions
        if (option.value === 'start_quiz') {
            startQuiz();
            return;
        }
        if (option.value === 'upsell_info') {
            addBotMessage({ text: "Excellent réflexe ! Mixer fleurs et huiles permet de bénéficier de l'effet d'entourage complet. Voici mes meilleures recommandations d'huiles pour compléter votre panier :" }, 400);
            await generateRecommendations({ ...answers, format: 'oil' });
            return;
        }
        if (option.value === 'later') {
            addBotMessage({ text: "Pas de souci ! N'hésitez pas à me solliciter si vous avez besoin d'un conseil plus tard. 😊" }, 400);
            return;
        }

        const newAnswers = { ...answers, [stepId]: option.value };
        setAnswers(newAnswers);

        const nextIndex = stepIndex + 1;

        // Inject terpene step for experts
        if (stepId === 'experience' && option.value === 'expert') {
            setStepIndex(nextIndex); // move to next (format) — will resume after terpene
            setAwaitingTerpene(true);
            setTerpeneSelection([]);
            addBotMessage({
                type: 'terpene',
                text: '🧪 En tant que connaisseur, affinez votre profil ! Sélectionnez vos arômes et effets préférés (optionnel) :',
            });
            return;
        }

        if (nextIndex < (settings?.quiz_steps?.length || 0)) {
            setStepIndex(nextIndex);
            const nextStep = settings.quiz_steps[nextIndex];
            addBotMessage({
                text: nextStep.question,
                isOptions: true,
                options: nextStep.options,
                stepId: nextStep.id,
            });
        } else {
            await generateRecommendations(newAnswers);
        }
    };

    const confirmTerpeneSelection = () => {
        setAwaitingTerpene(false);
        if (terpeneSelection.length > 0) {
            addUserMessage(`Arômes & effets : ${terpeneSelection.join(', ')} ✨`);
        } else {
            addUserMessage('Je passe cette étape →');
        }

        const nextStep = settings?.quiz_steps[stepIndex];
        if (nextStep) {
            addBotMessage({
                text: nextStep.question,
                isOptions: true,
                options: nextStep.options,
                stepId: nextStep.id,
            });
        } else {
            generateRecommendations(answers);
        }
    };

    const resetQuiz = () => {
        setStepIndex(-1);
        setAnswers({});
        setTerpeneSelection([]);
        setAwaitingTerpene(false);
    };

    return {
        stepIndex,
        setStepIndex,
        answers,
        setAnswers,
        terpeneSelection,
        setTerpeneSelection,
        awaitingTerpene,
        setAwaitingTerpene,
        startQuiz,
        handleAnswer,
        confirmTerpeneSelection,
        resetQuiz
    };
}
