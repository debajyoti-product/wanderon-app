import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trips } from '../data/trips';
import TripCard from '../components/features/TripCard';

const Profile = () => {
  const [userName, setUserName] = useState('Debajyoti');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userEmail, setUserEmail] = useState('debajyoti@wanderon.in');
  const memberSince = '2022';
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPastTripsOpen, setIsPastTripsOpen] = useState(false);
  
  // Temporary edit form states
  const [tempName, setTempName] = useState(userName);
  const [tempPhone, setTempPhone] = useState(userPhone);
  const [tempEmail, setTempEmail] = useState(userEmail);

  const pastTrips = trips.slice(2, 4);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(tempName);
    setUserPhone(tempPhone);
    setUserEmail(tempEmail);
    setIsEditOpen(false);
  };

  return (
    <div className="pb-24 pt-10 bg-gray-50 min-h-screen">
      
      {/* Header (Same as Categories header) */}
      <div className="px-5 mb-6 flex justify-between items-center">
        <h1 className="font-display font-semibold text-[25.5px] text-gray-900 tracking-tight">Profile</h1>
      </div>

      <div className="px-5 flex flex-col gap-5">
        
        {/* Separate Profile Card */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-dark/5 border-2 border-brand-dark/10 flex items-center justify-center overflow-hidden shrink-0">
              <i className="fa-solid fa-user text-2xl text-brand-dark/70"></i>
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-0.5 leading-tight">{userName}</h2>
              <span className="text-xs text-gray-500">Joined {memberSince}</span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button 
            onClick={() => {
              setTempName(userName);
              setTempPhone(userPhone);
              setTempEmail(userEmail);
              setIsEditOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700 active:scale-95 transition-all shadow-sm"
          >
            <i className="fa-solid fa-pen text-[10px] text-gray-500"></i>
            <span>Edit</span>
          </button>
        </section>
        
        {/* Links Menu Card */}
        <section className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
          <div className="flex flex-col">
            {/* Past Trips as an option in this card */}
            <MenuLink 
              icon="fa-clock-rotate-left" 
              color="text-blue-500" 
              title="Past Trips" 
              subtitle={`${pastTrips.length} completed journeys`}
              onClick={() => setIsPastTripsOpen(true)}
            />
            <div className="h-px bg-gray-50 mx-4"></div>

            <MenuLink icon="fa-heart" color="text-red-500" title="Saved Trips" subtitle="3 wishlisted" />
            <div className="h-px bg-gray-50 mx-4"></div>
            <MenuLink icon="fa-gift" color="text-purple-500" title="Refer a Friend" subtitle="Earn ₹1,000 off" />
            <div className="h-px bg-gray-50 mx-4"></div>
            <MenuLink icon="fa-newspaper" color="text-brand-yellow" title="About & Trust" subtitle="Press mentions & story" />
            <div className="h-px bg-gray-50 mx-4"></div>
            <MenuLink icon="fa-circle-question" color="text-brand-cyan" title="Help & FAQs" />
            <div className="h-px bg-gray-50 mx-4"></div>
            <MenuLink icon="fa-gear" color="text-gray-500" title="Settings" />
            <div className="h-px bg-gray-50 mx-4"></div>
            <button className="flex items-center gap-4 p-4 active:bg-gray-50 transition-colors rounded-xl text-left">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <i className="fa-solid fa-arrow-right-from-bracket text-red-500 text-lg"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-500 text-sm">Log Out</h4>
              </div>
            </button>
          </div>
        </section>

      </div>

      {/* Edit Profile Drawer */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[400px] bg-white rounded-t-3xl p-6 z-10 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-brand-dark">Edit Profile</h2>
                <button 
                  onClick={() => setIsEditOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 active:scale-95"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                </div>

                <div className="pt-3">
                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg active:scale-95 transition-all"
                    style={{
                      background: 'linear-gradient(115deg, #091a36 0%, #103778 45%, #e69d00 85%, #ffc107 100%)'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Past Trips Drawer */}
      <AnimatePresence>
        {isPastTripsOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPastTripsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[400px] max-h-[85vh] bg-white rounded-t-3xl p-6 z-10 shadow-2xl flex flex-col"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 shrink-0"></div>
              
              <div className="flex items-center justify-between mb-5 shrink-0">
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">Past Trips</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Your completed WanderOn adventures</p>
                </div>
                <button 
                  onClick={() => setIsPastTripsOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 active:scale-95"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>

              <div className="overflow-y-auto hide-scrollbar space-y-4 pb-6">
                {pastTrips.map(trip => (
                  <div key={trip.id} className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <TripCard trip={trip} layout="compact" />
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-xl active:scale-95 shadow-sm">
                        <i className="fa-regular fa-star mr-1.5 text-amber-500"></i> Rate Trip
                      </button>
                      <button className="flex-1 bg-brand-cyan/10 text-brand-cyan text-xs font-semibold py-2 rounded-xl active:scale-95">
                        <i className="fa-solid fa-repeat mr-1.5"></i> Book Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper component
const MenuLink = ({ 
  icon, 
  color, 
  title, 
  subtitle,
  onClick
}: { 
  icon: string, 
  color: string, 
  title: string, 
  subtitle?: string,
  onClick?: () => void
}) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-4 p-4 active:bg-gray-50 transition-colors rounded-xl text-left"
  >
    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
      <i className={`fa-solid ${icon} ${color} text-lg`}></i>
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
    <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
  </button>
);

export default Profile;

