import React from 'react';
import { motion } from 'framer-motion';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, className = '' }) => {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <div
          className={`block w-10 h-5 rounded-full transition-colors duration-300 ${
            checked ? 'bg-brand-cyan' : 'bg-gray-300'
          }`}
        ></div>
        <motion.div
          layout
          initial={false}
          animate={{
            x: checked ? 20 : 2
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute left-0 top-[2px] w-4 h-4 rounded-full bg-white shadow"
        />
      </div>
      {label && <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>}
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
};

export default Toggle;

