import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, CheckCircle2, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useShopStore } from '../store/shopStore';

export interface AppliedPromo {
  code: string;
  description: string | null;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  discount_amount: number;
}

interface PromoCodeInputProps {
  subtotal: number;
  onApply: (promo: AppliedPromo | null) => void;
  applied: AppliedPromo | null;
}

export default function PromoCodeInput({ subtotal, onApply, applied }: PromoCodeInputProps) {
  const { currentShop } = useShopStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    const code = input.trim().toUpperCase();
    if (!code) return;
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .eq('shop_id', currentShop?.id)
      .single();

    setLoading(false);

    if (fetchError || !data) {
      setError('Code promo invalide ou inexistant.');
      return;
    }
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      setError('Ce code promo a expiré.');
      return;
    }
    if (data.max_uses !== null && data.uses_count >= data.max_uses) {
      setError("Ce code promo a atteint son nombre maximum d'utilisations.");
      return;
    }
    if (subtotal < data.min_order_value) {
      setError(`Ce code nécessite un minimum de commande de ${parseFloat(data.min_order_value).toFixed(2)} €.`);
      return;
    }

    const discountAmount =
      data.discount_type === 'percent'
        ? Math.min(subtotal, (subtotal * parseFloat(data.discount_value)) / 100)
        : Math.min(subtotal, parseFloat(data.discount_value));

    onApply({
      code: data.code,
      description: data.description,
      discount_type: data.discount_type as 'percent' | 'fixed',
      discount_value: parseFloat(data.discount_value),
      discount_amount: parseFloat(discountAmount.toFixed(2)),
    });

    setInput('');
  };

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="mb-3 flex items-center gap-2">
        <Tag className="h-4 w-4 text-emerald-300" />
        <h3 className="text-sm font-semibold text-white">Code promo</h3>
      </div>

      <AnimatePresence mode="wait">
        {applied ? (
          <motion.div
            key="applied"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center justify-between gap-3 rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
              <div>
                <p className="font-mono text-sm font-bold tracking-wider text-emerald-200">{applied.code}</p>
                {applied.description && <p className="mt-0.5 text-xs text-zinc-300">{applied.description}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-emerald-200">−{applied.discount_amount.toFixed(2)} €</span>
              <button
                onClick={() => {
                  onApply(null);
                  setError('');
                }}
                aria-label="Retirer le code promo"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/30 text-zinc-400 transition hover:border-red-300/40 hover:text-red-300"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="input" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value.toUpperCase());
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                placeholder="EX : WEEDKEND-20"
                className="glass-input flex-1 font-mono"
              />
              <button
                onClick={handleApply}
                disabled={loading || !input.trim()}
                className="glass-button glass-button-primary rounded-xl px-4 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Appliquer'}
              </button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-xs text-red-300"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
