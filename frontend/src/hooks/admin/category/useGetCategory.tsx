import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, CategoryResponse } from "../../../types/type";
import { useToken } from "../../../utils/cookieUtil";

export default function useGetCategory(id: string) {
  const token = useToken("token-admin");

  const url = `${import.meta.env.VITE_BACKEND_URL}/category/${id}`;

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<CategoryResponse>
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
    category: data?.data,
    isLoading,
    error,
    mutate,
  };
}
