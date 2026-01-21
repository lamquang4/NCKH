import type { Cart } from "../types/type";
import { mockProducts } from "./mockProducts";

const p1 = mockProducts.find((p) => p.id === "1")!;
const p2 = mockProducts.find((p) => p.id === "2")!;
const p3 = mockProducts.find((p) => p.id === "4")!; // tai nghe

export const mockCart: Cart = {
  id: "cart_001",
  userId: "user_123",
  createdAt: "2026-01-21T10:30:00Z",
  items: [
    {
      id: "item_001",
      productId: p1.id,
      name: p1.name,
      images: p1.images.map((img) => img.image),
      price: p1.price,
      discount: p1.discount,
      slug: p1.slug,
      quantity: 2,
      stock: p1.stock,
    },
    {
      id: "item_002",
      productId: p2.id,
      name: p2.name,
      images: p2.images.map((img) => img.image),
      price: p2.price,
      discount: p2.discount,
      slug: p2.slug,
      quantity: 1,
      stock: p2.stock,
    },
    {
      id: "item_003",
      productId: p3.id,
      name: p3.name,
      images: p3.images.map((img) => img.image),
      price: p3.price,
      discount: p3.discount,
      slug: p3.slug,
      quantity: 6,
      stock: p3.stock,
    },
  ],
};
