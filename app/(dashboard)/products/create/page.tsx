'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/products');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Add Product</h2>
            <p className="text-slate-500">Create a new product in your inventory</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} className="gap-2">
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name *</label>
                  <Input required placeholder="E.g. Wireless Earbuds Pro" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    placeholder="Brief description of the product..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                      <option>Electronics</option>
                      <option>Groceries</option>
                      <option>Clothing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Unit</label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                      <option>Pieces (pcs)</option>
                      <option>Kilograms (kg)</option>
                      <option>Liters (l)</option>
                      <option>Packs</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Purchase Price (₹)</label>
                    <Input type="number" required placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Selling Price (₹) *</label>
                    <Input type="number" required placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax Rate (%)</label>
                  <Input type="number" placeholder="18" defaultValue="0" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SKU (Stock Keeping Unit) *</label>
                  <Input required placeholder="PROD-001" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Barcode (UPC/EAN)</label>
                  <Input placeholder="Scan or enter barcode" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Opening Stock</label>
                    <Input type="number" defaultValue="0" min="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Min Stock Level</label>
                    <Input type="number" defaultValue="5" min="0" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                    <span className="text-slate-400 font-medium">Img</span>
                  </div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Click to upload image</p>
                  <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
