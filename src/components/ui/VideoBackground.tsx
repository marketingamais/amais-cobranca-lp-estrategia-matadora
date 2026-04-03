'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  /** Opacidade do overlay escuro sobre o vídeo (0–1). Default: 0.45 */
  overlayOpacity?: number;
  /** Se true, adiciona sombra inferior preta mais intensa */
  bottomFade?: boolean;
  className?: string;
}

export function VideoBackground({
  overlayOpacity = 0.45,
  bottomFade = true,
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 🧠 Estratégia Agressiva: Só carrega o vídeo DEPOIS que tudo o que é crítico terminou.
    // Isso libera a rede para o Texto (LCP) e Fontes.
    const startLoading = () => {
      setShouldLoadVideo(true);
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(startLoading, { timeout: 3000 });
    } else {
      setTimeout(startLoading, 1500);
    }
  }, []);

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      const video = videoRef.current;
      video.play().catch(() => {
        // Fallback para play após interação
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction, { once: true });
      });
    }
  }, [shouldLoadVideo]);

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ 
        zIndex: 0, 
        backgroundColor: '#05050a',
        // ── Placeholder Instantâneo (0 Bytes) ──
        background: 'radial-gradient(circle at top right, #0a101f 0%, #05050a 100%)'
      }}
    >
      {/* ── 1. Vídeo carregado sob demanda ── */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src="/bg-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onLoadedData={() => setIsLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        />
      )}

      {/* ── 2. Blur overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(0,0,0,0.05)',
        }}
      />

      {/* ── 3. Overlay escuro ajustável ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
        }}
      />

      {/* ── 4. Sombra inferior em degradê ── */}
      {bottomFade && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.90) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
