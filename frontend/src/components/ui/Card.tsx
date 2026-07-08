import React from 'react';

export const Card: React.FC<{children: React.ReactNode, title?: string, className?: string}> = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-rpg-surface border-4 border-rpg-border pixel-border p-6 shadow-xl ${className}`}>
      {title && (
        <h2 className="font-pixel text-xl text-center text-rpg-primary mb-6 uppercase tracking-wider">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
