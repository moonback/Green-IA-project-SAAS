import { Product } from '../lib/types';
import { QuizOption } from '../lib/budtenderSettings';

export interface TerpeneChip {
    label: string;
    emoji: string;
    group: 'arome' | 'effet';
}

export type Answers = Record<string, string>;

export type MessageType = 'standard' | 'restock' | 'skip-quiz' | 'terpene';

export interface Message {
    id: string;
    sender: 'bot' | 'user';
    text?: string;
    type?: MessageType;
    isResult?: boolean;
    isOptions?: boolean;
    options?: QuizOption[];
    stepId?: string;
    recommended?: Product[];
    restockProduct?: {
        product_id: string;
        product_name: string;
        slug: string | null;
        image_url: string | null;
        price: number;
        daysSince: number;
    };
}
