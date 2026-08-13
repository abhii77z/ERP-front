'use client';
import { useEffect, useState } from 'react';
import { productService } from '@/src/services/api-client';
import { Product } from '@/src/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, RefreshCw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data.content);
      } catch (error) {
        console.error('Failed to fetch inventory', error);
      } finally {
        setLoading(false);
      }
    };
    loadInventory();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Inventory</h2>
          <p className="text-slate-500">Track and manage your stock levels</p>
        </div>
        <div className="flex gap-2">
          <Link href="/inventory/movements">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Stock Movements
            </Button>
          </Link>
          <Button className="gap-2">
            Adjust Stock
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-200">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Search inventory..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">Loading inventory...</TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-slate-500">No inventory found</TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  const isLowStock = product.stock <= product.minStock;
                  const isOutOfStock = product.stock === 0;
                  
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                      <TableCell className="text-slate-500">{product.sku}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-medium", 
                          isOutOfStock ? "text-red-600" : isLowStock ? "text-amber-600" : "text-slate-900"
                        )}>
                          {product.stock} {product.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-500">{product.minStock} {product.unit}</TableCell>
                      <TableCell>
                        {isOutOfStock ? (
                          <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" /> Out of Stock</Badge>
                        ) : isLowStock ? (
                          <Badge variant="warning" className="gap-1"><AlertTriangle className="h-3 w-3" /> Low Stock</Badge>
                        ) : (
                          <Badge variant="success">In Stock</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-blue-600 font-medium">Update</Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Add a helper for local class merging in the file since we didn't import cn directly, wait I need to import it.
