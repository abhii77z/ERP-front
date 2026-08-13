'use client';
import { Bell, Search, User, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const title = pathname.split('/')[1]?.charAt(0).toUpperCase() + pathname.split('/')[1]?.slice(1) || 'Dashboard';

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-9 bg-slate-50 border-transparent focus:bg-white"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
