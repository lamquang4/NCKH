import axios from "axios";
import { useState } from "react";
import type { MessageRequest } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";
import useGetChat from "./useGetChat";
import toast from "react-hot-toast";

export default function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetChat();
  const sendMessage = async (data: MessageRequest, optimisticMessage: any) => {
    if (!data) {
      return;
    }

    mutate(
      (current: any) => ({
        ...current,
        data: {
          ...current?.data,
          messages: [...(current?.data?.messages ?? []), optimisticMessage],
        },
      }),
      { revalidate: false },
    );

    setIsLoading(true);
    try {
      const token = getCookie("token-customer");

      const url = `${import.meta.env.VITE_BACKEND_URL}/assistant/chat`;
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await mutate();
    } catch (err: any) {
      mutate(
        (current: any) => ({
          ...current,
          data: {
            ...current?.data,
            messages:
              current?.data?.messages?.filter(
                (m: any) => m.id !== optimisticMessage.id,
              ) ?? [],
          },
        }),
        { revalidate: false },
      );
      toast.error(err?.response?.data?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
}
