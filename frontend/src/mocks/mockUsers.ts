import type { UserResponse } from "../types/type";

export const mockUsers: UserResponse[] = [
  // Google
  {
    id: "u1",
    email: "customer.google@gmail.com",
    fullname: "Nguyễn Văn Google",
    phone: "0987654321",
    birthDate: "1998-05-20",
    gender: 1,
    role: "customer",
    status: 1,
    googleId: "google_123456789",
  },

  // Thủ công
  {
    id: "u2",
    email: "customer.manual@gmail.com",
    fullname: "Trần Thị Thủ Công",
    phone: "0912345678",
    birthDate: "2000-08-15",
    gender: 0,
    role: "customer",
    status: 1,
  },

  // admin
  {
    id: "u3",
    email: "admin@gmail.com",
    fullname: "Quản Trị Viên",
    phone: "0909999999",
    birthDate: "1995-01-01",
    gender: 1,
    role: "admin",
    status: 1,
  },
];
