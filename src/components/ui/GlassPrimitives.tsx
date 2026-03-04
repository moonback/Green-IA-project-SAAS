import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
}

export function GlassButton({ variant = 'primary', icon, className = '', children, ...props }: GlassButtonProps) {
  const base = 'glass-button';
  const variants = {
    primary: 'glass-button-primary',
    secondary: 'glass-button-secondary',
    ghost: 'glass-button-ghost',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function GlassInput({ label, className = '', ...props }: GlassInputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
      {label && <span>{label}</span>}
      <input className={`glass-input ${className}`} {...props} />
    </label>
  );
}

export function GlassBadge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`glass-badge ${className}`}>{children}</span>;
}

export function GlassPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass-panel ${className}`}>{children}</div>;
}
