'use client';

import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { FlowArrow, Money, Users, ChartLineUp } from '@phosphor-icons/react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
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

export function ResultsSection() {
  return (
    <div id="resultados" className="relative z-10 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      <section className="relative z-10 space-y-20 max-w-[1120px] mx-auto px-6 xl:px-0">
        <Reveal className="text-center max-w-2xl mx-auto">
          <m.h2 variants={fadeUp} className="text-3xl md:text-[40px] font-bold mb-6 leading-tight text-white">
            Sua escola está{' '}
            <m.span
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, rotate: -2, display: 'inline-block', transition: { duration: 0.5, ease: EASE } } }}
              className="inline-block px-4 py-1 mt-2 bg-accent-danger/10 text-accent-danger rounded-xl border border-accent-danger/30 shadow-[0_0_20px_rgba(246,84,62,0.2)]"
            >
              perdendo receita sem perceber
            </m.span>
          </m.h2>
          <m.p variants={fadeIn} className="text-xl text-text-secondary mt-6">
            A inadimplência não começa no fim do ano. Ela se constrói mês a mês com falhas no processo.
          </m.p>
        </Reveal>

        <Reveal delay={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Atrasos não tratados',      desc: 'A omissão nos primeiros dias gera um efeito cascata incontrolável meses depois.',           icon: FlowArrow },
            { title: 'Acúmulo de mensalidades',   desc: 'Sem gestão ativa, o responsável acumula dívidas impagáveis e acaba gerando evasão.',         icon: Money },
            { title: 'Dificuldade de negociação', desc: 'Falta de réguas humanizadas afasta as famílias e trava novos acordos.',                      icon: Users },
            { title: 'Falta de processo',         desc: 'Equipe perdendo tempo com rotinas descentralizadas, planilhas e cobranças manuais.',         icon: ChartLineUp },
          ].map((item, i) => (
            <m.div key={i} variants={scaleIn} className="relative group cursor-pointer h-full">
              <GlassCard variant="blue" className="flex flex-col items-center justify-start text-center p-8 h-full relative overflow-hidden transition-all duration-500 border-brand-primary/50 sm:border-white/5 bg-brand-primary/10 sm:bg-transparent shadow-[0_0_30px_rgba(0,85,254,0.15)] sm:shadow-none">
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-primary/30 blur-[40px] rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center justify-center w-full mb-10 mt-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 sm:bg-white/5 border border-brand-primary/30 sm:border-white/10 text-brand-glow sm:text-text-secondary group-hover:text-brand-glow flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 shadow-sm shrink-0">
                    <item.icon size={24} weight="duotone" />
                  </div>
                </div>

                <div className="w-full">
                  <h3 className="font-bold text-xl text-white sm:text-text-primary mb-3 tracking-tight leading-tight transition-colors duration-300 group-hover:text-white line-clamp-2 min-h-[3rem] flex items-center justify-center">{item.title}</h3>
                  <div className="grid grid-rows-[1fr] sm:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-text-secondary text-sm leading-relaxed opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-w-[220px] mx-auto">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          ))}
        </Reveal>

        <Reveal className="flex justify-center">
          <m.div
            variants={scaleIn}
            className="px-6 py-4 rounded-xl bg-accent-danger/10 border border-accent-danger/20 text-accent-danger font-medium flex items-center gap-3 text-center sm:text-left"
          >
            O resultado final: perda direta de faturamento e descontrole do fluxo de caixa
          </m.div>
        </Reveal>
      </section>
    </div>
  );
}
