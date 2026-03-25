import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import type { BrandRequest } from "../../../types/type";
import useGetBrand from "./useGetBrand";

export default function useUpdateBrand(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetBrand(id);
  const updateBrand = async (data: BrandRequest) => {
    if (!id) return;
    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/brand/${id}`;
      await axios.put(url, data);
      await mutate();
      toast.dismiss(loadingToast);
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { updateBrand, isLoading };
}
