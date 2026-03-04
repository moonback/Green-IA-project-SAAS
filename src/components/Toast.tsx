import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

const ICONS = {
  success: <CheckCircle className="h-4 w-4 shrink-0 text-emerald-300" />,
  error: <XCircle className="h-4 w-4 shrink-0 text-red-300" />,
  info: <Info className="h-4 w-4 shrink-0 text-sky-300" />,
};

const BG = {
  success: 'border-emerald-300/30 bg-emerald-300/10',
  error: 'border-red-300/30 bg-red-400/10',
  info: 'border-sky-300/30 bg-sky-400/10',
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex max-w-sm flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`pointer-events-auto glass-panel flex items-center gap-3 rounded-2xl px-5 py-3.5 ${BG[toast.type]}`}
          >
            {ICONS[toast.type]}
            <p className="flex-1 text-sm font-medium text-white">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="rounded-md p-1 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
