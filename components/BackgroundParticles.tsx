
import React, { useMemo } from 'react';

const CRYSTAL_COUNT = 18;

export const BackgroundParticles: React.FC<{ activeColor: string }> = ({ activeColor }) => {
  const crystals = useMemo(() => {
    return Array.from({ length: CRYSTAL_COUNT }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${6 + Math.random() * 12}s`,
      size: Math.random() * 3 + 1,
      opacity: 0.1 + Math.random() * 0.2,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {crystals.map((c) => (
        <div
          key={`c-${c.id}`}
          className="absolute rounded-sm animate-crystal-breathe"
          style={{
            width: `${c.size}px`,
            height: `${c.size * 2}px`,
            left: c.left,
            top: c.top,
            backgroundColor: activeColor,
            boxShadow: `0 0 ${c.size * 10}px ${activeColor}`,
            opacity: c.opacity,
            transform: `rotate(${c.rotation}deg)`,
            animationDelay: c.delay,
            animationDuration: c.duration,
          }}
        />
      ))}
      <style>{`
        @keyframes crystal-breathe {
          0%, 100% { opacity: 0.05; transform: translateY(0) scale(0.8) rotate(0deg); }
          50% { opacity: 0.4; transform: translateY(-40px) scale(1.2) rotate(180deg); }
        }
        .animate-crystal-breathe {
          animation-name: crystal-breathe;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};
