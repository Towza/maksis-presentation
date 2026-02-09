
import React from 'react';

interface Props {
  slideId: number;
  accentColor: string;
  isOnyx: boolean;
}

const PremiumCard: React.FC<{ children: React.ReactNode; isOnyx: boolean }> = ({ children, isOnyx }) => (
  <div className={`
    w-full aspect-[4/5] rounded-[48px] border p-12 transition-all duration-1000 flex flex-col justify-center relative overflow-hidden
    ${isOnyx 
      ? 'bg-white/[0.015] border-white/5 text-white backdrop-blur-2xl' 
      : 'bg-white border-black/5 text-black shadow-3xl shadow-black/[0.02]'}
  `}>
    <div className="relative z-10">{children}</div>
  </div>
);

export const DynamicIllustration: React.FC<Props> = ({ slideId, accentColor, isOnyx }) => {
  const cellBg = isOnyx ? 'bg-white/[0.04] border-white/5' : 'bg-black/[0.01] border-black/5';

  if (slideId === 1) return (
    <PremiumCard isOnyx={isOnyx}>
      <div className="space-y-12">
        <div className={`w-full p-10 rounded-[32px] border ${cellBg}`}>
          <p className="text-[10px] font-black tracking-widest uppercase opacity-20 mb-4">Core_Liquidity</p>
          <p className="text-5xl font-black font-syne tracking-tighter">€12.8B</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className={`p-8 rounded-[24px] border ${cellBg}`}>
            <p className="text-[10px] font-black tracking-widest uppercase opacity-20 mb-2">Volume</p>
            <p className="text-2xl font-black font-syne tracking-tight">1.2M</p>
          </div>
          <div className={`p-8 rounded-[24px] border ${cellBg}`}>
            <p className="text-[10px] font-black tracking-widest uppercase opacity-20 mb-2">Health</p>
            <p className="text-2xl font-black font-syne" style={{ color: accentColor }}>99.9%</p>
          </div>
        </div>
      </div>
    </PremiumCard>
  );

  if (slideId === 2) return (
    <PremiumCard isOnyx={isOnyx}>
      <div className="flex flex-col items-center gap-10 py-10">
        <div className="w-32 h-32 rounded-[40px] border-2 border-current border-opacity-10 p-2 overflow-hidden">
          <img src="https://i.pravatar.cc/200?u=premium" className="w-full h-full rounded-[32px] grayscale object-cover" />
        </div>
        <div className="text-center space-y-2">
          <h5 className="text-2xl font-black font-syne uppercase tracking-tight">Verified_Access</h5>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">Identity_Secured</p>
        </div>
        <div className="w-full flex justify-center gap-1">
           {[1,1,1,1,0].map((v, i) => (
             <div key={i} className={`h-1 w-8 rounded-full ${v ? '' : 'opacity-20'}`} style={{ backgroundColor: v ? accentColor : 'currentColor' }} />
           ))}
        </div>
      </div>
    </PremiumCard>
  );

  return (
    <div className={`w-full aspect-square rounded-[48px] border flex flex-col items-center justify-center p-12 transition-all ${isOnyx ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}>
      <span className="text-4xl font-black font-syne opacity-10">{slideId}</span>
    </div>
  );
};
