'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { setToken } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setToken(data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card title="Enter the Realm" className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="bg-rpg-error/20 border border-rpg-error text-rpg-error p-3 text-sm font-retro text-center">
              {error}
            </div>
          )}
          
          <Input 
            label="Username" 
            type="text" 
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          
          <Input 
            label="Password" 
            type="password" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />

          <Button type="submit" disabled={isLoading} className="w-full mt-2">
            {isLoading ? 'Connecting...' : 'Login'}
          </Button>

          <p className="text-center text-sm font-retro text-rpg-text mt-4">
            New adventurer? <Link href="/register" className="text-rpg-primary hover:underline">Register here</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
