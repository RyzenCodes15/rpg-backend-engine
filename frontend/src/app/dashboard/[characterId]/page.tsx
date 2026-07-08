'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Character, getCharacter, deleteCharacter } from '@/lib/api/character';
import { StatBar } from '@/components/character/StatBar';
import Link from 'next/link';

export default function CharacterDashboardPage({ params }: { params: { characterId: string } }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchChar = async () => {
      try {
        const charData = await getCharacter(params.characterId);
        setCharacter(charData);
      } catch (err: any) {
        setError(err.message || 'Failed to load character');
      } finally {
        setLoading(false);
      }
    };
    fetchChar();
  }, [params.characterId]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this character forever?')) {
      try {
        await deleteCharacter(params.characterId);
        router.push('/dashboard/select');
      } catch (err: any) {
        alert('Failed to delete character');
      }
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Character Identity */}
      <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border">
        <div className="flex gap-6 items-start">
          <div className="w-32 h-32 bg-rpg-bg border-4 border-rpg-border pixel-border flex items-center justify-center shrink-0">
            <span className="text-4xl">🧑‍🚀</span> {/* Placeholder portrait */}
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

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleDelete}
            className="text-rpg-error hover:text-red-400 font-pixel text-xs underline decoration-2 underline-offset-4 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]"
          >
            Delete Hero
          </button>
        </div>
      </div>

      {/* Stats and Vitals */}
      <div className="space-y-8">
        <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border space-y-6">
          <h3 className="font-pixel text-lg text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">Vitals</h3>
          <StatBar label="HP" current={character.baseStats.health} max={character.baseStats.health} color="red" />
          <StatBar label="MP" current={character.baseStats.mana} max={character.baseStats.mana} color="blue" />
          <StatBar label="EXP" current={character.experience} max={expToNextLevel} color="yellow" />
        </div>

        <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border">
          <h3 className="font-pixel text-lg text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">Combat Attributes</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-rpg-bg border-4 border-rpg-border p-3 pixel-border">
              <span className="block font-retro text-lg text-rpg-text">Attack</span>
              <span className="font-pixel text-white text-lg">{character.baseStats.attack}</span>
            </div>
            <div className="bg-rpg-bg border-4 border-rpg-border p-3 pixel-border">
              <span className="block font-retro text-lg text-rpg-text">Defense</span>
              <span className="font-pixel text-white text-lg">{character.baseStats.defense}</span>
            </div>
            <div className="bg-rpg-bg border-4 border-rpg-border p-3 pixel-border">
              <span className="block font-retro text-lg text-rpg-text">Speed</span>
              <span className="font-pixel text-white text-lg">{character.baseStats.speed}</span>
            </div>
            <div className="bg-rpg-bg border-4 border-rpg-border p-3 pixel-border">
              <span className="block font-retro text-lg text-rpg-text">Crit %</span>
              <span className="font-pixel text-white text-lg">{character.baseStats.criticalChance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
