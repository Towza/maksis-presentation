import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDES } from '../constants';
import { SlideVisuals } from './SlideVisuals';
import { BackgroundParticles } from './BackgroundParticles';

export const EngineView: React.FC<{ activeColor: string; isOnyx: boolean }> = ({ activeColor, isOnyx }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const scrollToSlide = useCallback((index: number) => {
    const target = slideRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const textColor = isOnyx ? 'text-white' : 'text-black';
  const subtextColor = isOnyx ? 'text-white/30' : 'text-black/40';
  const featureIconBg = isOnyx ? 'bg-white/[0.04]' : 'bg-black/[0.04]';
  const featureTextColor = isOnyx ? 'text-white/20' : 'text-black/30';

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-1000 ${isOnyx ? 'bg-[#010204]' : 'bg-[#fcfcfc]'}`}>
      
      {/* 1. FLUID ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Layer 1: Deep Primary Nebula */}
        <div 
          className={`absolute inset-[-30%] transition-all duration-[4s] ease-out ${isOnyx ? 'opacity-[0.25] blur-[180px]' : 'opacity-[0.1] blur-[140px]'}`}
          style={{ 
            transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px) rotate(${activeIndex * 8}deg)`,
            background: `
              radial-gradient(circle at 10% 20%, ${activeColor}dd 0%, transparent 60%),
              radial-gradient(circle at 90% 80%, ${activeColor} 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, ${isOnyx ? '#0a0a2e' : '#e5e7eb'} 0%, transparent 80%)
            `
          }}
        />

        {/* Layer 2: Secondary Organic Glow Blobs */}
        <div 
          className={`absolute inset-0 blur-[120px] animate-organic-drift ${isOnyx ? 'opacity-[0.15]' : 'opacity-[0.05]'}`}
          style={{
            background: `
              radial-gradient(circle at 30% 70%, ${activeColor}88 0%, transparent 40%),
              radial-gradient(circle at 70% 30%, ${activeColor}aa 0%, transparent 40%)
            `
          }}
        />

        {/* Layer 3: Interactive Spotlight Glow */}
        <div 
          className={`absolute inset-0 blur-[100px] transition-all duration-[1s] ${isOnyx ? 'opacity-[0.12]' : 'opacity-[0.03]'}`}
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, ${isOnyx ? 'white' : activeColor} 0%, transparent 35%)`
          }}
        />
      </div>

      <BackgroundParticles activeColor={activeColor} />

      <div 
        ref={containerRef}
        className="relative h-full overflow-y-auto scroll-smooth snap-y snap-mandatory hide-scrollbar z-10"
      >
        {SLIDES.map((slide, index) => {
          // Slide 9 remains wide as it is the core architecture technical overview
          const isWideSlide = slide.id === 9;
          
          return (
            <section 
              key={slide.id}
              data-index={index}
              ref={el => slideRefs.current[index] = el}
              className="w-full h-screen snap-start snap-always flex items-center justify-center pt-20 lg:pt-0"
            >
              <div className={`w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 transition-all duration-1000 ${activeIndex === index ? 'opacity-100 scale-100 blur-0 translate-y-0' : 'opacity-0 scale-95 blur-2xl translate-y-10'}`}>
                <div className="max-h-full overflow-y-auto lg:overflow-visible no-scrollbar py-6 lg:py-0">
                  {isWideSlide ? (
                    <div className="flex flex-col items-center text-center space-y-6 lg:space-y-10 scale-[0.85] sm:scale-100">
                      <div className="space-y-4 max-w-4xl">
                        <span className="text-[9px] lg:text-[10px] font-black tracking-[0.5em] lg:tracking-[0.8em] uppercase opacity-40 block" style={{ color: activeColor }}>
                          {slide.category}
                        </span>
                        <h2 className={`text-2xl sm:text-5xl lg:text-6xl font-black font-syne uppercase tracking-tighter leading-[0.85] ${textColor} drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
                          {slide.title}
                        </h2>
                      </div>
                      <div className="w-full flex justify-center">
                        <SlideVisuals id={slide.id} activeColor={activeColor} isOnyx={isOnyx} />
                      </div>
                      <div className="max-w-2xl">
                         <p className={`text-xs lg:text-lg font-light ${subtextColor} leading-relaxed px-4 lg:px-0`}>{slide.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-20 items-center scale-[0.9] sm:scale-100">
                      <div className="space-y-6 lg:space-y-10">
                        <div className="space-y-3 lg:space-y-6">
                          <span className="text-[9px] lg:text-[11px] font-black tracking-[0.3em] lg:tracking-[0.7em] uppercase opacity-50 block" style={{ color: activeColor }}>
                            {slide.category}
                          </span>
                          <h2 className={`${slide.id === 1 ? 'text-2xl sm:text-5xl lg:text-6xl animate-text-reveal' : 'text-xl sm:text-4xl lg:text-5xl'} font-black font-syne uppercase tracking-tighter leading-[0.9] ${textColor} drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]`}>
                            {slide.title}
                          </h2>
                          {slide.quote && (
                            <div className="relative pl-5 lg:pl-10 py-1 lg:py-2">
                               <div className="absolute left-0 top-0 bottom-0 w-1 lg:w-1.5 rounded-full overflow-hidden blur-[1px] lg:blur-[2px]">
                                  <div className="w-full h-full animate-pulse shadow-lg" style={{ backgroundColor: activeColor }} />
                               </div>
                               <p className="text-sm lg:text-xl font-medium tracking-tight leading-tight" style={{ color: activeColor }}>
                                 {slide.quote}
                               </p>
                            </div>
                          )}
                          <div className="max-w-xl space-y-6 lg:space-y-10">
                            <p className={`text-xs lg:text-xl font-light ${subtextColor} leading-relaxed`}>
                              {slide.description}
                            </p>
                            {slide.features && slide.features.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-6">
                                {slide.features.map((feature, i) => (
                                  <div key={i} className="flex items-center gap-3 lg:gap-4 group">
                                    <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-xl lg:rounded-2xl border border-current border-opacity-10 flex items-center justify-center transition-all ${featureIconBg} group-hover:scale-110 group-hover:bg-opacity-10 shadow-lg`} style={{ color: activeColor }}>
                                      <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                    </div>
                                    <span className={`text-[8px] lg:text-[10px] font-black uppercase tracking-widest ${featureTextColor} group-hover:${textColor} transition-colors`}>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-full perspective-2000">
                           <div className="animate-float-refined flex lg:justify-end">
                              <SlideVisuals id={slide.id} activeColor={activeColor} isOnyx={isOnyx} />
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <style>{`
        @keyframes text-reveal {
          0% { transform: translateY(20px) scale(0.98); opacity: 0; filter: blur(10px); }
          100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes organic-drift {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.05) translate(3%, -3%); }
          66% { transform: scale(0.97) translate(-2%, 4%); }
        }
        @keyframes float-refined {
          0%, 100% { transform: translateZ(0) translateY(0) rotateX(0deg); }
          50% { transform: translateZ(60px) translateY(-20px) rotateX(1.5deg); }
        }
        .animate-text-reveal { animation: text-reveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-organic-drift { animation: organic-drift 20s ease-in-out infinite; }
        .animate-float-refined { animation: float-refined 8s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* COMPACTED FLOATING NAV */}
      <div className="fixed bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-10 lg:translate-x-0 flex items-center gap-6 z-50">
        <div className={`flex bg-current bg-opacity-60 backdrop-blur-[30px] rounded-full p-1 border border-current border-opacity-10 shadow-4xl transition-transform hover:scale-105 ${isOnyx ? 'text-black' : 'text-white'}`}>
          <button 
            onClick={() => scrollToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-0 ${isOnyx ? 'text-white/20 hover:text-white' : 'text-black/20 hover:text-black'}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 lg:w-5 lg:h-5 fill-current rotate-180"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </button>
          
          <div className="flex items-center px-4 lg:px-6 border-x border-current border-opacity-5">
            <span className={`text-[9px] lg:text-[10px] font-black tracking-[0.2em] mono ${isOnyx ? 'text-white/40' : 'text-black/40'}`}>
              {activeIndex + 1}<span className="opacity-10 mx-1 lg:mx-2">/</span>{SLIDES.length}
            </span>
          </div>

          <button 
            onClick={() => scrollToSlide(activeIndex + 1)}
            disabled={activeIndex === SLIDES.length - 1}
            className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-0 ${isOnyx ? 'text-white/20 hover:text-white' : 'text-black/20 hover:text-black'}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 lg:w-5 lg:h-5 fill-current"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};