
import React, { useState, useMemo, useEffect } from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Scatter,
  Cell,
  Area,
  Brush,
  Bar,
  LineChart
} from 'recharts';
import { CandleData } from '../types';
import { translations, Language } from '../translations';

interface ChartSectionProps {
  data: CandleData[];
  symbol: string;
  interval: string;
  onIntervalChange: (interval: string) => void;
  isDarkMode?: boolean;
  lang: Language;
}

const formatPrice = (val: number) => {
  if (!val) return '---';
  return val.toLocaleString(undefined, { 
    minimumFractionDigits: val > 1000 ? 0 : 2, 
    maximumFractionDigits: val > 1000 ? 0 : 2 
  });
};

const CustomTooltip = ({ active, payload, label, isDarkMode, lang, interval }: any) => {
  const t = translations[lang as Language];
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (!data || !data.close) return null;

    const intervalLabel = interval === '1d' ? t.interval_day : interval === '1w' ? t.interval_week : t.interval_month;

    return (
      <div className={`p-3 rounded-lg shadow-2xl text-[10px] backdrop-blur-md z-50 border-l-2 border-l-blue-500 min-w-[140px] border transition-colors ${isDarkMode ? 'bg-gray-950/95 border-gray-800' : 'bg-white/95 border-slate-200'}`}>
        <div className="flex justify-between items-center mb-2 gap-4">
          <span className="text-gray-500 font-mono">
            {label ? new Date(label).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '---'}
          </span>
          <span className="bg-blue-500/10 text-blue-500 px-1 rounded font-black uppercase">{intervalLabel}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400 uppercase font-black">PRICE:</span>
            <span className={`font-mono font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formatPrice(data.close)}</span>
          </div>
          <div className={`pt-1 mt-1 border-t space-y-1 ${isDarkMode ? 'border-gray-800' : 'border-slate-100'}`}>
            {data.wma50 && (
              <div className="flex justify-between">
                <span className="text-orange-500 uppercase font-black">50MA:</span>
                <span className="text-orange-500 font-mono font-bold">{formatPrice(data.wma50)}</span>
              </div>
            )}
            {data.wma200 && (
              <div className="flex justify-between">
                <span className="text-purple-500 uppercase font-black">200MA:</span>
                <span className="text-purple-500 font-mono font-bold">{formatPrice(data.wma200)}</span>
              </div>
            )}
          </div>
          <div className={`flex justify-between pt-1 border-t ${isDarkMode ? 'border-gray-800' : 'border-slate-100'}`}>
            <span className="text-blue-500 uppercase font-black">RSI:</span>
            <span className={`font-mono font-black ${data.rsi > 70 ? 'text-red-500' : data.rsi < 30 ? 'text-green-500' : 'text-blue-500'}`}>
              {data.rsi?.toFixed(0)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const ChartSection: React.FC<ChartSectionProps> = ({ data, symbol, interval, onIntervalChange, isDarkMode = true, lang }) => {
  const t = translations[lang];
  const [chartType, setChartType] = useState<'AREA' | 'CANDLE'>('AREA');
  const [isLogScale, setIsLogScale] = useState(true);
  const [brushIndices, setBrushIndices] = useState({ start: 0, end: 0 });
  const [visibility, setVisibility] = useState({ wma50: true, wma100: true, wma200: true, rsi: true, volume: true });

  const fullTimelineData = useMemo(() => {
    if (!data) return [];
    return data.map(d => ({
      date: d.time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: d.volume,
      wma50: d.wma50,
      wma100: d.wma100,
      wma200: d.wma200,
      rsi: d.rsi,
      candleBody: [d.open, d.close],
      candleWick: [d.low, d.high],
      changeMarker: d.trendChange ? d.close : null,
      changeType: d.trendChange
    }));
  }, [data]);

  useEffect(() => {
    if (fullTimelineData.length > 0) {
      setBrushIndices({ start: Math.max(0, fullTimelineData.length - 150), end: fullTimelineData.length - 1 });
    }
  }, [fullTimelineData.length, symbol]);

  const visibleData = useMemo(() => {
    if (fullTimelineData.length === 0) return [];
    return fullTimelineData.slice(brushIndices.start, brushIndices.end + 1);
  }, [fullTimelineData, brushIndices]);

  const displaySymbol = symbol.replace('USDT', '');

  return (
    <div className={`h-[800px] w-full border rounded-2xl flex flex-col shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#0d1117] border-gray-800' : 'bg-white border-slate-200'}`}>
      <div className={`border-b p-3 flex flex-wrap items-center justify-between gap-4 z-20 ${isDarkMode ? 'bg-[#161b22] border-gray-800' : 'bg-slate-50'}`}>
        <div className="flex flex-wrap items-center gap-4">
          <h2 className={`text-xs font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {displaySymbol}/USDT <span className="text-[10px] text-gray-500 font-mono uppercase">{t.binance_label}</span>
          </h2>
          
          <div className="flex bg-gray-900 p-0.5 rounded-lg border border-gray-800">
            {['1d', '1w', '1M'].map(int => (
              <button key={int} onClick={() => onIntervalChange(int)} className={`px-3 py-1 rounded text-[9px] font-black transition-all ${interval === int ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>
                {int.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex bg-gray-900 p-0.5 rounded-lg border border-gray-800">
            <button onClick={() => setChartType('AREA')} className={`px-3 py-1 rounded text-[9px] font-black ${chartType === 'AREA' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>{t.chart_area}</button>
            <button onClick={() => setChartType('CANDLE')} className={`px-3 py-1 rounded text-[9px] font-black ${chartType === 'CANDLE' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>{t.chart_candle}</button>
          </div>

          <button onClick={() => setIsLogScale(!isLogScale)} className={`px-3 py-1 rounded text-[10px] font-black border ${isLogScale ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
            {t.log_scale}
          </button>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col pt-4 overflow-hidden">
        <div className="flex-[3] relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart syncId="cryptoSync" data={visibleData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="1 10" stroke={isDarkMode ? "#21262d" : "#f1f5f9"} vertical={false} />
              <XAxis dataKey="date" type="number" domain={['dataMin', 'dataMax']} hide />
              <YAxis 
                yAxisId="price" 
                scale={isLogScale ? 'log' : 'linear'} 
                domain={['auto', 'auto']} 
                stroke="#484f58" 
                fontSize={10} 
                orientation="right" 
                tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v.toFixed(0)}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} lang={lang} interval={interval} />} isAnimationActive={false} cursor={{ stroke: '#3b82f6', strokeWidth: 1 }} />
              {chartType === 'AREA' ? (
                <Area yAxisId="price" type="monotone" dataKey="close" stroke="#3b82f6" strokeWidth={2} fill="url(#priceGradient)" isAnimationActive={false} />
              ) : (
                <Bar yAxisId="price" dataKey="candleBody" isAnimationActive={false}>
                  {visibleData.map((entry, index) => <Cell key={index} fill={entry.close >= entry.open ? '#22c55e' : '#ef4444'} />)}
                </Bar>
              )}
              {visibility.wma50 && <Line yAxisId="price" type="monotone" dataKey="wma50" stroke="#f59e0b" strokeWidth={1.5} dot={false} isAnimationActive={false} />}
              {visibility.wma200 && <Line yAxisId="price" type="monotone" dataKey="wma200" stroke="#8b5cf6" strokeWidth={1.5} dot={false} strokeDasharray="5 5" isAnimationActive={false} />}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="h-40 px-4 border-t border-gray-800 bg-[#0d1117]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={fullTimelineData}>
              <XAxis dataKey="date" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(v) => new Date(v).getFullYear().toString()} stroke="#484f58" fontSize={9} axisLine={false} tickLine={false} />
              <Brush dataKey="date" height={40} stroke="#3b82f6" fill="#0d1117" startIndex={brushIndices.start} endIndex={brushIndices.end} onChange={(e) => setBrushIndices({ start: e.startIndex || 0, end: e.endIndex || 0 })}>
                <ComposedChart><Area dataKey="close" fill="#3b82f6" fillOpacity={0.1} stroke="none" /></ComposedChart>
              </Brush>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
