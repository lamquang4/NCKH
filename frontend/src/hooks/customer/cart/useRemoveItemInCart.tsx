import axios from "axios";
import { useState } from "react";
import { getCookie } from "../../../utils/cookieUtil";

export function useRemoveItemInCart() {
  const [isLoading, setIsLoading] = useState(false);

  const removeItem = async (userId: string, productId: string) => {
    if (!userId || !productId) {
      return;
    }
    setIsLoading(true);
    try {
      const token = getCookie("token-customer");

      const url = `${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`;

      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { removeItem, isLoading };
}
