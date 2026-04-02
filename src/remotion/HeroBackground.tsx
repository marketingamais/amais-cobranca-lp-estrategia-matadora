'use client';

/**
 * HeroBackground.tsx — Composição Remotion
 * ─────────────────────────────────────────
 * Recria a animação de background da Referência 3:
 * escuro, tecnológico, glow azul orgânico em movimento lento.
 *
 * Sem assets externos. Apenas CSS radial-gradients + blur + interpolate.
 */

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

/* ── Helper: curva senoidal suave normalizada → [0, 1] ── */
function sineWave(frame: number, period: number, offset = 0) {
  return (Math.sin((frame / period) * Math.PI * 2 + offset) + 1) / 2;
}

/* ── Helper: interpolate com easing linear (para loops) ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export const HeroBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  /* Parâmetros fáceis de ajustar */
  const PERIOD_SLOW  = durationInFrames * 0.85;   // ~7s num loop de 8s
  const PERIOD_MED   = durationInFrames * 0.60;   // ~5s
  const PERIOD_FAST  = durationInFrames * 0.40;   // ~3s

  /* ── Entrada: zoom-out + fade nos primeiros 2.5s ── */
  const entryProgress = interpolate(frame, [0, fps * 2.5], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const entryScale   = interpolate(entryProgress, [0, 1], [1.10, 1.0]);
  const entryOpacity = interpolate(entryProgress, [0, 1], [0, 1]);

  /* ── GLOW PRINCIPAL: grande, central-esquerdo, azul puro ── */
  const g1x = lerp(18, 38, sineWave(frame, PERIOD_SLOW, 0));
  const g1y = lerp(10, 45, sineWave(frame, PERIOD_MED,  1.2));
  const g1opacity = lerp(0.28, 0.42, sineWave(frame, PERIOD_MED, 0.8));
  const g1scale   = lerp(0.96, 1.06, sineWave(frame, PERIOD_SLOW, 0.4));

  /* ── GLOW SECUNDÁRIO: canto superior direito, azul/ciano sutil ── */
  const g2x = lerp(62, 78, sineWave(frame, PERIOD_MED,  2.5));
  const g2y = lerp(5,  30, sineWave(frame, PERIOD_SLOW, 3.1));
  const g2opacity = lerp(0.12, 0.22, sineWave(frame, PERIOD_FAST, 1.7));
  const g2scale   = lerp(0.94, 1.08, sineWave(frame, PERIOD_MED,  2.0));

  /* ── GLOW TERCIÁRIO: centro-baixo, ciano muito discreto ── */
  const g3x = lerp(38, 55, sineWave(frame, PERIOD_SLOW, 4.2));
  const g3y = lerp(55, 75, sineWave(frame, PERIOD_MED,  0.5));
  const g3opacity = lerp(0.06, 0.14, sineWave(frame, PERIOD_SLOW, 1.0));

  /* ── SWEEP de luz horizontal muito sutil ── */
  const sweepX = interpolate(
    frame % PERIOD_SLOW,
    [0, PERIOD_SLOW],
    [-30, 130],
  );
  const sweepOpacity = lerp(0, 0.06, sineWave(frame, PERIOD_SLOW, 0));

  return (
    <AbsoluteFill
      style={{
        background: 'rgb(0,0,0)',
        overflow: 'hidden',
        transform: `scale(${entryScale})`,
        opacity: entryOpacity,
      }}
    >
      {/* ── Camada base: gradiente escuro premium ── */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 30% 50%, rgb(0,14,43) 0%, rgb(0,0,0) 65%),
            radial-gradient(ellipse 80% 60% at 80% 20%, rgb(0,8,28) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── GLOW PRINCIPAL – grande bloom azul ── */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '700px',
          left: `${g1x}%`,
          top:  `${g1y}%`,
          transform: `translate(-50%, -50%) scale(${g1scale})`,
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,85,254,${g1opacity}) 0%, rgba(0,40,180,0.08) 50%, transparent 80%)`,
          filter: 'blur(180px)',
          borderRadius: '50%',
          willChange: 'transform, opacity',
        }}
      />

      {/* ── GLOW SECUNDÁRIO – canto direito, azul/ciano ── */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '500px',
          left: `${g2x}%`,
          top:  `${g2y}%`,
          transform: `translate(-50%, -50%) scale(${g2scale})`,
          background: `radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,153,255,${g2opacity}) 0%, rgba(0,85,254,0.05) 55%, transparent 80%)`,
          filter: 'blur(150px)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />

      {/* ── GLOW TERCIÁRIO – centro-baixo, névoa azul-petróleo ── */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '400px',
          left: `${g3x}%`,
          top:  `${g3y}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,100,220,${g3opacity}) 0%, transparent 75%)`,
          filter: 'blur(120px)',
          borderRadius: '50%',
        }}
      />

      {/* ── SWEEP de luz horizontal ── */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '200%',
          left: `${sweepX}%`,
          top: '-50%',
          transform: 'rotate(-15deg)',
          background: `linear-gradient(90deg, transparent 0%, rgba(0,85,254,${sweepOpacity}) 50%, transparent 100%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Haze atmosférico geral sutil ── */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 100% 70% at 40% 40%, rgba(0,60,200,0.04) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* ── Sombra inferior: luz morrendo antes da base ── */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Vinheta nas bordas para profundidade ── */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse 110% 110% at 50% 50%,
              transparent 50%,
              rgba(0,0,0,0.45) 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
