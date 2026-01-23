// USER
export interface User {
  id?: string;
  email: string;
  fullname: string;
  phone?: string;
  birthDate?: string;
  gender?: number | null;
  password?: string;
  role: "customer" | "admin";
  status: number;
  googleId?: string;
  createdAt?: string;
}

// BRAND
export interface Brand {
  id?: string;
  name: string;
  slug: string;
  status: number;
  createdAt?: string;
}

// CATEGORY
export interface Category {
  id?: string;
  name: string;
  slug: string;
  image?: string;
  status: number;
  createdAt?: string;
}

// PRODUCT
export interface ImageProduct {
  id: string;
  image: string;
}

export interface Specification {
  id: string;
  specKey: string;
  specValue: string;
  displayOrder: number;
  isNew?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  description: string;
  status: number;
  stock: number;
  category: Category;
  brand: Brand;
  images: ImageProduct[];
  specifications: Specification[];
  createdAt?: string;
}

// CART
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  images: string[];
  price: number;
  discount: number;
  slug: string;
  quantity: number;
  stock: number;
}

export interface Cart {
  id?: string;
  userId?: string;
  items: CartItem[];
  createdAt?: string;
}

// ORDER
export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  images: string[];
  quantity: number;
  price: number;
  discount: number;
}

export interface Order {
  id: string;
  orderCode: string;
  userId: string;
  email: string;
  fullname: string;
  phone: string;
  speaddress: string;
  city: string;
  ward: string;
  paymethod: string;
  status: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderAdd {
  fullname: string;
  phone: string;
  speaddress: string;
  city: string;
  ward: string;
  paymethod: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
}

// PAYMENT
export interface Payment {
  id?: string;
  orderId: string;
  orderCode: string;
  paymethod: string;
  amount: number;
  transactionId?: string;
  status: number; // 1 success, 0 refund
  createdAt: string;
}

// CHAT
export interface Chat {
  id: string;
  userId: string;
  sessionData: Record<string, any>;
  createdAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  isBot: boolean;
  content: string;
  products: string[];
  extraData: Record<string, any>;
  createdAt: string;
}

// ADDRESS
export type Ward = {
  name: string;
  mergedFrom: string[];
};

export type Province = {
  id: string;
  province: string;
  wards: Ward[];
};
