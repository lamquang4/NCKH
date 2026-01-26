import type { CategoryResponse } from "../types/type";

export const mockCategories: CategoryResponse[] = [
  {
    id: "c1",
    name: "Laptop",
    slug: "laptop",
    image: "/assets/categories/laptop.png",
    status: 1,
  },
  {
    id: "c2",
    name: "Bàn phím",
    slug: "ban-phim",
    image: "/assets/categories/banphim.png",
    status: 1,
  },
  {
    id: "c3",
    name: "Chuột",
    slug: "chuot",
    image: "/assets/categories/chuot.png",
    status: 1,
  },
  {
    id: "c4",
    name: "Tai nghe",
    slug: "tai-nghe",
    image: "/assets/categories/tainghe.png",
    status: 1,
  },
  {
    id: "c5",
    name: "Ghế",
    slug: "ghe",
    image: "/assets/categories/ghe.png",
    status: 1,
  },
];
