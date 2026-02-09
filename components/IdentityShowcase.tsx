
import React, { useState } from 'react';
import { CoreColor, SurfaceMode, COLORS } from '../types';

interface LogoProps {
  accentColor: string;
  isDark: boolean;
  scale?: number;
  showTagline?: boolean;
  className?: string;
}

const MaksisLogo: React.FC<LogoProps> = ({ 
  accentColor, 
  isDark, 
  scale = 1, 
  showTagline = true,
  className = "" 
}) => (
  <div className={`flex items-center gap-[6%] ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
    <div className="relative w-[140px] h-[50px] flex items-center justify-center">
      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
        <path 
          d="M5,35 Q25,33 45,25 T95,5" 
          fill="none" 
          stroke={accentColor} 
          strokeWidth="9" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
    <div className="flex flex-col justify-center">
      <h1 className={`text-6xl font-black font-['Syne'] tracking-[0.02em] leading-[0.85] ${isDark ? 'text-white' : 'text-black'}`}>
        MAKSIS
      </h1>
      {showTagline && (
        <span className="text-[11px] font-black tracking-[0.48em] uppercase mt-1.5" style={{ color: accentColor }}>
          FINTECH CORE
        </span>
      )}
    </div>
  </div>
);

interface Props {
  accent: CoreColor;
  surface: SurfaceMode;
}

export const IdentityShowcase: React.FC<Props> = ({ accent, surface }) => {
  const isOnyx = surface === 'onyx';
  const activeColor = COLORS[accent];

  return (
    <div className={`w-full h-full overflow-y-auto scroll-smooth transition-colors duration-1000 ${isOnyx ? 'bg-[#010204] text-white' : 'bg-[#fcfcfc] text-black'}`}>
      
      {/* 1. ARCHITECTURAL COVER */}
      <section className="min-h-screen relative flex flex-col justify-center px-10 lg:px-24 py-32 overflow-hidden">
        {/* Soft Volumetric Background - No Grid */}
        <div className="absolute inset-0 opacity-[0.1] blur-[150px] pointer-events-none" 
             style={{ background: `radial-gradient(circle at 70% 30%, ${activeColor} 0%, transparent 70%)` }} />
        
        <div className="relative z-10 space-y-12 lg:space-y-16">
          <div className="inline-flex items-center gap-4 px-7 py-3 rounded-full border border-current border-opacity-10 bg-current bg-opacity-[0.02] backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse shadow-lg" style={{ backgroundColor: activeColor }} />
            <span className="text-[11px] font-black tracking-[0.7em] uppercase opacity-50">Identity_Manual_v12.0_Master</span>
          </div>
          
          <div className="space-y-8">
            <h1 className="text-6xl sm:text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] font-['Syne'] uppercase drop-shadow-2xl">
              VISUAL<br/>CORE.
            </h1>
            <p className="max-w-2xl text-xl lg:text-3xl font-light opacity-30 leading-relaxed tracking-tight">
              The definitive guide to the MAKSIS identity system. Engineered for absolute clarity in the global financial landscape.
            </p>
          </div>

          <div className="flex gap-24 items-center pt-14">
             <div className="space-y-3">
               <p className="text-[11px] font-black opacity-20 uppercase tracking-[0.3em]">Philosophy</p>
               <p className="text-2xl font-black font-['Syne'] tracking-tight">Absolute Velocity</p>
             </div>
             <div className="w-px h-16 bg-current opacity-10" />
             <div className="space-y-3">
               <p className="text-[11px] font-black opacity-20 uppercase tracking-[0.3em]">Market</p>
               <p className="text-2xl font-black font-['Syne'] tracking-tight">Enterprise Modular</p>
             </div>
          </div>
        </div>
      </section>

      {/* 2. THE ANATOMY */}
      <section className="py-32 lg:py-48 border-y border-current border-opacity-5">
        <div className="max-w-7xl mx-auto px-10 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-4">
              <span className="text-[12px] font-black tracking-widest opacity-20 uppercase">01 / Construction</span>
              <h2 className="text-5xl lg:text-8xl font-black font-['Syne'] tracking-tighter uppercase leading-tight">THE YIELD ARC.</h2>
            </div>
            <p className="opacity-40 leading-relaxed text-lg lg:text-2xl font-light">
              The symbol is a mathematical Bezier curve representing an exponential growth trajectory. It maintains a constant 8pt stroke weight relative to the "M" height.
            </p>
            <div className="grid grid-cols-2 gap-6 text-[11px] mono font-black uppercase opacity-40">
              <div className="p-8 border border-current border-opacity-5 rounded-[32px] lg:rounded-[40px] space-y-3 bg-current bg-opacity-[0.01]">
                <p className="opacity-40">Ascent_Ratio</p>
                <p className="text-base tracking-tighter">1.618 (PHI)</p>
              </div>
              <div className="p-8 border border-current border-opacity-5 rounded-[32px] lg:rounded-[40px] space-y-3 bg-current bg-opacity-[0.01]">
                <p className="opacity-40">Stroke_Style</p>
                <p className="text-base tracking-tighter">Round_Hemisphere</p>
              </div>
            </div>
          </div>
          
          <div className={`aspect-square rounded-[64px] lg:rounded-[80px] flex items-center justify-center relative overflow-hidden group transition-all duration-1000 ${isOnyx ? 'bg-white/[0.02]' : 'bg-white shadow-3xl border border-black/5'}`}>
             <MaksisLogo accentColor={activeColor} isDark={isOnyx} scale={1.35} />
             {/* Atmospheric Depth - No Grid */}
             <div className="absolute inset-0 opacity-[0.05] bg-gradient-to-br from-current to-transparent blur-[100px]" />
          </div>
        </div>
      </section>

      {/* 3. CHROMATICS */}
      <section className="py-32 lg:py-48 px-10 lg:px-24 max-w-7xl mx-auto space-y-20 lg:space-y-32">
        <div className="text-center space-y-8">
          <span className="text-[12px] font-black tracking-widest opacity-20 uppercase">02 / Chromatics</span>
          <h2 className="text-6xl lg:text-8xl font-black font-['Syne'] tracking-tighter uppercase">SYSTEM PALETTE.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {[
            { name: 'Indigo', role: 'CORE_ENGINE', desc: 'Used for primary banking orchestration and enterprise flows.', color: COLORS.indigo },
            { name: 'Emerald', role: 'GROWTH_UNIT', desc: 'Applied to retail interfaces, rewards, and successful transaction states.', color: COLORS.emerald },
            { name: 'Amber', role: 'RISK_GATE', desc: 'Strategic highlighting for AML, security alerts, and high-value approvals.', color: COLORS.amber },
          ].map((c) => (
            <div key={c.name} className={`p-10 lg:p-14 rounded-[56px] border border-current border-opacity-5 flex flex-col gap-12 lg:gap-16 transition-all duration-700 hover:-translate-y-4 hover:shadow-4xl ${isOnyx ? 'bg-[#0a0a0a]' : 'bg-white shadow-2xl'}`}>
               <div className="w-full aspect-square rounded-[44px] lg:rounded-[52px] shadow-inner transition-transform duration-700 group-hover:scale-105" style={{ backgroundColor: c.color, boxShadow: `0 30px 60px ${c.color}33` }} />
               <div className="space-y-8">
                 <div className="space-y-3">
                   <span className="text-[11px] font-black tracking-[0.3em] opacity-40 uppercase">{c.role}</span>
                   <h3 className="text-4xl lg:text-5xl font-black font-['Syne'] uppercase tracking-tight">{c.name}</h3>
                 </div>
                 <p className="text-lg opacity-30 leading-relaxed font-light">{c.desc}</p>
                 <div className="pt-6 flex justify-between items-center opacity-30 mono text-[11px] font-black border-t border-current border-opacity-5">
                   <span>{c.color}</span>
                   <span>SRGB_STABLE</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MATERIALITY */}
      <section className="py-32 lg:py-48 bg-current bg-opacity-[0.01] border-t border-current border-opacity-5">
        <div className="max-w-7xl mx-auto px-10 lg:px-24 space-y-20 lg:space-y-32">
          <div className="flex flex-col gap-6">
            <span className="text-[12px] font-black tracking-widest opacity-20 uppercase">03 / Production</span>
            <h2 className="text-6xl lg:text-8xl font-black font-['Syne'] tracking-tighter uppercase">MATERIALITY.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20">
             {/* Card Concept */}
             <div className={`aspect-video rounded-[56px] lg:rounded-[72px] relative overflow-hidden group transition-all duration-1000 hover:scale-[1.03] shadow-[0_50px_100px_rgba(0,0,0,0.6)] ${isOnyx ? 'bg-[#050505]' : 'bg-[#111]'}`}>
                <div className="absolute inset-0 p-12 lg:p-20 flex flex-col justify-between text-white">
                   <div className="flex justify-between items-start">
                      <MaksisLogo accentColor={activeColor} isDark={true} scale={0.6} />
                      <div className="w-20 h-14 lg:w-24 lg:h-18 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/30 to-transparent border border-white/20 backdrop-blur-xl shadow-2xl" />
                   </div>
                   <div className="space-y-6">
                      <div className="h-[1.5px] bg-white opacity-10 w-full rounded-full blur-[0.5px]" />
                      <div className="flex justify-between items-end pt-8 lg:pt-14">
                         <span className="text-2xl lg:text-3xl font-light tracking-[0.25em] opacity-40">5412 8800 0012 9942</span>
                         <span className="text-[11px] lg:text-[12px] font-black tracking-[0.5em] opacity-40 uppercase">PLATINUM_CORE</span>
                      </div>
                   </div>
                </div>
                {/* Clean Volumetric Overlay - No noise/grid */}
                <div className="absolute inset-0 opacity-[0.05] bg-white mix-blend-overlay" />
             </div>

             {/* Stationary Concept */}
             <div className={`aspect-video rounded-[56px] lg:rounded-[72px] relative overflow-hidden group transition-all duration-1000 hover:scale-[1.03] shadow-[0_50px_100px_rgba(0,0,0,0.1)] bg-white`}>
                <div className="absolute inset-0 p-12 lg:p-20 flex flex-col justify-between text-black">
                   <div className="flex items-center gap-6 lg:gap-8">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-current opacity-[0.03] rounded-full flex items-center justify-center backdrop-blur-sm">
                         <MaksisLogo accentColor={activeColor} isDark={false} scale={0.16} showTagline={false} />
                      </div>
                      <div className="h-px w-24 lg:w-40 bg-current opacity-10" />
                      <span className="text-[10px] lg:text-[11px] font-black tracking-widest opacity-20 uppercase">Confidential_Report</span>
                   </div>
                   <div className="space-y-4 opacity-[0.03]">
                      <div className="h-4 lg:h-5 bg-current w-full rounded-full" />
                      <div className="h-4 lg:h-5 bg-current w-5/6 rounded-full" />
                      <div className="h-4 lg:h-5 bg-current w-3/4 rounded-full" />
                   </div>
                   <div className="flex justify-between items-center pt-10 lg:pt-14">
                      <MaksisLogo accentColor={activeColor} isDark={false} scale={0.45} />
                      <span className="text-[10px] lg:text-[11px] font-black opacity-30 tracking-[0.4em] uppercase">Approved_v12</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER SPECS */}
      <footer className="py-32 lg:py-48 px-10 lg:px-24 border-t border-current border-opacity-5 opacity-30">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16 text-[11px] font-black uppercase tracking-[0.5em] mono">
            <div className="space-y-5">
               <p className="opacity-40">Architecture</p>
               <p>EXPONENTIAL_BEZIER</p>
            </div>
            <div className="space-y-5">
               <p className="opacity-40">Color_Mapping</p>
               <p className="text-emerald-500">{activeColor}</p>
            </div>
            <div className="space-y-5">
               <p className="opacity-40">Commit_Hash</p>
               <p>MKS_2025_CORE</p>
            </div>
            <div className="space-y-5">
               <p className="opacity-40">Status</p>
               <p>LOCKED_FOR_PROD</p>
            </div>
         </div>
      </footer>
    </div>
  );
};
