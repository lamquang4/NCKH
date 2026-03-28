import axios from "axios";
import useSWR from "swr";
import { getCookie } from "../../../utils/cookieUtil";
import type { ApiResponse, ChatResponse } from "../../../types/type";

export default function useGetChat() {
  const token = getCookie("token-customer");

  const url = `${import.meta.env.VITE_BACKEND_URL}/chat/user`;

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<ChatResponse>>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    },
  );

  return {
    chat: data?.data,
    isLoading,
    error,
    mutate,
  };
}
