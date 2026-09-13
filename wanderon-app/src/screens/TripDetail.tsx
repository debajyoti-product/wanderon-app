import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Components - UI
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import AnimatedSection from "../components/ui/AnimatedSection";

// Components - Features
import TripCard from "../components/features/TripCard";
import BookingPanel from "../components/features/BookingPanel";
import QuickFacts from "../components/features/QuickFacts";
import ReviewCard from "../components/features/ReviewCard";


// Data
import { trips } from "../data/trips";

export default function TripDetail() {
  const { slug } = useParams<{ slug: string }>();
  const trip = trips.find((t) => t.slug === slug);

  const [selectedStyle, setSelectedStyle] = useState(trip?.travelStyles?.[0]);
  const [faqOpen, setFaqOpen] = useState(false);
  const [cancellationOpen, setCancellationOpen] = useState(false);
  const [isCaptainSheetOpen, setIsCaptainSheetOpen] = useState(false);
  const [advisoryExpanded, setAdvisoryExpanded] = useState(false);
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<any | null>(null);
  const [selectedHighlight, setSelectedHighlight] = useState<any | null>(null);
  const [styleDetailsOpen, setStyleDetailsOpen] = useState<any | null>(null);
  const [packListOpen, setPackListOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (trip?.travelStyles?.length) {
      setSelectedStyle(trip.travelStyles[0]);
    }
  }, [slug, trip]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Trip not found</h1>
        <Link to="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    );
  }

  const similarTrips = trips.filter((t) => trip.similarTripIds?.includes(t.id));

  // Carousel images
  const displayImages = trip.images && trip.images.length >= 2 
    ? [...trip.images, ...trip.images].slice(0, 4) 
    : [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop"
      ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const currentIndex = Math.round(scrollPosition / width);
      setActiveImageIndex(currentIndex);
    }
  };

  const galleryImages = trip.itinerary?.map(day => day.image).filter(Boolean) as string[] || [];
  if (galleryImages.length < 6) {
    galleryImages.push(...displayImages);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-[env(safe-area-inset-bottom)] pb-24">
      {/* Floating Header Actions */}
      <div className="absolute top-4 inset-x-4 z-50 flex justify-between items-center pointer-events-none">
        <Link to="/" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-sm pointer-events-auto active:scale-95 transition-transform">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="flex gap-2 pointer-events-auto">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-sm active:scale-95 transition-transform">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-sm active:scale-95 transition-transform">
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="relative w-full h-[350px]">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {displayImages.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 snap-start snap-always relative">
              <img src={img} alt={`Trip image ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          ))}
        </div>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
          {displayImages.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${activeImageIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Header Info */}
      <div className="px-4 py-5 bg-white relative z-20">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
          {trip.location || "Destination"}
        </span>
        <h1 className="font-display font-extrabold text-[22px] text-brand-dark leading-snug mb-2">
          {trip.title}
          {trip.batchDates && trip.batchDates.length > 0 && (
            <span className="align-middle inline-flex items-center gap-1 bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ml-2 -mt-1">
              <i className="fa-solid fa-fire text-[9px]"></i>
              {trip.batchDates[0].slotsFilled}/{trip.batchDates[0].slotsTotal} seats filled
            </span>
          )}
        </h1>
        <p className="text-xs text-gray-600 mb-5">{trip.tagline}</p>
        
        <QuickFacts duration={trip.duration} stats={trip.stats} ageLimit={trip.ageLimit} className="mt-4" />

        {/* Trip Captain */}
        <div 
          onClick={() => setIsCaptainSheetOpen(true)}
          className="mt-5 border border-gray-100 bg-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3.5">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop" alt="Raj Singh" className="w-11 h-11 rounded-full object-cover shadow-sm" />
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Trip Captain</span>
              <h4 className="font-display font-bold text-brand-dark text-base leading-none">Raj Singh</h4>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-400 text-sm mr-1"></i>
        </div>
      </div>

      {/* Medical Advisory */}
      {trip.medicalAdvisory && (
        <section className="px-4 py-5">
          <h3 className="font-display font-extrabold text-[12px] text-brand-dark mb-2">
            PLEASE NOTE
          </h3>
          <div className="mb-2.5">
            <p className={`text-xs text-gray-600 leading-relaxed ${!advisoryExpanded ? 'line-clamp-2' : ''}`}>
              {trip.medicalAdvisory}
            </p>
            <button 
              onClick={() => setAdvisoryExpanded(!advisoryExpanded)}
              className="text-xs font-bold text-brand-cyan mt-1 hover:underline"
            >
              {advisoryExpanded ? 'less' : 'more'}
            </button>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-xl px-3.5 py-2.5 -mt-0.5 flex justify-between items-center cursor-pointer active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-2.5">
              <i className="fa-solid fa-shield-heart text-rose-500 text-sm flex-shrink-0"></i>
              <span className="text-[12px] font-bold text-brand-dark">Medical Insurance Available</span>
            </div>
            <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wide">View Details</span>
          </div>
        </section>
      )}

      {/* Itinerary & Highlights */}
      <AnimatedSection className="py-6 bg-gray-50 border-b border-gray-100">
        <div className="px-4 mb-4 flex items-center gap-4 w-full">
          <h2 className="font-display font-bold text-[16px] text-gray-900 uppercase tracking-wide shrink-0">
            ITINERARY
          </h2>
          <div className="h-[2.5px] flex-1 rounded-full bg-gradient-to-r from-brand-cyan/80 to-[#ffc107]/80"></div>
        </div>
        
        <div className="flex justify-start overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 gap-4 pb-6 scroll-pl-4">
          {trip.itinerary?.map((day, idx) => {
            const dayImg = day.image || galleryImages[idx % galleryImages.length];
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedDay(day)}
                className="w-[220px] h-[252px] flex-shrink-0 snap-start relative rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
              >
                <img src={dayImg} alt={day.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-brand-cyan font-bold text-[10px] uppercase tracking-wider mb-1">Day {day.day}</span>
                  <h3 className="font-display font-bold text-white text-base leading-tight">{day.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 mb-7">
          <div className="flex items-center gap-2 text-gray-500">
            <i className="fa-solid fa-circle-info text-xs text-gray-400 flex-shrink-0"></i>
            <p className="text-[11.5px] text-gray-500 leading-snug">Itinerary is subject to change based on weather/road conditions.</p>
          </div>
        </div>

        {/* Highlights as secondary section */}
        <div className="px-4 mb-3">
          <h3 className="font-display font-extrabold text-[13.5px] text-gray-500">HIGHLIGHTS</h3>
        </div>
        
        <div className="px-4 space-y-3 pb-2">
          {trip.highlights?.map((highlight, idx) => {
            const colors = ['text-orange-500 bg-orange-100', 'text-emerald-500 bg-emerald-100', 'text-blue-500 bg-blue-100', 'text-violet-500 bg-violet-100', 'text-rose-500 bg-rose-100'];
            const colorClass = colors[idx % colors.length];
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedHighlight(highlight)}
                className="flex items-center gap-4 py-2 cursor-pointer active:opacity-70 transition-opacity"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <i className={`fa-solid ${highlight.icon} text-xl`}></i>
                </div>
                <div className="flex-1 pr-2">
                  <h3 className="font-bold text-brand-dark text-sm mb-0.5">{highlight.title}</h3>
                  <p className="text-gray-500 text-[11px] leading-snug line-clamp-2">{highlight.description}</p>
                </div>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-gray-400">
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </div>
              </div>
            );
          })}
        </div>

        {/* Things to pack */}
        {trip.packList && trip.packList.length > 0 && (
          <div className="px-4 mt-6 mb-2">
            <div 
              onClick={() => setPackListOpen(true)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="text-3xl leading-none origin-bottom"
                  animate={{ rotate: [0, -12, 12, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2.5 }}
                >
                  🧳
                </motion.div>
                <h3 className="font-display font-semibold text-base text-brand-dark">Things to pack for this trip</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400">
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </div>
            </div>
          </div>
        )}
      </AnimatedSection>

      {/* Choose Your Style & Assurances */}
      <AnimatedSection className="py-6 bg-white border-y border-gray-100">
        <div className="px-4 mb-4 flex items-center gap-4 w-full">
          <h2 className="font-display font-bold text-[16px] text-gray-900 uppercase tracking-wide shrink-0">
            CHOOSE YOUR STYLE
          </h2>
          <div className="h-[2.5px] flex-1 rounded-full bg-gradient-to-r from-brand-cyan/80 to-[#ffc107]/80"></div>
        </div>
        
        <div className="px-4 space-y-3 pb-6 border-b border-gray-50">
          {trip.travelStyles?.map((style) => {
            const isSelected = selectedStyle?.id === style.id;
            return (
              <div 
                key={style.id}
                onClick={() => setSelectedStyle(style)}
                className={`rounded-2xl transition-all cursor-pointer ${
                  isSelected 
                    ? 'p-[2px] shadow-lg shadow-brand-dark/10'
                    : 'p-[2px]'
                }`}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(115deg, #091a36 0%, #103778 45%, #e69d00 85%, #ffc107 100%)'
                    : 'transparent'
                }}
              >
                <div className={`flex flex-col justify-between p-3.5 rounded-[14px] bg-white h-full ${
                  !isSelected && 'border-2 border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      {/* Header with icon beside label */}
                      <div className="flex items-center gap-2">
                        <i className={`fa-solid ${style.icon || 'fa-car'} ${
                          isSelected ? 'text-[#091a36]' : 'text-gray-500'
                        } text-[15px]`}></i>
                        <h3 className="font-bold text-[15px] text-brand-dark leading-tight">{style.label}</h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-500 text-xs leading-snug mt-1.5 whitespace-pre-line">{style.description}</p>
                    </div>

                    {/* Right Arrow (View Details trigger) - Only show when selected */}
                    {isSelected && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setStyleDetailsOpen(style); }}
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all shadow-md shadow-[#091a36]/20 bg-[#091a36] text-white active:scale-95"
                      >
                        <i className="fa-solid fa-chevron-right text-[13px]"></i>
                      </button>
                    )}
                  </div>
                  
                  {/* Bottom Row: Shows only when selected AND rented bike */}
                  {isSelected && style.id === 'rented' && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100">
                      <span className="text-[10.5px] font-medium text-gray-500 italic leading-tight">
                        Additional charges applicable for rental deposit &amp; fuel
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Assurances (No Header, No Circle, Reduced Vertical Spacing) */}
        <div className="px-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <i className="fa-solid fa-credit-card text-brand-cyan text-[13px] w-4 text-center flex-shrink-0"></i>
              <span className="text-[11px] font-medium text-brand-dark">Pay only 25% upfront, rest of it later.</span>
            </div>
            <div className="h-px w-full bg-gray-50"></div>
            <div className="flex items-center gap-2.5">
              <i className="fa-solid fa-pen-to-square text-brand-cyan text-[13px] w-4 text-center flex-shrink-0"></i>
              <span className="text-[11px] font-medium text-brand-dark">Easily modify/update your booking.</span>
            </div>
            <div className="h-px w-full bg-gray-50"></div>
            <div className="flex items-center gap-2.5">
              <i className="fa-solid fa-rotate-left text-brand-cyan text-[13px] w-4 text-center flex-shrink-0"></i>
              <span className="text-[11px] font-medium text-brand-dark">Cancel & get refund up to 16 days before.</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Community Gallery + Reviews */}
      {trip.reviews && trip.reviews.length > 0 && (
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="px-4 mb-6 flex items-center gap-4 w-full">
            <h2 className="font-display font-bold text-[16px] text-gray-900 uppercase tracking-wide shrink-0">
              COMMUNITY
            </h2>
            <div className="h-[2.5px] flex-1 rounded-full bg-gradient-to-r from-brand-cyan/80 to-[#ffc107]/80"></div>
          </div>

          {/* UGC Reels like row (Horizontal scroll) */}
          <div className="px-4 mb-6 flex gap-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 scroll-pl-4">
            {[
              { id: 1, type: 'video', src: 'https://picsum.photos/seed/reel1/300/400', author: '@traveler_aj', date: 'Oct 2025' },
              { id: 2, type: 'video', src: 'https://picsum.photos/seed/reel2/300/400', author: '@rohan_rides', date: 'Sep 2025' },
              { id: 3, type: 'video', src: 'https://picsum.photos/seed/reel3/300/400', author: '@wanderlust_priya', date: 'Aug 2025' },
              { id: 4, type: 'video', src: 'https://picsum.photos/seed/reel4/300/400', author: '@mountain_goat', date: 'Jul 2025' }
            ].map((item) => (
              <div key={item.id} className="relative shrink-0 snap-start w-[140px] h-[220px] rounded-xl overflow-hidden shadow-sm">
                <img src={item.src} alt="reels" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20"></div>
                {/* Play icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/30">
                  <i className="fa-solid fa-play text-sm ml-1"></i>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm w-fit truncate max-w-full">
                    {item.author}
                  </span>
                  <span className="text-[9px] font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm w-fit truncate max-w-full">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Reviews */}
          <div className="flex justify-start overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 gap-4 pb-2 scroll-pl-4">
            {trip.reviews.map((review, idx) => (
              <div key={idx} className="snap-start shrink-0 w-[280px]">
                <ReviewCard review={review} className="!shadow-sm !border !border-gray-200" />
              </div>
            ))}
          </div>

          {/* Secondary CTA for Reviews */}
          <div className="px-4 mt-3">
            <button className="w-full flex justify-center py-[11px] bg-white border border-gray-200 text-gray-900 text-[11.5px] font-bold uppercase tracking-wider rounded-full shadow-md active:scale-95 transition-transform">
              SEE ALL 50 REVIEWS
            </button>
          </div>
        </section>
      )}

      {/* FAQ & Cancellation Cards */}
      <section className="py-6 bg-gray-50 border-b border-gray-100 px-4 space-y-3">
        <div 
          onClick={() => setFaqOpen(true)}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
              <i className="fa-solid fa-circle-question text-lg"></i>
            </div>
            <h3 className="font-display font-bold text-[15px] text-brand-dark">FAQs</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400">
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </div>
        </div>

        <div 
          onClick={() => setCancellationOpen(true)}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 text-rose-500">
              <i className="fa-solid fa-file-contract text-lg"></i>
            </div>
            <h3 className="font-display font-bold text-[15px] text-brand-dark">Cancellation Policy</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400">
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </div>
        </div>
      </section>

      {/* Similar Trips Section */}
      {similarTrips && similarTrips.length > 0 && (
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="px-4 mb-4 flex items-center gap-4 w-full">
            <h2 className="font-display font-bold text-[16px] text-gray-900 uppercase tracking-wide shrink-0">
              SIMILAR TRIPS
            </h2>
            <div className="h-[2.5px] flex-1 rounded-full bg-gradient-to-r from-brand-cyan/80 to-[#ffc107]/80"></div>
          </div>
          <div className="flex justify-start overflow-x-auto hide-scrollbar px-4 gap-3 snap-x pb-4 scroll-pl-4">
            {similarTrips.map((similarTrip) => (
              <div key={similarTrip.id} className="w-[200px] shrink-0 snap-start">
                <TripCard trip={similarTrip} layout="compact" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Blank space to push content above bottom bar, no big footer */}
      <div className="h-12 bg-white"></div>

      {/* Sticky Bottom Bar */}
      {selectedStyle && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-40 pb-[calc(0.5rem+env(safe-area-inset-bottom))] bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-5 pt-4 flex justify-between items-center">
          <div className="flex flex-col">
            {(selectedStyle.originalPrice || trip.originalPrice) ? (
              <span className="text-[11px] font-semibold text-gray-400 line-through mb-0.5">
                ₹{(selectedStyle.originalPrice || trip.originalPrice)?.toLocaleString("en-IN")}
              </span>
            ) : (
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Price</span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] leading-none font-extrabold text-brand-dark">
                ₹{(selectedStyle.price || trip.price).toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] font-semibold text-gray-500">/ person</span>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsBookingSheetOpen(true)}
            className="!px-5 !py-2.5 !text-[13px] font-semibold text-white shadow-md shadow-blue-950/20 border border-white/10 active:scale-95"
            style={{
              background: 'linear-gradient(115deg, #091a36 0%, #103778 45%, #e69d00 85%, #ffc107 100%)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
            }}
          >
            Get a call back
          </Button>
        </div>
      )}

      {/* Booking Bottom Sheet Modal */}
      <AnimatePresence>
        {isBookingSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setIsBookingSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-[2rem] max-h-[90vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-5 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-display font-bold text-lg">Call Back Details</h3>
                <button
                  onClick={() => setIsBookingSheetOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-5">
                <BookingPanel
                  trip={trip}
                  selectedStyle={selectedStyle!}
                  onStyleChange={(id) => {
                    const style = trip.travelStyles!.find((s) => s.id === id);
                    if (style) setSelectedStyle(style);
                  }}
                  className="!p-0 !border-none !shadow-none"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Day Details Bottom Sheet Modal */}
      <AnimatePresence>
        {selectedDay && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setSelectedDay(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-[2rem] max-h-[85vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-5 py-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <span className="text-brand-cyan font-bold text-[10px] uppercase tracking-wider block mb-0.5">Day {selectedDay.day}</span>
                  <h3 className="font-display font-bold text-lg leading-tight text-brand-dark">{selectedDay.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95 flex-shrink-0 ml-4"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-5">
                {selectedDay.image && (
                  <img src={selectedDay.image} alt={selectedDay.title} className="w-full h-48 object-cover rounded-xl mb-5 shadow-sm" />
                )}
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {selectedDay.description}
                </p>
                {selectedDay.accommodation && (
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-hotel text-brand-cyan text-sm"></i>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block mb-0.5">Accommodation</span>
                      <span className="font-semibold text-sm text-gray-800">
                        {selectedDay.accommodation}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Style Details Bottom Sheet Modal */}
      <AnimatePresence>
        {styleDetailsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setStyleDetailsOpen(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-[2rem] max-h-[85vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-5 py-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <span className="text-brand-cyan font-bold text-[10px] uppercase tracking-wider block mb-0.5">{styleDetailsOpen.label}</span>
                  <h3 className="font-display font-bold text-lg leading-tight text-brand-dark">Inclusions & Exclusions</h3>
                </div>
                <button
                  onClick={() => setStyleDetailsOpen(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95 flex-shrink-0 ml-4"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-5 space-y-6">
                <div>
                  <h4 className="font-bold text-sm text-brand-dark mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-circle-check text-green-500"></i> Included
                  </h4>
                  <ul className="space-y-3">
                    {[...(trip.generalInclusions || []), ...(styleDetailsOpen.inclusions || [])].map((inc, idx) => {
                      const isHighlighted = inc.toLowerCase().includes('deposit');
                      return (
                        <li key={idx} className={`flex items-start gap-2 text-sm ${isHighlighted ? 'bg-orange-50/80 text-brand-dark font-medium p-2.5 rounded-lg border border-orange-100' : 'text-gray-600'}`}>
                          <i className={`fa-solid ${isHighlighted ? 'fa-triangle-exclamation text-orange-500' : 'fa-check text-brand-cyan'} mt-1 text-[10px]`}></i>
                          <span className="leading-snug">{inc}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="h-px bg-gray-100 w-full"></div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-circle-xmark text-red-400"></i> Not Included
                  </h4>
                  <ul className="space-y-3">
                    {trip.exclusions?.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <i className="fa-solid fa-xmark text-red-400 mt-1 text-[10px]"></i>
                        <span className="leading-snug">{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Highlight Details Bottom Sheet Modal */}
      <AnimatePresence>
        {selectedHighlight && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setSelectedHighlight(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-[2rem] max-h-[85vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-5 py-5 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                    <i className={`fa-solid ${selectedHighlight.icon} text-brand-cyan text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight text-brand-dark">{selectedHighlight.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHighlight(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95 flex-shrink-0 ml-4"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-5">
                {selectedHighlight.image && (
                  <img src={selectedHighlight.image} alt={selectedHighlight.title} className="w-full h-48 object-cover rounded-xl mb-5 shadow-sm" />
                )}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedHighlight.extendedDescription || selectedHighlight.description}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pack List Bottom Sheet Modal */}
      <AnimatePresence>
        {packListOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setPackListOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-[2rem] max-h-[85vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-5 py-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-bold text-xl leading-tight text-brand-dark">Things to pack</h3>
                </div>
                <button
                  onClick={() => setPackListOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95 flex-shrink-0 ml-4"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-5 flex flex-col gap-6">
                {trip.packList?.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-brand-dark shadow-xs flex-shrink-0">
                        <i className={`fa-solid ${category.icon || 'fa-suitcase'} text-base`}></i>
                      </div>
                      <h4 className="font-bold text-brand-dark text-base">{category.label}</h4>
                    </div>
                    <ul className="space-y-2.5 pl-[52px]">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 relative">
                          <span className="absolute left-[-16px] top-[7px] w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FAQ Bottom Sheet Modal */}
      <AnimatePresence>
        {faqOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setFaqOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-[2rem] max-h-[85vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-5 py-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-bold text-xl leading-tight text-brand-dark">FAQs</h3>
                </div>
                <button
                  onClick={() => setFaqOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95 flex-shrink-0 ml-4"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-5">
                {trip.faqs && (
                  <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
                    {trip.faqs.map((faq, idx) => (
                      <Accordion key={idx} title={faq.question} className="px-4" titleClassName="text-sm font-semibold">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </Accordion>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cancellation Policy Bottom Sheet Modal */}
      <AnimatePresence>
        {cancellationOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setCancellationOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-[2rem] max-h-[85vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-5 py-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-bold text-xl leading-tight text-brand-dark">Cancellation Policy</h3>
                </div>
                <button
                  onClick={() => setCancellationOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95 flex-shrink-0 ml-4"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="p-5">
                {trip.cancellationPolicy && (
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <table className="w-full text-left text-sm text-gray-600">
                      <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3">Time</th>
                          <th className="px-4 py-3 text-right">Refund</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {trip.cancellationPolicy.map((policy, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 font-medium">{policy.period}</td>
                            <td className="px-4 py-3 text-right text-brand-dark font-bold">{policy.refund}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Captain Bottom Sheet Modal */}
      <AnimatePresence>
        {isCaptainSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setIsCaptainSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] bg-white rounded-t-[2rem] max-h-[90vh] overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-display font-bold text-lg leading-tight text-brand-dark">Meet your Captain</h3>
                <button
                  onClick={() => setIsCaptainSheetOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95 flex-shrink-0 ml-4"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Section 1: Who they are */}
                <div className="flex gap-4 mb-6 px-1">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop" alt="Raj Singh in action" className="w-[72px] h-[72px] rounded-full object-cover shadow-md shrink-0 mt-1" />
                  <div className="flex flex-col py-0.5">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-display font-bold text-[19px] text-brand-dark leading-none">Raj Singh</h4>
                      <div className="flex items-center gap-1 bg-gradient-to-r from-[#fff3cd] to-[#ffecb3] border border-[#ffe082]/60 px-2 py-0.5 rounded shadow-sm">
                        <i className="fa-solid fa-crown text-[9px] text-amber-600"></i>
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider leading-none">Gold Tier</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-0.5">
                      <div className="flex items-center text-[12px] font-bold text-brand-dark">
                        <div className="flex items-center gap-1.5">
                          <i className="fa-solid fa-route text-gray-400"></i>
                          <span>50+ trips</span>
                        </div>
                        <span className="mx-2 w-1 h-1 rounded-full bg-gray-300"></span>
                        <div className="flex items-center gap-1.5">
                          <i className="fa-regular fa-calendar text-gray-400"></i>
                          <span>5+ years</span>
                        </div>
                      </div>
                      <p className="text-[12px] text-gray-600 mt-0.5">Fluent in English, Hindi & Assamese</p>
                    </div>
                  </div>
                </div>

                {/* Traveler Moments */}
                <div className="mb-7">
                  <div className="flex overflow-x-auto hide-scrollbar gap-2.5 px-1 pb-1">
                    {[
                      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80",
                      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=400&q=80",
                      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&q=80",
                      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&q=80",
                      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
                      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80"
                    ].map((img, i) => (
                      <img key={i} src={img} className="w-[92px] h-[92px] rounded-xl object-cover shrink-0 shadow-sm" alt="Traveler moment" />
                    ))}
                  </div>
                </div>

                {/* Section 2: What they actually do */}
                <div className="mb-6">
                  <h5 className="font-display font-bold text-base text-brand-dark mb-4 px-1">What they do on the trip</h5>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-orange-100 text-orange-500">
                        <i className="fa-solid fa-handshake text-base"></i>
                      </div>
                      <div className="pt-0.5">
                        <h6 className="font-bold text-sm text-brand-dark mb-0.5">Breaks the ice</h6>
                        <p className="text-xs text-gray-600 leading-snug pr-2">Introduces the group, gets strangers talking within the first hour.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-500">
                        <i className="fa-solid fa-map-location-dot text-base"></i>
                      </div>
                      <div className="pt-0.5">
                        <h6 className="font-bold text-sm text-brand-dark mb-0.5">Handles the unexpected</h6>
                        <p className="text-xs text-gray-600 leading-snug pr-2">Reroutes plans around weather, road closures, or altitude issues in real time.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-violet-100 text-violet-500">
                        <i className="fa-solid fa-hotel text-base"></i>
                      </div>
                      <div className="pt-0.5">
                        <h6 className="font-bold text-sm text-brand-dark mb-0.5">Runs point with logistics</h6>
                        <p className="text-xs text-gray-600 leading-snug pr-2">Coordinates with hotels & drivers so you never have to chase logistics yourself.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-rose-100 text-rose-500">
                        <i className="fa-solid fa-stethoscope text-base"></i>
                      </div>
                      <div className="pt-0.5">
                        <h6 className="font-bold text-sm text-brand-dark mb-0.5">Keeps an eye on you</h6>
                        <p className="text-xs text-gray-600 leading-snug pr-2">Trained to spot signs of altitude sickness early and knows the nearest medical access points.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
