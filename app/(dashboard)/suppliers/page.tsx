'use client';
import { useEffect, useState } from 'react';
import { supplierService } from '@/src/services/api-client';
import { Supplier } from '@/src/types';
import { formatCurrency } from '@/src/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Mail, Phone, MoreHorizontal, User } from 'lucide-react';
import Link from 'next/link';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const data = await supplierService.getSuppliers();
        setSuppliers(data.content);
      } catch (error) {
        console.error('Failed to fetch suppliers', error);
      } finally {
        setLoading(false);
      }
    };
    loadSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Suppliers</h2>
          <p className="text-slate-500">Manage your vendors and purchase orders</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-200">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Search suppliers..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Total Purchases</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">Loading suppliers...</TableCell>
                </TableRow>
              ) : filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-slate-500">No suppliers found</TableCell>
                </TableRow>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <Link href={`/suppliers/${supplier.id}`} className="font-medium text-blue-600 hover:underline">
                        {supplier.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5"><User className="h-3 w-3" /> {supplier.contactPerson}</div>
                        <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {supplier.phone}</div>
                        {supplier.email && <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {supplier.email}</div>}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(supplier.totalPurchases)}</TableCell>
                    <TableCell>
                      <span className={supplier.outstanding > 0 ? "text-red-600 font-medium" : "text-slate-500"}>
                        {formatCurrency(supplier.outstanding)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={supplier.status === 'ACTIVE' ? 'success' : 'secondary'}>
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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
