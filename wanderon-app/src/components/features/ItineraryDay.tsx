import React from 'react';
import Accordion from '../ui/Accordion';
import type { ItineraryDay as ItineraryDayType } from '../../data/types';

export interface ItineraryDayProps {
  day: ItineraryDayType;
  isOpen?: boolean;
}

const ItineraryDay: React.FC<ItineraryDayProps> = ({ day, isOpen = false }) => {
  const title = (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
        <span className="font-display font-bold text-brand-cyan">D{day.day}</span>
      </div>
      <span className="text-lg">{day.title}</span>
    </div>
  );

  return (
    <Accordion title={title} defaultOpen={isOpen} className="bg-white rounded-2xl mb-4 border border-gray-100 shadow-sm px-4">
      <div className="pl-14 pr-4">
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {day.description}
        </p>

        {day.accommodation && (
          <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3 mb-6 border border-gray-100">
            <i className="fa-solid fa-bed text-brand-cyan mt-1"></i>
            <div>
              <span className="block font-semibold text-brand-dark text-sm mb-1">Accommodation</span>
              <span className="text-sm text-gray-600">{day.accommodation}</span>
            </div>
          </div>
        )}

        {day.image && (
          <div className="relative rounded-xl overflow-hidden aspect-video">
            <img src={day.image} alt={`Day ${day.day}`} className="w-full h-full object-cover" />
            {day.locationTag && (
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-dark shadow-sm flex items-center gap-1.5">
                <i className="fa-solid fa-location-dot text-brand-cyan"></i>
                {day.locationTag}
              </div>
            )}
          </div>
        )}
      </div>
    </Accordion>
  );
};

export default ItineraryDay;

