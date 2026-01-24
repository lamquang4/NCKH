import { useParams } from "react-router-dom";
import { mockProducts } from "../../../mocks/mockProducts";
import BreadCrumb from "../BreadCrumb";
import Pagination from "../Pagination";
import ProductList from "./ProductList";

function ProductListCategory() {
  const { slug } = useParams();
  const products = mockProducts;
  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: slug === "all" ? "Tất cả sản phẩm" : products[0]?.category?.name,
    },
  ];
  return (
    <>
      <BreadCrumb items={array} />
      <section className="mb-[40px] px-[15px]">
        <div className="mx-auto max-w-[1200px] w-full">
          <ProductList
            products={products}
            title="Tất cả sản phẩm"
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
    </>
  );
}

export default ProductListCategory;
