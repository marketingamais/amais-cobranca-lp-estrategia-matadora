'use client';

import { useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';
const SuccessModalComponent = dynamic(() => import('@/components/ui/SuccessModal').then(m => m.SuccessModalComponent), {
  ssr: false
});

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
