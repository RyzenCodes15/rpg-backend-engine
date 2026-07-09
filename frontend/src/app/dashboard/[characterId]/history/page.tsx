'use client';

import React, { useEffect, useState } from 'react';
import { combatApi, CombatHistoryResponse } from '@/lib/api/combat';
import { monsterApi, Monster } from '@/lib/api/monsters';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';

export default function CombatHistoryPage({ params }: { params: { characterId: string } }) {
  const [history, setHistory] = useState<CombatHistoryResponse[]>([]);
  const [monsters, setMonsters] = useState<Record<string, Monster>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyData, monsterData] = await Promise.all([
          combatApi.getHistory(params.characterId),
          monsterApi.getAll()
        ]);
        
        setHistory(historyData);
        
        const monsterMap = monsterData.reduce((acc, m) => {
          acc[m.id] = m;
          return acc;
        }, {} as Record<string, Monster>);
        
        setMonsters(monsterMap);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.characterId]);

  if (loading) {
    return <div className="text-center p-8 font-pixel text-white">Loading history...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-pixel text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        Combat History
      </h2>

      {history.length === 0 ? (
        <Card className="p-8 text-center text-gray-400">
          No battles fought yet. Go fight some monsters!
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map((record) => {
            const monster = monsters[record.monsterId];
            const date = new Date(record.timestamp).toLocaleString();
            
            return (
              <Card key={record.id} className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className={`w-3 h-16 ${record.isVictory ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                  <div className="relative w-16 h-16 border-2 border-rpg-border pixel-border shrink-0 bg-black">
                    {monster && (
                      <Image 
                        src={`/assets/monsters/${monster.name.toLowerCase()}.png`}
                        alt={monster.name}
                        fill
                        className="object-cover pixelated"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjUwIiBmaWxsPSJyZWQiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4/PC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-pixel text-lg text-white">
                      vs {monster ? monster.name : 'Unknown Monster'}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">{date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-auto text-sm">
                  <div className="text-center">
                    <span className="block text-gray-400 text-xs font-pixel mb-1">Result</span>
                    <span className={`font-bold ${record.isVictory ? 'text-green-400' : 'text-red-400'}`}>
                      {record.isVictory ? 'VICTORY' : 'DEFEAT'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-gray-400 text-xs font-pixel mb-1">DMG Dealt</span>
                    <span className="text-white">{record.damageDealt}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-gray-400 text-xs font-pixel mb-1">XP</span>
                    <span className="text-blue-400">+{record.experienceEarned}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-gray-400 text-xs font-pixel mb-1">Gold</span>
                    <span className="text-yellow-400">+{record.goldEarned}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
