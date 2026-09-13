import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  hover = false,
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-[2rem] shadow-soft border border-gray-100';
  const hoverClasses = hover ? 'hover:-translate-y-2 hover:shadow-float transition-all duration-500 cursor-pointer' : '';
  
  const paddingClasses = {
    none: '',
    sm: 'p-3.5',
    md: 'p-6',
    lg: 'p-8'
  };

  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;


