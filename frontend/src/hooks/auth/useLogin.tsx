import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/cookieUtil";
import type { ApiResponse, LoginResponse } from "../../types/type";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    if (!data) return;
    setIsLoading(true);

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
      const { data: res } = await axios.post<ApiResponse<LoginResponse>>(
        url,
        data,
      );
      const { token, role } = res.data;

      const isAdminPage = window.location.pathname.startsWith("/admin");

      if (!isAdminPage && role === "ADMIN") {
        toast.error("Không thể đăng nhập admin ở trang khách hàng");
        return;
      }

      if (isAdminPage && role === "CUSTOMER") {
        toast.error("Không thể đăng nhập customer ở trang admin");
        return;
      }

      const cookieName =
        role === "ADMIN"
          ? "token-admin"
          : role === "CUSTOMER"
            ? "token-customer"
            : null;

      if (!cookieName) return;

      setCookie(cookieName, token);

      toast.success(res.message);
      navigate(role === "ADMIN" ? "/admin/account/profile" : "/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
}
