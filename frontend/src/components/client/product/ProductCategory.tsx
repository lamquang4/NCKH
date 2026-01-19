import Pagination from "../Pagination";
import ProductList from "./ProductList";

function ProductCategory() {
  const products = [
    // ===== LAPTOP =====
    {
      id: "1",
      name: "Laptop Dell Inspiron 15",
      price: 18990000,
      discount: 0,
      stock: 12,
      images: [
        "/assets/products/laptop1/1.png",
        "/assets/products/laptop1/2.png",
      ],
      category: { name: "Laptop" },
      brand: { name: "Dell" },
    },
    {
      id: "2",
      name: "Laptop ASUS Vivobook 14",
      price: 16490000,
      discount: 1500000,
      stock: 10,
      images: [
        "/assets/products/laptop2/1.png",
        "/assets/products/laptop2/2.png",
      ],
      category: { name: "Laptop" },
      brand: { name: "ASUS" },
    },
    {
      id: "3",
      name: "Laptop HP Pavilion 15",
      price: 17990000,
      discount: 0,
      stock: 7,
      images: [
        "/assets/products/laptop3/1.png",
        "/assets/products/laptop3/2.png",
      ],
      category: { name: "Laptop" },
      brand: { name: "HP" },
    },

    // ===== TAI NGHE =====
    {
      id: "4",
      name: "Tai nghe Sony WH-1000XM5",
      price: 7990000,
      discount: 2000000,
      stock: 5,
      images: [
        "/assets/products/tainghe1/1.png",
        "/assets/products/tainghe1/2.png",
      ],
      category: { name: "Tai nghe" },
      brand: { name: "Sony" },
    },
    {
      id: "5",
      name: "Tai nghe Apple AirPods Pro 2",
      price: 6490000,
      discount: 0,
      stock: 9,
      images: [
        "/assets/products/tainghe2/1.jpg",
        "/assets/products/tainghe2/2.jpg",
      ],
      category: { name: "Tai nghe" },
      brand: { name: "Apple" },
    },

    // ===== CHUỘT =====
    {
      id: "6",
      name: "Chuột Logitech G Pro X",
      price: 2990000,
      discount: 500000,
      stock: 20,
      images: [
        "/assets/products/chuot1/1.png",
        "/assets/products/chuot1/2.png",
      ],
      category: { name: "Chuột" },
      brand: { name: "Logitech" },
    },
    {
      id: "7",
      name: "Chuột Razer DeathAdder V3",
      price: 2590000,
      discount: 1000000,
      stock: 15,
      images: [
        "/assets/products/chuot2/1.jpg",
        "/assets/products/chuot2/2.jpg",
      ],
      category: { name: "Chuột" },
      brand: { name: "Razer" },
    },

    // ===== GHẾ =====
    {
      id: "8",
      name: "Ghế Gaming DXRacer Formula",
      price: 6990000,
      discount: 2000000,
      stock: 6,
      images: ["/assets/products/ghe1/1.png", "/assets/products/ghe1/2.png"],
      category: { name: "Ghế" },
      brand: { name: "DXRacer" },
    },
    {
      id: "9",
      name: "Ghế Công Thái Học Sihoo M57",
      price: 5490000,
      discount: 1500000,
      stock: 8,
      images: ["/assets/products/ghe2/1.jpg", "/assets/products/ghe2/2.jpg"],
      category: { name: "Ghế" },
      brand: { name: "Sihoo" },
    },
  ];

  return (
    <section className="my-[40px] px-[15px]">
      <div className="mx-auto max-w-[1200px] w-full">
        <ProductList
          products={products}
          category="Tất cả sản phẩm"
          isLoading={false}
          total={products.length}
        />

        <Pagination
          totalPages={1}
          currentPage={1}
          totalItems={products.length}
        />
      </div>
    </section>
  );
}

export default ProductCategory;
