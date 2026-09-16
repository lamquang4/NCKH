import axios from "axios";
import { useState } from "react";
import { getCookie } from "../../../utils/cookieUtil";
import { toast } from "react-hot-toast";
import useGetCart from "./useGetCart";

export function useRemoveItemInCart() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetCart();

  const removeItem = async (userId: string, productId: string) => {
    const token = getCookie("token-customer");
    if (!userId || !productId || !token) return;

    setIsLoading(true);
    const url = `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`;

    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { removeItem, isLoading };
}
