import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, ProductDetailResponse } from "../../../types/type";

export default function useGetActiveProduct(slug: string) {
  const url = `${import.meta.env.VITE_BACKEND_URL}/product/active/slug/${slug}`;

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<ProductDetailResponse>
  >(slug ? url : null, (url) => axios.get(url).then((res) => res.data), {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    product: data?.data,
    isLoading,
    error,
    mutate,
  };
}
