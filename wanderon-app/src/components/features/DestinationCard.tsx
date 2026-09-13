import React from 'react';
import type { Destination } from '../../data/types';

export interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative h-[200px] @md:h-[300px] rounded-t-full rounded-b-3xl overflow-hidden shadow-soft hover:shadow-float transition-all duration-500 border-[6px] border-white/90"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-display font-bold text-3xl text-white mb-1 drop-shadow-md">
          {destination.name}
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex flex-col items-center">
          <span className="text-brand-yellow font-medium text-sm mb-1">{destination.packageCount} Packages</span>
          <span className="text-white/80 text-xs">{destination.startingPrice} Onwards</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;

