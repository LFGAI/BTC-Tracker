
import React from 'react';
import { GeminiAnalysis, Language } from '../types';
import { translations } from '../translations';

interface BTCGoldIndicatorProps {
  analysis: GeminiAnalysis | null;
  lang: Language;
}

const BTCGoldIndicator: React.FC<BTCGoldIndicatorProps> = ({ analysis, lang }) => {
  const t = translations[lang];
  
  if (!analysis?.btcGoldStatus) return null;

  const status = analysis.btcGoldStatus;
  const isOver = status === 'OVERVALUED';
  const isUnder = status === 'UNDERVALUED';
  
  const colorClass = isOver ? 'text-red-500 border-red-500/30 bg-red-500/5' : 
                     isUnder ? 'text-green-500 border-green-500/30 bg-green-500/5' : 
                     'text-blue-400 border-blue-400/30 bg-blue-400/5';
  
  const label = isOver ? t.btc_gold_overvalued :
                isUnder ? t.btc_gold_undervalued :
                t.btc_gold_fair;

  return (
    <div className={`p-4 rounded-xl border transition-all duration-500 ${colorClass}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-[10px] font-black uppercase tracking-widest">{t.btc_gold_ratio}</h4>
        <div className={`p-1 rounded ${isOver ? 'bg-red-500' : isUnder ? 'bg-green-500' : 'bg-blue-500'}`}>
           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
      </div>
      <p className="text-sm font-black uppercase tracking-tighter leading-none mb-1">{label}</p>
      <p className="text-[10px] text-gray-400 italic leading-tight">{analysis.btcGoldDescription || t.btc_gold_desc}</p>
    </div>
  );
};

export default BTCGoldIndicator;
