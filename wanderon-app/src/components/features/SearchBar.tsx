import React, { useState } from 'react';
import WhereModal from './WhereModal';
import WhenModal from './WhenModal';

export interface SearchBarProps {
  onSearch: (destination: string, date: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [isWhereOpen, setIsWhereOpen] = useState(false);
  const [isWhenOpen, setIsWhenOpen] = useState(false);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch(destination, date);
  };

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex flex-col @md:flex-row gap-2 ${className}`}>
        <div 
          onClick={() => setIsWhereOpen(true)}
          className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
        >
          <i className="fa-solid fa-location-dot text-brand-cyan text-lg"></i>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Where to?</span>
            <span className={`text-sm font-semibold ${destination ? 'text-brand-dark' : 'text-gray-400'}`}>
              {destination || 'Anywhere'}
            </span>
          </div>
        </div>

        <div className="hidden @md:block w-px bg-gray-200 my-2"></div>
        <div className="@md:hidden h-px bg-gray-200 mx-2"></div>

        <div 
          onClick={() => setIsWhenOpen(true)}
          className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
        >
          <i className="fa-regular fa-calendar text-brand-cyan text-lg"></i>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">When?</span>
            <span className={`text-sm font-semibold ${date ? 'text-brand-dark' : 'text-gray-400'}`}>
              {date || 'Anytime'}
            </span>
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="bg-brand-cyan text-white w-full @md:w-14 h-12 @md:h-auto rounded-xl @md:rounded-xl flex items-center justify-center hover:bg-brand-darkcyan transition-colors shadow-md @md:ml-2"
        >
          <i className="fa-solid fa-magnifying-glass @md:text-lg mr-2 @md:mr-0"></i>
          <span className="@md:hidden font-medium">Search Trips</span>
        </button>
      </div>

      <WhereModal 
        isOpen={isWhereOpen} 
        onClose={() => setIsWhereOpen(false)} 
        onSelect={(dest) => {
          setDestination(dest);
          setIsWhereOpen(false);
        }} 
      />
      
      <WhenModal 
        isOpen={isWhenOpen} 
        onClose={() => setIsWhenOpen(false)} 
        onSelect={(d) => {
          setDate(d);
          setIsWhenOpen(false);
        }} 
      />
    </>
  );
};

export default SearchBar;

