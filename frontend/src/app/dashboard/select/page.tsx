'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Character, getCharacters } from '@/lib/api/character';
import { CharacterCard } from '@/components/character/CharacterCard';
import Link from 'next/link';

export default function CharacterSelectPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load characters');
        if (err.message?.toLowerCase().includes('unauthorized') || err.message?.toLowerCase().includes('jwt')) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="font-pixel text-rpg-primary animate-pulse text-xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Summoning Heroes...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between md:items-end mb-8 border-b-4 border-rpg-border pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Choose Hero</h1>
          <p className="text-rpg-text mt-2 font-retro text-xl">Select a character to enter the realm.</p>
        </div>
        
        <Link 
          href="/dashboard/create"
          className="bg-rpg-primary hover:bg-rpg-primaryHover text-white font-pixel text-sm py-3 px-6 pixel-border transition-colors text-center"
        >
          New Hero
        </Link>
      </header>

      {error && (
        <div className="bg-rpg-error/20 border-4 border-rpg-error text-rpg-error p-4 font-retro text-xl pixel-border">
          {error}
        </div>
      )}

      {characters.length === 0 && !error ? (
        <div className="text-center py-20 bg-rpg-surface border-4 border-rpg-border pixel-border">
          <h2 className="text-2xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">No Heroes Found</h2>
          <p className="text-rpg-text text-xl mb-8">Your legacy has not yet begun.</p>
          <Link 
            href="/dashboard/create"
            className="bg-rpg-accent hover:bg-indigo-600 text-white font-pixel text-sm py-4 px-8 pixel-border transition-colors inline-block"
          >
            Create Hero
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map(char => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      )}
    </div>
  );
}
