import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetProduct from "./useGetProduct";
import { getCookie } from "../../../utils/cookieUtil";

export default function useUpdateImageProduct(productId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetProduct(productId);
  const updateImageProduct = async (imageId: string, file: File) => {
    const token = getCookie("token-admin");

    if (!productId || !imageId || !file || !token) {
      return;
    }

    const loadingToast = toast.loading("Đang cập nhật hình...");
    setIsLoading(true);

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/product/${productId}/image/${imageId}`;
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.patch(url, formData, {
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

  return { updateImageProduct, isLoading };
}
