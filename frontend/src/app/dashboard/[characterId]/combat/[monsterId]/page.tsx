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
import { ItemIcon } from '@/components/ui/ItemIcon';
import { motion, AnimatePresence } from 'framer-motion';

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
  
  // Animation states
  const [charAttacking, setCharAttacking] = useState(false);
  const [monsterAttacking, setMonsterAttacking] = useState(false);
  const [skillColor, setSkillColor] = useState<string | null>(null);
  
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

  const getElementColor = (skillName?: string) => {
    if (!skillName) return null;
    const name = skillName.toLowerCase();
    if (name.includes('fire') || name.includes('flame') || name.includes('burn')) return '#ef4444'; // Red
    if (name.includes('ice') || name.includes('frost') || name.includes('chill') || name.includes('freeze')) return '#3b82f6'; // Blue
    if (name.includes('poison') || name.includes('venom') || name.includes('toxic')) return '#22c55e'; // Green
    if (name.includes('arcane') || name.includes('magic') || name.includes('void')) return '#a855f7'; // Purple
    if (name.includes('heal') || name.includes('cure') || name.includes('light')) return '#eab308'; // Yellow
    return '#f8fafc'; // White default
  };

  const executeTurn = async (skillId?: string) => {
    if (!session || combatFinished) return;
    
    // Animate character attack
    const skill = skills.find(s => s.id === skillId);
    setSkillColor(skill ? getElementColor(skill.name) : null);
    setCharAttacking(true);
    
    setTimeout(() => {
      setCharAttacking(false);
      setSkillColor(null);
    }, 300);
    
    try {
      const response = await combatApi.executeTurn(params.characterId, skillId);
      const newSession = await combatApi.getActiveSession(params.characterId).catch(() => null);
      
      setCombatLog(prev => [...prev, ...response.log]);
      
      // Animate monster attack if they acted
      const monsterActed = response.log.some(e => e.actor === monster?.name);
      if (monsterActed) {
        setTimeout(() => {
          setMonsterAttacking(true);
          setTimeout(() => setMonsterAttacking(false), 300);
        }, 500); // delay monster attack slightly
      }
      
      // Animate damages
      for (const event of response.log) {
        if (event.damage > 0) {
          if (event.actor === monster?.name) {
            setTimeout(() => addDamageText('char', event.damage), 600); // sync with monster attack
          } else if (event.actor === character?.name) {
            addDamageText('monster', event.damage); // immediate since char attacked first
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
        setTimeout(() => {
          setCombatFinished(true);
          setFinalResult(response);
        }, 1500); // Wait for animations to finish before showing end screen
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Combat Arena */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch">
        
        {/* Character Panel */}
        <Card className={`flex-1 relative transition-all duration-300 ${combatFinished && !finalResult?.isVictory ? 'opacity-50 grayscale' : ''}`}>
          <h3 className="text-2xl font-pixel text-rpg-primary mb-2">{character.name}</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 font-pixel text-white">
              <span>HP</span>
              <span>{session.characterHp} / {charMaxHp}</span>
            </div>
            <div className="w-full bg-black/50 h-6 border-2 border-rpg-border p-1 mb-2">
              <motion.div 
                className="bg-red-500 h-full origin-left"
                initial={false}
                animate={{ width: `${Math.max(0, (session.characterHp / charMaxHp) * 100)}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-sm mb-1 font-pixel text-white">
              <span>MP</span>
              <span>{session.characterMana}</span>
            </div>
            <div className="w-full bg-black/50 h-4 border-2 border-rpg-border p-1">
              <motion.div 
                className="bg-blue-500 h-full origin-left"
                initial={false}
                animate={{ width: `${Math.max(0, Math.min(100, (session.characterMana / Math.max(1, character.baseStats.mana)) * 100))}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              />
            </div>
          </div>
          <div className="h-32 bg-black/30 border-2 border-rpg-border flex items-center justify-center relative overflow-hidden">
            <motion.div 
              className="relative w-24 h-24"
              animate={{ 
                x: charAttacking ? 40 : 0,
                scale: charAttacking ? 1.1 : 1,
                filter: skillColor && charAttacking ? `drop-shadow(0 0 15px ${skillColor})` : 'none'
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image 
                src={`/assets/heroes/${character.characterClass.toLowerCase()}.png`}
                alt={character.characterClass}
                fill
                className="object-cover pixelated"
              />
            </motion.div>
            
            {/* Floating Damage Text */}
            <AnimatePresence>
              {charDamageText.map(dmg => (
                <motion.div 
                  key={dmg.id}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -50, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute text-red-500 font-retro text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10 font-bold"
                >
                  {dmg.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* VS */}
        <div className="flex items-center justify-center">
          <span className="text-4xl font-pixel text-white drop-shadow-md">VS</span>
        </div>

        {/* Monster Panel */}
        <Card className={`flex-1 relative transition-all duration-300 ${combatFinished && finalResult?.isVictory ? 'opacity-50 grayscale' : ''}`}>
          <h3 className="text-2xl font-pixel text-rpg-error mb-2">{monster.name}</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 font-pixel text-white">
              <span>HP</span>
              <span>{session.monsterHp} / {monsterMaxHp}</span>
            </div>
            <div className="w-full bg-black/50 h-6 border-2 border-rpg-border p-1">
              <motion.div 
                className="bg-red-500 h-full origin-left"
                initial={false}
                animate={{ width: `${Math.max(0, (session.monsterHp / monsterMaxHp) * 100)}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              />
            </div>
          </div>
          <div className="h-32 bg-black/30 border-2 border-rpg-border flex items-center justify-center relative overflow-hidden mt-8">
            <motion.div 
              className="relative w-24 h-24"
              animate={{ 
                x: monsterAttacking ? -40 : 0,
                scale: monsterAttacking ? 1.1 : 1
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image 
                src={`/assets/monsters/${monster.name.toLowerCase()}.png`}
                alt={monster.name}
                fill
                className="object-cover pixelated"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjUwIiBmaWxsPSJyZWQiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4/PC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </motion.div>

            {/* Floating Damage Text */}
            <AnimatePresence>
              {monsterDamageText.map(dmg => (
                <motion.div 
                  key={dmg.id}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -50, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute text-red-500 font-retro text-5xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10 font-bold"
                >
                  {dmg.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>

      {/* Action Bar */}
      <AnimatePresence>
        {!combatFinished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="flex flex-wrap gap-4 justify-center bg-black/80">
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
                    className={`w-40 flex flex-col items-center py-1`}
                  >
                    <span>{skill.name}</span>
                    <span className="text-xs text-blue-300">{skill.manaCost} MP {cooldown > 0 ? `(CD: ${cooldown})` : ''}</span>
                  </Button>
                );
              })}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Combat Log */}
      <Card className="bg-black/80 min-h-[200px] flex flex-col">
        <h4 className="font-pixel text-rpg-text mb-4 border-b-2 border-rpg-border pb-2 flex justify-between">
          <span>Battle Log</span>
        </h4>
        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm max-h-[300px] flex flex-col-reverse pr-2">
          <AnimatePresence initial={false}>
            {combatLog.slice().reverse().map((event, i) => (
              <motion.div 
                key={combatLog.length - i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-2 rounded border-l-4 ${
                  event.actor === 'System' ? 'text-yellow-400 font-bold border-yellow-400 bg-yellow-900/20' :
                  event.actor === character.name ? 'text-blue-300 border-blue-400 bg-blue-900/20' : 'text-red-300 border-red-400 bg-red-900/20'
                }`}
              >
                <span className="font-bold opacity-70">[{event.actor}]</span> {event.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>

      {/* Victory / Defeat Screen */}
      <AnimatePresence>
        {combatFinished && finalResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
          >
            <Card className="text-center border-4 border-yellow-500 overflow-hidden relative">
              {finalResult.isVictory && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                  {/* Celebration background rays */}
                  <motion.div 
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/50 via-transparent to-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}
              
              <h2 className={`text-4xl font-pixel mb-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] relative z-10 ${finalResult.isVictory ? 'text-yellow-400' : 'text-red-500'}`}>
                {finalResult.isVictory ? 'VICTORY!' : 'DEFEAT'}
              </h2>
              
              {finalResult.isVictory && (
                <div className="flex flex-col items-center justify-center mb-8 border-t-2 border-b-2 border-rpg-border py-6 bg-black/30 relative z-10">
                  <h3 className="font-pixel text-xl mb-6">Rewards</h3>
                  <div className="flex flex-wrap justify-center gap-8 mb-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 relative bg-rpg-surface border-4 border-rpg-border pixel-border mb-2 p-1">
                        <Image src="/assets/icons/xp.svg" alt="XP" fill className="object-contain pixelated" />
                      </div>
                      <span className="text-blue-400 font-bold font-retro text-xl">+{finalResult.experienceEarned}</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 relative bg-rpg-surface border-4 border-rpg-border pixel-border mb-2 p-1">
                        <Image src="/assets/icons/gold.svg" alt="Gold" fill className="object-contain pixelated" />
                      </div>
                      <span className="text-yellow-400 font-bold font-retro text-xl">+{finalResult.goldEarned}</span>
                    </motion.div>
                  </div>
                  
                  {finalResult.itemsDropped.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="w-full max-w-lg mt-4 border-t-2 border-rpg-border/50 pt-6"
                    >
                      <h4 className="font-pixel text-sm text-gray-400 mb-4">Loot Dropped:</h4>
                      <div className="flex flex-wrap justify-center gap-4">
                        {finalResult.itemsDropped.map((itemName, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 1.2 + (idx * 0.2), type: 'spring' }}
                            className="flex flex-col items-center group"
                          >
                            <div className="w-16 h-16 relative bg-rpg-surface border-4 border-rpg-border pixel-border hover:border-yellow-400 transition-colors cursor-help mb-2 p-1">
                              <ItemIcon item={itemName} className="w-full h-full" />
                            </div>
                            <span className="text-xs font-retro text-gray-300 group-hover:text-white transition-colors">{itemName}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              <div className="flex justify-center gap-4 relative z-10">
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
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
