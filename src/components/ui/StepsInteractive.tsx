'use client';

import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { EvaluationAnimation } from '@/remotion/EvaluationAnimation';

const steps = [
  'Índice de inadimplência',
  'Momento em que a cobrança começa',
  'Processos e frequência de cobrança',
  'Comunicação com responsáveis',
  'Estratégias de negociação'
];

export const StepsInteractive = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="flex flex-col items-center gap-12 lg:gap-20">
      {/* Top Header Section */}
      <div className="max-w-3xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-[#05050a] leading-tight px-4">
          Como funciona o diagnóstico
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Nossa equipe realiza uma análise prática da sua operação de cobrança. 
          Avaliamos os 5 pilares fundamentais da recuperação de receita.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
        {/* Left List */}
        <div className="space-y-4 px-4 sm:px-0">
          <h3 className="font-bold text-brand-primary mb-6 text-xs tracking-widest uppercase text-center lg:text-left">
            O que avaliamos:
          </h3>
          
          <div className="flex flex-col gap-3">
            {steps.map((item, index) => {
               const isActive = activeStep === index;
               return (
                 <div 
                   key={index}
                   onMouseEnter={() => setActiveStep(index)}
                   className={`p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md ${
                     isActive 
                       ? 'bg-white/90 border-brand-primary/20 shadow-[0_12px_40px_rgba(11,92,255,0.12)] scale-[1.03] lg:ml-6' 
                       : 'bg-white/40 border-white/60 hover:bg-white/70'
                   }`}
                 >
                   <div className="flex items-center gap-4 md:gap-6">
                     <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                       isActive ? 'bg-brand-primary text-white font-bold shadow-lg' : 'bg-black/5 text-gray-400'
                     }`}>
                       {index + 1}
                     </div>
                     <span className={`text-base md:text-xl font-bold transition-colors duration-300 ${isActive ? 'text-[#05050a]' : 'text-gray-500'}`}>
                       {item}
                     </span>
                   </div>
                 </div>
               )
            })}
          </div>
        </div>

        {/* Right Video Container */}
        <div className="w-full flex justify-center px-4 sm:px-0">
          <div className="w-full max-w-[600px] aspect-square relative rounded-[40px] overflow-hidden border-4 border-white shadow-[0_20px_80px_rgba(11,92,255,0.15)] bg-white/60 backdrop-blur-3xl group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-primary)_0%,_transparent_70%)] opacity-5 group-hover:opacity-10 transition-opacity" />
             <Player
               component={EvaluationAnimation}
               inputProps={{ activeStep }}
               durationInFrames={150}
               compositionWidth={800}
               compositionHeight={800}
               fps={30}
               style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
               controls={false}
               loop
               autoPlay
               acknowledgeRemotionLicense
             />
          </div>
        </div>
      </div>
    </section>
  );
};
