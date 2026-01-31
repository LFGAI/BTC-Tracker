
import React from 'react';
import { MarketSignal, GeminiAnalysis } from '../types';
import { translations, Language } from '../translations';

interface SignalCardProps {
  signal: MarketSignal;
  trend?: 'BULL' | 'BEAR';
  isDarkMode?: boolean;
  aiAnalysis?: GeminiAnalysis | null;
  lang: Language;
}

const AlphaMascot: React.FC<{ type: 'BULL' | 'BEAR', isBuy: boolean, isSell: boolean }> = ({ type, isBuy, isSell }) => {
  const isBull = type === 'BULL';
  const colorClass = isBull ? 'text-green-500' : 'text-red-500';
  const glowClass = isBull ? 'drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]';

  if (isBull) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={`${colorClass} ${glowClass} w-2/3 h-2/3 transform hover:scale-110 transition-transform duration-500`}>
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={`${colorClass} ${glowClass} w-2/3 h-2/3 transform hover:scale-110 transition-transform duration-500`}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
};

const SignalCard: React.FC<SignalCardProps> = ({ signal, trend, isDarkMode = true, lang }) => {
  const t = translations[lang];
  const isBuy = signal.type === 'BUY';
  const isSell = signal.type === 'SELL';
  const isBull = trend === 'BULL';

  const bgColor = isBuy 
    ? (isDarkMode ? 'bg-green-900/20 border-green-500/50' : 'bg-green-50 border-green-200')
    : isSell 
      ? (isDarkMode ? 'bg-red-900/20 border-red-500/50' : 'bg-red-50 border-red-200')
      : (isDarkMode ? 'bg-gray-800/20 border-gray-700/50' : 'bg-white border-slate-200');

  const textColor = isBuy ? 'text-green-500' : isSell ? 'text-red-500' : (isDarkMode ? 'text-gray-400' : 'text-slate-500');

  return (
    <div className={`p-1 rounded-2xl border shadow-2xl transition-all overflow-hidden duration-500 ${bgColor}`}>
      <div className={`rounded-xl p-6 transition-colors duration-500 ${isDarkMode ? 'bg-black/40 backdrop-blur-md' : 'bg-white/60'}`}>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          {/* Market Direction Indicator */}
          <div className={`flex-shrink-0 flex items-center justify-center w-40 h-40 rounded-2xl border relative group overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
            
            {/* Dynamic background glow */}
            <div className={`absolute inset-0 opacity-20 blur-2xl transition-all duration-1000 ${isBull ? 'bg-green-600' : 'bg-red-600'}`}></div>
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <AlphaMascot type={isBull ? 'BULL' : 'BEAR'} isBuy={isBuy} isSell={isSell} />
              
              <div className={`absolute bottom-0 left-0 right-0 py-1.5 ${isBull ? 'bg-green-600/20' : 'bg-red-600/20'} backdrop-blur-sm`}>
                 <p className={`text-[9px] font-black uppercase tracking-[0.25em] text-center ${isBull ? 'text-green-400' : 'text-red-400'}`}>
                   {isBull ? t.bull_phase : t.bear_phase}
                 </p>
              </div>
            </div>
          </div>

          {/* Signal Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>{t.technical_signals}</h3>
              <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase border transition-all duration-300 ${isBuy ? 'border-green-500 text-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : isSell ? 'border-red-500 text-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-gray-500 text-gray-500 bg-gray-500/10'}`}>
                {signal.type === 'BUY' ? t.buy : signal.type === 'SELL' ? t.sell : t.neutral}
              </span>
            </div>
            
            <div>
              <p className={`text-3xl font-black tracking-tighter leading-none mb-2 transition-colors duration-300 ${textColor}`}>
                {signal.message}
              </p>
              <p className={`text-sm font-medium leading-relaxed max-w-md ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                {signal.reason}
              </p>
            </div>

            <div className={`grid grid-cols-2 gap-6 pt-4 border-t ${isDarkMode ? 'border-gray-800/50' : 'border-slate-200'}`}>
              <div>
                <p className="text-[9px] text-gray-500 font-black uppercase mb-1.5">{t.confidence}</p>
                <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-slate-100'}`}>
                  <div className={`h-full transition-all duration-1000 ${isBuy ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : isSell ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-blue-500'}`} style={{ width: isBuy || isSell ? '92%' : '35%' }}></div>
                </div>
              </div>
              <div>
                <p className="text-[9px] text-gray-500 font-black uppercase mb-1.5">{t.volatility}</p>
                <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{isBuy ? t.high : t.moderate}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignalCard;
