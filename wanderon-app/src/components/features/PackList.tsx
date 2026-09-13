import React, { useState } from 'react';
import TabGroup from '../ui/TabGroup';
import type { PackCategory } from '../../data/types';

export interface PackListProps {
  categories: PackCategory[];
  className?: string;
}

const PackList: React.FC<PackListProps> = ({ categories, className = '' }) => {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || '');

  const activeCategory = categories.find(c => c.id === activeTab);

  const tabs = categories.map(c => ({
    id: c.id,
    label: c.label
  }));

  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-6 ${className}`}>
      <TabGroup 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        className="mb-6"
      />
      
      {activeCategory && (
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-y-3 gap-x-8">
          {activeCategory.items.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5">
                <i className="fa-solid fa-circle-check text-brand-cyan"></i>
              </div>
              <span className="text-gray-700 text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackList;

