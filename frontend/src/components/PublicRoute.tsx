import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  role: "ADMIN" | "CUSTOMER";
  exp: number;
}

interface PublicRouteProps {
  children: React.ReactNode;
  redirectPath: string;
  type: "ADMIN" | "CUSTOMER";
}

const PublicRoute = ({ children, redirectPath, type }: PublicRouteProps) => {
  const token =
    type === "ADMIN"
      ? Cookies.get("token-admin")
      : Cookies.get("token-customer");

  if (!token) return <>{children}</>;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const role = decoded.role;
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      Cookies.remove("token");
      return <>{children}</>;
    }

    // Nếu đã login redirect theo role
    if (type === "ADMIN" && role === "ADMIN") {
      return <Navigate to={redirectPath} replace />;
    } else if (type === "CUSTOMER" && role === "CUSTOMER") {
      return <Navigate to="/" replace />;
    }
  } catch {
    Cookies.remove("token");
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default PublicRoute;
