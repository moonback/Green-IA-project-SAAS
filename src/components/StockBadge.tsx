interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] bg-red-500/10 text-red-400 border border-red-500/20">
        <span className="w-1 h-1 rounded-full bg-red-400" />
        Sold Out
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] bg-orange-500/10 text-orange-400 border border-orange-500/20">
        <span className="w-1 h-1 rounded-full bg-orange-400" />
        Rare ({stock})
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] bg-primary/10 text-primary border border-primary/20">
      <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
      Libéré
    </span>
  );
}

