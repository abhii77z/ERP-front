'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/src/lib/utils';
import { authService } from '@/src/services/api-client';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ListOrdered, 
  Users, 
  Truck, 
  ShoppingCart, 
  FileText, 
  CreditCard, 
  Users2, 
  BarChart3, 
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Categories', href: '/categories', icon: Layers },
  { name: 'Inventory', href: '/inventory', icon: ListOrdered },
  { name: 'Sales', href: '/sales', icon: ShoppingCart },
  { name: 'Purchases', href: '/purchases', icon: FileText },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Suppliers', href: '/suppliers', icon: Truck },
  { name: 'Expenses', href: '/expenses', icon: CreditCard },
  { name: 'Employees', href: '/employees', icon: Users2 },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Verify Users', href: '/users/verify', icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-slate-50">
      <div className="flex h-16 items-center px-6 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white">
            B
          </div>
          BizFlow
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4 space-y-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname.startsWith('/settings') ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
