import React from 'react';
import { Inventory, InventorySlot as Slot, Item } from '@/lib/api/inventory';
import { ItemTooltip } from './ItemTooltip';

interface InventoryGridProps {
  inventory: Inventory | null;
  onItemClick?: (item: Item) => void;
}

export const InventoryGrid: React.FC<InventoryGridProps> = ({ inventory, onItemClick }) => {
  if (!inventory) {
    return <div className="animate-pulse bg-rpg-surface border-4 border-rpg-border rounded-none h-64 pixel-border"></div>;
  }

  // Create an array of exactly capacity size
  const gridSlots = Array.from({ length: inventory.capacity }, (_, i) => {
    return inventory.slots.find(s => s.slotIndex === i) || null;
  });

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'COMMON': return 'border-white hover:border-slate-300';
      case 'UNCOMMON': return 'border-green-500 hover:border-green-300';
      case 'RARE': return 'border-blue-500 hover:border-blue-300';
      case 'EPIC': return 'border-purple-500 hover:border-purple-300';
      case 'LEGENDARY': return 'border-yellow-400 hover:border-yellow-200';
      default: return 'border-rpg-border hover:border-rpg-text';
    }
  };

  return (
    <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border h-full">
      <div className="flex justify-between items-end mb-6 border-b-4 border-rpg-border pb-4">
        <h3 className="text-xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Bag</h3>
        <span className="font-retro text-2xl text-rpg-text">{inventory.slots.length} / {inventory.capacity}</span>
      </div>
      
      <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {gridSlots.map((slot, index) => (
          <div 
            key={index}
            className={`
              aspect-square bg-rpg-bg flex items-center justify-center relative transition-colors pixel-border border-4
              ${slot ? 'cursor-pointer ' + getRarityBorder(slot.item.rarity) : 'border-rpg-border/50'}
            `}
            onClick={() => slot && onItemClick && onItemClick(slot.item)}
          >
            {slot ? (
              <ItemTooltip item={slot.item}>
                <div className="w-full h-full flex items-center justify-center">
                  {/* Item Icon Placeholder */}
                  <div className="text-sm md:text-base font-pixel text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                    {slot.item.name.substring(0, 1).toUpperCase()}
                  </div>
                  
                  {/* Quantity Badge */}
                  {slot.quantity > 1 && (
                    <span className="absolute -bottom-2 -right-2 bg-rpg-bg text-white font-retro text-sm px-1 border-2 border-rpg-border pixel-border drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                      x{slot.quantity}
                    </span>
                  )}
                </div>
              </ItemTooltip>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
