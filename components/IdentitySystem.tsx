
import React from 'react';
import { SurfaceMode } from '../types';

const DetailedLogo: React.FC<{ color: string; scale?: number; isDark?: boolean; showText?: boolean }> = ({ 
  color, 
  scale = 1, 
  isDark = true, 
  showText = true 
}) => (
  <div className="flex items-center gap-6" style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
    <div className="relative w-24 h-12">
      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <path 
          d="M5,35 Q25,33 45,25 T95,5" 
          fill="none" 
          stroke="url(#logoGrad)" 
          strokeWidth="9" 
          strokeLinecap="round" 
        />
        <circle cx="5" cy="35" r="3" fill={color} />
      </svg>
    </div>
    {showText && (
      <div className="flex flex-col">
        <span className={`text-4xl font-black font-syne tracking-tight leading-none ${isDark ? 'text-white' : 'text-black'}`}>MAKSIS</span>
        <span className="text-[8px] font-black tracking-[0.6em] uppercase mt-1" style={{ color }}>Financial Core</span>
      </div>
    )}
  </div>
);

const PrintLogo: React.FC<{ 
  color: string; 
  layout?: 'horizontal' | 'vertical'; 
  isDark?: boolean;
  scale?: number;
  showText?: boolean;
}> = ({ color, layout = 'horizontal', isDark = true, scale = 1, showText = true }) => (
  <div 
    className={`flex ${layout === 'horizontal' ? 'flex-row items-center gap-4' : 'flex-col items-center gap-4 text-center'}`}
    style={{ transform: `scale(${scale})`, transformOrigin: layout === 'horizontal' ? 'left center' : 'center center' }}
  >
    <div className="w-16 h-6 flex items-center">
      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
        <path 
          d="M5,35 Q25,33 45,25 T95,5" 
          fill="none" 
          stroke={color} 
          strokeWidth="12" 
          strokeLinecap="round" 
        />
        <circle cx="5" cy="35" r="5" fill={color} />
      </svg>
    </div>
    {showText && (
      <span className={`text-2xl font-black font-syne tracking-tight leading-none ${isDark ? 'text-white' : 'text-black'}`}>MAKSIS</span>
    )}
  </div>
);

const MotionIdentity: React.FC<{ color: string; scale?: number; animationType?: 'draw' | 'pulse' }> = ({ 
  color, 
  scale = 1,
  animationType = 'draw'
}) => {
  const pathD = "M5,35 Q25,33 45,25 T95,5";
  
  return (
    <div className="flex items-center gap-10" style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      <div className="relative w-40 h-20">
        <svg viewBox="-30 -30 160 100" className="w-full h-full overflow-visible">
          <defs>
            <filter id="hyperGlowLarge" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feFlood floodColor={color} result="color"/>
              <feComposite in="color" in2="blur" operator="in" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path 
            d={pathD} 
            fill="none" 
            stroke={color} 
            strokeWidth="10" 
            strokeLinecap="round" 
            opacity="0.05"
          />

          <path 
            id="motionPath"
            d={pathD} 
            fill="none" 
            stroke={color} 
            strokeWidth="10" 
            strokeLinecap="round" 
            filter="url(#hyperGlowLarge)"
            style={{
              strokeDasharray: '200',
              strokeDashoffset: animationType === 'draw' ? '200' : '0',
              animation: animationType === 'draw' 
                ? 'drawLogo 4s cubic-bezier(0.65, 0, 0.35, 1) infinite'
                : 'none'
            }}
          />
          
          <circle 
            r="7" 
            fill={color} 
            filter="url(#hyperGlowLarge)"
            style={{
              offsetPath: `path("${pathD}")`,
              animation: animationType === 'draw'
                ? 'travelNode 4s cubic-bezier(0.65, 0, 0.35, 1) infinite'
                : 'none',
              opacity: animationType === 'draw' ? 0 : 1
            }}
          />
        </svg>
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-6xl font-black font-syne tracking-tighter leading-none">
          MAKSIS
        </span>
        <span 
          className="text-[10px] font-black tracking-[0.8em] uppercase mt-2 opacity-30" 
          style={{ color }}
        >
          Dynamic System
        </span>
      </div>

      <style>{`
        @keyframes drawLogo {
          0% { stroke-dashoffset: 200; opacity: 0; }
          5% { opacity: 1; }
          45%, 75% { stroke-dashoffset: 0; opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: -200; opacity: 0; }
        }
        @keyframes travelNode {
          0% { offset-distance: 0%; opacity: 0; transform: scale(0.5); }
          5% { opacity: 1; transform: scale(1.5); }
          45%, 75% { offset-distance: 100%; opacity: 1; transform: scale(1); }
          95% { opacity: 1; transform: scale(1); }
          100% { offset-distance: 100%; opacity: 0; transform: scale(0); }
        }
      `}</style>
    </div>
  );
};

export const IdentitySystem: React.FC<{ activeColor: string; surface: SurfaceMode }> = ({ activeColor, surface }) => {
  const isOnyx = surface === 'onyx';

  return (
    <div className={`min-h-screen transition-colors duration-1000 pt-32 pb-64 overflow-y-auto ${isOnyx ? 'bg-[#050505] text-white' : 'bg-[#fcfcfc] text-black'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-48">
        <header className="max-w-4xl space-y-12">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full animate-pulse shadow-lg" style={{ backgroundColor: activeColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Brand Documentation v2.5</span>
          </div>
          <h1 className="text-6xl lg:text-[10rem] font-black font-syne tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
            VISUAL<br/>MANIFESTO<span style={{ color: activeColor }}>.</span>
          </h1>
        </header>

        <section className="space-y-24">
          <div className={`flex items-end justify-between border-b pb-12 ${isOnyx ? 'border-white/10' : 'border-black/10'}`}>
             <h2 className="text-4xl font-black font-syne uppercase">01. Motion & Display</h2>
             <span className="text-[10px] opacity-20 uppercase tracking-widest">Digital Experience Parity</span>
          </div>
          <div className={`relative w-full aspect-[21/9] rounded-[48px] overflow-hidden flex items-center justify-center group border shadow-4xl ${isOnyx ? 'bg-[#020202] border-white/5' : 'bg-white border-black/5'}`}>
            <div className="absolute inset-0 opacity-[0.2] blur-[100px] transition-all duration-[3s]" 
                 style={{ background: `radial-gradient(circle at 50% 50%, ${activeColor} 0%, transparent 70%)` }} />
            <div className="relative z-10 flex flex-col items-center gap-12">
               <div className="scale-125 md:scale-150 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                  <MotionIdentity color={activeColor} animationType="draw" />
               </div>
            </div>
          </div>
        </section>

        <section className="space-y-24">
          <div className={`flex items-end justify-between border-b pb-12 ${isOnyx ? 'border-white/10' : 'border-black/10'}`}>
             <h2 className="text-4xl font-black font-syne uppercase">02. Physical Artifacts</h2>
             <span className="text-[10px] opacity-20 uppercase tracking-widest">Brand Implementation</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             <div className={`relative w-full aspect-[4/5] rounded-[32px] overflow-hidden flex flex-col items-center group border ${isOnyx ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-black/5'}`}>
                <div className="relative z-10 mt-24 space-y-32 flex flex-col items-center">
                   <div className="text-center space-y-2 opacity-40">
                      <div className={`w-12 h-[1px] mx-auto ${isOnyx ? 'bg-white' : 'bg-black'}`} />
                      <p className="text-[7px] font-black uppercase tracking-[0.4em]">Front Placement</p>
                   </div>
                   <div className="scale-75 group-hover:scale-90 transition-transform duration-1000">
                      <PrintLogo color={activeColor} layout="vertical" isDark={isOnyx} />
                   </div>
                </div>
             </div>
             
             <div className={`relative w-full aspect-[4/5] rounded-[32px] overflow-hidden flex flex-col items-center group border ${isOnyx ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-black/5'}`}>
                <div className="relative z-10 mt-32 space-y-24 flex flex-col items-center">
                   <div className="text-center space-y-2 opacity-40">
                      <div className={`w-12 h-[1px] mx-auto ${isOnyx ? 'bg-white' : 'bg-black'}`} />
                      <p className="text-[7px] font-black uppercase tracking-[0.4em]">Headwear</p>
                   </div>
                   <div className="scale-[0.6] group-hover:scale-[0.7] transition-transform duration-1000">
                      <PrintLogo color={activeColor} layout="vertical" showText={false} isDark={isOnyx} />
                   </div>
                </div>
             </div>

             <div className={`relative w-full aspect-[4/5] rounded-[32px] overflow-hidden flex items-center justify-center p-6 border group ${isOnyx ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-black/5'}`}>
                <div className="w-full max-w-[260px] aspect-[2/3.2] bg-white rounded-[24px] p-8 flex flex-col text-black shadow-4xl transition-transform duration-700 group-hover:scale-[1.02]">
                   <div className="flex justify-between items-start mb-12">
                      <PrintLogo color="black" isDark={false} showText={true} scale={0.45} />
                      <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: activeColor }} />
                   </div>
                   <div className="flex-grow space-y-8">
                      <div className="w-24 h-24 bg-black/5 rounded-[20px] overflow-hidden grayscale border border-black/5">
                         <img src="https://i.pravatar.cc/200?u=identity" className="w-full h-full object-cover opacity-90" alt="Identity" />
                      </div>
                      <div className="space-y-2">
                         <p className="text-2xl font-black font-syne uppercase leading-none tracking-tight">Alex Rivera</p>
                         <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Senior Architect</p>
                      </div>
                   </div>
                   <div className="pt-8 border-t border-black/5 flex flex-col gap-4">
                      <div className="h-4 bg-black/5 w-full rounded-sm overflow-hidden relative">
                         <div className="absolute inset-0 bg-black/10 animate-pulse" />
                      </div>
                      <div className="flex justify-between items-center text-[7px] font-black opacity-30 tracking-widest">
                         <span>ID: 9942-X</span>
                         <span>Valid: 12/26</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        <section className="space-y-24">
          <div className={`flex items-end justify-between border-b pb-12 ${isOnyx ? 'border-white/10' : 'border-black/10'}`}>
             <h2 className="text-4xl font-black font-syne uppercase">03. Master Lockups</h2>
             <span className="text-[10px] opacity-20 uppercase tracking-widest">Universal Standards</span>
          </div>

          <div className="space-y-12">
             <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30">On Paper Surface</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white rounded-[48px] p-24 flex flex-col items-center justify-center gap-14 border border-black/5 min-h-[450px] shadow-2xl">
                   <PrintLogo color="black" layout="horizontal" isDark={false} scale={1.4} />
                   <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.5em] text-black">Horizontal Standard</span>
                </div>
                <div className="bg-white rounded-[48px] p-24 flex flex-col items-center justify-center gap-14 border border-black/5 min-h-[450px] shadow-2xl">
                   <PrintLogo color="black" layout="vertical" isDark={false} scale={1.4} />
                   <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.5em] text-black">Vertical Stacked</span>
                </div>
             </div>
          </div>

          <div className="space-y-12">
             <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30">On Primary Accent</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="rounded-[48px] p-24 flex flex-col items-center justify-center gap-14 min-h-[450px] shadow-4xl overflow-hidden relative" style={{ backgroundColor: activeColor }}>
                   <div className="absolute inset-0 bg-white/10 blur-[100px] opacity-20" />
                   <PrintLogo color="white" layout="horizontal" isDark={true} scale={1.4} />
                   <span className="text-[9px] font-black opacity-50 uppercase tracking-[0.5em] text-white">Reverse Horizontal</span>
                </div>
                <div className="rounded-[48px] p-24 flex flex-col items-center justify-center gap-14 min-h-[450px] shadow-4xl overflow-hidden relative" style={{ backgroundColor: activeColor }}>
                   <div className="absolute inset-0 bg-white/10 blur-[100px] opacity-20" />
                   <PrintLogo color="white" layout="vertical" isDark={true} scale={1.4} />
                   <span className="text-[9px] font-black opacity-50 uppercase tracking-[0.5em] text-white">Reverse Stacked</span>
                </div>
             </div>
          </div>
        </section>

        <footer className="pt-24 border-t border-white/5 opacity-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-center md:text-left">
              <div><p>Revision</p><p>{new Date().getFullYear()}.02.21 Stable</p></div>
              <div><p>Core Font</p><p>Syne Variable</p></div>
              <div><p>Body Font</p><p>Jakarta Sans</p></div>
              <div><p>Intelligence</p><p>Gemini 2.5 Pro</p></div>
           </div>
        </footer>
      </div>
    </div>
  );
};
