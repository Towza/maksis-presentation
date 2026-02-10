
import React from 'react';
import { ViewMode } from '../types';

interface Props {
  view: ViewMode;
  setView: (v: ViewMode) => void;
  activeColor: string;
  isOnyx: boolean;
  onLogoClick?: () => void;
}

export const Navbar: React.FC<Props> = ({ view, setView, activeColor, isOnyx, onLogoClick }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const inactiveTextColor = isOnyx ? 'text-white/30 hover:text-white' : 'text-black/30 hover:text-black';

  const menuItems = [
    { id: 'story', label: 'Overview' },
    { id: 'flow', label: 'Network' },
    { id: 'identity', label: 'Brand' },
    { id: 'config', label: 'Terminal' }
  ] as const;

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] h-16 lg:h-24 flex items-center justify-center pointer-events-none px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
        
        {/* Logo Section - Left Aligned - Link to Start */}
        <div 
          className="flex items-center gap-2 lg:gap-4 cursor-pointer group"
          onClick={onLogoClick ? onLogoClick : () => setView('story')}
          aria-label="Atpakaļ uz sākumu"
        >
          <div className="w-5 h-5 lg:w-10 lg:h-10 flex items-center justify-center transition-all duration-1000 group-hover:rotate-[360deg]">
            <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
              <path 
                d="M5,35 Q25,33 45,25 T95,5" 
                fill="none" 
                stroke={activeColor} 
                strokeWidth="16" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          <h1 className={`text-base lg:text-3xl font-black font-syne tracking-tighter uppercase leading-none ${textColor}`}>MAKSIS</h1>
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden lg:flex items-center gap-12">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => {
                setView(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`
                whitespace-nowrap text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-500 relative py-2
                ${view === item.id ? textColor : inactiveTextColor}
              `}
            >
              {item.label}
              <div 
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${view === item.id ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                style={{ backgroundColor: activeColor }} 
              />
            </button>
          ))}
        </div>

        {/* Mobile Navigation Toggle - Native App Feel */}
        <button 
          onClick={() => setView('config')}
          className="flex lg:hidden items-center gap-2.5 group py-2"
        >
           <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${textColor} opacity-30 group-hover:opacity-100 transition-opacity`}>MENU</span>
           <div className="flex flex-col gap-1 items-end">
              <div className="w-3.5 h-[1.5px] rounded-full transition-all" style={{ backgroundColor: activeColor }} />
              <div className="w-2 h-[1.5px] rounded-full transition-all opacity-40" style={{ backgroundColor: activeColor }} />
           </div>
        </button>

      </div>
    </nav>
  );
};
