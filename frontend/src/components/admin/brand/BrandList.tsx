import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import useGetBrands from "../../../hooks/admin/brand/useGetBrands";
import BrandTable from "./BrandTable";

function BrandList() {
  const { brands, isLoading, totalItems, totalPages, currentPage, limit } =
    useGetBrands();

  return (
    <>
      <ListHeader
        title="Thương hiệu"
        totalItems={totalItems}
        addLink="/admin/add-brand"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <BrandTable brands={brands} isLoading={isLoading} />
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

export default BrandList;
