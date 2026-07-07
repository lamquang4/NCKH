import axios from "axios";
import { useState } from "react";
import type {
  ApiResponse,
  CartItemRequest,
  CartResponse,
} from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";
import toast from "react-hot-toast";
import useGetCart from "./useGetCart";

export function useChangeQuantityItemInCart() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetCart();

  const changeQuantity = async (userId: string, data: CartItemRequest) => {
    const token = getCookie("token-customer");
    if (!userId || !data || !token) return;

    setIsLoading(true);
    const url = `${import.meta.env.VITE_BACKEND_URL}/cart`;

    try {
      await mutate(
        axios
          .put(url, data, { headers: { Authorization: `Bearer ${token}` } })
          .then(() => undefined),
        {
          optimisticData: (
            current: ApiResponse<CartResponse> | undefined,
          ): ApiResponse<CartResponse> => {
            if (!current?.data) {
              throw new Error("Chưa tải được dữ liệu giỏ hàng.");
            }
            return {
              ...current,
              data: {
                ...current.data,
                items: current.data.items.map((i) =>
                  i.productId === data.productId
                    ? { ...i, quantity: data.quantity }
                    : i,
                ),
              },
            };
          },
          rollbackOnError: true,
          populateCache: false,
          revalidate: true,
        },
      );
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { changeQuantity, isLoading };
}
