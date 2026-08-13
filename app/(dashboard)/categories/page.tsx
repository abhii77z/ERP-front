'use client';
import { useEffect, useState } from 'react';
import { categoryService } from '@/src/services/api-client';
import { Category } from '@/src/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories().then(data => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Categories</h2>
          <p className="text-slate-500">Manage product categories</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Category</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-4">Loading...</TableCell></TableRow>
              ) : (
                categories.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium text-slate-900">{c.name}</TableCell>
                    <TableCell className="text-slate-500">{c.description}</TableCell>
                    <TableCell>{c.productCount}</TableCell>
                    <TableCell><Badge variant="success">{c.status}</Badge></TableCell>
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
