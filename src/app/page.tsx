'use client';

/**
 * page.tsx — Amais Cobrança Landing Page
 * Fix: Removed LazyMotion for stability, using standard motion components.
 * Optimized useInView margins.
 */

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { GlassCard }        from '@/components/ui/GlassCard';
import { AmbientGlow }      from '@/components/ui/AmbientGlow';
import { Button }           from '@/components/ui/Button';
import { VideoBackground }  from '@/components/ui/VideoBackground';
import { StepsInteractive } from '@/components/ui/StepsInteractive';
import { AlertTicker }      from '@/components/ui/AlertTicker';
import { Header }           from '@/components/ui/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { PageClientWrapper } from '@/components/sections/PageClientWrapper';

/* Remotion player carregado apenas no client, sem bloquear TTI */
const RemotionPlayer = dynamic(
  () => import('@/remotion/RemotionPlayer').then((m) => m.RemotionPlayer),
  { ssr: false, loading: () => <div className="w-full aspect-video bg-black/20 rounded-xl animate-pulse" /> }
);

const ContextSection = dynamic(() => import('@/components/sections/ContextSection').then(m => m.ContextSection), {
  loading: () => <div className="h-96 bg-[#f4f4f4] animate-pulse" />
});

const ResultsSection = dynamic(() => import('@/components/sections/ResultsSection').then(m => m.ResultsSection), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const MethodologySection = dynamic(() => import('@/components/sections/MethodologySection').then(m => m.MethodologySection), {
  loading: () => <div className="h-96 bg-[#f4f4f4] animate-pulse" />
});

const BenefitsSection = dynamic(() => import('@/components/sections/BenefitsSection').then(m => m.BenefitsSection), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const CTASection = dynamic(() => import('@/components/sections/CTASection').then(m => m.CTASection), {
  loading: () => <div className="h-96 bg-black/10 animate-pulse" />
});

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
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
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
    <motion.div
      variants={stagger(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

const LOGOS = [
  { src: '/logos/logo1.png', alt: 'Parceiro 1', isFCG: false },
  { src: '/logos/logo2.png', alt: 'Parceiro 2', isFCG: false },
  { src: '/logos/logo3.png', alt: 'UNILAVRAS',  isFCG: false },
  { src: '/logos/logo4.png', alt: 'FCG',        isFCG: true  },
];

function LogoMarquee() {
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

export default function Page() {
  return (
    <div className="bg-[#05050a] min-h-screen text-white overflow-x-hidden selection:bg-brand-primary/30">
      <VideoBackground overlayOpacity={0.30} />
      <Header />

      <PageClientWrapper 
        hero={(onSuccess) => <HeroSection onFormSuccess={onSuccess} />}
      >
        <AlertTicker />
        <ContextSection />
        <ResultsSection />
        <MethodologySection />
        <BenefitsSection />
        <CTASection />
      </PageClientWrapper>
    </div>
  );
}
