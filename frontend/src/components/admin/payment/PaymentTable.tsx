import Image from "../../ui/Image";
import Loading from "../../ui/Loading";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import { PAYMENT_STATUS_OPTIONS } from "../../../constants/filterOptions";
import type { PaymentResponse } from "../../../types/type";

type Props = {
  payments: PaymentResponse[];
  isLoading: boolean;
};

function PaymentTable({ payments, isLoading }: Props) {
  return (
    <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
      <thead>
        <tr className="bg-[#E9EDF2] text-left">
          <th className="p-[1rem]">Mã đơn</th>
          <th className="p-[1rem]">Mã giao dịch</th>
          <th className="p-[1rem]">Cổng thanh toán</th>
          <th className="p-[1rem]">Số tiền</th>
          <th className="p-[1rem] relative">
            <FilterDropDownMenu
              title="Tình trạng"
              array={PAYMENT_STATUS_OPTIONS}
              paramName="status"
            />
          </th>
          <th className="p-[1rem]">Ngày tạo</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={8} className="w-full">
              <Loading height={60} size={50} color="black" thickness={2} />
            </td>
          </tr>
        ) : payments.length > 0 ? (
          payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-[#f2f3f8]">
              <td className="p-[1rem] font-semibold">{payment.orderCode}</td>
              <td className="p-[1rem]">{payment.transactionId}</td>
              <td className="p-[1rem] uppercase">{payment.paymethod}</td>

              <td className="p-[1rem]">
                {payment.amount.toLocaleString("vi-VN")}₫
              </td>

              <td className="p-[1rem]">
                {payment.status === 1
                  ? "Thành công"
                  : payment.status === 0
                    ? "Hoàn tiền"
                    : ""}
              </td>
              <td className="p-[1rem]">
                {new Date(payment.createdAt).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8} className="w-full h-[70vh]">
              <div className="flex justify-center items-center">
                <Image
                  src={"/assets/notfound1.webp"}
                  alt={""}
                  className={"w-[135px]"}
                  loading="lazy"
                />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default PaymentTable;
