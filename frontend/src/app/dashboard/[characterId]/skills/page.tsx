'use client';

import React, { useEffect, useState } from 'react';
import { skillApi, SkillResponse } from '@/lib/api/skills';
import { Card } from '@/components/ui/Card';
import { Flame, Snowflake, Skull, Sparkles, Shield, Sword, Zap, Clock, Droplets } from 'lucide-react';

export default function SkillsPage({ params }: { params: { characterId: string } }) {
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillApi.getCharacterSkills(params.characterId);
        setSkills(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [params.characterId]);

  const getElementStyle = (element?: string, skillType?: string) => {
    if (element) {
      const el = element.toLowerCase();
      if (el.includes('fire') || el.includes('flame')) return { icon: Flame, color: 'text-red-400', border: 'border-red-500/60', bg: 'bg-red-950/40' };
      if (el.includes('ice') || el.includes('frost')) return { icon: Snowflake, color: 'text-blue-400', border: 'border-blue-500/60', bg: 'bg-blue-950/40' };
      if (el.includes('poison') || el.includes('venom')) return { icon: Skull, color: 'text-green-400', border: 'border-green-500/60', bg: 'bg-green-950/40' };
      if (el.includes('arcane') || el.includes('magic')) return { icon: Sparkles, color: 'text-purple-400', border: 'border-purple-500/60', bg: 'bg-purple-950/40' };
    }
    if (skillType?.toLowerCase().includes('heal') || skillType?.toLowerCase().includes('support')) {
      return { icon: Shield, color: 'text-yellow-400', border: 'border-yellow-500/60', bg: 'bg-yellow-950/40' };
    }
    return { icon: Sword, color: 'text-rpg-primary', border: 'border-rpg-border', bg: 'bg-rpg-surface' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-rpg-surface border-4 border-rpg-border pixel-border animate-pulse">
        <span className="text-xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Opening Spellbook...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-950/80 border-4 border-red-500 text-white font-pixel pixel-border drop-shadow-md">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Spellbook Header */}
      <div className="bg-rpg-surface border-4 border-rpg-border p-6 pixel-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }}></div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 relative z-10">
          <div>
            <h1 className="text-3xl font-pixel text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wide">
              Skills & Spellbook
            </h1>
            <p className="text-sm font-retro text-rpg-text mt-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
              Master arcane incantations and devastating combat techniques as your character ascends in power.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-rpg-bg px-4 py-3 border-2 border-rpg-border pixel-border">
            <div className="text-xs font-retro text-gray-400 uppercase tracking-wider">Unlocked Mastery:</div>
            <div className="text-xl font-pixel text-green-400 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
              {skills.filter(s => s.unlocked).length} <span className="text-gray-500 text-base">/ {skills.length}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const style = getElementStyle(skill.element, skill.skillType);
          const Icon = style.icon;
          
          return (
            <Card 
              key={skill.id} 
              className={`
                p-6 flex flex-col justify-between gap-5 transition-all duration-200 border-4 pixel-border relative
                ${skill.unlocked 
                  ? `${style.border} ${style.bg} hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] cursor-default` 
                  : 'border-gray-700 bg-gray-900/60 opacity-60 hover:opacity-80'
                }
              `}
            >
              {/* Top Row: Icon, Title & Status Badge */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-14 h-14 flex items-center justify-center border-2 pixel-border shrink-0
                    ${skill.unlocked ? 'bg-rpg-bg border-rpg-border' : 'bg-gray-800 border-gray-700 grayscale'}
                  `}>
                    <Icon size={32} className={`${skill.unlocked ? style.color : 'text-gray-500'} drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl text-white font-pixel drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] tracking-wide">
                        {skill.name}
                      </h2>
                      {skill.element && (
                        <span className={`text-[10px] font-retro uppercase px-2 py-0.5 bg-black/50 border border-white/20 rounded ${style.color}`}>
                          {skill.element}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-retro text-gray-400 tracking-wider">
                      {skill.skillType}
                    </span>
                  </div>
                </div>

                {skill.unlocked ? (
                  <span className="text-xs font-retro bg-green-950 text-green-300 border-2 border-green-500/80 px-2.5 py-1 pixel-border drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-xs font-retro bg-gray-800 text-gray-300 border-2 border-gray-600 px-2.5 py-1 pixel-border drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0">
                    Lv {skill.requiredLevel} Required
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-200 leading-relaxed font-sans bg-black/30 p-3.5 border border-white/10 rounded-sm">
                {skill.description}
              </p>
              
              {/* Stats Grid Footer */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t-2 border-white/10 text-xs font-retro">
                <div className="flex items-center gap-2 bg-rpg-bg/80 p-2.5 border border-white/10">
                  <Droplets size={16} className="text-blue-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] uppercase">Mana Cost</span>
                    <span className="text-blue-300 font-bold text-sm">{skill.manaCost}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-rpg-bg/80 p-2.5 border border-white/10">
                  <Zap size={16} className="text-red-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] uppercase">Base Power</span>
                    <span className="text-red-300 font-bold text-sm">{skill.baseDamage}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-rpg-bg/80 p-2.5 border border-white/10">
                  <Clock size={16} className="text-yellow-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] uppercase">Cooldown</span>
                    <span className="text-yellow-300 font-bold text-sm">{skill.cooldown === 0 ? 'Instant' : `${skill.cooldown} Turn${skill.cooldown > 1 ? 's' : ''}`}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {skills.length === 0 && (
          <div className="col-span-full bg-rpg-surface border-4 border-rpg-border p-12 text-center text-gray-400 font-pixel pixel-border">
            No spells or abilities found for this class.
          </div>
        )}
      </div>
    </div>
  );
}
