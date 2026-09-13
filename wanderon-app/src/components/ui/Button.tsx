import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  fullWidth,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-300';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-brand-dark text-white rounded-full shadow-lg hover:shadow-xl hover:bg-brand-cyan hover:-translate-y-0.5',
    secondary: 'bg-white text-brand-cyan border-2 border-brand-cyan rounded-full hover:bg-brand-cyan hover:text-white',
    ghost: 'bg-transparent text-brand-dark hover:text-brand-cyan'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;

  if (href) {
    return (
      <MotionLink to={href} className={classes} whileTap={{ scale: 0.95 }}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button className={classes} whileTap={{ scale: 0.95 }} {...(props as any)}>
      {children}
    </motion.button>
  );
};

export default Button;



