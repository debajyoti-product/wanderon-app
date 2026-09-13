import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion.create(Link);

const BottomNav = () => {
  const location = useLocation();
  const [isCallOpen, setIsCallOpen] = useState(false);

  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      iconSolid: 'fa-solid fa-house', 
      iconOutline: 'fa-solid fa-house text-gray-500' 
    },
    { 
      path: '/categories',
      label: 'Categories', 
      iconSolid: 'fa-solid fa-layer-group', 
      iconOutline: 'fa-solid fa-layer-group text-gray-500' 
    },
    // Center FAB placeholder
    { path: '__fab__', label: 'Connect', iconSolid: '', iconOutline: '' },
    { 
      path: '/bookings', 
      label: 'My Trips', 
      iconSolid: 'fa-solid fa-suitcase-rolling', 
      iconOutline: 'fa-solid fa-suitcase-rolling text-gray-500' 
    },
    { 
      path: '/profile', 
      label: 'Profile', 
      iconSolid: 'fa-solid fa-user', 
      iconOutline: 'fa-regular fa-user' 
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-[60] safe-area-bottom">
        {/* SVG background with cutout */}
        <div className="absolute inset-0 pointer-events-none flex flex-col" style={{ top: '-1px' }}>
          <svg
            width="100%"
            height="38px"
            viewBox="0 0 400 38"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <defs>
              <filter id="navShadow" x="-10%" y="-50%" width="120%" height="200%">
                <feDropShadow dx="0" dy="-3" stdDeviation="4" floodColor="rgba(0,0,0,0.06)" />
              </filter>
            </defs>
            <path
              d="M0,0 L162,0 C165,0 167,1 168,3 C174,19 185,36 200,36 C215,36 226,19 232,3 C233,1 235,0 238,0 L400,0 L400,38 L0,38 Z"
              fill="rgba(255,255,255,0.97)"
              filter="url(#navShadow)"
            />
          </svg>
          <div className="flex-1 bg-[rgba(255,255,255,0.97)]" />
        </div>

        {/* Floating Call Button with Rotating Gradient Border */}
        <motion.button
          onClick={() => setIsCallOpen(true)}
          whileTap={{ scale: 0.9 }}
          className="absolute left-1/2 -translate-x-1/2 -top-[22px] w-[52px] h-[52px] rounded-full flex items-center justify-center z-[70] shadow-[0_8px_16px_-4px_rgba(0,163,224,0.3)] active:shadow-md transition-shadow overflow-hidden p-[2.5px]"
        >
          {/* Rotating gradient background in brand-cyan */}
          <div 
            className="absolute inset-0 animate-[spin_3s_linear_infinite]" 
            style={{ background: 'conic-gradient(from 0deg, #00a3e0 0%, #38bdf8 35%, #007eb0 70%, #00a3e0 100%)' }} 
          />
          {/* Inner white circle */}
          <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center">
            <i className="fa-solid fa-phone text-brand-cyan text-xl"></i>
          </div>
        </motion.button>

        {/* Nav Items */}
        <div className="relative flex justify-around items-center px-2 pt-3 pb-2">
          {navItems.map((item) => {
            if (item.path === '__fab__') {
              // Center spacer + label for FAB
              return (
                <div key="fab" className="flex flex-col items-center justify-center w-16 gap-1">
                  <div className="text-xl h-[24px]"></div>
                  <span className="text-[10px] font-medium tracking-wide text-brand-cyan">
                    {item.label}
                  </span>
                </div>
              );
            }

            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <MotionLink
                key={item.path}
                to={item.path}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
                  isActive ? 'text-brand-cyan' : 'text-gray-500'
                }`}
              >
                <motion.div 
                  initial={false}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  className="text-xl"
                >
                  <i className={isActive ? item.iconSolid : item.iconOutline}></i>
                </motion.div>
                <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </MotionLink>
            );
          })}
        </div>
      </nav>

      {/* Call Back Drawer */}
      <AnimatePresence>
        {isCallOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCallOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[400px] bg-white rounded-t-3xl p-6 z-10 shadow-2xl flex flex-col pb-safe-offset-4"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 shrink-0"></div>
              
              <div className="flex items-center justify-between mb-5 shrink-0">
                <h2 className="font-display font-bold text-[22px] text-gray-900">Get a Call Back</h2>
                <button 
                  onClick={() => setIsCallOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 active:scale-95 transition-transform"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
                {/* Destination Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Destination</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Where do you want to go?" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all font-medium text-sm text-gray-700"
                    />
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {/* Dates Dropdown */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Dates (Optional)</label>
                  <div className="relative">
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all appearance-none font-medium text-sm text-gray-700 cursor-pointer">
                      <option value="">Select a month...</option>
                      <option value="jan">January 2026</option>
                      <option value="feb">February 2026</option>
                      <option value="mar">March 2026</option>
                      <option value="any">Anytime</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs"></i>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Name</label>
                  <input
                    type="text"
                    value="Debajyoti"
                    readOnly
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all font-medium text-sm text-gray-700"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="w-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-medium text-sm">
                      +91
                    </div>
                    <input
                      type="tel"
                      value="9876543210"
                      readOnly
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-all font-medium text-sm text-gray-700"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setIsCallOpen(false)}
                  className="w-full mt-6 py-3.5 rounded-xl font-bold text-[15px] text-white shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(115deg, #091a36 0%, #103778 45%, #e69d00 85%, #ffc107 100%)',
                  }}
                >
                  Get a Call Back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomNav;
