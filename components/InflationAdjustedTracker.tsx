
import React from 'react';
import { GeminiAnalysis, Language } from '../types';
import { translations } from '../translations';

interface InflationAdjustedTrackerProps {
  analysis: GeminiAnalysis | null;
  currentPrice: number;
  lang: Language;
  symbol: string;
}

const InflationAdjustedTracker: React.FC<InflationAdjustedTrackerProps> = ({ analysis, currentPrice, lang, symbol }) => {
  const t = translations[lang];
  const isBTC = symbol === 'BTCUSDT';
  const isGold = symbol === 'PAXGUSDT';

  // We use the inflation adjusted price calculated by the AI based on the 2021 anchor
  const adjustedPrice = isBTC ? analysis?.inflationAdjustedPrice : (isGold ? analysis?.inflationAdjustedPriceGold : null);

  if (!analysis?.inflationIndexUsed || !adjustedPrice) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-xl animate-pulse">
        <div className="h-3 w-24 bg-gray-800 rounded mb-4"></div>
        <div className="h-8 w-full bg-gray-800 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
      </div>
    );
  }

  const differencePct = ((currentPrice - adjustedPrice) / adjustedPrice) * 100;
  const isAbove = differencePct > 0;
  const colorTheme = isGold ? 'text-yellow-500' : 'text-blue-500';
  const glowTheme = isGold ? 'bg-yellow-500' : 'bg-blue-500';
  const borderTheme = isGold ? 'hover:border-yellow-500/30' : 'hover:border-blue-500/30';

  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-500 ${borderTheme}`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
         <svg className={`w-10 h-10 ${colorTheme}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${colorTheme}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${glowTheme}`}></span>
            {t.inflation_tracker_title}
          </h3>
          <p className="text-[8px] text-gray-500 font-mono mt-1 uppercase tracking-tighter">CONSTANT DOLLARS ADJUSTMENT</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-950 rounded-xl border border-gray-800">
          <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">{t.inflation_index_label}</p>
          <p className="text-xl font-black text-white font-mono">{analysis.inflationIndexUsed}</p>
        </div>
        <div className="p-4 bg-gray-950 rounded-xl border border-gray-800">
          <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">{isAbove ? t.purchasing_power_gain : t.purchasing_power_loss}</p>
          <p className={`text-xl font-black font-mono ${isAbove ? 'text-green-400' : 'text-red-400'}`}>
            {isAbove ? '+' : ''}{differencePct.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className={`p-4 rounded-2xl mb-4 text-center border ${isGold ? 'bg-yellow-900/10 border-yellow-500/20' : 'bg-blue-900/10 border-blue-500/20'}`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${colorTheme}`}>{t.equivalent_price_label}</p>
        <p className="text-3xl font-black text-white font-mono tracking-tighter">${adjustedPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
      </div>

      <div className="p-4 bg-black/20 rounded-xl space-y-2 border border-white/5">
        <p className="text-[11px] text-gray-400 leading-relaxed italic text-center px-2">
          {isGold ? t.inflation_desc_gold : t.inflation_desc_btc}
        </p>
        <div className="pt-2 border-t border-gray-800">
          <p className="text-[8px] font-black text-gray-600 uppercase mb-1 tracking-widest">{t.methodology_title}</p>
          <p className="text-[8px] text-gray-600 leading-tight">{t.methodology_desc}</p>
        </div>
      </div>
    </div>
  );
};

export default InflationAdjustedTracker;
