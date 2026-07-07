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
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`;

      await mutate(
        (current: ApiResponse<CartResponse> | undefined) => {
          if (!current?.data) return current;
          return {
            ...current,
            data: {
              ...current.data,
              items: current.data.items.filter(
                (i) => i.productId !== productId,
              ),
            },
          };
        },
        { revalidate: false },
      );

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      await mutate();
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { removeItem, isLoading };
}
