'use client';

import { m } from 'framer-motion';
import { MapPinLine, ArrowUpRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { useState } from 'react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
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

export function HeroSection({ onFormSuccess }: { onFormSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div id="hero-form" className="relative pt-32 pb-24 z-10 overflow-hidden">
      <AmbientGlow opacity="subtle" />
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-[1120px] mx-auto px-6 xl:px-0 relative z-10">
        <m.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <m.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 text-sm font-medium text-brand-glow">
            <MapPinLine size={16} /> Exclusivo para Recife
          </m.div>
          <m.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
            Mapeamento de Inadimplência das{' '}
            <span className="text-brand-primary">Escolas Privadas de Recife</span>
          </m.h1>
          <m.p variants={fadeIn} className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
            Estamos convidando algumas instituições para participarem de um diagnóstico gratuito e presencial sobre seus processos de cobrança e recuperação de mensalidades.
          </m.p>
          <m.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-12 lg:hidden">
            <a href="#hero-form" className="w-full sm:w-auto">
              <Button className="w-full py-4 px-8 text-lg font-bold">AGENDAR VISITA</Button>
            </a>
          </m.div>
        </m.div>

        {/* Formulário */}
        <m.div
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
                  test_event_code: 'TEST34526',
                };

                // 1. Meta Pixel track (Browser)
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'Lead', {
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
                  
                  (e.target as HTMLFormElement).reset();
                  
                  setTimeout(() => {
                    onFormSuccess();
                  }, 100);

                } catch (err) {
                  console.error('❌ Erro Lead:', err);
                  onFormSuccess(); // Fallback amigável
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Qual seu cargo na instituição?</label>
                <select name="role" defaultValue="" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm">
                  <option value="" disabled className="bg-[#05050a]">Selecione seu cargo</option>
                  <option value="Mantenedor" className="bg-[#05050a]">Mantenedor</option>
                  <option value="Diretor" className="bg-[#05050a]">Diretor</option>
                  <option value="Professor" className="bg-[#05050a]">Professor</option>
                  <option value="Gestor" className="bg-[#05050a]">Gestor</option>
                  <option value="Coordenador Pedagógico" className="bg-[#05050a]">Coordenador Pedagógico</option>
                  <option value="Secretário Escolar" className="bg-[#05050a]">Secretário Escolar</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Segmento</label>
                  <select name="segment" defaultValue="" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm">
                    <option value="" disabled className="bg-[#05050a]">Selecione</option>
                    <option value="Educação básica" className="bg-[#05050a]">Educação básica</option>
                    <option value="Faculdade" className="bg-[#05050a]">Faculdade</option>
                    <option value="Curso Técnico" className="bg-[#05050a]">Curso Técnico</option>
                    <option value="Curso Profissionalizante" className="bg-[#05050a]">Curso Profissionalizante</option>
                    <option value="Curso de Idiomas" className="bg-[#05050a]">Curso de Idiomas</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Nº de Alunos</label>
                  <select name="students" defaultValue="" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 transition-all text-sm appearance-none cursor-pointer backdrop-blur-sm">
                    <option value="" disabled className="bg-[#05050a]">Selecione</option>
                    <option value="Até 500 alunos" className="bg-[#05050a]">Até 500 alunos</option>
                    <option value="501 a 1000 alunos" className="bg-[#05050a]">501 a 1000 alunos</option>
                    <option value="Acima de 1000 alunos" className="bg-[#05050a]">Acima de 1000 alunos</option>
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
        </m.div>
      </div>
    </div>
  );
}
