import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, ProductDetailResponse } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";

export default function useGetProduct(id: string) {
  const token = getCookie("token-admin");
  const url = `${import.meta.env.VITE_BACKEND_URL}/product/${id}`;
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<ProductDetailResponse>
  >(
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
    product: data?.data,
    isLoading,
    error,
    mutate,
  };
}
