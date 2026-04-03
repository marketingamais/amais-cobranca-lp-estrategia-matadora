'use client';

import { m } from 'framer-motion';
import dynamic from 'next/dynamic';

const RemotionPlayer = dynamic(
  () => import('@/remotion/RemotionPlayer').then((m) => m.RemotionPlayer),
  { ssr: false, loading: () => <div className="w-full aspect-video bg-black/20 rounded-xl animate-pulse" /> }
);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = (d = 0.09) => ({
  show: { transition: { staggerChildren: d, delayChildren: 0.05 } },
});

function Reveal({
  children,
  className = '',
  delay = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      variants={stagger(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </m.div>
  );
}

export function ContextSection() {
  return (
    <div id="diagnostico" className="relative z-10 bg-[#f4f4f4] text-[#05050a] py-24 border-y border-black/5">
      <Reveal className="grid lg:grid-cols-2 gap-20 items-stretch max-w-[1440px] mx-auto px-6 xl:px-0">
        <m.div 
          variants={fadeLeft} 
          className="w-full relative min-h-[350px] md:min-h-[500px] lg:min-h-full rounded-3xl overflow-hidden border border-black/5 shadow-2xl bg-white"
        >
          <RemotionPlayer />
        </m.div>
        <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
          <m.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-sm font-bold text-brand-primary">
            O cenário atual
          </m.div>
          <m.h2 variants={fadeUp} className="text-[48px] md:text-[64px] lg:text-[72px] font-bold text-black tracking-tight leading-[1.1] mb-6">
            O Impacto da <br className="hidden lg:block" />
            <span className="text-brand-primary">Inadimplência</span>
          </m.h2>
          <m.div variants={stagger(0.07)} className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed">
            {[
              'A inadimplência tem sido um dos principais desafios financeiros das escolas privadas.',
              'Mais do que o valor em aberto, o que impacta o resultado é a forma como a cobrança é conduzida.',
              'Amais está realizando um mapeamento com escolas de Recife para entender como lidar com esse cenário.',
              'Esta iniciativa consultiva visa gerar uma visão clara sobre oportunidades reais de melhoria.',
            ].map((p, i) => (
              <m.p key={i} variants={fadeIn} className="max-w-xl lg:max-w-none">{p}</m.p>
            ))}
          </m.div>
        </div>
      </Reveal>
    </div>
  );
}
