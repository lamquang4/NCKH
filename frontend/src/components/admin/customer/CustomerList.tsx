import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import useGetCustomers from "../../../hooks/admin/user/useGetCustomers";
import CustomerTable from "./CustomerTable";

function CustomerList() {
  const { customers, isLoading, totalItems, totalPages, currentPage, limit } =
    useGetCustomers();

  return (
    <>
      <ListHeader title="Khách hàng" totalItems={totalItems} />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <CustomerTable customers={customers} isLoading={isLoading} />
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

export default CustomerList;
