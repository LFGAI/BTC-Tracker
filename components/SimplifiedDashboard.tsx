
import React, { useMemo } from 'react';
import { CandleData, GeminiAnalysis, Language } from '../types';
import { translations } from '../translations';
import CycleProgress from './CycleProgress';
import FearGreedGauge from './FearGreedGauge';
import BTCGoldIndicator from './BTCGoldIndicator';

interface SimplifiedDashboardProps {
  data: CandleData[];
  analysis: GeminiAnalysis | null;
  lang: Language;
  symbol?: string;
  assetName: string;
  price: number;
}

const PredictionBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => {
  // Normalize value to 0-100 range for the UI just in case
  const normalizedValue = Math.min(100, Math.max(0, value));
  const isReversal = label.toLowerCase().includes('reversal') || label.toLowerCase().includes('reversão');
  const shouldAlert = isReversal && normalizedValue > 60;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
        <span className="text-gray-500">{label}</span>
        <span className={shouldAlert ? 'text-green-400 animate-pulse font-black' : color}>{normalizedValue}%</span>
      </div>
      <div className={`h-2 w-full rounded-full bg-gray-800 overflow-hidden transition-all duration-500 ${shouldAlert ? 'ring-2 ring-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : ''}`}>
        <div 
          className={`h-full transition-all duration-1000 ${shouldAlert ? 'bg-green-500 animate-pulse' : color.replace('text-', 'bg-')}`} 
          style={{ width: `${normalizedValue}%` }}
        ></div>
      </div>
    </div>
  );
};

const SimplifiedDashboard: React.FC<SimplifiedDashboardProps> = ({ data, analysis, lang, symbol, assetName, price }) => {
  const t = translations[lang];
  const latest = data[data.length - 1];
  const isBull = latest?.trend === 'BULL';
  const isBTC = symbol === 'BTCUSDT';
  const isGold = symbol === 'PAXGUSDT';

  const aiOutlook = useMemo(() => {
    if (!analysis) return null;
    const { probRise, probFall, probReversal } = analysis;
    if (probReversal > 60) return { text: t.forecast_reversal, color: 'text-orange-400', icon: '🔄' };
    if (probRise > 60 && probRise > probFall) return { text: t.forecast_bullish, color: 'text-green-400', icon: '📈' };
    if (probFall > 60 && probFall > probRise) return { text: t.forecast_bearish, color: 'text-red-400', icon: '📉' };
    return { text: t.forecast_sideways, color: 'text-blue-400', icon: '↔️' };
  }, [analysis, t]);

  const getRecommendation = () => {
    if (!latest) return { text: t.neutral, color: 'text-gray-400' };
    
    const rsi = latest.rsi || 50;
    const isUndervalued = (latest.sma200 && latest.close <= latest.sma200 * 1.05) || rsi < 35;
    const isOverbought = rsi > 70;

    if (isUndervalued) {
      return { text: t.recommendation_buy, color: 'text-green-400' };
    } else if (isOverbought) {
      return { text: t.recommendation_sell, color: 'text-red-400' };
    } else if (isBull) {
      return { text: t.recommendation_hodl, color: 'text-blue-400' };
    } else {
      return { text: t.neutral, color: 'text-gray-400' };
    }
  };

  const getReservesColor = (reserves?: string) => {
    if (!reserves) return 'text-blue-400';
    const r = reserves.toLowerCase();
    if (r.includes('extremamente baixo') || r.includes('extremely low') || r.includes('extremo') || r.includes('critically')) return 'text-red-500';
    if (r.includes('baixo') || r.includes('low') || r.includes('niedrig') || r.includes('bajo')) return 'text-blue-400';
    if (r.includes('alto') || r.includes('high') || r.includes('hoch')) return 'text-green-500';
    return 'text-orange-400';
  };

  const recommendation = getRecommendation();

  const formattedPrice = price.toLocaleString(undefined, { 
    maximumFractionDigits: price > 1000 ? 0 : 2 
  });

  const adjustedPrice = isBTC ? analysis?.inflationAdjustedPrice : (isGold ? analysis?.inflationAdjustedPriceGold : null);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className={`p-8 rounded-3xl border shadow-2xl transition-all duration-500 flex flex-col items-center text-center gap-6 relative overflow-hidden ${isBull ? 'bg-green-900/10 border-green-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
        <div className={`absolute inset-0 opacity-10 blur-3xl ${isBull ? 'bg-green-500' : 'bg-red-500'}`}></div>
        
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className={`p-4 rounded-2xl ${isBull ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} shadow-lg transform hover:scale-110 transition-transform duration-300`}>
            {isBull ? (
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            ) : (
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/></svg>
            )}
          </div>
          
          <div className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <p className="text-[9px] font-black text-white/70 uppercase tracking-[0.2em]">{t.recommendation_title}</p>
            <p className={`text-sm font-black uppercase ${recommendation.color}`}>{recommendation.text}</p>
          </div>
        </div>

        <div>
          <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">{t.market_health}</h2>
          <p className={`text-5xl font-black tracking-tighter ${isBull ? 'text-green-400' : 'text-red-400'}`}>
            {isBull ? t.bull_phase : t.bear_phase}
          </p>
          <p className="mt-4 text-gray-400 max-w-lg font-medium leading-relaxed mx-auto">
            {isBull ? t.trend_desc_bull : t.trend_desc_bear}
          </p>
        </div>

        <div className="flex items-center gap-8 pt-4 border-t border-gray-800 w-full max-w-sm justify-center relative z-10">
          <div className="text-center">
            <p className="text-[9px] text-gray-500 font-black uppercase mb-1">{t.price}</p>
            <p className="text-xl font-black text-white font-mono">{formattedPrice} USD</p>
          </div>
          <div className="w-px h-8 bg-gray-800"></div>
          <div className="text-center">
            <p className="text-[9px] text-gray-500 font-black uppercase mb-1">{t.confidence}</p>
            <p className="text-xl font-black text-blue-500">{isBull ? '85%' : '72%'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 space-y-8 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {t.ai_prediction}
            </h3>
            {analysis && (
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${analysis.fearGreedScore > 50 ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
                {analysis.sentiment}
              </span>
            )}
          </div>

          {analysis ? (
            <div className="space-y-8 flex-1">
              <BTCGoldIndicator analysis={analysis} lang={lang} />
              
              <div className={`p-4 rounded-2xl border flex items-center justify-between transition-all duration-500 ${aiOutlook?.color.replace('text-', 'bg-').replace('400', '900/10')} ${aiOutlook?.color.replace('text-', 'border-').replace('400', '500/30')}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{aiOutlook?.icon}</span>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.ai_short_outlook}</p>
                    <p className={`text-lg font-black uppercase tracking-tight ${aiOutlook?.color}`}>{aiOutlook?.text}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[8px] font-black text-gray-500 uppercase">{t.confidence}</p>
                   <p className={`text-sm font-black ${aiOutlook?.color}`}>{Math.max(analysis.probRise, analysis.probFall, analysis.probReversal)}%</p>
                </div>
              </div>

              {adjustedPrice && (
                <div className={`p-4 border rounded-2xl flex justify-between items-center ${isGold ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-blue-500/5 border-blue-500/20'}`}>
                  <div>
                    <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">{t.equivalent_price_label}</p>
                    <p className="text-lg font-black text-white font-mono">
                      ${adjustedPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">{t.inflation_index_label}</p>
                    <p className={`text-xs font-black ${isGold ? 'text-yellow-500' : 'text-blue-400'}`}>{analysis.inflationIndexUsed}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <PredictionBar label={t.prob_rise} value={analysis.probRise} color="text-green-500" />
                <PredictionBar label={t.prob_fall} value={analysis.probFall} color="text-red-500" />
                <PredictionBar label={t.prob_reversal} value={analysis.probReversal} color="text-blue-400" />
              </div>

              {analysis.probReversal > 60 && (
                <div className="p-4 bg-blue-500 rounded-2xl animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  <p className="text-xs font-black text-white text-center uppercase tracking-widest">{t.reversal_alert}</p>
                </div>
              )}

              <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-800">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">{t.simple_advice_title}</p>
                <p className="text-lg font-bold text-gray-100 italic leading-relaxed">"{analysis.advice}"</p>
              </div>

              {isBTC && (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-black/30 rounded-xl border border-gray-800">
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">{t.scarcity_stage}</p>
                    <p className="text-xs font-black text-orange-400 uppercase">{analysis.scarcityStage || '---'}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl border border-gray-800">
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">{t.exchange_reserves}</p>
                    <p className={`text-xs font-black uppercase ${getReservesColor(analysis.exchangeReserves)}`}>{analysis.exchangeReserves || '---'}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl border border-gray-800 col-span-2">
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{t.total_mined_btc}</p>
                      <p className="text-xs font-black text-blue-400 uppercase">{analysis.totalMinedBtc || '---'} <span className="text-gray-600">/ 21M</span></p>
                    </div>
                  </div>
                </div>
              )}
              {analysis.sources && analysis.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">
                    {t.research_sources}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {analysis.sources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        <span className="opacity-50">[{idx + 1}]</span>
                        {source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-pulse">
              <div className="h-16 bg-gray-800 rounded-2xl w-full"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-800 rounded w-full"></div>
                <div className="h-6 bg-gray-800 rounded w-full"></div>
                <div className="h-6 bg-gray-800 rounded w-full"></div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
           <CycleProgress lang={lang} symbol={symbol} data={data} analysis={analysis} />
           <FearGreedGauge 
             score={analysis ? analysis.fearGreedScore : 50} 
             lang={lang} 
             isAILoading={!analysis}
           />
        </div>
      </div>
    </div>
  );
};

export default SimplifiedDashboard;
