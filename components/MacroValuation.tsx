
import React from 'react';
import { CandleData } from '../types';
import { translations, Language } from '../translations';

interface MacroValuationProps {
  data: CandleData[];
  lang: Language;
}

const MacroValuation: React.FC<MacroValuationProps> = ({ data, lang }) => {
  const t = translations[lang];
  if (data.length === 0) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 animate-pulse">
        <div className="h-4 bg-gray-800 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-800 rounded w-3/4"></div>
      </div>
    );
  }

  const latest = data[data.length - 1];
  const { close, wma50, wma200, rsi } = latest;
  const isDataReady = wma50 !== undefined && wma200 !== undefined && rsi !== undefined;

  if (!isDataReady) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t.macro_analysis}</h4>
        <p className="text-xs text-gray-500 font-mono mt-1">{t.calculating}</p>
      </div>
    );
  }

  const isNearFloor = close <= wma200! * 1.03;
  const isOversold = rsi! < 32;
  const isUndervalued = isNearFloor || isOversold;
  const isExtremeRsi = rsi! > 72;
  const isParabolic = close > wma50! * 1.8;
  const isOverbought = isExtremeRsi || isParabolic;

  return (
    <div className="space-y-4">
      {isUndervalued && (
        <div className="relative overflow-hidden rounded-xl border-2 border-green-500 bg-green-950/40 p-5 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-600 rounded-lg shadow-lg rotate-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
            </div>
            <div>
              <h4 className="text-sm font-black text-green-400 uppercase tracking-widest">{t.undervalued}</h4>
              <p className="text-xs text-green-100/90 font-bold mt-1 leading-relaxed">{t.opportunity_accumulation}</p>
            </div>
          </div>
        </div>
      )}

      {isOverbought && (
        <div className="relative overflow-hidden rounded-xl border-2 border-red-500 bg-red-950/40 p-5 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-600 rounded-lg shadow-lg -rotate-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
            </div>
            <div>
              <h4 className="text-sm font-black text-red-400 uppercase tracking-widest">{t.overbought}</h4>
              <p className="text-xs text-red-100/90 font-bold mt-1 leading-relaxed">{t.unsustainable_extension}</p>
            </div>
          </div>
        </div>
      )}

      {!isUndervalued && !isOverbought && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between group hover:border-blue-500/50 transition-all">
           <div>
             <div className="flex items-center gap-2">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.macro_analysis}</h4>
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
             </div>
             <p className="text-xs text-gray-300 font-mono mt-1">{t.equilibrium_zone}</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default MacroValuation;
