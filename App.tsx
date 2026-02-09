import React, { useState, useEffect } from 'react';
import { ViewMode, CoreColor, COLORS, SurfaceMode } from './types';
import { Navbar } from './components/Navbar';
import { EngineView } from './components/EngineView';
import { ModulesView } from './components/ModulesView';
import { IdentitySystem } from './components/IdentitySystem';
import { GeminiAssistant } from './components/GeminiAssistant';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('story');
  const [accent, setAccent] = useState<CoreColor>('emerald');
  const [surface, setSurface] = useState<SurfaceMode>('onyx');

  const activeColor = COLORS[accent];
  const isOnyx = surface === 'onyx';

  useEffect(() => {
    document.body.style.backgroundColor = isOnyx ? '#000' : '#fcfcfc';
    document.body.style.color = isOnyx ? '#fff' : '#000';
  }, [isOnyx]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isOnyx ? 'bg-black text-white selection:bg-white selection:text-black' : 'bg-[#fcfcfc] text-black selection:bg-black selection:text-white'}`}>
      
      <Navbar view={view} setView={setView} activeColor={activeColor} isOnyx={isOnyx} />

      <main className="w-full">
        {view === 'story' && <EngineView activeColor={activeColor} isOnyx={isOnyx} />}
        
        {view === 'flow' && (
          <div className={`min-h-screen pt-24 ${isOnyx ? 'bg-black' : 'bg-[#fcfcfc]'}`}>
            <ModulesView activeColor={activeColor} isOnyx={isOnyx} />
          </div>
        )}

        {view === 'identity' && <IdentitySystem activeColor={activeColor} surface={surface} />}
        
        {view === 'config' && (
          <div className={`h-screen w-full flex items-center justify-center px-6 lg:px-24 sticky top-0 transition-colors duration-1000 ${isOnyx ? 'bg-black' : 'bg-[#fcfcfc]'}`}>
             <div className="max-w-xl w-full space-y-12 lg:space-y-16 text-center">
                <div className="space-y-4 lg:space-y-6">
                   <h2 className="text-4xl lg:text-7xl font-black font-syne uppercase tracking-tighter">
                     GEMINI <span style={{ color: activeColor }}>2.5</span>
                   </h2>
                   <p className="opacity-30 text-sm lg:text-lg font-light italic">Calibrate the resonance of the ecosystem.</p>
                </div>

                <div className="space-y-8 lg:space-y-10">
                   <div className="flex flex-col gap-4">
                     <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-black">Chroma Calibration</p>
                     <div className="flex justify-center gap-6 lg:gap-8">
                        {Object.entries(COLORS).map(([name, code]) => (
                          <button 
                            key={name}
                            onClick={() => setAccent(name as CoreColor)}
                            className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full transition-all duration-500 ring-offset-4 ${isOnyx ? 'ring-offset-black' : 'ring-offset-white'} ${accent === name ? 'scale-110 ring-2' : 'opacity-30 hover:opacity-100'}`}
                            style={{ backgroundColor: code, ringColor: code }}
                          />
                        ))}
                     </div>
                   </div>

                   <div className="flex flex-col gap-4">
                     <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-black">Surface Mode</p>
                     <div className="flex justify-center gap-4">
                        <button 
                          onClick={() => setSurface('onyx')}
                          className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${isOnyx ? 'bg-white text-black border-white' : 'border-black/10 text-black/40 hover:text-black hover:border-black/30'}`}
                        >
                          Onyx
                        </button>
                        <button 
                          onClick={() => setSurface('paper')}
                          className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${!isOnyx ? 'bg-black text-white border-black' : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}
                        >
                          Paper
                        </button>
                     </div>
                   </div>
                </div>
                
                <p className="text-[10px] uppercase tracking-widest opacity-20 font-black">Kernel Architecture: Gemini 2.5 Flash Native</p>
             </div>
          </div>
        )}
      </main>

      <GeminiAssistant activeColor={activeColor} />
    </div>
  );
};

export default App;