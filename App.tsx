
import React, { useState, useEffect } from 'react';
import { ViewMode, CoreColor, COLORS, SurfaceMode } from './types';
import { Navbar } from './components/Navbar';
import { EngineView } from './components/EngineView';
import { ModulesView } from './components/ModulesView';
import { IdentitySystem } from './components/IdentitySystem';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('story');
  const [accent, setAccent] = useState<CoreColor>('emerald');
  const [surface, setSurface] = useState<SurfaceMode>('onyx');
  const [storyResetKey, setStoryResetKey] = useState(0);

  const activeColor = COLORS[accent];
  const isOnyx = surface === 'onyx';

  useEffect(() => {
    document.body.style.backgroundColor = isOnyx ? '#000' : '#fcfcfc';
    document.body.style.color = isOnyx ? '#fff' : '#000';
  }, [isOnyx]);

  const handleLogoClick = () => {
    if (view === 'story') {
      setStoryResetKey(prev => prev + 1);
    }
    setView('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isOnyx ? 'bg-black text-white selection:bg-white selection:text-black' : 'bg-[#fcfcfc] text-black selection:bg-black selection:text-white'}`}>
      
      <Navbar 
        view={view} 
        setView={setView} 
        activeColor={activeColor} 
        isOnyx={isOnyx} 
        onLogoClick={handleLogoClick}
      />

      <main className="w-full">
        {view === 'story' && <EngineView key={`story-${storyResetKey}`} activeColor={activeColor} isOnyx={isOnyx} />}
        
        {view === 'flow' && (
          <div className={`min-h-screen pt-24 ${isOnyx ? 'bg-black' : 'bg-[#fcfcfc]'}`}>
            <ModulesView activeColor={activeColor} isOnyx={isOnyx} />
          </div>
        )}

        {view === 'identity' && <IdentitySystem activeColor={activeColor} surface={surface} />}
        
        {view === 'config' && (
          <div className={`min-h-screen w-full flex flex-col items-center pt-32 pb-24 px-6 lg:px-24 transition-colors duration-1000 ${isOnyx ? 'bg-black' : 'bg-[#fcfcfc]'}`}>
             <div className="max-w-xl w-full space-y-16 lg:space-y-20 flex-grow">
                
                {/* SETTINGS SECTION */}
                <div className="space-y-12 lg:space-y-16 text-center">
                   <div className="flex flex-col gap-6">
                     <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-black">Chroma Calibration</p>
                     <div className="flex justify-center gap-6 lg:gap-8">
                        {Object.entries(COLORS).map(([name, code]) => (
                          <button 
                            key={name}
                            onClick={() => setAccent(name as CoreColor)}
                            className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full transition-all duration-500 ring-offset-4 ${isOnyx ? 'ring-offset-black' : 'ring-offset-white'} ${accent === name ? 'scale-110 border-2' : 'border-transparent opacity-30 hover:opacity-100'}`}
                            style={{ backgroundColor: code, borderColor: code }}
                          />
                        ))}
                     </div>
                   </div>

                   <div className="flex flex-col gap-6">
                     <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-black">Surface Mode</p>
                     <div className="flex justify-center gap-4">
                        <button 
                          onClick={() => setSurface('onyx')}
                          className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${isOnyx ? 'bg-white text-black border-white shadow-xl' : 'border-black/10 text-black/40 hover:text-black hover:border-black/30'}`}
                        >
                          Onyx
                        </button>
                        <button 
                          onClick={() => setSurface('paper')}
                          className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${!isOnyx ? 'bg-black text-white border-black shadow-xl' : 'border-white/30 text-white/60 hover:text-white hover:border-white/50'}`}
                        >
                          Paper
                        </button>
                     </div>
                   </div>
                </div>

                {/* CONTACT SECTION */}
                <div className={`pt-20 border-t ${isOnyx ? 'border-white/10' : 'border-black/10'} space-y-12 text-left max-w-sm mx-auto`}>
                   <h3 className="text-2xl lg:text-3xl font-black font-syne uppercase tracking-tight">Contact</h3>
                   
                   <div className="space-y-10">
                      <div className="flex flex-col gap-2 transition-all hover:translate-x-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Email Inquiry</p>
                        <a href="mailto:info@maksis.rocks" className={`text-lg lg:text-2xl font-medium transition-all ${isOnyx ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>
                          info@maksis.rocks
                        </a>
                      </div>

                      <div className="flex flex-col gap-2 transition-all hover:translate-x-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Latvia (LV) Support</p>
                        <p className={`text-lg lg:text-2xl font-medium ${isOnyx ? 'text-white/70' : 'text-black/70'}`}>
                          +371 2 6511192
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 transition-all hover:translate-x-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Finland (FI) Support</p>
                        <p className={`text-lg lg:text-2xl font-medium ${isOnyx ? 'text-white/70' : 'text-black/70'}`}>
                          +358 40 3735896
                        </p>
                      </div>
                   </div>
                </div>
             </div>

             <footer className={`mt-24 w-full flex flex-col items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-30`}>
                <div className={`h-px w-24 mb-4 ${isOnyx ? 'bg-white/10' : 'bg-black/10'}`} />
                <p>2022 - {new Date().getFullYear()} MAKSIS</p>
                <a 
                  href="https://www.grabbity.eu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  COPY RIGHTS <span className="underline decoration-current underline-offset-4">GRABBITY</span>
                </a>
             </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
