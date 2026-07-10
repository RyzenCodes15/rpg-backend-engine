'use client';

import React, { useEffect, useState } from 'react';
import { skillApi, SkillResponse } from '@/lib/api/skills';
import { Card } from '@/components/ui/Card';

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

  if (loading) return <div className="p-4 text-white font-pixel">Loading skills...</div>;
  if (error) return <div className="p-4 text-red-500 font-pixel">{error}</div>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl text-white font-pixel mb-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Skills & Abilities</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <Card key={skill.id} className={`p-4 flex flex-col gap-2 ${skill.unlocked ? 'border-green-500' : 'border-gray-600 opacity-70'}`}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-rpg-primary font-bold drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                {skill.name}
              </h2>
              {skill.unlocked ? (
                <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">Unlocked</span>
              ) : (
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">Lv {skill.requiredLevel}</span>
              )}
            </div>
            
            <p className="text-sm text-gray-300">{skill.description}</p>
            
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-400">
              <div>Type: <span className="text-gray-200">{skill.skillType}</span></div>
              <div>Mana: <span className="text-blue-400">{skill.manaCost}</span></div>
              <div>Damage: <span className="text-red-400">{skill.baseDamage}</span></div>
              <div>Cooldown: <span className="text-yellow-400">{skill.cooldown} turns</span></div>
              {skill.element && <div>Element: <span className="text-purple-400">{skill.element}</span></div>}
              {skill.statusEffectType && <div>Effect: <span className="text-orange-400">{skill.statusEffectType}</span></div>}
            </div>
          </Card>
        ))}
        {skills.length === 0 && (
          <div className="col-span-full text-gray-400 text-center py-8">
            No skills available for your class.
          </div>
        )}
      </div>
    </div>
  );
}
