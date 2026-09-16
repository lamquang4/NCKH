import axios from "axios";
import { useState } from "react";
import type { CartItemRequest } from "../../../types/type";
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
      await axios.put(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { changeQuantity, isLoading };
}
