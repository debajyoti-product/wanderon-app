import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-24 pt-10 bg-white min-h-screen">
      <div className="px-5 mb-8 flex justify-between items-center">
        <h1 className="font-display font-semibold text-[25.5px] text-gray-900 tracking-tight">Categories</h1>
      </div>

      <div className="px-5">
        {/* Trips */}
        <div className="mb-10">
          <h2 className="font-display font-semibold text-[18px] text-gray-900 uppercase tracking-wide text-left mb-4">
            TRIPS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/search?category=group')} 
              className="bg-white rounded-[1.25rem] p-4 flex flex-col items-center text-center border border-gray-100 shadow-sm active:scale-95 transition-transform"
            >
              <img src="/images/group_trips.jpg" alt="Group Trips" className="w-[69px] h-[69px] object-cover mb-3" />
              <h4 className="font-display font-semibold text-[15px] text-gray-800 leading-tight">Group<br/>Trips</h4>
            </button>
            <button 
              onClick={() => navigate('/search?category=corporate')} 
              className="bg-white rounded-[1.25rem] p-4 flex flex-col items-center text-center border border-gray-100 shadow-sm active:scale-95 transition-transform"
            >
              <img src="/images/corporate_tours.jpg" alt="Corporate Tours" className="w-[69px] h-[69px] object-cover mb-3" />
              <h4 className="font-display font-semibold text-[15px] text-gray-800 leading-tight">Corporate<br/>Tours</h4>
            </button>
          </div>
        </div>

        {/* Packages */}
        <div className="mb-8">
          <h2 className="font-display font-semibold text-[18px] text-gray-900 uppercase tracking-wide text-left mb-4">
            PACKAGES
          </h2>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/search?category=family')} 
              className="w-full flex items-center px-4 py-3 rounded-2xl active:scale-95 transition-transform bg-white border border-gray-100 shadow-sm"
            >
              <img src="/images/family_packages_nodog.jpg" alt="Family" className="w-[55px] h-[55px] object-cover mr-4 shrink-0 rounded-full" />
              <h4 className="font-display font-semibold text-[15px] text-gray-800 tracking-wide">Family</h4>
              <i className="fa-solid fa-chevron-right ml-auto text-gray-400/70 text-sm"></i>
            </button>
            
            <button 
              onClick={() => navigate('/search?category=couples')} 
              className="w-full flex items-center px-4 py-3 rounded-2xl active:scale-95 transition-transform bg-white border border-gray-100 shadow-sm"
            >
              <img src="/images/couples_packages_pixar.jpg" alt="Couples" className="w-[55px] h-[55px] object-cover mr-4 shrink-0 rounded-full" />
              <h4 className="font-display font-semibold text-[15px] text-gray-800 tracking-wide">Couples</h4>
              <i className="fa-solid fa-chevron-right ml-auto text-gray-400/70 text-sm"></i>
            </button>
            
            <button 
              onClick={() => navigate('/search?category=custom')} 
              className="w-full flex items-center px-4 py-3 rounded-2xl active:scale-95 transition-transform bg-white border border-gray-100 shadow-sm"
            >
              <img src="/images/custom_packages_pixar.jpg" alt="Custom" className="w-[55px] h-[55px] object-cover mr-4 shrink-0 rounded-full" />
              <h4 className="font-display font-semibold text-[15px] text-gray-800 tracking-wide">Custom</h4>
              <i className="fa-solid fa-chevron-right ml-auto text-gray-400/70 text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
