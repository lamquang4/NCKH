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

    if (!userId || !data || !token) {
      return;
    }
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/cart`;

      await mutate(
        (current: ApiResponse<CartResponse> | undefined) => {
          if (!current?.data) return current;
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
        { revalidate: false },
      );

      await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      await mutate();
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { changeQuantity, isLoading };
}
