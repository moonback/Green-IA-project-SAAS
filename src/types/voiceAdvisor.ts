import { VoiceState } from '../hooks/useGeminiLiveVoice';

export const STATUS: Record<VoiceState, string> = {
    idle: 'Démarrage du chat vocal…',
    connecting: 'Connexion en cours…',
    listening: 'Je vous écoute…',
    speaking: 'BudTender répond…',
    error: 'Erreur de connexion',
};

export const STATUS_SUB: Record<VoiceState, string> = {
    idle: 'Votre conseiller vocal IA est prêt',
    connecting: 'Établissement de la connexion sécurisée',
    listening: 'Parlez naturellement, je vous comprends',
    speaking: 'Analyse et réponse en cours…',
    error: 'Vérifiez votre connexion et réessayez',
};
