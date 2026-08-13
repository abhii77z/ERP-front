'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SupplierDetailPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/suppliers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Supplier Details</h2>
          <p className="text-slate-500">View information for supplier ID: {id}</p>
        </div>
      </div>
      <Card>
        <CardContent className="p-10 text-center text-slate-500">
          <p>Supplier details and purchase history will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
