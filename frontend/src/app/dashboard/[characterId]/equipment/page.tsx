'use client';

import { useEffect, useState } from 'react';
import { Equipment, getEquipment, unequipItem } from '@/lib/api/equipment';
import { EquipmentPanel } from '@/components/equipment/EquipmentPanel';

export default function CharacterEquipmentPage({ params }: { params: { characterId: string } }) {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEq = async () => {
    try {
      const data = await getEquipment(params.characterId);
      setEquipment(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load equipment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEq();
  }, [params.characterId]);

  const handleUnequip = async (slot: any) => {
    try {
      await unequipItem(params.characterId, slot);
      await fetchEq();
    } catch (err: any) {
      alert(err.message || 'Failed to unequip item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="font-pixel text-rpg-primary animate-pulse text-xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Loading Equipment...
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
      <EquipmentPanel equipment={equipment} onUnequip={handleUnequip} />
    </div>
  );
}
