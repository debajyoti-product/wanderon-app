import React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'fomo' | 'filter';
  active?: boolean;
  colorClass?: string;
}

const Chip: React.FC<ChipProps> = ({
  variant = 'filter',
  active = false,
  colorClass = 'bg-brand-cyan text-white',
  className = '',
  children,
  onClick,
  ...props
}) => {
  let classes = '';

  if (variant === 'fomo') {
    classes = `px-2.5 py-0.5 rounded-full font-bold text-[9.5px] uppercase tracking-wider shadow-md ${colorClass} ${className}`;
  } else {
    const activeClasses = active
      ? 'bg-brand-cyan text-white border border-brand-cyan'
      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100';
    classes = `px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeClasses} ${className}`;
  }

  return (
    <span className={classes} onClick={onClick} {...props}>
      {children}
    </span>
  );
};

export default Chip;

