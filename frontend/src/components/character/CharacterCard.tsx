import React from 'react';
import Link from 'next/link';
import { Character } from '@/lib/api/character';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Link href={`/dashboard/${character.id}`}>
      <div className="bg-rpg-surface border-4 border-rpg-border hover:border-rpg-primary transition-all p-5 cursor-pointer group pixel-border h-full flex flex-col">
        <div className="flex justify-between items-start mb-4 border-b-4 border-rpg-border pb-3">
          <div className="flex gap-4">
            <div className="relative w-16 h-16 border-2 border-rpg-border pixel-border shrink-0">
              <Image 
                src={`/assets/heroes/${character.characterClass.toLowerCase()}.png`}
                alt={character.characterClass}
                fill
                className="object-cover pixelated"
              />
            </div>
            <div>
              <h3 className="text-xl font-pixel text-white group-hover:text-rpg-primary transition-colors drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] break-all line-clamp-2">{character.name}</h3>
              <p className="text-sm text-rpg-text font-retro tracking-wider mt-1">{character.characterClass}</p>
            </div>
          </div>
          <div className="bg-rpg-bg text-white px-3 py-1 font-pixel text-xs border-2 border-rpg-border drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] whitespace-nowrap ml-2">
            Lvl {character.level}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mt-auto">
          <div className="bg-rpg-bg p-2 border-2 border-rpg-border">
            <span className="text-rpg-text block text-xs font-pixel mb-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">HP</span>
            <span className="font-retro text-xl text-red-400">{character.baseStats.health}</span>
          </div>
          <div className="bg-rpg-bg p-2 border-2 border-rpg-border">
            <span className="text-rpg-text block text-xs font-pixel mb-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">MP</span>
            <span className="font-retro text-xl text-blue-400">{character.baseStats.mana}</span>
          </div>
          <div className="bg-rpg-bg p-2 border-2 border-rpg-border">
            <span className="text-rpg-text block text-xs font-pixel mb-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Gold</span>
            <span className="font-retro text-xl text-yellow-400">{character.gold}</span>
          </div>
          <div className="bg-rpg-bg p-2 border-2 border-rpg-border">
            <span className="text-rpg-text block text-xs font-pixel mb-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">EXP</span>
            <span className="font-retro text-xl text-green-400">{character.experience}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
