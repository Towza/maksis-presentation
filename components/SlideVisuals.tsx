import React, { useState, useMemo } from 'react';
import { Placeholder } from './Placeholder';

interface Props {
  id: number;
  activeColor: string;
  isOnyx?: boolean;
}

const IdentityVerificationReport: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/5';
  const cardBg = isOnyx ? 'bg-white/[0.03]' : 'bg-black/[0.01]';
  const innerBg = isOnyx ? 'bg-white/[0.04]' : 'bg-black/[0.03]';

  const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className={`flex items-center justify-between py-3 border-b ${isOnyx ? 'border-white/5' : 'border-black/5'} last:border-0`}>
      <span className={`text-[9px] font-black uppercase tracking-widest opacity-30 ${textColor}`}>{label}</span>
      <span className={`text-[10px] font-bold font-syne ${textColor}`}>{value}</span>
    </div>
  );

  return (
    <div className={`w-full max-w-xl p-6 lg:p-8 rounded-[40px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000 ${cardBg}`}>
      <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-[0.05] rounded-full translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: activeColor }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className={`text-[9px] font-black uppercase tracking-[0.4em] opacity-40 ${textColor}`}>Identity Verification</span>
          <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[7px] font-black text-emerald-500 tracking-widest uppercase">Liveness OK</span>
          </div>
        </div>
        <div className={`p-4 rounded-[24px] ${innerBg} border ${borderColor} mb-6 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border border-emerald-500 animate-pulse" />
              <img src="https://i.pravatar.cc/200?u=jane" className="w-full h-full rounded-full object-cover p-1" />
            </div>
            <div className="flex flex-col">
              <span className={`text-[10px] font-black uppercase tracking-tight ${textColor}`}>Face Match</span>
              <span className="text-[8px] font-bold text-emerald-500 tracking-widest uppercase">Passed</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black font-syne text-emerald-500">99.8%</span>
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="pb-2">
             <span className={`text-[8px] font-black uppercase tracking-[0.3em] opacity-20 ${textColor}`}>Personal Info</span>
          </div>
          <InfoRow label="Name" value="Jane" />
          <InfoRow label="Last Name" value="Doe" />
          <InfoRow label="Nationality" value="Latvian (LV)" />
          <InfoRow label="Date of Birth" value="25.03.1970" />
          <InfoRow label="National ID" value="250370-11573" />
        </div>
      </div>
    </div>
  );
};

const ClientRegistry: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/5';
  const cardBg = isOnyx ? 'bg-white/[0.03]' : 'bg-black/[0.01]';

  const ClientRegistryRow: React.FC<{ initials: string; name: string; sub: string; tag: string; tagColor: string; status: string }> = ({ initials, name, sub, tag, tagColor, status }) => (
    <div className={`flex items-center justify-between py-4 border-b ${isOnyx ? 'border-white/5' : 'border-black/5'} last:border-0 group transition-all hover:translate-x-1`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-syne text-[10px] ${isOnyx ? 'bg-white/5' : 'bg-black/5'} ${textColor} border ${isOnyx ? 'border-white/5' : 'border-black/5'}`}>
          {initials}
        </div>
        <div className="flex flex-col">
          <span className={`text-[12px] font-black uppercase tracking-tight ${textColor}`}>{name}</span>
          <span className={`text-[8px] font-bold uppercase tracking-widest opacity-30 ${textColor}`}>{sub}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <div className={`px-2 py-0.5 rounded-md border text-[6px] font-black tracking-widest uppercase`} style={{ borderColor: `${tagColor}33`, backgroundColor: `${tagColor}11`, color: tagColor }}>
          {tag}
        </div>
        <span className={`text-[7px] font-black uppercase tracking-widest opacity-40 ${textColor}`}>{status}</span>
      </div>
    </div>
  );

  return (
    <div className={`w-full max-w-xl p-6 lg:p-10 rounded-[40px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000 ${cardBg}`}>
      <div className="flex items-center justify-between mb-8">
        <span className={`text-[9px] font-black uppercase tracking-[0.4em] opacity-40 ${textColor}`}>Active Client Registry</span>
      </div>
      <div className="space-y-0.5">
        <ClientRegistryRow isOnyx={isOnyx} initials="JD" name="John Doe" sub="PK: 320185-11..." tag="Smart-ID" tagColor="#f59e0b" status="Served at Branch" />
        <ClientRegistryRow isOnyx={isOnyx} initials="JD" name="Jane Doe" sub="PK: 050590-12..." tag="SumSub" tagColor="#10b981" status="Loan Issued" />
        <ClientRegistryRow isOnyx={isOnyx} initials="RR" name="Richard Roe" sub="PK: 121288-10..." tag="eParaksts" tagColor="#6366f1" status="Funds Received" />
      </div>
    </div>
  );
};

const VerificationReport: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/5';
  const cardBg = isOnyx ? 'bg-white/[0.03]' : 'bg-black/[0.01]';

  const CheckRow: React.FC<{ label: string; value: string; status: 'valid' | 'neutral' }> = ({ label, value, status }) => (
    <div className={`flex items-center justify-between py-4 border-b ${isOnyx ? 'border-white/5' : 'border-black/5'} last:border-0 group transition-all`}>
      <div className="flex flex-col">
        <span className={`text-[10px] font-black uppercase tracking-tight ${textColor}`}>{label}</span>
        <span className={`text-[8px] font-bold uppercase tracking-widest opacity-30 ${textColor}`}>{value}</span>
      </div>
      {status === 'valid' && (
        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full max-w-xl p-6 lg:p-10 rounded-[40px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000 ${cardBg}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h3 className={`text-xl font-black font-syne uppercase tracking-tighter ${textColor}`}>Jane Doe Report</h3>
        <div className="inline-flex items-center self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-[8px] font-black text-emerald-500 tracking-[0.2em] uppercase">Verified OK</span>
        </div>
      </div>
      <div className="space-y-0.5">
        <CheckRow label="Scoring" value="Low Risk (0.01)" status="valid" />
        <CheckRow label="Sanctions" value="Clear" status="valid" />
        <CheckRow label="PEP Status" value="Not a PEP" status="valid" />
        <CheckRow label="Blacklist" value="Not Listed" status="valid" />
      </div>
    </div>
  );
};

const CreditScoreCard: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/5';
  const cardBg = isOnyx ? 'bg-white/[0.02]' : 'bg-black/[0.01]';

  return (
    <div className={`w-full max-w-md p-6 lg:p-10 rounded-[40px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000 ${cardBg}`}>
      <div className="flex justify-between items-center mb-8">
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ${textColor}`}>Risk Score</span>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-[9px] font-black text-emerald-500 tracking-widest uppercase">Approved</span>
        </div>
      </div>
      <div className="space-y-6 mb-8">
        <div className="flex items-baseline gap-3">
          <h2 className={`text-6xl font-black font-syne tracking-tighter ${textColor}`}>850</h2>
          <p className="text-lg font-bold font-syne" style={{ color: activeColor }}>AAA+</p>
        </div>
        <div className="relative w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
          <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 delay-300" style={{ width: '85%', background: `linear-gradient(to right, ${activeColor}, #a855f7)` }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
        <div className="space-y-0.5">
           <p className={`text-[8px] font-black uppercase opacity-30 ${textColor}`}>Limit</p>
           <p className={`text-lg font-black font-syne ${textColor}`}>€ 15,000</p>
        </div>
        <div className="space-y-0.5">
           <p className={`text-[8px] font-black uppercase opacity-30 ${textColor}`}>Rate</p>
           <p className={`text-lg font-black font-syne ${textColor}`}>8.5%</p>
        </div>
      </div>
    </div>
  );
};

const PaymentHub: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/10';
  const cardBg = isOnyx ? 'bg-white/[0.03]' : 'bg-black/[0.02]';
  const inputBg = isOnyx ? 'bg-white/[0.015]' : 'bg-black/[0.01]';

  return (
    <div className={`w-full max-w-xl p-6 lg:p-8 rounded-[40px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000 ${cardBg}`}>
      <div className="flex justify-between items-center mb-6">
        <span className={`text-[9px] font-black uppercase tracking-[0.4em] opacity-40 ${textColor}`}>Payment Order</span>
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }} />
      </div>
      <div className="space-y-3">
        <div className={`p-4 rounded-[20px] border ${borderColor} ${inputBg} flex justify-between items-center`}>
          <div className="space-y-0.5">
            <p className={`text-[7px] font-black uppercase tracking-widest opacity-30 ${textColor}`}>From Account</p>
            <p className={`text-[11px] font-black uppercase tracking-tight ${textColor}`}>Main IBAN Ledger</p>
          </div>
          <p className={`text-[11px] font-bold font-syne opacity-40 ${textColor}`}>€ 45,200.50</p>
        </div>
        
        <div className={`p-5 rounded-[24px] border ${borderColor} ${inputBg} flex justify-between items-center`}>
          <div className="space-y-0.5">
            <p className={`text-[7px] font-black uppercase tracking-widest opacity-30 ${textColor}`}>Amount</p>
            <p className={`text-3xl font-black font-syne tracking-tighter ${textColor}`}>0.00</p>
          </div>
          <span className={`text-[10px] font-black tracking-widest opacity-40 ${textColor}`}>EUR</span>
        </div>

        <div className={`p-4 rounded-[20px] border ${borderColor} ${inputBg} relative`}>
          <p className={`text-[7px] font-black uppercase tracking-widest opacity-30 ${textColor} mb-1`}>Recipient</p>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-medium opacity-20 ${textColor}`}>Search recipient...</span>
            <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 fill-current opacity-20 ${textColor}`}><path d="M7 10l5 5 5-5z"/></svg>
          </div>
        </div>

        <div className={`p-4 rounded-[20px] border ${borderColor} ${inputBg}`}>
          <p className={`text-[7px] font-black uppercase tracking-widest opacity-30 ${textColor} mb-1`}>Purpose / Details</p>
          <span className={`text-[11px] font-medium opacity-20 ${textColor}`}>Reference...</span>
        </div>

        <button 
          className="w-full py-5 rounded-[24px] font-black text-[10px] uppercase tracking-[0.4em] text-white shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
          style={{ background: `linear-gradient(135deg, ${activeColor} 0%, #a855f7 100%)` }}
        >
          Confirm Transfer
        </button>
      </div>
    </div>
  );
};

const CollateralManagement: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/5';
  const cardBg = isOnyx ? 'bg-white/[0.03]' : 'bg-black/[0.01]';

  const CollateralRow: React.FC<{ title: string; sub: string; val: string; status: 'ACTIVE' | 'GRACE' | 'SALE' }> = ({ title, sub, val, status }) => {
    const statusConfig = {
      ACTIVE: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
      GRACE: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
      SALE: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20' }
    };
    const current = statusConfig[status];
    
    return (
      <div className={`flex items-center justify-between py-4 border-b ${isOnyx ? 'border-white/5' : 'border-black/5'} last:border-0 group transition-all`}>
         <div className="flex flex-col gap-0.5">
            <span className={`text-[11px] font-black uppercase tracking-tight ${textColor}`}>{title}</span>
            <span className={`text-[8px] font-bold uppercase tracking-widest opacity-30 ${textColor}`}>{sub}</span>
         </div>
         <div className="flex items-center gap-4">
            <span className={`text-[12px] font-black font-syne ${textColor}`}>{val}</span>
            <div className={`px-2 py-0.5 rounded-md border ${current.bg} ${current.border} text-[6px] font-black ${current.text} tracking-widest uppercase`}>
              {status}
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className={`w-full max-w-xl p-6 lg:p-10 rounded-[40px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000 ${cardBg}`}>
      <div className="flex items-center justify-between mb-8">
        <span className={`text-[9px] font-black uppercase tracking-[0.4em] opacity-40 ${textColor}`}>Collateral Registry</span>
      </div>
      <div className="space-y-0.5">
        <CollateralRow title="Gold Ring 585 (5g)" sub="#PAWN-902 | JANE D." val="€ 215.00" status="ACTIVE" />
        <CollateralRow title="iPhone 13 Pro 128GB" sub="#PAWN-884 | JOHN D." val="€ 450.00" status="GRACE" />
        <CollateralRow title="Makita Drill Set" sub="#PAWN-720 | RICHARD R." val="€ 85.00" status="SALE" />
      </div>
    </div>
  );
};

const ProductDesigner: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const [principal, setPrincipal] = useState(5000);
  const [term, setTerm] = useState(24);
  
  const monthly = useMemo(() => {
    const rate = 0.15 / 12;
    return (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
  }, [principal, term]);

  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/10';
  const cardBg = isOnyx ? 'bg-white/[0.03]' : 'bg-black/[0.02]';
  const innerBg = isOnyx ? 'bg-white/[0.015]' : 'bg-black/[0.01]';

  return (
    <div className={`w-full max-w-xl p-6 lg:p-10 rounded-[48px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000 ${cardBg}`}>
      <div className="flex flex-col items-center gap-8">
        <span className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ${textColor}`}>Loan Calculator</span>
        
        <div className="w-full space-y-4">
          {/* Principal Slider */}
          <div className={`p-6 rounded-[32px] border ${borderColor} ${innerBg} space-y-3`}>
            <div className="flex justify-between items-center">
              <span className={`text-[8px] font-black uppercase tracking-widest opacity-30 ${textColor}`}>Principal</span>
              <div className="flex items-center gap-2">
                 <button onClick={() => setPrincipal(p => Math.max(500, p - 500))} className={`w-6 h-6 rounded-full border ${borderColor} flex items-center justify-center font-bold text-xs`} style={{ color: activeColor }}>–</button>
                 <button onClick={() => setPrincipal(p => Math.min(50000, p + 500))} className={`w-6 h-6 rounded-full border ${borderColor} flex items-center justify-center font-bold text-xs`} style={{ color: activeColor }}>+</button>
              </div>
            </div>
            <h2 className={`text-3xl font-black font-syne tracking-tighter ${textColor}`}>€ {principal.toLocaleString()}</h2>
          </div>

          {/* Term Slider */}
          <div className={`p-6 rounded-[32px] border ${borderColor} ${innerBg} space-y-3`}>
            <div className="flex justify-between items-center">
              <span className={`text-[8px] font-black uppercase tracking-widest opacity-30 ${textColor}`}>Duration</span>
              <div className="flex items-center gap-2">
                 <button onClick={() => setTerm(t => Math.max(6, t - 6))} className={`w-6 h-6 rounded-full border ${borderColor} flex items-center justify-center font-bold text-xs`} style={{ color: activeColor }}>–</button>
                 <button onClick={() => setTerm(t => Math.min(120, t + 6))} className={`w-6 h-6 rounded-full border ${borderColor} flex items-center justify-center font-bold text-xs`} style={{ color: activeColor }}>+</button>
              </div>
            </div>
            <h2 className={`text-3xl font-black font-syne tracking-tighter ${textColor}`}>{term} mo.</h2>
          </div>

          {/* Monthly Payment */}
          <div className="grid grid-cols-2 gap-6 pt-2 px-1">
            <div className="space-y-0.5">
              <span className={`text-[8px] font-black uppercase tracking-widest opacity-30 ${textColor}`}>Monthly</span>
              <p className={`text-xl font-black font-syne ${textColor}`}>€ {monthly.toFixed(2)}</p>
            </div>
            <div className="space-y-0.5 text-right">
              <span className={`text-[8px] font-black uppercase tracking-widest opacity-30 ${textColor}`}>Total</span>
              <p className={`text-xs font-black opacity-30 ${textColor}`}>€ {(monthly * term).toFixed(1)}</p>
            </div>
          </div>
        </div>

        <button 
          className="w-full py-5 rounded-[32px] font-black text-[11px] uppercase tracking-[0.4em] text-white shadow-3xl transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{ background: `linear-gradient(135deg, ${activeColor} 0%, #a855f7 100%)` }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

const SystemStatusDashboard: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/10';
  const cardBg = isOnyx ? 'bg-[#0a0a0a]/60' : 'bg-white/40';
  
  const StatusRow: React.FC<{ icon: React.ReactNode; title: string; sub: string; tag: string }> = ({ icon, title, sub, tag }) => (
    <div className={`flex items-center justify-between py-5 border-b ${isOnyx ? 'border-white/5' : 'border-black/5'} last:border-0`}>
      <div className="flex items-center gap-5">
        <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center ${isOnyx ? 'bg-white/[0.03]' : 'bg-black/[0.03]'} border ${isOnyx ? 'border-white/5' : 'border-black/5'}`} style={{ color: activeColor }}>
          {icon}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className={`text-[13px] font-black uppercase tracking-tight leading-none ${textColor}`}>{title}</span>
          <span className={`text-[8px] font-bold uppercase tracking-widest opacity-30 ${textColor}`}>{sub}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className={`px-2 py-0.5 rounded-md ${isOnyx ? 'bg-white/[0.05]' : 'bg-black/[0.05]'} border ${isOnyx ? 'border-white/5' : 'border-black/5'} text-[7px] font-black opacity-40 tracking-widest uppercase ${textColor}`}>
          {tag}
        </div>
        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full max-w-2xl p-6 lg:p-10 rounded-[48px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000 ${cardBg}`}>
      <div className="flex items-start justify-between mb-8">
        <span className={`text-[9px] font-black uppercase tracking-[0.5em] opacity-40 leading-none ${textColor}`}>Status Monitor</span>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-black text-emerald-500 tracking-widest uppercase">Live</span>
        </div>
      </div>
      
      <div className="space-y-0.5 mb-8">
        <StatusRow icon={<svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M4 14h6v-4H4v4zm0 5h6v-4H4v4zM4 9h6V5H4v4zm10 5h6v-4h-6v4zm0 5h6v-4h-6v4zM10 4h4v20h-4V4zM14 9h6V5h-6v4z"/></svg>} title="Core Engine (Java)" sub="Micro-arch Stable" tag="V17_STABLE" />
        <StatusRow icon={<svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 18c-5.52 0-10-2.02-10-4.5V18c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2.5c0 2.48-4.48 4.5-10 4.5zm0-9c-5.52 0-10-2.02-10-4.5V12c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5V8.5c0 2.48-4.48 4.5-10 4.5z"/></svg>} title="Data Cluster" sub="PostgreSQL RDS" tag="AWS RDS" />
        <StatusRow icon={<svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>} title="Cloud Mesh" sub="Auto-scaling Ready" tag="AWS HUB" />
      </div>

      <div className="pt-6 border-t border-white/5 flex items-end justify-between">
         <div className="flex gap-1 items-end">
            {[1,1,1,1,0.8,1,1,0.5,1,1,1,1,1,1,1].map((h, i) => (
              <div key={i} className="w-1 rounded-full bg-emerald-500/20 relative" style={{ height: '24px' }}>
                <div className="absolute bottom-0 w-full rounded-full bg-emerald-500/40" style={{ height: `${h * 100}%` }} />
                {i === 7 && <div className="absolute bottom-0 w-full rounded-full bg-amber-500" style={{ height: `${h * 100}%` }} />}
              </div>
            ))}
         </div>
         <span className={`text-[8px] font-black opacity-30 tracking-widest ${textColor}`}>99.9% SLA VERIFIED</span>
      </div>
    </div>
  );
};

const IntegrationPanel: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const borderColor = isOnyx ? 'border-white/10' : 'border-black/10';
  const cardBg = isOnyx ? 'bg-[#0a0a0a]/60' : 'bg-white/40';

  const IntegrationRow: React.FC<{ title: string; sub: string; status: string; statusColor: string }> = ({ title, sub, status, statusColor }) => (
    <div className={`flex items-center justify-between py-6 border-b ${isOnyx ? 'border-white/5' : 'border-black/5'} last:border-0`}>
      <div className="flex flex-col gap-1">
         <span className={`text-[14px] font-black uppercase tracking-tight ${textColor}`}>{title}</span>
         <span className={`text-[8px] font-bold uppercase tracking-widest opacity-30 ${textColor}`}>{sub}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className={`px-3 py-1.5 rounded-lg ${isOnyx ? 'bg-white/[0.05]' : 'bg-black/[0.05]'} border ${isOnyx ? 'border-white/5' : 'border-black/5'}`}>
          <span className={`text-[7px] font-black tracking-[0.2em] uppercase`} style={{ color: statusColor }}>{status}</span>
        </div>
        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isOnyx ? 'border-white/10' : 'border-black/10'}`} style={{ color: statusColor }}>
           {status === 'CONNECTING...' ? (
             <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
           ) : (
             <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full max-w-2xl p-8 lg:p-12 rounded-[48px] border ${borderColor} backdrop-blur-3xl shadow-4xl relative overflow-hidden animate-in fade-in slide-in-from-right-10 duration-1000 ${cardBg}`}>
      <div className="flex items-center justify-between mb-8">
        <span className={`text-[10px] font-black uppercase tracking-[0.5em] opacity-40 ${textColor}`}>Ecosystem Node Hub</span>
      </div>
      <div className="space-y-0.5">
        <IntegrationRow title="Banking Gateway" sub="SEPA / SWIFT" status="ESTABLISHED" statusColor={activeColor} />
        <IntegrationRow title="Fintech PSD2" sub="OPEN BANKING API" status="SYNCING LIVE" statusColor={activeColor} />
        <IntegrationRow title="Compliance DB" sub="SANCTIONS & PEP" status="ESTABLISHED" statusColor={activeColor} />
        <IntegrationRow title="Digital Trust" sub="ID & E-SIGN" status="CONNECTING..." statusColor="#f59e0b" />
      </div>
    </div>
  );
};

const ClosingVisual: React.FC<{ isOnyx: boolean; activeColor: string }> = ({ isOnyx, activeColor }) => {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
       <div className="absolute inset-0 opacity-[0.1] blur-[150px] animate-pulse rounded-full" style={{ backgroundColor: activeColor }} />
       <div className="relative z-10 flex flex-col items-center gap-10 text-center group">
          <div className="relative w-48 h-48">
             <div className="absolute inset-0 border-2 border-dashed border-current opacity-10 rounded-full animate-[spin_20s_linear_infinite]" style={{ color: activeColor }} />
             <div className="absolute inset-6 border border-current opacity-20 rounded-full animate-[spin_12s_linear_infinite_reverse]" style={{ color: activeColor }} />
             <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 40" className="w-24 h-8 overflow-visible transition-transform duration-1000 group-hover:scale-110">
                  <path d="M5,35 Q25,33 45,25 T95,5" fill="none" stroke={activeColor} strokeWidth="12" strokeLinecap="round" />
                </svg>
             </div>
          </div>
          <div className="space-y-3">
             <h4 className="text-3xl font-black font-syne uppercase tracking-tighter">Scale Your Vision.</h4>
             <p className={`text-[9px] font-black uppercase tracking-[0.5em] opacity-40 ${isOnyx ? 'text-white' : 'text-black'}`}>MAKSIS_CORE_SYSTEM</p>
          </div>
       </div>
    </div>
  );
};

export const SlideVisuals: React.FC<Props> = ({ id, activeColor, isOnyx = true }) => {
  const textColor = isOnyx ? 'text-white' : 'text-black';
  const cardBg = isOnyx ? 'bg-white/[0.02]' : 'bg-black/[0.02]';
  const cardBorder = isOnyx ? 'border-white/10' : 'border-black/10';

  if (id === 1) {
    const pathD = "M8,35 Q25,33 45,25 T95,5";
    return (
      <div className="relative w-full aspect-square flex items-center justify-center">
         <div className="absolute inset-[-20%] opacity-[0.25] blur-[150px] animate-pulse" 
              style={{ background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)` }} />
         <div className="relative z-10 flex flex-col items-center gap-6 lg:gap-14 group">
            <div className="relative w-[220px] h-[80px] sm:w-[300px] sm:h-[110px] lg:w-[380px] lg:h-[140px] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <svg viewBox="-30 -30 160 100" className="w-full h-full overflow-visible">
                <defs>
                  <filter id="hyperGlow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="6" result="blur"/><feFlood floodColor={activeColor} result="color"/><feComposite in="color" in2="blur" operator="in" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <path d={pathD} fill="none" stroke={activeColor} strokeWidth="10" strokeLinecap="round" filter="url(#hyperGlow)" style={{ strokeDasharray: '200', animation: 'logoDrawUltra 6s cubic-bezier(0.65, 0, 0.35, 1) infinite' }} />
              </svg>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className={`text-3xl sm:text-5xl lg:text-7xl font-black font-syne tracking-tighter uppercase ${textColor} leading-none transition-all duration-700 group-hover:scale-[1.03]`}>MAKSIS</h1>
            </div>
         </div>
         <style>{`@keyframes logoDrawUltra { 0% { stroke-dashoffset: 200; opacity: 0; } 15% { opacity: 1; } 45%, 85% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: -200; opacity: 0; } }`}</style>
      </div>
    );
  }

  if (id === 2) return <ClientRegistry isOnyx={isOnyx} activeColor={activeColor} />;
  if (id === 3) return <IdentityVerificationReport isOnyx={isOnyx} activeColor={activeColor} />;
  if (id === 4) return <VerificationReport isOnyx={isOnyx} activeColor={activeColor} />;
  if (id === 5) return <CreditScoreCard isOnyx={isOnyx} activeColor={activeColor} />;
  if (id === 6) return <PaymentHub isOnyx={isOnyx} activeColor={activeColor} />;
  if (id === 7) return <CollateralManagement isOnyx={isOnyx} activeColor={activeColor} />;
  if (id === 8) return <ProductDesigner isOnyx={isOnyx} activeColor={activeColor} />;
  
  if (id === 9) {
    return (
      <div className="w-full max-w-6xl animate-in fade-in zoom-in-95 duration-1000">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          {[
            { title: "Backend Core", desc: "Engineered for absolute fault tolerance and microsecond execution.", items: ["Java Spring V3", "Reactive Arch", "Low Latency API"], index: "01" },
            { title: "User Matrix", desc: "Immersive interfaces designed for high-density financial visualization.", items: ["React Native", "Live Streams", "Fluid Motion"], index: "02" },
            { title: "Cloud Mesh", desc: "Self-healing infrastructure with global redundancy across regions.", items: ["Multi-Cloud", "PostgreSQL", "Auto-scale"], index: "03" }
          ].map((card) => (
            <div key={card.index} className={`${cardBg} border ${cardBorder} rounded-[40px] p-6 lg:p-8 flex flex-col gap-6 backdrop-blur-[60px] hover:bg-opacity-5 hover:border-opacity-20 transition-all group shadow-4xl relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 p-4 lg:p-6 opacity-10 ${textColor}`}>{card.index}</div>
              <div className="space-y-3">
                <h4 className={`text-lg lg:text-xl font-black uppercase tracking-tight transition-colors`} style={{ color: activeColor }}>{card.title}</h4>
                <p className={`text-[10px] lg:text-[11px] font-medium leading-relaxed opacity-40 ${textColor}`}>{card.desc}</p>
              </div>
              <div className={`h-px w-full ${isOnyx ? 'bg-white/5' : 'bg-black/5'}`} />
              <ul className="space-y-3">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3"><div className={`w-2 h-2 rounded-full border ${isOnyx ? 'border-white/10' : 'border-black/10'} flex items-center justify-center shrink-0`}><div className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: activeColor }} /></div><span className={`text-[9px] font-black uppercase tracking-widest opacity-40 ${textColor}`}>{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 10) return <SystemStatusDashboard isOnyx={isOnyx || false} activeColor={activeColor} />;
  if (id === 11) return <IntegrationPanel isOnyx={isOnyx || false} activeColor={activeColor} />;
  if (id === 12) return <ClosingVisual isOnyx={isOnyx || false} activeColor={activeColor} />;

  return <Placeholder slideId={id} surface={isOnyx ? "onyx" : "paper"} />;
};
