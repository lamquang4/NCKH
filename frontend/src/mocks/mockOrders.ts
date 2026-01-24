import type { OrderResponse } from "../types/type";
import { mockProducts } from "./mockProducts";

const p = (id: string) => mockProducts.find((i) => i.id === id)!;

export const mockOrders: OrderResponse[] = [
  {
    id: "order_001",
    orderCode: "DH240001",
    email: "lamquang@gmail.com",
    userId: "user_001",
    fullname: "Nguyễn Văn A",
    phone: "0909123456",
    speaddress: "123 Lê Lợi",
    ward: "Phường Bến Thành",
    city: "TP. Hồ Chí Minh",
    paymethod: "COD",
    status: 1,
    createdAt: "2026-01-20T09:30:00Z",

    items: [
      {
        id: "order_item_001",
        productId: p("2").id,
        name: p("2").name,
        images: p("2").images.map((i) => i.image),
        quantity: 1,
        price: p("2").price,
        discount: p("2").discount,
      },
      {
        id: "order_item_002",
        productId: p("6").id,
        name: p("6").name,
        images: p("6").images.map((i) => i.image),
        quantity: 2,
        price: p("6").price,
        discount: p("6").discount,
      },
    ],

    total:
      (p("2").price - p("2").discount) * 1 +
      (p("6").price - p("6").discount) * 2,
  },

  {
    id: "order_002",
    orderCode: "DH240002",
    email: "lamquang@gmail.com",
    userId: "user_001",
    fullname: "Nguyễn Văn A",
    phone: "0909123456",
    speaddress: "456 Nguyễn Trãi",
    ward: "Phường 7",
    city: "TP. Hồ Chí Minh",
    paymethod: "VNPay",
    status: 2,
    createdAt: "2026-01-18T14:15:00Z",

    items: [
      {
        id: "order_item_003",
        productId: p("4").id,
        name: p("4").name,
        images: p("4").images.map((i) => i.image),
        quantity: 1,
        price: p("4").price,
        discount: p("4").discount,
      },
    ],

    total: p("4").price - p("4").discount,
  },
];
