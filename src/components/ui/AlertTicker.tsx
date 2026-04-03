'use client';

import { m } from 'framer-motion';

export const AlertTicker = () => {
  return (
    <div className="w-full bg-brand-primary py-4 overflow-hidden relative z-20 shadow-[0_0_30px_rgba(11,92,255,0.4)] flex items-center border-y border-white/10">
      <m.div
        animate={{ x: [0, "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        className="flex w-max items-center"
      >
        <div className="flex items-center gap-12 whitespace-nowrap px-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-shrink-0 flex items-center gap-12 text-white font-bold tracking-[0.2em] text-sm uppercase">
              <span>Diagnóstico Presencial</span>
              <span className="opacity-40 text-xl">•</span>
              <span>Recife</span>
              <span className="opacity-40 text-xl">•</span>
              <span className="text-white">Últimas Vagas</span>
              <span className="opacity-40 text-xl">•</span>
              <span className="text-white">Março/Abril 2026</span>
              <span className="opacity-40 text-xl">•</span>
            </div>
          ))}
        </div>
      </m.div>
    </div>
  );
};
