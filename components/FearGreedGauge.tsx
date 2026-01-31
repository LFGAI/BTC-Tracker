
import React from 'react';
import { translations, Language } from '../translations';

interface FearGreedGaugeProps {
  score: number;
  isDarkMode?: boolean;
  isAILoading?: boolean;
  lang: Language;
}

const FearGreedGauge: React.FC<FearGreedGaugeProps> = ({ score, isDarkMode = true, isAILoading = false, lang }) => {
  const t = translations[lang];
  
  const getLabel = (s: number) => {
    if (s <= 25) return { text: t.extreme_fear, color: 'text-red-500' };
    if (s <= 45) return { text: t.fear, color: 'text-orange-500' };
    if (s <= 55) return { text: t.neutral, color: (isDarkMode ? 'text-gray-400' : 'text-slate-400') };
    if (s <= 75) return { text: t.greed, color: 'text-green-500' };
    return { text: t.extreme_greed, color: 'text-green-600' };
  };

  const label = getLabel(score);
  const rotation = (score / 100) * 180 - 90;

  return (
    <div className={`border rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-200'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isAILoading ? 'bg-blue-500 animate-pulse' : 'bg-orange-500'}`}></span>
            {isAILoading ? t.tech_sentiment : t.market_sentiment}
          </h3>
          <p className="text-[8px] text-gray-500 font-mono mt-0.5 uppercase tracking-tighter">
            {isAILoading ? t.calculated_indicators : t.ia_sync}
          </p>
        </div>
        {isAILoading && (
          <span className="text-[7px] text-blue-500/50 font-black animate-pulse uppercase">{t.ia_processing}</span>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[180px] aspect-[2/1] flex items-end justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="25%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="75%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>
            <path 
              d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" 
              stroke={isDarkMode ? "#1f2937" : "#f1f5f9"} 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            <path 
              d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" 
              stroke="url(#gaugeGradient)" 
              strokeWidth="10" 
              strokeLinecap="round" 
              strokeDasharray="125.6"
              strokeOpacity={isDarkMode ? "0.2" : "0.5"}
            />
          </svg>

          <div 
            className={`absolute bottom-0 w-1 h-20 bg-gradient-to-t origin-bottom transition-transform duration-[1200ms] ease-out z-10 ${isDarkMode ? 'from-white to-transparent' : 'from-indigo-600 to-transparent'}`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className={`w-2.5 h-2.5 rounded-full absolute -bottom-1 -left-0.75 shadow-lg ${isDarkMode ? 'bg-white' : 'bg-indigo-600'}`}></div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
             <span className={`text-3xl font-black tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{score}</span>
             <span className={`text-[8px] font-black uppercase tracking-widest mt-1 ${label.color}`}>
               {label.text}
             </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-1">
        {[0, 25, 50, 75, 100].map((mark) => (
          <div key={mark} className="flex flex-col items-center gap-0.5">
            <div className={`h-1 w-full rounded-full transition-colors duration-1000 ${score >= mark ? (isDarkMode ? 'bg-blue-500/40' : 'bg-blue-600/20') : (isDarkMode ? 'bg-gray-800' : 'bg-gray-100')}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FearGreedGauge;
