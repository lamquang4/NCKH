import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import type {
  ApiResponse,
  ProductListItemResponse,
} from "../../../../types/type";
import useDebounce from "../../../useDebounce";

export default function useGetSuggestionProducts(limit: number) {
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 500);
  const url = `${import.meta.env.VITE_BACKEND_URL}/product/active/limit?q=${debouncedKeyword}&limit=${limit}`;

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<ProductListItemResponse[]>
  >(url, (url) => axios.get(url).then((res) => res.data), {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    products: data?.data ?? [],
    setKeyword,
    isLoading,
    error,
    mutate,
  };
}
