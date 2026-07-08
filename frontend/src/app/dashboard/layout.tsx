'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-rpg-bg flex flex-col">
      <header className="bg-rpg-surface border-b-4 border-rpg-border p-4 sticky top-0 z-40 pixel-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-xl md:text-2xl font-pixel text-rpg-primary hover:text-rpg-primaryHover transition-colors drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              RPG ENGINE
            </h1>
          </Link>
          <div className="flex gap-4 items-center">
            <Link 
              href="/dashboard/select" 
              className="text-sm font-pixel text-rpg-text hover:text-white transition-colors"
            >
              Select Hero
            </Link>
            <button 
              onClick={handleLogout}
              className="text-sm font-pixel text-rpg-error hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
