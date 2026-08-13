'use client';
import { useEffect, useState } from 'react';
import { dashboardService } from '@/src/services/api-client';
import { DashboardSummary } from '@/src/types';
import { formatCurrency, formatDate } from '@/src/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  IndianRupee, 
  TrendingUp, 
  ShoppingCart, 
  Package,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await dashboardService.getDashboardSummary();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-500">Overview of your business performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Sales</CardTitle>
            <IndianRupee className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(data.totalSales)}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(data.totalPurchases)}</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +4.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(data.netProfit)}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{data.lowStockProducts.length}</div>
            <p className="text-xs text-amber-600 flex items-center mt-1">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [formatCurrency(value || 0), 'Revenue']}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales vs Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} name="Sales" />
                  <Bar dataKey="purchases" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Purchases" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions & Low Stock */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentSales.slice(0, 5).map(sale => (
                <div key={sale.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-900">{sale.customerName}</p>
                    <p className="text-sm text-slate-500">{sale.invoiceNumber} • {formatDate(sale.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{formatCurrency(sale.total)}</p>
                    <Badge variant={sale.paymentStatus === 'PAID' ? 'success' : sale.paymentStatus === 'PARTIAL' ? 'warning' : 'destructive'} className="mt-1">
                      {sale.paymentStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.lowStockProducts.slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-900">{product.name}</p>
                    <p className="text-sm text-slate-500">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">{product.stock} {product.unit} left</p>
                    <p className="text-xs text-slate-500">Min: {product.minStock}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
