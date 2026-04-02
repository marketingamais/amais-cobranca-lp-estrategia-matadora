import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowTopRight?: boolean;
}

export function GlassCard({ children, className, glowTopRight = false }: GlassCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-bg-card border-[0.4px] border-border-subtle shadow-[0_8px_32px_rgba(0,0,0,0.04)]",
      className
    )}>
      {/* Internal Glassmorphic Glow */}
      {glowTopRight && (
        <div 
          className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] bg-brand-primary rounded-full opacity-30 pointer-events-none"
          style={{ filter: 'blur(80px)' }}
        />
      )}
      
      {/* Content wrapper to stay above the glow */}
      <div className="relative z-10 w-full h-full p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
