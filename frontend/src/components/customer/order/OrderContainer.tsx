import OrderList from "./OrderList";
import SideBar from "../ui/SideBar";
import BreadCrumb from "../ui/BreadCrumb";

const array = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Đơn hàng",
  },
];

function OrderContainer() {
  return (
    <>
      <BreadCrumb items={array} />

      <section className="mb-[40px]">
        <div className="w-full max-w-[1200px] mx-auto relative">
          <div className="flex justify-center flex-wrap gap-5">
            <SideBar />

            <OrderList />
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderContainer;
