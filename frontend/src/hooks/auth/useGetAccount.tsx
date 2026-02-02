import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";

const fetcher =
  (type: "admin" | "customer") =>
  async (
    url: string,
  ): Promise<{ token: string; id: string; email: string; role: string }> => {
    const token =
      type === "admin"
        ? Cookies.get("token-admin")
        : Cookies.get("token-customer");

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

export default function useGetAccount(type: "admin" | "customer") {
  const url = `${import.meta.env.VITE_BACKEND_URL}/auth/me`;

  const { data, error, isLoading, mutate } = useSWR<{
    token: string;
    id: string;
    email: string;
    role: string;
  }>(url, fetcher(type));

  return {
    account: data,
    isLoading,
    error,
    mutate,
  };
}
