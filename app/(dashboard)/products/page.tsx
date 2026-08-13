'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productService } from '@/src/services/api-client';
import { Product } from '@/src/types';
import { formatCurrency } from '@/src/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Products</h2>
          <p className="text-slate-500">Manage your product catalog and inventory</p>
        </div>
        <Link href="/products/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-200">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Search products by name or SKU..." 
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
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Attributes</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">Loading products...</TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-slate-500">No products found</TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-500">SKU: {product.sku}</div>
                    </TableCell>
                    <TableCell>{product.category?.name || 'Uncategorized'}</TableCell>
                    <TableCell>{product.brand || '-'}</TableCell>
                    <TableCell>
                      {product.size && <Badge variant="outline" className="mr-1">{product.size}</Badge>}
                      {product.color && <Badge variant="outline">{product.color}</Badge>}
                      {!product.size && !product.color && <span className="text-slate-500">-</span>}
                    </TableCell>
                    <TableCell>
                      <div>{formatCurrency(product.sellingPrice)}</div>
                      <div className="text-xs text-slate-500">Buy: {formatCurrency(product.purchasePrice)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={product.stock <= product.minStock ? 'text-red-600 font-medium' : ''}>
                          {product.stock} {product.unit}
                        </span>
                        {product.stock <= product.minStock && (
                          <Badge variant="destructive" className="px-1.5 py-0 text-[10px]">Low</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === 'ACTIVE' ? 'success' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
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
