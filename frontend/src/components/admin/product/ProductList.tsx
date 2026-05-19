import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import useGetProducts from "../../../hooks/admin/product/useGetProducts";
import ProductTable from "./ProductTable";
function ProductList() {
  const { products, isLoading, totalItems, totalPages, currentPage, limit } =
    useGetProducts();

  return (
    <>
      <ListHeader
        title="Sản phẩm"
        totalItems={totalItems}
        addLink="/admin/add-product"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <ProductTable products={products} isLoading={isLoading} />
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default ProductList;
