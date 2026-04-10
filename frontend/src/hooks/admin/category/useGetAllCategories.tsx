import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, CategoryResponse } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";

export default function useGetAllCategories() {
  const token = getCookie("token-admin");
  const url = `${import.meta.env.VITE_BACKEND_URL}/category/all`;

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<CategoryResponse[]>
  >(
    token ? [url, token] : null,
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
    categories: data?.data ?? [],
    isLoading,
    error,
    mutate,
  };
}
