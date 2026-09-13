import React, { useState } from 'react';
import Button from '../ui/Button';
import type { Trip, TravelStyle } from '../../data/types';

export interface BookingPanelProps {
  trip: Trip;
  selectedStyle?: TravelStyle;
  onStyleChange?: (styleId: string) => void;
  className?: string;
}

const BookingPanel: React.FC<BookingPanelProps> = ({
  trip,
  selectedStyle,
  className = ''
}) => {
  const [date, setDate] = useState(trip.batchDates?.[0]?.id || '');
  const [formData, setFormData] = useState({ name: 'Shreya Sharma', phone: '9876543210' });

  return (
    <div className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <div className="space-y-5 mb-6">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">Select Batch</label>
          <div className="relative">
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all appearance-none font-medium text-sm text-gray-700 shadow-sm cursor-pointer"
            >
              {trip.batchDates.map(batch => (
                <option key={batch.id} value={batch.id}>
                  {batch.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>

        {trip.travelStyles && selectedStyle && (
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Travel Style</label>
            <div className="flex items-center gap-3 p-3 bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                <i className={`${selectedStyle.icon} text-brand-cyan text-lg`}></i>
              </div>
              <div className="flex-1">
                <div className="font-bold text-brand-dark text-sm">{selectedStyle.label}</div>
                <div className="text-[11px] text-gray-500 font-medium line-clamp-1">{selectedStyle.description}</div>
              </div>
              <i className="fa-solid fa-circle-check text-brand-cyan text-lg mr-1"></i>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2">
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all font-medium text-sm"
          />
          <div className="flex gap-2">
            <div className="w-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-medium text-sm">
              +91
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all font-medium text-sm"
            />
          </div>
          <Button
            variant="primary"
            fullWidth
            className="mt-4 font-semibold text-white shadow-md shadow-blue-950/20 border border-white/10 active:scale-95"
            style={{
              background: 'linear-gradient(115deg, #091a36 0%, #103778 45%, #e69d00 85%, #ffc107 100%)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
            }}
          >
            Get a Call Back
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingPanel;

