'use client';

import { useRef, useEffect } from 'react';

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

  // Garantir o loop infinito mesmo se o atributo loop nativo falhar
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Se o autoplay for bloqueado, tentamos novamente ao clicar
        document.addEventListener('click', () => video.play(), { once: true });
      });
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* ── 1. Vídeo em loop ── */}
      <video
        ref={videoRef}
        src="/bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
          }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />

      {/* ── 2. Blur overlay — idêntico ao original (blur: 15px) ── */}
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
