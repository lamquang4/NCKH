import { memo } from "react";
import Image from "../../../ui/Image";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useGetAccount from "../../../../hooks/auth/useGetAccount";
import useLogout from "../../../../hooks/auth/useLogout";
import Button from "../../../ui/Button";

type Props = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};

function ProfileMenu({ menuOpen, onToggleMenu }: Props) {
  const { account } = useGetAccount("ADMIN");
  const { handleLogout } = useLogout();

  return (
    <>
      {account && (
        <div
          className="relative"
          onMouseEnter={onToggleMenu}
          onMouseLeave={onToggleMenu}
        >
          <div className="flex cursor-pointer items-center gap-2">
            <div className="w-[34px] h-[34px] p-1 rounded-full border border-gray-300 overflow-hidden">
              <Image
                source="/assets/user.png"
                alt=""
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <p className="font-medium">{account.fullname}</p>
          </div>

          {menuOpen && (
            <div
              className={`absolute top-full right-0 max-w z-20 bg-white shadow-md rounded-md border border-gray-200 transition-all duration-100 origin-top`}
            >
              <p className="border-b p-3 border-gray-300 max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium">
                Xin chào, {account.fullname}
              </p>

              <Link
                to={"/admin/account/profile"}
                className="block hover:bg-gray-100 p-3 whitespace-nowrap"
              >
                <div className="flex items-center gap-2 font-medium">
                  <FaRegCircleUser size={18} />
                  <p>Tài khoản</p>
                </div>
              </Link>

              <Button
                className="w-full hover:bg-gray-100 p-3 text-danger whitespace-nowrap"
                onClick={async () => {
                  await handleLogout("ADMIN");
                }}
              >
                <div className="flex items-center gap-2 font-medium">
                  <RiLogoutBoxLine size={18} />
                  <p>Đăng xuất</p>
                </div>
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default memo(ProfileMenu);
