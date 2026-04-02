'use client';

import { memo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AmbientGlowProps {
  className?: string;
  opacity?: 'subtle' | 'medium' | 'high';
}

export const AmbientGlow = memo(function AmbientGlow({ 
  className, 
  opacity = 'medium' 
}: AmbientGlowProps) {
  
  // Massive 300px blur diffuses the light so much that we native opacities 
  // must be high to even be visible against the #05050a background.
  const opacityValues = {
    subtle: 0.50,
    medium: 0.70,
    high: 0.90
  };

  const baseOpacity = opacityValues[opacity];

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Orb 1 - Top Left wash */}
      <motion.div 
        animate={{ 
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "5%", "-5%", "0%"],
          scale: [1, 1.1, 0.95, 1] 
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#0b5cff]"
        style={{ 
          opacity: baseOpacity,
          filter: "blur(200px)",
          WebkitFilter: "blur(200px)",
          willChange: "transform, filter"
        }}
      />
      {/* Orb 2 - Bottom Right wash */}
      <motion.div 
        animate={{ 
          x: ["0%", "-5%", "5%", "0%"],
          y: ["0%", "-5%", "5%", "0%"],
          scale: [1, 0.95, 1.1, 1] 
        }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#0055ff]"
        style={{ 
          opacity: baseOpacity * 0.8,
          filter: "blur(220px)",
          WebkitFilter: "blur(220px)",
          willChange: "transform, filter"
        }}
      />
    </div>
  );
});
