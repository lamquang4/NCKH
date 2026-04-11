import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useToken } from "../../../utils/cookieUtil";
import type { ApiResponse, MessageResponse } from "../../../types/type";
import { useCallback } from "react";

export default function useGetChatMessages() {
  const token = useToken("token-customer");
  const limit = 20;
  const url = `${import.meta.env.VITE_BACKEND_URL}/chat/user`;

  const { data, size, setSize, isLoading, mutate } = useSWRInfinite<
    ApiResponse<MessageResponse[]>
  >(
    (index) => (token ? [url, token, index + 1] : null),
    ([url, token, page]) =>
      axios
        .get(`${url}?page=${page}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateFirstPage: false,
    },
  );

  const messages = data
    ? [...data].reverse().flatMap((page) => [...page.data].reverse())
    : [];

  const totalPages = data?.[0]?.totalPages ?? 1;
  const hasMore = size < totalPages;

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) setSize((s) => s + 1);
  }, [hasMore, isLoading, setSize]);

  return { messages, isLoading, hasMore, loadMore, mutate };
}
