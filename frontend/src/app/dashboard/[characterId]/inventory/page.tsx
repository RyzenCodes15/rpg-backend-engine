'use client';

import { useEffect, useState, useCallback } from 'react';
import { Inventory, getInventory, InventorySlot } from '@/lib/api/inventory';
import { equipItem, EquipmentSlot } from '@/lib/api/equipment';
import { InventoryGrid } from '@/components/inventory/InventoryGrid';
import { useRouter } from 'next/navigation';

export default function CharacterInventoryPage({ params }: { params: { characterId: string } }) {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchInv = useCallback(async () => {
    try {
      const data = await getInventory(params.characterId);
      setInventory(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  }, [params.characterId]);

  useEffect(() => {
    fetchInv();
  }, [fetchInv]);

  const handleEquip = async (slot: InventorySlot) => {
    if (!slot) return;
    
    const item = slot.item;
    const category = item.category;
    
    if (category === 'CONSUMABLE') {
      try {
        await import('@/lib/api/inventory').then(m => m.useItem(params.characterId, slot.id));
        alert(`Used ${item.name}!`);
        fetchInv();
        router.refresh();
      } catch (err: any) {
        alert(err.message || 'Failed to use item');
      }
      return;
    }

    const isEquippable = ['WEAPON', 'HELMET', 'CHEST_ARMOR', 'GLOVES', 'BOOTS'].includes(category);
    
    if (!isEquippable) {
      alert(`Cannot equip ${category}`);
      return;
    }

    try {
      await equipItem(params.characterId, category as EquipmentSlot, item.id);
      alert('Item equipped successfully!');
      router.refresh();
      router.push(`/dashboard/${params.characterId}/equipment`);
    } catch (err: any) {
      alert(err.message || 'Failed to equip item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="font-pixel text-rpg-primary animate-pulse text-xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Loading Inventory...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rpg-error/20 border-4 border-rpg-error text-rpg-error p-6 font-retro text-2xl pixel-border text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Inventory</h2>
          <p className="text-sm text-gray-400 font-pixel mt-2">Click an item to equip or use it.</p>
        </div>
      </div>
      <InventoryGrid inventory={inventory} onItemClick={handleEquip} />
    </div>
  );
}
