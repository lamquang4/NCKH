import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import type { UserRequest } from "../../types/type";
import useGetAccount from "../auth/useGetAccount";
import { getCookie } from "../../utils/cookieUtil";

export default function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useGetAccount("CUSTOMER");

  const updateCustomer = async (data: UserRequest) => {
    const token = getCookie("token-customer");

    if (!data || !token) {
      return;
    }

    const loadingToast = toast.loading("Đang cập nhật...");
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/user`;
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

  return { updateCustomer, isLoading };
}
