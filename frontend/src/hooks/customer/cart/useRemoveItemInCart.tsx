import axios from "axios";
import { useState } from "react";
import { getCookie } from "../../../utils/cookieUtil";
import { toast } from "react-hot-toast";
import useGetCart from "./useGetCart";
import type { ApiResponse, CartResponse } from "../../../types/type";

export function useRemoveItemInCart() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetCart();

  const removeItem = async (userId: string, productId: string) => {
    const token = getCookie("token-customer");
    if (!userId || !productId || !token) return;

    setIsLoading(true);
    const url = `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`;

    try {
      await mutate(
        axios
          .delete(url, { headers: { Authorization: `Bearer ${token}` } })
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
                items: current.data.items.filter(
                  (item) => item.productId !== productId,
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
    } finally {
      setIsLoading(false);
    }
  };

  return { removeItem, isLoading };
}
