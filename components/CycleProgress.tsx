
import React, { useMemo } from 'react';
import { translations, Language } from '../translations';
import { CandleData, GeminiAnalysis } from '../types';

interface CycleProgressProps {
  lang: Language;
  symbol?: string;
  data?: CandleData[];
  analysis?: GeminiAnalysis | null;
}

const NEXT_HALVING = 1840000000000; // Est. Abril 2028
const PREV_HALVING = 1713571200000; // Abril 2024

const CycleProgress: React.FC<CycleProgressProps> = ({ lang, symbol = 'BTCUSDT', data = [], analysis = null }) => {
  const t = translations[lang];
  
  const stats = useMemo(() => {
    const isBTC = symbol === 'BTCUSDT';
    const isGOLD = symbol === 'PAXGUSDT';

    if (isBTC) {
      const now = Date.now();
      const total = NEXT_HALVING - PREV_HALVING;
      const elapsed = now - PREV_HALVING;
      const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));
      const daysLeft = Math.ceil((NEXT_HALVING - now) / (1000 * 60 * 60 * 24));
      
      return { 
        progress, 
        label: t.halving_progress, 
        subLabel: `${daysLeft} ${t.days_left}`,
        color: 'from-blue-600 to-orange-500' 
      };
    }

    let progress = 50;
    let label = t.cycle_stage;
    let color = 'from-blue-600 to-indigo-500';

    if (isGOLD) {
      label = t.gold_scarcity;
      color = 'from-yellow-600 to-yellow-300';
      progress = 92; // High inherent scarcity
    }

    return { 
      progress, 
      label, 
      subLabel: `${progress.toFixed(0)}%`,
      color 
    };
  }, [symbol, lang, data, t]);

  const getReservesColor = (reserves?: string) => {
    if (!reserves) return 'text-blue-400';
    const r = reserves.toLowerCase();
    if (r.includes('extremamente baixo') || r.includes('extremely low') || r.includes('extremo') || r.includes('critically')) return 'text-red-500';
    if (r.includes('baixo') || r.includes('low') || r.includes('niedrig') || r.includes('bajo')) return 'text-blue-400';
    if (r.includes('alto') || r.includes('high') || r.includes('hoch')) return 'text-green-500';
    return 'text-orange-400';
  };

  const isBTC = symbol === 'BTCUSDT';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-xl transition-all duration-500 space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.cycle_stage}</h4>
          <p className="text-sm font-black text-white uppercase tracking-tight">{stats.label}</p>
        </div>
        <div className="text-right">
          <p className={`text-[10px] font-mono font-bold uppercase ${stats.color.includes('orange') ? 'text-orange-500' : 'text-blue-400'}`}>
            {stats.subLabel}
          </p>
        </div>
      </div>
      
      <div className="relative h-4 bg-gray-950 rounded-full border border-gray-800 overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${stats.color} transition-all duration-1000`}
          style={{ width: `${stats.progress}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-black text-white mix-blend-difference">
            {stats.progress.toFixed(1)}% {t.completed}
          </span>
        </div>
      </div>

      {isBTC && (
        <div className="pt-2 border-t border-gray-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{t.scarcity_stage}</span>
            <span className="text-[10px] font-black text-orange-500 uppercase italic">
              {analysis?.scarcityStage || t.calculating}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{t.exchange_reserves}</span>
              <div className="p-0.5 bg-blue-500/10 rounded border border-blue-500/20">
                <p className="text-[7px] font-black text-blue-400 uppercase tracking-tighter">{t.on_chain_data}</p>
              </div>
            </div>
            <span className={`text-[10px] font-black uppercase ${getReservesColor(analysis?.exchangeReserves)}`}>
              {analysis?.exchangeReserves || t.calculating}
            </span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-gray-800/30">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{t.total_mined_btc}</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-blue-400 font-mono">
                 {analysis?.totalMinedBtc || t.calculating}
               </span>
               <span className="text-[8px] text-gray-600 font-black">/ 21M</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CycleProgress;
