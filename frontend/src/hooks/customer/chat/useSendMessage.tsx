import axios from "axios";
import { useState } from "react";
import type { MessageRequest } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";
import useGetChat from "./useGetChat";

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
        messages: [...(current?.messages ?? []), optimisticMessage],
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
    } catch (err) {
      mutate(
        (current: any) => ({
          ...current,
          messages:
            current?.messages?.filter(
              (m: any) => m.id !== optimisticMessage.id,
            ) ?? [],
        }),
        { revalidate: false },
      );
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
}
