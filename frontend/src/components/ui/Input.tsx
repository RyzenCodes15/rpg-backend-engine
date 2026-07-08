import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="font-pixel text-xs text-rpg-text">{label}</label>
        <input
          ref={ref}
          className={`
            bg-rpg-bg border-2 border-rpg-border p-3 font-retro text-lg text-white 
            focus:outline-none focus:border-rpg-primary transition-colors
            ${error ? 'border-rpg-error' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="font-retro text-sm text-rpg-error">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
