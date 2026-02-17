
import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number; // Optional field for discount display
  image: string;
  description: string;
  inStock: boolean;
  requiresPrescription: boolean;
  brand: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  transactionId?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string; 
  bloodGroup?: string;
  image?: string;
  isDonor?: boolean;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  location: string;
  phone: string;
  lastDonation?: string;
}

// Helper function for Levenshtein distance (Fuzzy Search)
function levenshtein(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = new Array(bn + 1);
  for (let i = 0; i <= bn; ++i) {
    let row = matrix[i] = new Array(an + 1);
    row[0] = i;
  }
  const firstRow = matrix[0];
  for (let j = 1; j <= an; ++j) {
    firstRow[j] = j;
  }
  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[bn][an];
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private http = inject(HttpClient) as HttpClient;
  
  // CONFIGURATION: Set to true when backend is running
  private readonly useApi = false; 
  private readonly apiUrl = 'http://localhost:3000/api';
  private readonly DB_PREFIX = 'medicare_db_';

  // Default Mock Data
  private readonly DEFAULT_PRODUCTS: Product[] = [
    {
      id: '1',
      name: 'Napa Extra 500mg',
      category: 'OTC Medicine',
      price: 25, 
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop',
      description: 'Effective relief from fever and mild to moderate pain.',
      inStock: true,
      requiresPrescription: false,
      brand: 'Beximco',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Seclo 20mg Capsule',
      category: 'Prescription Medicine',
      price: 70,
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=400&auto=format&fit=crop',
      description: 'Used for the treatment of acidity, heartburn, and gastric ulcers.',
      inStock: true,
      requiresPrescription: true,
      brand: 'Square',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Savlon Antiseptic Liquid',
      category: 'First Aid',
      price: 100,
      originalPrice: 110,
      image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?q=80&w=400&auto=format&fit=crop',
      description: 'Strong antiseptic liquid for first aid and personal hygiene.',
      inStock: true,
      requiresPrescription: false,
      brand: 'ACI',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Pampers Baby Diapers (L)',
      category: 'Baby Care',
      price: 1050,
      originalPrice: 1200,
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400&auto=format&fit=crop',
      description: 'Premium diapers for babies ensuring dryness and comfort.',
      inStock: true,
      requiresPrescription: false,
      brand: 'Pampers',
      rating: 4.6
    },
    {
      id: '5',
      name: 'Digital Thermometer',
      category: 'Medical Devices',
      price: 250,
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=400&auto=format&fit=crop',
      description: 'Accurate digital thermometer for home use.',
      inStock: true,
      requiresPrescription: false,
      brand: 'Omron',
      rating: 4.5
    },
    {
      id: '6',
      name: 'Vitamin C 500mg (Ceevit)',
      category: 'Health Care',
      price: 15,
      image: 'https://images.unsplash.com/photo-1616671276445-169d9e1b743a?q=80&w=400&auto=format&fit=crop',
      description: 'Immunity booster vitamin C chewable tablets.',
      inStock: true,
      requiresPrescription: false,
      brand: 'Square',
      rating: 4.9
    },
    {
      id: '7',
      name: 'Sergel 20mg',
      category: 'Prescription Medicine',
      price: 65,
      originalPrice: 70,
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400&auto=format&fit=crop',
      description: 'Esomeprazole for gastric relief.',
      inStock: true,
      requiresPrescription: true,
      brand: 'Healthcare',
      rating: 4.8
    },
    {
      id: '8',
      name: 'Dettol Handwash',
      category: 'Personal Care',
      price: 90,
      image: 'https://images.unsplash.com/photo-1584483766114-2cea6fac256d?q=80&w=400&auto=format&fit=crop',
      description: 'Antibacterial handwash refill.',
      inStock: false,
      requiresPrescription: false,
      brand: 'Reckitt',
      rating: 4.6
    }
  ];

  private readonly DEFAULT_DONORS: BloodDonor[] = [
    { id: '1', name: 'Rahim Uddin', bloodGroup: 'A+', location: 'Dhanmondi, Dhaka', phone: '01711223344' },
    { id: '2', name: 'Karim Ahmed', bloodGroup: 'O+', location: 'Uttara, Dhaka', phone: '01811223344' },
    { id: '3', name: 'Sumaia Akter', bloodGroup: 'B-', location: 'Mirpur, Dhaka', phone: '01911223344' },
    { id: '4', name: 'John Doe', bloodGroup: 'AB+', location: 'Gulshan, Dhaka', phone: '01611223344' },
    { id: '5', name: 'Fatima Begum', bloodGroup: 'O-', location: 'Mohammadpur, Dhaka', phone: '01511223344' },
  ];

  // State Signals
  readonly products = signal<Product[]>([]);
  readonly orders = signal<Order[]>([]);
  readonly bloodDonors = signal<BloodDonor[]>([]);
  readonly cart = signal<CartItem[]>([]);
  readonly currentUser = signal<User | null>(null);
  readonly isAdmin = signal<boolean>(false);
  readonly searchQuery = signal<string>('');

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    if (this.useApi) {
      // LIVE MODE: Fetch from MySQL Backend
      try {
        const products = await firstValueFrom(this.http.get<Product[]>(`${this.apiUrl}/products`));
        this.products.set(products);
        
        const donors = await firstValueFrom(this.http.get<BloodDonor[]>(`${this.apiUrl}/donors`));
        this.bloodDonors.set(donors);
        
        // Orders are fetched only on demand or if admin
      } catch (e) {
        console.error('API Connection Failed, falling back to LocalStorage', e);
        this.loadLocalData();
      }
    } else {
      // DEMO MODE: Local Storage
      this.loadLocalData();
      
      // Auto-save effects for LocalStorage
      effect(() => this.saveToStorage('products', this.products()));
      effect(() => this.saveToStorage('orders', this.orders()));
      effect(() => this.saveToStorage('donors', this.bloodDonors()));
    }
  }

  private loadLocalData() {
    this.products.set(this.loadFromStorage('products', this.DEFAULT_PRODUCTS));
    this.orders.set(this.loadFromStorage('orders', []));
    this.bloodDonors.set(this.loadFromStorage('donors', this.DEFAULT_DONORS));
  }

  // --- Persistence Helpers ---
  private loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(this.DB_PREFIX + key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  private saveToStorage(key: string, value: any) {
    try {
      localStorage.setItem(this.DB_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Database write error', e);
    }
  }

  // --- Computed ---
  readonly cartTotal = computed(() => {
    return this.cart().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  readonly cartCount = computed(() => {
    return this.cart().reduce((count, item) => count + item.quantity, 0);
  });

  readonly filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.products().filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  });

  readonly searchSuggestions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query || query.length < 2) return [];
    
    return this.products()
      .filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
      .slice(0, 5); 
  });

  readonly suggestedCorrection = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query || this.filteredProducts().length > 0) return null;

    let bestMatch = null;
    let minDistance = Infinity;

    this.products().forEach(p => {
        const dist = levenshtein(query, p.name.toLowerCase());
        if (dist < minDistance && dist < Math.max(query.length, 3)) {
            minDistance = dist;
            bestMatch = p;
        }
    });

    return bestMatch ? bestMatch.name : null;
  });

  // --- Actions ---

  addToCart(product: Product) {
    this.cart.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: string) {
    this.cart.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cart.update(items => items.map(i => i.product.id === productId ? { ...i, quantity } : i));
  }

  clearCart() {
    this.cart.set([]);
  }

  login(user: User) {
    this.currentUser.set(user);
    this.isAdmin.set(false);
  }

  loginAdmin() {
    this.isAdmin.set(true);
    this.currentUser.set(null);
    if (this.useApi) {
      // Fetch fresh orders from DB
      this.http.get<Order[]>(`${this.apiUrl}/orders`).subscribe(orders => {
        this.orders.set(orders);
      });
    }
  }

  logout() {
    this.currentUser.set(null);
    this.isAdmin.set(false);
  }

  updateProfile(updates: Partial<User>) {
    this.currentUser.update(user => {
      if (!user) return null;
      return { ...user, ...updates };
    });
    // TODO: POST /api/user/update
  }

  setSearch(query: string) {
    this.searchQuery.set(query);
  }

  registerDonor(donor: Omit<BloodDonor, 'id'>) {
    const newDonor = { ...donor, id: Date.now().toString() };
    this.bloodDonors.update(donors => [newDonor, ...donors]);
    
    if (this.useApi) {
      this.http.post(`${this.apiUrl}/donors`, newDonor).subscribe();
    }

    const user = this.currentUser();
    if (user && user.phone === donor.phone) {
        this.updateProfile({ isDonor: true, bloodGroup: donor.bloodGroup });
    }
  }

  // --- Order Management ---
  
  placeOrder(orderData: Omit<Order, 'id' | 'status' | 'orderDate'>) {
    const newOrder: Order = {
      ...orderData,
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      status: 'pending',
      orderDate: new Date().toISOString()
    };
    
    this.orders.update(orders => [newOrder, ...orders]);
    
    if (this.useApi) {
      this.http.post(`${this.apiUrl}/orders`, newOrder).subscribe();
    }
    
    return newOrder.id;
  }

  updateOrderStatus(orderId: string, status: Order['status']) {
    this.orders.update(orders => 
      orders.map(o => o.id === orderId ? { ...o, status } : o)
    );
    
    if (this.useApi) {
      this.http.put(`${this.apiUrl}/orders/${orderId}`, { status }).subscribe();
    }
  }

  // --- Inventory Management ---

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct = { ...product, id: Date.now().toString() };
    this.products.update(p => [newProduct, ...p]);
    
    if (this.useApi) {
      this.http.post(`${this.apiUrl}/products`, newProduct).subscribe();
    }
  }

  deleteProduct(id: string) {
    this.products.update(p => p.filter(item => item.id !== id));
    
    if (this.useApi) {
      this.http.delete(`${this.apiUrl}/products/${id}`).subscribe();
    }
  }

  resetDatabase() {
    if(confirm('WARNING: This will factory reset the database. All orders and new products will be lost. Continue?')) {
      if (this.useApi) {
        alert('Cannot reset live MySQL database from client for security reasons.');
      } else {
        this.products.set(this.DEFAULT_PRODUCTS);
        this.bloodDonors.set(this.DEFAULT_DONORS);
        this.orders.set([]);
        alert('Local Database has been reset to default state.');
      }
    }
  }
}
    