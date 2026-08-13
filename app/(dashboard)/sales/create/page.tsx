'use client';
import { useState, useEffect } from 'react';
import { productService, customerService, saleService } from '@/src/services/api-client';
import { Product, Customer, SaleItem } from '@/src/types';
import { formatCurrency } from '@/src/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, Trash2, ShoppingCart, User, CreditCard, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateSalePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // POS State
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'UPI'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, custData] = await Promise.all([
          productService.getProducts(),
          customerService.getCustomers()
        ]);
        setProducts(prodData.filter(p => p.stock > 0)); // Only show in-stock
        setCustomers(custData);
      } catch (error) {
        console.error('Failed to fetch POS data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev; // Cannot exceed stock
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.unitPrice } 
            : item
        );
      }
      return [...prev, {
        id: Math.random().toString(),
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.sellingPrice,
        discount: 0,
        tax: product.tax,
        subtotal: product.sellingPrice,
        total: product.sellingPrice
      }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        // We'd validate against stock here ideally
        return { ...item, quantity: newQty, total: newQty * item.unitPrice };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const taxTotal = cart.reduce((sum, item) => sum + ((item.unitPrice * item.quantity) * (item.tax / 100)), 0);
  const total = subtotal + taxTotal;

  const handleCompleteSale = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    try {
      await saleService.createSale({
        customerId: selectedCustomer || 'walk-in',
        customerName: customers.find(c => c.id === selectedCustomer)?.name || 'Walk-in Customer',
        items: cart,
        subtotal,
        taxTotal,
        discountTotal: 0,
        total,
        paymentMethod,
        paymentStatus: 'PAID',
      });
      // Reset POS or redirect
      router.push('/sales');
    } catch (error) {
      console.error('Failed to create sale', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -m-6 bg-slate-50">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        
        {/* Left Side - Product Catalog */}
        <div className="lg:col-span-2 flex flex-col border-r border-slate-200 bg-white">
          <div className="p-4 border-b border-slate-200 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                placeholder="Search products or scan barcode..." 
                className="pl-9 bg-slate-50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="flex h-10 w-[200px] items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex justify-center py-10">Loading catalog...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    onClick={() => addToCart(product)}
                    className="border border-slate-200 rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:shadow-sm transition-all flex flex-col h-full bg-white relative overflow-hidden group"
                  >
                    <div className="mb-2">
                      <h3 className="font-medium text-slate-900 text-sm line-clamp-2 leading-tight">{product.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{product.sku}</p>
                    </div>
                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <span className="font-bold text-blue-600">{formatCurrency(product.sellingPrice)}</span>
                      <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{product.stock} left</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Cart & Checkout */}
        <div className="flex flex-col bg-slate-50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-slate-500" />
              <select 
                className="flex-1 h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option value="">Walk-in Customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                ))}
              </select>
              <Button variant="outline" size="icon" className="h-9 w-9 shrink-0"><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <ShoppingCart className="h-12 w-12 opacity-20" />
                <p>Cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.productId} className="flex flex-col gap-2 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm text-slate-900 line-clamp-1">{item.productName}</span>
                    <button onClick={() => removeFromCart(item.productId)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-medium text-blue-600">{formatCurrency(item.unitPrice)}</span>
                    <div className="flex items-center border border-slate-200 rounded-md bg-slate-50">
                      <button onClick={() => updateQuantity(item.productId, -1)} className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-l-md"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, 1)} className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-r-md"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="bg-white border-t border-slate-200 p-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax (Est.)</span>
                <span>{formatCurrency(taxTotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-slate-900 pt-2 border-t border-slate-100">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {(['CASH', 'UPI', 'CARD'] as const).map(method => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 rounded-md border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    paymentMethod === method 
                      ? 'bg-blue-50 border-blue-600 text-blue-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {method === 'CARD' && <CreditCard className="h-3 w-3" />}
                  {method}
                </button>
              ))}
            </div>
            
            <Button 
              className="w-full h-12 text-base font-semibold gap-2" 
              onClick={handleCompleteSale}
              disabled={cart.length === 0 || isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Complete Sale
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
