import axios from "axios";
import useSWR from "swr";
import type {
  ApiResponse,
  ProductListItemResponse,
} from "../../../../types/type";

export default function useGetActiveProducts(limit: number) {
  const url = `${import.meta.env.VITE_BACKEND_URL}/product/active/limit?limit=${limit}`;

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<ProductListItemResponse[]>
  >(url, (url) => axios.get(url).then((res) => res.data), {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    products: data?.data ?? [],
    isLoading,
    error,
    mutate,
  };
}
