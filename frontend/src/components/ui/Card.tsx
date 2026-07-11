import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  animate?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '', animate = true }) => {
  const innerContent = (
    <>
      {title && (
        <h2 className="font-pixel text-xl text-center text-rpg-primary mb-6 uppercase tracking-wider">
          {title}
        </h2>
      )}
      {children}
    </>
  );

  const baseClassName = `bg-rpg-surface border-4 border-rpg-border pixel-border p-6 shadow-xl ${className}`;

  if (animate) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={baseClassName}
      >
        {innerContent}
      </motion.div>
    );
  }

  return (
    <div className={baseClassName}>
      {innerContent}
    </div>
  );
};
