import type { Category } from "../types/type";

export const mockCategories: Category[] = [
  {
    id: "c1",
    name: "Laptop",
    slug: "laptop",
    image: "/assets/categories/laptop.png",
    status: 1,
    createdAt: "2024-01-01T09:00:00",
  },
  {
    id: "c2",
    name: "Tai nghe",
    slug: "tai-nghe",
    image: "/assets/categories/headphone.png",
    status: 1,
    createdAt: "2024-01-02T09:00:00",
  },
  {
    id: "c3",
    name: "Chuột",
    slug: "chuot",
    image: "/assets/categories/mouse.png",
    status: 1,
    createdAt: "2024-01-03T09:00:00",
  },
  {
    id: "c4",
    name: "Ghế",
    slug: "ghe",
    image: "/assets/categories/chair.png",
    status: 1,
    createdAt: "2024-01-04T09:00:00",
  },
];
