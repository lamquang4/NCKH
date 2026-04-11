import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookieUtil";

export default function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (type: "ADMIN" | "CUSTOMER") => {
    setIsLoading(true);
    try {
      if (type === "ADMIN") {
        removeCookie("token-admin");
        navigate("/admin/login", { replace: true });
      } else {
        removeCookie("token-customer");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
}
