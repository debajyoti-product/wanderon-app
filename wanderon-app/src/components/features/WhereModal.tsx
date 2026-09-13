import React, { useState } from 'react';
import Modal from '../ui/Modal';

export interface WhereModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (destination: string) => void;
}

const destinations = [
  { id: 'india', name: 'India', icon: '🇮🇳' },
  { id: 'bali', name: 'Bali', icon: '🏝️' },
  { id: 'dubai', name: 'Dubai', icon: '🐪' },
  { id: 'europe', name: 'Europe', icon: '🏰' },
  { id: 'thailand', name: 'Thailand', icon: '🇹🇭' },
  { id: 'vietnam', name: 'Vietnam', icon: '🇻🇳' },
];

const WhereModal: React.FC<WhereModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState('');

  const filtered = destinations.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-6">
        <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">Where to?</h2>
        
        <div className="relative mb-8">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 @md:grid-cols-3 gap-4">
            {filtered.map(dest => (
              <div
                key={dest.id}
                onClick={() => onSelect(dest.name)}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-brand-cyan hover:shadow-md cursor-pointer transition-all bg-white group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-sky flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {dest.icon}
                </div>
                <span className="font-medium text-brand-dark">{dest.name}</span>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-500">No destinations found matching "{search}"</div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WhereModal;

