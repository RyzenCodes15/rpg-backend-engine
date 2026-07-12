'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Stats {
  totalUsers: number;
  totalMonsters: number;
  totalItems: number;
  totalSkills: number;
  totalRecipes: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Placeholder stats until we have a real stats endpoint.
        // We can fetch lists and take their lengths as a proxy for now, 
        // or just display a nice welcome UI if there is no stats endpoint.
        const [users, monsters, items, skills, recipes] = await Promise.all([
          apiFetch('/admin/users?page=0&size=1').catch(() => ({ totalElements: 0 })),
          apiFetch('/admin/monsters').catch(() => []),
          apiFetch('/admin/items').catch(() => []),
          apiFetch('/admin/skills').catch(() => []),
          apiFetch('/admin/recipes').catch(() => [])
        ]);

        setStats({
          totalUsers: users.totalElements || 0,
          totalMonsters: Array.isArray(monsters) ? monsters.length : 0,
          totalItems: Array.isArray(items) ? items.length : 0,
          totalSkills: Array.isArray(skills) ? skills.length : 0,
          totalRecipes: Array.isArray(recipes) ? recipes.length : 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-white text-xl animate-pulse">Loading dashboard...</div>;
  }

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, color: 'text-blue-400' },
    { label: 'Monsters', value: stats?.totalMonsters || 0, color: 'text-red-400' },
    { label: 'Items', value: stats?.totalItems || 0, color: 'text-green-400' },
    { label: 'Skills', value: stats?.totalSkills || 0, color: 'text-yellow-400' },
    { label: 'Recipes', value: stats?.totalRecipes || 0, color: 'text-purple-400' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">
        Admin Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg hover:border-gray-700 transition-colors">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{stat.label}</h3>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome to the Admin Panel</h2>
        <p className="text-gray-400 text-lg">
          Use the side navigation to manage users, content (items, monsters, skills, recipes), and view system statistics.
          Ensure you are making changes carefully as they affect all players in the game world.
        </p>
      </div>
    </div>
  );
}
