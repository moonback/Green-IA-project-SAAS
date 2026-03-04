interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] bg-red-500/5 text-red-400 border border-red-500/10 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        Épuisé
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] bg-amber-500/5 text-amber-400 border border-amber-500/10 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
        Série Limitée ({stock})
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 backdrop-blur-md">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
      En Stock
    </span>
  );
}

