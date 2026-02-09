import React from 'react';
import { ViewMode } from '../types';

interface Props {
  view: ViewMode;
  setView: (v: ViewMode) => void;
  activeColor: string;
  isOnyx: boolean;
}

export const Navbar: React.FC<Props> = ({ view, setView, activeColor, isOnyx }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const inactiveTextColor = isOnyx ? 'text-white/30 hover:text-white' : 'text-black/30 hover:text-black';

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] h-20 lg:h-24 flex items-center justify-center pointer-events-none">
      <div className="w-full max-w-7xl px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 lg:gap-6 pointer-events-auto cursor-pointer group"
          onClick={() => setView('story')}
        >
          {/* Adjusted M coordinate from 5 to 8 to align the round cap perfectly with the x=0 visual edge (since strokeWidth=16 means 8px radius) */}
          <div className="w-7 h-7 lg:w-10 lg:h-10 flex items-center justify-center transition-all duration-1000 group-hover:rotate-[360deg]">
            <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
              <path 
                d="M8,45 Q25,43 45,35 T95,5" 
                fill="none" 
                stroke={activeColor} 
                strokeWidth="16" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          <h1 className={`text-base lg:text-2xl font-black font-syne tracking-[0.2em] lg:tracking-[0.4em] uppercase ${textColor}`}>MAKSIS</h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 lg:gap-12 pointer-events-auto overflow-x-auto no-scrollbar">
          {(['story', 'flow', 'identity', 'config'] as const).map((item) => (
            <button 
              key={item}
              onClick={() => {
                setView(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`
                whitespace-nowrap text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.5em] transition-all duration-500 relative py-2
                ${view === item ? textColor : inactiveTextColor}
              `}
            >
              {item === 'story' ? 'Overview' : item === 'flow' ? 'Network' : item === 'identity' ? 'Brand' : 'Terminal'}
              <div 
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${view === item ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                style={{ backgroundColor: activeColor }} 
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};