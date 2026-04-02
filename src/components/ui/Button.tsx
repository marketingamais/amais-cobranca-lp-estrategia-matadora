'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MotionButtonProps = Omit<HTMLMotionProps<"button">, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"> & {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    
    const variants = {
      primary: "bg-brand-primary text-text-primary hover:bg-brand-primary/80 border border-brand-primary/50 shadow-[0_0_20px_rgba(119,51,255,0.4)]",
      outline: "bg-transparent border border-border-subtle text-text-primary hover:bg-surface-hover",
      ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover/50"
    };

    const sizes = {
      sm: "px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm whitespace-nowrap",
      md: "px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-medium whitespace-nowrap",
      lg: "px-6 py-4 md:px-8 md:py-5 text-base md:text-lg font-bold whitespace-nowrap"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-colors font-body cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
