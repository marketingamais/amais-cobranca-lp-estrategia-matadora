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
  variant?: 'default' | 'blue';
  noPadding?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  glowTopRight = false, 
  variant = 'default',
  noPadding = false 
}: GlassCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border-[0.4px] transition-all duration-500",
      
      // Estilo Default
      variant === 'default' && "bg-bg-card border-border-subtle shadow-[0_8px_32px_rgba(0,0,0,0.04)]",
      
      // Estilo Blue (Glow Intenso SEM fundo sólido)
      variant === 'blue' && "bg-bg-card border-brand-primary/60 shadow-[0_0_50px_rgba(0,85,254,0.30)]",
      
      // Mobile-only intensification for blue variant
      variant === 'blue' && "sm:bg-bg-card sm:border-border-subtle sm:shadow-none",

      className
    )}>
      {/* Internal Glassmorphic Glow */}
      {(glowTopRight || variant === 'blue') && (
        <div 
          className={cn(
            "absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full pointer-events-none transition-opacity duration-500",
            variant === 'blue' ? "bg-brand-primary opacity-40 sm:opacity-20" : "bg-brand-primary opacity-30"
          )}
          style={{ filter: 'blur(80px)' }}
        />
      )}
      
      {/* Content wrapper */}
      <div className={cn(
        "relative z-10 w-full h-full",
        !noPadding && "p-6 md:p-8"
      )}>
        {children}
      </div>
    </div>
  );
}
