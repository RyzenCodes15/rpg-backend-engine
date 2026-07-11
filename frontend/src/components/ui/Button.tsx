import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'font-pixel text-xs sm:text-sm uppercase py-3 px-6 pixel-border disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center transition-colors';
  
  const variants = {
    primary: 'bg-rpg-primary hover:bg-rpg-primaryHover text-white shadow-[0_0_10px_rgba(200,75,49,0)] hover:shadow-[0_0_15px_rgba(200,75,49,0.5)]',
    secondary: 'bg-rpg-surface hover:bg-rpg-border text-rpg-text shadow-[0_0_10px_rgba(45,45,61,0)] hover:shadow-[0_0_15px_rgba(75,75,102,0.5)]',
    danger: 'bg-rpg-error hover:bg-red-600 text-white shadow-[0_0_10px_rgba(255,82,82,0)] hover:shadow-[0_0_15px_rgba(255,82,82,0.5)]',
  };

  return (
    <motion.button 
      whileHover={{ scale: props.disabled ? 1 : 1.05 }}
      whileTap={{ scale: props.disabled ? 1 : 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props as any}
    >
      {children}
    </motion.button>
  );
};
