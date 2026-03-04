import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ShopAnnouncementProps {
    isVisible: boolean;
    onClose: () => void;
    primaryColor: string;
}

export function ShopAnnouncement({ isVisible, onClose, primaryColor }: ShopAnnouncementProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-black relative flex items-center justify-center overflow-hidden z-[60]"
                    style={{ backgroundColor: primaryColor }}
                >
                    <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-center w-full max-w-7xl mx-auto pr-10">
                        <span className="inline-block animate-pulse mr-2">✦</span>
                        CE PROJET EST EN VENTE : CONTACTEZ-NOUS POUR PLUS D'INFORMATIONS
                        <span className="inline-block animate-pulse ml-2">✦</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute right-4 p-1.5 hover:bg-black/10 rounded-full transition-colors group"
                        aria-label="Fermer la bannière"
                    >
                        <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
