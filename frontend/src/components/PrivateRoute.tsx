import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import type { TokenPayload } from "../types/type";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectPath: string;
  role: "ADMIN" | "CUSTOMER";
}

const PrivateRoute = ({
  children,
  allowedRoles,
  redirectPath = "/login",
  role,
}: PrivateRouteProps) => {
  const token =
    role === "ADMIN"
      ? Cookies.get("token-admin")
      : Cookies.get("token-customer");

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    // kiểm tra token hết hạn
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      if (role === "ADMIN") {
        Cookies.remove("token-admin");
      } else {
        Cookies.remove("token-customer");
      }
      return <Navigate to={redirectPath} replace />;
    }

    // kiểm tra quyền truy cập
    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
  } catch {
    if (role === "ADMIN") {
      Cookies.remove("token-admin");
    } else {
      Cookies.remove("token-customer");
    }
    return <Navigate to={redirectPath} replace />;
  }
};

export default PrivateRoute;
