
import React from 'react';
import { translations, Language } from '../translations';

interface CycleLegendProps {
  lang: Language;
}

const CycleLegend: React.FC<CycleLegendProps> = ({ lang }) => {
  const t = translations[lang];
  
  const definitions = [
    {
      term: '50-WMA',
      color: 'text-orange-400',
      border: 'border-orange-400',
      desc: t.wma50_desc
    },
    {
      term: '100-WMA',
      color: 'text-cyan-400',
      border: 'border-cyan-400',
      desc: t.wma100_desc
    },
    {
      term: '200-SMA',
      color: 'text-purple-400',
      border: 'border-purple-400',
      desc: t.wma200_desc
    }
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
      <div className="p-4 bg-gray-800/50 border-b border-gray-800 flex items-center gap-2">
        <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest">{t.master_guide}</h3>
      </div>
      <div className="p-4 space-y-4">
        {definitions.map((item, idx) => (
          <div key={idx} className="group">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${item.border} ${item.color} uppercase`}>
                {item.term}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CycleLegend;
