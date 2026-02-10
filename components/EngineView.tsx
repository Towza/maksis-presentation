
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent navigation if user is typing in an input (though there aren't many here)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (activeIndex < SLIDES.length - 1) {
          e.preventDefault();
          scrollToSlide(activeIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (activeIndex > 0) {
          e.preventDefault();
          scrollToSlide(activeIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, scrollToSlide]);

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
  const subtextColor = isOnyx ? 'text-white/40' : 'text-black/50';
  const featureIconBg = isOnyx ? 'bg-white/[0.04]' : 'bg-black/[0.04]';
  const featureTextColor = isOnyx ? 'text-white/30' : 'text-black/40';

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-1000 ${isOnyx ? 'bg-[#010204]' : 'bg-[#fcfcfc]'}`}>
      
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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
      </div>

      <BackgroundParticles activeColor={activeColor} />

      <div 
        ref={containerRef}
        className="relative h-full overflow-y-auto scroll-smooth snap-y snap-mandatory hide-scrollbar z-10"
      >
        {SLIDES.map((slide, index) => {
          const isCenteredSlide = slide.id === 9 || slide.id === 12;
          const isHero = slide.id === 1;
          const isLast = slide.id === 12;
          
          return (
            <section 
              key={slide.id}
              data-index={index}
              ref={(el) => { slideRefs.current[index] = el; }}
              className={`w-full h-screen snap-start snap-always flex items-center justify-center ${isHero ? 'pt-6 lg:pt-0' : 'pt-16 lg:pt-0'}`}
            >
              <div className={`w-full transition-all duration-1000 ${isHero || isLast ? 'max-w-none px-0 lg:max-w-7xl lg:px-20' : 'max-w-7xl mx-auto px-6 md:px-12 lg:px-20'} ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                
                <div className="max-h-[90vh] lg:max-h-full overflow-y-auto lg:overflow-visible no-scrollbar px-2 lg:px-0">
                  
                  {isCenteredSlide ? (
                    <div className={`flex flex-col items-center text-center ${isLast ? 'space-y-0' : 'space-y-8 lg:space-y-12'}`}>
                      {slide.id === 9 && (
                        <div className="space-y-4 max-w-4xl px-4">
                          <span className="text-[10px] lg:text-[11px] font-black tracking-[0.4em] lg:tracking-[0.8em] uppercase block" style={{ color: activeColor }}>
                            {slide.category}
                          </span>
                          <h2 className={`text-3xl sm:text-5xl lg:text-7xl font-black font-syne uppercase tracking-tighter leading-[0.9] ${textColor}`}>
                            {slide.title}
                          </h2>
                        </div>
                      )}
                      
                      <div className={`w-full flex justify-center ${isLast ? 'scale-100' : 'scale-90 sm:scale-100'}`}>
                        <SlideVisuals id={slide.id} activeColor={activeColor} isOnyx={isOnyx} />
                      </div>

                      {slide.id === 9 && (
                        <div className="max-w-2xl px-6">
                           <p className={`text-[15px] lg:text-lg font-light ${subtextColor} leading-relaxed`}>{slide.description}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] ${isHero ? 'gap-0 lg:gap-20' : 'gap-8 lg:gap-20'} items-center`}>
                      
                      {/* Visual Block (Brand Signature) */}
                      <div className={`flex justify-center lg:justify-end ${isHero ? 'order-1 lg:order-2 mb-10 lg:mb-0' : 'order-2 mt-8 lg:mt-0'}`}>
                        <div className={`w-full ${isHero ? 'max-w-[180px] sm:max-w-none' : 'max-w-[300px] sm:max-w-[420px] lg:max-w-full'} perspective-2000`}>
                           <div className={`${isHero ? '' : 'animate-float-refined'} flex justify-center lg:justify-end`}>
                              <SlideVisuals id={slide.id} activeColor={activeColor} isOnyx={isOnyx} />
                           </div>
                        </div>
                      </div>

                      {/* Content Block (Messaging) */}
                      <div className={`space-y-6 lg:space-y-10 ${isHero ? 'order-2 lg:order-1 text-center lg:text-left' : 'order-1'}`}>
                        <div className={`${isHero ? 'space-y-3 lg:space-y-6' : 'space-y-4 lg:space-y-6'}`}>
                          <span className={`text-[9px] lg:text-[11px] font-black tracking-[0.4em] lg:tracking-[0.7em] uppercase block`} style={{ color: activeColor }}>
                            {slide.category}
                          </span>
                          <h2 className={`${isHero ? 'text-[2.2rem] sm:text-6xl lg:text-7xl' : 'text-3xl sm:text-5xl lg:text-6xl'} font-black font-syne uppercase tracking-tighter leading-[0.9] ${textColor}`}>
                            {slide.title}
                          </h2>
                          
                          {slide.quote && (
                            <div className={`relative ${isHero ? 'px-4 lg:px-0 lg:pl-10' : 'pl-5 lg:pl-10'} py-1 lg:py-2 flex flex-col items-center lg:items-start`}>
                               <div className={`absolute left-0 top-0 bottom-0 w-1 lg:w-1.5 rounded-full overflow-hidden hidden lg:block`}>
                                  <div className="w-full h-full opacity-40" style={{ backgroundColor: activeColor }} />
                                </div>
                               <p className={`${isHero ? 'text-[11px] leading-tight' : 'text-[13px]'} lg:text-lg font-semibold font-syne tracking-wider uppercase opacity-60 ${textColor}`}>
                                 {slide.quote}
                               </p>
                            </div>
                          )}

                          <div className={`max-w-xl mx-auto lg:mx-0 ${isHero ? 'space-y-6 lg:space-y-10' : 'space-y-6 lg:space-y-10'}`}>
                            <p className={`text-[14px] lg:text-xl font-light ${subtextColor} leading-relaxed ${isHero ? 'hidden lg:block' : ''}`}>
                              {slide.description}
                            </p>
                            {slide.features && slide.features.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-6 pt-2">
                                {slide.features.map((feature, i) => (
                                  <div key={i} className="flex items-center gap-3 lg:gap-4 group">
                                    <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-xl border border-current border-opacity-10 flex items-center justify-center shrink-0 ${featureIconBg}`} style={{ color: activeColor }}>
                                      <svg viewBox="0 0 24 24" className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                    </div>
                                    <span className={`text-[10px] lg:text-[11px] font-black uppercase tracking-widest ${featureTextColor} group-hover:${textColor} transition-colors`}>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            )}
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
        @keyframes float-refined {
          0%, 100% { transform: translateZ(0) translateY(0) rotateX(0deg); }
          50% { transform: translateZ(60px) translateY(-10px) rotateX(1deg); }
        }
        .animate-float-refined { animation: float-refined 8s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* COMPACTED FLOATING NAV */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-10 lg:translate-x-0 flex items-center gap-6 z-50">
        <div className={`flex bg-current bg-opacity-90 backdrop-blur-[30px] rounded-full p-1 border border-current border-opacity-10 shadow-4xl transition-transform hover:scale-105 ${isOnyx ? 'text-black' : 'text-white'}`}>
          <button 
            onClick={() => scrollToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-0 ${isOnyx ? 'text-white/30 hover:text-white' : 'text-black/30 hover:text-black'}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current rotate-180"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </button>
          
          <div className="flex items-center px-5 border-x border-current border-opacity-10">
            <span className={`text-[10px] font-black tracking-[0.2em] mono ${isOnyx ? 'text-white/50' : 'text-black/50'}`}>
              {activeIndex + 1}<span className="opacity-20 mx-2">/</span>{SLIDES.length}
            </span>
          </div>

          <button 
            onClick={() => scrollToSlide(activeIndex + 1)}
            disabled={activeIndex === SLIDES.length - 1}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-0 ${isOnyx ? 'text-white/30 hover:text-white' : 'text-black/30 hover:text-black'}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
