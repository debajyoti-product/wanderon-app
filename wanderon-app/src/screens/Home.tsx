import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TripCard from '../components/features/TripCard';
import ExperienceBanners from '../components/features/ExperienceBanners';
import { trips } from '../data/trips';
import { destinations } from '../data/destinations';

const Home = () => {
  const navigate = useNavigate();
  
  const upcomingTrips = trips.slice(0, 4);
  const bestSellingTrips = trips.slice(2, 8); // Example trips

  const [exploreTab, setExploreTab] = useState<'india' | 'international'>('india');
  const [showValueProps, setShowValueProps] = useState(true);

  const valueProps = [
    { 
      number: '100k+', 
      label: 'HAPPY TRAVELERS', 
      icon: 'fa-users', 
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-500'
    },
    { 
      number: '40+', 
      label: 'DESTINATIONS', 
      icon: 'fa-earth-americas', 
      bgColor: 'bg-green-100',
      iconColor: 'text-green-500'
    },
    { 
      number: '20k+', 
      label: 'TRIPS SERVED', 
      icon: 'fa-plane', 
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-500'
    }
  ];

  return (
    <div className="pb-24 bg-white min-h-screen">
      
      {/* Top Header / Search Section */}
      <div className="relative flex flex-col pt-2 pb-6 px-5 bg-white">
        
        {/* Top Bar: Logo & Favorites */}
        <div className="flex justify-between items-center mt-2 mb-8">
          <img src="/logo.png" alt="WanderOn" className="h-11 w-auto object-contain" />
          <button 
            onClick={() => navigate('/saved')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm border border-gray-200 active:scale-95 transition-transform"
          >
            <i className="fa-regular fa-heart text-lg"></i>
          </button>
        </div>

        {/* Catchy Header Text */}
        <div className="flex flex-col mb-4">
          <h1 
            className="text-[27.5px] leading-tight tracking-[0.042em] font-bold"
            style={{ 
              fontFamily: "'Oregano', cursive",
            }}
          >
            <span 
              className="text-brand-slate/75"
              style={{ WebkitTextStroke: '0.16px currentColor' }}
            >
              Plan your next{' '}
            </span>
            <span 
              className="bg-clip-text text-transparent font-bold inline-block"
              style={{ 
                backgroundImage: 'linear-gradient(115deg, #091a36 0%, #103778 45%, #e69d00 85%, #ffc107 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '0px'
              }}
            >
              adventure...
            </span>
          </h1>
        </div>

        {/* Unified Search Pill */}
        <button 
          onClick={() => navigate('/search')}
          className="w-full bg-white text-gray-500 rounded-full py-3.5 px-5 flex items-center gap-3.5 shadow-sm border border-gray-200/90 active:scale-95 transition-transform"
        >
          <i className="fa-solid fa-magnifying-glass text-brand-cyan text-base"></i>
          <div className="flex-1 text-left">
            <div className="font-medium text-gray-500 text-sm">Search Destinations</div>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="mt-1">
        
        {/* The WanderOn Promise */}
        {showValueProps && (
          <div className="mb-[34px] -mt-1 px-5">
            <div className="w-full rounded-2xl bg-gradient-to-r from-brand-cyan/60 to-[#ffc107]/60 p-[1.5px] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)]">
              <div className="bg-white rounded-[14.5px] py-4 px-3 relative">
                
                {/* Header & Close Button */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-display font-semibold text-[13px] text-gray-500 uppercase tracking-wide ml-1">
                    Why Wanderon?
                  </h2>
                  <button 
                    onClick={() => setShowValueProps(false)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fa-solid fa-xmark text-sm"></i>
                  </button>
                </div>

                {/* Value Props */}
                <div className="grid grid-cols-4 gap-[7.5px]">
                  
                  {/* Value Prop 1 */}
                  <div className="flex flex-col items-center text-center">
                    <img src="/images/zero_middlemen.jpg" alt="Zero Middlemen" className="w-[42px] h-[42px] object-cover mb-2" />
                    <h3 className="font-display font-medium text-[11px] text-gray-900 leading-tight">
                      Zero<br />Middlemen
                    </h3>
                  </div>

                  {/* Value Prop 2 */}
                  <div className="flex flex-col items-center text-center">
                    <img src="/images/on_ground_support.jpg" alt="On Ground Support" className="w-[42px] h-[42px] object-cover mb-2" />
                    <h3 className="font-display font-medium text-[11px] text-gray-900 leading-tight">
                      On Ground<br />Support
                    </h3>
                  </div>

                  {/* Value Prop 3 */}
                  <div className="flex flex-col items-center text-center">
                    <img src="/images/vibe_match.jpg" alt="Filtered Matches" className="w-[42px] h-[42px] object-cover mb-2" />
                    <h3 className="font-display font-medium text-[11px] text-gray-900 leading-tight">
                      Filtered<br />Matches
                    </h3>
                  </div>

                  {/* Value Prop 4 */}
                  <div className="flex flex-col items-center text-center">
                    <img src="/images/exceptional_comfort.jpg" alt="Exceptional Comfort" className="w-[42px] h-[42px] object-cover mb-2" />
                    <h3 className="font-display font-medium text-[11px] text-gray-900 leading-tight">
                      Exceptional<br />Comfort
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Upcoming Trips Rail */}
        <div className="mb-[42px]">
          <div className="px-5 mt-2 mb-4 flex items-center justify-center gap-4 w-full">
            <div className="h-[2.5px] flex-1 rounded-full bg-gradient-to-r from-brand-cyan/80 to-[#ffc107]/80"></div>
            <h2 className="font-display font-semibold text-[18px] text-gray-900 uppercase tracking-wide shrink-0">UPCOMING TRIPS</h2>
            <div className="h-[2.5px] flex-1 rounded-full bg-gradient-to-l from-brand-cyan/80 to-[#ffc107]/80"></div>
          </div>
          <div className="flex justify-start overflow-x-auto hide-scrollbar px-5 pb-4 gap-4 snap-x scroll-pl-5">
            {upcomingTrips.map(trip => (
              <div key={trip.id} className="w-[240px] shrink-0 snap-start flex flex-col">
                <TripCard trip={trip} layout="compact" className="h-full" />
              </div>
            ))}
          </div>
          <div className="flex mt-2 px-5">
            <button onClick={() => navigate('/results')} className="w-full flex justify-center py-[11px] bg-white border border-gray-200 text-gray-900 text-[11.5px] font-bold uppercase tracking-wider rounded-full shadow-md active:scale-95 transition-transform">
              VIEW ALL
            </button>
          </div>
        </div>

        {/* Experience Banners (Creative Showcase) */}
        <div className="mb-[42px]">
          <div className="px-5 mt-2 mb-4 flex justify-center items-center w-full">
            <div className="flex flex-col items-center select-none">
              {/* "CURATED" Calendar Badge */}
              <div className="relative ml-1 -rotate-2 z-10 w-max">
                {/* Blue sheet behind */}
                <div className="absolute inset-0 bg-[#3b82f6] rounded-sm translate-x-1 translate-y-1 border-2 border-brand-slate"></div>
                {/* Yellow sheet */}
                <div className="relative bg-[#fde047] border-2 border-brand-slate rounded-sm px-3 pt-1.5 pb-1 flex justify-center items-center">
                  {/* Calendar Rings */}
                  <div className="absolute -top-2 left-2 w-1.5 h-3 border-2 border-brand-slate bg-gray-100 rounded-full"></div>
                  <div className="absolute -top-2 right-2 w-1.5 h-3 border-2 border-brand-slate bg-gray-100 rounded-full"></div>
                  <span className="font-display font-black text-brand-slate tracking-[0.15em] uppercase text-[14px] leading-none">Curated</span>
                </div>
              </div>
              
              {/* "EXPERIENCES" 3D Shadow Text (Layered for clean stroke) */}
              <div className="relative -mt-1.5 z-20">
                <h2 
                  className="font-display font-black text-[30px] uppercase tracking-wide leading-none absolute left-0 top-0"
                  style={{
                    color: 'white',
                    WebkitTextStroke: '3.5px #1e293b',
                    textShadow: '3px 3px 0px #1e293b, 4px 4px 0px #1e293b, 5px 5px 0px #1e293b'
                  }}
                  aria-hidden="true"
                >
                  Experiences
                </h2>
                <h2 
                  className="font-display font-black text-[30px] uppercase tracking-wide leading-none relative text-white"
                >
                  Experiences
                </h2>
              </div>
            </div>
          </div>
          <ExperienceBanners />
        </div>

        {/* Explore Destinations Section */}
        <div 
          className="mb-[42px] py-6"
          style={{ background: 'linear-gradient(90deg, rgba(207, 250, 254, 0.42) 0%, rgba(254, 249, 195, 0.38) 100%)' }}
        >
          <div className="px-5 mb-5 text-left">
            <h2 className="font-display font-semibold text-[18px] text-gray-900 uppercase tracking-wide">DESTINATIONS</h2>
          </div>
          
          {/* Toggle Pills - reduced by 15% */}
          <div className="px-5 mb-4 flex gap-2.5">
            <button 
              onClick={() => setExploreTab('india')}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${
                exploreTab === 'india' ? 'bg-brand-cyan text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <img src="/icons/india-3d-flag.svg" alt="India" className="w-4 h-4 object-contain shrink-0 drop-shadow-sm" /> India
            </button>
            <button 
              onClick={() => setExploreTab('international')}
              className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${
                exploreTab === 'international' ? 'bg-brand-cyan text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <span className="text-sm">🌍</span> International
            </button>
          </div>

          {/* Circular Destination Cards - Left aligned & reduced by 10% */}
          <div className="flex justify-start overflow-x-auto hide-scrollbar px-5 pb-4 gap-4 snap-x scroll-pl-5">
            {destinations.filter(d => exploreTab === 'india' ? d.type === 'domestic' : d.type === 'international').map(dest => (
              <button 
                key={dest.id}
                onClick={() => navigate(`/search?dest=${dest.name.toLowerCase()}`)}
                className="flex flex-col items-center gap-2 shrink-0 w-[72px] snap-start active:scale-95 transition-transform"
              >
                <div className="w-[72px] h-[72px] rounded-full overflow-hidden shadow-[0_4px_12px_rgb(0,0,0,0.08)] border-2 border-white">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-gray-800 text-center tracking-tight truncate w-full">{dest.name}</span>
              </button>
            ))}
          </div>
          <div className="flex mt-1 px-5">
            <button onClick={() => navigate('/results')} className="w-full flex justify-center py-[11px] bg-white border border-gray-200 text-gray-900 text-[11.5px] font-bold uppercase tracking-wider rounded-full shadow-md active:scale-95 transition-transform">
              EXPLORE
            </button>
          </div>
        </div>

        {/* Best Selling Trips Section */}
        <div className="mb-[42px] mt-6">
          <div className="flex flex-col justify-center items-center w-full select-none px-5 mb-5">
            <div className="inline-flex items-center gap-2.5">
              <span className="font-display font-black text-brand-slate/85 tracking-[0.2em] uppercase text-[16px] pt-0.5 whitespace-nowrap">UP TO</span>
              <div className="relative z-20">
                <h2 
                  className="font-display font-black text-[23.6px] uppercase tracking-wide leading-none absolute left-0 top-0 whitespace-nowrap"
                  style={{
                    color: 'white',
                    WebkitTextStroke: '2.9px #00a3e0',
                    textShadow: '2.3px 2.3px 0px #00a3e0, 3.5px 3.5px 0px #00a3e0'
                  }}
                  aria-hidden="true"
                >
                  ₹10,000
                </h2>
                <h2 
                  className="font-display font-black text-[23.6px] uppercase tracking-wide leading-none relative text-white whitespace-nowrap"
                >
                  ₹10,000
                </h2>
              </div>
              <span className="font-display font-black text-brand-slate/85 tracking-[0.2em] uppercase text-[16px] pt-0.5 whitespace-nowrap">OFF</span>
            </div>
            
            <p className="mt-2 font-display font-medium text-gray-600 text-[12px] uppercase tracking-[0.06em] text-center">
              Christmas & New Year Trips
            </p>
          </div>
          
          <div className="flex justify-start overflow-x-auto hide-scrollbar px-5 pb-4 gap-4 snap-x scroll-pl-5">
            {bestSellingTrips.map(trip => (
              <div key={trip.id} className="w-[240px] shrink-0 snap-start flex flex-col">
                <TripCard trip={trip} layout="compact" className="h-full" />
              </div>
            ))}
          </div>
          <div className="flex mt-2 px-5">
            <button onClick={() => navigate('/results')} className="w-full flex justify-center py-[11px] bg-white border border-gray-200 text-gray-900 text-[11.5px] font-bold uppercase tracking-wider rounded-full shadow-md active:scale-95 transition-transform">
              VIEW ALL
            </button>
          </div>
        </div>

        {/* Value Props - Scaled to fit all 3 on screen without scrolling */}
        <div className="mt-[34px] mb-6 px-4">
          <div className="flex justify-between items-center gap-2">
            {valueProps.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-white rounded-[1.25rem] p-2 flex flex-col items-center text-center shadow-sm border border-gray-100"
              >
                <div className={`w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center shrink-0 mb-1.5`}>
                  <i className={`fa-solid ${item.icon} ${item.iconColor} text-xs`}></i>
                </div>
                <h4 className="font-display font-bold text-sm text-brand-dark leading-tight">{item.number}</h4>
                <p className="text-[7.5px] text-gray-500 font-bold tracking-wider mt-0.5 max-w-[85px] line-clamp-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
