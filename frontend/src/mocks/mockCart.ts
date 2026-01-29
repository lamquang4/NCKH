import type { CartResponse } from "../types/type";
import { mockProducts } from "./mockProducts";

const p1 = mockProducts.find((p) => p.id === "1")!;
const p2 = mockProducts.find((p) => p.id === "2")!;

export const mockCart: CartResponse = {
  id: "cart_001",
  userId: "user_123",
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
      status: 1,
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
      status: 1,
    },
  ],
};
