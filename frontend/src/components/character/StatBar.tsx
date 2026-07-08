import React from 'react';

interface StatBarProps {
  label: string;
  current: number;
  max: number;
  color: 'red' | 'blue' | 'yellow' | 'green';
}

const colorMap = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-400',
  green: 'bg-green-500',
};

export const StatBar: React.FC<StatBarProps> = ({ label, current, max, color }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  // Stepped percentage for retro feel
  const steps = 20; // 5% increments
  const steppedPercentage = Math.round((percentage / 100) * steps) * (100 / steps);

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="w-12 font-pixel text-xs text-rpg-text drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">{label}</span>
      <div className="flex-1 h-6 bg-rpg-bg border-4 border-rpg-border relative overflow-hidden pixel-border">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px)', backgroundSize: '5% 100%' }}></div>
        <div 
          className={`h-full ${colorMap[color]} transition-all duration-300 ease-linear`}
          style={{ width: `${steppedPercentage}%` }}
        />
      </div>
      <span className="w-20 text-right font-retro text-xl text-white">
        {current}/{max}
      </span>
    </div>
  );
};
