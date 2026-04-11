import axios from "axios";
import useSWR from "swr";
import { useToken } from "../../utils/cookieUtil";
import type { ApiResponse, UserResponse } from "../../types/type";

export default function useGetAccount(type: "ADMIN" | "CUSTOMER") {
  const token = useToken(type === "ADMIN" ? "token-admin" : "token-customer");
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/me`;

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<UserResponse>>(
    token ? [url, token] : null,
    ([url, token]) =>
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.data),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  return {
    account: data?.data ?? null,
    isLoading,
    error,
    mutate,
  };
}
