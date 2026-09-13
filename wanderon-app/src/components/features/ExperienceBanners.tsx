import { useRef } from 'react';

type ExperienceBanner = {
  id: string;
  theme: 'lantern' | 'tomorrowland' | 'f1' | 'aurora' | 'techno';
  location: string;
  title: React.ReactNode;
  price: string;
  duration: string;
  image: string;
};

const banners: ExperienceBanner[] = [
  {
    id: 'lantern',
    theme: 'lantern',
    location: 'Thailand',
    title: <span className="font-['Playball'] text-brand-yellow text-[34px] leading-tight drop-shadow-lg block mt-0.5">Lantern Festival</span>,
    price: '74,999',
    duration: '6N/7D',
    image: '/images/lantern_festival.jpg'
  },
  {
    id: 'tomorrowland',
    theme: 'tomorrowland',
    location: 'Thailand',
    title: <span className="font-black text-[24px] text-brand-yellow uppercase tracking-[0.15em] drop-shadow-md block mt-1">Tomorrowland</span>,
    price: '2,29,990',
    duration: '5N/6D',
    image: '/images/tomorrowland_crowd.jpg'
  },
  {
    id: 'f1',
    theme: 'f1',
    location: 'Singapore',
    title: <span className="font-black text-[26.4px] text-brand-yellow uppercase italic tracking-[0.1em] leading-none drop-shadow-md block mt-1.5">GRAND PRIX</span>,
    price: '1,99,990',
    duration: '5N/6D',
    image: '/images/grand_prix_race.jpg'
  },
  {
    id: 'aurora',
    theme: 'aurora',
    location: 'Scandinavia',
    title: <span className="font-['Playball'] text-brand-cyan text-[36px] leading-tight tracking-wide drop-shadow-md block mt-0.5">Northern Lights</span>,
    price: '2,59,990',
    duration: '9N/10D',
    image: '/images/northern_lights_magic.jpg'
  },
  {
    id: 'zamna',
    theme: 'techno',
    location: 'Bali',
    title: <span className="font-black text-[23px] text-brand-yellow uppercase tracking-widest drop-shadow-md block mt-1">Zamna Fest</span>,
    price: '62,999',
    duration: '7N/8D',
    image: '/images/zamna_fest_jungle.jpg'
  }
];

const ExperienceBanners = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full mt-0 mb-5">
      {/* Horizontal Scrollable Rail (Card Layout) */}
      <div 
        ref={scrollRef}
        className="flex justify-start overflow-x-auto hide-scrollbar px-5 pb-4 gap-4 snap-x scroll-pl-5"
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative w-[276px] shrink-0 snap-start h-[210px] overflow-hidden rounded-[1.25rem] shadow-md group select-none"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${banner.image}')` }}
            />
            
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

            {/* Dynamic CSS Animations based on Theme */}
            {banner.theme === 'aurora' && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/40 via-teal-400/20 to-brand-cyan/40 mix-blend-color-dodge animate-[aurora_12s_ease-in-out_infinite_alternate]" style={{ backgroundSize: '200% 200%' }} />
            )}
            
            {banner.theme === 'tomorrowland' && (
              <div className="absolute inset-0 bg-fuchsia-600/30 mix-blend-overlay animate-[pulseGlow_4s_ease-in-out_infinite]" />
            )}

            {banner.theme === 'f1' && (
              <div className="absolute inset-0 overflow-hidden opacity-40">
                <div className="absolute top-[40%] left-0 w-[200px] h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-[speedPan_1s_linear_infinite]" />
                <div className="absolute top-[60%] left-0 w-[300px] h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[speedPan_1.5s_linear_infinite_0.5s]" />
                <div className="absolute top-[75%] left-0 w-[150px] h-1.5 bg-gradient-to-r from-transparent via-white to-transparent animate-[speedPan_0.8s_linear_infinite_0.2s]" />
              </div>
            )}

            {banner.theme === 'lantern' && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-[15%] w-4 h-4 bg-orange-400 rounded-full blur-[2px] animate-[floatUp_6s_linear_infinite]" />
                <div className="absolute bottom-0 left-[45%] w-5 h-5 bg-yellow-300 rounded-full blur-[3px] animate-[floatUp_8s_linear_infinite_2s]" />
                <div className="absolute bottom-0 left-[75%] w-3 h-3 bg-orange-300 rounded-full blur-[1px] animate-[floatUp_5s_linear_infinite_1s]" />
                <div className="absolute bottom-0 left-[85%] w-6 h-6 bg-yellow-500 rounded-full blur-[4px] animate-[floatUp_9s_linear_infinite_0.5s]" />
              </div>
            )}

            {banner.theme === 'techno' && (
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 via-red-500/10 to-transparent mix-blend-color-dodge animate-[technoPulse_1.5s_ease-in-out_infinite_alternate]" />
            )}

            {/* Content Container */}
            <div className="relative z-10 w-full h-full">
              
              {/* Center Text */}
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-full px-4">
                <span className="font-bold text-white/90 text-[11.4px] uppercase tracking-[0.2em] drop-shadow-md">{banner.location}</span>
                {banner.title}
              </div>

              {/* Glassmorphic Price Pill */}
              <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2">
                <div className="border border-white/30 px-[18px] py-1.5 backdrop-blur-md bg-black/30 rounded-full shadow-lg whitespace-nowrap flex items-center justify-center">
                  <span className="text-white text-[8.3px] font-medium tracking-wide uppercase flex items-center justify-center gap-1 leading-none">
                    <span>starts from</span>
                    <span className="text-brand-yellow font-bold text-[10px]">₹{banner.price}/-</span>
                    <span>per person</span>
                    <span className="opacity-75 mx-0.5">•</span>
                    <span className="font-bold text-[8.8px]">{banner.duration}</span>
                  </span>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceBanners;
