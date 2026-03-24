import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useGetProduct from "./useGetProduct";

export default function useUpdateImageProduct() {
  const [isLoading, setIsLoading] = useState(false);

  const updateImageProduct = async (
    productId: string,
    imageId: string,
    file: File,
  ) => {
    if (!productId || !imageId || !file) {
      return;
    }

    const { mutate } = useGetProduct(productId);

    const loadingToast = toast.loading("Đang cập nhật hình...");
    setIsLoading(true);

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/product/${productId}/image/${imageId}`;
      const formData = new FormData();
      formData.append("file", file);
      await axios.patch(url, formData);
      await mutate();
      toast.dismiss(loadingToast);
      toast.success("Cập nhật hình thành công");
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return { updateImageProduct, isLoading };
}
