import axios from "axios";
import useSWR from "swr";
import type { BrandResponse, ApiResponse } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";

export default function useGetBrand(id: string) {
  const token = getCookie("token-admin");
  const url = `${import.meta.env.VITE_BACKEND_URL}/brand/${id}`;

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<BrandResponse>>(
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
    brand: data?.data,
    isLoading,
    error,
    mutate,
  };
}
