import React, { useState } from 'react';
import Card from '../ui/Card';
import type { Review } from '../../data/types';

export interface ReviewCardProps {
  review: Review;
  className?: string;
}

// Temporary placeholder images for the collage
const dummyImages = [
  'https://picsum.photos/seed/rev1/200/200',
  'https://picsum.photos/seed/rev2/200/200',
  'https://picsum.photos/seed/rev3/200/200',
  'https://picsum.photos/seed/rev4/200/200'
];

const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <>
      <Card className={`h-full min-h-[220px] flex flex-col py-5 px-4 !border !border-gray-200 bg-white ${className}`}>
        <div className="flex text-brand-yellow mb-2.5 text-[12px]">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fa-solid fa-star ${i < review.rating ? '' : 'text-gray-200'}`}></i>
          ))}
        </div>
        
        <p className="text-gray-600 italic mb-5 flex-1 text-[13px] leading-relaxed line-clamp-4">
          "{review.text}"
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          {/* Profile & Name */}
          <div className="flex items-center gap-2.5">
            {review.avatar ? (
              <img src={review.avatar} alt={review.name} className="w-[36px] h-[36px] rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-[36px] h-[36px] rounded-full bg-brand-cyan/20 text-brand-dark flex items-center justify-center font-bold text-xs shrink-0">
                {review.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <h4 className="font-semibold text-brand-dark text-[12.5px] leading-tight">{review.name}</h4>
              <span className="text-[10px] text-gray-400 mt-0.5">{review.travelMonth}</span>
            </div>
          </div>

          {/* Right Column: Image Collage 2x2 (width increased by ~10% to 64px) */}
          <div 
            className="w-[64px] h-[58px] shrink-0 grid grid-cols-2 grid-rows-2 gap-[2px] rounded-lg overflow-hidden cursor-pointer active:scale-95 transition-transform"
            onClick={() => setShowLightbox(true)}
          >
            {dummyImages.map((img, idx) => (
              <img key={idx} src={img} alt="review" className="w-full h-full object-cover" />
            ))}
          </div>
        </div>
      </Card>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col backdrop-blur-md">
          <div className="flex justify-between items-center p-4">
            <span className="text-white font-bold">{review.name}'s Photos</span>
            <button 
              onClick={() => setShowLightbox(false)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-4 hide-scrollbar">
            {dummyImages.map((img, idx) => (
              <img key={idx} src={img} alt={`review ${idx}`} className="w-full rounded-2xl object-cover border border-white/10 shadow-lg" />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;

