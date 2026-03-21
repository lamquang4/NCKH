
import axios from "axios";
import useSWR from "swr";
import type { ProductDetailResponse } from "../../../types/type";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetProduct(slug: string) {
  const url = slug
    ? `${import.meta.env.VITE_BACKEND_URL}/product/active/slug/${slug}`
    : null;
  const { data, error, isLoading, mutate } = useSWR<ProductDetailResponse>(url, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    product: data,
    isLoading,
    error,
    mutate,
  };
}
