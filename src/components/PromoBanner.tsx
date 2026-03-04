import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Truck, Tag, Gift } from 'lucide-react';

interface PromoBannerProps {
    text?: string;
    bgColor?: string;
    textColor?: string;
    icon?: 'sparkles' | 'truck' | 'tag' | 'gift';
    link?: string;
}

const ICONS = {
    sparkles: Sparkles,
    truck: Truck,
    tag: Tag,
    gift: Gift,
};

export default function PromoBanner({
    text,
    bgColor = '#39ff14',
    textColor = '#000000',
    icon = 'sparkles',
    link,
}: PromoBannerProps) {
    const [isDismissed, setIsDismissed] = useState(false);

    // Restore from sessionStorage so it stays hidden on refresh within same session
    useEffect(() => {
        if (sessionStorage.getItem('promo_banner_dismissed') === 'true') {
            setIsDismissed(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem('promo_banner_dismissed', 'true');
    };

    if (!text || isDismissed) return null;

    const Icon = ICONS[icon] || Sparkles;

    const content = (
        <div className="flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-bold">
            <Icon className="w-4 h-4 flex-shrink-0 opacity-80" />
            <span className="text-center leading-tight">{text}</span>
        </div>
    );

    return (
        <AnimatePresence>
            {!isDismissed && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-50 overflow-hidden"
                    style={{ backgroundColor: bgColor, color: textColor }}
                >
                    {link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:opacity-90 transition-opacity"
                        >
                            {content}
                        </a>
                    ) : (
                        content
                    )}

                    {/* Dismiss button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-black/10"
                        aria-label="Fermer"
                        style={{ color: textColor }}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
