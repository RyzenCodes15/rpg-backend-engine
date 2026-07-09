'use client';

import React, { useEffect, useState } from 'react';
import { combatApi, CombatResponse, CombatEvent } from '@/lib/api/combat';
import { getCharacter, Character } from '@/lib/api/character';
import { monsterApi, Monster } from '@/lib/api/monsters';
import { getEquipment, Equipment } from '@/lib/api/equipment';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getItemIconPath } from '@/lib/itemUtils';

export default function CombatPage({ params }: { params: { characterId: string, monsterId: string } }) {
  const router = useRouter();
  const [combatResult, setCombatResult] = useState<CombatResponse | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [monster, setMonster] = useState<Monster | null>(null);
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Animation state
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [charCurrentHp, setCharCurrentHp] = useState(0);
  const [monsterCurrentHp, setMonsterCurrentHp] = useState(0);
  const [combatFinished, setCombatFinished] = useState(false);
  const [activeTurn, setActiveTurn] = useState<string | null>(null);
  
  // Floating damage numbers state
  const [charDamageText, setCharDamageText] = useState<{id: number, text: string, type: string}[]>([]);
  const [monsterDamageText, setMonsterDamageText] = useState<{id: number, text: string, type: string}[]>([]);
  const [damageIdSeq, setDamageIdSeq] = useState(0);

  useEffect(() => {
    const initCombat = async () => {
      try {
        const [charData, monsterData, eqData, result] = await Promise.all([
          getCharacter(params.characterId),
          monsterApi.getById(params.monsterId),
          getEquipment(params.characterId).catch(() => null),
          combatApi.fight(params.characterId, params.monsterId)
        ]);
        
        setCharacter(charData);
        setMonster(monsterData);
        setEquipment(eqData);
        setCombatResult(result);
        
        const maxHp = charData.maxHealth;
        // Start combat with actual current HP
        setCharCurrentHp(charData.currentHealth);
        setMonsterCurrentHp(monsterData.health);
        
      } catch (error) {
        console.error('Failed to initiate combat:', error);
      } finally {
        setLoading(false);
      }
    };
    initCombat();
  }, [params.characterId, params.monsterId]);

  // Handle animation playback
  useEffect(() => {
    if (!combatResult || currentEventIndex >= combatResult.log.length) {
      if (combatResult && currentEventIndex >= combatResult.log.length) {
        setCombatFinished(true);
        setActiveTurn(null);
      }
      return;
    }

    const timer = setTimeout(() => {
      const event = combatResult.log[currentEventIndex];
      setActiveTurn(event.actor);
      
      // Update health and trigger damage popups based on event damage
      if (event.damage > 0) {
        const newDmg = { id: damageIdSeq, text: `-${event.damage}`, type: 'damage' };
        setDamageIdSeq(prev => prev + 1);

        if (event.actor === monster?.name) {
          setCharCurrentHp(prev => Math.max(0, prev - event.damage));
          setCharDamageText(prev => [...prev, newDmg]);
        } else if (event.actor === character?.name) {
          setMonsterCurrentHp(prev => Math.max(0, prev - event.damage));
          setMonsterDamageText(prev => [...prev, newDmg]);
        } else {
          // Status effect damage, infer by checking who is taking damage based on message text.
          if (event.message.includes(character?.name || '')) {
             setCharCurrentHp(prev => Math.max(0, prev - event.damage));
             setCharDamageText(prev => [...prev, { ...newDmg, text: `-${event.damage} (Status)` }]);
          } else {
             setMonsterCurrentHp(prev => Math.max(0, prev - event.damage));
             setMonsterDamageText(prev => [...prev, { ...newDmg, text: `-${event.damage} (Status)` }]);
          }
        }
      }

      setCurrentEventIndex(prev => prev + 1);
    }, 1000); // 1000ms per combat step for better readability

    return () => clearTimeout(timer);
  }, [currentEventIndex, combatResult, character, monster, damageIdSeq]);

  // Clean up floating text after animation completes
  useEffect(() => {
    if (charDamageText.length > 0) {
      const t = setTimeout(() => setCharDamageText(prev => prev.slice(1)), 1500);
      return () => clearTimeout(t);
    }
  }, [charDamageText]);

  useEffect(() => {
    if (monsterDamageText.length > 0) {
      const t = setTimeout(() => setMonsterDamageText(prev => prev.slice(1)), 1500);
      return () => clearTimeout(t);
    }
  }, [monsterDamageText]);

  // Auto-start animation once loaded
  useEffect(() => {
    if (!loading && combatResult && currentEventIndex === -1) {
      setTimeout(() => setCurrentEventIndex(0), 1000);
    }
  }, [loading, combatResult, currentEventIndex]);

  if (loading) {
    return <div className="text-center p-8 font-pixel text-white animate-pulse">Preparing for battle...</div>;
  }

  if (!character || !monster || !combatResult) {
    return <div className="text-center p-8 text-rpg-error font-pixel">Battle failed to initialize.</div>;
  }

  const charMaxHp = character.maxHealth;
  const monsterMaxHp = monster.health;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1.5); }
          100% { opacity: 0; transform: translateY(-50px) scale(1); }
        }
        .damage-popup {
          animation: floatUp 1.5s ease-out forwards;
        }
      `}} />

      {/* Combat Arena */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch">
        
        {/* Character Panel */}
        <Card className={`flex-1 p-6 relative transition-all duration-300 ${activeTurn === character.name ? 'ring-4 ring-blue-500 scale-105' : ''} ${combatFinished && !combatResult.isVictory ? 'opacity-50 grayscale' : ''}`}>
          <h3 className="text-2xl font-pixel text-rpg-primary mb-2">{character.name}</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 font-pixel text-white">
              <span>HP</span>
              <span>{charCurrentHp} / {charMaxHp}</span>
            </div>
            <div className="w-full bg-black/50 h-6 border-2 border-rpg-border p-1">
              <div 
                className="bg-red-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(0, (charCurrentHp / charMaxHp) * 100)}%` }}
              />
            </div>
          </div>
          <div className="h-32 bg-black/30 border-2 border-rpg-border flex items-center justify-center relative">
            <div className={`relative w-24 h-24 ${activeTurn === character.name ? 'animate-bounce' : ''}`}>
              <Image 
                src={`/assets/heroes/${character.characterClass.toLowerCase()}.png`}
                alt={character.characterClass}
                fill
                className="object-cover pixelated"
              />
            </div>
            
            {/* Floating Damage Text */}
            {charDamageText.map(dmg => (
              <div key={dmg.id} className="damage-popup absolute text-red-500 font-retro text-4xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10 font-bold">
                {dmg.text}
              </div>
            ))}
          </div>
          {activeTurn === character.name && (
            <div className="absolute top-2 right-2 text-xs font-pixel text-blue-400 animate-pulse">
              ACTION!
            </div>
          )}
        </Card>

        {/* VS */}
        <div className="flex items-center justify-center">
          <span className="text-4xl font-pixel text-white drop-shadow-md">VS</span>
        </div>

        {/* Monster Panel */}
        <Card className={`flex-1 p-6 relative transition-all duration-300 ${activeTurn === monster.name ? 'ring-4 ring-red-500 scale-105' : ''} ${combatFinished && combatResult.isVictory ? 'opacity-50 grayscale' : ''}`}>
          <h3 className="text-2xl font-pixel text-rpg-error mb-2">{monster.name}</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 font-pixel text-white">
              <span>HP</span>
              <span>{monsterCurrentHp} / {monsterMaxHp}</span>
            </div>
            <div className="w-full bg-black/50 h-6 border-2 border-rpg-border p-1">
              <div 
                className="bg-red-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(0, (monsterCurrentHp / monsterMaxHp) * 100)}%` }}
              />
            </div>
          </div>
          <div className="h-32 bg-black/30 border-2 border-rpg-border flex items-center justify-center relative">
            <div className={`relative w-24 h-24 ${activeTurn === monster.name ? 'animate-bounce' : ''}`}>
              <Image 
                src={`/assets/monsters/${monster.name.toLowerCase()}.png`}
                alt={monster.name}
                fill
                className="object-cover pixelated"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjUwIiBmaWxsPSJyZWQiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4/PC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </div>

            {/* Floating Damage Text */}
            {monsterDamageText.map(dmg => (
              <div key={dmg.id} className="damage-popup absolute text-red-500 font-retro text-4xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10 font-bold">
                {dmg.text}
              </div>
            ))}
          </div>
          {activeTurn === monster.name && (
            <div className="absolute top-2 right-2 text-xs font-pixel text-red-400 animate-pulse">
              ACTION!
            </div>
          )}
        </Card>
      </div>

      {/* Combat Log */}
      <Card className="p-4 bg-black/80 min-h-[200px] flex flex-col">
        <h4 className="font-pixel text-rpg-text mb-4 border-b-2 border-rpg-border pb-2 flex justify-between">
          <span>Battle Log</span>
          {activeTurn === 'System' && <span className="text-yellow-400 text-xs animate-pulse">System Processing...</span>}
        </h4>
        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm max-h-[300px] flex flex-col-reverse">
          {combatResult.log.slice(0, currentEventIndex).reverse().map((event, i) => (
            <div 
              key={i} 
              className={`p-2 rounded border-l-4 ${
                event.actor === 'System' ? 'text-yellow-400 font-bold border-yellow-400 bg-yellow-900/20' :
                event.actor === character.name ? 'text-blue-300 border-blue-400 bg-blue-900/20' : 'text-red-300 border-red-400 bg-red-900/20'
              }`}
            >
              <span className="font-bold opacity-70">[{event.actor}]</span> {event.message}
            </div>
          ))}
        </div>
      </Card>

      {/* Victory / Defeat Screen */}
      {combatFinished && (
        <Card className="p-8 text-center animate-fade-in border-4 border-yellow-500">
          <h2 className={`text-4xl font-pixel mb-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] ${combatResult.isVictory ? 'text-yellow-400' : 'text-red-500'}`}>
            {combatResult.isVictory ? 'VICTORY!' : 'DEFEAT'}
          </h2>
          
          {combatResult.isVictory && (
            <div className="flex flex-col items-center justify-center mb-8 border-t-2 border-b-2 border-rpg-border py-6 bg-black/30">
              <h3 className="font-pixel text-xl mb-6">Rewards</h3>
              <div className="flex flex-wrap justify-center gap-8 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative bg-rpg-surface border-4 border-rpg-border pixel-border mb-2 p-1">
                    <Image src="/assets/icons/xp.svg" alt="XP" fill className="object-contain pixelated" />
                  </div>
                  <span className="text-blue-400 font-bold font-retro text-xl">+{combatResult.experienceEarned}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative bg-rpg-surface border-4 border-rpg-border pixel-border mb-2 p-1">
                    <Image src="/assets/icons/gold.svg" alt="Gold" fill className="object-contain pixelated" />
                  </div>
                  <span className="text-yellow-400 font-bold font-retro text-xl">+{combatResult.goldEarned}</span>
                </div>
              </div>
              
              {combatResult.itemsDropped.length > 0 && (
                <div className="w-full max-w-lg mt-4 border-t-2 border-rpg-border/50 pt-6">
                  <h4 className="font-pixel text-sm text-gray-400 mb-4">Loot Dropped:</h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    {combatResult.itemsDropped.map((itemName, idx) => (
                      <div key={idx} className="flex flex-col items-center group">
                        <div className="w-16 h-16 relative bg-rpg-surface border-4 border-rpg-border pixel-border hover:border-white transition-colors cursor-help mb-2 p-1">
                          <Image src={getItemIconPath(itemName)} alt={itemName} fill className="object-contain pixelated" />
                        </div>
                        <span className="text-xs font-retro text-gray-300 group-hover:text-white transition-colors">{itemName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={() => {
              router.refresh();
              router.push(`/dashboard/${params.characterId}/monsters`);
            }}>
              Back to Monsters
            </Button>
            <Button variant="secondary" onClick={() => {
              router.refresh();
              router.push(`/dashboard/${params.characterId}`);
            }}>
              Back to Dashboard
            </Button>
          </div>
        </Card>
      )}

    </div>
  );
}
