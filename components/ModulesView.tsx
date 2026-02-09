import React from 'react';

const ModuleCard: React.FC<{ 
  index: string; 
  title: string; 
  desc: string; 
  specs: string[]; 
  activeColor: string; 
  isOnyx: boolean 
}> = ({ index, title, desc, specs, activeColor, isOnyx }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const cardBg = isOnyx ? 'bg-white/[0.02]' : 'bg-black/[0.01]';
  const cardBorder = isOnyx ? 'border-white/10' : 'border-black/5';
  const specTextColor = isOnyx ? 'text-white/30' : 'text-black/40';
  const listItemTextColor = isOnyx ? 'text-white/40' : 'text-black/50';

  return (
    <div className={`${cardBg} border ${cardBorder} rounded-[40px] p-8 lg:p-10 flex flex-col gap-8 backdrop-blur-[60px] hover:bg-opacity-5 hover:border-opacity-20 transition-all group shadow-4xl relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 p-6 opacity-10 font-black ${textColor}`}>{index}</div>
      <div className="space-y-4">
        <h4 className={`text-xl lg:text-2xl font-black uppercase tracking-tight transition-colors`} style={{ color: activeColor }}>{title}</h4>
        <p className={`text-[11px] lg:text-[12px] font-medium leading-relaxed ${specTextColor}`}>{desc}</p>
      </div>
      <div className={`h-px w-full ${isOnyx ? 'bg-white/5' : 'bg-black/5'}`} />
      <ul className="space-y-4 lg:space-y-5">
        {specs.map((item, i) => (
          <li key={i} className="flex items-center gap-3 lg:gap-4">
            <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full border ${isOnyx ? 'border-white/10' : 'border-black/10'} flex items-center justify-center shrink-0`}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }} />
            </div>
            <span className={`text-[10px] lg:text-[11px] font-black uppercase tracking-widest ${listItemTextColor}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ModulesView: React.FC<{ activeColor: string; isOnyx: boolean }> = ({ activeColor, isOnyx }) => (
  <div className="h-full w-full overflow-y-auto pt-32 pb-32">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-20 lg:space-y-32">
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-4">
           <div className="w-12 h-[1px] bg-current opacity-20" />
           <span className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30">Network_Ecosystem_Map</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-8xl font-black font-syne tracking-tighter uppercase leading-[0.9]">
          INFINITE<br/>NODES<span style={{ color: activeColor }}>.</span>
        </h2>
        <p className="text-lg lg:text-2xl font-light opacity-40 leading-relaxed max-w-2xl">
          Unified components engineered for the world's most demanding financial operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[
          { 
            index: "01",
            title: "Core Arch", 
            desc: "High-precision engine designed for absolute integrity and infinite scale.",
            specs: ["Java Spring_Core V3", "Reactive Micro-arch", "Low Latency Engine", "Quantum Encryption"]
          },
          { 
            index: "02",
            title: "Intelligence", 
            desc: "Proactive risk management and fraud prevention driven by behavioral models.",
            specs: ["Neural Risk Filter", "Real-time Scoring", "Anomaly Detection", "Automated SAR"]
          },
          { 
            index: "03",
            title: "Universal Bridge", 
            desc: "Native integration with global payment networks and legacy standards.",
            specs: ["SEPA / SWIFT Hub", "ISO 20022 Native", "Websocket Streams", "Legacy API Proxy"]
          },
          { 
            index: "04",
            title: "Identity Suite", 
            desc: "Digital verification ensuring security without compromising user speed.",
            specs: ["Liveness Checking", "OCR Doc Extract", "E-Signature Auth", "Biometric Sync"]
          },
          { 
            index: "05",
            title: "Business Studio", 
            desc: "Intuitive dashboard for managing growth and real-time decisioning.",
            specs: ["Live Ledger View", "Product Designer", "Audit Command", "User Matrix"]
          },
          { 
            index: "06",
            title: "Liquidity Flow", 
            desc: "Automated settlement and clearing for high-frequency operations.",
            specs: ["Auto-Reconciliation", "Multi-CCY Ledger", "Treasury Bridge", "Batch Settler"]
          }
        ].map((m, i) => (
          <ModuleCard key={i} {...m} activeColor={activeColor} isOnyx={isOnyx} />
        ))}
      </div>
    </div>
  </div>
);