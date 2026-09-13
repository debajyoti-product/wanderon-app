import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trips } from '../data/trips';
import TripCard from '../components/features/TripCard';
import { motion, AnimatePresence } from 'framer-motion';

const Results = () => {
  const navigate = useNavigate();
  const [excludeSoldOut, setExcludeSoldOut] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('popular');

  // We are fixing query to 'Ladakh' as per prompt
  const activeTrips = trips.filter(t => {
    if (excludeSoldOut && t.soldOut) return false;
    return true; // showing all or just mock data
  });

  return (
    <div className="pb-32 bg-gray-50 min-h-screen flex flex-col relative">
      {/* Header Area */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 pt-10 pb-3 shadow-sm flex flex-col gap-3.5">
        <div className="flex items-center gap-3 px-4">
          {/* Smaller Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 shrink-0 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-800 active:scale-95 transition-transform"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>

          {/* Search Bar showing 'Ladakh' and Dates */}
          <div className="flex-1 bg-gray-100/80 rounded-full flex items-center pl-4 pr-2 py-2 border border-gray-200/50">
            <div 
              className="flex-1 flex items-center cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => navigate('/search')}
            >
              <i className="fa-solid fa-magnifying-glass text-gray-400 mr-2.5 text-sm"></i>
              <span className="text-[13.5px] font-bold text-gray-800">Ladakh</span>
            </div>
            
            <div className="h-5 w-[1px] bg-gray-300 mx-2 shrink-0"></div>
            
            <div 
              onClick={() => navigate('/search')}
              className="flex items-center gap-1.5 text-gray-500 pr-2 py-1 cursor-pointer active:scale-95 transition-transform"
            >
              <i className="fa-regular fa-calendar text-[13px] text-gray-400"></i>
              <span className="text-[12px] font-medium whitespace-nowrap text-gray-600">Add Dates</span>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar px-4 pb-0.5">
          {['Next Week', 'Solo Friendly', 'Best Deals', 'Under ₹20k', 'Under ₹50k', 'Top Rated'].map(filter => (
            <button key={filter} className="whitespace-nowrap px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-700 font-semibold text-[11.5px] active:scale-95 transition-transform">
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* List Header: 15+ results & Toggle */}
      <div className="px-4 py-4 flex items-center justify-between">
        <span className="font-bold text-sm text-gray-800">15+ results</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-gray-500">Exclude Sold out</span>
          <button 
            onClick={() => setExcludeSoldOut(!excludeSoldOut)}
            className={`w-9 h-5 rounded-full relative transition-colors ${excludeSoldOut ? 'bg-brand-cyan' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all shadow-sm ${excludeSoldOut ? 'left-[18px]' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="px-4 flex flex-col gap-3">
        {activeTrips.map(trip => (
          <TripCard key={trip.id} trip={trip} layout="horizontal" />
        ))}
      </div>

      {/* Floating Sort & Filter Widget */}
      <div className="fixed bottom-[85px] left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center bg-brand-dark text-white rounded-full shadow-xl shadow-brand-dark/30 overflow-hidden divide-x divide-gray-700 font-semibold text-[12.5px] tracking-wide border border-white/10">
          <button 
            onClick={() => setShowSort(true)}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 active:bg-gray-800 transition-colors w-[103px]"
          >
            <i className="fa-solid fa-sort text-[13px]"></i>
            Sort
          </button>
          <button 
            onClick={() => setShowFilter(true)}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 active:bg-gray-800 transition-colors w-[103px]"
          >
            <i className="fa-solid fa-sliders text-[13px]"></i>
            Filter
          </button>
        </div>
      </div>
      {/* Filter Drawer */}
      <AnimatePresence>
        {showFilter && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilter(false)}
              className="fixed inset-0 bg-black/40 z-[100]"
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl z-[110] px-5 pt-4 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            >
              {/* Handle */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

              <div className="pb-24">
                {/* Budget Section */}
                <div className="mb-8">
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-5">Budget</h3>
                  <div className="px-2 mb-7 relative h-6 flex items-center">
                    <div className="absolute left-0 right-0 h-1.5 bg-brand-cyan rounded-full"></div>
                    <div className="absolute left-0 w-[18px] h-[18px] bg-brand-cyan rounded-full border-[3px] border-white shadow-sm -ml-2"></div>
                    <div className="absolute right-0 w-[18px] h-[18px] bg-brand-cyan rounded-full border-[3px] border-white shadow-sm -mr-2"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3 flex items-center gap-2">
                      <span className="text-gray-400 font-medium">₹</span>
                      <span className="font-bold text-gray-700 text-[15px]">0</span>
                    </div>
                    <span className="text-gray-300 font-light">-</span>
                    <div className="flex-1 bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3 flex items-center gap-2">
                      <span className="text-gray-400 font-medium">₹</span>
                      <span className="font-bold text-gray-700 text-[15px]">50000</span>
                    </div>
                  </div>
                </div>

                {/* Categories Section */}
                <div className="mb-8">
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[13.5px] active:scale-95 transition-transform">
                      <i className="fa-solid fa-users text-brand-cyan text-sm"></i>
                      Group Trips
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[13.5px] active:scale-95 transition-transform">
                      <i className="fa-solid fa-briefcase text-brand-cyan text-sm"></i>
                      Corporate
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[13.5px] active:scale-95 transition-transform">
                      <i className="fa-solid fa-people-roof text-brand-cyan text-sm"></i>
                      Family
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[13.5px] active:scale-95 transition-transform">
                      <i className="fa-solid fa-heart text-brand-cyan text-sm"></i>
                      Couples
                    </button>
                  </div>
                </div>

                {/* Duration Section */}
                <div className="mb-8">
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-4">Duration</h3>
                  <div className="flex flex-wrap gap-3">
                    {['1–3 Days', '3–5 Days', '5–7 Days', '7+ Days'].map(d => (
                      <button key={d} className="px-6 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[13.5px] active:scale-95 transition-transform">
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Month Section */}
                <div className="mb-8">
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-4">Month</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map(m => (
                      <button key={m} className="px-7 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[13.5px] active:scale-95 transition-transform min-w-[76px]">
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Time Section */}
                <div className="mb-8">
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-4">Start Time</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Morning, before 12pm', 'Afternoon, after 12pm', 'Evening, after 5pm', 'Night, after 12am'].map(time => (
                      <button key={time} className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[13px] active:scale-95 transition-transform">
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Departs From Section */}
                <div className="mb-8">
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-4">Departs From</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Chandigarh', 'Gurgaon', 'Delhi'].map(city => (
                      <button key={city} className="px-6 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[13.5px] active:scale-95 transition-transform">
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="sticky bottom-0 left-0 right-0 pb-6 pt-3 bg-white border-t border-gray-100 flex items-center justify-between -mx-5 px-6">
                <button 
                  onClick={() => setShowFilter(false)} 
                  className="text-brand-dark font-bold text-[15px]"
                >
                  Clear all
                </button>
                <button 
                  onClick={() => setShowFilter(false)} 
                  className="bg-brand-cyan text-white font-bold text-[15px] px-10 py-3.5 rounded-2xl active:scale-95 transition-transform"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sort Drawer */}
      <AnimatePresence>
        {showSort && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSort(false)}
              className="fixed inset-0 bg-black/40 z-[100]"
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[110] px-5 pt-4 pb-8 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            >
              {/* Handle */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
              
              <h3 className="font-display font-bold text-gray-900 text-xl mb-6">Sort by</h3>

              <div className="flex flex-col gap-4">
                <label 
                  onClick={() => setSelectedSort('popular')}
                  className="flex items-center justify-between cursor-pointer group py-1"
                >
                  <span className={`font-semibold text-[15px] transition-colors ${selectedSort === 'popular' ? 'text-brand-dark font-bold' : 'text-gray-700 group-hover:text-brand-cyan'}`}>
                    Most Popular
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSort === 'popular' ? 'border-brand-cyan' : 'border-gray-300'}`}>
                    {selectedSort === 'popular' && <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full"></div>}
                  </div>
                </label>

                <div className="h-px bg-gray-100"></div>

                <label 
                  onClick={() => setSelectedSort('price_asc')}
                  className="flex items-center justify-between cursor-pointer group py-1"
                >
                  <span className={`font-semibold text-[15px] transition-colors ${selectedSort === 'price_asc' ? 'text-brand-dark font-bold' : 'text-gray-700 group-hover:text-brand-cyan'}`}>
                    Price: Low to High
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSort === 'price_asc' ? 'border-brand-cyan' : 'border-gray-300'}`}>
                    {selectedSort === 'price_asc' && <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full"></div>}
                  </div>
                </label>
                
                <label 
                  onClick={() => setSelectedSort('price_desc')}
                  className="flex items-center justify-between cursor-pointer group py-1"
                >
                  <span className={`font-semibold text-[15px] transition-colors ${selectedSort === 'price_desc' ? 'text-brand-dark font-bold' : 'text-gray-700 group-hover:text-brand-cyan'}`}>
                    Price: High to Low
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSort === 'price_desc' ? 'border-brand-cyan' : 'border-gray-300'}`}>
                    {selectedSort === 'price_desc' && <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full"></div>}
                  </div>
                </label>
                
                <div className="h-px bg-gray-100"></div>

                <label 
                  onClick={() => setSelectedSort('rating_desc')}
                  className="flex items-center justify-between cursor-pointer group py-1"
                >
                  <span className={`font-semibold text-[15px] transition-colors ${selectedSort === 'rating_desc' ? 'text-brand-dark font-bold' : 'text-gray-700 group-hover:text-brand-cyan'}`}>
                    Rating: High to Low
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSort === 'rating_desc' ? 'border-brand-cyan' : 'border-gray-300'}`}>
                    {selectedSort === 'rating_desc' && <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full"></div>}
                  </div>
                </label>

                <label 
                  onClick={() => setSelectedSort('rating_asc')}
                  className="flex items-center justify-between cursor-pointer group py-1"
                >
                  <span className={`font-semibold text-[15px] transition-colors ${selectedSort === 'rating_asc' ? 'text-brand-dark font-bold' : 'text-gray-700 group-hover:text-brand-cyan'}`}>
                    Rating: Low to High
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSort === 'rating_asc' ? 'border-brand-cyan' : 'border-gray-300'}`}>
                    {selectedSort === 'rating_asc' && <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full"></div>}
                  </div>
                </label>
              </div>

              <button 
                onClick={() => setShowSort(false)} 
                className="mt-8 bg-brand-cyan text-white font-bold text-[15px] w-full py-4 rounded-2xl active:scale-95 transition-transform shadow-lg shadow-brand-cyan/20"
              >
                Apply
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Results;
