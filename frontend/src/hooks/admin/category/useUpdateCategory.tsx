import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import type { CategoryRequest } from "../../../types/type";
import useGetCategory from "./useGetCategory";

export default function useUpdateCategory(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetCategory(id);
  const updateCategory = async (data: CategoryRequest, file: File) => {
    if (!id) return;
    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/category/${id}`;
      const formData = new FormData();

      formData.append(
        "category",
        new Blob(
          [
            JSON.stringify({
              name: data.name,
              status: data.status,
            }),
          ],
          { type: "application/json" },
        ),
      );

      if (file) {
        formData.append("image", file);
      }

      await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  return { updateCategory, isLoading };
}
