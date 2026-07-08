'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { setToken } from '@/lib/auth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGlobalError(null);
    setIsLoading(true);

    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setToken(data.token);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.message) {
        setGlobalError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card title="Create Character" className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {globalError && (
            <div className="bg-rpg-error/20 border border-rpg-error text-rpg-error p-3 text-sm font-retro text-center">
              {globalError}
            </div>
          )}
          
          <Input 
            label="Username" 
            type="text" 
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            error={errors.username}
            required
            minLength={3}
            maxLength={50}
          />

          <Input 
            label="Email" 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
            required
          />
          
          <Input 
            label="Password" 
            type="password" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            error={errors.password}
            required
            minLength={6}
          />

          <Button type="submit" disabled={isLoading} className="w-full mt-2">
            {isLoading ? 'Forging...' : 'Register'}
          </Button>

          <p className="text-center text-sm font-retro text-rpg-text mt-4">
            Already have an account? <Link href="/login" className="text-rpg-primary hover:underline">Login here</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
