'use client';

import { LazyMotion, domMax } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * MotionProvider — Centraliza o LazyMotion para reduzir o bundle inicial.
 * Usamos 'domMax' para suportar animações complexas, mas carregadas sob demanda.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
