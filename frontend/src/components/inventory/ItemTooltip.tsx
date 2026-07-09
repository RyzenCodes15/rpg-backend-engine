import React from 'react';
import { Item } from '@/lib/api/inventory';
import Image from 'next/image';
import { getItemIconPath } from '@/lib/itemUtils';

interface ItemTooltipProps {
  item: Item;
  children: React.ReactNode;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({ item, children }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'COMMON': return 'text-white';
      case 'UNCOMMON': return 'text-green-400';
      case 'RARE': return 'text-blue-400';
      case 'EPIC': return 'text-purple-400';
      case 'LEGENDARY': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="relative group inline-block h-full w-full">
      {children}
      <div className="absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-rpg-bg border-4 border-rpg-border pixel-border p-4 pointer-events-none">
        
        {/* Title & Rarity */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 relative bg-rpg-surface border-2 border-rpg-border pixel-border shrink-0">
            <Image src={getItemIconPath(item)} alt={item.name} fill className="object-contain pixelated p-1" />
          </div>
          <h4 className={`font-pixel text-sm drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] ${getRarityColor(item.rarity)}`}>{item.name}</h4>
        </div>
        <p className="text-sm font-retro text-rpg-text mb-2 border-b-2 border-rpg-border pb-2">
          {item.category} • Lvl {item.requiredLevel}
        </p>
        
        {/* Description */}
        {item.description && (
          <p className="text-lg font-retro text-slate-300 italic mb-4 pb-2 border-b-2 border-rpg-border leading-tight">
            &quot;{item.description}&quot;
          </p>
        )}
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-retro text-lg mb-4">
          {item.stats.bonusAttack > 0 && <div><span className="text-rpg-text">ATK:</span> <span className="text-red-400 font-bold">+{item.stats.bonusAttack}</span></div>}
          {item.stats.bonusDefense > 0 && <div><span className="text-rpg-text">DEF:</span> <span className="text-blue-400 font-bold">+{item.stats.bonusDefense}</span></div>}
          {item.stats.bonusHealth > 0 && <div><span className="text-rpg-text">HP:</span> <span className="text-green-400 font-bold">+{item.stats.bonusHealth}</span></div>}
          {item.stats.bonusMana > 0 && <div><span className="text-rpg-text">MP:</span> <span className="text-blue-300 font-bold">+{item.stats.bonusMana}</span></div>}
          {item.stats.bonusSpeed > 0 && <div><span className="text-rpg-text">SPD:</span> <span className="text-yellow-400 font-bold">+{item.stats.bonusSpeed}</span></div>}
          {item.stats.bonusCriticalChance > 0 && <div><span className="text-rpg-text">CRIT:</span> <span className="text-purple-400 font-bold">+{item.stats.bonusCriticalChance}%</span></div>}
        </div>
        
        {/* Value */}
        <div className="flex justify-between items-center font-retro text-xl pt-2 border-t-2 border-rpg-border">
          <span className="text-rpg-text">Value</span>
          <span className="text-yellow-400 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">{item.value}g</span>
        </div>
        
        {/* Triangle Pointer */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-rpg-border"></div>
      </div>
    </div>
  );
};
