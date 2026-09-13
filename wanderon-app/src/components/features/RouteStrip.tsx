import React from 'react';
import type { RouteStop } from '../../data/types';

export interface RouteStripProps {
  route: RouteStop[];
  pickup: string;
  dropoff: string;
  className?: string;
}

const RouteStrip: React.FC<RouteStripProps> = ({ route, pickup, dropoff, className = '' }) => {
  return (
    <div className={`bg-gray-50 border border-gray-100 rounded-3xl p-6 @md:p-8 ${className}`}>
      
      <div className="flex flex-col @md:flex-row gap-6 @md:gap-12 mb-8 border-b border-gray-200 pb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-plane-arrival text-brand-cyan text-xl"></i>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 block">Pick Up</span>
            <span className="font-display font-semibold text-brand-dark text-lg">{pickup}</span>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-plane-departure text-brand-cyan text-xl"></i>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1 block">Drop Off</span>
            <span className="font-display font-semibold text-brand-dark text-lg">{dropoff}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="hidden @md:block absolute top-[28px] left-8 right-8 h-0.5 bg-gray-200 dashed-line"></div>
        <div className="flex flex-col @md:flex-row gap-8 justify-between relative z-10">
          {route.map((stop, index) => (
            <div key={index} className="flex @md:flex-col items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-full bg-white shadow-md border-4 border-gray-50 flex items-center justify-center z-10">
                <i className={`fa-solid ${index === 0 || index === route.length - 1 ? 'fa-map-pin' : 'fa-location-dot'} text-brand-cyan text-xl`}></i>
              </div>
              <div className="@md:text-center">
                <span className="font-semibold text-brand-dark block mb-1">{stop.name}</span>
                <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm">
                  {stop.nights} {stop.nights === 1 ? 'Night' : 'Nights'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dashed-line {
          background-image: linear-gradient(to right, #e5e7eb 50%, transparent 50%);
          background-size: 16px 2px;
          background-repeat: repeat-x;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default RouteStrip;

