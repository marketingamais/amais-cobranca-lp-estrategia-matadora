'use client';

import React from 'react';
import { Player } from '@remotion/player';
import { ImpactAnimation } from './ImpactAnimation';

export const RemotionPlayer = () => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-full relative rounded-2xl overflow-hidden border border-white/60 shadow-[0_8px_40px_rgba(11,92,255,0.08)] bg-white/40 backdrop-blur-xl">
      <Player
        component={ImpactAnimation}
        durationInFrames={270} // 9 seconds * 30 fps
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        controls={false}
        loop
        autoPlay
        acknowledgeRemotionLicense
      />
    </div>
  );
};
