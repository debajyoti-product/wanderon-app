import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Chip from '../ui/Chip';
import type { Trip } from '../../data/types';

export interface TripCardProps {
  trip: Trip;
  className?: string;
  layout?: 'vertical' | 'compact' | 'horizontal';
}

const TripCard: React.FC<TripCardProps> = ({ trip, className = '', layout = 'vertical' }) => {
  const isCompact = layout === 'compact';
  const isHorizontal = layout === 'horizontal';
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop';
  };

  const wrapperClass = isHorizontal 
    ? 'flex flex-row overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm h-[140px]' 
    : 'h-full flex-1 flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm';

  const imageContainerClass = isHorizontal
    ? 'relative w-[130px] h-full shrink-0'
    : `relative w-full overflow-hidden shrink-0 ${isCompact ? 'aspect-[7/5]' : 'aspect-[1/1]'}`;

  return (
    <Link to={`/trip/${trip.slug}`} className={`group active:scale-[0.98] transition-transform duration-200 ${!isHorizontal ? 'h-full flex flex-col' : 'block'} ${className}`}>
      <Card padding="none" hover className={wrapperClass}>
        <div className={imageContainerClass}>
          <img
            src={trip.images[0]}
            alt={trip.title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {trip.tag && (
            <div className={`absolute z-10 ${isHorizontal ? 'top-2 left-2 scale-[0.85] origin-top-left' : 'top-3.5 left-3'}`}>
              <Chip variant="fomo" colorClass={trip.tagClass || 'bg-red-500'}>
                {trip.tag}
              </Chip>
            </div>
          )}
          
          {/* Favorite Icon */}
          <div className={`absolute z-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 shadow-sm ${isHorizontal ? 'top-2 right-2 w-6 h-6' : 'top-3.5 right-3 w-7 h-7'}`}>
            <i className={`fa-regular fa-heart ${isHorizontal ? 'text-[11px]' : 'text-sm'}`}></i>
          </div>

          {trip.soldOut && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-20">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-1">
                <i className="fa-solid fa-lock text-white text-base"></i>
              </div>
              <span className="text-white font-bold tracking-wider uppercase text-[10px]">Sold Out</span>
            </div>
          )}
        </div>

        <div className={`flex-1 flex flex-col justify-between ${isHorizontal ? 'p-3' : 'p-3'}`}>
          <div className={`${isHorizontal ? 'mb-1' : 'mb-2'}`}>
            <span className={`block font-semibold text-gray-400 uppercase tracking-wider mb-0.5 truncate ${isHorizontal ? 'text-[10px]' : 'text-[11px]'}`}>
              {trip.location}
            </span>
            <h3 className={`font-display font-semibold text-brand-dark leading-snug group-hover:text-brand-cyan transition-colors ${isHorizontal ? 'text-[13px] line-clamp-2' : 'line-clamp-2'} ${isCompact ? 'text-sm h-10' : !isHorizontal ? 'text-base h-12 mb-2' : ''}`}>
              {trip.title}
            </h3>
          </div>

          {!isCompact && !isHorizontal && (
            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-3">
              <span className="flex items-center gap-1.5">
                <i className="fa-regular fa-clock text-brand-cyan"></i>
                {trip.duration}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>{trip.date}</span>
            </div>
          )}

          {isHorizontal && (
            <div className="text-[11px] text-gray-500 font-medium mb-1">
              {trip.duration}
            </div>
          )}

          <div className={`mt-auto flex items-end justify-between ${(!isCompact && !isHorizontal) ? 'border-t border-gray-100 pt-3' : ''}`}>
            <div className={`flex items-center gap-1 ${isHorizontal ? 'text-[10px]' : 'text-xs'}`}>
              <i className="fa-solid fa-star text-brand-yellow text-[10px]"></i>
              <span className="font-bold text-gray-800">4.9</span>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1.5 justify-end">
                {trip.originalPrice && (
                  <span className={`text-gray-400 line-through ${isHorizontal ? 'text-[9px]' : 'text-[10px]'}`}>
                    ₹{trip.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className={`font-bold ${isHorizontal ? 'text-gray-900 text-[15px]' : `text-brand-cyan ${isCompact ? 'text-base' : 'text-lg'}`}`}>
                  ₹{trip.price.toLocaleString()}
                </span>
              </div>
              {(!isCompact && !isHorizontal) && <div className="text-[10px] text-gray-500 mt-0.5">Onwards</div>}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TripCard;

