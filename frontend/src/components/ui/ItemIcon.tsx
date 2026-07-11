import React from 'react';
import { Item } from '@/lib/api/inventory';
import { Sword, Shield, FlaskConical, Gem, Box, Axe, Shirt, Crown, Footprints } from 'lucide-react';
import { getItemCategoryFallback } from '@/lib/itemUtils';

interface ItemIconProps {
  item: Item | string | null;
  alt?: string;
  className?: string;
  size?: number;
}

export const ItemIcon: React.FC<ItemIconProps> = ({ item, alt, className = '', size = 64 }) => {
  const itemName = typeof item === 'string' ? item : (item?.name || 'Unknown Item');
  const finalAlt = alt || itemName;
  
  const category = getItemCategoryFallback(item);
  let IconComponent = Box; // Default generic icon
  
  switch (category) {
    case 'weapon':
      IconComponent = itemName.toLowerCase().includes('axe') ? Axe : Sword;
      break;
    case 'armor':
      if (itemName.toLowerCase().includes('helmet') || itemName.toLowerCase().includes('crown') || itemName.toLowerCase().includes('cap')) {
        IconComponent = Crown;
      } else if (itemName.toLowerCase().includes('boots') || itemName.toLowerCase().includes('shoes')) {
        IconComponent = Footprints;
      } else {
        IconComponent = itemName.toLowerCase().includes('shirt') ? Shirt : Shield;
      }
      break;
    case 'consumable':
      IconComponent = FlaskConical;
      break;
    case 'material':
      IconComponent = Gem;
      break;
  }

  // Determine rarity colors
  const rarity = typeof item !== 'string' && item?.rarity ? item.rarity : 'COMMON';
  let rarityColorClass = 'text-gray-300';
  let rarityBgClass = 'bg-gray-800 border-gray-600';
  
  if (rarity === 'RARE') {
    rarityColorClass = 'text-blue-400';
    rarityBgClass = 'bg-blue-900/30 border-blue-500';
  } else if (rarity === 'LEGENDARY') {
    rarityColorClass = 'text-orange-400';
    rarityBgClass = 'bg-orange-900/30 border-orange-500';
  }
  
  return (
    <div 
      className={`flex items-center justify-center border-2 pixel-border ${rarityBgClass} ${className}`}
      style={{ width: size, height: size }}
      title={finalAlt}
    >
      <IconComponent size={size * 0.6} className={`${rarityColorClass} drop-shadow-md`} />
    </div>
  );
};
