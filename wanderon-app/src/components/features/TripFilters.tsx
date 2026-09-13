import React from 'react';
import RangeSlider from '../ui/RangeSlider';
import Chip from '../ui/Chip';
import { motion, AnimatePresence } from 'framer-motion';

export interface FiltersState {
  budget: [number, number];
  duration: string[];
  months: string[];
}

export interface TripFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
  onReset: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const TripFilters: React.FC<TripFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  isMobile = false,
  isOpen = false,
  onClose
}) => {
  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const Content = (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-brand-dark">Budget</h3>
        </div>
        <RangeSlider
          min={5000}
          max={150000}
          step={1000}
          minValue={filters.budget[0]}
          maxValue={filters.budget[1]}
          onChange={(min, max) => onFilterChange({ ...filters, budget: [min, max] })}
          formatValue={(val) => `₹${(val/1000).toFixed(0)}k`}
        />
      </div>

      <div>
        <h3 className="font-semibold text-brand-dark mb-4">Duration</h3>
        <div className="flex flex-wrap gap-2">
          {['1-3 Days', '4-6 Days', '7-9 Days', '10+ Days'].map(dur => (
            <Chip
              key={dur}
              active={filters.duration.includes(dur)}
              onClick={() => onFilterChange({
                ...filters,
                duration: toggleArrayItem(filters.duration, dur)
              })}
            >
              {dur}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-brand-dark mb-4">Months</h3>
        <div className="flex flex-wrap gap-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
            <Chip
              key={month}
              active={filters.months.includes(month)}
              onClick={() => onFilterChange({
                ...filters,
                months: toggleArrayItem(filters.months, month)
              })}
            >
              {month}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-white rounded-t-3xl z-50 p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display font-bold text-xl">Filters</h2>
                <div className="flex gap-4">
                  <button onClick={onReset} className="text-sm font-medium text-brand-cyan">Reset</button>
                  <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
              {Content}
              <button
                onClick={onClose}
                className="w-full mt-8 bg-brand-dark text-white rounded-xl py-3 font-semibold hover:bg-brand-cyan transition-colors"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 w-[260px] flex-shrink-0 sticky top-28">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display font-bold text-lg">Filters</h2>
        <button onClick={onReset} className="text-sm font-medium text-brand-cyan hover:underline">Reset</button>
      </div>
      {Content}
    </div>
  );
};

export default TripFilters;


