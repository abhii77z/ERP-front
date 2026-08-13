export type Role = 'ADMIN' | 'MANAGER' | 'STAFF' | 'ACCOUNTANT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin?: string;
}

export interface Business {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  logo?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  productCount?: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  category?: Category;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  tax: number;
  stock: number;
  minStock: number;
  size?: string;
  color?: string;
  brand?: string;
  gender?: 'Men' | 'Women' | 'Kids' | 'Unisex';
  description?: string;
  image?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  outstanding: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address?: string;
  totalPurchases: number;
  outstanding: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
  subtotal: number;
  total: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName?: string;
  date: string;
  items: SaleItem[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  paymentMethod: 'CASH' | 'CARD' | 'UPI' | 'BANK_TRANSFER' | 'CREDIT';
  paymentStatus: 'PAID' | 'PARTIAL' | 'UNPAID';
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  notes?: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
  subtotal: number;
  total: number;
}

export interface Purchase {
  id: string;
  referenceNumber: string;
  supplierId: string;
  supplierName?: string;
  date: string;
  items: PurchaseItem[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  paymentMethod: 'CASH' | 'CARD' | 'UPI' | 'BANK_TRANSFER' | 'CREDIT';
  paymentStatus: 'PAID' | 'PARTIAL' | 'UNPAID';
  status: 'RECEIVED' | 'PENDING' | 'CANCELLED';
  notes?: string;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod: string;
  status: 'PAID' | 'PENDING';
}

export interface StockMovement {
  id: string;
  date: string;
  productId: string;
  productName: string;
  type: 'PURCHASE' | 'SALE' | 'ADJUSTMENT' | 'RETURN' | 'INITIAL';
  quantity: number;
  previousStock: number;
  newStock: number;
  referenceId?: string;
  userId: string;
  userName?: string;
}

export interface DashboardSummary {
  totalSales: number;
  totalPurchases: number;
  revenue: number;
  netProfit: number;
  recentSales: Sale[];
  lowStockProducts: Product[];
  salesData: { name: string; sales: number; purchases: number }[];
}
