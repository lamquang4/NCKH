import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, UserResponse } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";

export default function useGetUser(id: string) {
  const token = getCookie("token-admin");

  const url = `${import.meta.env.VITE_BACKEND_URL}/user/${id}`;

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<UserResponse>>(
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
    user: data?.data,
    isLoading,
    error,
    mutate,
  };
}
