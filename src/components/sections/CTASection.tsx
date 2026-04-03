'use client';

import { m } from 'framer-motion';
import { MapPinLine, Users, CalendarCheck, ArrowUpRight } from '@phosphor-icons/react';
import Image from 'next/image';

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

const LOGOS = [
  { src: '/logos/logo1.png', alt: 'Parceiro 1', isFCG: false },
  { src: '/logos/logo2.png', alt: 'Parceiro 2', isFCG: false },
  { src: '/logos/logo3.png', alt: 'UNILAVRAS',  isFCG: false },
  { src: '/logos/logo4.png', alt: 'FCG',        isFCG: true  },
];

function LocalLogoMarquee() {
  const row = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div className="w-full overflow-hidden" style={{ height: '72px' }}>
      <div
        className="flex items-center h-full"
        style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}
      >
        {row.map((logo, i) => (
          <div
            key={i}
            className="logo-marquee-item flex-shrink-0 flex items-center justify-center mx-3 rounded-xl"
            style={{
              width: '130px', height: '52px', padding: '8px 16px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              transition: 'border-color 0.4s ease, background 0.4s ease',
            }}
          >
            <div style={{ position: 'relative', width: '90px', height: '34px' }}>
              <Image
                src={logo.src} alt={logo.alt} fill
                className={`logo-marquee-img object-contain${logo.isFCG ? ' logo-fcg' : ''}`}
                sizes="90px"
                style={{
                  filter: logo.isFCG
                    ? 'invert(0.6) grayscale(100%) opacity(0.85)'
                    : 'grayscale(100%) opacity(0.5) brightness(2)',
                  transition: 'filter 0.4s ease, transform 0.4s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CTASection() {
  return (
    <section id="avaliacao" className="relative z-10 py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      <Reveal delay={0.05} className="relative z-10 max-w-[1200px] mx-auto px-8 xl:px-0 text-center">
        <m.span
          variants={fadeIn}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.6)' }}
        >
          Exclusivo para Recife
        </m.span>

        <m.h2
          variants={fadeUp}
          className="max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: '1.05', marginBottom: '20px' }}
        >
          Garanta sua vaga<br />
          <span style={{ color: '#0055FE' }}>agora mesmo</span>
        </m.h2>

        <m.div
          variants={fadeIn}
          style={{ width: '120px', height: '1px', margin: '0 auto 28px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
        />

        <m.p
          variants={fadeIn}
          className="max-w-xl mx-auto"
          style={{ fontSize: '18px', color: 'rgba(255,255,255,0.50)', marginBottom: '40px', lineHeight: '28px' }}
        >
          Estamos realizando esse mapeamento com escolas privadas da região de Recife. Agenda limitada.
        </m.p>

        <Reveal delay={0.08} className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {[
            { icon: MapPinLine,    text: 'Atendimento presencial' },
            { icon: Users,         text: 'Agenda limitada' },
            { icon: CalendarCheck, text: '100% gratuito' },
          ].map((tag, i) => (
            <m.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -3 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium cursor-default"
              style={{ background: 'rgba(0,85,254,0.12)', border: '1px solid rgba(0,85,254,0.25)', color: '#6699ff' }}
            >
              <tag.icon size={16} /> {tag.text}
            </m.div>
          ))}
        </Reveal>

        <m.p
          variants={fadeIn}
          className="mb-4"
          style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}
        >
          Mais de 200 instituições atendidas em todo o Brasil
        </m.p>

        <m.div variants={fadeIn} className="mb-14">
          <LocalLogoMarquee />
        </m.div>

        <m.div variants={fadeUp}>
          <m.a
            href="#hero-form"
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-3 px-12 py-6 rounded-full text-white font-bold text-xl"
            style={{
              background: '#0055FE',
              boxShadow: '0 8px 30px rgba(0,85,254,0.35)',
              animation: 'glowPulse 2.5s ease-in-out infinite',
            }}
          >
            AGENDAR VISITA <ArrowUpRight size={24} />
          </m.a>
          <p className="mt-4" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            Sem compromisso. Diagnóstico 100% gratuito.
          </p>
        </m.div>
      </Reveal>
    </section>
  );
}
