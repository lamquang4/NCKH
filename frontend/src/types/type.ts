export type BrandStatus = 0 | 1;
export type CategoryStatus = 0 | 1;
export type ProductStatus = 0 | 1;
export type UserStatus = 0 | 1;
export type OrderStatus = 0 | 1 | 2 | 3 | 4 | 5;
export type PaymentStatus = 0 | 1;
export type UserRole = "CUSTOMER" | "ADMIN";
export type MessageRole = "USER" | "ASSISTANT";

// Request
export interface MessageRequest {
  chatId?: string;
  content: string;
}

export interface OrderRequest {
  fullname: string;
  phone: string;
  speaddress: string;
  city: string;
  ward: string;
  paymethod: string;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: string;
  quantity: number;
  price: number;
  discount: number;
}

export interface UserRequest {
  email?: string;
  fullname: string;
  phone: string;
  birthDate?: string;
  gender?: number;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface BrandRequest {
  name: string;
  status: BrandStatus;
}

export interface CategoryRequest {
  name: string;
  status: CategoryStatus;
}

export interface SpecificationRequest {
  specKey: string;
  specValue: string;
  displayOrder: number;
}

export interface ProductRequest {
  name: string;
  price: number;
  discount: number;
  description: string;
  status: ProductStatus;
  stock: number;
  categoryId: string;
  brandId: string;
  specifications: SpecificationRequest[];
}

export interface CartItemRequest {
  productId: string;
  quantity: number;
}

// Response
export interface ApiResponse<T> {
  message: string;
  data: T;
  totalPages?: number;
  total?: number;
}

export interface LoginResponse {
  token: string;
  role: string;
}

export interface UserResponse {
  id: string;
  email: string;
  fullname: string;
  phone: string | null;
  birthDate: string | null;
  gender: number | null;
  role: UserRole;
  status: UserStatus;
}

export interface BrandResponse {
  id: string;
  name: string;
  slug: string;
  status: BrandStatus;
}

export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  status: CategoryStatus;
}

export interface BrandSimpleResponse {
  id: string;
  name: string;
  slug: string;
}

export interface CategorySimpleResponse {
  id: string;
  name: string;
  slug: string;
}

export interface ImageProductResponse {
  id: string;
  image: string;
  displayOrder: number;
}

export interface SpecificationResponse {
  id: string;
  specKey: string;
  specValue: string;
  displayOrder: number;
}

export interface ProductDetailResponse {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  finalPrice: number;
  description: string;
  status: ProductStatus;
  stock: number;
  category: CategorySimpleResponse;
  brand: BrandSimpleResponse;
  images: ImageProductResponse[];
  specifications: SpecificationResponse[];
}

export interface ProductListItemResponse {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  totalSold: number;
  status: ProductStatus;
  categoryName: string;
  brandName: string;
  images: ImageProductResponse[];
}

export interface CartItemResponse {
  productId: string;
  name: string;
  images: string[];
  price: number;
  discount: number;
  slug: string;
  quantity: number;
  stock: number;
  status: ProductStatus;
}

export interface CartResponse {
  id: string;
  userId: string;
  items: CartItemResponse[];
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  name: string;
  images: string[];
  quantity: number;
  price: number;
  discount: number;
}

export interface OrderResponse {
  id: string;
  orderCode: string;
  userId: string;
  fullname: string;
  phone: string;
  speaddress: string;
  city: string;
  ward: string;
  paymethod: string;
  status: OrderStatus;
  total: number;
  items: OrderItemResponse[];
  createdAt: string;
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  orderCode: string;
  paymethod: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus; // 1 success, 0 refund
  createdAt: string;
}

export type Ward = {
  name: string;
  mergedFrom: string[];
};

export type Province = {
  id: string;
  province: string;
  wards: Ward[];
};

export interface MessageResponse {
  id: string;
  chatId: string;
  role: MessageRole;
  content: string;
  products: ProductListItemResponse[];
  createdAt: string;
}

// token
export interface TokenPayload {
  sub: string;
  role: UserRole;
  exp: number;
  iat: number;
}
