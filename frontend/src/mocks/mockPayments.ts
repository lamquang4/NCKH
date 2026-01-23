import type { Payment } from "../types/type";

export const mockPayments: Payment[] = [
  {
    id: "p1",
    orderId: "o1",
    orderCode: "ORD-20240101-001",
    paymethod: "VNPAY",
    amount: 16490000,
    transactionId: "VNPAY_987654321",
    status: 1,
    createdAt: "2024-01-01T10:30:00",
  },
  {
    id: "p2",
    orderId: "o2",
    orderCode: "ORD-20240102-002",
    paymethod: "VNPAY",
    amount: 16490000,
    transactionId: "VNPAY_987654321",
    status: 1, 
    createdAt: "2024-01-02T14:15:00",
  },
  {
    id: "p3",
    orderId: "o3",
    orderCode: "ORD-20240103-003",
    paymethod: "MOMO",
    amount: 12990000,
    transactionId: "MOMO_123456789",
    status: 0, // refund
    createdAt: "2024-01-03T09:45:00",
  },
  {
    id: "p4",
    orderId: "o4",
    orderCode: "ORD-20240104-004",
    paymethod: "ZALOPAY",
    amount: 8900000,
    transactionId: "ZALO_456789123",
    status: 1, // success
    createdAt: "2024-01-04T16:20:00",
  },
];
