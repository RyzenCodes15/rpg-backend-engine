'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  const navItems = [
    { name: 'Overview', href: '/admin' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Content', href: '/admin/content' },
    { name: 'Stats', href: '/admin/stats' },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4 border-r border-gray-800">
      <div className="text-2xl font-bold mb-8 tracking-wider text-purple-400">
        ADMIN PANEL
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-4 border-t border-gray-800">
        <Link 
          href="/dashboard"
          className="block w-full text-left px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          Exit Admin
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
