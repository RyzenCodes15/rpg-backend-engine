'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Character, getCharacter, deleteCharacter, addExperience } from '@/lib/api/character';
import { addTestItem } from '@/lib/api/inventory';
import { combatApi, CombatHistoryResponse } from '@/lib/api/combat';
import { getEquipment, Equipment } from '@/lib/api/equipment';
import { StatBar } from '@/components/character/StatBar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function CharacterDashboardPage({ params }: { params: { characterId: string } }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [recentCombat, setRecentCombat] = useState<CombatHistoryResponse | null>(null);
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [charData, historyData, eqData] = await Promise.all([
        getCharacter(params.characterId),
        combatApi.getHistory(params.characterId).catch(() => []),
        getEquipment(params.characterId).catch(() => null)
      ]);
      setCharacter(charData);
      setEquipment(eqData);
      if (historyData && historyData.length > 0) {
        setRecentCombat(historyData[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.characterId]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this character forever?')) {
      try {
        await deleteCharacter(params.characterId);
        alert('Character deleted successfully.');
        router.refresh();
        router.push('/dashboard/select');
      } catch (err: any) {
        alert('Failed to delete character');
      }
    }
  };

  const handleAddXP = async () => {
    try {
      await addExperience(params.characterId, 1000);
      alert('1000 XP added (Dev)!');
      fetchData();
    } catch (err: any) {
      alert('Failed to add XP: ' + err.message);
    }
  };

  const handleAddItem = async () => {
    const itemId = prompt('Enter Item ID (UUID) to add:');
    if (!itemId) return;
    try {
      await addTestItem(params.characterId, itemId, 1);
      alert('Item added (Dev)!');
    } catch (err: any) {
      alert('Failed to add item: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="font-pixel text-rpg-primary animate-pulse text-xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Loading Hero Details...
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="bg-rpg-error/20 border-4 border-rpg-error text-rpg-error p-6 font-retro text-2xl pixel-border text-center">
        {error || 'Character not found'}
      </div>
    );
  }

  const expToNextLevel = character.level * 1000;

  const stats = {
    maxHp: character.maxHealth,
    maxMp: character.maxMana,
    atk: character.totalStats.attack,
    def: character.totalStats.defense,
    spd: character.totalStats.speed,
    crit: character.totalStats.criticalChance
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-8">
        
        {/* Character Identity */}
        <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border">
          <div className="flex gap-6 items-start">
            <div className="relative w-32 h-32 border-4 border-rpg-border pixel-border shrink-0">
              <Image 
                src={`/assets/heroes/${character.characterClass.toLowerCase()}.png`}
                alt={character.characterClass}
                fill
                className="object-cover pixelated"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-2 uppercase break-all">
                {character.name}
              </h2>
              <p className="text-rpg-primary font-pixel text-sm mb-4 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                Level {character.level} {character.characterClass}
              </p>
              <div className="bg-rpg-bg p-3 border-4 border-rpg-border pixel-border inline-block">
                <span className="font-retro text-2xl text-yellow-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  {character.gold} <span className="text-lg">Gold</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Link href={`/dashboard/${params.characterId}/monsters`}>
              <Button variant="danger">Quick Fight</Button>
            </Link>
            <button 
              onClick={handleDelete}
              className="text-rpg-error hover:text-red-400 font-pixel text-xs underline decoration-2 underline-offset-4 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]"
            >
              Delete Hero
            </button>
          </div>
        </div>

        {/* Recent Combat */}
        <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-pixel text-lg text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Recent Combat</h3>
            <Link href={`/dashboard/${params.characterId}/history`} className="text-xs font-pixel text-blue-400 hover:underline">
              View All
            </Link>
          </div>
          
          {recentCombat ? (
            <div className="bg-rpg-bg border-4 border-rpg-border p-4 pixel-border">
              <div className="flex items-center gap-4 mb-2">
                <div className={`w-3 h-12 ${recentCombat.isVictory ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <h4 className={`font-pixel text-lg ${recentCombat.isVictory ? 'text-green-400' : 'text-red-400'}`}>
                    {recentCombat.isVictory ? 'VICTORY' : 'DEFEAT'}
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">{new Date(recentCombat.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm font-pixel">
                <div>
                  <span className="block text-gray-400 text-xs mb-1">XP Earned</span>
                  <span className="text-blue-400">+{recentCombat.experienceEarned}</span>
                </div>
                <div>
                  <span className="block text-gray-400 text-xs mb-1">Gold Earned</span>
                  <span className="text-yellow-400">+{recentCombat.goldEarned}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm font-pixel">No recent battles. Go fight some monsters!</p>
          )}
        </div>
      </div>

      {/* Right Column: Stats and Vitals */}
      <div className="space-y-8">
        <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-pixel text-lg text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Vitals</h3>
            <Button variant="secondary" onClick={async () => {
              try {
                await import('@/lib/api/character').then(m => m.restAtCamp(params.characterId));
                alert('Rested at camp. HP and Mana fully restored!');
                fetchData();
                router.refresh();
              } catch (err: any) {
                alert('Failed to rest: ' + err.message);
              }
            }}>🏕️ Rest at Camp</Button>
          </div>
          <StatBar label="HP" current={character.currentHealth} max={stats.maxHp} color="red" />
          <StatBar label="MP" current={character.currentMana} max={stats.maxMp} color="blue" />
          <StatBar label="EXP" current={character.experience} max={expToNextLevel} color="yellow" />
        </div>

        <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border">
          <h3 className="font-pixel text-lg text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">Combat Attributes</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-rpg-bg border-4 border-rpg-border p-3 pixel-border">
              <span className="block font-retro text-lg text-rpg-text">Attack</span>
              <span className="font-pixel text-white text-lg">{stats.atk}</span>
            </div>
            <div className="bg-rpg-bg border-4 border-rpg-border p-3 pixel-border">
              <span className="block font-retro text-lg text-rpg-text">Defense</span>
              <span className="font-pixel text-white text-lg">{stats.def}</span>
            </div>
            <div className="bg-rpg-bg border-4 border-rpg-border p-3 pixel-border">
              <span className="block font-retro text-lg text-rpg-text">Speed</span>
              <span className="font-pixel text-white text-lg">{stats.spd}</span>
            </div>
            <div className="bg-rpg-bg border-4 border-rpg-border p-3 pixel-border">
              <span className="block font-retro text-lg text-rpg-text">Crit %</span>
              <span className="font-pixel text-white text-lg">{stats.crit}</span>
            </div>
          </div>
        </div>

        {/* Debug Tools */}
        <div className="bg-rpg-surface border-4 border-yellow-500 p-6 pixel-border relative">
          <div className="absolute -top-3 -right-3 bg-yellow-500 text-black px-2 py-1 font-pixel text-xs border-2 border-black rotate-12">
            DEV ONLY
          </div>
          <h3 className="font-pixel text-lg text-yellow-500 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">Debug Tools</h3>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handleAddXP}>Add 1000 XP</Button>
            <Button variant="secondary" onClick={handleAddItem}>Add Test Item</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
