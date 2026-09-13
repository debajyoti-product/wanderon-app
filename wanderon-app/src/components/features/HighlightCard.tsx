import React from 'react';
import type { Highlight } from '../../data/types';

export interface HighlightCardProps {
  highlight: Highlight;
  className?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ highlight, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
        <i className={`fa-solid ${highlight.icon} text-brand-cyan text-xl`}></i>
      </div>
      <div>
        <h4 className="font-semibold text-brand-dark mb-1">{highlight.title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{highlight.description}</p>
      </div>
    </div>
  );
};

export default HighlightCard;

