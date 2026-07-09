'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CharacterLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { characterId: string };
}) {
  const pathname = usePathname();
  const characterId = params.characterId;

  const tabs = [
    { name: 'Dashboard', path: `/dashboard/${characterId}` },
    { name: 'Inventory', path: `/dashboard/${characterId}/inventory` },
    { name: 'Equipment', path: `/dashboard/${characterId}/equipment` },
    { name: 'Monsters', path: `/dashboard/${characterId}/monsters` },
    { name: 'History', path: `/dashboard/${characterId}/history` }
  ];

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`
                px-6 py-3 font-pixel text-xs transition-colors pixel-border border-4
                ${isActive 
                  ? 'bg-rpg-primary border-rpg-primaryHover text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] translate-y-1' 
                  : 'bg-rpg-surface border-rpg-border text-rpg-text hover:bg-rpg-bg'}
              `}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
}
