import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import type { BrandRequest } from "../../../types/type";
import useGetBrand from "./useGetBrand";
import { getCookie } from "../../../utils/cookieUtil";

export default function useUpdateBrand(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetBrand(id);
  const updateBrand = async (data: BrandRequest) => {
    const token = getCookie("token-admin");

    if (!id || !token) return;

    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/brand/${id}`;
      const res = await axios.put(url, data, {
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

  return { updateBrand, isLoading };
}
