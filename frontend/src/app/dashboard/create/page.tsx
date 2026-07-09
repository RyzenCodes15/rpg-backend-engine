'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCharacter } from '@/lib/api/character';
import Link from 'next/link';
import Image from 'next/image';

export default function CreateCharacterPage() {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('WARRIOR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createCharacter(name, characterClass);
      router.refresh();
      router.push('/dashboard/select');
    } catch (err: any) {
      setError(err.message || 'Failed to create character');
      setLoading(false);
    }
  };

  const classes = [
    { id: 'WARRIOR', name: 'Warrior', desc: 'High health and melee combat.' },
    { id: 'MAGE', name: 'Mage', desc: 'High mana and powerful spells.' },
    { id: 'ARCHER', name: 'Archer', desc: 'High speed and ranged attacks.' }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-rpg-surface border-4 border-rpg-border p-8 pixel-border mt-8">
      <div className="flex justify-between items-center mb-8 border-b-4 border-rpg-border pb-4">
        <h1 className="text-2xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Create Hero</h1>
        <Link href="/dashboard/select" className="text-rpg-text hover:text-white font-pixel text-xs transition-colors drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
          Cancel
        </Link>
      </div>

      {error && (
        <div className="bg-rpg-error/20 border-4 border-rpg-error text-rpg-error p-3 mb-6 font-retro text-xl pixel-border">
          {error}
        </div>
      )}

      <form onSubmit={handleCreate} className="space-y-8 font-retro text-xl">
        <div>
          <label htmlFor="name" className="block font-pixel text-sm text-rpg-text mb-3">Hero Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-rpg-bg border-4 border-rpg-border p-3 text-white focus:outline-none focus:border-rpg-primary transition-colors pixel-border"
            placeholder="Enter a legendary name..."
            required
            minLength={3}
            maxLength={20}
          />
        </div>

        <div>
          <label className="block font-pixel text-sm text-rpg-text mb-4">Choose Class</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <div
                key={cls.id}
                onClick={() => setCharacterClass(cls.id)}
                className={`
                  p-4 border-4 cursor-pointer transition-all text-center pixel-border
                  ${characterClass === cls.id 
                    ? 'border-rpg-primary bg-rpg-primary/10' 
                    : 'border-rpg-border bg-rpg-bg hover:border-rpg-text/50'}
                `}
              >
                <h3 className={`font-pixel text-sm drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] mb-3 ${characterClass === cls.id ? 'text-rpg-primary' : 'text-white'}`}>
                  {cls.name}
                </h3>
                <div className="flex justify-center mb-4">
                  <div className={`relative w-24 h-24 border-4 pixel-border transition-colors ${characterClass === cls.id ? 'border-rpg-primary' : 'border-rpg-border'}`}>
                    <Image 
                      src={`/assets/heroes/${cls.id.toLowerCase()}.png`}
                      alt={cls.name}
                      fill
                      className="object-cover pixelated"
                    />
                  </div>
                </div>
                <p className="text-lg text-rpg-text">{cls.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !name}
          className="w-full bg-rpg-primary hover:bg-rpg-primaryHover text-white font-pixel text-sm py-4 pixel-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          {loading ? 'Manifesting...' : 'Enter Realm'}
        </button>
      </form>
    </div>
  );
}
