import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import TripCard from '../components/features/TripCard';
import { trips } from '../data/trips';

const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

// Dummy logic for holidays/long weekends to match UI
const isPublicHoliday = (d: Date) => d.getDate() === 15 || d.getDate() === 5;
const isLongWeekend = (d: Date) => {
  const date = d.getDate();
  const day = d.getDay();
  // Make the first weekend a long weekend for demonstration
  return (date >= 1 && date <= 7) && (day === 5 || day === 6 || day === 0 || day === 1);
};

const Search = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const calendarScrollRef = useRef<HTMLDivElement>(null);
  
  const [query, setQuery] = useState('');
  
  // Calendar states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Focus search bar on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const activeTrips = trips.filter(t => {
    if (query && !t.title.toLowerCase().includes(query.toLowerCase()) && !t.location.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const isFiltering = query.length > 0;

  const handleSearchSubmit = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    navigate('/results');
  };

  const handleDateClick = (d: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate(null);
    } else {
      if (d < startDate) {
        setEndDate(startDate);
        setStartDate(d);
      } else {
        setEndDate(d);
      }
    }
  };

  const handleScrollMonth = (direction: 'left' | 'right') => {
    if (calendarScrollRef.current) {
      const container = calendarScrollRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const today = new Date();
  const months = Array.from({ length: 12 }).map((_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      monthName: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
  });

  const renderMonth = (m: { year: number, month: number, monthName: string }, index: number) => {
    const daysInMonth = new Date(m.year, m.month + 1, 0).getDate();
    const startDay = new Date(m.year, m.month, 1).getDay();

    return (
      <div key={`${m.year}-${m.month}`} className="w-full shrink-0 snap-center px-5">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => handleScrollMonth('left')} 
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 active:scale-95 text-gray-500 transition-colors hover:bg-gray-100 ${index === 0 ? 'invisible' : ''}`}
          >
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          
          <h4 className="font-display font-bold text-lg text-gray-900">{m.monthName}</h4>
          
          <button 
            onClick={() => handleScrollMonth('right')} 
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 active:scale-95 text-gray-500 transition-colors hover:bg-gray-100 ${index === months.length - 1 ? 'invisible' : ''}`}
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-3 gap-x-0">
          {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
            <div key={day} className="text-[10px] font-bold text-gray-400 text-center mb-2">{day}</div>
          ))}
          {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = new Date(m.year, m.month, i + 1);
            const norm = normalize(d);
            const startNorm = startDate ? normalize(startDate) : null;
            const endNorm = endDate ? normalize(endDate) : null;

            const isSelected = norm === startNorm || norm === endNorm;
            const isInRange = startNorm && endNorm && norm > startNorm && norm < endNorm;
            const isHol = isPublicHoliday(d);
            const isLW = isLongWeekend(d);

            let bgOuter = "";
            if (isInRange) {
              bgOuter = "bg-blue-50";
            } else if (isSelected && startNorm && endNorm) {
              if (norm === startNorm) bgOuter = "bg-gradient-to-r from-transparent to-blue-50";
              if (norm === endNorm) bgOuter = "bg-gradient-to-l from-transparent to-blue-50";
            }

            let bgInner = "bg-transparent";
            let textClass = "text-gray-700";
            let roundedClass = "rounded-full";

            if (isSelected) {
              bgInner = "bg-brand-cyan shadow-md";
              textClass = "text-white font-bold";
            } else if (isLW) {
              bgInner = "bg-blue-100";
              roundedClass = "rounded-xl";
            }

            if (isHol && !isSelected) {
              textClass = "text-red-500 font-bold";
            }

            return (
              <div key={i + 1} className={`relative flex items-center justify-center h-10 w-full ${bgOuter}`}>
                <button
                  onClick={() => handleDateClick(d)}
                  className={`relative flex items-center justify-center w-9 h-9 ${roundedClass} ${bgInner} ${textClass} active:scale-95 transition-transform`}
                >
                  <span className="text-[13px]">{i + 1}</span>
                  {isHol && !isSelected && (
                    <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const dateText = startDate && endDate
    ? `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : startDate
    ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : 'Select Dates (Optional)';

  return (
    <div className="pb-36 bg-white min-h-screen flex flex-col relative">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 pt-10 pb-4 px-4">
        {/* Back Button matching TripDetails style with 'Search' text beside it */}
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-800 active:scale-95 transition-transform"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <span className="font-display font-bold text-[18px] text-gray-900">Search</span>
        </div>

        {/* Search Bar moved down */}
        <div className="w-full bg-gray-100 rounded-full flex items-center px-4 py-3 mb-3">
          <i className="fa-solid fa-magnifying-glass text-gray-400 mr-3"></i>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Where to?" 
            className="bg-transparent border-none outline-none w-full text-sm font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit();
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 p-1">
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        {/* Select Dates Card */}
        <div 
          onClick={() => setIsCalendarOpen(true)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm cursor-pointer active:scale-95 transition-transform"
        >
          <span className={`font-medium text-sm ${startDate ? 'text-brand-dark font-bold' : 'text-gray-500'}`}>
            {dateText}
          </span>
          <i className="fa-solid fa-chevron-down text-gray-400 text-xs"></i>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Recent Searches */}
        {!query && (
          <div className="py-5 px-4 border-b border-gray-100">
            <h3 className="font-display font-bold text-sm text-gray-500 mb-3">Recent Searches</h3>
            <div className="flex flex-wrap gap-2.5">
              <button 
                onClick={() => setQuery('Manali')}
                className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 active:scale-95 transition-transform flex items-center"
              >
                <i className="fa-solid fa-clock-rotate-left text-gray-400 text-xs mr-2"></i>
                Manali
              </button>
              <button 
                onClick={() => setQuery('Goa')}
                className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 active:scale-95 transition-transform flex items-center"
              >
                <i className="fa-solid fa-clock-rotate-left text-gray-400 text-xs mr-2"></i>
                Goa
              </button>
              <button 
                onClick={() => setQuery('Kerala')}
                className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 active:scale-95 transition-transform flex items-center"
              >
                <i className="fa-solid fa-clock-rotate-left text-gray-400 text-xs mr-2"></i>
                Kerala
              </button>
            </div>
          </div>
        )}

        {/* Content Area - Only shown when user has typed / selected a query */}
        {isFiltering && (
          <div className="py-6 px-4">
            <h3 className="font-display font-bold text-lg mb-4">Search Results ({activeTrips.length})</h3>
            <div className="grid grid-cols-1 gap-4">
              {activeTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} layout="vertical" />
              ))}
            </div>
            {activeTrips.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <i className="fa-solid fa-magnifying-glass text-4xl mb-3 text-gray-300"></i>
                <p>No trips found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Primary Search CTA positioned above the bottom nav bar */}
      <div className="fixed bottom-[65px] left-1/2 -translate-x-1/2 w-full max-w-[400px] z-40 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-gray-100/80 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleSearchSubmit}
          className="w-full py-3 px-6 rounded-full text-[14px] font-semibold text-white shadow-md shadow-blue-950/20 border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(115deg, #091a36 0%, #103778 45%, #e69d00 85%, #ffc107 100%)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
          }}
        >
          <i className="fa-solid fa-magnifying-glass text-xs"></i>
          <span>Search</span>
        </button>
      </div>

      {/* Calendar Bottom Sheet Modal */}
      <AnimatePresence>
        {isCalendarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-black/60 z-[90] backdrop-blur-sm"
              onClick={() => setIsCalendarOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[100] bg-white rounded-t-[2rem] max-h-[85vh] flex flex-col pb-[env(safe-area-inset-bottom)] shadow-2xl"
            >
              <div className="px-5 pt-5 pb-3 flex justify-between items-center bg-white rounded-t-[2rem] z-10">
                <h3 className="font-display font-bold text-lg text-gray-900">Select Dates</h3>
                <button
                  onClick={() => setIsCalendarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:scale-95 transition-transform"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Horizontally Scrollable Calendar */}
              <div 
                ref={calendarScrollRef}
                className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory py-4"
              >
                {months.map((m, idx) => renderMonth(m, idx))}
              </div>

              {/* Legend & Apply Button */}
              <div className="px-5 py-5 border-t border-gray-100 bg-white">
                <div className="flex gap-6 mb-5 text-[11px] font-medium text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Public Holiday
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-blue-100 rounded-md"></div>
                    Long Weekend
                  </div>
                </div>
                <button 
                  onClick={() => setIsCalendarOpen(false)} 
                  className="w-full py-3.5 rounded-full bg-brand-cyan text-white font-bold text-[14px] shadow-lg shadow-brand-cyan/30 active:scale-95 transition-transform"
                >
                  Apply Dates
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
