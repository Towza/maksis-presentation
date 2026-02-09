
import React from 'react';
import { SurfaceMode } from '../types';

interface Props {
  slideId: number;
  surface: SurfaceMode;
}

export const Placeholder: React.FC<Props> = ({ slideId, surface }) => {
  const isDark = surface === 'onyx';
  
  return (
    <div className={`relative w-full max-w-[480px] aspect-square rounded-[40px] border border-white/[0.05] flex flex-col items-center justify-center p-12 transition-all duration-1000 ${
      isDark ? 'bg-white/[0.01]' : 'bg-black/[0.01]'
    }`}>
      {/* Deep Center Glow */}
      <div className={`absolute inset-0 opacity-[0.05] blur-[80px] transition-all duration-1000 ${isDark ? 'bg-white' : 'bg-black'}`} />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="relative flex items-center justify-center w-52 h-52">
          {/* Main geometric center with glow */}
          <div className={`absolute inset-0 border border-white/5 rounded-[40px] rotate-45 transition-transform duration-[4s] animate-[spin_12s_linear_infinite] shadow-[0_0_40px_rgba(255,255,255,0.02)]`} />
          <div className={`absolute inset-6 border border-white/5 rounded-[32px] -rotate-12 animate-[spin_8s_linear_infinite_reverse] shadow-inner`} />
          
          <div className={`w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center transition-all bg-white/[0.02] ${
            isDark ? 'border-white/10 text-white/40' : 'border-black/10 text-black/40'
          }`}>
            <span className="text-4xl font-black font-syne">{slideId < 10 ? `0${slideId}` : slideId}</span>
          </div>
        </div>
        
        <div className="space-y-3 pt-6">
          <div className="h-[2px] w-12 bg-white/10 mx-auto rounded-full blur-[1px]" />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
            Architectural_Core
          </p>
        </div>

        {/* Technical Data Text - Clean, no lines */}
        <div className="absolute top-0 right-0 p-8 text-right opacity-20 mono text-[8px] font-black uppercase tracking-widest hidden lg:block">
           <p>Latency: 0.12ms</p>
           <p>Sync: 99.9%</p>
           <p>Status: Active</p>
        </div>
      </div>
    </div>
  );
};
