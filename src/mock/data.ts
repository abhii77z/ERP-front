import { Product, Category, Customer, Supplier, Sale, Purchase, DashboardSummary, Expense, StockMovement } from '../types';

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Tops', description: 'Shirts, T-shirts, and blouses', productCount: 45, status: 'ACTIVE' },
  { id: 'cat-2', name: 'Bottoms', description: 'Jeans, trousers, and shorts', productCount: 30, status: 'ACTIVE' },
  { id: 'cat-3', name: 'Outerwear', description: 'Jackets and coats', productCount: 15, status: 'ACTIVE' },
  { id: 'cat-4', name: 'Footwear', description: 'Shoes and sneakers', productCount: 20, status: 'ACTIVE' },
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic Denim Jacket',
    sku: 'OUT-CDJ-M',
    categoryId: 'cat-3',
    unit: 'pcs',
    purchasePrice: 1200,
    sellingPrice: 2499,
    tax: 18,
    stock: 45,
    minStock: 10,
    size: 'M',
    color: 'Blue',
    brand: 'Levi',
    gender: 'Unisex',
    status: 'ACTIVE',
  },
  {
    id: 'prod-2',
    name: 'Cotton V-Neck T-Shirt',
    sku: 'TOP-CVT-L',
    categoryId: 'cat-1',
    unit: 'pcs',
    purchasePrice: 250,
    sellingPrice: 499,
    tax: 5,
    stock: 8,
    minStock: 15,
    size: 'L',
    color: 'White',
    brand: 'BasicWear',
    gender: 'Men',
    status: 'ACTIVE',
  },
  {
    id: 'prod-3',
    name: "Women's High-Waist Jeans",
    sku: 'BOT-WHJ-28',
    categoryId: 'cat-2',
    unit: 'pcs',
    purchasePrice: 800,
    sellingPrice: 1699,
    tax: 12,
    stock: 120,
    minStock: 20,
    size: '28',
    color: 'Black',
    brand: 'DenimCo',
    gender: 'Women',
    status: 'ACTIVE',
  },
  {
    id: 'prod-4',
    name: 'Running Sneakers',
    sku: 'FTW-RS-9',
    categoryId: 'cat-4',
    unit: 'pairs',
    purchasePrice: 2500,
    sellingPrice: 4200,
    tax: 18,
    stock: 5,
    minStock: 10,
    size: '9',
    color: 'Grey',
    brand: 'Puma',
    gender: 'Men',
    status: 'ACTIVE',
  },
  {
    id: 'prod-5',
    name: 'Kids Winter Beanie',
    sku: 'ACC-KWB-S',
    categoryId: 'cat-3',
    unit: 'pcs',
    purchasePrice: 150,
    sellingPrice: 350,
    tax: 5,
    stock: 0,
    minStock: 10,
    size: 'S',
    color: 'Red',
    brand: 'CozyKids',
    gender: 'Kids',
    status: 'ACTIVE',
  },
];

export const mockCustomers: Customer[] = [
  { id: 'cust-1', name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@example.com', totalOrders: 12, totalSpent: 45000, outstanding: 0, status: 'ACTIVE' },
  { id: 'cust-2', name: 'Priya Patel', phone: '8765432109', email: 'priya@example.com', totalOrders: 5, totalSpent: 12500, outstanding: 2500, status: 'ACTIVE' },
  { id: 'cust-3', name: 'Amit Kumar', phone: '7654321098', totalOrders: 2, totalSpent: 3000, outstanding: 0, status: 'ACTIVE' },
];

export const mockSuppliers: Supplier[] = [
  { id: 'sup-1', name: 'TechZone Distributors', contactPerson: 'Sanjay Verma', phone: '9988776655', email: 'sales@techzone.in', totalPurchases: 150000, outstanding: 25000, status: 'ACTIVE' },
  { id: 'sup-2', name: 'GreenFarm Organics', contactPerson: 'Neha Singh', phone: '8877665544', email: 'orders@greenfarm.in', totalPurchases: 45000, outstanding: 0, status: 'ACTIVE' },
];

export const mockSales: Sale[] = [
  {
    id: 'sale-1',
    invoiceNumber: 'INV-2023-001',
    customerId: 'cust-1',
    customerName: 'Rahul Sharma',
    date: new Date().toISOString(),
    items: [
      { id: 'si-1', productId: 'prod-1', productName: 'Classic Denim Jacket', quantity: 2, unitPrice: 2499, discount: 0, tax: 899.64, subtotal: 4998, total: 4998 }
    ],
    subtotal: 4235.59,
    taxTotal: 762.41,
    discountTotal: 0,
    total: 4998,
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    status: 'COMPLETED'
  },
  {
    id: 'sale-2',
    invoiceNumber: 'INV-2023-002',
    customerId: 'cust-2',
    customerName: 'Priya Patel',
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    items: [
      { id: 'si-2', productId: 'prod-4', productName: 'Running Sneakers', quantity: 1, unitPrice: 4200, discount: 200, tax: 720, subtotal: 4000, total: 4720 }
    ],
    subtotal: 4000,
    taxTotal: 720,
    discountTotal: 200,
    total: 4720,
    paymentMethod: 'CREDIT',
    paymentStatus: 'PARTIAL',
    status: 'COMPLETED'
  }
];

export const mockDashboardData: DashboardSummary = {
  totalSales: 85400,
  totalPurchases: 52300,
  revenue: 85400,
  netProfit: 21700,
  recentSales: mockSales,
  lowStockProducts: mockProducts.filter(p => p.stock <= p.minStock),
  salesData: [
    { name: 'Mon', sales: 4000, purchases: 2400 },
    { name: 'Tue', sales: 3000, purchases: 1398 },
    { name: 'Wed', sales: 2000, purchases: 9800 },
    { name: 'Thu', sales: 2780, purchases: 3908 },
    { name: 'Fri', sales: 18900, purchases: 4800 },
    { name: 'Sat', sales: 2390, purchases: 3800 },
    { name: 'Sun', sales: 3490, purchases: 4300 },
  ]
};

export const mockPurchases: Purchase[] = [
  {
    id: 'pur-1',
    referenceNumber: 'PO-2023-001',
    supplierId: 'sup-1',
    supplierName: 'TechZone Distributors',
    date: new Date().toISOString(),
    items: [],
    subtotal: 15000,
    taxTotal: 2700,
    discountTotal: 0,
    total: 17700,
    paymentMethod: 'BANK_TRANSFER',
    paymentStatus: 'PAID',
    status: 'RECEIVED'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: 'exp-1',
    date: new Date().toISOString(),
    description: 'Office Rent - June',
    category: 'Rent',
    amount: 15000,
    paymentMethod: 'Bank Transfer',
    status: 'PAID'
  },
  {
    id: 'exp-2',
    date: new Date().toISOString(),
    description: 'Electricity Bill',
    category: 'Utilities',
    amount: 2500,
    paymentMethod: 'UPI',
    status: 'PAID'
  }
];

export const mockEmployees = [
  {
    id: 'emp-1',
    name: 'Suresh Kumar',
    employeeId: 'EMP-001',
    department: 'Sales',
    role: 'MANAGER',
    phone: '9876543210',
    status: 'ACTIVE'
  },
  {
    id: 'emp-2',
    name: 'Anjali Verma',
    employeeId: 'EMP-002',
    department: 'Operations',
    role: 'STAFF',
    phone: '8765432109',
    status: 'ACTIVE'
  }
];
