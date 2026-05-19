import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import useGetCategories from "../../../hooks/admin/category/useGetCategories";
import CategoryTable from "./CategoryTable";

function CategoryList() {
  const { categories, isLoading, totalItems, totalPages, currentPage, limit } =
    useGetCategories();

  return (
    <>
      <ListHeader
        title="Danh mục"
        totalItems={totalItems}
        addLink="/admin/add-category"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <CategoryTable categories={categories} isLoading={isLoading} />
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

export default CategoryList;
