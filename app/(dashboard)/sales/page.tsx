'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { saleService } from '@/src/services/api-client';
import { Sale } from '@/src/types';
import { formatCurrency, formatDate } from '@/src/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Eye, Printer, FileText } from 'lucide-react';

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadSales = async () => {
      try {
        const data = await saleService.getSales();
        setSales(data);
      } catch (error) {
        console.error('Failed to fetch sales', error);
      } finally {
        setLoading(false);
      }
    };
    loadSales();
  }, []);

  const filteredSales = sales.filter(s => 
    s.invoiceNumber.toLowerCase().includes(search.toLowerCase()) || 
    (s.customerName && s.customerName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sales</h2>
          <p className="text-slate-500">View and manage all sales transactions</p>
        </div>
        <Link href="/sales/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Sale
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-200">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Search by invoice or customer..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">Loading sales...</TableCell>
                </TableRow>
              ) : filteredSales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-slate-500">No sales found</TableCell>
                </TableRow>
              ) : (
                filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium text-slate-900">{sale.invoiceNumber}</TableCell>
                    <TableCell>{formatDate(sale.date)}</TableCell>
                    <TableCell>{sale.customerName || 'Walk-in'}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(sale.total)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={sale.paymentStatus === 'PAID' ? 'success' : sale.paymentStatus === 'PARTIAL' ? 'warning' : 'destructive'}>
                          {sale.paymentStatus}
                        </Badge>
                        <span className="text-xs text-slate-500 hidden sm:inline-block">{sale.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={sale.status === 'COMPLETED' ? 'success' : 'secondary'}>
                        {sale.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
