import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import useGetActiveCategories from "../../../../hooks/customer/category/useGetActiveCategories";
import Button from "../../../ui/Button";
import Image from "../../../ui/Image";
import Overplay from "../../../ui/Overplay";
import { LuX } from "react-icons/lu";

type MenuMobileProps = {
  isOpen: boolean;
  onToggleMenu: () => void;
};
function MenuMobile({ isOpen, onToggleMenu }: MenuMobileProps) {
  const { categories } = useGetActiveCategories();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`custom-scroll text-[0.9rem] fixed top-0 w-full max-w-[320px] h-screen py-[20px] px-[15px] overflow-y-auto bg-white shadow-md transition-all duration-500 ease-in-out z-16 ${
          isOpen ? "right-0 visible" : "right-[-100%] invisible"
        }`}
      >
        <div className="flex justify-end items-center">
          <Button onClick={onToggleMenu}>
            <LuX size={24} />
          </Button>
        </div>

        <ul className="py-[20px] ">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/products/${category.slug}`}
                className="py-[15px] font-medium hover:text-black"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={category.image || ""}
                    alt={category.name}
                    className="w-[25px] h-[25px]"
                    loading="lazy"
                  />

                  <p className="font-medium">{category.name}</p>
                </div>
              </Link>
            </li>
          ))}

          <li className="border-b border-gray-300 cursor-pointer text-black font-semibold">
            <Link to={"/products/sale"} className="py-[15px]">
              <div className="flex items-center gap-2">
                <Image
                  src={"/assets/discount.png"}
                  alt={""}
                  className="w-[25px] h-[25px]"
                  loading="lazy"
                />

                <p className="font-medium">Giảm giá</p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      {isOpen && <Overplay className="z-15" onClose={onToggleMenu} />}
    </>
  );
}

export default memo(MenuMobile);
