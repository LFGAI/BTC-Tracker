
import React, { useMemo } from 'react';
import { UserAlert, CandleData, AlertPerformanceMetrics } from '../types';
import { translations, Language } from '../translations';

interface AlertPerformanceProps {
  alerts: UserAlert[];
  data: CandleData[];
  lang: Language;
}

const AlertPerformance: React.FC<AlertPerformanceProps> = ({ alerts, data, lang }) => {
  const t = translations[lang];
  const performanceStats = useMemo(() => {
    if (data.length < 10) return [];

    return alerts.map(alert => {
      let triggers = 0;
      let totalReturn = 0;
      let wins = 0;
      const lookahead = 4; // Check 4 weeks later

      for (let i = 1; i < data.length - lookahead; i++) {
        let isTriggered = false;
        const current = data[i];
        const prev = data[i - 1];
        const price = current.close;

        // Condition Check Logic
        if (alert.condition === 'PRICE_ABOVE' && price > alert.value && prev.close <= alert.value) {
          isTriggered = true;
        } else if (alert.condition === 'PRICE_BELOW' && price < alert.value && prev.close >= alert.value) {
          isTriggered = true;
        } else if (alert.condition === 'CROSS_ABOVE_MA') {
          const maKey = `wma${alert.value}`;
          if (current[maKey] && price > current[maKey] && prev[maKey] && prev.close <= prev[maKey]) {
            isTriggered = true;
          }
        } else if (alert.condition === 'CROSS_BELOW_MA') {
          const maKey = `wma${alert.value}`;
          if (current[maKey] && price < current[maKey] && prev[maKey] && prev.close >= prev[maKey]) {
            isTriggered = true;
          }
        }

        if (isTriggered) {
          triggers++;
          const priceLater = data[i + lookahead].close;
          const pctChange = ((priceLater - price) / price) * 100;
          totalReturn += pctChange;
          
          if (alert.type === 'BUY' && pctChange > 0) wins++;
          if (alert.type === 'SELL' && pctChange < 0) wins++;
        }
      }

      return {
        alertId: alert.id,
        triggerCount: triggers,
        avgReturn4W: triggers > 0 ? totalReturn / triggers : 0,
        winRate: triggers > 0 ? (wins / triggers) * 100 : 0
      } as AlertPerformanceMetrics;
    });
  }, [alerts, data]);

  if (alerts.length === 0) return null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl mt-6">
      <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-blue-900/10">
        <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          {t.backtest_title}
        </h3>
        <p className="text-[10px] text-gray-500 mt-1 uppercase font-mono">{t.backtest_subtitle}</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceStats.map(stat => {
          const alert = alerts.find(a => a.id === stat.alertId);
          if (!alert) return null;
          
          return (
            <div key={stat.alertId} className="bg-gray-800/40 border border-gray-800 p-4 rounded-xl hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${alert.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {alert.type === 'BUY' ? t.buy : t.sell} SIGNAL
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {stat.triggerCount} Triggers
                </span>
              </div>
              
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-300 truncate">
                  {alert.symbol.replace('USDT', '')} @ {alert.condition.replace('_', ' ')} {alert.value}
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-950/50 p-2 rounded border border-gray-800">
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-1">{t.win_rate}</p>
                    <p className={`text-sm font-black ${stat.winRate > 50 ? 'text-green-400' : 'text-orange-400'}`}>
                      {stat.winRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-gray-950/50 p-2 rounded border border-gray-800">
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-1">{t.avg_return}</p>
                    <p className={`text-sm font-black ${stat.avgReturn4W > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.avgReturn4W > 0 ? '+' : ''}{stat.avgReturn4W.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertPerformance;
