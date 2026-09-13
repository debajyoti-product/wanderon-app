import { useNavigate } from 'react-router-dom';

const Trips = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-24 pt-10 bg-gray-50 min-h-screen">
      {/* Header (Same as Categories / Profile) */}
      <div className="px-5 mb-8 flex justify-between items-center">
        <h1 className="font-display font-semibold text-[25.5px] text-gray-900 tracking-tight">Trips</h1>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center px-10 mt-12">
        <img 
          src="/images/empty_suitcase.jpg" 
          alt="Empty suitcase" 
          className="w-48 h-48 object-contain mb-6"
          style={{ mixBlendMode: 'multiply' }}
        />
        
        <p className="text-center text-gray-500 text-[15px] leading-relaxed font-medium max-w-[260px]">
          This looks empty. Book a trip & come back for all the details here
        </p>

        <button 
          onClick={() => navigate('/search')}
          className="mt-8 px-8 py-3 rounded-xl font-bold text-sm text-white shadow-lg active:scale-95 transition-all"
          style={{
            background: 'linear-gradient(115deg, #091a36 0%, #103778 45%, #e69d00 85%, #ffc107 100%)'
          }}
        >
          Explore Trips
        </button>
      </div>
    </div>
  );
};

export default Trips;
