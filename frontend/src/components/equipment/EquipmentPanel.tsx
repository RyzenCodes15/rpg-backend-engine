import React from 'react';
import { Equipment, EquipmentSlot } from '@/lib/api/equipment';
import { Item } from '@/lib/api/inventory';
import { ItemTooltip } from '../inventory/ItemTooltip';
import { ItemIcon } from '../ui/ItemIcon';

interface EquipmentPanelProps {
  equipment: Equipment | null;
  onUnequip?: (slot: EquipmentSlot) => void;
}

export const EquipmentPanel: React.FC<EquipmentPanelProps> = ({ equipment, onUnequip }) => {
  if (!equipment) {
    return <div className="animate-pulse bg-rpg-surface border-4 border-rpg-border rounded-none h-96 pixel-border"></div>;
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'COMMON': return 'border-white';
      case 'UNCOMMON': return 'border-green-500';
      case 'RARE': return 'border-blue-500';
      case 'EPIC': return 'border-purple-500';
      case 'LEGENDARY': return 'border-yellow-400';
      default: return 'border-rpg-border';
    }
  };

  const renderSlot = (label: string, slotType: EquipmentSlot, item: Item | null) => (
    <div className="flex flex-col items-center">
      <span className="font-pixel text-[10px] text-rpg-text drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] mb-2">{label}</span>
      <div 
        className={`
          w-16 h-16 md:w-20 md:h-20 bg-rpg-bg flex items-center justify-center relative transition-colors pixel-border border-4
          ${item ? 'cursor-pointer ' + getRarityBorder(item.rarity) : 'border-rpg-border border-dashed opacity-50'}
        `}
        onClick={() => item && onUnequip && onUnequip(slotType)}
      >
        {item ? (
          <ItemTooltip item={item}>
            <div className="w-full h-full flex items-center justify-center p-2">
              <div className="relative w-full h-full">
                <ItemIcon item={item} className="w-full h-full drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
              </div>
            </div>
          </ItemTooltip>
        ) : (
          <div className="relative w-full h-full opacity-30">
            <ItemIcon item={{ name: slotType, category: slotType } as any} className="w-full h-full p-3 opacity-30 grayscale" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-rpg-surface border-4 border-rpg-border p-8 pixel-border relative overflow-hidden h-full flex flex-col">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%' }}></div>
      
      <h3 className="text-xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-8 text-center border-b-4 border-rpg-border pb-4 relative z-10">
        Equipped Gear
      </h3>
      
      {/* Paper doll layout */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8 relative z-10">
        {/* Head & Neck */}
        <div className="flex gap-16 w-full justify-center items-end">
          {renderSlot('Cape', 'CAPE', equipment.cape)}
          {renderSlot('Helmet', 'HELMET', equipment.helmet)}
          {renderSlot('Amulet', 'AMULET', equipment.amulet)}
        </div>
        
        {/* Upper Body */}
        <div className="flex gap-16 w-full justify-center items-center">
          {renderSlot('Weapon', 'WEAPON', equipment.weapon)}
          {renderSlot('Chest', 'CHEST_ARMOR', equipment.chestArmor)}
          {renderSlot('Shield', 'SHIELD', equipment.shield)}
        </div>
        
        {/* Hands */}
        <div className="flex gap-24 w-full justify-center items-center">
          {renderSlot('Gloves', 'GLOVES', equipment.gloves)}
          {renderSlot('Ring', 'RING', equipment.ring)}
        </div>

        {/* Lower Body */}
        <div className="flex gap-16 w-full justify-center items-start">
          {renderSlot('Legs', 'LEG_ARMOR', equipment.legArmor)}
          {renderSlot('Boots', 'BOOTS', equipment.boots)}
        </div>
      </div>
    </div>
  );
};
