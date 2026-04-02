'use client';

/**
 * HeroBackgroundPlayer.tsx
 * Wrapper do Player Remotion para o HeroBackground.
 * Usado como background absoluto nas seções 1, 3, 5 e 6.
 */

import React from 'react';
import { Player } from '@remotion/player';
import { HeroBackground } from './HeroBackground';

interface HeroBackgroundPlayerProps {
  /** Opacidade extra sobre o player, para ajustar por seção */
  overlayOpacity?: number;
  className?: string;
}

export const HeroBackgroundPlayer: React.FC<HeroBackgroundPlayerProps> = ({
  overlayOpacity = 0,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      <Player
        component={HeroBackground}
        durationInFrames={240}   // 8s × 30fps
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          objectFit: 'cover',
        }}
        controls={false}
        loop
        autoPlay
      />
      {/* Overlay extra (ajustável por seção) */}
      {overlayOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(0,0,0,${overlayOpacity})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
