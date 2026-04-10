import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, OrderResponse } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";

export default function useGetOrder(id: string) {
  const token = getCookie("token-admin");

  const url = `${import.meta.env.VITE_BACKEND_URL}/order/${id}`;
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<OrderResponse>>(
    token && id ? [url, token] : null,
    ([url, token]) =>
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  return {
    order: data?.data,
    isLoading,
    error,
    mutate,
  };
}
