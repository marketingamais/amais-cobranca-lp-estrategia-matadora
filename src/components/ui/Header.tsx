'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from './Button';

export const Header = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: "O Diagnóstico", href: "#diagnostico" },
    { name: "Impacto", href: "#resultados" },
    { name: "Como Funciona", href: "#metodologia" },
    { name: "Garantias", href: "#avaliacao" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#05050a]/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-center md:justify-between">
        <a href="#" className="flex items-center gap-2 cursor-pointer z-10 hover:scale-105 transition-transform duration-300">
          <Image 
            src="/amais-logo-v2.png" 
            alt="Amais Cobrança Logo" 
            width={160}
            height={40}
            priority
            className="h-8 md:h-10 w-auto object-contain" 
          />
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 z-10">
          <a href="#hero-form">
            <Button variant="primary" size="sm" className="hidden sm:inline-flex shadow-lg shadow-[#0b5cff]/20">
              Agendar Diagnóstico
            </Button>
          </a>
        </div>
      </div>
    </motion.header>
  );
};
