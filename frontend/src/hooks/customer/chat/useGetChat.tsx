import axios from "axios";
import useSWR from "swr";
import { getCookie } from "../../../utils/cookieUtil";

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

  const { data, error, isLoading, mutate } = useSWR<any>(url, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  return {
    chat: data,
    isLoading,
    error,
    mutate,
  };
}
