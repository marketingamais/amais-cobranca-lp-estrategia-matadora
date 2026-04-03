'use client';

import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { CheckCircle } from '@phosphor-icons/react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
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

export function BenefitsSection() {
  return (
    <div className="relative z-10 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />
      <section className="relative z-10 max-w-[1120px] mx-auto px-6 xl:px-0">
        <GlassCard variant="blue" className="p-8 md:p-16 relative overflow-hidden border-brand-primary/60 shadow-[0_0_60px_rgba(0,85,254,0.40)]">
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <Reveal>
                <m.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  O que sua escola recebe
                </m.h2>
                <m.p variants={fadeIn} className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-xl">
                  Um panorama detalhado e estratégico gerado por especialistas para identificar falhas e estancar a perda de receita da sua instituição.
                </m.p>
                <m.div variants={fadeIn} className="w-16 h-1 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(11,92,255,0.7)]" />
              </Reveal>
            </div>

            <div className="w-full">
              <Reveal delay={0.1}>
                <div className="space-y-4">
                  {[
                    'Diagnóstico gratuito da inadimplência',
                    'Análise dos processos atuais',
                    'Recomendações práticas de melhoria',
                    'Visão externa especializada',
                    'Conversa com especialista em cobrança',
                  ].map((item, i) => (
                    <m.div
                      key={i}
                      variants={fadeRight}
                      className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-brand-primary/40 transition-all duration-300 shadow-lg group text-center sm:text-left"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-success/10 flex items-center justify-center group-hover:bg-accent-success/20 transition-colors">
                        <CheckCircle size={28} weight="fill" className="text-accent-success drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                      </div>
                      <span className="font-bold text-base md:text-lg text-text-primary group-hover:text-white transition-colors">{item}</span>
                    </m.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
