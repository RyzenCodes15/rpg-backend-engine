import React from 'react';
import { Item } from '@/lib/api/inventory';
import { Sword, Shield, FlaskConical, Gem, Box, Axe, Shirt, Crown, Footprints, Bone, Sparkles, Wand2 } from 'lucide-react';
import { getItemCategoryFallback } from '@/lib/itemUtils';

interface ItemIconProps {
  item: Item | string | null;
  alt?: string;
  className?: string;
  size?: number;
}

// Custom High-Quality Fantasy Tooth Icon for Legendary Orc Tooth
const OrcToothIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer gold/orange aura glow */}
    <path d="M22 6C22 6 12 24 14 44C16 60 32 62 32 62C32 62 48 60 50 44C52 24 42 6 42 6C42 6 36 12 32 12C28 12 22 6 22 6Z" fill="rgba(249, 115, 22, 0.25)" />
    {/* Bone Tooth Root and Enamel Main Body */}
    <path d="M24 10C24 10 16 26 18 44C19.5 57 32 58 32 58C32 58 44.5 57 46 44C48 26 40 10 40 10C40 10 35 15 32 15C29 15 24 10 24 10Z" fill="#FDF6E3" stroke="#9A7B56" strokeWidth="3" strokeLinejoin="round" />
    {/* Inner ivory shading & contours */}
    <path d="M32 15C32 15 36 26 36 42C36 50 32 56 32 56" stroke="#D3C5A9" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 24C26 34 26 46 28 53" stroke="#E6DCC3" strokeWidth="2" strokeLinecap="round" />
    {/* Sharp battle chips / cracks in the ancient tooth */}
    <path d="M38 28L43 31L39 36" stroke="#8C6D46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 38L27 40L24 45" stroke="#8C6D46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Glowing mana infusion runes at the base */}
    <circle cx="32" cy="46" r="3.5" fill="#38BDF8" className="animate-pulse" />
    <path d="M32 39V42.5M27 46H28.5M35.5 46H37" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Custom Polished Fantasy Sword Icon for Legendary Shiny Sword
const ShinySwordIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Golden/Orange aura glow */}
    <path d="M12 52L52 12L56 16L16 56L12 52Z" fill="rgba(249, 115, 22, 0.2)" />
    {/* Pommel and Grip */}
    <circle cx="14" cy="50" r="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
    <path d="M17 47L23 41" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
    <path d="M17 47L23 41" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    {/* Ornate Crossguard with Sapphire Jewel */}
    <path d="M16 36L28 48L30 46L18 34L16 36Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="23" cy="41" r="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
    {/* Polished Mythril Blade */}
    <path d="M25 39L49 15L53 11L49 15L39 25Z" fill="#E2E8F0" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
    <path d="M26 38L52 12L54 14L28 40L26 38Z" fill="#F8FAFC" />
    {/* Center fuller edge and radiant star glint */}
    <path d="M28 36L48 16" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M44 14L46 8L48 14L54 16L48 18L46 24L44 18L38 16L44 14Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="0.8" />
  </svg>
);

export const ItemIcon: React.FC<ItemIconProps> = ({ item, alt, className = '', size = 64 }) => {
  const itemName = typeof item === 'string' ? item : (item?.name || 'Unknown Item');
  const finalAlt = alt || itemName;
  
  const category = getItemCategoryFallback(item);
  let IconComponent = Box; // Default generic icon
  
  if (itemName.toLowerCase().includes('tooth') || itemName === 'Orc Tooth') {
    // Handled below via custom SVG
  } else if (itemName.toLowerCase().includes('shiny sword')) {
    // Handled below via custom SVG
  } else {
    switch (category) {
      case 'weapon':
        if (itemName.toLowerCase().includes('axe')) IconComponent = Axe;
        else if (itemName.toLowerCase().includes('wand') || itemName.toLowerCase().includes('staff')) IconComponent = Wand2;
        else IconComponent = Sword;
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
        if (itemName.toLowerCase().includes('bone')) IconComponent = Bone;
        else if (itemName.toLowerCase().includes('ear') || itemName.toLowerCase().includes('pelt')) IconComponent = Sparkles;
        else IconComponent = Gem;
        break;
    }
  }

  // Determine rarity colors and borders
  const isKnownLegendary = itemName === 'Orc Tooth' || itemName === 'Shiny Sword';
  const rarity = typeof item !== 'string' && item?.rarity ? item.rarity : (isKnownLegendary ? 'LEGENDARY' : 'COMMON');
  let rarityColorClass = 'text-gray-300';
  let rarityBgClass = 'bg-gray-800/80 border-gray-600';
  
  if (rarity === 'RARE') {
    rarityColorClass = 'text-blue-400';
    rarityBgClass = 'bg-blue-950/60 border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]';
  } else if (rarity === 'LEGENDARY') {
    rarityColorClass = 'text-orange-400';
    rarityBgClass = 'bg-orange-950/70 border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.45)]';
  }
  
  const isWFull = className.includes('w-full') || className.includes('h-full');

  return (
    <div 
      className={`flex items-center justify-center border-2 pixel-border p-1.5 overflow-hidden transition-all duration-200 ${rarityBgClass} ${className}`}
      style={!isWFull && size ? { width: size, height: size } : undefined}
      title={finalAlt}
    >
      {itemName === 'Orc Tooth' ? (
        <OrcToothIcon className="w-[88%] h-[88%] max-w-full max-h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] shrink-0" />
      ) : itemName === 'Shiny Sword' ? (
        <ShinySwordIcon className="w-[88%] h-[88%] max-w-full max-h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] shrink-0" />
      ) : (
        <IconComponent className={`w-[82%] h-[82%] max-w-full max-h-full object-contain shrink-0 ${rarityColorClass} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`} />
      )}
    </div>
  );
};
