import InputSearch from "../ui/InputSearch";
import Pagination from "../ui/Pagination";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import useGetPayments from "../../../hooks/admin/payment/useGetPayments";
import PaymentTable from "./PaymentTable";

function PaymentList() {
  const { payments, isLoading, totalItems, totalPages, currentPage, limit } =
    useGetPayments();

  return (
    <>
      <ListHeader title="Thanh toán" totalItems={totalItems} />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <PaymentTable payments={payments} isLoading={isLoading} />
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

export default PaymentList;
