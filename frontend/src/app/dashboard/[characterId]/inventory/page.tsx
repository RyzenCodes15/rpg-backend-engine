'use client';

import { useEffect, useState } from 'react';
import { Inventory, getInventory } from '@/lib/api/inventory';
import { InventoryGrid } from '@/components/inventory/InventoryGrid';

export default function CharacterInventoryPage({ params }: { params: { characterId: string } }) {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInv = async () => {
      try {
        const data = await getInventory(params.characterId);
        setInventory(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load inventory');
      } finally {
        setLoading(false);
      }
    };
    fetchInv();
  }, [params.characterId]);

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
    <div className="max-w-4xl mx-auto">
      <InventoryGrid inventory={inventory} onItemClick={() => {}} />
    </div>
  );
}
