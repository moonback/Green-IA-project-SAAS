import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}: QuantitySelectorProps) {
  const btnClass =
    size === 'sm'
      ? 'glass-button glass-button-ghost h-7 w-7 rounded-lg px-0 py-0 disabled:opacity-40 disabled:cursor-not-allowed'
      : 'glass-button glass-button-ghost h-9 w-9 rounded-xl px-0 py-0 disabled:opacity-40 disabled:cursor-not-allowed';

  const iconClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const textClass = size === 'sm' ? 'w-6 text-sm' : 'w-8 text-base';

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-1.5 py-1 backdrop-blur-xl">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= min}
        className={btnClass}
        aria-label="Diminuer la quantité"
      >
        <Minus className={iconClass} />
      </button>
      <span className={`${textClass} text-center font-semibold text-white`}>
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= max}
        className={btnClass}
        aria-label="Augmenter la quantité"
      >
        <Plus className={iconClass} />
      </button>
    </div>
  );
}
