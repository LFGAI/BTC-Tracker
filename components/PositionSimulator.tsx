
import React, { useMemo, useState } from 'react';
import { CandleData } from '../types';
import { translations, Language } from '../translations';

interface PositionSimulatorProps {
  data: CandleData[];
  lang: Language;
}

const PositionSimulator: React.FC<PositionSimulatorProps> = ({ data, lang }) => {
  const t = translations[lang];
  const [investment, setInvestment] = useState<number>(1000);
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');

  const stats = useMemo(() => {
    if (data.length < 52) return null;
    
    let lastFloorIndex = -1;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].wma200 && data[i].low <= data[i].wma200! * 1.05) {
        lastFloorIndex = i;
        break;
      }
    }

    if (lastFloorIndex === -1) return null;

    const floorPrice = data[lastFloorIndex].close;
    const currentPrice = data[data.length - 1].close;
    const roi = ((currentPrice - floorPrice) / floorPrice) * 100;
    const weeksAgo = data.length - 1 - lastFloorIndex;

    return { floorPrice, currentPrice, roi, weeksAgo };
  }, [data]);

  if (!stats) return null;

  const pnl = side === 'BUY' 
    ? investment * (stats.roi / 100)
    : investment * (-stats.roi / 100);

  const totalValue = investment + pnl;

  return (
    <div className="bg-blue-900/10 border border-blue-500/30 rounded-xl p-5 shadow-2xl transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500 rounded-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{t.roi_simulator}</h3>
        </div>
        <div className="flex bg-gray-950 p-0.5 rounded-lg border border-gray-800">
          <button 
            onClick={() => setSide('BUY')}
            className={`px-3 py-1 text-[8px] font-black rounded uppercase transition-all ${side === 'BUY' ? 'bg-green-600 text-white' : 'text-gray-500'}`}
          >
            {t.side_long}
          </button>
          <button 
            onClick={() => setSide('SELL')}
            className={`px-3 py-1 text-[8px] font-black rounded uppercase transition-all ${side === 'SELL' ? 'bg-red-600 text-white' : 'text-gray-500'}`}
          >
            {t.side_short}
          </button>
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
        {t.roi_description(stats.weeksAgo, stats.floorPrice.toLocaleString())}
      </p>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-[9px] font-black text-gray-500 uppercase">{t.investment_amount}</label>
            <span className="text-[10px] font-mono font-bold text-white">${investment.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="10000" 
            step="100"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3">
          <div className="flex justify-between items-end border-b border-gray-800 pb-3">
            <div>
              <p className="text-[9px] text-gray-500 font-black uppercase">{t.current_return} (%)</p>
              <p className={`text-2xl font-black ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {pnl >= 0 ? '+' : ''}{((pnl/investment)*100).toFixed(1)}%
              </p>
            </div>
            <div className="text-right">
               <p className="text-[9px] text-gray-500 font-black uppercase">{t.result_usd}</p>
               <p className={`text-lg font-black ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                 {pnl >= 0 ? '+' : '-'}${Math.abs(pnl).toLocaleString(undefined, { maximumFractionDigits: 0 })}
               </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{t.total_position_value}</span>
            <span className="text-sm font-black text-white font-mono">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>
      
      <p className="mt-4 text-[9px] text-gray-600 font-medium italic">{t.roi_footer}</p>
    </div>
  );
};

export default PositionSimulator;
