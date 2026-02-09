
import React, { useState } from 'react';
import { COLORS } from '../types';

interface YieldAssetProps {
  color: string;
  thickness: number;
  animate?: boolean;
  depth?: 'front' | 'back';
  layout?: 'horizontal' | 'vertical';
  isPrint?: boolean;
  showText?: boolean;
}

const YieldAsset: React.FC<YieldAssetProps> = ({ 
  color, 
  thickness, 
  animate = true, 
  depth = 'front', 
  layout = 'horizontal',
  isPrint = false,
  showText = true
}) => {
  const curve = (
    <div className={`relative ${layout === 'horizontal' ? 'w-64 h-24' : 'w-24 h-64'} flex items-center justify-center pointer-events-none`}>
      <svg className={`w-full h-full overflow-visible ${layout === 'vertical' ? '-rotate-90' : ''}`} viewBox="0 0 100 40">
        <defs>
          <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path 
          d="M0,40 Q20,38 40,30 T70,10 T100,0" 
          fill="none" 
          stroke={isPrint ? (color === 'transparent' ? 'currentColor' : color) : color} 
          strokeWidth={thickness} 
          strokeLinecap="round"
          strokeDasharray={animate ? "200" : "none"}
          className={animate ? "animate-[draw_3s_ease-out_infinite]" : ""}
          style={!isPrint ? { filter: 'url(#logoGlow)' } : {}}
        />
        {!isPrint && <circle cx="100" cy="0" r={thickness / 1.2} fill={color} className={animate ? "animate-pulse" : ""} />}
      </svg>
    </div>
  );

  const text = showText ? (
    <div className={`flex flex-col items-center z-10 ${depth === 'back' ? 'mix-blend-normal' : ''}`}>
      <span className={`font-['Syne'] font-black tracking-[-0.05em] uppercase leading-none ${layout === 'horizontal' ? 'text-6xl' : 'text-4xl'}`}>MAKSIS</span>
      <span className="text-[10px] font-black opacity-30 tracking-[0.5em] uppercase mt-2">Core_Engine</span>
    </div>
  ) : null;

  return (
    <div className={`relative flex ${layout === 'horizontal' ? 'flex-col' : 'flex-row'} items-center justify-center gap-4 p-12 transition-all group overflow-visible`}>
      {/* Background Layer */}
      {depth === 'back' && (
        <div className="absolute inset-0 flex items-center justify-center opacity-60 scale-110">
          {curve}
        </div>
      )}
      
      {/* Middle Layer (Text) */}
      {text}
      
      {/* Front Layer */}
      {depth === 'front' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {curve}
        </div>
      )}

      {/* Solo Curve (no text) */}
      {!showText && curve}
    </div>
  );
};

export const LogoGallery: React.FC = () => {
  const [activeColor] = useState(COLORS.emerald);

  return (
    <div className="w-full h-full overflow-y-auto p-12 lg:p-24 pt-48 scrollbar-hide bg-[#010204] text-white">
      <div className="max-w-[1400px] mx-auto space-y-48">
        
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-20">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-black tracking-[1.5em] uppercase opacity-40">Asset_Specification_v12</span>
          </div>
          <h2 className="text-8xl font-black tracking-tighter font-['Syne']">COMPOSITION LAB.</h2>
          <p className="max-w-2xl text-xl font-light opacity-30 leading-relaxed italic">
            Visual stress-testing the Yield Curve. Explorations in spatial depth, orientation, and production constraints.
          </p>
        </div>

        {/* 1. LAYOUT & ORIENTATION */}
        <section className="space-y-16">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <h3 className="text-3xl font-black tracking-tight font-['Syne']">01. ORIENTATION</h3>
            <span className="mono text-[10px] opacity-20 uppercase tracking-[0.4em]">Axis_Configuration</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-20 flex flex-col items-center gap-10 group hover:bg-white/[0.04] transition-all">
              <span className="text-[9px] font-black opacity-20 uppercase tracking-widest self-start">Mode: Horizontal_Standard</span>
              <YieldAsset color={activeColor} thickness={12} layout="horizontal" />
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-20 flex flex-col items-center gap-10 group hover:bg-white/[0.04] transition-all">
              <span className="text-[9px] font-black opacity-20 uppercase tracking-widest self-start">Mode: Vertical_Stack</span>
              <YieldAsset color={activeColor} thickness={12} layout="vertical" />
            </div>
          </div>
        </section>

        {/* 2. Z-AXIS DEPTH */}
        <section className="space-y-16">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <h3 className="text-3xl font-black tracking-tight font-['Syne']">02. SPATIAL DEPTH</h3>
            <span className="mono text-[10px] opacity-20 uppercase tracking-[0.4em]">Z_Index_Lockdown</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="relative aspect-video bg-white/[0.02] border border-white/5 rounded-[40px] flex items-center justify-center overflow-hidden group">
               <div className="absolute top-10 left-10 text-[9px] font-black opacity-20 uppercase tracking-widest">Type: Curve_Front</div>
               <YieldAsset color={activeColor} thickness={16} depth="front" layout="horizontal" />
            </div>
            <div className="relative aspect-video bg-white/[0.02] border border-white/5 rounded-[40px] flex items-center justify-center overflow-hidden group">
               <div className="absolute top-10 left-10 text-[9px] font-black opacity-20 uppercase tracking-widest">Type: Curve_Back</div>
               <YieldAsset color={activeColor} thickness={16} depth="back" layout="horizontal" />
            </div>
          </div>
        </section>

        {/* 3. CHROMA & PRODUCTION */}
        <section className="space-y-16">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <h3 className="text-3xl font-black tracking-tight font-['Syne']">03. CHROMA & OUTPUT</h3>
            <span className="mono text-[10px] opacity-20 uppercase tracking-[0.4em]">Production_Ready</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Color Digital */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 flex flex-col items-center gap-10 hover:border-emerald-500/30 transition-all">
              <span className="text-[8px] font-black opacity-20 uppercase tracking-widest">Digital_Color_Full</span>
              <YieldAsset color={activeColor} thickness={8} animate={true} showText={false} />
              <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-20" />
            </div>
            {/* Mono Digital */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 flex flex-col items-center gap-10">
              <span className="text-[8px] font-black opacity-20 uppercase tracking-widest">Digital_Mono_Dark</span>
              <YieldAsset color="white" thickness={8} animate={true} showText={false} />
            </div>
            {/* Print Color */}
            <div className="bg-white rounded-3xl p-10 flex flex-col items-center gap-10 shadow-2xl">
              <span className="text-[8px] font-black text-black opacity-40 uppercase tracking-widest">Print_Color_Static</span>
              <YieldAsset color={activeColor} thickness={12} animate={false} isPrint={true} showText={false} />
              <div className="flex gap-2">
                 <div className="w-4 h-4 rounded bg-emerald-500" />
                 <span className="text-[9px] font-bold text-black opacity-40 mono uppercase">PANTONE_3395C</span>
              </div>
            </div>
            {/* Print Mono */}
            <div className="bg-white rounded-3xl p-10 flex flex-col items-center gap-10 shadow-2xl">
              <span className="text-[8px] font-black text-black opacity-40 uppercase tracking-widest">Print_Mono_K100</span>
              <YieldAsset color="black" thickness={12} animate={false} isPrint={true} showText={false} />
              <div className="flex gap-2">
                 <div className="w-4 h-4 rounded bg-black" />
                 <span className="text-[9px] font-bold text-black opacity-40 mono uppercase">CMYK_0_0_0_100</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Footer */}
        <div className="py-24 grid grid-cols-1 md:grid-cols-3 gap-20 border-t border-white/10 opacity-30">
          <div className="space-y-4">
            <span className="text-[11px] font-black uppercase tracking-widest">Geometry_Specs</span>
            <p className="text-xs leading-relaxed mono">BEZIER_CURVE: [M0,40 Q20,38 40,30 T70,10 T100,0]<br/>ARC_TYPE: EXPONENTIAL_GROWTH</p>
          </div>
          <div className="space-y-4">
            <span className="text-[11px] font-black uppercase tracking-widest">Stroke_Strategy</span>
            <p className="text-xs leading-relaxed mono">VAR_WIDTH: 4pt -> 32pt<br/>CAP_TYPE: ROUNDED_HEMISPHERE</p>
          </div>
          <div className="space-y-4">
            <span className="text-[11px] font-black uppercase tracking-widest">Identity_Commit</span>
            <p className="text-xs leading-relaxed mono">VERSION: 12.0.4_STABLE<br/>LAST_MOD: 2025_02_20_23:14</p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes draw {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};
