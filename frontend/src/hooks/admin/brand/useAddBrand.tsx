import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import type { BrandRequest } from "../../../types/type";
import useGetBrands from "./useGetBrands";
import { getCookie } from "../../../utils/cookieUtil";

export default function useAddBrand() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetBrands();

  const addBrand = async (data: BrandRequest) => {
    const token = getCookie("token-admin");

    if (!data || !token) {
      return;
    }
    
    const loadingToast = toast.loading("Đang thêm...");
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/brand`;
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await mutate();
      toast.dismiss(loadingToast);
      toast.success(res.data?.message);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { addBrand, isLoading };
}
