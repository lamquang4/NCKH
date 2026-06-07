import { Link, useLocation } from "react-router-dom";
import useGetAccount from "../../../hooks/auth/useGetAccount";
import useLogout from "../../../hooks/auth/useLogout";
import {
  LuDoorOpen,
  LuUserRound,
  LuShoppingBag,
  LuBadgeCheck,
} from "react-icons/lu";
import Button from "../../ui/Button";

function SideBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { handleLogout } = useLogout();
  const { account, mutate } = useGetAccount("CUSTOMER");
  return (
    <div className="w-full max-w-full lg:max-w-[300px] self-start lg:sticky lg:top-[5rem] bg-white ">
      <div className="text-[0.9rem] font-medium">
        <div className="px-3.5 py-3 flex gap-5 items-center">
          <LuBadgeCheck size={20} />

          <div>
            <h5 className="font-medium">Tài khoản của</h5>
            <p className="font-normal">{account?.fullname}</p>
          </div>
        </div>

        <Link
          to="/account/profile"
          className={`border-l-4 py-3 px-3.5 ${
            pathname === "/account/profile"
              ? "bg-gray-100 border-primary"
              : "hover:bg-gray-100 border-transparent"
          }`}
        >
          <div className="flex items-center gap-5">
            <LuUserRound size={20} />
            <span>Thông tin tài khoản</span>
          </div>
        </Link>

        <Link
          to="/order/history"
          className={`border-l-4 py-3 px-3.5  ${
            pathname === "/order/history" ||
            pathname.startsWith("/order/history")
              ? "bg-gray-100 border-primary"
              : "hover:bg-gray-100 border-transparent"
          }`}
        >
          <div className="flex items-center gap-5">
            <LuShoppingBag size={20} />
            <span>Đơn hàng</span>
          </div>
        </Link>

        <Button
          type="button"
          onClick={() => {
            handleLogout("CUSTOMER");
            mutate(undefined);
          }}
          className="border-l-4 border-transparent py-3 px-3.5 text-left text-danger font-medium hover:bg-gray-100 w-full"
        >
          <div className="flex items-center gap-5">
            <LuDoorOpen size={20} />

            <span>Đăng xuất</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default SideBar;
