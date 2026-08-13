'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Store } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 font-bold text-2xl text-blue-600">
          <div className="h-10 w-10 rounded bg-blue-600 flex items-center justify-center text-white">
            <Store className="h-6 w-6" />
          </div>
          BizFlow
        </div>
      </div>
      
      <Card className="shadow-lg border-0 ring-1 ring-slate-200">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                Email address
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@bizflow.com" 
                required 
                defaultValue="admin@bizflow.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                  Password
                </label>
                <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                defaultValue="password123"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" defaultChecked />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me for 30 days
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 py-4">
          <p className="text-sm text-slate-500">
            Don't have an account? <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">Contact Sales</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
