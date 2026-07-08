'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCharacters } from '@/lib/api/character';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    const initRedirect = async () => {
      try {
        const characters = await getCharacters();
        if (characters.length === 0) {
          router.replace('/dashboard/create');
        } else {
          router.replace('/dashboard/select');
        }
      } catch (err) {
        // If unauthorized or failed to fetch, go to login
        router.replace('/login');
      }
    };

    initRedirect();
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="font-pixel text-rpg-primary animate-pulse text-xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        Loading Realm...
      </div>
    </div>
  );
}
