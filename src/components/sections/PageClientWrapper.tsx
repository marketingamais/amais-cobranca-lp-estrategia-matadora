'use client';

import { useState, ReactNode } from 'react';
import { SuccessModalComponent } from '@/components/ui/SuccessModal';

export function PageClientWrapper({ 
  children,
  hero 
}: { 
  children: ReactNode;
  hero: (onSuccess: () => void) => ReactNode;
}) {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      {hero(() => setShowSuccess(true))}
      {children}
      <SuccessModalComponent isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}
