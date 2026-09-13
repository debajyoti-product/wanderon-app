import React from 'react';
import Modal from '../ui/Modal';

export interface WhenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
}

const WhenModal: React.FC<WhenModalProps> = ({ isOpen, onClose, onSelect }) => {
  // Simplified static calendar representation for prototype
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const generateDays = (count: number, startOffset: number, type: 'regular' | 'holiday' | 'weekend') => {
    const days = [];
    for(let i = 0; i < startOffset; i++) days.push(null);
    for(let i = 1; i <= count; i++) {
      let isHoliday = false;
      let isWeekend = false;
      
      // Mock some holidays and long weekends
      if (type === 'regular') {
        if (i === 15) isHoliday = true; // example holiday
        if (i >= 25 && i <= 27) isWeekend = true; // example long weekend
      } else {
        if (i === 5) isHoliday = true;
        if (i >= 10 && i <= 12) isWeekend = true;
      }
      
      days.push({ day: i, isHoliday, isWeekend });
    }
    return days;
  };

  const currentMonthDays = generateDays(30, 3, 'regular');
  const nextMonthDays = generateDays(31, 5, 'holiday');

  const renderMonth = (title: string, days: any[]) => (
    <div className="flex-1">
      <h3 className="font-display font-semibold text-lg text-brand-dark mb-4 text-center">{title}</h3>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          d ? (
            <div
              key={i}
              onClick={() => onSelect(`${title.split(' ')[0]} ${d.day}`)}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-all
                ${d.isHoliday ? 'bg-green-100 text-green-700 font-bold hover:bg-green-200' : ''}
                ${d.isWeekend ? 'bg-brand-yellow/20 text-brand-dark font-bold hover:bg-brand-yellow/40' : ''}
                ${!d.isHoliday && !d.isWeekend ? 'hover:bg-gray-100 text-gray-700' : ''}
              `}
            >
              {d.day}
            </div>
          ) : (
            <div key={i} className="aspect-square"></div>
          )
        ))}
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="p-6">
        <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">When are you traveling?</h2>
        
        <div className="flex flex-col @md:flex-row gap-8 mb-8">
          {renderMonth('September 2024', currentMonthDays)}
          {renderMonth('October 2024', nextMonthDays)}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 py-4 border-t border-b border-gray-100 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-gray-600">Public Holiday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-yellow"></div>
            <span className="text-xs font-medium text-gray-600">Long Weekend</span>
          </div>
        </div>

        <button
          onClick={() => onSelect('Anytime')}
          className="w-full py-4 rounded-xl border-2 border-brand-cyan text-brand-cyan font-bold hover:bg-brand-cyan hover:text-white transition-colors"
        >
          I'm flexible
        </button>
      </div>
    </Modal>
  );
};

export default WhenModal;

