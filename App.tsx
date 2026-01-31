
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchMarketData, enrichWithAverages } from './services/cryptoApi';
import { getMarketAnalysis } from './services/geminiService';
import { CandleData, MarketSignal, GeminiAnalysis, UserAlert, SUPPORTED_ASSETS, Language } from './types';
import { translations } from './translations';
import SignalCard from './components/SignalCard';
import ChartSection from './components/ChartSection';
import AlertManager from './components/AlertManager';
import AlertPerformance from './components/AlertPerformance';
import TrendConfluence from './components/TrendConfluence';
import MacroValuation from './components/MacroValuation';
import CycleLegend from './components/CycleLegend';
import CycleProgress from './components/CycleProgress';
import FearGreedGauge from './components/FearGreedGauge';
import PositionSimulator from './components/PositionSimulator';
import SimplifiedDashboard from './components/SimplifiedDashboard';
import InflationAdjustedTracker from './components/InflationAdjustedTracker';
import BTCGoldIndicator from './components/BTCGoldIndicator';

const AI_CACHE_TTL = 15 * 60 * 1000; 

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('alpha_lang') as Language) || 'PT');
  const [viewMode, setViewMode] = useState<'EASY' | 'PRO'>(() => (localStorage.getItem('alpha_view_mode') as 'EASY' | 'PRO') || 'EASY');
  const t = translations[lang];

  const [data, setData] = useState<CandleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSymbol, setCurrentSymbol] = useState('BTCUSDT');
  const [currentInterval, setCurrentInterval] = useState('1w');
  const [systemSignal, setSystemSignal] = useState<MarketSignal>({ type: 'NEUTRAL', message: 'Analisando...', reason: 'A aguardar dados...' });
  const [activeAlerts, setActiveAlerts] = useState<UserAlert[]>([]);
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [isUpdatingAI, setIsUpdatingAI] = useState(false);

  const currentAsset = SUPPORTED_ASSETS.find(a => a.symbol === currentSymbol) || SUPPORTED_ASSETS[0];

  const activePriceDisplay = useMemo(() => {
    return data.length > 0 ? data[data.length - 1].close : 0;
  }, [data]);

  const processSystemSignal = useCallback((marketData: CandleData[], assetName: string, currentLang: Language) => {
    if (marketData.length === 0) return;
    const latest = marketData[marketData.length - 1];
    const prev = marketData.length > 1 ? marketData[marketData.length - 2] : latest;
    const trans = translations[currentLang];
    const { close, wma50, sma200 } = latest;

    if (sma200) {
      if (close < sma200) {
        setSystemSignal({ 
          type: 'BUY', 
          message: `Oportunidade Histórica`, 
          reason: `Preço abaixo da 200WMA ($${sma200.toFixed(0)}). Este é o sinal de "mão de ferro" para acumulação geracional.` 
        });
        return;
      }
      if (prev.close < sma200 && close >= sma200) {
        setSystemSignal({ 
          type: 'BUY', 
          message: `Suporte Confirmado`, 
          reason: `Recuperação da 200WMA. O mercado expulsou os especuladores e retomou o valor intrínseco.` 
        });
        return;
      }
    }

    if (wma50) {
      if (close < wma50) {
        setSystemSignal({ 
          type: 'SELL', 
          message: trans.bear_phase, 
          reason: `Abaixo da 50WMA. Momentum de baixa predominante no médio prazo.` 
        });
      } else {
        setSystemSignal({ 
          type: 'BUY', 
          message: `Trend de Alta`, 
          reason: `Acima da 50WMA. O mercado está saudável e em expansão.` 
        });
      }
    }
  }, []);

  const triggerAIAnalysis = useCallback(async (marketData: CandleData[], price: number) => {
    const cacheKey = `alpha_v2_res_${currentSymbol}_${lang}`;
    const cachedStr = localStorage.getItem(cacheKey);
    
    if (cachedStr) {
      const cached = JSON.parse(cachedStr);
      if ((Date.now() - cached.timestamp) < AI_CACHE_TTL) {
        setAnalysis(cached.data);
        return;
      }
    }

    const latest = marketData[marketData.length - 1];
    if (latest && latest.sma200) {
      setIsUpdatingAI(true);
      try {
        const res = await getMarketAnalysis(
          price, 
          latest.wma50 || price, 
          latest.sma200, 
          latest.rsi || 50, 
          currentSymbol, 
          currentAsset.category === 'COMMODITY',
          lang
        );
        if (res) {
          setAnalysis(res);
          localStorage.setItem(cacheKey, JSON.stringify({ data: res, timestamp: Date.now() }));
        }
      } catch (err) {
        console.error("AI Update Failed", err);
      } finally {
        setIsUpdatingAI(false);
      }
    }
  }, [currentSymbol, currentAsset.category, lang]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const rawData = await fetchMarketData(currentSymbol, currentInterval);
      if (rawData.length > 0) {
        const enriched = enrichWithAverages(rawData);
        setData(enriched);
        processSystemSignal(enriched, currentAsset.name, lang);
      }
      setLoading(false);
    };
    load();
  }, [currentSymbol, currentInterval, currentAsset.name, lang, processSystemSignal]);
  
  useEffect(() => {
    if (data.length > 0 && !isUpdatingAI && !analysis) {
      triggerAIAnalysis(data, activePriceDisplay);
    }
  }, [data, activePriceDisplay, triggerAIAnalysis, analysis, isUpdatingAI]);

  if (loading && data.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-6 text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase">{t.loading_engine}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-2xl border-b border-gray-800/50 p-4 bg-[#050505]/80">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter uppercase">ALPHA <span className="text-blue-500">TRACKER</span></h1>
              <div className="flex items-center gap-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${data[data.length-1]?.trend === 'BULL' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                 <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider">{data[data.length-1]?.trend === 'BULL' ? t.bull_phase : t.bear_phase}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex bg-gray-900/50 p-1 rounded-xl border border-gray-800">
               <button onClick={() => setViewMode('EASY')} className={`px-4 py-1.5 text-[9px] font-black rounded-lg uppercase transition-all ${viewMode === 'EASY' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>{t.view_mode_easy}</button>
               <button onClick={() => setViewMode('PRO')} className={`px-4 py-1.5 text-[9px] font-black rounded-lg uppercase transition-all ${viewMode === 'PRO' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>{t.view_mode_pro}</button>
            </div>
            <nav className="flex items-center p-1 rounded-xl border border-gray-800 bg-gray-900/50 gap-1">
              {SUPPORTED_ASSETS.map(asset => (
                <button
                  key={asset.symbol}
                  onClick={() => { setCurrentSymbol(asset.symbol); setAnalysis(null); }}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black border ${currentSymbol === asset.symbol ? 'border-blue-500 text-blue-400' : 'text-gray-500 border-transparent'}`}
                >
                  {asset.name.toUpperCase()}
                </button>
              ))}
            </nav>
            <select value={lang} onChange={(e) => { setLang(e.target.value as Language); setAnalysis(null); }} className="bg-gray-900/50 border border-gray-800 text-[10px] font-black text-blue-500 rounded-xl px-3 py-2 outline-none">
              <option value="EN">EN</option><option value="PT">PT</option><option value="ES">ES</option>
            </select>
          </div>

          <div className="text-right">
            <p className="text-[9px] font-black uppercase text-gray-600 mb-1">{t.live_source}</p>
            <p className="text-2xl font-black font-mono leading-none text-white tracking-tighter">
              {activePriceDisplay.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-gray-500 text-sm">USD</span>
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">
        {viewMode === 'PRO' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
               <SignalCard signal={systemSignal} trend={data[data.length-1]?.trend} lang={lang} />
               <ChartSection data={data} symbol={currentSymbol} interval={currentInterval} onIntervalChange={setCurrentInterval} lang={lang} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AlertManager alerts={activeAlerts} onAddAlert={(a) => setActiveAlerts(p => [...p, {...a, id: Math.random().toString(36).substr(2,9)}])} onDeleteAlert={(id) => setActiveAlerts(p => p.filter(x => x.id !== id))} lang={lang} />
                  <div className="space-y-8">
                     <TrendConfluence data={data} lang={lang} />
                     <PositionSimulator data={data} lang={lang} />
                     <MacroValuation data={data} lang={lang} />
                  </div>
               </div>
               <AlertPerformance alerts={activeAlerts} data={data} lang={lang} />
            </div>

            <div className="space-y-8">
              <BTCGoldIndicator analysis={analysis} lang={lang} />
              <CycleProgress lang={lang} symbol={currentSymbol} data={data} analysis={analysis} />
              <InflationAdjustedTracker analysis={analysis} currentPrice={activePriceDisplay} lang={lang} symbol={currentSymbol} />
              <FearGreedGauge score={analysis ? analysis.fearGreedScore : 50} isAILoading={isUpdatingAI && !analysis} lang={lang} />
              <CycleLegend lang={lang} />
            </div>
          </div>
        ) : (
          <SimplifiedDashboard data={data} analysis={analysis} lang={lang} symbol={currentSymbol} assetName={currentAsset.name} price={activePriceDisplay} />
        )}
      </main>

      <footer className="max-w-[1600px] mx-auto p-12 border-t border-gray-800/50 text-center">
        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">Alpha Engine v2.1 • Optimized for Vercel</p>
      </footer>
    </div>
  );
};

export default App;
