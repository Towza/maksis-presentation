
import React from 'react';

export const IdentityView: React.FC<{ activeColor: string; isOnyx: boolean }> = ({ activeColor, isOnyx }) => (
  <div className="h-full w-full p-12 lg:p-32 overflow-y-auto pt-32 lg:pt-48">
    <div className="max-w-7xl mx-auto space-y-32 lg:space-y-48">
      
      {/* 1. Logo Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <div className="space-y-8 lg:space-y-12">
           <div className="space-y-4 lg:space-y-6">
             <span className="text-[11px] font-black tracking-[1em] uppercase opacity-20">01 / The Mark</span>
             <h2 className="text-5xl lg:text-7xl font-black font-['Syne'] tracking-tighter uppercase leading-tight">IDENTITY ARCH.</h2>
           </div>
           <p className="text-lg lg:text-xl font-light opacity-40 leading-relaxed">
             The MAKSIS identity is built on a mathematical Bezier curve representing exponential yield.
           </p>
        </div>
        <div className={`aspect-square rounded-[48px] lg:rounded-[64px] flex items-center justify-center border border-current border-opacity-5 ${isOnyx ? 'bg-white/[0.02]' : 'bg-white shadow-2xl'}`}>
           <div className="flex flex-col items-center gap-6">
              <svg viewBox="0 0 100 40" className="w-48 h-16 lg:w-64 lg:h-24">
                <path d="M5,35 Q25,33 45,25 T95,5" fill="none" stroke={activeColor} strokeWidth="9" strokeLinecap="round" />
              </svg>
              <h1 className="text-5xl lg:text-7xl font-black font-['Syne'] tracking-tighter uppercase">MAKSIS</h1>
           </div>
        </div>
      </div>

      {/* 2. Color Mapping */}
      <div className="space-y-12 lg:space-y-16">
        <h3 className="text-3xl lg:text-4xl font-black font-['Syne'] uppercase">CHROMATIC LOGIC.</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {[
            { n: 'Indigo', h: '#6366f1', r: 'Engine' },
            { n: 'Emerald', h: '#10b981', r: 'Success' },
            { n: 'Amber', h: '#f59e0b', r: 'Alert' }
          ].map(c => (
            <div key={c.n} className="space-y-6">
              <div className="aspect-[4/3] rounded-[32px] lg:rounded-[40px] shadow-inner" style={{ backgroundColor: c.h }} />
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-black opacity-30 uppercase">{c.r}</p>
                  <p className="text-xl lg:text-2xl font-black font-['Syne'] uppercase">{c.n}</p>
                </div>
                <p className="text-[10px] font-bold opacity-20 mono">{c.h}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);
