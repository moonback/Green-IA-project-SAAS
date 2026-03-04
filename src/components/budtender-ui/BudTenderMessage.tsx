import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type MessageType = 'standard' | 'restock' | 'skip-quiz' | 'terpene';

export interface BudTenderMessageProps {
    /** Who sent the message */
    sender: 'bot' | 'user';
    /** The text content of the message */
    text?: string;
    /** The message type (controls styling nuances) */
    type?: MessageType;
    /** Whether the bot is currently typing (used to visually mute older messages) */
    isTyping?: boolean;
    /** Optional children rendered below the text bubble (cards, options, etc.) */
    children?: React.ReactNode;
}

/**
 * A single chat bubble for either the bot or the user.
 */
export default function BudTenderMessage({
    sender,
    text,
    type: _type,
    isTyping: _isTyping,
    children,
}: BudTenderMessageProps) {

    // Custom components for Markdown rendering
    const markdownComponents = {
        p: ({ children }: { children: React.ReactNode }) => <p className="mb-3 last:mb-0">{children}</p>,
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className={`font-black ${sender === 'bot' ? 'text-emerald-400' : 'text-black opacity-90'}`}>
                {children}
            </strong>
        ),
        em: ({ children }: { children: React.ReactNode }) => <em className="italic opacity-90">{children}</em>,
        ul: ({ children }: { children: React.ReactNode }) => <ul className="list-disc ml-4 my-3 space-y-1.5">{children}</ul>,
        ol: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal ml-4 my-3 space-y-1.5">{children}</ol>,
        li: ({ children }: { children: React.ReactNode }) => <li className="leading-relaxed">{children}</li>,
    };

    return (
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3 sm:gap-4`}>
            {sender === 'bot' && (
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-1 flex-shrink-0 shadow-[0_4px_15px_rgba(16,185,129,0.15)]">
                    <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                </div>
            )}
            <div className={`max-w-[85%] sm:max-w-[80%] space-y-3 sm:space-y-4 ${sender === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Text bubble */}
                {text && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`px-5 py-4 sm:px-7 sm:py-5 rounded-[1.75rem] text-sm sm:text-base leading-relaxed shadow-xl ${sender === 'user'
                            ? 'bg-emerald-600 text-white font-bold rounded-br-none shadow-emerald-900/20'
                            : 'text-zinc-100 font-medium rounded-bl-none glass-panel'
                            }`}
                        style={sender === 'bot' ? {
                            backgroundColor: 'rgba(24, 24, 27, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        } : {}}
                    >
                        {sender === 'bot' ? (
                            <ReactMarkdown components={markdownComponents}>
                                {text}
                            </ReactMarkdown>
                        ) : (
                            text
                        )}
                    </motion.div>
                )}

                {/* Slot for additional content */}
                {children}
            </div>
        </div>
    );
}
