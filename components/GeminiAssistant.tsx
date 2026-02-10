
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

const SUGGESTIONS = [
  "Pastāsti par sistēmas drošību",
  "Kā darbojas kredītvērtēšana?",
  "Kādas ir integrācijas iespējas?",
];

export const GeminiAssistant: React.FC<{ activeColor: string }> = ({ activeColor }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setShowTooltip(false);
      const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;
      outputNodeRef.current = outputCtx.createGain();
      outputNodeRef.current.connect(outputCtx.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            setIsConnecting(false);
            setIsActive(true);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.outputTranscription) {
              setTranscription(prev => (prev + ' ' + msg.serverContent?.outputTranscription?.text).slice(-150));
            }
            const audioBase64 = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioBase64 && audioContextRef.current) {
              const ctx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioBase64), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputNodeRef.current!);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Gemini Error:', e);
            setIsActive(false);
            setIsConnecting(false);
          },
          onclose: () => {
            setIsActive(false);
            setIsConnecting(false);
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction: 'You are the Gemini 2.5 assistant for the Maksis platform. The user is browsing a high-end fintech presentation. Be professional, slightly futuristic, and concise. If the user asks about specific slides, refer to the banking core, credit scoring, or identity verification modules mentioned in the presentation.',
          outputAudioTranscription: {},
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsActive(false);
    setTranscription('');
  };

  return (
    <div className="fixed bottom-8 left-8 lg:bottom-12 lg:left-12 z-[200] flex flex-col items-start gap-4">
      {/* Suggestions Chips */}
      {isActive && (
        <div className="flex flex-wrap gap-2 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-700">
           {SUGGESTIONS.map((text, idx) => (
             <div 
               key={idx} 
               className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 cursor-default transition-all"
             >
               {text}
             </div>
           ))}
        </div>
      )}

      <div className="flex items-center gap-6">
        <div className="relative">
          {/* Pulse Effect when Active */}
          {isActive && (
            <div 
              className="absolute inset-0 rounded-2xl animate-ping opacity-20"
              style={{ backgroundColor: activeColor }}
            />
          )}
          
          <button 
            onClick={isActive ? stopSession : startSession}
            onMouseEnter={() => setShowTooltip(true)}
            disabled={isConnecting}
            className={`
              group relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all duration-700 border
              ${isActive ? 'bg-white border-white' : 'bg-black/40 hover:bg-white/10 border-white/10 backdrop-blur-xl'}
              ${isConnecting ? 'animate-pulse' : ''}
            `}
          >
            <div 
              className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700`}
              style={{ backgroundColor: activeColor }}
            />
            
            {isActive ? (
              <div className="flex gap-1 items-center h-4">
                 {[1,2,3,2,1].map((h, i) => (
                   <div 
                    key={i} 
                    className="w-1 bg-black rounded-full animate-voice-bar" 
                    style={{ 
                      height: `${h * 20}%`, 
                      animationDelay: `${i * 0.1}s`,
                      backgroundColor: 'black'
                    }} 
                   />
                 ))}
              </div>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 lg:w-6 lg:h-6 fill-white/40 group-hover:fill-white transition-colors duration-500">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            )}
          </button>

          {/* Initial Tooltip */}
          {showTooltip && !isActive && !isConnecting && (
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white rounded-xl whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500 shadow-2xl">
               <p className="text-[10px] font-black uppercase tracking-widest text-black">Runā ar MAKSIS AI</p>
               <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-white" />
            </div>
          )}
        </div>

        {isActive && (
          <div className="bg-white/5 backdrop-blur-3xl px-6 py-4 rounded-[24px] border border-white/10 animate-in slide-in-from-left-4 duration-700 shadow-4xl max-w-md">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] leading-none">Live_Response</p>
             </div>
             <p className="text-[12px] font-medium text-white/80 italic leading-relaxed">
               {transcription || "Klausos..."}
             </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes voice-bar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2.5); }
        }
        .animate-voice-bar {
          animation: voice-bar 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
