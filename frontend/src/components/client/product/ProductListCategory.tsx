import { mockProducts } from "../../../mocks/mockProducts";
import Pagination from "../Pagination";
import ProductList from "./ProductList";

function ProductListCategory() {
  const products = mockProducts;
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

export default ProductListCategory;
