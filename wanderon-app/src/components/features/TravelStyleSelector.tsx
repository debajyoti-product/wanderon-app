import React from 'react';
import type { TravelStyle } from '../../data/types';

export interface TravelStyleSelectorProps {
  styles: TravelStyle[];
  selectedId: string;
  onChange: (id: string) => void;
}

const TravelStyleSelector: React.FC<TravelStyleSelectorProps> = ({
  styles,
  selectedId,
  onChange
}) => {
  const getIconForStyle = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes('bike')) return 'fa-motorcycle';
    if (lower.includes('suv') || lower.includes('tempo')) return 'fa-van-shuttle';
    return 'fa-car';
  };

  const selectedStyle = styles.find(s => s.id === selectedId);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl border transition-all
              ${selectedId === style.id 
                ? 'bg-brand-cyan/10 border-brand-cyan text-brand-dark' 
                : 'bg-white border-gray-200 text-gray-500 hover:border-brand-cyan/50'}
            `}
          >
            <i className={`fa-solid ${getIconForStyle(style.label)} text-xl mb-1 ${selectedId === style.id ? 'text-brand-cyan' : ''}`} />
            <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wide">
              {style.label}
            </span>
          </button>
        ))}
      </div>

      {selectedStyle && selectedStyle.inclusions && selectedStyle.inclusions.length > 0 && (
        <div className="bg-brand-cyan/5 rounded-xl p-3 border border-brand-cyan/20">
          <h5 className="text-xs font-semibold text-brand-dark mb-2">Inclusions:</h5>
          <ul className="space-y-1">
            {selectedStyle.inclusions.map((inc, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                <i className="fa-solid fa-check text-brand-cyan mt-0.5 text-[10px]"></i>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TravelStyleSelector;

