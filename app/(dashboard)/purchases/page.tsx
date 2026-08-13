'use client';
import { useEffect, useState } from 'react';
import { purchaseService } from '@/src/services/api-client';
import { Purchase } from '@/src/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, MoreHorizontal } from 'lucide-react';
import { formatCurrency, formatDate } from '@/src/lib/utils';

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    purchaseService.getPurchases().then(data => {
      setPurchases(data.content);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Purchases</h2>
          <p className="text-slate-500">Manage purchase orders and supplier invoices</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> New Purchase</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7} className="text-center py-4">Loading...</TableCell></TableRow>
              ) : (
                purchases.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-slate-900">{p.referenceNumber}</TableCell>
                    <TableCell>{formatDate(p.date)}</TableCell>
                    <TableCell>{p.supplierName}</TableCell>
                    <TableCell>{formatCurrency(p.total)}</TableCell>
                    <TableCell><Badge variant={p.paymentStatus === 'PAID' ? 'success' : 'secondary'}>{p.paymentStatus}</Badge></TableCell>
                    <TableCell><Badge variant="outline">{p.status}</Badge></TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
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
