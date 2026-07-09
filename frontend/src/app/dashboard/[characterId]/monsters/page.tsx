'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { monsterApi, Monster } from '@/lib/api/monsters';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function MonstersPage({ params }: { params: { characterId: string } }) {
  const router = useRouter();
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const data = await monsterApi.getAll();
        // Sort by level
        setMonsters(data.sort((a, b) => a.level - b.level));
      } catch (error) {
        console.error('Failed to fetch monsters:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMonsters();
  }, []);

  const handleFight = (monsterId: string) => {
    router.push(`/dashboard/${params.characterId}/combat/${monsterId}`);
  };

  if (loading) {
    return <div className="text-center p-8 font-pixel text-white">Loading monsters...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        Available Monsters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monsters.map((monster) => (
          <Card key={monster.id} className="flex flex-col h-full bg-rpg-surface border-4 border-rpg-border p-4">
            <div className="flex-1">
              <div className="flex gap-4 mb-4 border-b-4 border-rpg-border pb-4">
                <div className="relative w-24 h-24 border-4 border-rpg-border pixel-border shrink-0 bg-black">
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
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-pixel text-rpg-primary drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">{monster.name}</h3>
                  </div>
                  <span className="text-sm font-pixel text-white bg-rpg-bg border-2 border-rpg-border px-2 py-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Lvl {monster.level}</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">{monster.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div className="bg-black/30 p-2 rounded border-2 border-rpg-border">
                  <span className="text-rpg-error block text-xs">HP</span>
                  {monster.health}
                </div>
                <div className="bg-black/30 p-2 rounded border-2 border-rpg-border">
                  <span className="text-rpg-primary block text-xs">ATK</span>
                  {monster.attack}
                </div>
                <div className="bg-black/30 p-2 rounded border-2 border-rpg-border">
                  <span className="text-gray-400 block text-xs">DEF</span>
                  {monster.defense}
                </div>
                <div className="bg-black/30 p-2 rounded border-2 border-rpg-border">
                  <span className="text-yellow-400 block text-xs">SPD</span>
                  {monster.speed}
                </div>
              </div>

              <div className="flex justify-between text-xs font-pixel mb-4 px-2">
                <span className="text-yellow-400">💰 {monster.goldReward} Gold</span>
                <span className="text-blue-400">✨ {monster.experienceReward} XP</span>
              </div>
            </div>

            <Button 
              onClick={() => handleFight(monster.id)}
              className="w-full mt-auto"
              variant="danger"
            >
              FIGHT
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
