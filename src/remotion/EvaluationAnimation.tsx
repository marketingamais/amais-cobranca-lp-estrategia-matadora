import React from 'react';
import { AbsoluteFill, useVideoConfig, spring, interpolate, Sequence, useCurrentFrame } from 'remotion';

const Scene0: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Speedometer / Risk Gauge
  const progress = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const rotation = interpolate(progress, [0, 1], [-120, 60]); // 240 degree sweep (-120 to +120). Risk lands at +60 deg.
  
  return (
    <div style={{ position: 'relative', width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Outer Track */}
      <svg width="400" height="400" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <path d="M 15.4 70 A 40 40 0 1 1 84.6 70" fill="none" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
        
        {/* Fill Track representing Danger */}
        <path d="M 15.4 70 A 40 40 0 1 1 84.6 70" 
              fill="none" stroke="#f6543e" strokeWidth="6" strokeLinecap="round" 
              strokeDasharray="168" 
              strokeDashoffset={interpolate(progress, [0, 1], [168, 30])} 
              style={{ filter: 'drop-shadow(0 0 8px rgba(246,84,62,0.6))' }} />
      </svg>

      {/* Needle Pivot Center */}
      <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
         {/* Needle Line */}
         <div style={{ 
           position: 'absolute', 
           width: 6, height: 140, 
           backgroundColor: '#05050a', 
           bottom: 0, 
           left: -3, 
           transformOrigin: 'bottom center', 
           transform: `rotate(${rotation}deg)`, 
           borderRadius: 3, 
           filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))'
         }} />
         
         {/* Needle Cap (Center Dot) */}
         <div style={{ 
           position: 'absolute', 
           width: 24, height: 24, 
           borderRadius: '50%', 
           backgroundColor: '#05050a', 
           left: -12, top: -12, 
           border: '4px solid #fff',
           boxShadow: '0 0 10px rgba(0,0,0,0.1)'
         }} />
      </div>

      <div style={{ position: 'absolute', top: '260px', left: 0, width: '100%', textAlign: 'center' }}>
         <div style={{ fontSize: 44, fontWeight: 800, color: '#f6543e', lineHeight: 1 }}>85%</div>
         <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 'bold', marginTop: 8, letterSpacing: 1.5 }}>RISCO MÁXIMO</div>
      </div>
    </div>
  );
};

const Scene1: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Timeline calendar dots
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 16, width: 400 }}>
      {Array.from({ length: 28 }).map((_, i) => {
        const itemFrame = Math.max(0, frame - i * 3);
        const scale = spring({ frame: itemFrame, fps, config: { damping: 14 } });
        const isLate = i > 15;
        const color = isLate ? '#f6543e' : (i === 15 ? '#0b5cff' : '#e5e7eb');
        const glow = isLate ? 'rgba(246,84,62,0.4)' : (i === 15 ? 'rgba(11,92,255,0.6)' : 'transparent');
        return (
          <div key={i} style={{ 
            width: 40, height: 40, borderRadius: '50%', backgroundColor: color, transform: `scale(${scale})`, boxShadow: `0 0 16px ${glow}`
          }} />
        );
      })}
    </div>
  );
};

const Scene2: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Process Loops / Cogs
  const rotate1 = interpolate(frame, [0, 150], [0, 360]);
  const rotate2 = interpolate(frame, [0, 150], [0, -360]);

  return (
    <div style={{ position: 'relative', width: 300, height: 300 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 200, height: 200, borderRadius: '50%', border: '8px dashed #0b5cff', transform: `rotate(${rotate1}deg)`, filter: 'drop-shadow(0 0 20px rgba(11,92,255,0.3))' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 160, height: 160, borderRadius: '50%', border: '8px dashed #f6543e', transform: `rotate(${rotate2}deg)`, filter: 'drop-shadow(0 0 20px rgba(246,84,62,0.3))' }} />
    </div>
  );
};

const Scene3: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Chat Bubbles
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      {[0, 1, 2].map((i) => {
        const appear = spring({ frame: Math.max(0, frame - i * 15), fps, config: { damping: 12 } });
        const isUser = i % 2 !== 0;
        return (
          <div key={i} style={{ 
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            backgroundColor: isUser ? '#0b5cff' : '#ffffff',
            padding: '24px 32px',
            borderRadius: 24,
            borderBottomRightRadius: isUser ? 0 : 24,
            borderBottomLeftRadius: isUser ? 24 : 0,
            transform: `scale(${appear}) translateY(${interpolate(appear, [0, 1], [50, 0])}px)`,
            width: 250,
            boxShadow: isUser ? '0 10px 30px rgba(11,92,255,0.3)' : '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <div style={{ width: '100%', height: 12, backgroundColor: isUser ? 'rgba(255,255,255,0.3)' : '#e5e7eb', borderRadius: 6, marginBottom: 12 }} />
            <div style={{ width: '60%', height: 12, backgroundColor: isUser ? 'rgba(255,255,255,0.3)' : '#e5e7eb', borderRadius: 6 }} />
          </div>
        );
      })}
    </div>
  );
};

const Scene4: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Negotiation: consensus metaphor
  // Two circles (parties) merge into one intersection, and a checkmark appears in the center.
  const progress = spring({ frame, fps, config: { damping: 14, stiffness: 60 } });
  
  const slideL = interpolate(progress, [0, 1], [-80, -25]);
  const slideR = interpolate(progress, [0, 1], [80, 25]);
  const checkOpacity = interpolate(progress, [0.5, 1], [0, 1]);
  const checkScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 10 } });

  return (
    <div style={{ position: 'relative', width: 400, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Left Circle - School */}
      <div style={{ 
        position: 'absolute', width: 120, height: 120, backgroundColor: 'transparent', border: '8px solid #0b5cff', borderRadius: '50%', 
        transform: `translateX(${slideL}px)`, filter: 'drop-shadow(0 0 20px rgba(11,92,255,0.4))'
      }} />
      {/* Right Circle - Family */}
      <div style={{ 
        position: 'absolute', width: 120, height: 120, backgroundColor: 'transparent', border: '8px solid #f6543e', borderRadius: '50%', 
        transform: `translateX(${slideR}px)`, filter: 'drop-shadow(0 0 20px rgba(246,84,62,0.3))'
      }} />
      
      {/* Agreement Center intersection glow visually represented by the checkmark */}
      <div style={{
         position: 'absolute', opacity: checkOpacity, transform: `scale(${checkScale})`,
         width: 60, height: 60, backgroundColor: '#34d399', borderRadius: '50%',
         display: 'flex', justifyContent: 'center', alignItems: 'center',
         boxShadow: '0 0 30px rgba(52,211,153,0.6)'
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
  );
};

export const EvaluationAnimation: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       {/* Background Grid Lines for high-tech look - Light configuration */}
       <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
       
       {activeStep === 0 && <Scene0 frame={frame} fps={fps} />}
       {activeStep === 1 && <Scene1 frame={frame} fps={fps} />}
       {activeStep === 2 && <Scene2 frame={frame} fps={fps} />}
       {activeStep === 3 && <Scene3 frame={frame} fps={fps} />}
       {activeStep === 4 && <Scene4 frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
};
