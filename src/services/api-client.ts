import { Product, Category, Customer, Supplier, Sale, Purchase, DashboardSummary, Expense } from '../types';
import * as mockData from '../mock/data';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// ─── HTTP Helper ──────────────────────────────────────────────────────────────
async function handleMockRequest(endpoint: string, _options: RequestInit): Promise<any> {
  console.warn(`Using mock data for ${endpoint}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // simulate network delay

  if (endpoint === '/dashboard/summary') return mockData.mockDashboardData;
  if (endpoint.startsWith('/products/low-stock')) return mockData.mockProducts.filter(p => p.stock <= p.minStock);
  if (endpoint.startsWith('/products')) return { content: mockData.mockProducts };
  if (endpoint.startsWith('/categories')) return mockData.mockCategories;
  if (endpoint.startsWith('/sales')) return { content: mockData.mockSales };
  if (endpoint.startsWith('/purchases')) return { content: mockData.mockPurchases };
  if (endpoint.startsWith('/customers')) return { content: mockData.mockCustomers };
  if (endpoint.startsWith('/suppliers')) return { content: mockData.mockSuppliers };
  if (endpoint.startsWith('/expenses')) return { content: mockData.mockExpenses };
  if (endpoint.startsWith('/employees')) return mockData.mockEmployees;
  if (endpoint === '/auth/login') return { token: 'mock-token', name: 'Admin', email: 'admin@example.com', role: 'ADMIN', id: 1 };
  if (endpoint === '/auth/me') return { name: 'Admin', email: 'admin@example.com', role: 'ADMIN' };
  
  // Basic mock responses for other endpoints to prevent crashes
  if (endpoint.startsWith('/inventory')) return [];
  if (endpoint.startsWith('/reports')) return [];

  throw new Error(`Mock not implemented for ${endpoint}`);
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('erp_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || `HTTP error: ${response.status}`);
    }

    return json.data;
  } catch (error) {
    const isMockEnabled = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';
    if (isMockEnabled) {
      return handleMockRequest(endpoint, options) as Promise<T>;
    }
    throw error;
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authService = {
  login: async (email: string, password: string) => {
    const data = await request<{ token: string; name: string; email: string; role: string; id: number }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    );
    if (data.token) localStorage.setItem('erp_token', data.token);
    return data;
  },

  logout: () => {
    localStorage.removeItem('erp_token');
  },

  getMe: () => request<{ name: string; email: string; role: string }>('/auth/me'),
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const dashboardService = {
  getDashboardSummary: (): Promise<DashboardSummary> =>
    request<DashboardSummary>('/dashboard/summary'),
};

// ─── Products ─────────────────────────────────────────────────────────────────
export const productService = {
  getProducts: (search = '', page = 0, size = 100): Promise<{ content: Product[] }> =>
    request<{ content: Product[] }>(`/products?search=${encodeURIComponent(search)}&page=${page}&size=${size}`),

  getProduct: (id: string): Promise<Product> =>
    request<Product>(`/products/${id}`),

  createProduct: (data: Partial<Product>): Promise<Product> =>
    request<Product>('/products', { method: 'POST', body: JSON.stringify(data) }),

  updateProduct: (id: string, data: Partial<Product>): Promise<Product> =>
    request<Product>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteProduct: (id: string): Promise<void> =>
    request<void>(`/products/${id}`, { method: 'DELETE' }),

  getLowStockProducts: (): Promise<Product[]> =>
    request<Product[]>('/products/low-stock'),
};

// ─── Categories ───────────────────────────────────────────────────────────────
export const categoryService = {
  getCategories: (): Promise<Category[]> =>
    request<Category[]>('/categories'),

  createCategory: (data: Partial<Category>): Promise<Category> =>
    request<Category>('/categories', { method: 'POST', body: JSON.stringify(data) }),

  updateCategory: (id: string, data: Partial<Category>): Promise<Category> =>
    request<Category>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteCategory: (id: string): Promise<void> =>
    request<void>(`/categories/${id}`, { method: 'DELETE' }),
};

// ─── Sales ────────────────────────────────────────────────────────────────────
export const saleService = {
  getSales: (search = '', page = 0, size = 50): Promise<{ content: Sale[] }> =>
    request<{ content: Sale[] }>(`/sales?search=${encodeURIComponent(search)}&page=${page}&size=${size}`),

  getSale: (id: string): Promise<Sale> =>
    request<Sale>(`/sales/${id}`),

  createSale: (data: Partial<Sale>): Promise<Sale> =>
    request<Sale>('/sales', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Purchases ────────────────────────────────────────────────────────────────
export const purchaseService = {
  getPurchases: (page = 0, size = 50): Promise<{ content: Purchase[] }> =>
    request<{ content: Purchase[] }>(`/purchases?page=${page}&size=${size}`),

  createPurchase: (data: Partial<Purchase>): Promise<Purchase> =>
    request<Purchase>('/purchases', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Customers ────────────────────────────────────────────────────────────────
export const customerService = {
  getCustomers: (search = ''): Promise<{ content: Customer[] }> =>
    request<{ content: Customer[] }>(`/customers?search=${encodeURIComponent(search)}`),

  getCustomer: (id: string): Promise<Customer> =>
    request<Customer>(`/customers/${id}`),

  createCustomer: (data: Partial<Customer>): Promise<Customer> =>
    request<Customer>('/customers', { method: 'POST', body: JSON.stringify(data) }),

  updateCustomer: (id: string, data: Partial<Customer>): Promise<Customer> =>
    request<Customer>(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// ─── Suppliers ────────────────────────────────────────────────────────────────
export const supplierService = {
  getSuppliers: (search = ''): Promise<{ content: Supplier[] }> =>
    request<{ content: Supplier[] }>(`/suppliers?search=${encodeURIComponent(search)}`),

  getSupplier: (id: string): Promise<Supplier> =>
    request<Supplier>(`/suppliers/${id}`),

  createSupplier: (data: Partial<Supplier>): Promise<Supplier> =>
    request<Supplier>('/suppliers', { method: 'POST', body: JSON.stringify(data) }),

  updateSupplier: (id: string, data: Partial<Supplier>): Promise<Supplier> =>
    request<Supplier>(`/suppliers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// ─── Expenses ─────────────────────────────────────────────────────────────────
export const expenseService = {
  getExpenses: (page = 0, size = 50): Promise<{ content: Expense[] }> =>
    request<{ content: Expense[] }>(`/expenses?page=${page}&size=${size}`),

  createExpense: (data: Partial<Expense>): Promise<Expense> =>
    request<Expense>('/expenses', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Employees ────────────────────────────────────────────────────────────────
export const employeeService = {
  getEmployees: (): Promise<any[]> =>
    request<any[]>('/employees'),

  createEmployee: (data: any): Promise<any> =>
    request<any>('/employees', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Inventory ────────────────────────────────────────────────────────────────
export const inventoryService = {
  adjustStock: (productId: string, quantity: number, type: string, notes?: string) =>
    request('/inventory/adjust', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, type, notes }),
    }),

  getMovements: (page = 0) =>
    request(`/inventory/movements?page=${page}`),

  getProductMovements: (productId: string) =>
    request(`/inventory/movements/${productId}`),
};

// ─── Reports ──────────────────────────────────────────────────────────────────
export const reportService = {
  getSalesReport: (from: string, to: string) =>
    request(`/reports/sales?from=${from}&to=${to}`),

  getPurchaseReport: (from: string, to: string) =>
    request(`/reports/purchases?from=${from}&to=${to}`),

  getInventoryReport: () =>
    request('/reports/inventory'),

  getExpenseReport: (from: string, to: string) =>
    request(`/reports/expenses?from=${from}&to=${to}`),

  getProfitLossReport: (from: string, to: string) =>
    request(`/reports/profit-loss?from=${from}&to=${to}`),
};
