import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import useGetOrders from "../../../hooks/admin/order/useGetOrders";
import OrderTable from "./OrderTable";

function OrderList() {
  const { orders, isLoading, totalItems, totalPages, currentPage, limit } =
    useGetOrders();

  return (
    <>
      <ListHeader
        title="Đơn hàng"
        totalItems={totalItems}
        showDateFilter={true}
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <OrderTable orders={orders} isLoading={isLoading} />
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

export default OrderList;
