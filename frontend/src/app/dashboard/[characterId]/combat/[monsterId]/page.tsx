'use client';

import React, { useEffect, useState } from 'react';
import { combatApi, CombatResponse, CombatEvent, CombatSessionResponse } from '@/lib/api/combat';
import { getCharacter, Character } from '@/lib/api/character';
import { monsterApi, Monster } from '@/lib/api/monsters';
import { skillApi, SkillResponse } from '@/lib/api/skills';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getItemIconPath } from '@/lib/itemUtils';

export default function CombatPage({ params }: { params: { characterId: string, monsterId: string } }) {
  const router = useRouter();
  const [session, setSession] = useState<CombatSessionResponse | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [monster, setMonster] = useState<Monster | null>(null);
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [combatLog, setCombatLog] = useState<CombatEvent[]>([]);
  const [combatFinished, setCombatFinished] = useState(false);
  const [finalResult, setFinalResult] = useState<CombatResponse | null>(null);
  
  // Floating damage numbers state
  const [charDamageText, setCharDamageText] = useState<{id: number, text: string, type: string}[]>([]);
  const [monsterDamageText, setMonsterDamageText] = useState<{id: number, text: string, type: string}[]>([]);
  const [damageIdSeq, setDamageIdSeq] = useState(0);

  useEffect(() => {
    const initCombat = async () => {
      try {
        const [charData, monsterData, skillsData, sessionData] = await Promise.all([
          getCharacter(params.characterId),
          monsterApi.getById(params.monsterId),
          skillApi.getCharacterSkills(params.characterId),
          combatApi.startCombat(params.characterId, params.monsterId)
        ]);
        
        setCharacter(charData);
        setMonster(monsterData);
        setSkills(skillsData.filter(s => s.unlocked));
        setSession(sessionData);
        
      } catch (error) {
        console.error('Failed to initiate combat:', error);
      } finally {
        setLoading(false);
      }
    };
    initCombat();
  }, [params.characterId, params.monsterId]);

  const addDamageText = (target: 'char' | 'monster', damage: number) => {
    const newDmg = { id: damageIdSeq, text: `-${damage}`, type: 'damage' };
    setDamageIdSeq(prev => prev + 1);
    if (target === 'char') {
      setCharDamageText(prev => [...prev, newDmg]);
    } else {
      setMonsterDamageText(prev => [...prev, newDmg]);
    }
  };

  const executeTurn = async (skillId?: string) => {
    if (!session || combatFinished) return;
    
    try {
      const response = await combatApi.executeTurn(params.characterId, skillId);
      const newSession = await combatApi.getActiveSession(params.characterId).catch(() => null);
      
      setCombatLog(prev => [...prev, ...response.log]);
      
      // Animate damages
      for (const event of response.log) {
        if (event.damage > 0) {
          if (event.actor === monster?.name) {
            addDamageText('char', event.damage);
          } else if (event.actor === character?.name) {
            addDamageText('monster', event.damage);
          }
        }
      }
      
      if (newSession) {
        setSession(newSession);
      } else {
         // Session ended
         if (character) character.currentHealth = 0;
      }

      if (response.isVictory || (newSession && newSession.characterHp === 0) || !newSession?.isActive) {
        setCombatFinished(true);
        setFinalResult(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  if (loading) {
    return <div className="text-center p-8 font-pixel text-white animate-pulse">Preparing for battle...</div>;
  }

  if (!character || !monster || !session) {
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
        <Card className={`flex-1 p-6 relative transition-all duration-300 ${combatFinished && !finalResult?.isVictory ? 'opacity-50 grayscale' : ''}`}>
          <h3 className="text-2xl font-pixel text-rpg-primary mb-2">{character.name}</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 font-pixel text-white">
              <span>HP</span>
              <span>{session.characterHp} / {charMaxHp}</span>
            </div>
            <div className="w-full bg-black/50 h-6 border-2 border-rpg-border p-1 mb-2">
              <div 
                className="bg-red-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(0, (session.characterHp / charMaxHp) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mb-1 font-pixel text-white">
              <span>MP</span>
              <span>{session.characterMana}</span>
            </div>
            <div className="w-full bg-black/50 h-4 border-2 border-rpg-border p-1">
              <div 
                className="bg-blue-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(0, Math.min(100, (session.characterMana / Math.max(1, character.baseStats.mana)) * 100))}%` }}
              />
            </div>
          </div>
          <div className="h-32 bg-black/30 border-2 border-rpg-border flex items-center justify-center relative">
            <div className="relative w-24 h-24">
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
        </Card>

        {/* VS */}
        <div className="flex items-center justify-center">
          <span className="text-4xl font-pixel text-white drop-shadow-md">VS</span>
        </div>

        {/* Monster Panel */}
        <Card className={`flex-1 p-6 relative transition-all duration-300 ${combatFinished && finalResult?.isVictory ? 'opacity-50 grayscale' : ''}`}>
          <h3 className="text-2xl font-pixel text-rpg-error mb-2">{monster.name}</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 font-pixel text-white">
              <span>HP</span>
              <span>{session.monsterHp} / {monsterMaxHp}</span>
            </div>
            <div className="w-full bg-black/50 h-6 border-2 border-rpg-border p-1">
              <div 
                className="bg-red-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(0, (session.monsterHp / monsterMaxHp) * 100)}%` }}
              />
            </div>
          </div>
          <div className="h-32 bg-black/30 border-2 border-rpg-border flex items-center justify-center relative mt-8">
            <div className="relative w-24 h-24">
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
        </Card>
      </div>

      {/* Action Bar */}
      {!combatFinished && (
        <Card className="p-4 bg-black/80 flex flex-wrap gap-4 justify-center">
          <Button onClick={() => executeTurn()} variant="primary" className="w-32">
            Attack
          </Button>
          {skills.map(skill => {
            const cooldown = session.cooldowns[skill.id] || 0;
            const canCast = session.characterMana >= skill.manaCost && cooldown === 0;
            return (
              <Button 
                key={skill.id} 
                onClick={() => executeTurn(skill.id)} 
                disabled={!canCast}
                variant="secondary"
                className={`w-40 flex flex-col items-center py-1 ${!canCast ? 'opacity-50' : ''}`}
              >
                <span>{skill.name}</span>
                <span className="text-xs text-blue-300">{skill.manaCost} MP {cooldown > 0 ? `(CD: ${cooldown})` : ''}</span>
              </Button>
            );
          })}
        </Card>
      )}

      {/* Combat Log */}
      <Card className="p-4 bg-black/80 min-h-[200px] flex flex-col">
        <h4 className="font-pixel text-rpg-text mb-4 border-b-2 border-rpg-border pb-2 flex justify-between">
          <span>Battle Log</span>
        </h4>
        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm max-h-[300px] flex flex-col-reverse">
          {combatLog.slice().reverse().map((event, i) => (
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
      {combatFinished && finalResult && (
        <Card className="p-8 text-center animate-fade-in border-4 border-yellow-500">
          <h2 className={`text-4xl font-pixel mb-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] ${finalResult.isVictory ? 'text-yellow-400' : 'text-red-500'}`}>
            {finalResult.isVictory ? 'VICTORY!' : 'DEFEAT'}
          </h2>
          
          {finalResult.isVictory && (
            <div className="flex flex-col items-center justify-center mb-8 border-t-2 border-b-2 border-rpg-border py-6 bg-black/30">
              <h3 className="font-pixel text-xl mb-6">Rewards</h3>
              <div className="flex flex-wrap justify-center gap-8 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative bg-rpg-surface border-4 border-rpg-border pixel-border mb-2 p-1">
                    <Image src="/assets/icons/xp.svg" alt="XP" fill className="object-contain pixelated" />
                  </div>
                  <span className="text-blue-400 font-bold font-retro text-xl">+{finalResult.experienceEarned}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative bg-rpg-surface border-4 border-rpg-border pixel-border mb-2 p-1">
                    <Image src="/assets/icons/gold.svg" alt="Gold" fill className="object-contain pixelated" />
                  </div>
                  <span className="text-yellow-400 font-bold font-retro text-xl">+{finalResult.goldEarned}</span>
                </div>
              </div>
              
              {finalResult.itemsDropped.length > 0 && (
                <div className="w-full max-w-lg mt-4 border-t-2 border-rpg-border/50 pt-6">
                  <h4 className="font-pixel text-sm text-gray-400 mb-4">Loot Dropped:</h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    {finalResult.itemsDropped.map((itemName, idx) => (
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
