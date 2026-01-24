import type { ProductResponse } from "../types/type";

export const mockProducts: ProductResponse[] = [
  // ===== LAPTOP =====
  {
    id: "1",
    name: "Laptop Dell Inspiron 15",
    slug: "laptop-dell-inspiron-15",
    price: 18990000,
    discount: 0,
    description: "Laptop Dell Inspiron 15 phù hợp cho học tập và văn phòng.",
    status: 1,
    stock: 12,
    category: { id: "c1", name: "Laptop", slug: "laptop", status: 1 },
    brand: { id: "b1", name: "Dell", slug: "dell", status: 1 },
    images: [
      { id: "i1", image: "/assets/products/laptop1/1.png" },
      { id: "i2", image: "/assets/products/laptop1/2.png" },
    ],
    specifications: [
      { id: "s1", specKey: "CPU", specValue: "Intel Core i5", displayOrder: 1 },
      { id: "s2", specKey: "RAM", specValue: "8GB", displayOrder: 2 },
      { id: "s3", specKey: "SSD", specValue: "512GB", displayOrder: 3 },
    ],
    createdAt: "2024-01-01T10:00:00",
  },

  {
    id: "2",
    name: "Laptop ASUS Vivobook 14",
    slug: "laptop-asus-vivobook-14",
    price: 16490000,
    discount: 1500000,
    description: `
<h3>ASUS Vivobook 14 – Hiệu năng ổn định, thiết kế mỏng nhẹ</h3>

<p>
ASUS Vivobook 14 là dòng laptop hướng đến người dùng văn phòng, sinh viên và
những ai cần một chiếc máy gọn nhẹ để làm việc và học tập hằng ngày.
Với thiết kế tinh tế, trọng lượng nhẹ cùng thời lượng pin ấn tượng,
sản phẩm mang lại sự tiện lợi tối đa khi di chuyển.
</p>

<h4>Thiết kế mỏng nhẹ, hiện đại</h4>
<p>
Máy sở hữu thiết kế mỏng chỉ khoảng 19mm và trọng lượng nhẹ,
dễ dàng mang theo trong balo hoặc túi xách.
Vỏ máy được hoàn thiện chắc chắn, các đường nét tối giản
nhưng vẫn toát lên vẻ hiện đại và sang trọng.
</p>

<h4>Màn hình sắc nét, bảo vệ mắt</h4>
<p>
ASUS Vivobook 14 được trang bị màn hình 14 inch với độ phân giải Full HD,
mang lại hình ảnh rõ nét, màu sắc trung thực.
Công nghệ chống chói giúp hạn chế phản xạ ánh sáng,
kết hợp chế độ bảo vệ mắt giúp giảm mỏi khi sử dụng lâu.
</p>

<h4>Hiệu năng đáp ứng tốt nhu cầu hằng ngày</h4>
<p>
Laptop được trang bị bộ vi xử lý mạnh mẽ, đủ khả năng xử lý mượt mà
các tác vụ văn phòng như Word, Excel, PowerPoint,
lướt web, học online và chỉnh sửa hình ảnh cơ bản.
Dung lượng RAM và ổ cứng SSD giúp máy khởi động nhanh,
truy xuất dữ liệu mượt mà.
</p>

<h4>Bàn phím thoải mái, touchpad nhạy</h4>
<p>
Bàn phím có hành trình phím hợp lý, độ nảy tốt,
mang lại cảm giác gõ êm và chính xác.
Touchpad rộng rãi, hỗ trợ đa điểm,
giúp thao tác nhanh chóng và tiện lợi.
</p>

<h4>Thời lượng pin bền bỉ</h4>
<p>
Một trong những điểm mạnh của ASUS Vivobook 14 chính là thời lượng pin tốt,
đáp ứng nhiều giờ làm việc liên tục.
Bạn có thể yên tâm mang máy đi học, đi làm mà không cần sạc thường xuyên.
</p>

<h4>Kết luận</h4>
<p>
ASUS Vivobook 14 là sự lựa chọn lý tưởng cho người dùng cần
một chiếc laptop mỏng nhẹ, pin tốt, hiệu năng ổn định
và mức giá hợp lý trong phân khúc.
</p>
`,
    status: 1,
    stock: 10,
    category: { id: "c1", name: "Laptop", slug: "laptop", status: 1 },
    brand: { id: "b2", name: "ASUS", slug: "asus", status: 1 },
    images: [
      { id: "i3", image: "/assets/products/laptop2/1.png" },
      { id: "i4", image: "/assets/products/laptop2/2.png" },
    ],
    specifications: [
      { id: "s4", specKey: "CPU", specValue: "Intel Core i5", displayOrder: 1 },
      { id: "s5", specKey: "RAM", specValue: "16GB", displayOrder: 2 },
      { id: "s6", specKey: "SSD", specValue: "512GB", displayOrder: 3 },
    ],
    createdAt: "2024-01-02T10:00:00",
  },

  {
    id: "3",
    name: "Laptop HP Pavilion 15",
    slug: "laptop-hp-pavilion-15",
    price: 17990000,
    discount: 0,
    description: "HP Pavilion 15 thiết kế đẹp, hiệu năng ổn định.",
    status: 1,
    stock: 7,
    category: { id: "c1", name: "Laptop", slug: "laptop", status: 1 },
    brand: { id: "b3", name: "HP", slug: "hp", status: 1 },
    images: [
      { id: "i5", image: "/assets/products/laptop3/1.png" },
      { id: "i6", image: "/assets/products/laptop3/2.png" },
    ],
    specifications: [
      { id: "s7", specKey: "CPU", specValue: "Intel Core i7", displayOrder: 1 },
      { id: "s8", specKey: "RAM", specValue: "16GB", displayOrder: 2 },
      { id: "s9", specKey: "SSD", specValue: "1TB", displayOrder: 3 },
    ],
    createdAt: "2024-01-03T10:00:00",
  },

  // ===== TAI NGHE =====
  {
    id: "4",
    name: "Tai nghe Sony WH-1000XM5",
    slug: "tai-nghe-sony-wh-1000xm5",
    price: 7990000,
    discount: 2000000,
    description: "Tai nghe chống ồn cao cấp Sony WH-1000XM5.",
    status: 1,
    stock: 5,
    category: { id: "c2", name: "Tai nghe", slug: "tai-nghe", status: 1 },
    brand: { id: "b4", name: "Sony", slug: "sony", status: 1 },
    images: [
      { id: "i7", image: "/assets/products/tainghe1/1.png" },
      { id: "i8", image: "/assets/products/tainghe1/2.png" },
    ],
    specifications: [
      {
        id: "s10",
        specKey: "Chống ồn",
        specValue: "Active Noise Cancelling",
        displayOrder: 1,
      },
      { id: "s11", specKey: "Pin", specValue: "30 giờ", displayOrder: 2 },
    ],
    createdAt: "2024-01-04T10:00:00",
  },

  {
    id: "5",
    name: "Tai nghe Apple AirPods Pro 2",
    slug: "tai-nghe-airpods-pro-2",
    price: 6490000,
    discount: 0,
    description: "AirPods Pro 2 với chip H2, âm thanh vượt trội.",
    status: 1,
    stock: 9,
    category: { id: "c2", name: "Tai nghe", slug: "tai-nghe", status: 1 },
    brand: { id: "b5", name: "Apple", slug: "apple", status: 1 },
    images: [
      { id: "i9", image: "/assets/products/tainghe2/1.jpg" },
      { id: "i10", image: "/assets/products/tainghe2/2.jpg" },
    ],
    specifications: [
      { id: "s12", specKey: "Chip", specValue: "Apple H2", displayOrder: 1 },
      { id: "s13", specKey: "Pin", specValue: "24 giờ", displayOrder: 2 },
    ],
    createdAt: "2024-01-05T10:00:00",
  },
  // ===== CHUỘT =====
  {
    id: "6",
    name: "Chuột Logitech G Pro X",
    slug: "chuot-logitech-g-pro-x",
    price: 2990000,
    discount: 100000,
    description: "Chuột gaming Logitech G Pro X siêu nhẹ, chính xác cao.",
    status: 1,
    stock: 20,
    category: { id: "c3", name: "Chuột", slug: "chuot", status: 1 },
    brand: { id: "b6", name: "Logitech", slug: "logitech", status: 1 },
    images: [
      { id: "i11", image: "/assets/products/chuot1/1.png" },
      { id: "i12", image: "/assets/products/chuot1/2.png" },
    ],
    specifications: [
      { id: "s14", specKey: "DPI", specValue: "25600", displayOrder: 1 },
      { id: "s15", specKey: "Trọng lượng", specValue: "63g", displayOrder: 2 },
    ],
    createdAt: "2024-01-06T10:00:00",
  },

  {
    id: "7",
    name: "Chuột Razer DeathAdder V3",
    slug: "chuot-razer-deathadder-v3",
    price: 2590000,
    discount: 150000,
    description: "Chuột gaming Razer DeathAdder V3 công thái học.",
    status: 1,
    stock: 15,
    category: { id: "c3", name: "Chuột", slug: "chuot", status: 1 },
    brand: { id: "b7", name: "Razer", slug: "razer", status: 1 },
    images: [
      { id: "i13", image: "/assets/products/chuot2/1.jpg" },
      { id: "i14", image: "/assets/products/chuot2/2.jpg" },
    ],
    specifications: [
      { id: "s16", specKey: "DPI", specValue: "30000", displayOrder: 1 },
      { id: "s17", specKey: "Trọng lượng", specValue: "59g", displayOrder: 2 },
    ],
    createdAt: "2024-01-07T10:00:00",
  },

  // ===== GHẾ =====
  {
    id: "8",
    name: "Ghế Gaming DXRacer Formula",
    slug: "ghe-gaming-dxracer-formula",
    price: 6990000,
    discount: 200000,
    description: "Ghế gaming DXRacer Formula bền bỉ, hỗ trợ cột sống.",
    status: 1,
    stock: 6,
    category: { id: "c4", name: "Ghế", slug: "ghe", status: 1 },
    brand: { id: "b8", name: "DXRacer", slug: "dxracer", status: 1 },
    images: [
      { id: "i15", image: "/assets/products/ghe1/1.png" },
      { id: "i16", image: "/assets/products/ghe1/2.png" },
    ],
    specifications: [
      { id: "s18", specKey: "Chất liệu", specValue: "Da PU", displayOrder: 1 },
      { id: "s19", specKey: "Tải trọng", specValue: "120kg", displayOrder: 2 },
    ],
    createdAt: "2024-01-08T10:00:00",
  },

  {
    id: "9",
    name: "Ghế Công Thái Học Sihoo M57",
    slug: "ghe-cong-thai-hoc-sihoo-m57",
    price: 5490000,
    discount: 0,
    description: "Ghế công thái học Sihoo M57 hỗ trợ lưng và cổ.",
    status: 1,
    stock: 8,
    category: { id: "c4", name: "Ghế", slug: "ghe", status: 1 },
    brand: { id: "b9", name: "Sihoo", slug: "sihoo", status: 1 },
    images: [
      { id: "i17", image: "/assets/products/ghe2/1.jpg" },
      { id: "i18", image: "/assets/products/ghe2/2.jpg" },
    ],
    specifications: [
      {
        id: "s20",
        specKey: "Chất liệu",
        specValue: "Lưới cao cấp",
        displayOrder: 1,
      },
      { id: "s21", specKey: "Tải trọng", specValue: "130kg", displayOrder: 2 },
    ],
    createdAt: "2024-01-09T10:00:00",
  },
];
