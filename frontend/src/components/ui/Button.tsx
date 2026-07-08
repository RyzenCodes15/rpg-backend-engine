import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'font-pixel text-xs sm:text-sm uppercase py-3 px-6 pixel-border transition-transform active:translate-y-1';
  
  const variants = {
    primary: 'bg-rpg-primary hover:bg-rpg-primaryHover text-white',
    secondary: 'bg-rpg-surface hover:bg-rpg-border text-rpg-text',
    danger: 'bg-rpg-error hover:bg-red-600 text-white',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};
