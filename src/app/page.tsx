'use client';

/**
 * page.tsx — Amais Cobrança Landing Page
 * Fix: Removed LazyMotion for stability, using standard motion components.
 * Optimized useInView margins.
 */

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  ChartLineUp, Money, FlowArrow, Users, CheckCircle,
  MapPinLine, ArrowUpRight, CalendarCheck,
} from '@phosphor-icons/react';
import Image from 'next/image';
import { GlassCard }        from '@/components/ui/GlassCard';
import { AmbientGlow }      from '@/components/ui/AmbientGlow';
import { Button }           from '@/components/ui/Button';
import { VideoBackground }  from '@/components/ui/VideoBackground';
import { StepsInteractive } from '@/components/ui/StepsInteractive';
import { AlertTicker }      from '@/components/ui/AlertTicker';
import { Header }           from '@/components/ui/Header';
import { SuccessModal }     from '@/components/ui/SuccessModal';

/* Remotion player carregado apenas no client, sem bloquear TTI */
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="bg-[#05050a] min-h-screen text-white overflow-x-hidden selection:bg-brand-primary/30">
      <VideoBackground overlayOpacity={0.30} />
      <Header />

      {/* SEÇÃO 1 — HERO */}
      <div id="hero-form" className="relative pt-32 pb-24 z-10 overflow-hidden">
        <AmbientGlow opacity="subtle" />
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-[1120px] mx-auto px-6 xl:px-0 relative z-10">
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 text-sm font-medium text-brand-glow">
              <MapPinLine size={16} /> Exclusivo para Recife
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
              Mapeamento de Inadimplência das{' '}
              <span className="text-brand-primary">Escolas Privadas de Recife</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
              Estamos convidando algumas instituições para participarem de um diagnóstico gratuito e presencial sobre seus processos de cobrança e recuperação de mensalidades.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-12 lg:hidden">
               <a href="#hero-form" className="w-full sm:w-auto">
                 <Button className="w-full py-4 px-8 text-lg font-bold">AGENDAR VISITA</Button>
               </a>
            </motion.div>
          </motion.div>

          {/* Formulário */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            <GlassCard variant="blue" glowTopRight className="p-8 border-brand-primary/60 shadow-[0_0_60px_rgba(0,85,254,0.40)]">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Agende seu diagnóstico</h2>
                <p className="text-text-secondary text-sm">Preencha os dados abaixo para participar do mapeamento:</p>
              </div>
              <form 
                className="space-y-4" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = {
                    email: formData.get('email') as string,
                    phone: formData.get('phone') as string,
                    fullName: formData.get('fullName') as string,
                    firstName: (formData.get('fullName') as string)?.split(' ')[0] || '',
                    lastName: (formData.get('fullName') as string)?.split(' ').slice(1).join(' ') || '',
                    institution: formData.get('institution') as string,
                    role: formData.get('role') as string,
                    segment: formData.get('segment') as string,
                    students: formData.get('students') as string,
                    submittedAt: new Date().toISOString(),
                  };

                  // 1. Meta Pixel track (Browser)
                  if (typeof window !== 'undefined' && window.fbq) {
                    window.fbq('track', 'Lead', {
                      content_name: 'Diagnóstico Gratuito',
                      content_category: 'Lead Generation',
                      value: 0,
                      currency: 'BRL'
                    });
                  }

                  // 2. Lead Proxy (Meta CAPI + n8n Server-side)
                  try {
                    setIsSubmitting(true);
                    const response = await fetch('/api/fb-conversions', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                    });
                    
                    // Abrir o modal independente do status interno, desde que o request complete
                    setShowSuccess(true);
                    (e.target as HTMLFormElement).reset();
                  } catch (err) {
                    console.error('Lead Error:', err);
                    // Como fallback para o usuário, mostramos o modal mesmo se a API der timeout
                    setShowSuccess(true);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Qual seu cargo na instituição?</label>
                  <select name="role" defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm">
                    <option value="" disabled className="bg-[#05050a]">Selecione seu cargo</option>
                    <option value="mantenedor" className="bg-[#05050a]">Mantenedor</option>
                    <option value="diretor" className="bg-[#05050a]">Diretor</option>
                    <option value="professor" className="bg-[#05050a]">Professor</option>
                    <option value="gestor" className="bg-[#05050a]">Gestor</option>
                    <option value="coordenador" className="bg-[#05050a]">Coordenador Pedagógico</option>
                    <option value="secretario" className="bg-[#05050a]">Secretário Escolar</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Segmento</label>
                    <select name="segment" defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm">
                      <option value="" disabled className="bg-[#05050a]">Selecione</option>
                      <option value="basica" className="bg-[#05050a]">Educação básica</option>
                      <option value="faculdade" className="bg-[#05050a]">Faculdade</option>
                      <option value="tecnico" className="bg-[#05050a]">Curso Técnico</option>
                      <option value="profissionalizante" className="bg-[#05050a]">Curso Profissionalizante</option>
                      <option value="idiomas" className="bg-[#05050a]">Curso de Idiomas</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Nº de Alunos</label>
                    <select name="students" defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm">
                      <option value="" disabled className="bg-[#05050a]">Selecione</option>
                      <option value="ate500" className="bg-[#05050a]">Até 500 alunos</option>
                      <option value="501a1000" className="bg-[#05050a]">501 a 1000 alunos</option>
                      <option value="acima1000" className="bg-[#05050a]">Acima de 1000 alunos</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Instituição de Ensino</label>
                  <input name="institution" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm backdrop-blur-sm" placeholder="Nome da instituição" required />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Nome Completo</label>
                  <input name="fullName" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm backdrop-blur-sm" placeholder="Seu nome" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Telefone / WhatsApp</label>
                    <input 
                      name="phone"
                      type="tel"
                      placeholder="(81) 90000-0000"
                      required
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length > 11) v = v.slice(0, 11);
                        if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                        if (v.length > 9) v = `${v.slice(0, 10)}-${v.slice(10)}`;
                        e.target.value = v;
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">E-mail</label>
                    <input name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm backdrop-blur-sm" placeholder="contato@instituicao.com.br" required />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 text-lg font-bold shadow-[0_0_20px_rgba(11,92,255,0.3)] hover:shadow-[0_0_30px_rgba(11,92,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'ENVIANDO...' : 'AGENDAR DIAGNÓSTICO'}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* TICKER */}
      <AlertTicker />

      {/* SEÇÃO 2 — CONTEXTO */}
      <div id="diagnostico" className="relative z-10 bg-[#f4f4f4] text-[#05050a] py-24 border-y border-black/5">
        <Reveal className="grid lg:grid-cols-2 gap-20 items-stretch max-w-[1440px] mx-auto px-6 xl:px-0">
          <motion.div 
            variants={fadeLeft} 
            className="w-full relative min-h-[350px] md:min-h-[500px] lg:min-h-full rounded-3xl overflow-hidden border border-black/5 shadow-2xl bg-white"
          >
            <RemotionPlayer />
          </motion.div>
          <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-sm font-bold text-brand-primary">
              O cenário atual
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-[48px] md:text-[64px] lg:text-[72px] font-bold text-black tracking-tight leading-[1.1] mb-6">
              O Impacto da <br className="hidden lg:block" />
              <span className="text-brand-primary">Inadimplência</span>
            </motion.h2>
            <motion.div variants={stagger(0.07)} className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed">
              {[
                'A inadimplência tem sido um dos principais desafios financeiros das escolas privadas.',
                'Mais do que o valor em aberto, o que impacta o resultado é a forma como a cobrança é conduzida.',
                'Amais está realizando um mapeamento com escolas de Recife para entender como lidar com esse cenário.',
                'Esta iniciativa consultiva visa gerar uma visão clara sobre oportunidades reais de melhoria.',
              ].map((p, i) => (
                <motion.p key={i} variants={fadeIn} className="max-w-xl lg:max-w-none">{p}</motion.p>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>

      {/* SEÇÃO 3 — SUA ESCOLA ESTÁ PERDENDO */}
      <div id="resultados" className="relative z-10 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <section className="relative z-10 space-y-20 max-w-[1120px] mx-auto px-6 xl:px-0">
          <Reveal className="text-center max-w-2xl mx-auto">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-[40px] font-bold mb-6 leading-tight">
              Sua escola está{' '}
              <motion.span
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, rotate: -2, display: 'inline-block', transition: { duration: 0.5, ease: EASE } } }}
                className="inline-block px-4 py-1 mt-2 bg-accent-danger/10 text-accent-danger rounded-xl border border-accent-danger/30 shadow-[0_0_20px_rgba(246,84,62,0.2)]"
              >
                perdendo receita sem perceber
              </motion.span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-text-secondary mt-6">
              A inadimplência não começa no fim do ano. Ela se constrói mês a mês com falhas no processo.
            </motion.p>
          </Reveal>

          <Reveal delay={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Atrasos não tratados',      desc: 'A omissão nos primeiros dias gera um efeito cascata incontrolável meses depois.',           icon: FlowArrow },
              { title: 'Acúmulo de mensalidades',   desc: 'Sem gestão ativa, o responsável acumula dívidas impagáveis e acaba gerando evasão.',         icon: Money },
              { title: 'Dificuldade de negociação', desc: 'Falta de réguas humanizadas afasta as famílias e trava novos acordos.',                      icon: Users },
              { title: 'Falta de processo',         desc: 'Equipe perdendo tempo com rotinas descentralizadas, planilhas e cobranças manuais.',         icon: ChartLineUp },
            ].map((item, i) => (
              <motion.div key={i} variants={scaleIn} className="relative group cursor-pointer h-full">
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
              </motion.div>
            ))}
          </Reveal>

          <Reveal className="flex justify-center">
            <motion.div
              variants={scaleIn}
              className="px-6 py-4 rounded-xl bg-accent-danger/10 border border-accent-danger/20 text-accent-danger font-medium flex items-center gap-3"
            >
              O resultado final: perda direta de faturamento e descontrole do fluxo de caixa
            </motion.div>
          </Reveal>
        </section>
      </div>

      {/* SEÇÃO 4 — COMO FUNCIONA */}
      <div id="metodologia" className="relative z-10 bg-[#f4f4f4] text-[#05050a] py-24 border-y border-black/5">
        <div className="max-w-[1120px] mx-auto px-6 xl:px-0">
          <StepsInteractive />
        </div>
      </div>

      {/* SEÇÃO 5 — O QUE SUA ESCOLA RECEBE */}
      <div className="relative z-10 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <section className="relative z-10 max-w-[1120px] mx-auto px-6 xl:px-0">
          <GlassCard variant="blue" className="p-8 md:p-16 relative overflow-hidden border-brand-primary/60 shadow-[0_0_60px_rgba(0,85,254,0.40)]">
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-center md:text-left flex flex-col items-center md:items-start">
                <Reveal>
                  <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                    O que sua escola recebe
                  </motion.h2>
                  <motion.p variants={fadeIn} className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-xl">
                    Um panorama detalhado e estratégico gerado por especialistas para identificar falhas e estancar a perda de receita da sua instituição.
                  </motion.p>
                  <motion.div variants={fadeIn} className="w-16 h-1 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(11,92,255,0.7)]" />
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
                      <motion.div
                        key={i}
                        variants={fadeRight}
                        className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-brand-primary/40 transition-all duration-300 shadow-lg group text-center sm:text-left"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-success/10 flex items-center justify-center group-hover:bg-accent-success/20 transition-colors">
                          <CheckCircle size={28} weight="fill" className="text-accent-success drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                        </div>
                        <span className="font-bold text-base md:text-lg text-text-primary group-hover:text-white transition-colors">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>

      {/* SEÇÃO 6 — CTA FINAL */}
      <section id="avaliacao" className="relative z-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <Reveal delay={0.05} className="relative z-10 max-w-[1200px] mx-auto px-8 xl:px-0 text-center">
          <motion.span
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.6)' }}
          >
            Exclusivo para Recife
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 700, letterSpacing: '-2px', lineHeight: '1.05', marginBottom: '20px' }}
          >
            Garanta sua vaga<br />
            <span style={{ color: '#0055FE' }}>agora mesmo</span>
          </motion.h2>

          <motion.div
            variants={fadeIn}
            style={{ width: '120px', height: '1px', margin: '0 auto 28px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
          />

          <motion.p
            variants={fadeIn}
            className="max-w-xl mx-auto"
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.50)', marginBottom: '40px', lineHeight: '28px' }}
          >
            Estamos realizando esse mapeamento com escolas privadas da região de Recife. Agenda limitada.
          </motion.p>

          <Reveal delay={0.08} className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {[
              { icon: MapPinLine,    text: 'Atendimento presencial' },
              { icon: Users,         text: 'Agenda limitada' },
              { icon: CalendarCheck, text: '100% gratuito' },
            ].map((tag, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium cursor-default"
                style={{ background: 'rgba(0,85,254,0.12)', border: '1px solid rgba(0,85,254,0.25)', color: '#6699ff' }}
              >
                <tag.icon size={16} /> {tag.text}
              </motion.div>
            ))}
          </Reveal>

          <motion.p
            variants={fadeIn}
            className="mb-4"
            style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}
          >
            Mais de 200 instituições atendidas em todo o Brasil
          </motion.p>

          <motion.div variants={fadeIn} className="mb-14">
            <LogoMarquee />
          </motion.div>

          <motion.div variants={fadeUp}>
            <motion.a
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
            </motion.a>
            <p className="mt-4" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
              Sem compromisso. Diagnóstico 100% gratuito.
            </p>
          </motion.div>
        </Reveal>
      </section>

    </div>
  );
}
