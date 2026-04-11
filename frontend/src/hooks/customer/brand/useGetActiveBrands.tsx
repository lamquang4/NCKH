import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, BrandResponse } from "../../../types/type";

export default function useGetActiveBrands() {
  const url = `${import.meta.env.VITE_BACKEND_URL}/brand/active`;

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<BrandResponse[]>
  >(url, (url) => axios.get(url).then((res) => res.data), {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    brands: data?.data ?? [],
    isLoading,
    error,
    mutate,
  };
}
