import { Link } from "react-router-dom";
import Image from "../../Image";
import SearchDesktop from "./SearchDesktop";
import ProfileMenu from "./ProfileMenu";
import { BiCart, BiMenu, BiSearch, BiUser } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import SearchMobile from "./SearchMobile";
import Overplay from "../../Overplay";
import MenuMobile from "./MenuMobile";

function Header() {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);

  const toggleSearch = useCallback(() => {
    setOpenSearch((prev) => !prev);
    setMenuMobileOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMenuMobileOpen((prev) => !prev);
    setOpenSearch(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuMobileOpen(false);
        setOpenSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <header className="w-full bg-white sticky top-0 border-b border-gray-200 z-15">
        <div className="py-4 px-4 relative">
          <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
            <Link to={"/"}>
              <Image
                source={"/assets/logo.png"}
                alt={"logo"}
                className={"w-[100px]"}
                loading="eager"
              />
            </Link>

            <div className="hidden lg:flex w-[50%]">
              <SearchDesktop />
            </div>

            <div className="hidden lg:flex items-center gap-[15px] font-medium">
              <div className="relative cursor-pointer transition-colors group">
                <div
                  className={`flex items-center gap-1 hover:text-white hover:bg-blue-500 px-2 py-1.5 rounded-md group-hover:bg-blue-500 group-hover:text-white`}
                >
                  <BiUser size={24} />
                  <span>Tài khoản</span>
                </div>

                <ProfileMenu />
              </div>

              <Link to={"/cart"} className="relative">
                <div className="flex items-center gap-1 hover:text-white hover:bg-blue-500 px-2 py-1.5 rounded-md">
                  <div className="relative">
                    <BiCart size={24} />
                    <small className="absolute flex items-center justify-center top-[-12px] right-[-11px] bg-[#E30019] text-white text-[0.7rem] font-medium leading-none  rounded-full w-[20px] h-[20px]">
                      0
                    </small>
                  </div>

                  <span>Giỏ hàng</span>
                </div>
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-4 relative">
              <button onClick={toggleSearch}>
                <BiSearch size={24} />
              </button>

              <div className="relative cursor-pointer group">
                <BiUser size={24} />
                <ProfileMenu />
              </div>

              <Link to={"/cart"} className="relative">
                <BiCart size={24} />

                <small className="absolute flex items-center justify-center top-[-9px] right-[-11px] bg-[#E30019] text-white text-[0.7rem] font-medium leading-none  rounded-full w-[20px] h-[20px]">
                  0
                </small>
              </Link>

              <button onClick={toggleMobileMenu}>
                <BiMenu size={26} />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <SearchMobile onToggleSearch={toggleSearch} openSearch={openSearch} />

          <MenuMobile isOpen={menuMobileOpen} onToggleMenu={toggleMobileMenu} />
        </div>
      </header>

      {openSearch && <Overplay onClose={toggleSearch} IndexForZ={12} />}
    </>
  );
}

export default Header;
