import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, CartResponse } from "../../../types/type";
import { useToken } from "../../../utils/cookieUtil";

export default function useGetCart() {
  const token = useToken("token-customer");

  const url = `${import.meta.env.VITE_BACKEND_URL}/cart`;

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<CartResponse>>(
    token ? [url, token] : null,
    ([url, token]) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  return {
    cart: data?.data,
    isLoading,
    error,
    mutate,
  };
}
