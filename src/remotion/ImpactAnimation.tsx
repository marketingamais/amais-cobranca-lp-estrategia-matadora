import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import React from 'react';

/**
 * ImpactAnimation — Dashboard Financeiro Premium (Bleed Version)
 * Narrativa: Sobe > Cai > Sobe > Cai (Passa da meta 2x) > QUEDA FINAL BRUSCA.
 */
export const ImpactAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // DASHBOARD CONSTANTS (BLOOM/BLEED)
  const PADDING_X = 80;
  const GRAPH_WIDTH = width - PADDING_X * 2;
  const BASELINE_Y = height * 0.6;

  // PERIODS (Frames) - Total 270 (9s)
  const P1 = 50;  
  const P2 = 90;  
  const P3 = 140; 
  const P4 = 180; 
  const P5 = 220; 
  const D_CRASH_START = 220; 
  const D_CRASH_END = 270;

  const noise = (Math.sin(frame / 3) * 2 + Math.cos(frame / 5) * 1);

  const getPointY = (xProgress: number) => {
    const currentT = xProgress * D_CRASH_END;
    let y = BASELINE_Y - 40;

    if (currentT <= P1) {
      const p = currentT / P1;
      y = interpolate(p, [0, 1], [BASELINE_Y - 40, BASELINE_Y - 140]);
    } else if (currentT <= P2) {
      const p = (currentT - P1) / (P2 - P1);
      y = interpolate(p, [0, 1], [BASELINE_Y - 140, BASELINE_Y - 80], { easing: Easing.out(Easing.quad) });
    } else if (currentT <= P3) {
      const p = (currentT - P2) / (P3 - P2);
      y = interpolate(p, [0, 1], [BASELINE_Y - 80, BASELINE_Y - 350], { easing: Easing.inOut(Easing.quad) });
    } else if (currentT <= P4) {
      const p = (currentT - P3) / (P4 - P3);
      y = interpolate(p, [0, 1], [BASELINE_Y - 350, BASELINE_Y - 200], { easing: Easing.out(Easing.quad) });
    } else if (currentT <= P5) {
      const p = (currentT - P4) / (P5 - P4);
      y = interpolate(p, [0, 1], [BASELINE_Y - 200, BASELINE_Y - 450], { easing: Easing.inOut(Easing.quad) });
    } else {
      const crashSpring = spring({ frame: currentT - D_CRASH_START, fps, config: { stiffness: 120, damping: 12 } });
      y = interpolate(crashSpring, [0, 1], [BASELINE_Y - 450, BASELINE_Y + 300]);
    }

    return y + noise;
  };

  const revealProgress = frame / D_CRASH_END;
  const isCrashing = frame > D_CRASH_START;
  const crashIntensity = spring({ frame: frame - D_CRASH_START, fps, config: { stiffness: 80 } });
  const lineColor = interpolate(crashIntensity, [0, 1], [0, 1]) > 0.05 ? '#EF4444' : '#3B82F6';
  const shake = isCrashing ? (Math.random() - 0.5) * 12 * crashIntensity : 0;

  const points = 200;
  let pathD = "";
  let areaD = "";
  
  for (let i = 0; i <= points; i++) {
    const xProg = i / points;
    if (xProg > revealProgress + 0.005) break;
    
    const x = PADDING_X + xProg * GRAPH_WIDTH;
    const y = getPointY(xProg);
    
    if (i === 0) {
      pathD += `M ${x},${y} `;
      areaD += `M ${x},${height} L ${x},${y} `;
    } else {
      pathD += `L ${x},${y} `;
      areaD += `L ${x},${y} `;
    }
    
    if (i === Math.floor(revealProgress * points) || (i === points && revealProgress >= 1)) {
       areaD += `L ${x},${height} Z`;
    }
  }

  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const currentVal = interpolate(getPointY(revealProgress), [BASELINE_Y - 450, BASELINE_Y + 300], [450000, -280000]);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: 'white', 
      fontFamily: 'Inter, system-ui, sans-serif',
      transform: `translate(${shake}px, ${shake}px)`,
      overflow: 'hidden'
    }}>
      {/* GRID */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* DASHBOARD HEADER OVERLAY */}
      <div style={{ position: 'absolute', top: 40, left: 40, right: 40, display: 'flex', justifyContent: 'space-between', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: isCrashing ? '#EF4444' : '#10B981', animation: 'pulse 1s infinite' }} />
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#64748B', letterSpacing: '0.1em' }}>LIVE PERFORMANCE MONITOR</span>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: '24px', fontWeight: 800, color: '#94A3B8', marginBottom: '4px' }}>ESTIMATIVA DE CAIXA</div>
           <div style={{ fontSize: '72px', fontWeight: 900, color: currentVal < 0 ? '#EF4444' : '#0F172A' }}>{formatter.format(currentVal)}</div>
        </div>
      </div>

      {/* GRAPH AREA */}
      <svg width="100%" height="100%" style={{ position: 'absolute', overflow: 'visible' }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* BASELINE */}
        <line x1="0" y1={BASELINE_Y} x2={width} y2={BASELINE_Y} stroke="#E5E7EB" strokeWidth="2" strokeDasharray="10 10" />

        <path d={areaD} fill="url(#areaGradient)" />
        <path d={pathD} fill="none" stroke={lineColor} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 20px ${lineColor}33)` }} />
        
        {revealProgress > 0 && (
          <circle cx={PADDING_X + revealProgress * GRAPH_WIDTH} cy={getPointY(revealProgress)} r="18" fill="white" stroke={lineColor} strokeWidth="6" style={{ filter: `drop-shadow(0 0 15px ${lineColor}66)` }} />
        )}
      </svg>

      {/* ALERT OVERLAY */}
      {isCrashing && (
        <div style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#EF4444', color: 'white', padding: '20px 40px', borderRadius: '16px', fontWeight: 900, fontSize: '40px', letterSpacing: '2px', animation: 'pulse 0.5s infinite' }}>
          DÉFICIT CRÍTICO DETECTADO
        </div>
      )}

      <style>{`
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </AbsoluteFill>
  );
};
