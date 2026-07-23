import type { CartItemResponse } from "../../../types/type";
import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";
import { memo } from "react";
import { useRemoveItemInCart } from "../../../hooks/customer/cart/useRemoveItemInCart";
import { useChangeQuantityItemInCart } from "../../../hooks/customer/cart/useChangeQuantityItemInCart";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { LuTrash2 } from "react-icons/lu";

interface Props {
  item: CartItemResponse;
  userId: string;
}

function CartItem({ item, userId }: Props) {
  const max = 15;
  const { removeItem, isLoading: isLoadingRemove } = useRemoveItemInCart();
  const { changeQuantity, isLoading: isLoadingChangeQuantity } =
    useChangeQuantityItemInCart();

  const handleChangeQuantity = async (productId: string, quantity: number) => {
    await changeQuantity(userId, {
      productId: productId,
      quantity: quantity,
    });
  };

  const handleIncrement = (
    productId: string,
    currentQuantity: number,
    stock: number,
  ) => {
    const limit = stock > max ? max : stock; // số lượng tối đa có thể mua

    if (currentQuantity >= limit) {
      toast.error("Số lượng tối đa hiện có cho cuốn sách này là " + limit);
      return;
    }

    handleChangeQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: string, currentQuantity: number) => {
    if (currentQuantity <= 1) return;
    handleChangeQuantity(productId, currentQuantity - 1);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeItem(userId, productId);
  };
  return (
    <>
      <div className="w-full relative space-y-[20px]" key={item.productId}>
        <div className="flex gap-[10px] w-full sm:flex-row flex-col">
          <Link to={`/product/${item.slug}`} className="mx-auto bg-gray-100">
            <div className="w-[200px] h-[200px] overflow-hidden">
              <Image
                src={`${item.images[0]}`}
                alt={item.name}
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          </Link>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between gap-[15px]">
              <div className="flex flex-col gap-2">
                <h5 className="font-semibold">{item.name}</h5>

                {item.discount > 0 ? (
                  <div className="flex gap-[12px]">
                    <del className="text-[#707072] text-[1rem]">
                      {item.price.toLocaleString("vi-VN")}₫
                    </del>

                    <h5 className="font-medium text-danger">
                      {(item.price - item.discount).toLocaleString("vi-VN")}₫
                    </h5>
                  </div>
                ) : (
                  <h5 className="font-medium text-danger">
                    {item.price.toLocaleString("vi-VN")}₫
                  </h5>
                )}
              </div>

              <Button
                type="button"
                disabled={isLoadingRemove}
                onClick={() => handleRemoveItem(item.productId)}
                className="mb-auto text-danger"
              >
                <LuTrash2 size={20} />
              </Button>
            </div>

            <div className="flex-wrap justify-between flex gap-4 mt-auto">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  onClick={() => handleDecrement(item.productId, item.quantity)}
                  disabled={item.quantity <= 1 || isLoadingChangeQuantity}
                  className="flex items-center justify-center w-7 h-7 outline-none bg-[#F7F7F7] border-gray-300 border"
                >
                  <HiOutlineMinusSmall size={20} />
                </Button>
                <h5 className="flex items-center justify-center w-7 h-7">
                  {item.quantity}
                </h5>
                <Button
                  data-testid="btn-increment"
                  type="button"
                  onClick={() =>
                    handleIncrement(item.productId, item.quantity, item.stock)
                  }
                  disabled={isLoadingChangeQuantity}
                  className="flex items-center justify-center w-7 h-7 outline-none bg-[#F7F7F7] border-gray-300 border"
                >
                  <HiOutlinePlusSmall size={20} />
                </Button>
              </div>

              <h5 className="font-medium text-danger">
                {item.discount > 0
                  ? (
                      (item.price - item.discount) *
                      item.quantity
                    ).toLocaleString("vi-VN") + "₫"
                  : (item.price * item.quantity).toLocaleString("vi-VN") + "₫"}
              </h5>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          {item.stock < item.quantity && (
            <div>
              <p className="text-danger font-semibold text-center">
                Sản phẩm hiện tại không đủ số lượng. Vui lòng giảm số lượng hoặc
                xóa sản phẩm khỏi giỏ hàng!
              </p>
            </div>
          )}

          {item.status === 0 && (
            <div>
              <p className="text-danger font-semibold text-center">
                Sản phẩm đang tạm ngừng bán. Vui lòng xóa sản phẩm khỏi giỏ
                hàng!
              </p>
            </div>
          )}
        </div>
      </div>

      <hr className="border-gray-300" />
    </>
  );
}

export default memo(CartItem);
