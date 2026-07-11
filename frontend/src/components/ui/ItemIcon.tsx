import React, { useState } from 'react';
import Image from 'next/image';
import { Item } from '@/lib/api/inventory';
import { Sword, Shield, FlaskConical, Gem, Scroll, Map, Box, Axe, Shirt } from 'lucide-react';
import { getItemIconPath, getItemCategoryFallback } from '@/lib/itemUtils';

interface ItemIconProps {
  item: Item | string | null;
  alt?: string;
  className?: string;
  size?: number;
}

export const ItemIcon: React.FC<ItemIconProps> = ({ item, alt, className = '', size = 64 }) => {
  const [imageError, setImageError] = useState(false);
  const imagePath = getItemIconPath(item);
  
  const itemName = typeof item === 'string' ? item : (item?.name || 'Unknown Item');
  const finalAlt = alt || itemName;
  
  // Try to use the image first, but if it's missing or imageError is true, fallback to a lucide-react icon
  const useFallback = imageError || imagePath.includes('/placeholders/');
  
  if (useFallback) {
    const fallbackCategory = getItemCategoryFallback(item);
    let FallbackIcon = Box; // Default generic icon
    
    switch (fallbackCategory) {
      case 'weapon':
        FallbackIcon = itemName.toLowerCase().includes('axe') ? Axe : Sword;
        break;
      case 'armor':
        FallbackIcon = itemName.toLowerCase().includes('shirt') ? Shirt : Shield;
        break;
      case 'consumable':
        FallbackIcon = FlaskConical;
        break;
      case 'material':
        FallbackIcon = Gem;
        break;
      case 'quest':
        FallbackIcon = Map;
        break;
      case 'scroll':
        FallbackIcon = Scroll;
        break;
    }
    
    return (
      <div 
        className={`flex items-center justify-center bg-black/40 border-2 border-rpg-border pixel-border ${className}`}
        style={{ width: size, height: size }}
        title={finalAlt}
      >
        <FallbackIcon size={size * 0.5} className="text-gray-400 drop-shadow-md" />
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} title={finalAlt}>
      <Image 
        src={imagePath}
        alt={finalAlt}
        fill
        sizes={`${size}px`}
        className="object-contain pixelated"
        onError={() => setImageError(true)}
        unoptimized
      />
    </div>
  );
};
