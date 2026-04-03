'use client';

import { m, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModalComponent = ({ isOpen, onClose }: SuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a14]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(11,92,255,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-primary/20 blur-[60px] -z-10" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:text-white transition-colors"
              type="button"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-6">
              <m.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-brand-primary/10 border border-brand-primary/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(11,92,255,0.2)]"
              >
                <Check className="text-brand-primary w-10 h-10" strokeWidth={3} />
              </m.div>
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-white">
                Mapeamento Solicitado!
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Seus dados foram enviados com sucesso. Nossa equipe entrará em contato em breve para agendar seu diagnóstico presencial.
              </p>
            </div>

            <div className="mt-8">
              <Button
                onClick={onClose}
                className="w-full py-4 font-bold tracking-wide"
                type="button"
              >
                ENTENDIDO
              </Button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};
