
import React, { useState } from 'react';
import { UserAlert, SUPPORTED_ASSETS, AlertCondition } from '../types';
import { translations, Language } from '../translations';

interface AlertManagerProps {
  alerts: UserAlert[];
  onAddAlert: (alert: Omit<UserAlert, 'id'>) => void;
  onDeleteAlert: (id: string) => void;
  lang: Language;
}

const AlertManager: React.FC<AlertManagerProps> = ({ alerts, onAddAlert, onDeleteAlert, lang }) => {
  const t = translations[lang];
  const [symbol, setSymbol] = useState(SUPPORTED_ASSETS[0].symbol);
  const [condition, setCondition] = useState<AlertCondition>('PRICE_ABOVE');
  const [value, setValue] = useState<string>('');
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    onAddAlert({
      symbol,
      condition,
      value: parseFloat(value),
      type,
      isActive: true,
    });
    setValue('');
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          {t.set_alerts}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-gray-800/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-black text-gray-500 uppercase">{t.asset}</label>
            <select 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            >
              {SUPPORTED_ASSETS.map(a => (
                <option key={a.symbol} value={a.symbol}>{a.name} ({a.symbol.replace('USDT', '')})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-gray-500 uppercase">{t.condition}</label>
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value as AlertCondition)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            >
              <option value="PRICE_ABOVE">{t.condition_above}</option>
              <option value="PRICE_BELOW">{t.condition_below}</option>
              <option value="CROSS_ABOVE_MA">{t.condition_cross_above}</option>
              <option value="CROSS_BELOW_MA">{t.condition_cross_below}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-gray-500 uppercase">{t.value_ma}</label>
            <input 
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={condition.includes('MA') ? "Ex: 50, 200" : "Ex: 65000"}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-gray-500 uppercase">{t.alert_type}</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType('BUY')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${type === 'BUY' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}
              >
                {t.buy}
              </button>
              <button
                type="button"
                onClick={() => setType('SELL')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${type === 'SELL' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}
              >
                {t.sell}
              </button>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
        >
          {t.add_alert}
        </button>
      </form>

      <div className="p-6">
        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">{t.active_alerts}</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {alerts.length === 0 ? (
            <p className="text-sm text-gray-600 italic">{t.no_alerts}</p>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg border border-gray-800 group">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${alert.type === 'BUY' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <div>
                    <p className="text-sm font-bold">{alert.symbol.replace('USDT', '')}</p>
                    <p className="text-[10px] text-gray-500">
                      {alert.condition.replace('_', ' ')}: {alert.value}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onDeleteAlert(alert.id)}
                  className="p-1.5 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertManager;
