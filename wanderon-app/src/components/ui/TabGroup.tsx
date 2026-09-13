import React from 'react';
import Chip from './Chip';

export interface Tab {
  id: string;
  label: string;
}

export interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`flex gap-2 overflow-x-auto hide-scrollbar pb-2 ${className}`}>
      {tabs.map((tab) => (
        <Chip
          key={tab.id}
          variant="filter"
          active={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className="whitespace-nowrap"
        >
          {tab.label}
        </Chip>
      ))}
    </div>
  );
};

export default TabGroup;

