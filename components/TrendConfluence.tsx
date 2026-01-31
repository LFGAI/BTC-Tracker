
import React, { useMemo } from 'react';
import { CandleData } from '../types';
import { translations, Language } from '../translations';

interface TrendConfluenceProps {
  data: CandleData[];
  lang: Language;
}

const TrendConfluence: React.FC<TrendConfluenceProps> = ({ data, lang }) => {
  const t = translations[lang];
  const confluence = useMemo(() => {
    if (data.length < 2) return null;
    const current = data[data.length - 1];
    const prev = data[data.length - 2];

    const checks = [
      {
        id: 'price_above_50',
        label: t.confluence_price_50,
        status: current.wma50 ? current.close > current.wma50 : false,
        weight: 30
      },
      {
        id: 'rsi_above_50',
        label: t.confluence_rsi_50,
        status: current.rsi ? current.rsi > 50 : false,
        weight: 20
      },
      {
        id: 'rsi_not_overbought',
        label: t.confluence_rsi_70,
        status: current.rsi ? current.rsi < 70 : false,
        weight: 15
      },
      {
        id: 'golden_structure',
        label: t.confluence_golden,
        status: (current.wma50 && current.wma200) ? current.wma50 > current.wma200 : false,
        weight: 25
      },
      {
        id: 'higher_high',
        label: t.confluence_higher_high,
        status: current.close > prev.close,
        weight: 10
      }
    ];

    const score = checks.reduce((acc, check) => acc + (check.status ? check.weight : 0), 0);
    const isBullishAlert = score >= 75;

    return { checks, score, isBullishAlert, rsi: current.rsi };
  }, [data, t]);

  if (!confluence) return null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
      <div className={`p-4 border-b border-gray-800 flex justify-between items-center ${confluence.isBullishAlert ? 'bg-green-500/10' : 'bg-gray-800/50'}`}>
        <div>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.confluence}</h3>
          <p className="text-[10px] text-gray-500 font-mono">{t.trend_score}</p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-black ${confluence.score >= 70 ? 'text-green-400' : confluence.score >= 40 ? 'text-orange-400' : 'text-red-400'}`}>
            {confluence.score}%
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${confluence.score >= 70 ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-orange-500'}`}
            style={{ width: `${confluence.score}%` }}
          ></div>
        </div>

        <div className="space-y-2">
          {confluence.checks.map(check => (
            <div key={check.id} className="flex items-center justify-between text-[11px] group">
              <span className={`font-medium transition-colors ${check.status ? 'text-gray-300' : 'text-gray-600'}`}>
                {check.label}
              </span>
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${check.status ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-transparent border-gray-700 text-transparent'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
              </div>
            </div>
          ))}
        </div>

        {confluence.isBullishAlert && (
          <div className="mt-4 p-4 bg-green-500 rounded-lg animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.4)]">
             <div className="flex items-center gap-3">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
               <div>
                 <p className="text-[10px] font-black text-green-950 uppercase tracking-widest leading-none">{t.trend_alert}</p>
                 <p className="text-sm font-black text-white">{t.bullish_confirmed}</p>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendConfluence;
